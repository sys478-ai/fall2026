export type Prediction = { className: string; probability: number };
export type ImageModel = {
  getClassLabels(): string[];
  predict(image: HTMLCanvasElement): Promise<Prediction[]>;
};

type Runtime = { loadFromFiles(model: File, weights: File, metadata: File): Promise<ImageModel> };
type TfGlobal = {
  getBackend?: () => string;
  version?: { tfjs?: string };
  env?: () => { getFlags?: () => Record<string, unknown> };
};
declare global {
  interface Window {
    tmImage?: Runtime;
    tf?: TfGlobal;
  }
}
let runtimePromise: Promise<Runtime> | undefined;

// Gathers everything that varies machine-to-machine for a tfjs/WebGL failure,
// so a report from one device is actually actionable instead of a bare
// error message that only says "could not classify".
export function diagnostics(err: unknown) {
  const lines: string[] = [];
  if (err instanceof Error) {
    lines.push(`${err.name}: ${err.message}`);
    if (err.stack) lines.push(err.stack);
  } else {
    lines.push(String(err));
  }
  lines.push('');
  lines.push(`User agent: ${navigator.userAgent}`);
  try {
    const tf = window.tf;
    if (tf) {
      lines.push(`tfjs backend: ${tf.getBackend?.() ?? 'unknown'}`);
      lines.push(`tfjs version: ${tf.version?.tfjs ?? 'unknown'}`);
    } else {
      lines.push('tfjs: not loaded');
    }
  } catch (diagError) {
    lines.push(`tfjs diagnostics failed: ${diagError instanceof Error ? diagError.message : diagError}`);
  }
  try {
    const gl = (document.createElement('canvas').getContext('webgl2') ||
      document.createElement('canvas').getContext('webgl')) as WebGLRenderingContext | null;
    if (gl) {
      const info = gl.getExtension('WEBGL_debug_renderer_info');
      lines.push(`WebGL: available (${gl instanceof WebGL2RenderingContext ? 'webgl2' : 'webgl1'})`);
      if (info) {
        lines.push(`GPU renderer: ${gl.getParameter(info.UNMASKED_RENDERER_WEBGL)}`);
        lines.push(`GPU vendor: ${gl.getParameter(info.UNMASKED_VENDOR_WEBGL)}`);
      }
    } else {
      lines.push('WebGL: not available');
    }
  } catch (glError) {
    lines.push(`WebGL diagnostics failed: ${glError instanceof Error ? glError.message : glError}`);
  }
  return lines.join('\n');
}

function script(src: string) {
  return new Promise<void>((resolve, reject) => {
    const element = document.createElement('script');
    element.src = src;
    element.onload = () => resolve();
    element.onerror = () => {
      element.remove();
      reject(new Error('Could not load the image library. Check your internet connection and try again.'));
    };
    document.head.appendChild(element);
  });
}

export function loadRuntime() {
  if (window.tmImage) return Promise.resolve(window.tmImage);
  runtimePromise ??= (async () => {
    // Versions paired in the official Teachable Machine image library example.
    await script('https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.3.1/dist/tf.min.js');
    await script('https://cdn.jsdelivr.net/npm/@teachablemachine/image@0.8.3/dist/teachablemachine-image.min.js');
    if (!window.tmImage) throw new Error('The image library did not initialize.');
    return window.tmImage;
  })().catch(error => {
    runtimePromise = undefined;
    throw error;
  });
  return runtimePromise;
}

export async function readModelFiles(selected: File[]) {
  let files = selected;
  if (files.length === 1 && files[0].name.toLowerCase().endsWith('.zip')) {
    const { default: JSZip } = await import('jszip');
    const zip = await JSZip.loadAsync(await files[0].arrayBuffer());
    const entries = Object.values(zip.files).filter(entry => !entry.dir && !entry.name.startsWith('__MACOSX/'));
    files = await Promise.all(
      entries.map(async entry => new File([await entry.async('arraybuffer')], entry.name.split('/').pop()!))
    );
  }
  const model = files.find(file => file.name === 'model.json');
  const metadata = files.find(file => file.name === 'metadata.json');
  const weights = files.filter(file => file.name.endsWith('.bin'));
  if (!model || !metadata || weights.length !== 1)
    throw new Error(
      'Select the downloaded TensorFlow.js ZIP, or model.json, metadata.json, and the single .bin weights file together.'
    );
  const info = JSON.parse(await metadata.text());
  if (!Array.isArray(info.labels) || !info.labels.every((label: unknown) => typeof label === 'string'))
    throw new Error('This export has no valid image class labels. Export an image model from Teachable Machine.');
  return { model, metadata, weights: weights[0], labels: info.labels as string[] };
}
