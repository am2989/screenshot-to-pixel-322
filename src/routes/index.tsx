import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import {
  Settings, BookOpen, Target, LineChart, MessageCircle, CheckCircle2, Sparkles, Clock, Heart,
  ShieldCheck, Mail, Phone, MapPin, ChevronDown, Menu, X, GraduationCap,
} from "lucide-react";
import { PLANS, TUTORS, SUBJECTS, euro, type PlanId } from "@/lib/demo-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Explica+ — Aprender melhor. Evoluir sempre." },
      { name: "description", content: "Explicações personalizadas, materiais de estudo e acompanhamento escolar para estudantes em Portugal." },
      { property: "og:title", content: "Explica+ — Aprender melhor. Evoluir sempre." },
      { property: "og:description", content: "Planos de subscrição de explicações e apoio escolar em Portugal." },
    ],
  }),
  component: Index,
});

const NAV = [["Início", "inicio"], ["Como funciona", "como-funciona"], ["Explicadores", "explicadores"], ["Planos", "planos"], ["Contactos", "contactos"]];
const btn = "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-bold transition hover:-translate-y-0.5";
const card = "rounded-3xl bg-card p-6 shadow-[var(--shadow-soft)]";

function Logo() {
  return (
    <span className="flex items-center gap-2 font-display text-2xl font-bold text-petrol">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-salmon text-primary-foreground"><GraduationCap size={20} /></span>
      <span>Explica<span className="text-salmon">+</span></span>
    </span>
  );
}

function Index() {
  const [open, setOpen] = useState(false);
  const [plan, setPlan] = useState<PlanId | null>(null);
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <a href="#inicio"><Logo /></a>
          <nav className="hidden items-center gap-7 font-semibold text-muted-foreground md:flex">
            {NAV.map(([l, id]) => <a key={id} href={`#${id}`} className="hover:text-petrol">{l}</a>)}
          </nav>
          <div className="flex items-center gap-2">
            <a href="#planos" className={`${btn} hidden bg-petrol py-2 text-primary-foreground sm:inline-flex`}>Começar agora</a>
            <Link to="/admin" aria-label="Demonstração administrativa" title="Demonstração administrativa" className="grid h-10 w-10 place-items-center rounded-full bg-blush text-petrol transition hover:rotate-90">
              <Settings size={20} />
            </Link>
            <button className="md:hidden" aria-label="Menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
          </div>
        </div>
        {open && (
          <nav className="flex flex-col gap-3 border-t px-5 py-4 font-semibold md:hidden">
            {NAV.map(([l, id]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{l}</a>)}
          </nav>
        )}
      </header>

      {/* Hero */}
      <section id="inicio" className="relative overflow-hidden">
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-blush" />
        <div className="absolute bottom-0 right-1/3 h-40 w-40 rounded-full bg-sun/70" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 md:grid-cols-2 md:py-28">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-mint/60 px-4 py-1.5 text-sm font-bold text-petrol"><Sparkles size={16} /> Aprender melhor. Evoluir sempre.</span>
            <h1 className="mt-6 text-5xl font-bold leading-tight text-petrol md:text-6xl">Aprender pode ser mais simples.</h1>
            <p className="mt-5 max-w-lg text-lg text-muted-foreground">Explicações personalizadas, materiais de estudo e acompanhamento escolar num só lugar.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#planos" className={`${btn} bg-salmon text-primary-foreground`}>Conhecer os planos</a>
              <a href="#explicadores" className={`${btn} border-2 border-petrol text-petrol`}>Encontrar um explicador</a>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-sm">
            <div className={`${card} rotate-2`}>
              <p className="text-sm font-bold text-muted-foreground">Progresso semanal</p>
              <p className="font-display text-3xl font-bold text-petrol">+18%</p>
              <div className="mt-4 flex h-28 items-end gap-2">
                {[40, 55, 45, 70, 65, 85, 95].map((h, i) => <div key={i} className={`flex-1 rounded-t-lg ${i === 6 ? "bg-salmon" : "bg-mint"}`} style={{ height: `${h}%` }} />)}
              </div>
            </div>
            <div className={`${card} -mt-4 ml-10 -rotate-3 bg-sun`}>
              <p className="flex items-center gap-2 font-bold text-petrol"><CheckCircle2 size={18} /> Teste de Matemática: 17 valores</p>
            </div>
          </div>
        </div>
      </section>

      <Section id="como-funciona" title="Como funciona o Explica+" sub="Três passos simples para começar.">
        <div className="grid gap-6 md:grid-cols-3">
          {[[Target, "1. Escolhe o plano", "Seleciona o plano que melhor se adapta às necessidades do estudante.", "bg-blush"],
            [BookOpen, "2. Plano personalizado", "Definimos objetivos, disciplinas e um plano de estudo à medida.", "bg-sun"],
            [LineChart, "3. Acompanha a evolução", "Exercícios, explicações e relatórios para evoluir com confiança.", "bg-mint"]].map(([I, t, d, c]) => {
            const Icon = I as typeof Target;
            return (
              <div key={t as string} className={card}>
                <div className={`grid h-12 w-12 place-items-center rounded-2xl ${c} text-petrol`}><Icon /></div>
                <h3 className="mt-4 text-xl font-bold text-petrol">{t as string}</h3>
                <p className="mt-2 text-muted-foreground">{d as string}</p>
              </div>
            );
          })}
        </div>
      </Section>

      <Section title="Vantagens da plataforma" tinted>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[[Heart, "Apoio próximo", "Explicadores dedicados e atentos."], [Clock, "Horários flexíveis", "Online ou presencial, ao teu ritmo."],
            [ShieldCheck, "Sem fidelização", "Cancela quando quiseres."], [LineChart, "Progresso visível", "Relatórios claros para as famílias."]].map(([I, t, d]) => {
            const Icon = I as typeof Heart;
            return (
              <div key={t as string} className="rounded-3xl bg-card p-5">
                <Icon className="text-salmon" />
                <h3 className="mt-3 font-bold text-petrol">{t as string}</h3>
                <p className="text-sm text-muted-foreground">{d as string}</p>
              </div>
            );
          })}
        </div>
      </Section>

      <Section title="Disciplinas disponíveis">
        <div className="flex flex-wrap justify-center gap-3">
          {SUBJECTS.map((s, i) => (
            <span key={s} className={`rounded-full px-5 py-2.5 font-bold text-petrol ${["bg-blush", "bg-sun", "bg-mint"][i % 3]}`}>{s}</span>
          ))}
        </div>
      </Section>

      <Section id="explicadores" title="Os nossos explicadores" sub="Perfis fictícios, apresentados apenas como exemplos demonstrativos." tinted>
        <div className="grid gap-6 md:grid-cols-3">
          {TUTORS.map((t, i) => <TutorCard key={t.name} t={t} color={["bg-salmon", "bg-petrol", "bg-mint"][i] ?? ""} />)}
        </div>
      </Section>

      <Section id="planos" title="Planos de subscrição" sub="Escolhe o plano ideal. Sem pagamentos online — entramos em contacto contigo.">
        <div className="grid items-stretch gap-6 md:grid-cols-3">
          {PLANS.map((p) => (
            <div key={p.id} className={`relative flex flex-col rounded-3xl p-7 shadow-[var(--shadow-soft)] ${p.recommended ? "bg-petrol text-primary-foreground md:-translate-y-3" : "bg-card"}`}>
              {p.recommended && <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-sun px-4 py-1 text-xs font-extrabold uppercase text-petrol">Recomendado</span>}
              <h3 className={`text-sm font-extrabold uppercase tracking-widest ${p.recommended ? "text-mint" : "text-salmon"}`}>{p.id}</h3>
              <p className="mt-3 font-display text-4xl font-bold">{euro(p.price)}<span className="text-base font-normal opacity-70">/mês</span></p>
              <ul className="mt-6 flex-1 space-y-3">
                {p.features.map((f) => <li key={f} className="flex gap-2"><CheckCircle2 size={20} className={p.recommended ? "text-mint" : "text-salmon"} />{f}</li>)}
              </ul>
              <button onClick={() => { setPlan(p.id); setTimeout(() => document.getElementById("adesao")?.scrollIntoView(), 50); }}
                className={`${btn} mt-7 ${p.recommended ? "bg-salmon text-primary-foreground" : "bg-blush text-petrol"}`}>Escolher plano</button>
            </div>
          ))}
        </div>
        {plan && <SignupForm plan={plan} setPlan={setPlan} />}
      </Section>

      <Section title="Perguntas frequentes" tinted>
        <div className="mx-auto max-w-3xl space-y-3">
          {[["Posso mudar de plano?", "Sim, podes mudar de plano a qualquer momento, sem custos adicionais."],
            ["As explicações são online ou presenciais?", "Ambas. No formulário de adesão indicas a modalidade que preferes."],
            ["Como é feito o pagamento?", "Neste MVP não existem pagamentos online. A equipa Explica+ entra em contacto após o pedido."],
            ["Para que anos escolares?", "Do 2.º ciclo ao ensino secundário."]].map(([q, a]) => (
            <details key={q} className="group rounded-2xl bg-card p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between font-bold text-petrol">{q}<ChevronDown className="transition group-open:rotate-180" /></summary>
              <p className="mt-3 text-muted-foreground">{a}</p>
            </details>
          ))}
        </div>
      </Section>

      <footer id="contactos" className="bg-petrol text-primary-foreground">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-3">
          <div>
            <span className="font-display text-2xl font-bold">Explica<span className="text-salmon">+</span></span>
            <p className="mt-3 opacity-80">Aprender melhor. Evoluir sempre.</p>
          </div>
          <div className="space-y-2 opacity-90">
            <h3 className="mb-3 text-lg font-bold">Contactos</h3>
            <p className="flex items-center gap-2"><Mail size={18} /> ola@explicamais.pt</p>
            <p className="flex items-center gap-2"><Phone size={18} /> +351 912 345 678</p>
            <p className="flex items-center gap-2"><MapPin size={18} /> Lisboa, Portugal</p>
          </div>
          <div className="opacity-80">
            <h3 className="mb-3 text-lg font-bold">Projeto académico</h3>
            <p className="text-sm">MVP demonstrativo desenvolvido para a DIO. Contactos e dados são fictícios.</p>
          </div>
        </div>
        <p className="border-t border-primary-foreground/15 py-5 text-center text-sm opacity-70">© 2026 Explica+ · Demonstração</p>
      </footer>
    </div>
  );
}

function Section({ id, title, sub, tinted, children }: { id?: string; title: string; sub?: string; tinted?: boolean; children: React.ReactNode }) {
  return (
    <section id={id} className={`scroll-mt-20 py-20 ${tinted ? "bg-blush/40" : ""}`}>
      <div className="mx-auto max-w-6xl px-5">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-petrol">{title}</h2>
          {sub && <p className="mt-3 text-muted-foreground">{sub}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}

function TutorCard({ t, color }: { t: (typeof TUTORS)[number]; color: string }) {
  const [more, setMore] = useState(false);
  const initials = t.name.split(" ").map((n) => n[0]).join("");
  return (
    <div className={card}>
      <div className="flex items-center gap-4">
        <div className={`grid h-16 w-16 place-items-center rounded-2xl ${color} font-display text-xl font-bold text-primary-foreground`}>{initials}</div>
        <div>
          <h3 className="text-lg font-bold text-petrol">{t.name}</h3>
          <p className="font-semibold text-salmon">{t.subject}</p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2 text-xs font-bold text-petrol">
        <span className="rounded-full bg-sun px-3 py-1">{t.level}</span>
        <span className="rounded-full bg-mint px-3 py-1">{t.mode}</span>
      </div>
      <p className="mt-4 text-muted-foreground">{t.bio}</p>
      {more && <p className="mt-3 rounded-2xl bg-muted p-3 text-sm text-muted-foreground">Perfil demonstrativo: este explicador é fictício e serve apenas para ilustrar o conceito.</p>}
      <button onClick={() => setMore(!more)} className="mt-4 font-bold text-petrol underline-offset-4 hover:underline">{more ? "Ver menos" : "Saber mais"}</button>
    </div>
  );
}

const input = "w-full rounded-xl border bg-background px-4 py-3 outline-none focus:border-petrol";

function SignupForm({ plan, setPlan }: { plan: PlanId; setPlan: (p: PlanId) => void }) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const err: Record<string, string> = {};
    for (const k of ["guardian", "student", "year"]) if (!String(f.get(k) ?? "").trim()) err[k] = "Campo obrigatório";
    if (!/^\S+@\S+\.\S+$/.test(String(f.get("email")))) err["email"] = "Email inválido";
    if (!/^(\+351)?\s?9\d{8}$/.test(String(f.get("phone")).replace(/\s/g, ""))) err["phone"] = "Telefone inválido (ex.: 912345678)";
    if (f.getAll("subjects").length === 0) err["subjects"] = "Escolhe pelo menos uma disciplina";
    if (!f.get("consent")) err["consent"] = "É necessário aceitar a política de privacidade";
    setErrors(err);
    if (Object.keys(err).length === 0) setDone(true);
  }

  if (done)
    return (
      <div id="adesao" className={`${card} mx-auto mt-14 max-w-2xl scroll-mt-24 text-center`}>
        <CheckCircle2 size={56} className="mx-auto text-salmon" />
        <h3 className="mt-4 text-3xl font-bold text-petrol">Pedido enviado com sucesso!</h3>
        <p className="mt-3 text-muted-foreground">Obrigado pelo interesse no plano <b>{plan}</b>. A equipa Explica+ entrará em contacto nas próximas 24 horas.</p>
        <p className="mt-2 text-xs text-muted-foreground">(Demonstração: o pedido não é enviado nem guardado.)</p>
        <a href="https://wa.me/351912345678" target="_blank" rel="noreferrer" className={`${btn} mt-6 bg-mint text-petrol`}><MessageCircle size={18} /> Falar pelo WhatsApp</a>
      </div>
    );

  const E = ({ k }: { k: string }) => (errors[k] ? <p className="mt-1 text-sm text-destructive">{errors[k]}</p> : null);
  return (
    <form id="adesao" onSubmit={submit} noValidate className={`${card} mx-auto mt-14 max-w-3xl scroll-mt-24`}>
      <h3 className="text-2xl font-bold text-petrol">Formulário de adesão</h3>
      <p className="mb-6 text-sm text-muted-foreground">Preenche os dados e entramos em contacto. Sem pagamentos online.</p>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="font-semibold">Encarregado de educação<input name="guardian" className={input} /><E k="guardian" /></label>
        <label className="font-semibold">Email<input name="email" type="email" className={input} /><E k="email" /></label>
        <label className="font-semibold">Telefone<input name="phone" className={input} placeholder="912345678" /><E k="phone" /></label>
        <label className="font-semibold">Nome do estudante<input name="student" className={input} /><E k="student" /></label>
        <label className="font-semibold">Ano escolar
          <select name="year" className={input} defaultValue=""><option value="" disabled>Seleciona</option>{Array.from({ length: 8 }, (_, i) => <option key={i}>{i + 5}.º ano</option>)}</select><E k="year" />
        </label>
        <label className="font-semibold">Plano escolhido
          <select name="plan" className={input} value={plan} onChange={(e) => setPlan(e.target.value as PlanId)}>{PLANS.map((p) => <option key={p.id} value={p.id}>{p.id} — {euro(p.price)}/mês</option>)}</select>
        </label>
      </div>
      <fieldset className="mt-4">
        <legend className="font-semibold">Disciplinas pretendidas</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {SUBJECTS.map((s) => (
            <label key={s} className="flex cursor-pointer items-center gap-2 rounded-full bg-muted px-3 py-1.5 text-sm has-[:checked]:bg-mint"><input type="checkbox" name="subjects" value={s} className="accent-[var(--petrol)]" />{s}</label>
          ))}
        </div><E k="subjects" />
      </fieldset>
      <fieldset className="mt-4">
        <legend className="font-semibold">Modalidade</legend>
        <div className="mt-2 flex gap-4">
          {["Online", "Presencial"].map((m, i) => <label key={m} className="flex items-center gap-2"><input type="radio" name="mode" value={m} defaultChecked={i === 0} className="accent-[var(--petrol)]" />{m}</label>)}
        </div>
      </fieldset>
      <label className="mt-4 block font-semibold">Mensagem adicional<textarea name="message" rows={3} className={input} /></label>
      <label className="mt-4 flex items-start gap-2 text-sm"><input type="checkbox" name="consent" className="mt-1 accent-[var(--petrol)]" />Li e aceito a política de privacidade e o tratamento dos dados para efeitos de contacto.</label>
      <E k="consent" />
      <button className={`${btn} mt-6 w-full bg-salmon text-primary-foreground`}>Enviar pedido</button>
    </form>
  );
}
