import logging
import sys
import os
from llama_index import (
    LLMPredictor,
    ServiceContext,
    PandasIndex
)
from langchain.chat_models import ChatOpenAI
import pandas as pd

this_file = os.path.dirname(__file__)
persist_dir = os.path.join(this_file, 'storage')
key = os.environ['OPENAI_API_KEY']

def get_index() -> PandasIndex:
    # set up logging 
    logging.basicConfig(stream=sys.stdout, level=logging.INFO)
    logging.getLogger().addHandler(logging.StreamHandler(stream=sys.stdout))
    
    # define LLM
    llm_predictor = LLMPredictor(llm=ChatOpenAI(temperature=0, model_name="gpt-3.5-turbo", openai_api_key=key))
    service_context = ServiceContext.from_defaults(llm_predictor=llm_predictor)

    # build index
    messages_df = pd.read_csv(os.path.join(this_file, 'email_read.csv'), index_col='id')
    index = PandasIndex(df=messages_df)
    return index