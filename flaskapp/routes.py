
from flaskapp import app
from flask import Flask,render_template, url_for, flash, redirect,request,jsonify
import requests


@app.route('/')
def hello_world():
    return render_template('home.html')

@app.route('/chat', methods=['POST'])
def chat():
        s = request.form["text"]
        response = requests.post('http://localhost:5005/webhooks/rest/webhook', json={"sender": "feres", "message": s})
        response = response.json()
        return(jsonify({"status":"success","response":response}))


