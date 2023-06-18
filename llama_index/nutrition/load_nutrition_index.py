import logging
import sys
import os
from llama_index import (
    StorageContext,
    load_index_from_storage
)


this_file = os.path.dirname(__file__)
persist_dir = os.path.join(this_file, 'storage')

# set up logging 
logging.basicConfig(stream=sys.stdout, level=logging.INFO)
logging.getLogger().addHandler(logging.StreamHandler(stream=sys.stdout))
log = logging.getLogger()

# rebuild storage context
storage_context = StorageContext.from_defaults(persist_dir=persist_dir)

# load index
index = load_index_from_storage(storage_context)

# execute query
query_engine = index.as_query_engine()
log.info('Formed Query Engine')
response = query_engine.query("What should an obese person do to begin their fitness journey")
log.info('Submitted and recieved query')
log.info(response)