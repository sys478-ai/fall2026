let model;
const canvas = document.getElementById("drawingCanvas");
const ctx = canvas.getContext("2d");

// Variables to track drawing state
let isDrawing = false;
let lastX = 0;
let lastY = 0;

// Function to start drawing
function startDrawing(event) {
    isDrawing = true;
    // Set the initial position for drawing
    [lastX, lastY] = [event.offsetX, event.offsetY];
}

// Function to stop drawing
function stopDrawing() {
    isDrawing = false;
    ctx.beginPath(); // Reset the path to avoid connecting lines
}

// Function to draw on the canvas
function draw(event) {
    if (!isDrawing) return;

    ctx.lineWidth = 10; // Line thickness
    ctx.lineCap = "round"; // Rounded line endings
    ctx.strokeStyle = "#000"; // Line color

    ctx.beginPath();
    ctx.moveTo(lastX, lastY); // Move to the last position
    ctx.lineTo(event.offsetX, event.offsetY); // Draw to the current position
    ctx.stroke(); // Apply the stroke

    // Update last position
    [lastX, lastY] = [event.offsetX, event.offsetY];
}
function clearCanvas() {
    document.querySelectorAll("canvas").forEach((canvas) => {
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
    // Clears the entire canvas
    document.querySelector("#predictions").innerHTML = "";
    document.querySelector("#matrixGrid").innerHTML = "";
}

// Event listener for the "Clear Canvas" button
document.getElementById("clearButton").addEventListener("click", clearCanvas);

// Event listeners for drawing
canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseout", stopDrawing); // Stop drawing when mouse leaves canvas

async function loadModel() {
    model = await tf.loadLayersModel("./models/model-digits-1-4.json");
    console.log(model);
}
loadModel();

function cropCanvas() {
    // Get the image data from the canvas
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // Variables to track the bounds of the content
    let left = canvas.width,
        top = canvas.height,
        right = 0,
        bottom = 0;

    // Loop through all the pixels to find the bounding box of non-white pixels
    for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
            const index = (y * canvas.width + x) * 4;
            const a = data[index + 3];

            // Check if the pixel is non-white (or non-transparent)
            if (a !== 0) {
                // Adjust this condition as needed
                if (x < left) left = x;
                if (x > right) right = x;
                if (y < top) top = y;
                if (y > bottom) bottom = y;
            }
        }
    }

    // Calculate the width and height of the cropped content
    const croppedWidth = right - left;
    const croppedHeight = bottom - top;

    // Create a new canvas with the cropped dimensions
    const croppedCanvas = document.querySelector("#secretCanvas"); //document.createElement("canvas");
    const croppedCtx = croppedCanvas.getContext("2d");

    const offsetX = (croppedCanvas.width - croppedWidth) / 2;
    const offsetY = (croppedCanvas.height - croppedHeight) / 2;

    // Draw the cropped content onto the new canvas
    croppedCtx.drawImage(
        canvas,
        left,
        top,
        croppedWidth,
        croppedHeight,
        offsetX,
        offsetY,
        croppedWidth,
        croppedHeight
    );

    return croppedCanvas;
}

function scaleCanvasTo28x28(canvas) {
    const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext("2d");

    // Set the temporary canvas size to 28x28 pixels
    tempCanvas.width = 28;
    tempCanvas.height = 28;

    // Get the original canvas dimensions
    const originalWidth = canvas.width;
    const originalHeight = canvas.height;

    // Calculate the scaling factor
    const scaleFactor = Math.min(28 / originalWidth, 28 / originalHeight);

    // Calculate the new width and height while maintaining the aspect ratio
    const newWidth = originalWidth * scaleFactor;
    const newHeight = originalHeight * scaleFactor;

    // Calculate the offset to center the image in the 28x28 canvas
    const offsetX = (28 - newWidth) / 2;
    const offsetY = (28 - newHeight) / 2;

    // Draw the original canvas content onto the temporary 28x28 canvas, keeping the aspect ratio
    tempCtx.clearRect(0, 0, 28, 28); // Clear any previous content
    tempCtx.drawImage(canvas, offsetX, offsetY, newWidth, newHeight);

    // Get the image data from the scaled canvas
    const imageData = tempCtx.getImageData(0, 0, 28, 28);

    // Create an array to store the grayscale pixel values
    const grayscaleData = new Float32Array(28 * 28);

    // Loop through each pixel and convert to grayscale
    // Every 4th pixel represents whether it's black or white (IDK why)
    for (let i = 0; i < imageData.data.length; i += 4) {
        const gray = imageData.data[i + 3];
        grayscaleData[i / 4] = gray / 255; // normalize
    }

    return grayscaleData;
}

function getCanvasImageData(canvas) {
    const ctx = canvas.getContext("2d");
    if (!ctx) {
        throw new Error("Canvas context could not be retrieved.");
    }

    // Get the full image data from the canvas
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    return imageData;
}

document.getElementById("predictButton").addEventListener("click", async () => {
    const croppedCanvas = cropCanvas(canvas);
    const imgData = scaleCanvasTo28x28(croppedCanvas);
    const input = tf.tensor(imgData).reshape([1, 28, 28, 1]);
    const prediction = model.predict(input).dataSync();
    visualizePrediction(prediction);
    renderMatrix(imgData);
});

// Renders the raw 28x28 input tensor as a grid of 1s and 0s -
// this is literally the matrix the model reads to make its prediction.
function renderMatrix(grayscaleData) {
    const grid = document.getElementById("matrixGrid");
    grid.innerHTML = "";
    for (let i = 0; i < grayscaleData.length; i++) {
        const value = grayscaleData[i];
        const bit = value > 0.5 ? 1 : 0;
        const cell = document.createElement("div");
        cell.className = `matrix-cell ${bit ? "on" : "off"}`;
        cell.textContent = bit;
        cell.title = value.toFixed(3);
        grid.appendChild(cell);
    }
}

document.getElementById("matrixToggle").addEventListener("click", () => {
    const container = document.getElementById("matrixContainer");
    const isOpen = container.classList.toggle("open");
    document.getElementById("matrixToggle").textContent = isOpen ? "hide" : "show";
});

// Recursively formats a nested weight array into text. The innermost
// dimension is printed as one space-separated line of numbers; every
// outer dimension gets an index header so the file stays navigable.
function formatWeightTensor(arr, path = []) {
    if (typeof arr[0] === "number") {
        return arr.map((v) => v.toFixed(6)).join(" ") + "\n";
    }
    let out = "";
    for (let i = 0; i < arr.length; i++) {
        out += `-- [${path.concat(i).join("][")}] --\n`;
        out += formatWeightTensor(arr[i], path.concat(i));
    }
    return out;
}

async function buildWeightsText() {
    let text = "";
    text += "MODEL WEIGHTS - FULL RAW DUMP\n";
    text += "Source: ./models/model-digits-1-4.json\n";
    text += `Generated: ${new Date().toISOString()}\n`;
    text += "=".repeat(60) + "\n\n";

    text += "ARCHITECTURE\n";
    text += "-".repeat(60) + "\n";
    let totalParams = 0;
    for (const layer of model.layers) {
        const weights = layer.getWeights();
        const layerParams = weights.reduce((sum, w) => sum + w.size, 0);
        totalParams += layerParams;
        text += `${layer.name.padEnd(20)} ${layer.getClassName().padEnd(14)} output=${JSON.stringify(
            layer.outputShape
        )} params=${layerParams}\n`;
    }
    text += `\nTOTAL PARAMETERS: ${totalParams}\n`;
    text += "=".repeat(60) + "\n\n";

    for (const layer of model.layers) {
        const weights = layer.getWeights();
        const specs = layer.weights; // gives us the underlying variable names
        for (let i = 0; i < weights.length; i++) {
            const tensor = weights[i];
            const name = specs[i] ? specs[i].name : `${layer.name}/weight_${i}`;
            const shape = tensor.shape;
            const values = await tensor.array();

            text += `=== ${name}  shape=[${shape.join(",")}]  params=${tensor.size} ===\n`;
            if (shape.length === 0) {
                text += `${values.toFixed(6)}\n`;
            } else {
                text += formatWeightTensor(values);
            }
            text += "\n";
        }
    }

    return text;
}

document.getElementById("exportWeightsButton").addEventListener("click", async () => {
    const button = document.getElementById("exportWeightsButton");
    const status = document.getElementById("exportStatus");
    if (!model) {
        status.textContent = "model still loading, try again in a moment...";
        return;
    }
    button.disabled = true;
    status.textContent = "generating full weight dump (this can take a few seconds)...";

    // Let the disabled state / status text paint before the heavy synchronous work.
    await new Promise((resolve) => setTimeout(resolve, 50));

    const text = await buildWeightsText();
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "model-weights-full.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    status.textContent = `done - ${(text.length / 1024 / 1024).toFixed(2)} MB written.`;
    button.disabled = false;
});

function visualizePrediction(predictions) {
    const el = document.getElementById("predictions");
    el.innerHTML = "";
    for (let i = 0; i < predictions.length; i++) {
        el.insertAdjacentHTML(
            "beforeend",
            `<div class="prediction">
                <div class="bucket" style="background: rgba(50, 141, 47, ${predictions[
                    i
                ].toFixed(2)})">
                    ${(predictions[i] * 100).toFixed(2)}%
                </div>
                <div class="label">
                    ${i}
                </div>
            </div>`
        );
    }
}
