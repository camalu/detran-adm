import { compactFormat } from "@/lib/format-number";
import { OverviewCard } from "./card";
import * as icons from "./icons";

interface OverviewCardsGroupProps {
  pedidos: number;
  pagamentos: number;
  totalVendas: number;
  totalGerados: number;
  totalPendentes: number;
  rate: string;
}

export function OverviewCardsGroup({
  pedidos,
  pagamentos,
  totalVendas,
  totalGerados,
  totalPendentes,
  rate,
}: OverviewCardsGroupProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4 2xl:gap-7.5">
      <OverviewCard
        label="Cobranças Geradas"
        value={pedidos}
        Icon={icons.Views}
      />

      <OverviewCard
        label="Cobranças Pagas"
        value={pagamentos}
        Icon={icons.Product}
      />

      <OverviewCard
        label="Total Gerado"
        value={"R$" + totalGerados}
        Icon={icons.Profit}
      />

      <OverviewCard
        label="Total Pago"
        value={"R$" + totalVendas}
        Icon={icons.Profit}
      />
    </div>
  );
}
