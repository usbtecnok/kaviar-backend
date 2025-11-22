import React from "react";

interface Passenger {
  id: string;
  name: string;
  tier: "VIP" | "Premium" | "Clássico";
  lastRide: string;
  monthlySpend: number;
  frequency: string;
}

const mockPassengers: Passenger[] = [
  {
    id: "PSG-0911",
    name: "Ricardo Almeida",
    tier: "VIP",
    lastRide: "Há 2 dias",
    monthlySpend: 4820.5,
    frequency: "3x por semana",
  },
  {
    id: "PSG-0744",
    name: "Juliana Costa",
    tier: "Premium",
    lastRide: "Ontem",
    monthlySpend: 3120.0,
    frequency: "2x por semana",
  },
  {
    id: "PSG-0632",
    name: "Marcos Lima",
    tier: "VIP",
    lastRide: "Hoje",
    monthlySpend: 8210.8,
    frequency: "Quase diário",
  },
];

const tierColor: Record<Passenger["tier"], string> = {
  VIP: "bg-gold/15 text-gold border-gold/50",
  Premium: "bg-purple-500/20 text-purple-200 border-purple-400/40",
  Clássico: "bg-gray-600/30 text-gray-100 border-gray-400/40",
};

const PassengersPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Passageiros <span className="text-gold">VIP</span>
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Núcleo de clientes de alto valor: recorrência, gasto médio e
            relacionamento.
          </p>
        </div>
        <span className="px-4 py-1 rounded-full text-[11px] bg-grayLight/60 border border-gold/40 text-gold uppercase tracking-[0.2em]">
          Clube KAVIAR
        </span>
      </header>

      {/* Tabela */}
      <section className="rounded-3xl bg-grayLight/40 border border-gold/25 p-5 shadow-[0_0_40px_rgba(0,0,0,0.8)]">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-semibold">Lista de Passageiros VIP</h2>
            <p className="text-[11px] text-gray-400">
              Em breve, dados reais vindo da API de passageiros do KAVIAR.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-gray-700/60">
          <table className="min-w-full border-separate border-spacing-y-1.5">
            <thead>
              <tr className="text-xs text-gray-400">
                <th className="text-left px-4 py-2 font-medium">Passageiro</th>
                <th className="text-left px-4 py-2 font-medium">Tier</th>
                <th className="text-left px-4 py-2 font-medium">
                  Última corrida
                </th>
                <th className="text-left px-4 py-2 font-medium">
                  Frequência
                </th>
                <th className="text-right px-4 py-2 font-medium">
                  Gasto médio mensal
                </th>
              </tr>
            </thead>
            <tbody>
              {mockPassengers.map((p) => (
                <tr
                  key={p.id}
                  className="text-sm bg-black/40 hover:bg-gold/5 transition-all"
                >
                  <td className="px-4 py-3 rounded-l-2xl">
                    <div className="flex flex-col">
                      <span className="font-medium text-white">{p.name}</span>
                      <span className="text-[11px] text-gray-400">{p.id}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full border text-[11px] font-medium ${tierColor[p.tier]}`}
                    >
                      {p.tier}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-200">
                    {p.lastRide}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-200">
                    {p.frequency}
                  </td>
                  <td className="px-4 py-3 text-right rounded-r-2xl">
                    <span className="font-semibold text-gold">
                      {p.monthlySpend.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </span>
                  </td>
                </tr>
              ))}

              {mockPassengers.length === 0 && (
                <tr>
                  <td
                    className="px-4 py-6 text-center text-sm text-gray-400"
                    colSpan={5}
                  >
                    A lista de passageiros aparecerá aqui assim que conectarmos
                    o backend.
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

export default PassengersPage;
