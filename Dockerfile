# ============================
#   KAVIAR BACKEND - DOCKERFILE
# ============================

FROM node:22-alpine

# Diretório da aplicação
WORKDIR /app

# Instalar dependências
COPY package*.json ./
RUN npm install

# Copiar todo o backend
COPY . .

# Porta exposta
EXPOSE 4001

# Start
CMD ["npm", "start"]
