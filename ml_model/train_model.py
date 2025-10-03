import os 
import pandas as pd
import re
import joblib
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import classification_report,accuracy_score,f1_score
from nltk.corpus import stopwords

DATA_PATH = "data/spam.csv"
MODEL_OUT = "spam_model.pkl"
VECT_OUT = "vectorizer.pkl"

def load_dataset(path):
    df = pd.read_csv(path,encoding="latin-1")
    df = df.loc[:,~df.columns.str.contains("^Unnamed")]
    if({"v1","v2"}.issubset(df.columns)):
        df = df.rename(columns={"v1":"label","v2":"message"})
    elif({"label","message"}.issubset(df.columns)):
        pass
    else:
        cols = list(df.columns)
        df = df.rename(columns={cols[0]:"label",cols[1]:"message"})
    df = df[["label","message"]].dropna()
    return df

def clean_text(s):
    s = str(s).lower()
    s = re.sub(r'\r|\n',' ',s)
    s = re.sub(r'[^a-z0-9\s]',' ',s)
    s = re.sub(r'\s+',' ',s).strip()
    stop_words = set(stopwords.words('english'))
    words = s.split()
    filtered_words = []
    for word in words:
        if(word not in stop_words):
            filtered_words.append(word)
    cleaned_text = ' '.join(filtered_words)
    return cleaned_text

def train_and_save():
    print("Loading dataset...")
    df = load_dataset(DATA_PATH)
    df['message'] = df['message'].astype(str).apply(clean_text)
    df['label_num'] = df['label'].map(lambda x: 1 if str(x).lower().startswith('spam') else 0)

    X = df['message'].values
    y = df['label_num'].values

    vectorizer = TfidfVectorizer(stop_words=None,max_df=0.9,min_df=1,ngram_range=(1,2))
    X_vec = vectorizer.fit_transform(X)
    print("win" in vectorizer.get_feature_names_out())   
    print("free" in vectorizer.get_feature_names_out())  
    print("iphone" in vectorizer.get_feature_names_out())


    X_train,X_test,y_train,y_test = train_test_split(X_vec,y,test_size=0.2,random_state=42,stratify=y)

    print("Training KNN...")
    knn = KNeighborsClassifier(n_neighbors=5)
    knn.fit(X_train,y_train)
    knn_pred = knn.predict(X_test)
    knn_acc = accuracy_score(y_test,knn_pred)
    knn_f1 = f1_score(y_test,knn_pred)
    print("KNN acc f1: ",knn_acc,knn_f1)

    print("Training Decision Tree...")
    dt = DecisionTreeClassifier(max_depth=20,random_state=42,class_weight='balanced')
    dt.fit(X_train,y_train)
    dt_pred = dt.predict(X_test)
    dt_acc = accuracy_score(y_test, dt_pred)
    dt_f1 = f1_score(y_test, dt_pred)
    print("DecisionTree acc f1: ",dt_acc,dt_f1)

    print(set(stopwords.words('english')))

    if(knn_f1>=dt_f1):
        best_model = knn
        print("Model KNN")
    else:
        best_model = dt
        print("Model DecisionTree")
    y_pred_best = best_model.predict(X_test)
    print(classification_report(y_test, y_pred_best, target_names=["ham","spam"]))

    print("Saving model and vectorizer...")
    joblib.dump(best_model,MODEL_OUT)
    joblib.dump(vectorizer,VECT_OUT)
    print("Saved to: ",MODEL_OUT,VECT_OUT)
    print(clean_text("Win a free iPhone now!"))


if __name__ == "__main__":
    if(not os.path.exists(DATA_PATH)):
        raise SystemExit(f"Dataset not found at {DATA_PATH}. Put spam.csv there.")
    train_and_save()

