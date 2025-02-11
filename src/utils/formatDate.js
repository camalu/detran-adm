import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export const formatarData = (dataISO) => {
  return format(new Date(dataISO), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });
};
