import requests
import argparse

parser = argparse.ArgumentParser(description="Criar board KAVIAR no Trello")
parser.add_argument("--key", required=True, help="Sua API_KEY do Trello")
parser.add_argument("--token", required=True, help="Seu TOKEN do Trello")
args = parser.parse_args()

API_KEY = args.key
TOKEN = args.token

board_name = "KAVIAR Roadmap 2025"

sections = {
    "Backend": ("Alta", [
        "Revisar rotas completas",
        "Adicionar rate limit",
        "Adicionar Helmet",
        "Configurar CORS seguro",
        "Sanitizar inputs",
        "Implementar refresh tokens",
        "Integrar Sentry",
        "Logs com Winston",
        "Auditoria de ações",
    ]),
    "Backend Financeiro": ("Alta", [
        "Integração Mercado Pago",
        "Corrida pós-paga",
        "Créditos pré-pagos",
        "Cálculo de comissão",
        "Extrato motorista",
        "Webhook Mercado Pago",
        "Relatórios mensais",
        "Relatório de repasses",
    ]),
}

print("\n🔄 Criando board...")

board = requests.post(
    "https://api.trello.com/1/boards",
    params={"name": board_name, "key": API_KEY, "token": TOKEN}
).json()

print("📌 Board criado:", board["url"])

board_id = board["id"]

# Criar etiquetas
labels = {
    "Alta": requests.post(
        f"https://api.trello.com/1/boards/{board_id}/labels",
        params={"name": "Alta", "color": "red", "key": API_KEY, "token": TOKEN}
    ).json()["id"],
}
# Criar listas e cards
for section, (priority, tasks) in sections.items():
    print(f"📂 Criando lista: {section}")
    list_data = requests.post(
        f"https://api.trello.com/1/boards/{board_id}/lists",
        params={"name": section, "key": API_KEY, "token": TOKEN}
    ).json()
    list_id = list_data["id"]

    for task in tasks:
        requests.post(
            "https://api.trello.com/1/cards",
            params={
                "idList": list_id,
                "name": task,
                "idLabels": labels[priority],
                "key": API_KEY,
                "token": TOKEN
            }
        )

print("\n🎉 TUDO PRONTO!")
