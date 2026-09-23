'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { diagnostics, ImageModel, loadRuntime, Prediction, readModelFiles } from './runtime';
import styles from './lab.module.css';

export default function TeachableLab() {
  const model = useRef<ImageModel | null>(null);
  const video = useRef<HTMLVideoElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const stream = useRef<MediaStream | null>(null);
  const alive = useRef(true);
  const requestId = useRef(0);
  const [labels, setLabels] = useState<string[]>([]);
  const [messages, setMessages] = useState<string[]>([]);
  const [name, setName] = useState('');
  const [filename, setFilename] = useState('');
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(false);
  const [running, setRunning] = useState(false);
  const [cameraOn, setCameraOn] = useState(false);
  const [cameraBusy, setCameraBusy] = useState(false);
  const [error, setError] = useState('');
  const [errorDetails, setErrorDetails] = useState('');
  const [copied, setCopied] = useState(false);
  const [result, setResult] = useState<{ prediction: Prediction; message: string } | null>(null);

  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
      stream.current?.getTracks().forEach(track => track.stop());
    };
  }, []);

  function clearError() {
    setError('');
    setErrorDetails('');
    setCopied(false);
  }

  function showError(message: string, err?: unknown) {
    setError(message);
    setErrorDetails(err === undefined ? '' : diagnostics(err));
    setCopied(false);
  }

  function stopCamera() {
    requestId.current++;
    stream.current?.getTracks().forEach(track => track.stop());
    stream.current = null;
    if (video.current) video.current.srcObject = null;
    setCameraOn(false);
    setCameraBusy(false);
  }

  async function startCamera() {
    const request = ++requestId.current;
    setCameraBusy(true);
    clearError();
    try {
      if (!navigator.mediaDevices?.getUserMedia) throw new Error('Camera access requires HTTPS or localhost.');
      const media = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: false });
      if (!alive.current || request !== requestId.current) {
        media.getTracks().forEach(track => track.stop());
        return;
      }
      stream.current = media;
      video.current!.srcObject = media;
      await video.current!.play();
      if (alive.current && request === requestId.current) setCameraOn(true);
    } catch (err) {
      if (alive.current && request === requestId.current) {
        stopCamera();
        showError(
          `Camera could not start. Allow camera access, then try again. ${err instanceof Error ? err.message : ''}`,
          err
        );
      }
    } finally {
      if (alive.current && request === requestId.current) setCameraBusy(false);
    }
  }

  async function load(files: File[]) {
    if (!files.length) return;
    setLoading(true);
    clearError();
    try {
      const data = await readModelFiles(files);
      if (!data.labels.length) throw new Error('This model has no classes. Export a trained image model.');
      const runtime = await loadRuntime();
      const loaded = await runtime.loadFromFiles(data.model, data.weights, data.metadata);
      if (!alive.current) return;
      const classes = loaded.getClassLabels();
      model.current = loaded;
      setLabels(classes);
      setMessages(classes.map(() => ''));
      setFilename(files.map(file => file.name).join(', '));
      setResult(null);
    } catch (err) {
      if (alive.current)
        showError(
          `${err instanceof Error ? err.message : 'Could not load this image model.'}${model.current ? ' Your previously loaded model is still selected.' : ''}`,
          err
        );
    } finally {
      if (alive.current) setLoading(false);
    }
  }

  async function checkImage() {
    if (!model.current || !video.current?.videoWidth || !canvas.current) return;
    setChecking(true);
    clearError();
    const request = requestId.current;
    try {
      const context = canvas.current.getContext('2d')!;
      const { videoWidth: width, videoHeight: height } = video.current;
      const side = Math.min(width, height);
      context.save();
      context.translate(224, 0);
      context.scale(-1, 1);
      context.drawImage(video.current, (width - side) / 2, (height - side) / 2, side, side, 0, 0, 224, 224);
      context.restore();
      const predictions = await model.current.predict(canvas.current);
      if (!alive.current || request !== requestId.current) return;
      if (!predictions.length) throw new Error('The model returned no predictions.');
      const prediction = predictions.reduce((best, current) =>
        current.probability > best.probability ? current : best
      );
      setResult({ prediction, message: messages[labels.indexOf(prediction.className)] });
    } catch (err) {
      if (alive.current && request === requestId.current) {
        setResult(null);
        showError(`Could not classify the image. ${err instanceof Error ? err.message : 'Try again.'}`, err);
      }
    } finally {
      if (alive.current) setChecking(false);
    }
  }

  const ready = labels.length > 0 && name.trim() && messages.every(message => message.trim());

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <Link href="/topics">← Course schedule</Link>
        <span>SYS 478 · Image model lab</span>
      </header>
      <div className={styles.content}>
        {!running && (
          <>
            <p className={styles.eyebrow}>Classification → determination</p>
            <h1>What should your system say?</h1>
            <p className={styles.intro}>Bring an image model. Decide what each prediction means.</p>
            <form
              onSubmit={event => {
                event.preventDefault();
                if (ready && !loading) {
                  setResult(null);
                  setRunning(true);
                  void startCamera();
                }
              }}
            >
              <section className={styles.section}>
                <h2>
                  <span>1</span> Upload your model
                </h2>
                <p>
                  In Teachable Machine, choose <strong>Export Model → TensorFlow.js → Download</strong>.
                </p>
                <label className={styles.upload}>
                  {labels.length ? 'Replace model (optional)' : 'Model ZIP or extracted files'}
                  <input
                    type="file"
                    accept=".zip,.json,.bin"
                    multiple
                    disabled={loading}
                    onChange={event => {
                      void load(Array.from(event.target.files || []));
                    }}
                  />
                </label>
                <p className={labels.length ? styles.success : styles.hint} role="status">
                  {loading
                    ? 'Loading your model…'
                    : labels.length
                      ? `Loaded ${filename} · ${labels.length} classes`
                      : 'Choose the ZIP, or model.json, metadata.json, and weights.bin together.'}
                </p>
              </section>
              <section className={styles.section}>
                <h2>
                  <span>2</span> Name your system
                </h2>
                <label htmlFor="system-name" className={styles.srOnly}>
                  Name of system
                </label>
                <input
                  id="system-name"
                  type="text"
                  value={name}
                  required
                  placeholder="e.g. Workplace Productivity Monitor"
                  onChange={event => setName(event.target.value)}
                />
              </section>
              <section className={styles.section}>
                <h2>
                  <span>3</span> Write a determination for each class
                </h2>
                <p>When this class wins, your system will display exactly what you write.</p>
                {!labels.length && (
                  <p className={styles.hint}>Your model’s classes will appear here after you upload it.</p>
                )}
                {labels.map((label, index) => (
                  <label className={styles.rule} key={`${index}-${label}`}>
                    <span>
                      If <strong>{label}</strong>, say:
                    </span>
                    <textarea
                      required
                      rows={2}
                      value={messages[index]}
                      placeholder="Write the message or simulated action…"
                      onChange={event =>
                        setMessages(previous =>
                          previous.map((message, i) => (index === i ? event.target.value : message))
                        )
                      }
                    />
                  </label>
                ))}
              </section>
              {!ready && (
                <p className={styles.hint}>Load a model, name the system, and fill in every determination to start.</p>
              )}
              <button className={styles.primary} type="submit" disabled={!ready || loading}>
                Start system →
              </button>
            </form>
          </>
        )}
        <div hidden={!running}>
          <div className={styles.runHeader}>
            <div>
              <p className={styles.eyebrow}>Your system</p>
              <h1>{name}</h1>
            </div>
            <button
              disabled={checking}
              onClick={() => {
                stopCamera();
                setResult(null);
                clearError();
                setRunning(false);
              }}
            >
              Edit system
            </button>
          </div>
          <div className={styles.runGrid}>
            <section>
              <video ref={video} muted playsInline aria-label="Live camera preview" />
              <p className={styles.hint}>
                {cameraBusy
                  ? 'Starting camera…'
                  : cameraOn
                    ? 'Show something to the camera, then check the image.'
                    : 'Camera is off.'}
              </p>
              <div className={styles.buttons}>
                <button className={styles.primary} disabled={!cameraOn || checking} onClick={() => void checkImage()}>
                  {checking ? 'Checking…' : 'Check image'}
                </button>
                {cameraOn ? (
                  <button disabled={checking} onClick={stopCamera}>
                    Stop camera
                  </button>
                ) : (
                  <button disabled={cameraBusy} onClick={() => void startCamera()}>
                    Start camera
                  </button>
                )}
              </div>
            </section>
            <section className={styles.result} aria-live="polite" aria-atomic="true">
              <p className={styles.eyebrow}>Determination</p>
              {result ? (
                <>
                  <h2>{result.message}</h2>
                  <p>
                    Model classified this image as <strong>“{result.prediction.className}”</strong> · Score:{' '}
                    {(result.prediction.probability * 100).toFixed(1)}%
                  </p>
                  <small>Result from your last check. The score is not measured accuracy.</small>
                </>
              ) : (
                <>
                  <h2>Ready when you are.</h2>
                  <p>Click Check image to see your system’s determination.</p>
                </>
              )}
            </section>
          </div>
        </div>
        <canvas ref={canvas} width="224" height="224" hidden />
        {error && (
          <div className={styles.error} role="alert">
            <p>{error}</p>
            {errorDetails && (
              <details className={styles.errorDetails}>
                <summary>Technical details (for reporting)</summary>
                <pre>{errorDetails}</pre>
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(errorDetails);
                      setCopied(true);
                    } catch {
                      setCopied(false);
                    }
                  }}
                >
                  {copied ? 'Copied' : 'Copy details'}
                </button>
              </details>
            )}
          </div>
        )}
        <footer className={styles.footer}>
          Determinations are simulated messages. No actions are taken or records created. Model files and images stay in
          this browser. Reloading clears your setup.
        </footer>
      </div>
    </div>
  );
}
