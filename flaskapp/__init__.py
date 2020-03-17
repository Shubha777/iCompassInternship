from flask import Flask, render_template, url_for, flash, redirect
# from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__) 
from flaskapp import routes
# app.config['SECRET_KEY'] = 'a4579adac1e1bc030091f9937f725631'
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///chatbot.db'
# db = SQLAlchemy(app)


