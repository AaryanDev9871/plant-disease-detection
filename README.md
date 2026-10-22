# 🌿 Plant Leaf Disease Detection

An AI-powered web application that classifies plant leaf images into disease categories using **MobileNetV2, TensorFlow/Keras, FastAPI, and React**.

🔗 **GitHub Repository:** [AaryanDev9871/plant-disease-detection](https://github.com/AaryanDev9871/plant-disease-detection)

---

## 📌 Overview

Plant diseases can reduce crop quality and agricultural productivity. Early identification helps growers recognize potential problems and seek appropriate treatment.

This project uses a deep-learning image classification model to predict the disease category of an uploaded plant leaf image. A React frontend provides the user interface, while a FastAPI backend processes the image and returns the model's prediction.

## ✨ Features

- 🌱 Upload a plant leaf image for analysis.
- 🧠 Predict disease categories using a trained MobileNetV2 model.
- 📊 Return a predicted class and confidence score.
- ⚡ Provide predictions through a FastAPI REST endpoint.
- 💻 Offer a web interface built with React and Vite.
- 🗂️ Support 38 plant disease and healthy-leaf classes.

> **Note:** The application performs image-level classification. It does not currently measure the percentage of leaf area affected by a disease.

## 🛠️ Technology Stack

| Component | Technology |
|---|---|
| Programming language | Python, JavaScript |
| Deep learning | TensorFlow, Keras |
| Model architecture | MobileNetV2 |
| Backend API | FastAPI |
| Frontend | React |
| Frontend tooling | Vite |
| Model format | Keras (`.keras`) |
| Version control | Git and GitHub |

## 🏗️ System Architecture

```text
          User uploads leaf image
                    |
                    v
          React + Vite Frontend
                    |
                    v
            FastAPI Backend
                    |
                    v
       Image Preprocessing (224×224)
                    |
                    v
       Trained MobileNetV2 Model
                    |
                    v
       Predicted Class + Confidence
                    |
                    v
          Result shown to user
```

## 📂 Project Structure

```text
plant-disease-detection/
│
├── main.py                     # FastAPI backend
├── plant_disease_model.keras   # Trained model
├── class_names.json            # Class labels
├── .gitignore                  # Git exclusions
├── README.md                   # Project documentation
│
└── frontend/
    ├── package.json            # Frontend dependencies
    ├── index.html
    ├── public/
    └── src/
        ├── App.jsx             # Main React component
        ├── App.css             # Application styling
        ├── index.css           # Global styles
        └── main.jsx            # React entry point
```

## ⚙️ Prerequisites

Install the following before running the project:

- Python with a TensorFlow-compatible version
- Node.js and npm
- Git
- A modern web browser

## 🚀 Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/AaryanDev9871/plant-disease-detection.git
cd plant-disease-detection
```

### 2. Set up the Python environment

**Windows PowerShell:**

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
```

Install the dependencies used by the backend:

```powershell
pip install fastapi "uvicorn[standard]" python-multipart pillow numpy tensorflow
```

Use Python and TensorFlow versions compatible with your environment. If you already have a working project environment, activate it and retain its tested dependency versions.

### 3. Start the backend

From the project root, run:

```powershell
python -m uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

The backend should be available at:

- **API:** http://127.0.0.1:8000
- **Health check:** http://127.0.0.1:8000/health
- **Interactive API documentation:** http://127.0.0.1:8000/docs

Keep this terminal running.

### 4. Install and start the frontend

Open a second terminal:

```powershell
cd frontend
npm install
npm run dev
```

Open the local URL printed by Vite, usually:

http://localhost:5173

If Vite selects another port, use the URL displayed in your terminal.

## 🔌 API Endpoint

The backend exposes an image prediction endpoint:

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/` | Root endpoint |
| `GET` | `/health` | Check backend health |
| `POST` | `/predict` | Predict a class from an uploaded image |

### Example request

Send a `multipart/form-data` POST request to `/predict` with the image in a field named `file`.

```bash
curl -X POST "http://127.0.0.1:8000/predict" \
  -F "file=@leaf.jpg"
```

The exact response fields depend on the backend implementation. Use `/docs` to inspect the live API schema and try the endpoint interactively.

## 🧪 Model and Evaluation

The project uses MobileNetV2, a convolutional neural network architecture, with transfer learning for plant leaf image classification.

| Parameter | Project details |
|---|---|
| Model architecture | MobileNetV2 |
| Input image size | 224 × 224 pixels |
| Number of classes | 38 |
| Model file | `plant_disease_model.keras` |
| Class mapping | `class_names.json` |
| Reported test accuracy | 95.92% |

The reported test accuracy should be interpreted alongside a verified evaluation run. Per-class precision, recall, F1-scores, and the confusion matrix should only be added after confirming that the evaluation labels align correctly with the predictions.

## 🔮 Future Improvements

- Deploy the application to a cloud platform.
- Improve testing and error handling.
- Add Grad-CAM visualizations to explain model predictions.
- Evaluate per-class precision, recall, and F1-score.
- Explore mobile-friendly model deployment.
- Investigate disease severity estimation as a separate feature.

## 🎓 Project Information

**Project:** Plant Leaf Disease Detection  
**Student:** Aaryan Dev Shridhar  
**Programme:** B.Tech, Computer Science and Engineering  
**Institution:** University School of Information, Communication and Technology (USICT), Guru Gobind Singh Indraprastha University (GGSIPU)

## ⚠️ Disclaimer

This application provides model-based predictions for educational and demonstration purposes. Predictions may be incorrect and should not replace expert agricultural diagnosis.

## 🤝 Contributions

Suggestions, bug reports, and improvements are welcome. Open an issue or submit a pull request through the [GitHub repository](https://github.com/AaryanDev9871/plant-disease-detection).

## 📄 License

A license has not yet been specified. Please add an appropriate license file before allowing others to reuse or redistribute this project.
