#!/bin/bash
echo "🔧 Instalando dependências..."
npm install

echo "🔧 Gerando Client Prisma..."
npx prisma generate

echo "🔧 Aplicando migrations..."
npx prisma migrate dev --name init_kaviar_elite

echo "🚀 Iniciando servidor..."
npm run dev
