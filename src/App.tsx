import { useState } from "react"

const assets = "/assets"
const brandLogo = `${assets}/shefit-logo.png`

const icons = {
  dashboard: `${assets}/bd02d.svg`,
  users: `${assets}/9e21f.svg`,
  briefcase: `${assets}/bc4cf.svg`,
  activity: `${assets}/fe113.svg`,
  settings: `${assets}/103b4.svg`,
  logout: `${assets}/56441.svg`,
  info: `${assets}/11707.svg`,
  user: `${assets}/01957.svg`,
  refresh: `${assets}/0d0ab.svg`,
  alert: `${assets}/86daf.svg`,
  metricUsers: `${assets}/ae0b2.svg`,
  trending: `${assets}/ad3bf.svg`,
  metricActivity: `${assets}/f96e0.svg`,
  plus: `${assets}/03484.svg`,
  donutBase: `${assets}/d388b.svg`,
  donutRight: `${assets}/3a8fe.svg`,
  donutBottom: `${assets}/0ac51.svg`,
  donutTop: `${assets}/8a3a2.svg`,
  infoMuted: `${assets}/0e296.svg`,
}

const navItems = [
  { label: "Dashboard", icon: icons.dashboard },
  { label: "Estudantes", icon: icons.users, count: "80" },
  { label: "Professores", icon: icons.briefcase, count: "12" },
  { label: "Aulas/Modalidades", icon: icons.activity },
  { label: "Configurações", icon: icons.settings },
]

const schedule = [
  ["Yoga Matinal", "09:00 – 10:00", "25/30"],
  ["Treino de CrossFit", "11:00 – 12:00", "18/20"],
  ["Aula de Zumba", "15:00 – 16:00", "22/25"],
  ["Aula de Boxe", "18:00 – 19:00", "15/15"],
]

const bars = [
  ["Jan", 138],
  ["Fev", 184],
  ["Mar", 230],
  ["Abr", 161],
  ["Mai", 253],
  ["Jun", 299],
] as const

function Icon({
  src,
  size = 20,
  alt = "",
}: {
  src: string
  size?: number
  alt?: string
}) {
  return <img alt={alt} height={size} src={src} width={size} />
}

function NavIcon({ src }: { src: string }) {
  return (
    <span
      aria-hidden="true"
      className="block h-5 w-5 bg-current"
      style={{
        WebkitMaskImage: `url("${src}")`,
        WebkitMaskPosition: "center",
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskSize: "contain",
        maskImage: `url("${src}")`,
        maskPosition: "center",
        maskRepeat: "no-repeat",
        maskSize: "contain",
      }}
    />
  )
}

function Sidebar({
  active,
  onNavigate,
  open,
  onClose,
  collapsed,
  onToggleCollapsed,
}: {
  active: string
  onNavigate: (label: string) => void
  open: boolean
  onClose: () => void
  collapsed: boolean
  onToggleCollapsed: () => void
}) {
  return (
    <>
      {open && (
        <button
          aria-label="Fechar menu"
          className="fixed inset-0 z-30 bg-slate-950/30 lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-60 flex-col justify-between bg-gradient-to-b from-[#8338ec] to-[#e843a6] p-3 shadow-[4px_0_12px_rgba(0,0,0,0.05)] transition-all duration-300 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        } ${collapsed ? "lg:w-[72px]" : "lg:w-60"}`}
      >
        <div className="flex flex-col gap-8">
          <div
            className={`flex items-center py-2 text-white ${
              collapsed ? "lg:justify-center" : "justify-between"
            }`}
          >
            <div
              className={`flex min-w-0 items-center gap-2.5 overflow-hidden transition-all ${
                collapsed ? "lg:hidden" : ""
              }`}
            >
              <img
                alt="Logo SheFit"
                className="h-9 w-9 shrink-0 object-contain brightness-0 invert"
                src={brandLogo}
              />
              <span className="font-inter-bold whitespace-nowrap text-xl">
                SheFit
              </span>
            </div>
            <button
              aria-label={collapsed ? "Expandir menu" : "Recolher menu"}
              className="flex h-8 w-8 items-center justify-center rounded-lg transition hover:bg-white/10"
              onClick={() => {
                if (window.innerWidth >= 1024) {
                  onToggleCollapsed()
                } else {
                  onClose()
                }
              }}
            >
              <img
                alt=""
                className={`h-8 w-8 object-contain brightness-0 invert ${
                  collapsed ? "hidden lg:block" : "hidden"
                }`}
                src={brandLogo}
              />
              <span
                className={`w-[14px] flex-col gap-[3px] ${
                  collapsed ? "flex lg:hidden" : "flex"
                }`}
              >
                <span className="h-[2px] rounded bg-white" />
                <span className="h-[2px] rounded bg-white" />
                <span className="h-[2px] rounded bg-white" />
              </span>
            </button>
          </div>
          <nav className="flex flex-col gap-1" aria-label="Navegação principal">
            {navItems.map((item) => {
              const selected = active === item.label
              return (
                <button
                  key={item.label}
                  title={collapsed ? item.label : undefined}
                  className={`flex min-h-10 w-full items-center gap-3 rounded-xl p-2.5 text-left transition ${
                    collapsed ? "lg:justify-center lg:gap-0" : ""
                  } ${
                    selected
                      ? "bg-[#f3e8ff] text-[#6f2cf4]"
                      : "text-white hover:bg-white/10"
                  }`}
                  onClick={() => {
                    onNavigate(item.label)
                    onClose()
                  }}
                >
                  <span className="shrink-0">
                    <NavIcon src={item.icon} />
                  </span>
                  <span
                    className={`min-w-0 flex-1 overflow-hidden whitespace-nowrap text-sm transition-all ${
                      collapsed
                        ? "lg:w-0 lg:opacity-0"
                        : "lg:w-auto lg:opacity-100"
                    } ${
                      selected ? "font-inter-semibold" : "font-inter-medium"
                    }`}
                  >
                    {item.label}
                  </span>
                  {item.count && (
                    <span
                      className={`font-inter-semibold rounded-full bg-[#f3f4f6] px-2 py-0.5 text-xs text-[#6b7280] ${
                        collapsed ? "lg:hidden" : ""
                      }`}
                    >
                      {item.count}
                    </span>
                  )}
                </button>
              )
            })}
          </nav>
        </div>
        <div className="flex flex-col gap-4">
          <button
            className={`font-inter-semibold flex items-center gap-3 overflow-hidden rounded-xl bg-[#fef2f2] p-2.5 text-sm text-[#ef4444] transition hover:bg-white ${
              collapsed ? "lg:justify-center lg:gap-0" : ""
            }`}
            title={collapsed ? "Sair" : undefined}
          >
            <span className="shrink-0">
              <Icon src={icons.logout} />
            </span>
            <span className={collapsed ? "lg:hidden" : ""}>Sair</span>
          </button>
          <div
            className="font-inter-regular flex items-center gap-2 overflow-hidden px-2 text-xs whitespace-nowrap text-white"
            title={collapsed ? "Dados de Demonstração" : undefined}
          >
            <Icon src={icons.info} size={14} />
            <span className={collapsed ? "lg:hidden" : ""}>
              Dados de Demonstração
            </span>
          </div>
        </div>
      </aside>
    </>
  )
}

function MetricCard({
  label,
  value,
  icon,
  detail,
  detailIcon,
  accent,
}: {
  label: string
  value: string
  icon: string
  detail: string
  detailIcon?: string
  accent?: string
}) {
  return (
    <article className="flex min-w-0 flex-col gap-2.5 rounded-xl bg-white p-4 shadow-[0_4px_6px_rgba(0,0,0,0.03)]">
      <div className="flex items-center justify-between gap-3">
        <p className="font-inter-medium text-sm text-[#6b7280]">{label}</p>
        <Icon src={icon} />
      </div>
      <p className="font-inter-bold text-[28px] leading-none text-[#111827]">
        {value}
      </p>
      <div
        className="font-inter-medium flex items-center gap-1.5 text-[13px]"
        style={{ color: accent || "#6b7280" }}
      >
        {detailIcon && <Icon src={detailIcon} size={14} />}
        <span>{detail}</span>
      </div>
    </article>
  )
}

function DonutChart() {
  return (
    <div
      className="relative h-[200px] w-[200px]"
      aria-label="Distribuição de 245 planos"
    >
      <img
        alt=""
        className="absolute inset-0"
        height="200"
        src={icons.donutBase}
        width="200"
      />
      <div className="absolute bottom-[0.1%] left-1/2 right-0 top-0">
        <img alt="" className="h-full w-full" src={icons.donutRight} />
      </div>
      <div className="absolute inset-[29.76%_46.8%_0_0]">
        <img alt="" className="h-full w-full" src={icons.donutBottom} />
      </div>
      <div className="absolute bottom-[65.18%] left-[4.28%] right-1/2 top-0">
        <img alt="" className="h-full w-full" src={icons.donutTop} />
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
        <span className="font-inter-bold text-2xl text-[#111827]">245</span>
        <span className="font-inter-regular text-xs text-[#6b7280]">Total</span>
      </div>
    </div>
  )
}

function PopularClasses() {
  const classes = ["Boxing", "Pilates", "Zumba", "CrossFit", "Yoga"]
  return (
    <article className="card flex min-h-[400px] flex-col gap-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-inter-semibold text-lg text-[#111827]">
            Aulas Populares
          </h2>
          <p className="font-inter-regular mt-1 text-[13px] text-[#6b7280]">
            Frequência média semanal por modalidade
          </p>
        </div>
        <span className="font-inter-medium rounded-md bg-[#f3f4f6] px-2.5 py-1 text-xs text-[#6b7280]">
          Dados não disponíveis
        </span>
      </div>
      <div className="min-w-0 flex-1 overflow-hidden">
        {classes.map((name) => (
          <div className="flex h-[42px] items-center gap-3" key={name}>
            <span className="font-inter-regular w-[72px] shrink-0 text-right text-[13px] text-[#6b7280]">
              {name}
            </span>
            <div className="grid h-full flex-1 grid-cols-4 border-x border-[#e5e7eb]">
              <span className="border-r border-[#e5e7eb]" />
              <span className="border-r border-[#e5e7eb]" />
              <span className="border-r border-[#e5e7eb]" />
              <span />
            </div>
          </div>
        ))}
        <div className="font-inter-regular ml-[84px] flex justify-between pt-2 text-xs text-[#6b7280]">
          <span>0</span>
          <span>0,25</span>
          <span>0,5</span>
          <span>0,75</span>
          <span>1</span>
        </div>
      </div>
      <div className="font-inter-regular flex items-center gap-1.5 text-xs text-[#9ca3af]">
        <Icon src={icons.infoMuted} size={14} />
        <p>
          Dados de frequência ainda não disponíveis — conteúdo de demonstração.
        </p>
      </div>
    </article>
  )
}

type StudentStatus = "Ativo" | "Expirado" | "Congelado"
type StudentPlan = "Básico" | "Premium" | "VIP"

type StudentFormData = {
  name: string
  cpf: string
  birthDate: string
  address: string
  phone: string
  email: string
  emergencyName: string
  emergencyPhone: string
  username: string
  password: string
  plan: StudentPlan
  restrictions: string
  injuries: string
  conditions: string
  authorization: boolean
}

type Student = {
  id: number
  name: string
  email: string
  phone: string
  plan: StudentPlan
  status: StudentStatus
  joined: string
  details?: StudentFormData
}

const initialStudents: Student[] = [
  {
    id: 1,
    name: "João Silva",
    email: "joao.silva@email.com",
    phone: "+55 (11) 91234-4567",
    plan: "Premium",
    status: "Ativo",
    joined: "14/01/2024",
  },
  {
    id: 2,
    name: "Sara Oliveira",
    email: "sara.oliveira@email.com",
    phone: "+55 (11) 99876-6543",
    plan: "Básico",
    status: "Ativo",
    joined: "21/03/2024",
  },
  {
    id: 3,
    name: "Miguel Santos",
    email: "miguel.santos@email.com",
    phone: "+55 (11) 94567-7890",
    plan: "VIP",
    status: "Expirado",
    joined: "04/11/2023",
  },
  {
    id: 4,
    name: "Ema Costa",
    email: "ema.costa@email.com",
    phone: "+55 (11) 92345-5678",
    plan: "Premium",
    status: "Ativo",
    joined: "09/02/2024",
  },
  {
    id: 5,
    name: "David Almeida",
    email: "david.almeida@email.com",
    phone: "+55 (11) 93456-6789",
    plan: "Básico",
    status: "Congelado",
    joined: "17/04/2024",
  },
]

function UiIcon({
  name,
  size = 16,
}: {
  name: "search" | "mail" | "phone" | "calendar" | "edit" | "trash" | "plus" | "close" | "star" | "people"
  size?: number
}) {
  const paths = {
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
    phone: (
      <path d="M6.6 3.5 9 7.7 6.8 9.3c1.3 2.8 3.1 4.6 5.9 5.9l1.6-2.2 4.2 2.4-.8 3.4c-.2.8-1 1.4-1.9 1.3C9.3 19.2 4.8 14.7 3.9 8.2c-.1-.9.5-1.7 1.3-1.9l1.4-2.8Z" />
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M8 3v4M16 3v4M3 10h18" />
      </>
    ),
    edit: (
      <>
        <path d="M4 20h4L19 9l-4-4L4 16v4Z" />
        <path d="m13.5 6.5 4 4" />
      </>
    ),
    trash: (
      <>
        <path d="M4 7h16M9 7V4h6v3M7 7l1 14h8l1-14" />
        <path d="M10 11v6M14 11v6" />
      </>
    ),
    plus: <path d="M12 5v14M5 12h14" />,
    close: <path d="m6 6 12 12M18 6 6 18" />,
    star: (
      <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z" />
    ),
    people: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" />
      </>
    ),
  }

  return (
    <svg
      aria-hidden="true"
      fill="none"
      height={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
      width={size}
    >
      {paths[name]}
    </svg>
  )
}

const emptyStudentForm: StudentFormData = {
  name: "",
  cpf: "",
  birthDate: "",
  address: "",
  phone: "",
  email: "",
  emergencyName: "",
  emergencyPhone: "",
  username: "",
  password: "",
  plan: "Básico",
  restrictions: "",
  injuries: "",
  conditions: "",
  authorization: false,
}

function FormField({
  label,
  name,
  type = "text",
  value,
  required = false,
  placeholder,
  onChange,
}: {
  label: string
  name: keyof StudentFormData
  type?: string
  value: string
  required?: boolean
  placeholder?: string
  onChange: (name: keyof StudentFormData, value: string) => void
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-inter-semibold text-sm text-[#1f2937]">
        {label}
        {required && <span className="text-[#e843a6]"> *</span>}
      </span>
      <input
        className="font-inter-regular h-11 rounded-lg border border-[#d1d5db] bg-white px-3 text-sm text-[#111827] outline-none transition placeholder:text-[#9ca3af] focus:border-[#8338ec] focus:ring-2 focus:ring-[#8338ec]/10"
        name={name}
        onChange={(event) => onChange(name, event.target.value)}
        placeholder={placeholder}
        required={required}
        type={type}
        value={value}
      />
    </label>
  )
}

function StudentRegistrationForm({
  onCancel,
  onComplete,
  initialData,
  mode = "create",
}: {
  onCancel: () => void
  onComplete: (data: StudentFormData) => void
  initialData?: StudentFormData
  mode?: "create" | "edit"
}) {
  const [step, setStep] = useState<1 | 2>(1)
  const [form, setForm] = useState(initialData ?? emptyStudentForm)

  const update = (name: keyof StudentFormData, value: string | boolean) => {
    setForm((current) => ({ ...current, [name]: value }))
  }

  const inputClass =
    "font-inter-regular min-h-24 resize-y rounded-lg border border-[#d1d5db] bg-white p-3 text-sm text-[#111827] outline-none transition placeholder:text-[#9ca3af] focus:border-[#8338ec] focus:ring-2 focus:ring-[#8338ec]/10"

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gradient-to-br from-[#8338ec] to-[#e843a6] p-4 sm:p-6">
      <div className="mx-auto w-full max-w-[680px] rounded-2xl bg-white p-5 shadow-2xl sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              alt="Logo SheFit"
              className="h-11 w-11 object-contain"
              src={brandLogo}
            />
            <div>
              <h1 className="font-inter-bold text-2xl text-[#8338ec]">
                SheFit
              </h1>
              <p className="font-inter-regular mt-0.5 text-sm text-[#6b7280]">
                {step === 1
                  ? mode === "edit"
                    ? "Editar Estudante"
                    : "Cadastro de Estudante"
                  : "Ficha de Anamnese e Saúde"}
              </p>
            </div>
          </div>
          <button
            aria-label="Fechar formulário"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-[#6b7280] transition hover:bg-[#f3e8ff] hover:text-[#8338ec]"
            onClick={onCancel}
            type="button"
          >
            <UiIcon name="close" size={20} />
          </button>
        </div>

        <div className="my-6 grid grid-cols-2 gap-2">
          <div
            className={`h-1.5 rounded-full ${
              step >= 1 ? "bg-[#8338ec]" : "bg-[#e5e7eb]"
            }`}
          />
          <div
            className={`h-1.5 rounded-full ${
              step === 2 ? "bg-[#e843a6]" : "bg-[#e5e7eb]"
            }`}
          />
        </div>

        {step === 1 ? (
          <form
            className="flex flex-col gap-5"
            onSubmit={(event) => {
              event.preventDefault()
              setStep(2)
            }}
          >
            <section>
              <h2 className="font-inter-semibold mb-4 text-base text-[#111827]">
                Dados pessoais
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <FormField
                    label="Nome completo"
                    name="name"
                    onChange={update}
                    placeholder="Digite o nome completo"
                    required
                    value={form.name}
                  />
                </div>
                <FormField
                  label="CPF"
                  name="cpf"
                  onChange={update}
                  placeholder="000.000.000-00"
                  required={mode === "create"}
                  value={form.cpf}
                />
                <FormField
                  label="Data de nascimento"
                  name="birthDate"
                  onChange={update}
                  required={mode === "create"}
                  type="date"
                  value={form.birthDate}
                />
                <div className="sm:col-span-2">
                  <FormField
                    label="Endereço"
                    name="address"
                    onChange={update}
                    placeholder="Rua, número, bairro e cidade"
                    required={mode === "create"}
                    value={form.address}
                  />
                </div>
                <FormField
                  label="Telefone"
                  name="phone"
                  onChange={update}
                  placeholder="(00) 00000-0000"
                  required
                  type="tel"
                  value={form.phone}
                />
                <FormField
                  label="E-mail"
                  name="email"
                  onChange={update}
                  placeholder="nome@email.com"
                  required
                  type="email"
                  value={form.email}
                />
              </div>
            </section>

            <label className="flex flex-col gap-1.5">
              <span className="font-inter-semibold text-sm text-[#1f2937]">
                Foto do estudante
              </span>
              <input
                accept="image/*"
                className="font-inter-regular rounded-lg border border-dashed border-[#c4b5fd] bg-[#faf7ff] p-3 text-sm text-[#6b7280] file:mr-3 file:rounded-md file:border-0 file:bg-[#f3e8ff] file:px-3 file:py-2 file:text-[#6f2cf4]"
                type="file"
              />
            </label>

            <section>
              <h2 className="font-inter-semibold mb-4 text-base text-[#111827]">
                Contato de emergência
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  label="Nome do contato"
                  name="emergencyName"
                  onChange={update}
                  placeholder="Nome completo"
                  required={mode === "create"}
                  value={form.emergencyName}
                />
                <FormField
                  label="Telefone do contato"
                  name="emergencyPhone"
                  onChange={update}
                  placeholder="(00) 00000-0000"
                  required={mode === "create"}
                  type="tel"
                  value={form.emergencyPhone}
                />
              </div>
            </section>

            <section>
              <label className="flex flex-col gap-1.5">
                <span className="font-inter-semibold text-sm text-[#1f2937]">
                  Plano do estudante <span className="text-[#e843a6]">*</span>
                </span>
                <select
                  className="font-inter-regular h-11 cursor-pointer rounded-lg border border-[#d1d5db] bg-white px-3 text-sm text-[#111827] outline-none transition focus:border-[#8338ec] focus:ring-2 focus:ring-[#8338ec]/10"
                  name="plan"
                  onChange={(event) =>
                    update("plan", event.target.value as StudentPlan)
                  }
                  required
                  value={form.plan}
                >
                  <option value="Básico">Básico — acesso essencial</option>
                  <option value="Premium">
                    Premium — mais aulas e benefícios
                  </option>
                  <option value="VIP">VIP — experiência completa</option>
                </select>
              </label>
            </section>

            <section>
              <h2 className="font-inter-semibold mb-4 text-base text-[#111827]">
                Dados de acesso
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  label="Nome de usuário"
                  name="username"
                  onChange={update}
                  placeholder="Escolha um usuário"
                  required={mode === "create"}
                  value={form.username}
                />
                <FormField
                  label="Senha"
                  name="password"
                  onChange={update}
                  placeholder="Mínimo de 8 caracteres"
                  required={mode === "create"}
                  type="password"
                  value={form.password}
                />
              </div>
            </section>

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                className="font-inter-medium rounded-lg border border-[#d1d5db] px-5 py-3 text-sm text-[#374151] transition hover:bg-[#f9fafb]"
                onClick={onCancel}
                type="button"
              >
                Cancelar
              </button>
              <button
                className="font-inter-semibold rounded-lg bg-gradient-to-r from-[#8338ec] to-[#a737df] px-6 py-3 text-sm text-white transition hover:opacity-90"
                type="submit"
              >
                Avançar para anamnese
              </button>
            </div>
          </form>
        ) : (
          <form
            className="flex flex-col gap-5"
            onSubmit={(event) => {
              event.preventDefault()
              onComplete(form)
            }}
          >
            <div className="font-inter-semibold rounded-lg bg-[#f3e8ff] px-4 py-3 text-center text-sm text-[#6f2cf4]">
              Estudante: {form.name} · Plano {form.plan}
            </div>

            <label className="flex flex-col gap-1.5">
              <span className="font-inter-semibold text-sm text-[#1f2937]">
                Restrições médicas
              </span>
              <textarea
                className={inputClass}
                onChange={(event) => update("restrictions", event.target.value)}
                placeholder="Informe restrições ou escreva “Não possui”"
                value={form.restrictions}
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="font-inter-semibold text-sm text-[#1f2937]">
                Histórico de lesões
              </span>
              <textarea
                className={inputClass}
                onChange={(event) => update("injuries", event.target.value)}
                placeholder="Descreva lesões anteriores, se houver"
                value={form.injuries}
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="font-inter-semibold text-sm text-[#1f2937]">
                Condições crônicas
              </span>
              <textarea
                className={inputClass}
                onChange={(event) => update("conditions", event.target.value)}
                placeholder="Informe condições crônicas, se houver"
                value={form.conditions}
              />
            </label>

            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
              <input
                checked={form.authorization}
                className="mt-0.5 h-4 w-4 accent-[#8338ec]"
                onChange={(event) =>
                  update("authorization", event.target.checked)
                }
                required
                type="checkbox"
              />
              <span className="font-inter-regular text-sm leading-5 text-amber-900">
                <strong className="font-inter-semibold">
                  Termo de autorização:
                </strong>{" "}
                o estudante declara estar apto para a prática de atividades
                físicas sob orientação profissional.
              </span>
            </label>

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                className="font-inter-medium rounded-lg border border-[#d1d5db] px-5 py-3 text-sm text-[#374151] transition hover:bg-[#f9fafb]"
                onClick={() => setStep(1)}
                type="button"
              >
                Voltar
              </button>
              <button
                className="font-inter-semibold rounded-lg bg-gradient-to-r from-[#8338ec] to-[#e843a6] px-6 py-3 text-sm text-white transition hover:opacity-90"
                type="submit"
              >
                {mode === "edit"
                  ? "Salvar alterações"
                  : "Salvar e liberar matrícula"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

function StudentsPanel() {
  const [students, setStudents] = useState(initialStudents)
  const [query, setQuery] = useState("")
  const [showRegistration, setShowRegistration] = useState(false)
  const [editingStudent, setEditingStudent] = useState<Student | null>(null)

  const visibleStudents = students.filter((student) =>
    `${student.name} ${student.email} ${student.plan} ${student.status}`
      .toLocaleLowerCase("pt-BR")
      .includes(query.toLocaleLowerCase("pt-BR")),
  )

  const closeForm = () => {
    setShowRegistration(false)
    setEditingStudent(null)
  }

  const saveStudent = (data: StudentFormData) => {
    if (editingStudent) {
      setStudents((current) =>
        current.map((student) =>
          student.id === editingStudent.id
            ? {
                ...student,
                name: data.name.trim(),
                email: data.email.trim(),
                phone: data.phone.trim(),
                plan: data.plan,
                details: data,
              }
            : student,
        ),
      )
    } else {
      setStudents((current) => [
        ...current,
        {
          id: Date.now(),
          name: data.name.trim(),
          email: data.email.trim(),
          phone: data.phone.trim(),
          plan: data.plan,
          status: "Ativo",
          joined: new Intl.DateTimeFormat("pt-BR").format(new Date()),
          details: data,
        },
      ])
    }
    closeForm()
  }

  const editStudent = (student: Student) => {
    setEditingStudent(student)
    setShowRegistration(true)
  }

  const removeStudent = (student: Student) => {
    if (!window.confirm(`Excluir ${student.name} do diretório?`)) return
    setStudents((current) => current.filter((item) => item.id !== student.id))
  }

  const statusClasses: Record<StudentStatus, string> = {
    Ativo: "bg-emerald-100 text-emerald-700",
    Expirado: "bg-rose-100 text-rose-700",
    Congelado: "bg-amber-100 text-amber-700",
  }

  const planClasses: Record<StudentPlan, string> = {
    Básico: "bg-slate-100 text-slate-700",
    Premium: "bg-blue-100 text-blue-700",
    VIP: "bg-purple-100 text-purple-700",
  }

  return (
    <>
      {showRegistration && (
        <StudentRegistrationForm
          initialData={
            editingStudent
              ? {
                  ...emptyStudentForm,
                  ...editingStudent.details,
                  name: editingStudent.name,
                  email: editingStudent.email,
                  phone: editingStudent.phone,
                  plan: editingStudent.plan,
                  authorization: editingStudent.details?.authorization ?? false,
                }
              : undefined
          }
          mode={editingStudent ? "edit" : "create"}
          onCancel={closeForm}
          onComplete={saveStudent}
        />
      )}
      <main className="flex flex-col gap-5 p-4 sm:p-5 xl:p-6">
        <section className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-inter-bold text-2xl sm:text-[26px]">
              Gestão de Estudantes
            </h1>
            <p className="font-inter-regular mt-1 text-sm text-[#6b7280]">
              Gerencie estudantes, planos e dados cadastrais.
            </p>
          </div>
          <button
            className="font-inter-semibold flex items-center gap-2 rounded-lg bg-[#8338ec] px-4 py-2.5 text-sm text-white transition hover:bg-[#6f2cf4] focus:outline-none focus:ring-2 focus:ring-[#8338ec]/30"
            onClick={() => {
              setEditingStudent(null)
              setShowRegistration(true)
            }}
          >
            <UiIcon name="plus" />
            Adicionar estudante
          </button>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            ["Total de estudantes", "245", "#111827"],
            ["Estudantes ativos", "198", "#10b981"],
            ["Planos expirados", "32", "#ef4444"],
            ["Planos congelados", "15", "#d97706"],
          ].map(([label, value, color]) => (
            <article
              className="flex min-h-[120px] flex-col justify-between rounded-2xl border border-[#e5e7eb] bg-white p-5"
              key={label}
            >
              <h2 className="font-inter-semibold text-sm text-[#374151]">
                {label}
              </h2>
              <p className="font-inter-regular text-[28px]" style={{ color }}>
                {value}
              </p>
            </article>
          ))}
        </section>

        <section className="rounded-2xl border border-[#e5e7eb] bg-white p-4 sm:p-5">
          <h2 className="font-inter-semibold text-lg text-[#111827]">
            Diretório de Estudantes
          </h2>
          <label className="mt-3 flex h-10 max-w-[420px] items-center gap-2 rounded-lg bg-[#f3f4f6] px-3 text-[#6b7280]">
            <UiIcon name="search" />
            <span className="sr-only">Buscar estudantes</span>
            <input
              className="font-inter-regular min-w-0 flex-1 bg-transparent text-sm text-[#111827] outline-none placeholder:text-[#6b7280]"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar estudantes..."
              type="search"
              value={query}
            />
          </label>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[800px] border-collapse text-left">
              <thead>
                <tr className="border-b border-[#e5e7eb]">
                  {[
                    "Nome",
                    "Contato",
                    "Plano",
                    "Status",
                    "Data de entrada",
                    "Ações",
                  ].map((heading) => (
                    <th
                      className="font-inter-semibold px-2 py-3 text-[13px] text-[#111827]"
                      key={heading}
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {visibleStudents.map((student) => (
                  <tr
                    className="border-b border-[#e5e7eb] last:border-0"
                    key={student.id}
                  >
                    <td className="px-2 py-3">
                      <p className="font-inter-medium text-sm text-[#111827]">
                        {student.name}
                      </p>
                    </td>
                    <td className="px-2 py-3">
                      <div className="font-inter-regular flex items-center gap-1.5 text-[13px] text-[#374151]">
                        <UiIcon name="mail" size={14} />
                        {student.email}
                      </div>
                      <div className="font-inter-regular mt-1.5 flex items-center gap-1.5 text-[13px] text-[#374151]">
                        <UiIcon name="phone" size={14} />
                        {student.phone}
                      </div>
                    </td>
                    <td className="px-2 py-3">
                      <span
                        className={`font-inter-medium rounded-lg px-2.5 py-1 text-xs ${planClasses[student.plan]}`}
                      >
                        {student.plan}
                      </span>
                    </td>
                    <td className="px-2 py-3">
                      <span
                        className={`font-inter-medium rounded-lg px-2.5 py-1 text-xs ${statusClasses[student.status]}`}
                      >
                        {student.status}
                      </span>
                    </td>
                    <td className="px-2 py-3">
                      <div className="font-inter-regular flex items-center gap-1.5 text-[13px] text-[#374151]">
                        <UiIcon name="calendar" size={14} />
                        {student.joined}
                      </div>
                    </td>
                    <td className="px-2 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          aria-label={`Editar ${student.name}`}
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#e5e7eb] text-[#374151] transition hover:border-[#8338ec] hover:text-[#8338ec]"
                          onClick={() => editStudent(student)}
                        >
                          <UiIcon name="edit" />
                        </button>
                        <button
                          aria-label={`Excluir ${student.name}`}
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#e5e7eb] text-[#374151] transition hover:border-[#ef4444] hover:text-[#ef4444]"
                          onClick={() => removeStudent(student)}
                        >
                          <UiIcon name="trash" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {visibleStudents.length === 0 && (
              <p className="font-inter-regular py-10 text-center text-sm text-[#6b7280]">
                Nenhum estudante encontrado.
              </p>
            )}
          </div>
        </section>
      </main>
    </>
  )
}

type Teacher = {
  initials: string
  name: string
  status: "Em aula" | "Disponível" | "Fora de serviço"
  experience: number
  rating: string
  students: number
  specialties: string[]
  weeklyHours: number
  email: string
  phone: string
}

const teachers: Teacher[] = [
  {
    initials: "MS",
    name: "Mariana Souza",
    status: "Em aula",
    experience: 7,
    rating: "4,9",
    students: 30,
    specialties: ["Yoga", "Pilates", "Meditação"],
    weeklyHours: 28,
    email: "mariana.souza@shefit.com",
    phone: "+55 (11) 93333-4444",
  },
  {
    initials: "AR",
    name: "Alexandre Rodrigues",
    status: "Disponível",
    experience: 5,
    rating: "4,8",
    students: 25,
    specialties: ["Personal Trainer", "CrossFit", "Nutrição"],
    weeklyHours: 32,
    email: "alexandre.rodrigues@shefit.com",
    phone: "+55 (11) 91111-2222",
  },
  {
    initials: "MT",
    name: "Mateus Teixeira",
    status: "Disponível",
    experience: 6,
    rating: "4,7",
    students: 22,
    specialties: ["Boxe", "HIIT", "Musculação"],
    weeklyHours: 35,
    email: "mateus.teixeira@shefit.com",
    phone: "+55 (11) 95555-6666",
  },
  {
    initials: "EM",
    name: "Eduarda Martins",
    status: "Fora de serviço",
    experience: 4,
    rating: "4,6",
    students: 45,
    specialties: ["Zumba", "Dança Fitness", "Aulas em Grupo"],
    weeklyHours: 30,
    email: "eduarda.martins@shefit.com",
    phone: "+55 (11) 97777-8888",
  },
]

function TeachersPanel() {
  const [tab, setTab] = useState<"teachers" | "schedule" | "performance">(
    "teachers",
  )
  const statusClasses: Record<Teacher["status"], string> = {
    "Em aula": "bg-blue-100 text-blue-700",
    Disponível: "bg-emerald-100 text-emerald-700",
    "Fora de serviço": "bg-slate-100 text-slate-700",
  }

  return (
    <main className="flex flex-col gap-5 p-4 sm:p-5 xl:p-6">
      <section>
        <h1 className="font-inter-bold text-2xl sm:text-[26px]">
          Gestão de Professores
        </h1>
        <p className="font-inter-regular mt-1 text-sm text-[#6b7280]">
          Gerencie professores, horários e acompanhe o desempenho da equipe.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          ["Total de professores", "12", "4 disponíveis agora"],
          ["Sessões ativas", "8", "Em andamento"],
          ["Avaliação média", "4,7", "Satisfação dos alunos"],
          ["Total de alunos", "122", "Entre todos os professores"],
        ].map(([label, value, detail]) => (
          <article
            className="flex min-h-[128px] flex-col justify-between rounded-2xl border border-[#e5e7eb] bg-white p-5"
            key={label}
          >
            <h2 className="font-inter-semibold text-sm text-[#374151]">
              {label}
            </h2>
            <div>
              <p className="font-inter-regular text-[28px] text-[#111827]">
                {value}
              </p>
              <p className="font-inter-regular mt-0.5 text-xs text-[#6b7280]">
                {detail}
              </p>
            </div>
          </article>
        ))}
      </section>

      <div className="flex w-fit max-w-full overflow-x-auto rounded-xl bg-[#e5e7eb] p-1">
        {[
          ["teachers", "Professores"],
          ["schedule", "Agenda de hoje"],
          ["performance", "Desempenho"],
        ].map(([value, label]) => (
          <button
            className={`font-inter-semibold whitespace-nowrap rounded-lg px-3 py-2 text-sm transition ${
              tab === value
                ? "bg-white text-[#111827] shadow-sm"
                : "text-[#4b5563] hover:text-[#111827]"
            }`}
            key={value}
            onClick={() => setTab(value as typeof tab)}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "teachers" && (
        <section className="grid gap-4 lg:grid-cols-2 2xl:grid-cols-3">
          {teachers.map((teacher) => (
            <article
              className="flex min-h-[350px] flex-col rounded-2xl border border-[#e5e7eb] bg-white p-5"
              key={teacher.name}
            >
              <div className="flex items-start gap-3">
                <div className="font-inter-medium flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f3f4f6] text-sm text-[#111827]">
                  {teacher.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="font-inter-medium truncate text-base text-[#111827]">
                    {teacher.name}
                  </h2>
                  <p className="font-inter-regular mt-1 text-[13px] text-[#6b7280]">
                    {teacher.experience} anos de experiência
                  </p>
                </div>
                <span
                  className={`font-inter-medium rounded-lg px-2.5 py-1 text-xs whitespace-nowrap ${statusClasses[teacher.status]}`}
                >
                  {teacher.status}
                </span>
              </div>

              <div className="mt-10 flex items-center justify-between text-[13px]">
                <span className="font-inter-medium flex items-center gap-1.5 text-[#374151]">
                  <span className="text-amber-400">
                    <UiIcon name="star" size={17} />
                  </span>
                  {teacher.rating}
                </span>
                <span className="font-inter-regular flex items-center gap-1.5 text-[#6b7280]">
                  <UiIcon name="people" size={17} />
                  {teacher.students} alunos
                </span>
              </div>

              <div className="mt-5">
                <p className="font-inter-medium text-sm text-[#111827]">
                  Especialidades:
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {teacher.specialties.map((specialty) => (
                    <span
                      className="font-inter-semibold rounded-lg bg-[#f3f4f6] px-2.5 py-1 text-xs text-[#374151]"
                      key={specialty}
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-7">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-inter-medium">Horas semanais</span>
                  <span className="font-inter-regular">
                    {teacher.weeklyHours}/40
                  </span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#d1d5db]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#8338ec] to-[#e843a6]"
                    style={{ width: `${(teacher.weeklyHours / 40) * 100}%` }}
                  />
                </div>
              </div>

              <div className="font-inter-regular mt-auto space-y-2 pt-7 text-xs text-[#6b7280]">
                <p className="flex items-center gap-2">
                  <UiIcon name="mail" size={14} />
                  {teacher.email}
                </p>
                <p className="flex items-center gap-2">
                  <UiIcon name="phone" size={14} />
                  {teacher.phone}
                </p>
              </div>
            </article>
          ))}
        </section>
      )}

      {tab === "schedule" && (
        <section className="rounded-2xl border border-[#e5e7eb] bg-white p-5">
          <h2 className="font-inter-semibold text-lg">Agenda de hoje</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {[
              ["08:00 – 09:00", "Yoga", "Mariana Souza"],
              ["10:00 – 11:00", "CrossFit", "Alexandre Rodrigues"],
              ["15:00 – 16:00", "Boxe", "Mateus Teixeira"],
              ["18:00 – 19:00", "Zumba", "Eduarda Martins"],
            ].map(([time, activity, teacher]) => (
              <div
                className="flex items-center justify-between rounded-xl bg-[#f9fafb] p-4"
                key={time}
              >
                <div>
                  <p className="font-inter-semibold text-sm">{activity}</p>
                  <p className="font-inter-regular mt-1 text-xs text-[#6b7280]">
                    {teacher}
                  </p>
                </div>
                <span className="font-inter-medium text-xs text-[#6f2cf4]">
                  {time}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {tab === "performance" && (
        <section className="rounded-2xl border border-[#e5e7eb] bg-white p-5">
          <h2 className="font-inter-semibold text-lg">Desempenho da equipe</h2>
          <div className="mt-5 space-y-5">
            {teachers.map((teacher) => (
              <div
                className="grid items-center gap-2 sm:grid-cols-[180px_1fr_50px]"
                key={teacher.name}
              >
                <span className="font-inter-medium text-sm">
                  {teacher.name}
                </span>
                <div className="h-2 overflow-hidden rounded-full bg-[#e5e7eb]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#8338ec] to-[#e843a6]"
                    style={{
                      width: `${Number(teacher.rating.replace(",", ".")) * 20}%`,
                    }}
                  />
                </div>
                <span className="font-inter-semibold text-right text-sm">
                  {teacher.rating}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  )
}

type Modality = {
  id: number
  name: string
  description: string
}

type GymClass = {
  id: number
  modality: string
  day: string
  time: string
  teacher: string
  room: string
  capacity: number
  enrolled: number
  active: boolean
}

const initialModalities: Modality[] = [
  {
    id: 1,
    name: "Pilates",
    description: "Fortalecimento, postura, mobilidade e flexibilidade.",
  },
  {
    id: 2,
    name: "Yoga",
    description: "Equilíbrio entre corpo e mente com respiração e alongamento.",
  },
  {
    id: 3,
    name: "CrossFit",
    description:
      "Treino funcional de alta intensidade com movimentos variados.",
  },
  {
    id: 4,
    name: "Boxe",
    description:
      "Técnica, condicionamento cardiovascular e coordenação motora.",
  },
  {
    id: 5,
    name: "Zumba",
    description: "Aula dançante, dinâmica e focada em condicionamento.",
  },
  {
    id: 6,
    name: "Musculação",
    description:
      "Treino de força personalizado com acompanhamento profissional.",
  },
  {
    id: 7,
    name: "HIIT",
    description: "Intervalos intensos para melhorar resistência e metabolismo.",
  },
  {
    id: 8,
    name: "Treino Funcional",
    description: "Movimentos integrados para força, equilíbrio e agilidade.",
  },
  {
    id: 9,
    name: "Meditação",
    description: "Práticas guiadas de respiração, foco e relaxamento.",
  },
  {
    id: 10,
    name: "Dança Fitness",
    description: "Coreografias brasileiras combinadas com exercício aeróbico.",
  },
]

const initialClasses: GymClass[] = [
  {
    id: 1,
    modality: "Pilates",
    day: "Segunda-feira",
    time: "08:00",
    teacher: "Mariana Souza",
    room: "Sala 02",
    capacity: 16,
    enrolled: 12,
    active: true,
  },
  {
    id: 2,
    modality: "CrossFit",
    day: "Segunda-feira",
    time: "10:00",
    teacher: "Alexandre Rodrigues",
    room: "Box 01",
    capacity: 20,
    enrolled: 18,
    active: true,
  },
  {
    id: 3,
    modality: "Yoga",
    day: "Terça-feira",
    time: "07:00",
    teacher: "Mariana Souza",
    room: "Estúdio 01",
    capacity: 20,
    enrolled: 15,
    active: true,
  },
  {
    id: 4,
    modality: "Boxe",
    day: "Terça-feira",
    time: "18:00",
    teacher: "Mateus Teixeira",
    room: "Sala 03",
    capacity: 16,
    enrolled: 14,
    active: true,
  },
  {
    id: 5,
    modality: "Zumba",
    day: "Quarta-feira",
    time: "19:00",
    teacher: "Eduarda Martins",
    room: "Estúdio 01",
    capacity: 25,
    enrolled: 22,
    active: true,
  },
  {
    id: 6,
    modality: "Musculação",
    day: "Quarta-feira",
    time: "17:00",
    teacher: "Mateus Teixeira",
    room: "Sala de Pesos",
    capacity: 12,
    enrolled: 9,
    active: true,
  },
  {
    id: 7,
    modality: "HIIT",
    day: "Quinta-feira",
    time: "08:00",
    teacher: "Alexandre Rodrigues",
    room: "Box 01",
    capacity: 18,
    enrolled: 16,
    active: true,
  },
  {
    id: 8,
    modality: "Treino Funcional",
    day: "Quinta-feira",
    time: "18:00",
    teacher: "Eduarda Martins",
    room: "Quadra",
    capacity: 24,
    enrolled: 19,
    active: true,
  },
  {
    id: 9,
    modality: "Meditação",
    day: "Sexta-feira",
    time: "07:00",
    teacher: "Mariana Souza",
    room: "Estúdio 02",
    capacity: 15,
    enrolled: 10,
    active: true,
  },
  {
    id: 10,
    modality: "Dança Fitness",
    day: "Sábado",
    time: "10:00",
    teacher: "Eduarda Martins",
    room: "Estúdio 01",
    capacity: 25,
    enrolled: 20,
    active: true,
  },
]

type ClassDraft = Omit<GymClass, "id" | "enrolled" | "active">

function ClassesPanel() {
  const [modalities, setModalities] = useState(initialModalities)
  const [classes, setClasses] = useState(initialClasses)
  const [tab, setTab] = useState<"classes" | "modalities">("classes")
  const [modal, setModal] = useState<"modality" | "class" | null>(null)
  const [editingClassId, setEditingClassId] = useState<number | null>(null)
  const [modalityDraft, setModalityDraft] = useState({
    name: "",
    description: "",
  })
  const [classDraft, setClassDraft] = useState<ClassDraft>({
    modality: initialModalities[0].name,
    day: "Segunda-feira",
    time: "08:00",
    teacher: teachers[0].name,
    room: "Sala 01",
    capacity: 20,
  })

  const fieldClass =
    "font-inter-regular h-11 w-full rounded-lg border border-[#d1d5db] bg-white px-3 text-sm text-[#111827] outline-none transition focus:border-[#8338ec] focus:ring-2 focus:ring-[#8338ec]/10"

  const openClassForm = (gymClass?: GymClass) => {
    if (gymClass) {
      setEditingClassId(gymClass.id)
      setClassDraft({
        modality: gymClass.modality,
        day: gymClass.day,
        time: gymClass.time,
        teacher: gymClass.teacher,
        room: gymClass.room,
        capacity: gymClass.capacity,
      })
    } else {
      setEditingClassId(null)
      setClassDraft({
        modality: modalities[0]?.name ?? "",
        day: "Segunda-feira",
        time: "08:00",
        teacher: teachers[0].name,
        room: "Sala 01",
        capacity: 20,
      })
    }
    setModal("class")
  }

  const saveModality = () => {
    if (!modalityDraft.name.trim() || !modalityDraft.description.trim()) return
    setModalities((current) => [
      ...current,
      {
        id: Date.now(),
        name: modalityDraft.name.trim(),
        description: modalityDraft.description.trim(),
      },
    ])
    setModalityDraft({ name: "", description: "" })
    setModal(null)
    setTab("modalities")
  }

  const saveClass = () => {
    if (editingClassId) {
      setClasses((current) =>
        current.map((gymClass) =>
          gymClass.id === editingClassId
            ? { ...gymClass, ...classDraft }
            : gymClass,
        ),
      )
    } else {
      setClasses((current) => [
        ...current,
        {
          ...classDraft,
          id: Date.now(),
          enrolled: 0,
          active: true,
        },
      ])
    }
    setModal(null)
    setEditingClassId(null)
    setTab("classes")
  }

  const activeClasses = classes.filter((gymClass) => gymClass.active)
  const totalCapacity = activeClasses.reduce(
    (sum, gymClass) => sum + gymClass.capacity,
    0,
  )
  const totalEnrolled = activeClasses.reduce(
    (sum, gymClass) => sum + gymClass.enrolled,
    0,
  )

  return (
    <>
      {modal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/40 p-4 backdrop-blur-sm">
          <div className="mx-auto mt-8 w-full max-w-[560px] rounded-2xl bg-white p-5 shadow-2xl sm:p-7">
            <div className="flex items-center justify-between gap-4">
              <h2 className="font-inter-bold text-xl text-[#111827]">
                {modal === "modality"
                  ? "Nova Modalidade"
                  : editingClassId
                    ? "Editar Turma"
                    : "Nova Turma"}
              </h2>
              <button
                aria-label="Fechar formulário"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-[#6b7280] hover:bg-[#f3e8ff] hover:text-[#8338ec]"
                onClick={() => setModal(null)}
              >
                <UiIcon name="close" size={20} />
              </button>
            </div>

            {modal === "modality" ? (
              <form
                className="mt-6 flex flex-col gap-5"
                onSubmit={(event) => {
                  event.preventDefault()
                  saveModality()
                }}
              >
                <label className="flex flex-col gap-1.5">
                  <span className="font-inter-semibold text-sm">Nome</span>
                  <input
                    className={fieldClass}
                    onChange={(event) =>
                      setModalityDraft((current) => ({
                        ...current,
                        name: event.target.value,
                      }))
                    }
                    placeholder="Ex.: Natação"
                    required
                    value={modalityDraft.name}
                  />
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="font-inter-semibold text-sm">Descrição</span>
                  <textarea
                    className="font-inter-regular min-h-36 resize-y rounded-lg border border-[#d1d5db] p-3 text-sm outline-none focus:border-[#8338ec] focus:ring-2 focus:ring-[#8338ec]/10"
                    onChange={(event) =>
                      setModalityDraft((current) => ({
                        ...current,
                        description: event.target.value,
                      }))
                    }
                    placeholder="Descreva os objetivos e características da modalidade"
                    required
                    value={modalityDraft.description}
                  />
                </label>
                <div className="flex justify-end gap-3">
                  <button
                    className="font-inter-medium rounded-lg border border-[#d1d5db] px-5 py-2.5 text-sm text-[#374151]"
                    onClick={() => setModal(null)}
                    type="button"
                  >
                    Cancelar
                  </button>
                  <button
                    className="font-inter-semibold rounded-lg bg-gradient-to-r from-[#8338ec] to-[#e843a6] px-5 py-2.5 text-sm text-white"
                    type="submit"
                  >
                    Salvar modalidade
                  </button>
                </div>
              </form>
            ) : (
              <form
                className="mt-6 grid gap-4 sm:grid-cols-2"
                onSubmit={(event) => {
                  event.preventDefault()
                  saveClass()
                }}
              >
                <label className="flex flex-col gap-1.5 sm:col-span-2">
                  <span className="font-inter-semibold text-sm">
                    Modalidade
                  </span>
                  <select
                    className={fieldClass}
                    onChange={(event) =>
                      setClassDraft((current) => ({
                        ...current,
                        modality: event.target.value,
                      }))
                    }
                    value={classDraft.modality}
                  >
                    {modalities.map((modality) => (
                      <option key={modality.id} value={modality.name}>
                        {modality.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="font-inter-semibold text-sm">
                    Dia da semana
                  </span>
                  <select
                    className={fieldClass}
                    onChange={(event) =>
                      setClassDraft((current) => ({
                        ...current,
                        day: event.target.value,
                      }))
                    }
                    value={classDraft.day}
                  >
                    {[
                      "Segunda-feira",
                      "Terça-feira",
                      "Quarta-feira",
                      "Quinta-feira",
                      "Sexta-feira",
                      "Sábado",
                    ].map((day) => (
                      <option key={day}>{day}</option>
                    ))}
                  </select>
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="font-inter-semibold text-sm">Horário</span>
                  <input
                    className={fieldClass}
                    onChange={(event) =>
                      setClassDraft((current) => ({
                        ...current,
                        time: event.target.value,
                      }))
                    }
                    required
                    type="time"
                    value={classDraft.time}
                  />
                </label>
                <label className="flex flex-col gap-1.5 sm:col-span-2">
                  <span className="font-inter-semibold text-sm">Professor</span>
                  <select
                    className={fieldClass}
                    onChange={(event) =>
                      setClassDraft((current) => ({
                        ...current,
                        teacher: event.target.value,
                      }))
                    }
                    value={classDraft.teacher}
                  >
                    {teachers.map((teacher) => (
                      <option key={teacher.name}>{teacher.name}</option>
                    ))}
                  </select>
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="font-inter-semibold text-sm">Sala</span>
                  <input
                    className={fieldClass}
                    onChange={(event) =>
                      setClassDraft((current) => ({
                        ...current,
                        room: event.target.value,
                      }))
                    }
                    required
                    value={classDraft.room}
                  />
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="font-inter-semibold text-sm">
                    Capacidade máxima
                  </span>
                  <input
                    className={fieldClass}
                    min="1"
                    onChange={(event) =>
                      setClassDraft((current) => ({
                        ...current,
                        capacity: Number(event.target.value),
                      }))
                    }
                    required
                    type="number"
                    value={classDraft.capacity}
                  />
                </label>
                <div className="flex justify-end gap-3 sm:col-span-2">
                  <button
                    className="font-inter-medium rounded-lg border border-[#d1d5db] px-5 py-2.5 text-sm text-[#374151]"
                    onClick={() => setModal(null)}
                    type="button"
                  >
                    Cancelar
                  </button>
                  <button
                    className="font-inter-semibold rounded-lg bg-gradient-to-r from-[#8338ec] to-[#e843a6] px-5 py-2.5 text-sm text-white"
                    type="submit"
                  >
                    {editingClassId ? "Salvar alterações" : "Salvar turma"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      <main className="flex flex-col gap-5 p-4 sm:p-5 xl:p-6">
        <section className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-inter-bold text-2xl sm:text-[26px]">
              Aulas e Modalidades
            </h1>
            <p className="font-inter-regular mt-1 text-sm text-[#6b7280]">
              Gerencie horários, professores, salas e capacidade de cada turma.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              className="font-inter-semibold flex items-center gap-2 rounded-lg border border-[#c4b5fd] bg-white px-4 py-2.5 text-sm text-[#6f2cf4] transition hover:bg-[#f3e8ff]"
              onClick={() => setModal("modality")}
            >
              <UiIcon name="plus" />
              Nova modalidade
            </button>
            <button
              className="font-inter-semibold flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#8338ec] to-[#e843a6] px-4 py-2.5 text-sm text-white transition hover:opacity-90"
              onClick={() => openClassForm()}
            >
              <UiIcon name="plus" />
              Nova turma
            </button>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            ["Modalidades", String(modalities.length), "Opções disponíveis"],
            ["Turmas ativas", String(activeClasses.length), "Na grade semanal"],
            [
              "Alunos matriculados",
              String(totalEnrolled),
              "Em todas as turmas",
            ],
            [
              "Vagas disponíveis",
              String(totalCapacity - totalEnrolled),
              `${totalCapacity} vagas no total`,
            ],
          ].map(([label, value, detail]) => (
            <article
              className="flex min-h-[120px] flex-col justify-between rounded-2xl border border-[#e5e7eb] bg-white p-5"
              key={label}
            >
              <h2 className="font-inter-semibold text-sm text-[#374151]">
                {label}
              </h2>
              <div>
                <p className="font-inter-regular text-[28px] text-[#111827]">
                  {value}
                </p>
                <p className="font-inter-regular text-xs text-[#6b7280]">
                  {detail}
                </p>
              </div>
            </article>
          ))}
        </section>

        <div className="flex w-fit rounded-xl bg-[#e5e7eb] p-1">
          <button
            className={`font-inter-semibold rounded-lg px-4 py-2 text-sm ${
              tab === "classes" ? "bg-white shadow-sm" : "text-[#6b7280]"
            }`}
            onClick={() => setTab("classes")}
          >
            Turmas
          </button>
          <button
            className={`font-inter-semibold rounded-lg px-4 py-2 text-sm ${
              tab === "modalities" ? "bg-white shadow-sm" : "text-[#6b7280]"
            }`}
            onClick={() => setTab("modalities")}
          >
            Modalidades
          </button>
        </div>

        {tab === "classes" ? (
          <section className="overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white">
            <div className="flex items-center justify-between px-5 py-4">
              <h2 className="font-inter-semibold text-lg">Todas as Turmas</h2>
              <span className="font-inter-medium rounded-full bg-[#f3f4f6] px-3 py-1 text-xs text-[#6b7280]">
                {classes.length} turmas
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] border-collapse text-left">
                <thead className="bg-[#f9fafb]">
                  <tr className="border-y border-[#e5e7eb]">
                    {[
                      "Modalidade",
                      "Dia",
                      "Horário",
                      "Professor",
                      "Sala",
                      "Vagas",
                      "Ações",
                    ].map((heading) => (
                      <th
                        className="font-inter-semibold px-5 py-3 text-xs tracking-wide text-[#6b7280] uppercase"
                        key={heading}
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {classes.map((gymClass) => (
                    <tr
                      className={`border-b border-[#e5e7eb] last:border-0 ${
                        gymClass.active ? "" : "bg-slate-50 opacity-60"
                      }`}
                      key={gymClass.id}
                    >
                      <td className="font-inter-semibold px-5 py-4 text-sm">
                        {gymClass.modality}
                      </td>
                      <td className="font-inter-regular px-5 py-4 text-sm">
                        {gymClass.day}
                      </td>
                      <td className="font-inter-regular px-5 py-4 text-sm">
                        {gymClass.time}
                      </td>
                      <td className="font-inter-regular px-5 py-4 text-sm">
                        {gymClass.teacher}
                      </td>
                      <td className="font-inter-regular px-5 py-4 text-sm">
                        {gymClass.room}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`font-inter-medium rounded-lg px-2.5 py-1 text-xs ${
                            gymClass.enrolled >= gymClass.capacity
                              ? "bg-rose-100 text-rose-700"
                              : "bg-emerald-100 text-emerald-700"
                          }`}
                        >
                          {gymClass.enrolled} / {gymClass.capacity}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex gap-2">
                          <button
                            className="font-inter-semibold rounded-lg bg-[#f3e8ff] px-3 py-1.5 text-xs text-[#6f2cf4]"
                            onClick={() => openClassForm(gymClass)}
                          >
                            Editar
                          </button>
                          <button
                            className={`font-inter-semibold rounded-lg px-3 py-1.5 text-xs ${
                              gymClass.active
                                ? "bg-rose-100 text-rose-700"
                                : "bg-emerald-100 text-emerald-700"
                            }`}
                            onClick={() =>
                              setClasses((current) =>
                                current.map((item) =>
                                  item.id === gymClass.id
                                    ? { ...item, active: !item.active }
                                    : item,
                                ),
                              )
                            }
                          >
                            {gymClass.active ? "Desativar" : "Ativar"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ) : (
          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {modalities.map((modality) => {
              const modalityClasses = classes.filter(
                (gymClass) =>
                  gymClass.modality === modality.name && gymClass.active,
              ).length
              return (
                <article
                  className="rounded-2xl border border-[#e5e7eb] bg-white p-5"
                  key={modality.id}
                >
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="font-inter-semibold text-lg">
                      {modality.name}
                    </h2>
                    <span className="font-inter-medium rounded-full bg-[#f3e8ff] px-2.5 py-1 text-xs text-[#6f2cf4]">
                      {modalityClasses}{" "}
                      {modalityClasses === 1 ? "turma" : "turmas"}
                    </span>
                  </div>
                  <p className="font-inter-regular mt-3 text-sm leading-6 text-[#6b7280]">
                    {modality.description}
                  </p>
                </article>
              )
            })}
          </section>
        )}
      </main>
    </>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [menuCollapsed, setMenuCollapsed] = useState(false)
  const [active, setActive] = useState("Dashboard")
  const [refreshing, setRefreshing] = useState(false)

  const refresh = () => {
    setRefreshing(true)
    window.setTimeout(() => setRefreshing(false), 700)
  }

  return (
    <div className="min-h-dvh bg-[#fdf9fd] text-[#111827]">
      <div className="mx-auto flex min-h-dvh max-w-[1600px]">
        <Sidebar
          active={active}
          onClose={() => setMenuOpen(false)}
          onNavigate={setActive}
          open={menuOpen}
          collapsed={menuCollapsed}
          onToggleCollapsed={() => setMenuCollapsed((value) => !value)}
        />

        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-20 flex h-16 items-center justify-between bg-white px-4 shadow-[0_1px_2px_rgba(0,0,0,0.04)] sm:px-6">
            <div className="flex items-center gap-3">
              <button
                aria-label="Abrir menu"
                className="flex h-10 w-10 items-center justify-center rounded-xl text-[#8338ec] hover:bg-[#f3e8ff] lg:hidden"
                onClick={() => setMenuOpen(true)}
              >
                <span className="flex w-5 flex-col gap-1">
                  <span className="h-0.5 rounded bg-current" />
                  <span className="h-0.5 rounded bg-current" />
                  <span className="h-0.5 rounded bg-current" />
                </span>
              </button>
              <p className="font-inter-medium hidden text-sm text-[#6b7280] sm:block">
                Terça-feira, 13 de Outubro de 2026
              </p>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1f2937]">
                <Icon src={icons.user} />
              </div>
              <div className="hidden sm:block">
                <p className="font-inter-semibold text-sm">Yasmin (Recepção)</p>
                <p className="font-inter-regular mt-0.5 text-xs text-[#6b7280]">
                  Recepção
                </p>
              </div>
            </div>
          </header>

          {active === "Estudantes" ? (
            <StudentsPanel />
          ) : active === "Professores" ? (
            <TeachersPanel />
          ) : active === "Aulas/Modalidades" ? (
            <ClassesPanel />
          ) : (
            <main className="flex flex-col gap-5 p-4 sm:p-5 xl:p-6">
              <section className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h1 className="font-inter-bold text-2xl sm:text-[26px]">
                    Visão Geral do Painel
                  </h1>
                  <p className="font-inter-regular mt-1 text-sm text-[#6b7280]">
                    Confira o que está acontecendo na academia hoje.
                  </p>
                </div>
                <button
                  className="font-inter-medium flex items-center gap-2 rounded-lg bg-[#8338ec] px-4 py-2.5 text-sm text-white transition hover:bg-[#6f2cf4] focus:outline-none focus:ring-2 focus:ring-[#8338ec]/30"
                  onClick={refresh}
                >
                  <span className={refreshing ? "animate-spin" : ""}>
                    <Icon src={icons.refresh} size={16} />
                  </span>
                  {refreshing ? "Atualizando..." : "Atualizar"}
                </button>
              </section>

              <div className="font-inter-regular flex items-start gap-3 rounded-xl border border-[#e5e7eb] bg-[#f3e8ff] p-4 text-sm text-[#6b7280]">
                <Icon src={icons.alert} />
                <p>
                  Atualmente usando dados de teste. O sistema tentará se
                  conectar aos dados reais.{" "}
                  <button className="text-[#6f2cf4] underline underline-offset-2">
                    Conectar agora
                  </button>
                </p>
              </div>

              <section className="grid gap-4 sm:grid-cols-2">
                <MetricCard
                  accent="#10b981"
                  detail="+5% em relação ao mês anterior"
                  detailIcon={icons.trending}
                  icon={icons.metricUsers}
                  label="Total de Estudantes"
                  value="80"
                />
                <MetricCard
                  accent="#6f2cf4"
                  detail="+3 novas esta semana"
                  detailIcon={icons.plus}
                  icon={icons.metricActivity}
                  label="Aulas Ativas"
                  value="36"
                />
              </section>

              <section className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_300px]">
                <article className="card flex min-h-[430px] flex-col gap-5 sm:min-h-[480px]">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h2 className="font-inter-semibold text-lg">
                      Estudantes em atividade
                    </h2>
                    <span className="font-inter-semibold rounded-md bg-[#f3e8ff] px-2.5 py-1 text-xs text-[#8338ec]">
                      29 em atividade
                    </span>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between text-[13px]">
                      <span className="font-inter-regular text-[#6b7280]">
                        36% do total
                      </span>
                      <span className="font-inter-semibold">29/80</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded bg-[#f3f4f6]">
                      <div className="h-full w-[36%] rounded bg-[#1f2937]" />
                    </div>
                  </div>
                  <div className="flex min-h-0 flex-1 flex-col gap-4">
                    <h3 className="font-inter-semibold text-base">
                      Cadastros de Estudantes (Jan–Jun)
                    </h3>
                    <div className="flex min-h-[270px] flex-1 items-end gap-2 sm:gap-4">
                      {bars.map(([month, height]) => (
                        <div
                          className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-3"
                          key={month}
                        >
                          <div
                            className="w-[60%] max-w-12 rounded-t bg-gradient-to-r from-[#8338ec] to-[#e843a6] transition-all duration-500"
                            style={{ height: Math.round(height * 0.78) }}
                          />
                          <span className="font-inter-regular text-[11px] text-[#9ca3af]">
                            {month}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </article>

                <article className="card flex min-h-[430px] flex-col gap-5 sm:min-h-[480px]">
                  <h2 className="font-inter-semibold text-lg">
                    Distribuição de Planos
                  </h2>
                  <div className="flex flex-1 flex-col items-center justify-center gap-8">
                    <DonutChart />
                    <div className="flex w-full flex-col gap-3">
                      {[
                        ["#6f2cf4", "Básico (120)"],
                        ["#e843a6", "Premium (80)"],
                        ["#1e3a8a", "VIP (45)"],
                      ].map(([color, label]) => (
                        <div
                          className="font-inter-regular flex items-center gap-3 text-[13px] text-[#374151]"
                          key={label}
                        >
                          <span
                            className="h-3 w-3 rounded-[3px]"
                            style={{ background: color }}
                          />
                          {label}
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              </section>

              <section className="grid gap-5 xl:grid-cols-2">
                <PopularClasses />
                <article className="card min-h-[400px]">
                  <div>
                    <h2 className="font-inter-semibold text-lg">
                      Agenda do Dia
                    </h2>
                    <p className="font-inter-regular mt-1 text-[13px] text-[#6b7280]">
                      Próximas aulas e sessões
                    </p>
                  </div>
                  <div className="mt-5 flex flex-col gap-4">
                    {schedule.map(([name, time, occupancy]) => (
                      <button
                        className="flex min-h-[60px] items-center justify-between rounded-[10px] bg-[#f9fafb] px-3 py-2 text-left transition hover:bg-[#f3e8ff]/60"
                        key={name}
                      >
                        <span>
                          <span className="font-inter-semibold block text-sm text-[#1f2937]">
                            {name}
                          </span>
                          <span className="font-inter-regular mt-1 block text-xs text-[#6b7280]">
                            {time}
                          </span>
                        </span>
                        <span className="font-inter-regular rounded-md bg-[#f3e8ff] px-2 py-1 text-xs text-[#6f2cf4]">
                          {occupancy}
                        </span>
                      </button>
                    ))}
                  </div>
                </article>
              </section>
            </main>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
