from keras.models import load_model

from collections import Counter

import numpy as np
from controllers.Recommender.utils.CollectionModule import Collection


collection = Collection()
asana = collection.get_asana()
dict_of_word_embeddings = collection.get_word_embeddings()


async def magic(first: str, second: str):
    model_dir = "models/Yoga_Recommender.h5"
    model = load_model(model_dir)

    user_input_words = [first, second]
    predicted_asanas = []
    final_predicted_asanas = []

    for i in user_input_words:
        if i in dict_of_word_embeddings:
            input_array = np.expand_dims(dict_of_word_embeddings[i], axis=0)
            prediction = model.predict(input_array)
            flatten_pred = prediction.flatten()
            result_indices = flatten_pred.argsort()[-10:][::-1]
    
            for result in result_indices:
                predicted_asanas.append(asana[result])
        
    
    counter_found = Counter(predicted_asanas)
    final_predicted_asanas_with_freq = counter_found.most_common(7)

    for yoga, freq in final_predicted_asanas_with_freq:
        final_predicted_asanas.append(yoga)

    return final_predicted_asanas