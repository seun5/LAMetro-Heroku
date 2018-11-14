from flask import Flask, render_template, request, redirect, jsonify, url_for, flash, make_response, abort
from sqlalchemy import create_engine, asc
from sqlalchemy.orm import sessionmaker, scoped_session
from model import Lane, Station
import random
import string

# Neccessary imports for oauth for Google and Facebook
from oauth2client.client import flow_from_clientsecrets
from oauth2client.client import FlowExchangeError
import httplib2

import json
import requests
app = Flask(__name__)

@app.route('/')
def frontPage():
    return render_template('index.html')



if __name__ == '__main__':
    app.secret_key = 'super_secret_key'
    app.debug = True
    app.run(host='0.0.0.0', port=8000)


