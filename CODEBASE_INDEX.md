# Spam Classifier Codebase Index

## Project Overview
A full-stack spam classification application with a React frontend, Flask backend, and machine learning model for text classification.

## Architecture
```
┌─────────────────┐    HTTP API    ┌─────────────────┐    ML Model    ┌─────────────────┐
│   React Frontend │ ◄─────────────► │   Flask Backend │ ◄─────────────► │   ML Pipeline   │
│   (Port 5173)    │                │   (Port 5000)    │                │   (Python)      │
└─────────────────┘                └─────────────────┘                └─────────────────┘
```

## Directory Structure

### `/backend/`
- **Purpose**: Node.js backend (currently minimal setup)
- **Files**:
  - `package.json` - Basic Node.js configuration (no dependencies yet)

### `/frontend/`
- **Purpose**: React + Vite frontend application
- **Technology Stack**: React 19, Vite, TailwindCSS, Heroicons
- **Files**:
  - `package.json` - Dependencies and scripts
  - `vite.config.js` - Vite configuration with React and TailwindCSS plugins
  - `src/App.jsx` - Main application component
  - `src/main.jsx` - Application entry point
  - `src/components/SpamForm.jsx` - Main spam classification form component
  - `src/App.css` - TailwindCSS imports
  - `src/index.css` - Global styles

### `/ml_model/`
- **Purpose**: Machine learning model training and API server
- **Technology Stack**: Python, Flask, scikit-learn, NLTK, pandas
- **Files**:
  - `app.py` - Flask API server for spam prediction
  - `train_model.py` - Model training script
  - `data/spam.csv` - Training dataset (5,572 SMS messages)
  - `spam_model.pkl` - Trained model file
  - `vectorizer.pkl` - TF-IDF vectorizer

### `/venv/`
- **Purpose**: Python virtual environment
- **Dependencies**: Flask, scikit-learn, pandas, NLTK, joblib, numpy

## Key Components

### 1. Machine Learning Pipeline (`/ml_model/`)

#### Model Training (`train_model.py`)
- **Algorithm**: Compares KNN vs Decision Tree classifiers
- **Features**: TF-IDF vectorization with 1-2 n-grams
- **Text Preprocessing**:
  - Convert to lowercase
  - Remove special characters
  - Remove stopwords (English)
  - Handle whitespace normalization
- **Data**: 5,572 SMS messages (ham/spam classification)
- **Output**: Best performing model saved as pickle files

#### API Server (`app.py`)
- **Endpoint**: `POST /predict`
- **Input**: JSON with `text` field
- **Output**: JSON with `prediction` ("spam"/"ham") and `probability`
- **Text Processing**: Same preprocessing as training
- **CORS**: Enabled for frontend communication

### 2. Frontend Application (`/frontend/`)

#### Main Component (`SpamForm.jsx`)
- **Features**:
  - Text input area for message
  - Submit button with loading state
  - Prediction display with confidence score
  - Visual indicators (icons, color-coded badges)
  - Error handling for API failures
- **Styling**: TailwindCSS with gradient backgrounds
- **API Integration**: Fetches from `http://127.0.0.1:5000/predict`

#### App Structure (`App.jsx`)
- Simple wrapper component
- Note: Contains typo in className (`lassName` instead of `className`)

### 3. Data and Models

#### Dataset (`spam.csv`)
- **Format**: CSV with Category and Message columns
- **Size**: 5,572 messages
- **Labels**: "ham" (legitimate) and "spam"
- **Sample Data**:
  - Ham: "Go until jurong point, crazy.. Available only in bugis..."
  - Spam: "Free entry in 2 a wkly comp to win FA Cup final tkts..."

#### Model Files
- `spam_model.pkl` - Trained classifier (KNN or Decision Tree)
- `vectorizer.pkl` - TF-IDF vectorizer for text preprocessing

## API Endpoints

### POST `/predict`
- **Purpose**: Classify text as spam or ham
- **Request Body**:
  ```json
  {
    "text": "Your message here"
  }
  ```
- **Response**:
  ```json
  {
    "prediction": "spam" | "ham",
    "probability": 0.95
  }
  ```

## Dependencies

### Frontend (`/frontend/package.json`)
- **Core**: React 19, React-DOM 19
- **Build**: Vite with React plugin
- **Styling**: TailwindCSS 4.1.14
- **Icons**: Heroicons React 2.2.0
- **Linting**: ESLint with React plugins

### Backend (`/ml_model/`)
- **Web Framework**: Flask 3.1.2
- **ML Libraries**: scikit-learn, pandas, numpy
- **NLP**: NLTK 3.9.2
- **Serialization**: joblib
- **CORS**: flask-cors

## Development Setup

### Frontend
```bash
cd frontend
npm install
npm run dev  # Starts on port 5173
```

### Backend/ML
```bash
cd ml_model
# Activate virtual environment
source ../venv/bin/activate
# Train model (if not already done)
python train_model.py
# Start API server
python app.py  # Starts on port 5000
```

## Key Features

### Text Preprocessing Pipeline
1. Convert to lowercase
2. Remove line breaks and normalize whitespace
3. Remove special characters (keep alphanumeric and spaces)
4. Remove English stopwords
5. Join filtered words

### Model Selection
- **KNN**: 5 neighbors, evaluated on test set
- **Decision Tree**: Max depth 20, balanced class weights
- **Selection**: Based on F1 score comparison
- **Vectorization**: TF-IDF with 1-2 n-grams, max_df=0.9, min_df=1

### Frontend Features
- **Real-time Classification**: Instant spam detection
- **Confidence Scoring**: Probability display
- **Visual Feedback**: Color-coded results with icons
- **Responsive Design**: Mobile-friendly interface
- **Error Handling**: Graceful API failure handling

## Known Issues
1. **Frontend**: Typo in `App.jsx` - `lassName` should be `className`
2. **Backend**: No error handling for malformed requests
3. **Model**: No model versioning or retraining pipeline
4. **Security**: No input validation or rate limiting

## File Sizes and Performance
- **Dataset**: ~200KB (5,572 messages)
- **Model**: ~1-2MB (pickle files)
- **Frontend Bundle**: Optimized with Vite
- **API Response Time**: <100ms for typical messages

## Development Notes
- Model training is a one-time process
- Frontend expects backend on localhost:5000
- CORS is configured for local development
- Virtual environment contains all Python dependencies
- No database required - stateless API design
