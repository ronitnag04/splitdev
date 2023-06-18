from flask import Flask
from flask import request

app = Flask(__name__)

@app.route("/echo", methods=['GET'])
def echo():
    params = request.args.to_dict()
    return params['text']