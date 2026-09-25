import sys
import os
import pickle
import pandas as pd
from typing import List, Dict, Any, Optional

if sys.platform.startswith('win'):
    try:
        sys.stdout.reconfigure(encoding='utf-8', errors='replace')
        sys.stderr.reconfigure(encoding='utf-8', errors='replace')
    except Exception:
        pass

class MedicalDataset:
    def __init__(self):
        self.disease_symptom_map: Dict[str, Dict[str, int]] = {}
        self.symptom_disease_map: Dict[str, Dict[str, int]] = {}
        self.total_records: int = 0
        self.is_loaded: bool = False
        self.backend_dir = os.path.dirname(os.path.abspath(__file__))
        self.load_dataset()

    def load_dataset(self):
        """Load dataset from pickle cache or CSV file."""
        cache_path = os.path.join(self.backend_dir, 'dataset_cache.pkl')
        csv_path = os.path.join(self.backend_dir, 'data_set.csv')

        # Try fast pickle cache first
        if os.path.exists(cache_path):
            try:
                with open(cache_path, 'rb') as f:
                    data = pickle.load(f)
                    self.total_records = data.get('total_records', 0)
                    self.disease_symptom_map = data.get('disease_symptom_map', {})
                    self.symptom_disease_map = data.get('symptom_disease_map', {})
                    self.is_loaded = True
                    print(f"✓ Dataset loaded from cache: {self.total_records} records | {len(self.disease_symptom_map)} diseases | {len(self.symptom_disease_map)} symptoms")
                    return
            except Exception as e:
                print(f"⚠️ Failed to load cache: {e}. Falling back to CSV.")

        # Fallback to direct CSV stream
        if os.path.exists(csv_path):
            try:
                print("⏳ Loading symptoms dataset from CSV...")
                total = 0
                dis_sym_map = {}
                sym_dis_map = {}
                with open(csv_path, 'r', encoding='utf-8', errors='ignore') as f:
                    header_line = f.readline().strip()
                    headers = [h.strip().lower().replace('_', ' ') for h in header_line.split(',')]
                    for line in f:
                        line = line.strip()
                        if not line:
                            continue
                        parts = line.split(',')
                        if len(parts) < 2:
                            continue
                        disease = parts[0].strip().lower()
                        if not disease:
                            continue
                        total += 1
                        if disease not in dis_sym_map:
                            dis_sym_map[disease] = {}
                        for j in range(1, len(parts)):
                            if j < len(headers) and parts[j].strip() == '1':
                                sym = headers[j]
                                dis_sym_map[disease][sym] = dis_sym_map[disease].get(sym, 0) + 1
                                if sym not in sym_dis_map:
                                    sym_dis_map[sym] = {}
                                sym_dis_map[sym][disease] = sym_dis_map[sym].get(disease, 0) + 1

                self.total_records = total
                self.disease_symptom_map = dis_sym_map
                self.symptom_disease_map = sym_dis_map
                self.is_loaded = True

                # Save cache for future instant loads
                try:
                    with open(cache_path, 'wb') as f:
                        pickle.dump({
                            'total_records': total,
                            'disease_symptom_map': dis_sym_map,
                            'symptom_disease_map': sym_dis_map
                        }, f, protocol=pickle.HIGHEST_PROTOCOL)
                except Exception:
                    pass

                print(f"✓ Dataset loaded from CSV: {self.total_records} records | {len(self.disease_symptom_map)} diseases | {len(self.symptom_disease_map)} symptoms")
            except Exception as e:
                print(f"❌ Failed to load CSV dataset: {e}")
        else:
            print(f"⚠️ CSV file not found at {csv_path}")

    def predict_symptoms(self, input_symptoms: List[str]) -> List[Dict[str, Any]]:
        """Predict diseases based on symptoms using weighted Jaccard similarity and coverage."""
        if not input_symptoms:
            return []

        normalised = [s.strip().lower() for s in input_symptoms if s.strip()]
        if not normalised:
            return []

        scores: Dict[str, int] = {}
        for sym in normalised:
            diseases = self.symptom_disease_map.get(sym, {})
            for disease, freq in diseases.items():
                scores[disease] = scores.get(disease, 0) + freq

        if not scores:
            return []

        results = []
        for disease, matched_score in scores.items():
            sym_freq_map = self.disease_symptom_map.get(disease, {})
            total_sym_freq = sum(sym_freq_map.values())

            intersection = matched_score
            union = total_sym_freq + len(normalised) - intersection
            jaccard = intersection / union if union > 0 else 0

            matched_count = sum(1 for s in normalised if s in sym_freq_map)
            coverage = matched_count / len(normalised)

            confidence = round((jaccard * 0.6 + coverage * 0.4) * 100)

            results.append({
                "name": " ".join(w.capitalize() for w in disease.split()),
                "confidence": min(confidence, 97),
                "matchedSymptoms": matched_count,
                "totalInputSymptoms": len(normalised)
            })

        results.sort(key=lambda x: x["confidence"], reverse=True)
        return results[:5]

    def find_similar_diseases(self, symptoms: List[str]) -> List[Dict[str, Any]]:
        """Return similar diseases matching symptoms (legacy format)."""
        preds = self.predict_symptoms(symptoms)
        return [
            {
                "disease": p["name"],
                "similarity": round(p["confidence"] / 100.0, 2),
                "confidence": p["confidence"],
                "matched_symptoms": p["matchedSymptoms"]
            }
            for p in preds
        ]

    def get_disease_info(self, disease_name: str) -> Optional[Dict[str, Any]]:
        """Get symptoms associated with a specific disease."""
        target = disease_name.strip().lower()
        matched_disease = None
        for d in self.disease_symptom_map:
            if d == target or target in d:
                matched_disease = d
                break

        if not matched_disease:
            return None

        sym_map = self.disease_symptom_map[matched_disease]
        top_symptoms = sorted(sym_map.items(), key=lambda x: x[1], reverse=True)[:10]

        return {
            "disease": " ".join(w.capitalize() for w in matched_disease.split()),
            "symptoms": [s[0] for s in top_symptoms],
            "common_indicators": [f"{s[0]} (frequency: {s[1]})" for s in top_symptoms[:5]],
            "source": "Medical Dataset (246K records)"
        }

    def get_stats(self) -> Dict[str, Any]:
        """Return dataset statistics."""
        top_symptoms = sorted(
            [{"symptom": sym, "diseaseCount": len(diseases)} for sym, diseases in self.symptom_disease_map.items()],
            key=lambda x: x["diseaseCount"],
            reverse=True
        )[:30]

        return {
            "totalRecords": self.total_records,
            "totalDiseases": len(self.disease_symptom_map),
            "totalSymptoms": len(self.symptom_disease_map),
            "diseases": list(self.disease_symptom_map.keys())[:50],
            "topSymptoms": top_symptoms
        }

medical_dataset = MedicalDataset()
