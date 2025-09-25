from flask import Flask, request
import smtplib
from email.message import EmailMessage
from flask_cors import CORS
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "https://lucianomaciel.dev"}}, supports_credentials=True)

@app.route('/send-email', methods=['POST'])
def send_email():
    data = request.json
    name = data['name']
    email = data['email']
    subject = data['subject']
    message = data['message']

    msg = EmailMessage()
    msg['Subject'] = subject
    msg['From'] = email
    msg['To'] = 'lucianomaciel53@gmail.com'
    msg.set_content(f'Nome: {name}\nEmail: {email}\nMensagem: {message}')

    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
        smtp.login(os.getenv('EMAIL_USER'), os.getenv('EMAIL_PASS'))
        smtp.send_message(msg)

    return 'Email enviado com sucesso!', 200

if __name__ == '__main__':
    app.run(port=5000)