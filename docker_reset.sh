#!/bin/bash
# ===============================================
# SCRIPT DE REINICIALIZAÇÃO COMPLETA DO AMBIENTE KAVIAR
# Remove containers, volumes, redes e recria tudo do zero
# ===============================================

echo "🚧 Encerrando containers existentes..."
docker compose down -v

echo "🧹 Limpando volumes e redes antigas..."
docker system prune -af --volumes

echo "🚀 Subindo ambiente do KAVIAR novamente..."
docker compose up -d --build

echo "✅ Ambiente KAVIAR recriado com sucesso!"
echo
docker ps
