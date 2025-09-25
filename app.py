
from flask import Flask, request
from flask_cors import CORS
from dotenv import load_dotenv
import os
import requests


load_dotenv()

app = Flask(__name__)
CORS(app)


@app.route('/send-email', methods=['POST'])
def send_email():
    data = request.json
    name = data['name']
    email = data['email']
@app.route('/send-email', methods=['POST'])
def send_email():
    data = request.json
    name = data['name']
    email = data['email']
    subject = data['subject']
    message = data['message']

    RESEND_API_KEY = os.getenv('RESEND_API_KEY')
    TO_EMAIL = 'lucianomaciel53@gmail.com'  # Altere se quiser outro destinatário
    FROM_EMAIL = os.getenv('RESEND_FROM_EMAIL')  # Precisa ser validado no Resend

    payload = {
        "from": FROM_EMAIL,
        "to": [TO_EMAIL],
        "subject": subject,
        "reply_to": email,
        "text": f"Nome: {name}\nEmail: {email}\nMensagem: {message}"
    }

    headers = {
        "Authorization": f"Bearer {RESEND_API_KEY}",
        "Content-Type": "application/json"
    }

    response = requests.post(
        "https://api.resend.com/emails",
        json=payload,
        headers=headers
    )

    if response.status_code == 202:
        return 'Email enviado com sucesso!', 200
    else:
        return f'Erro ao enviar email: {response.text}', 500