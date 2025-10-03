from flask import Flask,request,jsonify
from flask_cors import CORS
import joblib
import os
import re
from nltk.corpus import stopwords
import nltk
nltk.download('stopwords')
stop_words = set(stopwords.words('english'))

def clean_text(s):
    s = str(s).lower()
    s = re.sub(r'\r|\n',' ',s)
    s = re.sub(r'[^a-z0-9\s]',' ',s)
    s = re.sub(r'\s+',' ',s).strip()
    words = s.split()
    filtered_words = [word for word in words if word not in stop_words]
    return ' '.join(filtered_words)

MODEL_PATH = "spam_model.pkl"
VECT_PATH = "vectorizer.pkl"


if(not os.path.exists(MODEL_PATH) or not os.path.exists(VECT_PATH)):
    raise SystemExit("Model or vectorizer not found. Run train_model.py first.")

model = joblib.load(MODEL_PATH)
vectorizer = joblib.load(VECT_PATH)

app = Flask(__name__)
CORS(app)

@app.route("/predict",methods=["POST"])

def predict():
    data = request.get_json(force=True)
    text = data.get("text","")
    if(not isinstance(text,str) or text.strip()==""):
        return jsonify({"error": "Please provide 'text' in JSON body."})
    cleaned_text = clean_text(text)
    X = vectorizer.transform([cleaned_text])
    pred = model.predict(X)
    prob = None
    if(hasattr(model,"predict_proba")):
        prob = float(max(model.predict_proba(X)[0]))
    return jsonify({
        "prediction":"spam" if(int(pred)==1) else "ham",
        "probability":prob
    })
if(__name__ == "__main__"):
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))