# Instruções para deploy no Render

1. Faça login em https://render.com
2. Crie um novo Web Service e conecte seu repositório do GitHub
3. Escolha o branch principal (main)
4. Render detecta automaticamente o Python pelo requirements.txt
5. No campo Start Command, coloque:
    gunicorn app:app
6. Adicione as variáveis de ambiente EMAIL_USER e EMAIL_PASS nas configurações do serviço
7. Salve e aguarde o deploy

Seu backend Flask ficará online e pronto para receber requisições!
