"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import { OverviewCardsGroup } from "./_components/overview-cards";
import { OverviewCardsSkeleton } from "./_components/overview-cards/skeleton";
import { TopChannels } from "@/components/Tables/top-channels";
import { TopChannelsSkeleton } from "@/components/Tables/top-channels/skeleton";
import { createTimeFrameExtractor } from "@/utils/timeframe-extractor";
import api from "@/utils/api"; // 🔥 Importando API com interceptação

export default function Home() {
  const searchParams = useSearchParams();
  const selected_time_frame = searchParams.get("selected_time_frame") || "";
  const extractTimeFrame = createTimeFrameExtractor(selected_time_frame);

  // Estado para armazenar os dados do dashboard
  const [dashboardData, setDashboardData] = useState({
    pedidos: 0,
    totalVendas: 0,
    pagamentos: 0,
    totalGerados: 0,
    totalPendentes: 0,
    rate: "0.00%",
  });

  // Estado para armazenar os visitantes
  const [data, setData] = useState([]);

  // Estado de carregamento
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        if (typeof window !== "undefined") {
          const token = localStorage.getItem("detran_admin_token");

          if (!token) {
            console.error("Token não encontrado, redirecionando para login...");
            return;
          }

          // 🔥 Fazendo requisição para o dashboard
          const res = await api.get("/dashboard", {
            headers: { Authorization: `Bearer ${token}` },
          });

          setDashboardData(res.data);
        }
      } catch (error) {
        console.error("Erro ao buscar dados do dashboard", error);
      }
    };

    const fetchVisitantesData = async () => {
      try {
        if (typeof window !== "undefined") {
          const token = localStorage.getItem("detran_admin_token");

          if (!token) {
            console.error("Token não encontrado, redirecionando para login...");
            return;
          }

          // 🔥 Fazendo requisição para listar visitantes
          const res = await api.get("/visitantes", {
            headers: { Authorization: `Bearer ${token}` },
          });

          setData(res.data.visitantes); // Atualiza o estado com os visitantes
        }
      } catch (error) {
        console.error("Erro ao buscar dados dos visitantes", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
    fetchVisitantesData();
  }, []);

  return (
    <>
      {/* 🔥 Exibindo os cards do dashboard */}
      <Suspense fallback={<OverviewCardsSkeleton />}>
        <OverviewCardsGroup
          pedidos={dashboardData.pedidos}
          pagamentos={dashboardData.pagamentos}
          totalVendas={dashboardData.totalVendas}
          totalGerados={dashboardData.totalGerados}
          totalPendentes={dashboardData.totalPendentes}
          rate={dashboardData.rate}
        />
      </Suspense>

      <div className="mt-8 space-y-10">
        {/* 🔥 Exibindo a lista de visitantes */}
        <Suspense fallback={<TopChannelsSkeleton />}>
          <TopChannels data={data} />
        </Suspense>
      </div>
    </>
  );
}
