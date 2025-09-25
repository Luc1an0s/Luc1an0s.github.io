
from flask import Flask, request
from flask_cors import CORS
from dotenv import load_dotenv
import os
import smtplib
from email.message import EmailMessage


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

    msg = EmailMessage()
    msg['Subject'] = subject
    msg['From'] = os.getenv('EMAIL_USER')
    msg['To'] = 'lucianomaciel53@gmail.com'  # Altere se quiser outro destinatário
    msg.set_content(f'Nome: {name}\nEmail: {email}\nMensagem: {message}')

    try:
        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
            smtp.login(os.getenv('EMAIL_USER'), os.getenv('EMAIL_PASS'))
            smtp.send_message(msg)
        return 'Email enviado com sucesso!', 200
    except Exception as e:
        return f'Erro ao enviar email: {str(e)}', 500