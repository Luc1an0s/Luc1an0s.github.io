# Luc1an0s.github.io

Este projeto é composto por um site estático (HTML, CSS, JS) hospedado no GitHub Pages e um backend Flask para envio de e-mails, hospedado no Railway.

## Funcionalidades
- Formulário de contato que envia e-mails para o destinatário configurado.
- Backend Flask com endpoint `/send-email` que recebe dados via POST e envia e-mail usando a API do SendGrid.

## Estrutura
- `index.html`, `styles.css`, `script.js`: arquivos do site estático.
- `app.py`: backend Flask para envio de e-mails.
- `requirements.txt`: dependências do backend.
- `Procfile`: comando para iniciar o backend no Railway.

## Como rodar localmente
1. Instale o Python 3.10+.
2. Instale as dependências:
	```bash
	pip install -r requirements.txt
	```
3. Crie um arquivo `.env` com:
	```env
	SENDGRID_API_KEY=sua_api_key_do_sendgrid
	SENDGRID_SENDER=seu_email_validado_no_sendgrid
	```
4. Execute o backend:
	```bash
	python app.py
	```
5. Acesse o site estático abrindo `index.html` no navegador.

## Deploy
- **Frontend:** hospedado no GitHub Pages.
- **Backend:** hospedado no Railway.
	- Adicione as variáveis de ambiente `SENDGRID_API_KEY` e `SENDGRID_SENDER` no painel do Railway.
  - O backend será acessível por uma URL pública gerada pelo Railway.

## Como funciona o envio de e-mail
- O frontend faz uma requisição POST para o endpoint `/send-email` do backend.
- O backend recebe os dados, monta o e-mail e envia via API do SendGrid.
- O destinatário do e-mail é definido na variável `SENDGRID_RECIPIENT` do `app.py`.

## Observações
	- Para usar SendGrid, é necessário criar uma API Key e validar o e-mail remetente no painel da SendGrid.
	- O backend pode ser adaptado para outros serviços de e-mail (Resend, Mailgun, etc).

## Licença
Este projeto está sob a licença MIT.

