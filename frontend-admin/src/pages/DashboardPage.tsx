import React from "react";
import { Users, Car, CreditCard, Star, ArrowUpRight, TrendingUp } from "lucide-react";

const DashboardPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-dark text-white">
      {/* Topo / Boas-vindas */}
      <header className="border-b border-gold/20 bg-dark/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between py-6 px-4">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-gold/80">
              Painel Executivo
            </p>
            <h1 className="text-2xl md:text-3xl font-semibold mt-1">
              KAVIAR Elite <span className="text-gold font-bold">Admin</span>
            </h1>
            <p className="text-sm text-white/60 mt-2">
              Visão geral da operação premium · status em tempo real · controle total.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <div className="text-right">
              <p className="text-xs uppercase tracking-widest text-gold/80">
                Status da Plataforma
              </p>
              <p className="text-sm text-white/80">Online · Estável</p>
            </div>
            <span className="h-10 w-px bg-gold/30" />
            <div className="px-4 py-2 rounded-2xl border border-gold/40 bg-gold/10 text-xs">
              <span className="font-semibold text-gold">Nível: </span>
              <span>Operação Signature</span>
            </div>
          </div>
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Resumo Premium */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2 rounded-3xl border border-gold/40 bg-gradient-to-br from-black via-dark to-gold/10 p-6 shadow-xl">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-gold/80">
                  Overview Executivo
                </p>
                <h2 className="text-xl md:text-2xl font-semibold mt-2">
                  Bem-vindo ao{" "}
                  <span className="text-gold font-bold">Painel KAVIAR Elite</span>
                </h2>
                <p className="text-sm text-white/70 mt-3 leading-relaxed">
                  Aqui você acompanha a operação em tempo real: motoristas premium,
                  passageiros de alto padrão e todas as transações em ambiente seguro.
                  Tudo preparado para decisões rápidas e sofisticadas.
                </p>
              </div>
              <div className="hidden md:flex items-center justify-center">
                <div className="h-20 w-20 rounded-full border border-gold/50 bg-gold/10 flex items-center justify-center">
                  <Star className="w-10 h-10 text-gold" />
                </div>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="rounded-2xl bg-black/60 border border-gold/30 px-4 py-3 flex items-center justify-between">
                <div>
                  <p className="text-gold/80 uppercase tracking-widest text-[0.65rem]">
                    Qualidade Média
                  </p>
                  <p className="mt-1 text-sm font-semibold">4,9 ★</p>
                  <p className="text-[0.7rem] text-white/60">
                    Motoristas avaliados como experiência de luxo.
                  </p>
                </div>
                <TrendingUp className="w-5 h-5 text-gold/80" />
              </div>
              <div className="rounded-2xl bg-black/60 border border-gold/30 px-4 py-3 flex items-center justify-between">
                <div>
                  <p className="text-gold/80 uppercase tracking-widest text-[0.65rem]">
                    Nível de Segurança
                  </p>
                  <p className="mt-1 text-sm font-semibold">Alto</p>
                  <p className="text-[0.7rem] text-white/60">
                    Foco total em sigilo, conforto e confiabilidade.
                  </p>
                </div>
                <ShieldIcon />
              </div>
              <div className="rounded-2xl bg-black/60 border border-gold/30 px-4 py-3 flex items-center justify-between">
                <div>
                  <p className="text-gold/80 uppercase tracking-widest text-[0.65rem]">
                    Operação
                  </p>
                  <p className="mt-1 text-sm font-semibold">Kaviar Elite</p>
                  <p className="text-[0.7rem] text-white/60">
                    Preparado para tours, corridas VIP e experiências sob medida.
                  </p>
                </div>
                <ArrowUpRight className="w-5 h-5 text-gold/80" />
              </div>
            </div>
          </div>

          {/* Cartões rápidos à direita */}
          <div className="space-y-4 md:col-span-2">
            <div className="rounded-3xl bg-black/70 border border-gold/40 p-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-gold/15 flex items-center justify-center">
                  <Users className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-gold/80">
                    Passageiros
                  </p>
                  <p className="text-sm text-white/80 mt-1">
                    A lista de passageiros aparecerá aqui.
                  </p>
                  <p className="text-[0.7rem] text-white/50">
                    Perfil, histórico de uso, tickets de suporte e status.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-black/70 border border-gold/40 p-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-gold/15 flex items-center justify-center">
                  <Car className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-gold/80">
                    Motoristas
                  </p>
                  <p className="text-sm text-white/80 mt-1">
                    A lista de motoristas aparecerá aqui.
                  </p>
                  <p className="text-[0.7rem] text-white/50">
                    Nível (Bronze · Ouro · Platina · Diamante), documentos e status online.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-black/70 border border-gold/40 p-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-gold/15 flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-gold/80">
                    Transações
                  </p>
                  <p className="text-sm text-white/80 mt-1">
                    A lista de transações aparecerá aqui.
                  </p>
                  <p className="text-[0.7rem] text-white/50">
                    Tours, corridas ponto-a-ponto, bônus, comissões e repasses KAVIAR.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Rodapé pequeno */}
        <section className="pt-4 border-t border-gold/20 text-[0.7rem] text-white/40 text-center">
          <p>
            KAVIAR Elite · Plataforma USBtecnok · Operação confidencial e orientada a dados.
          </p>
        </section>
      </main>
    </div>
  );
};

const ShieldIcon: React.FC = () => (
  <svg
    className="w-5 h-5 text-gold/80"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2l7 4v5c0 5-3 9-7 11-4-2-7-6-7-11V6z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

export default DashboardPage;
