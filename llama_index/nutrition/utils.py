# llama_index.nutrition.utils

import func_timeout
import logging
from llama_index import (
    SimpleWebPageReader,
    IndexStructType,
    Document
)

max_wait_time = 3

def timeout_controller(func, args, max_wait_time=max_wait_time) -> tuple[object, bool]:
    try:
        result = func_timeout.func_timeout(max_wait_time, func, args=args)
        return result, True
    except:
        return None, False


def get_website_document(website, reader: SimpleWebPageReader) -> Document:
    return reader.load_data([website])[0]

def parse_websites(websites, log=logging.getLogger(), verbose=False) -> list[Document]:
    documents = []
    reader = SimpleWebPageReader(html_to_text=True)
    for website in websites:
        if verbose: log.info(f'Parsing website: {website}')
        document, success = timeout_controller(get_website_document, (website, reader))
        if success:
            documents.append(document)
            if verbose: log.info(f'Sucessfully parsed website: {website}')
        else:
            log.warn(f'Failed to parse website: {website}')

    return documents

def insert_document(index: IndexStructType, document: Document):
    index.insert(document)

def insert_documents(index: IndexStructType, documents:list[Document], log=logging.getLogger(), verbose=False):
    for document in documents:
        _, success = timeout_controller(insert_document, (index, document))
        if success:
            if verbose: log.info(f'Sucessfully inserted document')
        else:
            log.warn(f'Failed to insert document {document.extra_info_str}')

    