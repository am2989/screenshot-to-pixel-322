export type PlanId = "Digital" | "Acompanhamento" | "Intensivo";

export const PLANS: { id: PlanId; price: number; features: string[]; recommended?: boolean }[] = [
  { id: "Digital", price: 7.9, features: ["Exercícios personalizados", "Resumos de matérias", "Testes de preparação", "Biblioteca de materiais"] },
  { id: "Acompanhamento", price: 19.9, recommended: true, features: ["Tudo do plano Digital", "Plano de estudo personalizado", "Acompanhamento da evolução", "Pedidos de explicação"] },
  { id: "Intensivo", price: 39.9, features: ["Tudo do plano Acompanhamento", "Materiais adicionais", "Acompanhamento prioritário", "Relatórios de progresso"] },
];

export const euro = (n: number) => n.toLocaleString("pt-PT", { style: "currency", currency: "EUR" });

export const TUTORS = [
  { name: "Ana Ribeiro", subject: "Matemática", level: "3.º ciclo e Secundário", mode: "Online e presencial", bio: "Explica Matemática passo a passo, com foco na preparação para exames nacionais." },
  { name: "Tiago Martins", subject: "Português", level: "2.º e 3.º ciclo", mode: "Online", bio: "Ajuda a ganhar confiança na leitura, interpretação de textos e escrita." },
  { name: "Sofia Costa", subject: "Físico-Química", level: "Secundário", mode: "Presencial", bio: "Torna os conceitos científicos mais claros com exemplos do dia a dia." },
];

export const SUBJECTS = ["Matemática", "Português", "Inglês", "Físico-Química", "Biologia e Geologia", "História", "Geografia", "Francês"];

const first = ["Mariana", "João", "Beatriz", "Rodrigo", "Inês", "Miguel", "Carolina", "Duarte", "Leonor", "Tomás", "Matilde", "Gonçalo"];
const last = ["Silva", "Santos", "Ferreira", "Pereira", "Oliveira", "Costa", "Rodrigues", "Almeida", "Sousa", "Lopes"];
const plans: PlanId[] = ["Digital", "Acompanhamento", "Intensivo"];

export type Client = { id: number; name: string; email: string; plan: PlanId; joined: string; status: "Ativo" | "Inativo" };
export const CLIENTS: Client[] = Array.from({ length: 35 }, (_, i) => {
  const name = `${first[i % first.length]} ${last[(i * 3) % last.length]}`;
  const d = new Date(2026, i % 10, 1 + ((i * 7) % 27));
  return {
    id: i + 1,
    name,
    email: name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(" ", ".") + "@exemplo.pt",
    plan: plans[i % 5 === 0 ? 2 : i % 2 === 0 ? 1 : 0],
    joined: d.toLocaleDateString("pt-PT"),
    status: i % 5 === 4 ? "Inativo" : "Ativo",
  };
});

export type RequestStatus = "Novo pedido" | "Contactado" | "Convertido" | "Não convertido";
export const REQUEST_STATUSES: RequestStatus[] = ["Novo pedido", "Contactado", "Convertido", "Não convertido"];
export const REQUESTS = Array.from({ length: 7 }, (_, i) => {
  const name = `${first[(i + 5) % first.length]} ${last[(i + 2) % last.length]}`;
  return {
    id: i + 1,
    name,
    email: name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(" ", ".") + "@exemplo.pt",
    phone: `91${(2345670 + i * 1111).toString()}`,
    plan: plans[i % 3],
    date: new Date(2026, 10, 1 + i).toLocaleDateString("pt-PT"),
    status: "Novo pedido" as RequestStatus,
  };
});

export const GROWTH = [
  { m: "Mai", v: 6 }, { m: "Jun", v: 10 }, { m: "Jul", v: 13 }, { m: "Ago", v: 15 },
  { m: "Set", v: 22 }, { m: "Out", v: 29 }, { m: "Nov", v: 35 },
];
