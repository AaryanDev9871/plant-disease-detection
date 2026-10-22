
import { useState } from "react";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleFileChange(event) {
    const selected = event.target.files?.[0];
    if (!selected) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(selected.type)) {
      setError("Please upload a JPG, PNG, or WebP image.");
      return;
    }

    if (selected.size > 10 * 1024 * 1024) {
      setError("Image size must be less than 10 MB.");
      return;
    }

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
    setResult(null);
    setError("");
  }

  async function handlePredict() {
    if (!file) {
      setError("Please upload a leaf image first.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Prediction failed.");
      }

      setResult(data);
    } catch (err) {
      setError(
        err.message || "Could not connect to the backend. Check that it is running."
      );
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setFile(null);
    setPreview("");
    setResult(null);
    setError("");
  }

  return (
    <main className="app">
      <nav className="navbar">
        <div className="brand">
          <span className="brand-icon">✿</span>
          <span>Plant Disease Detection</span>
        </div>

        <div className="college-info">
          <strong>Aryan Dev Shridhar</strong>
          <span>USICT · GGSIPU</span>
        </div>
      </nav>

      <section className="hero">
        <div className="eyebrow">
          <span className="status-dot" />
          DEEP LEARNING · PLANT HEALTH
        </div>

        <h1>
          A healthier garden
          <br />
          starts with <span>one leaf.</span>
        </h1>

        <p className="subtitle">
          Upload a leaf photo to identify a possible plant disease using
          our deep learning model.
        </p>
      </section>

      <section className="workspace">
        <div className="panel">
          <div className="section-heading">
            <div>
              <span className="step-label">STEP 01</span>
              <h2>Upload a leaf image</h2>
            </div>
            <span className="file-type">JPG · PNG · WEBP</span>
          </div>

          <label className={`dropzone ${preview ? "has-image" : ""}`}>
            {preview ? (
              <img className="preview-image" src={preview} alt="Selected leaf" />
            ) : (
              <div className="upload-placeholder">
                <div className="upload-icon">↑</div>
                <strong>Choose a leaf image</strong>
                <span>Click here to browse your files</span>
                <small>Maximum file size: 10 MB</small>
              </div>
            )}

            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileChange}
              hidden
            />
          </label>

          {file && (
            <div className="selected-file">
              <span className="file-name">{file.name}</span>
              <button className="remove-button" onClick={handleReset}>
                Remove
              </button>
            </div>
          )}

          {error && <p className="error-message">{error}</p>}

          <button
            className="predict-button"
            onClick={handlePredict}
            disabled={!file || loading}
          >
            {loading ? "Analyzing image..." : "Detect Plant Disease →"}
          </button>

          <p className="privacy-note">
            Image processed by your local prediction server.
          </p>
        </div>

        <div className="panel">
          <div className="section-heading">
            <div>
              <span className="step-label">STEP 02</span>
              <h2>Analysis results</h2>
            </div>
            <span className="result-tag">MODEL OUTPUT</span>
          </div>

          {loading ? (
            <div className="result-empty">
              <div className="loader" />
              <strong>Analyzing your leaf</strong>
              <p>Please wait while the model processes your image.</p>
            </div>
          ) : result ? (
            <div className="result-content">
              <div className="result-symbol">✓</div>
              <span className="result-overline">PREDICTED CLASS</span>

              <h3>
                {result.predicted_class
                  .replaceAll("___", " — ")
                  .replaceAll("_", " ")}
              </h3>

              <div className="confidence-row">
                <span>Model confidence</span>
                <strong>{Number(result.confidence).toFixed(2)}%</strong>
              </div>

              <div className="confidence-track">
                <div
                  className="confidence-fill"
                  style={{
                    width: `${Math.min(100, Math.max(0, result.confidence))}%`,
                  }}
                />
              </div>

              <p className="result-disclaimer">
                This is a model prediction, not a confirmed diagnosis.
                Accuracy may vary on real-world leaf photographs.
              </p>

              <button className="secondary-button" onClick={handleReset}>
                Analyze another image
              </button>
            </div>
          ) : (
            <div className="result-empty">
              <div className="result-placeholder">01</div>
              <strong>Your results will appear here</strong>
              <p>Upload a leaf image and run the prediction.</p>

              <div className="result-feature">
                <span>✓</span>
                38 plant disease and health categories
              </div>
              <div className="result-feature">
                <span>✓</span>
                MobileNetV2 deep learning model
              </div>
            </div>
          )}
        </div>
      </section>

      <footer>
        <span>Plant Disease Detection Project</span>
        <span>Aryan Dev Shridhar · USICT, GGSIPU</span>
      </footer>
    </main>
  );
}

export default App;
