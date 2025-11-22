import React from "react";

type DriverLevel = "Bronze" | "Ouro" | "Platina" | "Diamante";

interface Driver {
  id: string;
  name: string;
  level: DriverLevel;
  rating: number;
  totalTours: number;
  netEarnings: number;
}

const mockDrivers: Driver[] = [
  {
    id: "DRV-0001",
    name: "João Silva",
    level: "Diamante",
    rating: 4.98,
    totalTours: 214,
    netEarnings: 32450.0,
  },
  {
    id: "DRV-0002",
    name: "Maria Fernanda",
    level: "Platina",
    rating: 4.94,
    totalTours: 167,
    netEarnings: 28120.0,
  },
  {
    id: "DRV-0003",
    name: "Carlos Eduardo",
    level: "Ouro",
    rating: 4.87,
    totalTours: 121,
    netEarnings: 19480.0,
  },
  {
    id: "DRV-0004",
    name: "Ana Paula",
    level: "Ouro",
    rating: 4.91,
    totalTours: 138,
    netEarnings: 20510.0,
  },
];

const levelBadgeClass: Record<DriverLevel, string> = {
  Bronze: "bg-amber-900/40 text-amber-200 border-amber-500/40",
  Ouro: "bg-yellow-600/20 text-yellow-200 border-yellow-400/40",
  Platina: "bg-slate-500/30 text-slate-100 border-slate-300/40",
  Diamante: "bg-cyan-500/20 text-cyan-100 border-cyan-300/50",
};

const DriversPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Motoristas <span className="text-gold">Elite</span>
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Visão refinada dos motoristas cadastrados no programa KAVIAR Elite.
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs text-gray-300">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>
            Dados ilustrativos (mock). Integração real com PostgreSQL/Prisma vem
            na próxima etapa.
          </span>
        </div>
      </header>

      {/* Tabela */}
      <section className="rounded-3xl bg-grayLight/40 border border-gold/25 p-5 shadow-[0_0_40px_rgba(0,0,0,0.8)]">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-semibold">Lista de Motoristas Elite</h2>
            <p className="text-[11px] text-gray-400">
              Aqui aparecerá a lista real de motoristas vinda do backend.
            </p>
          </div>
          <div className="flex gap-2 text-[11px] text-gray-300">
            <span className="px-3 py-1 rounded-full bg-grayLight/60 border border-gray-500/60">
              Total: {mockDrivers.length}
            </span>
            <span className="px-3 py-1 rounded-full bg-gold/10 border border-gold/50 text-gold">
              Filtro avançado em breve
            </span>
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-gray-700/60">
          <table className="min-w-full border-separate border-spacing-y-1.5">
            <thead>
              <tr className="text-xs text-gray-400">
                <th className="text-left px-4 py-2 font-medium">Motorista</th>
                <th className="text-left px-4 py-2 font-medium">Nível</th>
                <th className="text-left px-4 py-2 font-medium">
                  Nota média
                </th>
                <th className="text-left px-4 py-2 font-medium">
                  Tours (últ. 30 dias)
                </th>
                <th className="text-right px-4 py-2 font-medium">
                  Ganhos líquidos
                </th>
              </tr>
            </thead>
            <tbody>
              {mockDrivers.map((driver) => (
                <tr
                  key={driver.id}
                  className="text-sm bg-black/40 hover:bg-gold/5 transition-all"
                >
                  <td className="px-4 py-3 rounded-l-2xl">
                    <div className="flex flex-col">
                      <span className="font-medium text-white">
                        {driver.name}
                      </span>
                      <span className="text-[11px] text-gray-400">
                        {driver.id}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full border text-[11px] font-medium ${
                        levelBadgeClass[driver.level]
                      }`}
                    >
                      {driver.level}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-emerald-300 font-medium">
                      {driver.rating.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-200">
                    {driver.totalTours}
                  </td>
                  <td className="px-4 py-3 text-right rounded-r-2xl">
                    <span className="font-semibold text-gold">
                      {driver.netEarnings.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </span>
                  </td>
                </tr>
              ))}

              {mockDrivers.length === 0 && (
                <tr>
                  <td
                    className="px-4 py-6 text-center text-sm text-gray-400"
                    colSpan={5}
                  >
                    A lista de motoristas aparecerá aqui assim que a integração
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

export default DriversPage;
