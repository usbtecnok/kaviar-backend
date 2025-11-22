import React from "react";

interface Transaction {
  id: string;
  driverName: string;
  passengerName: string;
  type: "TOUR" | "PONTO_A_PONTO";
  level: "Ouro" | "Platina" | "Diamante";
  date: string;
  clientPaid: number;
  driverNet: number;
  platformCommission: number;
}

const mockTransactions: Transaction[] = [
  {
    id: "TRX-9001",
    driverName: "João Silva",
    passengerName: "Ricardo Almeida",
    type: "TOUR",
    level: "Diamante",
    date: "22/11/2025 14:21",
    clientPaid: 1200.0,
    driverNet: 960.0,
    platformCommission: 240.0,
  },
  {
    id: "TRX-9002",
    driverName: "Ana Paula",
    passengerName: "Juliana Costa",
    type: "TOUR",
    level: "Platina",
    date: "22/11/2025 11:03",
    clientPaid: 800.0,
    driverNet: 560.0,
    platformCommission: 240.0,
  },
  {
    id: "TRX-9003",
    driverName: "Carlos Eduardo",
    passengerName: "Marcos Lima",
    type: "PONTO_A_PONTO",
    level: "Ouro",
    date: "21/11/2025 22:47",
    clientPaid: 85.5,
    driverNet: 72.7,
    platformCommission: 12.8,
  },
];

const typeChipClass: Record<Transaction["type"], string> = {
  TOUR: "bg-purple-500/20 text-purple-200 border-purple-400/50",
  PONTO_A_PONTO: "bg-sky-500/20 text-sky-100 border-sky-400/50",
};

const TransactionsPage: React.FC = () => {
  const totalCommission = mockTransactions.reduce(
    (sum, t) => sum + t.platformCommission,
    0
  );

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Transações & <span className="text-gold">Ganhos</span>
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Visão detalhada de quanto o cliente pagou, quanto o motorista
            recebeu e qual foi a comissão KAVIAR.
          </p>
        </div>
        <div className="px-4 py-2 rounded-2xl border border-gold/40 bg-grayLight/50 text-xs text-gold">
          Comissão total (mock):{" "}
          <span className="font-semibold">
            {totalCommission.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
        </div>
      </header>

      {/* Tabela */}
      <section className="rounded-3xl bg-grayLight/40 border border-gold/25 p-5 shadow-[0_0_40px_rgba(0,0,0,0.8)]">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-semibold">Transações recentes</h2>
            <p className="text-[11px] text-gray-400">
              Em breve, estes dados virão direto da tabela{" "}
              <span className="text-gold font-medium">
                rideTransaction (Prisma)
              </span>
              .
            </p>
          </div>
          <span className="px-3 py-1 rounded-full text-[11px] bg-grayLight/70 border border-gray-500/70 text-gray-200">
            {mockTransactions.length} registros (mock)
          </span>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-gray-700/60">
          <table className="min-w-full border-separate border-spacing-y-1.5">
            <thead>
              <tr className="text-xs text-gray-400">
                <th className="text-left px-4 py-2 font-medium">Transação</th>
                <th className="text-left px-4 py-2 font-medium">Motorista</th>
                <th className="text-left px-4 py-2 font-medium">Passageiro</th>
                <th className="text-left px-4 py-2 font-medium">Tipo</th>
                <th className="text-left px-4 py-2 font-medium">Nível</th>
                <th className="text-left px-4 py-2 font-medium">Data</th>
                <th className="text-right px-4 py-2 font-medium">
                  Cliente pagou
                </th>
                <th className="text-right px-4 py-2 font-medium">
                  Motorista recebeu
                </th>
                <th className="text-right px-4 py-2 font-medium">
                  Comissão KAVIAR
                </th>
              </tr>
            </thead>
            <tbody>
              {mockTransactions.map((t) => (
                <tr
                  key={t.id}
                  className="text-sm bg-black/40 hover:bg-gold/5 transition-all"
                >
                  <td className="px-4 py-3 rounded-l-2xl text-xs text-gray-300">
                    <span className="font-mono">{t.id}</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-white">
                    {t.driverName}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-200">
                    {t.passengerName}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full border text-[11px] font-medium ${typeChipClass[t.type]}`}
                    >
                      {t.type === "TOUR" ? "Tour Elite" : "Ponto a Ponto"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gold">
                    {t.level}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-300">
                    {t.date}
                  </td>
                  <td className="px-4 py-3 text-right text-sm text-gray-200">
                    {t.clientPaid.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </td>
                  <td className="px-4 py-3 text-right text-sm text-emerald-300">
                    {t.driverNet.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </td>
                  <td className="px-4 py-3 text-right text-sm text-gold rounded-r-2xl">
                    {t.platformCommission.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </td>
                </tr>
              ))}

              {mockTransactions.length === 0 && (
                <tr>
                  <td
                    className="px-4 py-6 text-center text-sm text-gray-400"
                    colSpan={9}
                  >
                    A lista de transações aparecerá aqui assim que a integração
                    com o backend estiver ativa.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default TransactionsPage;
