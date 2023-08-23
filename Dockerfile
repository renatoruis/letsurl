# Use a versão oficial do Node.js
FROM node:14

# Define a pasta de trabalho dentro do container
WORKDIR /usr/src/app

# Copia o arquivo de definições de pacote e instala as dependências
COPY package*.json ./
RUN npm install

# Copia todos os arquivos do projeto para o container
COPY . .

# Define a porta que o serviço vai usar
EXPOSE 3000

# Comando para rodar a aplicação
CMD [ "npm", "start" ]
