import logging
import sys
import os
from llama_index import (
    LLMPredictor,
    ServiceContext,
    PandasIndex,
    TreeIndex,
    SimpleDirectoryReader
)
from langchain import OpenAI
import pandas as pd


this_dir = os.path.dirname(__file__)
key = os.environ['OPENAI_API_KEY']


# set up logging 
logging.basicConfig(stream=sys.stdout, level=logging.INFO)
logging.getLogger().addHandler(logging.StreamHandler(stream=sys.stdout))
log = logging.getLogger()


# define LLM
llm_predictor = LLMPredictor(llm=OpenAI(temperature=0, model_name="text-davinci-003", openai_api_key=key))
service_context = ServiceContext.from_defaults(llm_predictor=llm_predictor)

# build index

"""
messages_df = pd.read_csv(os.path.join(this_file, 'email_read.csv'), index_col='id')
index = PandasIndex(df=messages_df)
"""
documents = SimpleDirectoryReader(this_dir, [os.path.join(this_dir, 'emails.txt')]).load_data()
index = TreeIndex.from_documents(documents, service_context=service_context,)


# Store Data
persist_dir = os.path.join(this_dir, 'storage')
index.storage_context.persist(persist_dir=persist_dir)
log.info(f'Successfully stored index in {persist_dir}')
