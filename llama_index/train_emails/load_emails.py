from __future__ import print_function
import os.path
import base64
import re
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

import pandas as pd

# If modifying these scopes, delete the file token.json.
SCOPES = ['https://www.googleapis.com/auth/gmail.readonly']

def parse_parts(parts):
    """
    Utility function that parses the parts of a message.
    """
    data = parts['body']['data']
    data = data.replace("-", "+").replace("_", "/")
    decoded_data = base64.b64decode(data)
    return decoded_data.decode()

def main():
    """
    Shows basic usage of the Gmail API.
    Lists the subject and content of the latest 10 emails.
    """
    creds = None
    this_dir = os.path.dirname(__file__)

    if os.path.exists(os.path.join(this_dir, 'email_read.csv')):
        messages_df = pd.read_csv(os.path.join(this_dir, 'email_read.csv'), index_col='id')
    else:
        messages_df = pd.DataFrame([], columns=['id', 'To', 'From', 'Subject', 'Body'])

    if os.path.exists(os.path.join(this_dir, 'token.json')):
        creds = Credentials.from_authorized_user_file(os.path.join(this_dir, 'token.json'), SCOPES)
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(os.path.join(this_dir, 'credentials.json'), SCOPES)
            creds = flow.run_local_server(port=0)
        # Save the credentials for the next run
        with open(os.path.join(this_dir, 'token.json'), 'w') as token:
            token.write(creds.to_json())

    try:
        service = build('gmail', 'v1', credentials=creds)
        # Call the Gmail API to fetch INBOX
        results = service.users().messages().list(userId='me', labelIds=['SENT'], maxResults=20).execute()
        messages = results.get('messages', [])
        if not messages:
            print('No new messages.')
        else:
            message_count = 0
            new_messages_data = []
            new_message_ids = set()
            for message in messages:
                message_data = dict()
                id = message['id']
                if id in messages_df.index.values or id in new_message_ids:
                    continue

                new_message_ids.add(id)
                message_data['id'] = id
                msg = service.users().messages().get(userId='me', id=id).execute()
                email_data = msg['payload']['headers']
                for values in email_data:
                    name = values['name']
                    if name == 'Subject':
                        subject = values['value']
                        message_data['Subject'] = subject
                    elif name == 'From':
                        from_ = values['value']
                        message_data['From'] = from_
                    elif name == 'To':
                        to = values['value']
                        message_data['To'] = to

                try:
                    payload = msg['payload']
                    body = parse_parts(payload['parts'][0])
                    message_data['Body'] = body
                    new_messages_data.append(message_data)
                except BaseException as error:
                    print('An error occurred: ', error)
                message_count += 1
                print(f'Read message {id}')
            
            if len(new_messages_data) > 0:
                new_messages_df = pd.DataFrame(new_messages_data)
                new_messages_df.set_index('id', inplace=True)
                messages_df = pd.concat((messages_df, new_messages_df), axis=0)
            messages_df.to_csv(os.path.join(this_dir, 'email_read.csv'))

    except HttpError as error:
        print('An error occurred: ', error)

if __name__ == '__main__':
    main()
