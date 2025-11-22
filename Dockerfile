# ==================================
#   K A V I A R   B A C K E N D
#       Dockerfile Oficial
# ==================================

FROM node:22-alpine

WORKDIR /app

# Instalar dependências
COPY package*.json ./
RUN npm install

# Copiar todo código
COPY . .

EXPOSE 4001

CMD ["npm", "start"]
