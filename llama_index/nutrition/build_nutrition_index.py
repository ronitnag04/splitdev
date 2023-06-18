import logging
import sys
import os
import urllib
from llama_index import (
    LLMPredictor,
    ServiceContext,
    ListIndex,
    TreeIndex,
    SimpleWebPageReader,
)
from langchain import OpenAI

from utils import parse_websites, insert_documents

this_file = os.path.dirname(__file__)
key = os.environ['OPENAI_API_KEY']


# set up logging 
logging.basicConfig(stream=sys.stdout, level=logging.INFO)
logging.getLogger().addHandler(logging.StreamHandler(stream=sys.stdout))
log = logging.getLogger()


# define LLM
llm_predictor = LLMPredictor(llm=OpenAI(temperature=0, model_name="text-davinci-002", openai_api_key=key))
service_context = ServiceContext.from_defaults(llm_predictor=llm_predictor)
index = TreeIndex([], service_context=service_context, build_tree=False)
# index = ListIndex([], service_context=service_context) 


# build index
with open(os.path.join(this_file, 'webpages.txt'), 'r') as file:
    data = file.read()
    raw_websites = set(data.split('\n'))
def is_valid_url(url):
    parsed = urllib.parse.urlparse(url)
    return bool(parsed.netloc) and bool(parsed.scheme)
websites = filter(is_valid_url, raw_websites)

documents = parse_websites(websites, log, verbose=False)

# insert_documents(index, documents, log, verbose=False)
index = TreeIndex.from_documents(documents, service_context=service_context)


# Store Data
persist_dir = os.path.join(this_file, 'storage')
index.storage_context.persist(persist_dir=persist_dir)
log.info(f'Successfully stored index info in {persist_dir}')
