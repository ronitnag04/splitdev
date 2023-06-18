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

print('Type in a question, or exit() to quit')
user_input = input()
while user_input != 'exit()':
    response = query_engine.query(user_input)
    print(response)
    print()
    print('Type in a question, or exit() to quit')
    user_input = input()