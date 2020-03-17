# Ref: https://github.com/bhavaniravi/rasa-site-bot
from flaskapp import app
app.config["DEBUG"] = True
if __name__ == "__main__":
    app.run(port=8080)
