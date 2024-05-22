import { SlidersHorizontal, MessageCircle, ListChecks, UserSquare2, Lock } from "lucide-react";

export const menuItems = [
  {
    label: "Painel de controle",
    icon: SlidersHorizontal,
    studentHref: "/painel-de-controle/aluno/",
    professorHref: "/painel-de-controle/professor/",
    pageHref: "/resumo"
  },
  {
    label: "Mensagens",
    icon: MessageCircle,
    studentHref: "/painel-de-controle/aluno/",
    professorHref: "/painel-de-controle/professor/",
    pageHref: "/mensagens"
  },
  {
    label: "Histórico de Solicitações",
    icon: ListChecks,
    studentHref: "/painel-de-controle/aluno/",
    professorHref: "/painel-de-controle/professor/",
    pageHref: "/historico-de-solicitacoes"
  },
  {
    label: "Minha Conta",
    icon: UserSquare2,
    studentHref: "/painel-de-controle/aluno/",
    professorHref: "/painel-de-controle/professor/",
    pageHref: "/minha-conta"
  },
  { label: "Em breve", icon: Lock, studentHref: "", professorHref: "" },
];
