import logging
import sys
import os
from llama_index import (
    LLMPredictor,
    ServiceContext,
    TreeIndex,
    StorageContext,
    load_index_from_storage,
)
from langchain.chat_models import ChatOpenAI
import pandas as pd

this_file = os.path.dirname(__file__)
persist_dir = os.path.join(this_file, 'storage')
key = os.environ['OPENAI_API_KEY']

def get_index():
    # set up logging 
    logging.basicConfig(stream=sys.stdout, level=logging.INFO)
    logging.getLogger().addHandler(logging.StreamHandler(stream=sys.stdout))
    
    # define LLM
    llm_predictor = LLMPredictor(llm=ChatOpenAI(temperature=0.5, model_name="text-davinci-003", openai_api_key=key))
    service_context = ServiceContext.from_defaults(llm_predictor=llm_predictor)

    # rebuild storage context
    storage_context = StorageContext.from_defaults(persist_dir=persist_dir)

    # load index
    index = load_index_from_storage(storage_context)
    return index