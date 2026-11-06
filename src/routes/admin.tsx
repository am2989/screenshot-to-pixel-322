import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { LayoutDashboard, Users, Inbox, Tag, Wallet, ArrowLeft, UserCheck, Clock, GraduationCap, Search, Info } from "lucide-react";
import { CLIENTS, REQUESTS, REQUEST_STATUSES, PLANS, GROWTH, euro, type RequestStatus } from "@/lib/demo-data";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Painel administrativo — Explica+ (demo)" },
      { name: "description", content: "Dashboard administrativo demonstrativo do Explica+ com dados fictícios." },
      { property: "og:title", content: "Painel administrativo — Explica+ (demo)" },
      { property: "og:description", content: "Gestão de clientes, pedidos, planos e resumo financeiro com dados fictícios." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Admin,
});

const TABS = [
  ["dashboard", "Visão geral", LayoutDashboard], ["clientes", "Clientes", Users], ["pedidos", "Pedidos de adesão", Inbox],
  ["planos", "Planos", Tag], ["financeiro", "Resumo financeiro", Wallet],
] as const;
type Tab = (typeof TABS)[number][0];
const card = "rounded-3xl bg-card p-6 shadow-[var(--shadow-soft)]";
const statusColor: Record<string, string> = {
  Ativo: "bg-mint", Inativo: "bg-muted", "Novo pedido": "bg-sun", Contactado: "bg-blush", Convertido: "bg-mint", "Não convertido": "bg-muted",
};
const Pill = ({ s }: { s: string }) => <span className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-bold text-petrol ${statusColor[s]}`}>{s}</span>;

function Admin() {
  const [tab, setTab] = useState<Tab>("dashboard");
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <aside className="bg-petrol p-5 text-primary-foreground md:sticky md:top-0 md:h-screen md:w-64 md:shrink-0">
        <span className="flex items-center gap-2 font-display text-2xl font-bold">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-salmon"><GraduationCap size={20} /></span><span>Explica<span className="text-salmon">+</span></span>
        </span>
        <p className="mt-1 text-xs opacity-70">Administração · demo</p>
        <nav className="mt-6 flex gap-1 overflow-x-auto md:flex-col">
          {TABS.map(([id, label, Icon]) => (
            <button key={id} onClick={() => setTab(id)} className={`flex shrink-0 items-center gap-3 rounded-xl px-4 py-2.5 text-left font-semibold transition ${tab === id ? "bg-primary-foreground text-petrol" : "hover:bg-primary-foreground/10"}`}>
              <Icon size={18} />{label}
            </button>
          ))}
        </nav>
        <Link to="/" className="mt-6 flex items-center gap-2 rounded-xl bg-salmon px-4 py-2.5 font-bold md:absolute md:bottom-5 md:left-5 md:right-5"><ArrowLeft size={18} /> Voltar ao website</Link>
      </aside>
      <main className="flex-1 p-5 md:p-10">
        <div className="mb-6 flex items-center gap-2 rounded-2xl bg-sun px-4 py-3 text-sm font-semibold text-petrol">
          <Info size={18} /> Dados fictícios de demonstração — nenhuma informação real é guardada.
        </div>
        <h1 className="mb-6 text-3xl font-bold text-petrol">{TABS.find((t) => t[0] === tab)![1]}</h1>
        {tab === "dashboard" && <Overview />}
        {tab === "clientes" && <ClientsTable />}
        {tab === "pedidos" && <RequestsTable />}
        {tab === "planos" && <PlansView />}
        {tab === "financeiro" && <Finance />}
      </main>
    </div>
  );
}

function Kpis() {
  const k = [[Users, "Total de clientes", 35, "bg-blush"], [UserCheck, "Clientes ativos", 28, "bg-mint"], [Clock, "Pedidos pendentes", 7, "bg-sun"], [GraduationCap, "Explicadores", 12, "bg-salmon"]] as const;
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {k.map(([Icon, l, v, c]) => (
        <div key={l} className={card}>
          <div className={`grid h-11 w-11 place-items-center rounded-2xl ${c} text-petrol`}><Icon size={20} /></div>
          <p className="mt-4 text-sm font-semibold text-muted-foreground">{l}</p>
          <p className="font-display text-4xl font-bold text-petrol">{v}</p>
        </div>
      ))}
    </div>
  );
}

function Overview() {
  return (
    <div className="space-y-6">
      <Kpis />
      <div className="grid gap-6 lg:grid-cols-2"><GrowthChart /><PlanSplit /></div>
    </div>
  );
}

const planCounts = () => PLANS.map((p) => ({ ...p, n: CLIENTS.filter((c) => c.plan === p.id && c.status === "Ativo").length }));

function GrowthChart() {
  const max = Math.max(...GROWTH.map((g) => g.v));
  return (
    <div className={card}>
      <h2 className="text-lg font-bold text-petrol">Crescimento de clientes (2026)</h2>
      <div className="mt-6 flex h-48 items-end gap-3">
        {GROWTH.map((g, i) => (
          <div key={g.m} className="flex flex-1 flex-col items-center gap-2">
            <span className="text-xs font-bold text-petrol">{g.v}</span>
            <div className={`w-full rounded-t-xl ${i === GROWTH.length - 1 ? "bg-salmon" : "bg-mint"}`} style={{ height: `${(g.v / max) * 150}px` }} />
            <span className="text-xs text-muted-foreground">{g.m}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PlanSplit() {
  const pc = planCounts();
  const total = pc.reduce((a, p) => a + p.n, 0);
  const colors = ["bg-blush", "bg-petrol", "bg-salmon"];
  return (
    <div className={card}>
      <h2 className="text-lg font-bold text-petrol">Clientes ativos por plano</h2>
      <div className="mt-6 space-y-5">
        {pc.map((p, i) => (
          <div key={p.id}>
            <div className="flex justify-between text-sm font-semibold"><span>{p.id}</span><span>{p.n} clientes</span></div>
            <div className="mt-2 h-3 rounded-full bg-muted"><div className={`h-3 rounded-full ${colors[i]}`} style={{ width: `${(p.n / total) * 100}%` }} /></div>
          </div>
        ))}
      </div>
    </div>
  );
}

const inputCls = "rounded-xl border bg-card px-4 py-2.5 outline-none focus:border-petrol";

function ClientsTable() {
  const [q, setQ] = useState("");
  const [plan, setPlan] = useState("Todos");
  const [status, setStatus] = useState("Todos");
  const rows = useMemo(() => CLIENTS.filter((c) =>
    (c.name + c.email).toLowerCase().includes(q.toLowerCase()) && (plan === "Todos" || c.plan === plan) && (status === "Todos" || c.status === status)), [q, plan, status]);
  return (
    <div className={card}>
      <div className="mb-5 flex flex-wrap gap-3">
        <div className="relative flex-1"><Search size={18} className="absolute left-3 top-3 text-muted-foreground" /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Pesquisar nome ou email" className={`${inputCls} w-full pl-10`} /></div>
        <select value={plan} onChange={(e) => setPlan(e.target.value)} className={inputCls}><option>Todos</option>{PLANS.map((p) => <option key={p.id}>{p.id}</option>)}</select>
        <select value={status} onChange={(e) => setStatus(e.target.value)} className={inputCls}><option>Todos</option><option>Ativo</option><option>Inativo</option></select>
      </div>
      <Table head={["Nome", "Email", "Plano", "Data de adesão", "Estado"]}>
        {rows.map((c) => (
          <tr key={c.id} className="border-t"><td className="p-3 font-semibold">{c.name}</td><td className="p-3 text-muted-foreground">{c.email}</td><td className="p-3">{c.plan}</td><td className="p-3">{c.joined}</td><td className="p-3"><Pill s={c.status} /></td></tr>
        ))}
      </Table>
      <p className="mt-4 text-sm text-muted-foreground">{rows.length} de {CLIENTS.length} clientes</p>
    </div>
  );
}

function RequestsTable() {
  const [rows, setRows] = useState(REQUESTS);
  const set = (id: number, s: RequestStatus) => setRows((r) => r.map((x) => (x.id === id ? { ...x, status: s } : x)));
  return (
    <div className={card}>
      <Table head={["Nome", "Email", "Telefone", "Plano", "Data", "Estado", "Alterar estado"]}>
        {rows.map((r) => (
          <tr key={r.id} className="border-t">
            <td className="p-3 font-semibold">{r.name}</td><td className="p-3 text-muted-foreground">{r.email}</td><td className="p-3">{r.phone}</td>
            <td className="p-3">{r.plan}</td><td className="p-3">{r.date}</td><td className="p-3"><Pill s={r.status} /></td>
            <td className="p-3">
              <div className="flex gap-1">
                {REQUEST_STATUSES.filter((s) => s !== r.status).map((s) => (
                  <button key={s} onClick={() => set(r.id, s)} className="whitespace-nowrap rounded-full border px-2.5 py-1 text-xs font-semibold hover:bg-muted">{s}</button>
                ))}
              </div>
            </td>
          </tr>
        ))}
      </Table>
      <p className="mt-4 text-sm text-muted-foreground">Alterações apenas nesta sessão (demonstração).</p>
    </div>
  );
}

function PlansView() {
  const pc = planCounts();
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {pc.map((p) => (
        <div key={p.id} className={`${card} ${p.recommended ? "ring-2 ring-salmon" : ""}`}>
          <h2 className="text-sm font-extrabold uppercase tracking-widest text-salmon">{p.id}</h2>
          <p className="mt-2 font-display text-3xl font-bold text-petrol">{euro(p.price)}<span className="text-sm font-normal text-muted-foreground">/mês</span></p>
          <p className="mt-2 text-sm font-semibold">{p.n} clientes ativos</p>
          <ul className="mt-4 space-y-1 text-sm text-muted-foreground">{p.features.map((f) => <li key={f}>• {f}</li>)}</ul>
        </div>
      ))}
    </div>
  );
}

function Finance() {
  const pc = planCounts();
  const total = pc.reduce((a, p) => a + p.n * p.price, 0);
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <div className={`${card} bg-petrol text-primary-foreground`}><p className="text-sm opacity-80">Receita mensal estimada</p><p className="font-display text-3xl font-bold">{euro(total)}</p></div>
        {pc.map((p) => (
          <div key={p.id} className={card}><p className="text-sm text-muted-foreground">{p.id} · {p.n} × {euro(p.price)}</p><p className="font-display text-2xl font-bold text-petrol">{euro(p.n * p.price)}</p></div>
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-2"><GrowthChart /><PlanSplit /></div>
    </div>
  );
}

function Table({ head, children }: { head: string[]; children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead><tr className="text-left text-muted-foreground">{head.map((h) => <th key={h} className="p-3 font-semibold">{h}</th>)}</tr></thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}
