import { StatsType } from "@/app/painel-de-controle/aluno/historico-de-solicitacoes/[id]/page";

interface TopStatsProps {
  stats: StatsType;
}

const TopStats = ({ stats }: TopStatsProps) => {
  return (
    <div className="flex flex-col gap-6 items-center md:flex-row md:gap-24">
      <div className="flex flex-col items-center md:items-start">
        <h2 className="font-normal text-[#879298] text-xl">Finalizadas</h2>
        <p className="font-medium text-4xl">{stats.finished}</p>
      </div>

      <div className="flex flex-col items-center md:items-start">
        <h2 className="font-normal text-[#879298] text-xl">Em Andamento</h2>
        <p className="font-medium text-4xl">{stats.current}</p>
      </div>

      <div className="flex flex-col items-center md:items-start">
        <h2 className="font-normal text-[#879298] text-xl">Total</h2>
        <p className="font-medium text-4xl">{stats.total}</p>
      </div>
    </div>
  );
};

export default TopStats;
