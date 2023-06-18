import os
import pandas as pd
import asyncio
from hume import HumeStreamClient
from hume.models.config import LanguageConfig

this_dir = os.path.dirname(__file__)

messages_df = pd.read_csv(os.path.join(this_dir, 'email_read.csv'), index_col='id')
email_bodies = messages_df['Body'].tolist()

async def main():
    client = HumeStreamClient(os.environ['HUME_API_KEY'])
    config = LanguageConfig()
    async with client.connect([config]) as socket:
        for email in email_bodies:
            result = await socket.send_text(email)
            emotions = result["language"]["predictions"][0]["emotions"]
            print(emotions)

asyncio.run(main())