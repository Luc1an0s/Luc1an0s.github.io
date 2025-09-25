
from flask import Flask, request
from flask_cors import CORS
from dotenv import load_dotenv
import os
import requests


load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "https://lucianomaciel.dev"}})

@app.route('/send-email', methods=['POST'])
def send_email():
    data = request.json
    name = data['name']
    email = data['email']
    subject = data['subject']
    message = data['message']

    SENDGRID_API_KEY = os.getenv('SENDGRID_API_KEY')
    SENDGRID_SENDER = os.getenv('SENDGRID_SENDER')
    SENDGRID_RECIPIENT = 'lucianomaciel53@gmail.com'

    email_data = {
        "personalizations": [
            {
                "to": [{"email": SENDGRID_RECIPIENT}],
                "subject": subject
            }
        ],
        "from": {"email": SENDGRID_SENDER},
        "content": [
            {
                "type": "text/plain",
                "value": f'Nome: {name}\nEmail: {email}\nMensagem: {message}'
            }
        ]
    }

    try:
        response = requests.post(
            "https://api.sendgrid.com/v3/mail/send",
            headers={
                "Authorization": f"Bearer {SENDGRID_API_KEY}",
                "Content-Type": "application/json"
            },
            json=email_data
        )
        if response.status_code == 202:
            return 'Email enviado com sucesso!', 200
        else:
            return f'Erro ao enviar email: {response.text}', 500
    except Exception as e:
        return f'Erro ao enviar email: {str(e)}', 500