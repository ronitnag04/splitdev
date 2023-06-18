import logging
import sys
import os
from llama_index import (
    StorageContext,
    load_index_from_storage,
    IndexStructType
)

from load_nutrition_index import get_index

index = get_index()

# set up logging 
logging.basicConfig(stream=sys.stdout, level=logging.INFO)
logging.getLogger().addHandler(logging.StreamHandler(stream=sys.stdout))
log = logging.getLogger()


# execute query
query_engine = index.as_query_engine()

print('Type in a question, or exit() to quit')
user_input = input()
while user_input != 'exit()':
    response = query_engine.query(user_input)
    print(response)
    print()
    print('Type in a question, or exit() to quit')
    user_input = input()

