import { compactFormat } from "@/lib/format-number";
import { OverviewCard } from "./card";
import * as icons from "./icons";

interface OverviewCardsGroupProps {
  views: number;
  profit: number;
  products: number;
}

export function OverviewCardsGroup({
  views,
  profit,
  products,
}: OverviewCardsGroupProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4 2xl:gap-7.5">
      <OverviewCard label="Total Views" value={views} Icon={icons.Views} />

      <OverviewCard label="Total Profit" value={profit} Icon={icons.Profit} />

      <OverviewCard
        label="Total Products"
        value={products}
        Icon={icons.Product}
      />

      <OverviewCard label="Total Users" value={0} Icon={icons.Users} />
    </div>
  );
}
