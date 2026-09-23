import pandas as pd
import os
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

class MedicalDataset:
    def __init__(self):
        self.symptoms_data = None
        self.diseases_data = None
        self.load_datasets()
    
    def load_datasets(self):
        """Load medical datasets"""
        try:
            # Look for CSV files in the database directory
            database_dir = os.path.join(os.path.dirname(__file__), '..', 'database')
            if os.path.exists(database_dir):
                csv_files = [f for f in os.listdir(database_dir) if f.endswith('.csv')]
                
                for file in csv_files:
                    file_path = os.path.join(database_dir, file)
                    df = pd.read_csv(file_path)
                if 'symptom' in file.lower() or 'symptoms' in df.columns:
                    self.symptoms_data = df
                    print(f"Loaded symptoms data from {file}")
                elif 'disease' in file.lower() or 'disease' in df.columns:
                    self.diseases_data = df
                    print(f"Loaded diseases data from {file}")
        except Exception as e:
            print(f"Error loading datasets: {e}")
    
    def find_similar_diseases(self, symptoms: list) -> list:
        """Find diseases similar to given symptoms using dataset"""
        if self.symptoms_data is None:
            return []
        
        try:
            symptoms_text = " ".join(symptoms)
            
            # Create vectorizer
            vectorizer = TfidfVectorizer(analyzer='char', ngram_range=(2, 2))
            
            # Get all symptom combinations from dataset
            dataset_symptoms = self.symptoms_data.get('Symptom', []).tolist() if hasattr(self.symptoms_data, 'Symptom') else []
            
            if not dataset_symptoms:
                return []
            
            # Vectorize
            vectors = vectorizer.fit_transform(dataset_symptoms + [symptoms_text])
            
            # Calculate similarity
            similarities = cosine_similarity(vectors[-1], vectors[:-1])[0]
            
            # Get top matches
            top_indices = np.argsort(similarities)[-5:][::-1]
            
            results = []
            for idx in top_indices:
                if similarities[idx] > 0.1:  # Threshold
                    results.append({
                        'disease': dataset_symptoms[idx],
                        'similarity': float(similarities[idx])
                    })
            
            return results
        except Exception as e:
            print(f"Error finding similar diseases: {e}")
            return []
    
    def get_disease_info(self, disease_name: str) -> dict:
        """Get information about a disease from dataset"""
        if self.diseases_data is None:
            return {}
        
        try:
            disease_info = self.diseases_data[
                self.diseases_data.apply(lambda row: disease_name.lower() in str(row).lower(), axis=1)
            ]
            
            if disease_info.empty:
                return {}
            
            return disease_info.iloc[0].to_dict()
        except Exception as e:
            print(f"Error getting disease info: {e}")
            return {}

# Initialize dataset
medical_dataset = MedicalDataset()
