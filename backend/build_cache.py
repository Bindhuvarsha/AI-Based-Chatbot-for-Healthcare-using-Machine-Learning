import os
import time
import pickle

backend_dir = os.path.dirname(os.path.abspath(__file__))
csv_path = os.path.join(backend_dir, 'data_set.csv')
cache_path = os.path.join(backend_dir, 'dataset_cache.pkl')

print(f"Reading dataset from {csv_path}...")
t0 = time.time()
disease_symptom_map = {}
symptom_disease_map = {}
total_records = 0

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
        total_records += 1
        if disease not in disease_symptom_map:
            disease_symptom_map[disease] = {}
        for j in range(1, len(parts)):
            if j < len(headers) and parts[j].strip() == '1':
                sym = headers[j]
                disease_symptom_map[disease][sym] = disease_symptom_map[disease].get(sym, 0) + 1
                if sym not in symptom_disease_map:
                    symptom_disease_map[sym] = {}
                symptom_disease_map[sym][disease] = symptom_disease_map[sym].get(disease, 0) + 1

cache_data = {
    'total_records': total_records,
    'disease_symptom_map': disease_symptom_map,
    'symptom_disease_map': symptom_disease_map
}

with open(cache_path, 'wb') as f:
    pickle.dump(cache_data, f, protocol=pickle.HIGHEST_PROTOCOL)

t1 = time.time()
print(f"Cache created in {t1 - t0:.2f}s, size: {os.path.getsize(cache_path) / (1024 * 1024):.2f} MB")

t2 = time.time()
with open(cache_path, 'rb') as f:
    loaded = pickle.load(f)
t3 = time.time()
print(f"Loaded from cache in {t3 - t2:.4f}s! Records: {loaded['total_records']}, Diseases: {len(loaded['disease_symptom_map'])}, Symptoms: {len(loaded['symptom_disease_map'])}")
