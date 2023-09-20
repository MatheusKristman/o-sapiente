import { SlidersHorizontal, MessageCircle, ListChecks, UserSquare2, Lock  } from "lucide-react";

export const menuItems = [
  { label: "Painel de controle", icon: SlidersHorizontal, studentHref: "/aluno/resumo/", professorHref: "/professor/resumo/" },
  { label: "Mensagens", icon: MessageCircle, studentHref: "/aluno/mensagens/", professorHref: "/professor/mensagens/" },
  { label: "Histórico de Solicitações", icon: ListChecks, studentHref: "/aluno/historico-de-solicitacoes/", professorHref: "/professor/historico-de-solicitacoes" },
  { label: "Minha Conta", icon: UserSquare2, studentHref: "/aluno/minha-conta/", professorHref: "/professor/minha-conta/" },
  { label: "Em breve", icon: Lock, studentHref: "", professorHref: "" }
];
