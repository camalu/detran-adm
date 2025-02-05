"use client";

import { PaymentsOverview } from "@/components/Charts/payments-overview";
import { UsedDevices } from "@/components/Charts/used-devices";
import { WeeksProfit } from "@/components/Charts/weeks-profit";
import { TopChannels } from "@/components/Tables/top-channels";
import { TopChannelsSkeleton } from "@/components/Tables/top-channels/skeleton";
import { createTimeFrameExtractor } from "@/utils/timeframe-extractor";
import { Suspense, useState, useEffect } from "react";
import { ChatsCard } from "./_components/chats-card";
import { OverviewCardsGroup } from "./_components/overview-cards";
import { OverviewCardsSkeleton } from "./_components/overview-cards/skeleton";
import { RegionLabels } from "./_components/region-labels";
import { useSearchParams } from "next/navigation"; // 🛠️ Agora pegamos os parâmetros corretamente
import api from "@/utils/api"; // 🔥 Importando API com interceptação

export default function Home() {
  const searchParams = useSearchParams(); // 🛠️ Pegamos os parâmetros corretamente
  const selected_time_frame = searchParams.get("selected_time_frame") || ""; // 🛠️ Extraímos o parâmetro

  const extractTimeFrame = createTimeFrameExtractor(selected_time_frame);
  const [dashboardData, setDashboardData] = useState({
    pedidos: 0,
    totalVendas: 0,
    pagamentos: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (typeof window !== "undefined") {
          const token = localStorage.getItem("detran_admin_token");

          if (!token) {
            console.error("Token não encontrado, redirecionando para login...");
            return;
          }

          console.log("Token encontrado:", token);
          console.log("Buscando dados do dashboard...");

          const res = await api.get("/dashboard", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("detran_admin_token")}`,
            },
          });

          console.log("Dados do dashboard recebidos:", res.data);
          setDashboardData(res.data);
        }
      } catch (error) {
        console.error("Erro ao buscar dados do dashboard", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Suspense fallback={<OverviewCardsSkeleton />}>
        <OverviewCardsGroup
          views={dashboardData.pedidos}
          profit={dashboardData.totalVendas}
          products={dashboardData.pagamentos}
        />
      </Suspense>
    </>
  );
}
