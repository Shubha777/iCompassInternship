# iCompassInternship

This is Flask Web application having a bot widget and Javascript animation. Bot Widget: The bot widget supports any type of data, buttons, images, videos. It connects with routes.py through a post request to send and receive data to/from the rasa chatbot server(port:5005)(as a service) The bot widget uses the MDN API to transform speech to text and text to speech, available through a button inside the widget.
Go to the rasa chatbot directory and paste this code : rasa run actions & rasa run -m models --enable-api --cors "*" --debug
Go to the flask project directory and type : python run.py

