"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { compactFormat, standardFormat } from "@/lib/format-number";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { formatarData } from "@/utils/formatDate";

export function TopChannels({
  className,
  data,
}: {
  className?: string;
  data: any;
}) {
  return (
    <div
      className={cn(
        "grid rounded-[10px] bg-white px-7.5 pb-4 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card",
        className,
      )}
    >
      <h2 className="mb-4 text-body-2xlg font-bold text-dark dark:text-white">
        Clientes / Faturas
      </h2>

      <Table>
        <TableHeader>
          <TableRow className="border-none uppercase [&>th]:text-center">
            <TableHead className="!text-left">Nome</TableHead>
            <TableHead>Renavam</TableHead>
            <TableHead>Fatura</TableHead>
            <TableHead>Data</TableHead>
            <TableHead className="!text-right">Valor</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((channel: any, i: any) => (
            <TableRow
              className="text-center text-base font-medium text-dark dark:text-white"
              key={channel.nome + i}
            >
              <TableCell className="flex min-w-fit items-center gap-3">
                <div className="">{channel.nome}</div>
              </TableCell>

              <TableCell>{channel.renavam}</TableCell>

              <TableCell>
                <div
                  className={cn(
                    "rounded-full px-3.5 py-1 text-sm font-medium",
                    {
                      "bg-[#219653]/[0.08] text-[#219653]":
                        channel.statusPagamento === "pago",
                      "bg-[#D34053]/[0.08] text-[#D34053]":
                        channel.statusPagamento === "não gerado",
                      "bg-[#FFA70B]/[0.08] text-[#FFA70B]":
                        channel.statusPagamento === "gerado",
                    },
                  )}
                >
                  {channel.statusPagamento === "pago"
                    ? "Pago"
                    : channel.statusPagamento === "não gerado"
                      ? "Não Gerado"
                      : "Pendente"}
                </div>
              </TableCell>

              <TableCell>{formatarData(channel.dataAcesso)}</TableCell>

              <TableCell className="!text-right text-green-light-1">
                R${standardFormat(channel.valorGerado)}
              </TableCell>

              <TableCell>VISUALIZAR</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
