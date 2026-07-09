import { useState } from "react";
import {
  ArrowUpRight,
  Bell,
  Boxes,
  CheckCircle2,
  ClipboardList,
  ChevronsLeft,
  ChevronsRight,
  Clock3,
  Database,
  FileClock,
  FileSpreadsheet,
  Home,
  LayoutGrid,
  Menu,
  Pill,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  UserCircle,
  UserRound,
  WalletCards,
} from "lucide-react";

const pharmacyImage =
  "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=1800&q=90";

const modules = [
  {
    title: "Owing Script Management",
    description: "Review owing scripts, payment follow-ups, notes, and monthly exceptions.",
    image:
      "https://images.unsplash.com/photo-1576602975754-efdf313b9342?auto=format&fit=crop&w=900&q=86",
    icon: WalletCards,
    metric: "42 scripts",
    queue: "8 need follow-up",
    stage: "Review",
    workflow: ["Import owing list", "Confirm payment notes", "Export follow-up report"],
  },
  {
    title: "Hibiscus DAA Program",
    description: "Manage DAA patients, packing status, import history, and operational checks.",
    image:
      "https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&w=900&q=86",
    icon: Pill,
    metric: "186 patients",
    queue: "14 packing checks",
    stage: "Active",
    workflow: ["Upload monthly patient list", "Check packing status", "Archive version history"],
  },
  {
    title: "RDH Discharge Report",
    description: "Prepare clean discharge reports and keep historical exports easy to recover.",
    image:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=900&q=86",
    icon: FileSpreadsheet,
    metric: "12 reports",
    queue: "3 drafts ready",
    stage: "Draft",
    workflow: ["Select discharge period", "Review patient rows", "Generate Excel/PDF pack"],
  },
  {
    title: "SafetyNet Management",
    description: "Monitor SafetyNet thresholds with calm review queues and clear status signals.",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=86",
    icon: ShieldCheck,
    metric: "31 alerts",
    queue: "6 close to threshold",
    stage: "Monitor",
    workflow: ["Import SafetyNet file", "Flag near-threshold patients", "Prepare review list"],
  },
  {
    title: "Direction Assistant",
    description: "Create consistent patient directions and reusable instruction templates.",
    image:
      "https://images.unsplash.com/photo-1511174511562-5f7f18b874f8?auto=format&fit=crop&w=900&q=86",
    icon: ClipboardList,
    metric: "64 templates",
    queue: "9 recently used",
    stage: "Compose",
    workflow: ["Choose patient context", "Select direction template", "Copy final instruction"],
  },
  {
    title: "Stationary Stocktaking",
    description: "Run stock counts, check variances, and archive supply history beautifully.",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=86",
    icon: Boxes,
    metric: "118 items",
    queue: "11 variances",
    stage: "Count",
    workflow: ["Start stocktake run", "Review variance list", "Lock monthly archive"],
  },
];

const navigation = [
  { label: "Dashboard", icon: Home, active: true },
  { label: "Workspaces", icon: LayoutGrid },
  { label: "Reports", icon: FileSpreadsheet },
  { label: "Settings", icon: Settings },
];

function ModuleCard({ module }: { module: (typeof modules)[number] }) {
  const Icon = module.icon;

  return (
    <article className="group overflow-hidden rounded-[28px] border border-white/70 bg-white/68 shadow-[0_24px_80px_-56px_rgba(64,54,42,.55)] backdrop-blur-2xl transition duration-300 hover:-translate-y-1 hover:bg-white/82 hover:shadow-[0_34px_100px_-58px_rgba(64,54,42,.7)]">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={module.image}
          alt=""
          className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/38 via-stone-950/5 to-white/8" />
        <div className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/45 bg-white/72 text-emerald-800 shadow-lg backdrop-blur-xl">
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-[17px] font-semibold tracking-normal text-stone-950">{module.title}</h3>
        <p className="mt-2 min-h-12 text-sm leading-6 text-stone-600">{module.description}</p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="rounded-2xl border border-white/70 bg-white/58 px-3 py-2">
            <p className="text-[11px] font-medium text-stone-400">Current</p>
            <p className="mt-1 text-sm font-semibold text-stone-800">{module.metric}</p>
          </div>
          <div className="rounded-2xl border border-white/70 bg-white/58 px-3 py-2">
            <p className="text-[11px] font-medium text-stone-400">Queue</p>
            <p className="mt-1 text-sm font-semibold text-stone-800">{module.queue}</p>
          </div>
        </div>
        <button className="mt-5 inline-flex h-11 items-center gap-2 rounded-full bg-[#dfe8df] px-4 text-sm font-semibold text-[#26372e] transition hover:bg-[#d4e1d4]">
          Open Workspace
          <ArrowUpRight className="h-4 w-4" />
        </button>
      </div>
    </article>
  );
}

function WorkspacePreview({ module, index }: { module: (typeof modules)[number]; index: number }) {
  const Icon = module.icon;

  return (
    <article className="rounded-[28px] border border-white/70 bg-white/58 p-5 shadow-[0_24px_80px_-58px_rgba(64,54,42,.42)] backdrop-blur-2xl">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-[#e4ece3] text-[#405b48]">
            <Icon className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-stone-950">{module.title}</p>
            <p className="mt-1 text-xs text-stone-500">{module.stage} workspace</p>
          </div>
        </div>
        <span className="rounded-full border border-white/70 bg-white/60 px-3 py-1 text-xs font-semibold text-[#6a7f68]">
          0{index + 1}
        </span>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-stone-950 px-4 py-3 text-white">
          <p className="text-[11px] text-white/52">Primary metric</p>
          <p className="mt-2 text-lg font-semibold">{module.metric}</p>
        </div>
        <div className="rounded-2xl border border-[#dfe8d9] bg-[#eef4ea]/72 px-4 py-3">
          <p className="text-[11px] text-stone-500">Attention</p>
          <p className="mt-2 text-lg font-semibold text-stone-900">{module.queue}</p>
        </div>
      </div>

      <div className="mt-5 space-y-2">
        {module.workflow.map((step, stepIndex) => (
          <div key={step} className="flex items-center gap-3 rounded-2xl border border-white/62 bg-white/48 px-3 py-2">
            <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-white text-xs font-semibold text-[#405b48]">
              {stepIndex + 1}
            </div>
            <p className="text-sm text-stone-600">{step}</p>
          </div>
        ))}
      </div>
    </article>
  );
}

function OperationsStrip() {
  const items = [
    { label: "Data saved", value: "Server-ready", icon: Database },
    { label: "Monthly history", value: "Versioned", icon: FileClock },
    { label: "Patient workflows", value: "6 areas", icon: Stethoscope },
    { label: "Review rhythm", value: "Daily", icon: Clock3 },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <div key={item.label} className="rounded-[24px] border border-white/70 bg-white/56 p-4 shadow-[0_20px_70px_-58px_rgba(64,54,42,.48)] backdrop-blur-2xl">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-medium text-stone-500">{item.label}</p>
                <p className="mt-1 text-lg font-semibold text-stone-950">{item.value}</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#e4ece3] text-[#405b48]">
                <Icon className="h-5 w-5" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function MyPharmacyHubPortal() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <main className="min-h-screen overflow-hidden bg-[#f6f2ea] font-sans text-stone-950">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_16%_10%,rgba(172,193,172,.32),transparent_30rem),radial-gradient(circle_at_88%_8%,rgba(230,204,151,.30),transparent_28rem),linear-gradient(180deg,rgba(255,255,255,.72),rgba(246,242,234,.82))]" />

      <div className="relative flex min-h-screen flex-col gap-5 p-4 lg:flex-row lg:p-6">
        <aside
          className={[
            "flex w-full flex-shrink-0 flex-col rounded-[32px] border border-white/72 bg-white/50 p-3 shadow-[0_28px_90px_-60px_rgba(64,54,42,.55)] backdrop-blur-2xl transition-all duration-300 lg:h-[calc(100vh-3rem)]",
            isCollapsed ? "lg:w-[104px]" : "lg:w-[292px]",
          ].join(" ")}
        >
          <div className="flex items-center justify-between px-3 py-3">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#e4ece3] text-[#405b48]">
                <Sparkles className="h-5 w-5" />
              </div>
              <div className={isCollapsed ? "hidden" : "block"}>
                <p className="text-lg font-semibold tracking-normal">MyPharmacyHub</p>
                <p className="text-xs text-stone-500">Premium healthcare portal</p>
              </div>
            </div>
            <button className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/64 text-stone-500 lg:hidden">
              <Menu className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => setIsCollapsed((value) => !value)}
              className="hidden h-10 w-10 items-center justify-center rounded-2xl bg-white/64 text-stone-500 transition hover:bg-white/82 hover:text-stone-900 lg:flex"
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {isCollapsed ? <ChevronsRight className="h-4 w-4" /> : <ChevronsLeft className="h-4 w-4" />}
            </button>
          </div>

          <nav className="mt-4 hidden gap-2 overflow-x-auto px-1 pb-1 lg:flex lg:flex-col lg:overflow-visible">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  className={[
                    "group relative flex min-w-max items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition",
                    item.active
                      ? "bg-stone-950 text-white shadow-[0_20px_50px_-28px_rgba(28,25,23,.8)]"
                      : "text-stone-500 hover:bg-white/64 hover:text-stone-900",
                    isCollapsed ? "lg:min-w-0 lg:justify-center lg:px-0" : "",
                  ].join(" ")}
                >
                  <Icon className="h-4 w-4" />
                  <span className={isCollapsed ? "lg:hidden" : ""}>{item.label}</span>
                  {isCollapsed ? (
                    <span className="pointer-events-none absolute left-[calc(100%+10px)] top-1/2 z-30 hidden -translate-y-1/2 rounded-xl border border-white/70 bg-white/90 px-3 py-2 text-xs font-semibold text-stone-700 opacity-0 shadow-xl backdrop-blur-xl transition group-hover:opacity-100 lg:block">
                      {item.label}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </nav>

          <div className={["mt-auto hidden rounded-[26px] border border-white/70 bg-white/48 p-4 lg:block", isCollapsed ? "lg:p-3" : ""].join(" ")}>
            <p className="text-xs font-medium text-stone-500">Today’s focus</p>
            <p className={["mt-2 text-sm leading-6 text-stone-700", isCollapsed ? "lg:hidden" : ""].join(" ")}>
              Review monthly program reports and keep patient workspaces up to date.
            </p>
            {isCollapsed ? (
              <div className="hidden h-10 w-10 items-center justify-center rounded-2xl bg-[#e4ece3] text-[#405b48] lg:flex">
                <ShieldCheck className="h-5 w-5" />
              </div>
            ) : null}
          </div>
        </aside>

        <section className="min-w-0 flex-1 overflow-hidden rounded-[36px] border border-white/72 bg-white/42 shadow-[0_30px_100px_-70px_rgba(64,54,42,.65)] backdrop-blur-2xl">
          <header className="sticky top-0 z-20 flex flex-col gap-4 border-b border-white/70 bg-white/42 px-5 py-4 backdrop-blur-2xl sm:flex-row sm:items-center sm:justify-between lg:px-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6a7f68]">
                Enterprise pharmacy platform
              </p>
              <h1 className="mt-1 text-2xl font-semibold tracking-normal text-stone-950">
                Dashboard
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden h-11 min-w-[320px] items-center gap-2 rounded-full border border-white/76 bg-white/62 px-4 shadow-sm transition focus-within:border-[#a9bda6] focus-within:bg-white/82 focus-within:shadow-[0_0_0_4px_rgba(169,189,166,.16)] md:flex">
                <Search className="h-4 w-4 text-stone-400" />
                <input
                  readOnly
                  value=""
                  placeholder="Search workspaces, reports, patients"
                  className="w-full bg-transparent text-sm text-stone-700 outline-none placeholder:text-stone-400"
                />
              </div>
              <button className="flex h-11 w-11 items-center justify-center rounded-full border border-white/76 bg-white/62 text-stone-500 shadow-sm">
                <Bell className="h-4 w-4" />
              </button>
              <button className="hidden h-11 items-center gap-2 rounded-full border border-white/76 bg-white/62 px-3 text-sm font-semibold text-stone-700 shadow-sm sm:flex">
                <UserCircle className="h-4 w-4 text-[#405b48]" />
                Hibiscus
              </button>
              <button className="flex h-11 w-11 items-center justify-center rounded-full bg-stone-950 text-white shadow-sm sm:hidden">
                <UserRound className="h-4 w-4" />
              </button>
            </div>
          </header>

          <div className="h-[calc(100vh-8.25rem)] overflow-y-auto px-5 py-6 lg:px-8">
            <section className="grid gap-5 lg:grid-cols-[1.08fr_.92fr]">
              <div className="relative overflow-hidden rounded-[34px] border border-white/70 bg-white/58 p-7 shadow-[0_24px_90px_-62px_rgba(64,54,42,.55)] backdrop-blur-2xl lg:p-9">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(172,193,172,.28),transparent_20rem),radial-gradient(circle_at_82%_18%,rgba(230,204,151,.28),transparent_18rem)]" />
                <div className="relative">
                  <span className="inline-flex rounded-full border border-white/70 bg-white/58 px-3 py-1 text-xs font-semibold text-[#5e715d] shadow-sm">
                    Calm operations, premium clarity
                  </span>
                  <h2 className="mt-7 max-w-3xl text-4xl font-semibold leading-[1.04] tracking-normal text-stone-950 md:text-6xl">
                    A softer way to run every pharmacy workflow.
                  </h2>
                  <p className="mt-5 max-w-xl text-base leading-7 text-stone-600">
                    Minimal workspaces for Owing, DAA, Discharge, SafetyNet, directions, and stocktaking.
                    Designed to feel calm, fast, and enterprise-ready.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <button className="h-12 rounded-full bg-[#405b48] px-6 text-sm font-semibold text-white shadow-[0_18px_50px_-28px_rgba(64,91,72,.9)] transition hover:bg-[#344b3b]">
                      Open Dashboard
                    </button>
                    <button className="h-12 rounded-full border border-white/80 bg-white/58 px-6 text-sm font-semibold text-stone-700 shadow-sm backdrop-blur-xl transition hover:bg-white/78">
                      View Reports
                    </button>
                  </div>
                </div>
              </div>

              <div className="relative min-h-[390px] overflow-hidden rounded-[34px] border border-white/70 shadow-[0_24px_90px_-62px_rgba(64,54,42,.55)]">
                <img src={pharmacyImage} alt="" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/48 via-stone-950/10 to-white/8" />
                <div className="absolute bottom-5 left-5 right-5 rounded-[26px] border border-white/28 bg-white/18 p-5 text-white shadow-2xl backdrop-blur-2xl">
                  <p className="text-xs font-medium text-white/70">Workspace status</p>
                  <div className="mt-3 flex items-end justify-between gap-4">
                    <div>
                      <p className="text-3xl font-semibold">6 modules</p>
                      <p className="mt-1 text-sm text-white/72">Ready for staged implementation</p>
                    </div>
                    <div className="rounded-full bg-white/22 px-3 py-1 text-xs font-semibold">
                      No AI Assistant
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="mt-6">
              <OperationsStrip />
            </section>

            <section className="mt-8">
              <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-[#6a7f68]">Portal modules</p>
                  <h2 className="text-2xl font-semibold tracking-normal text-stone-950">
                    Premium workspaces
                  </h2>
                </div>
                <p className="max-w-md text-sm leading-6 text-stone-500">
                  Each workspace keeps the product minimal: one image, one purpose, one clear action.
                </p>
              </div>
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {modules.map((module) => (
                  <ModuleCard key={module.title} module={module} />
                ))}
              </div>
            </section>

            <section className="mt-8">
              <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-[#6a7f68]">Workspace previews</p>
                  <h2 className="text-2xl font-semibold tracking-normal text-stone-950">
                    Every module has a clear operating rhythm
                  </h2>
                </div>
                <p className="max-w-md text-sm leading-6 text-stone-500">
                  The next implementation pass can wire these surfaces to real data without changing
                  the calm visual language.
                </p>
              </div>
              <div className="grid gap-5 xl:grid-cols-2">
                {modules.map((module, index) => (
                  <WorkspacePreview key={module.title} module={module} index={index} />
                ))}
              </div>
            </section>

            <section className="mt-8 grid gap-5 pb-28 lg:grid-cols-[.82fr_1.18fr] lg:pb-6">
              <div className="rounded-[30px] border border-white/70 bg-stone-950 p-6 text-white shadow-[0_28px_90px_-58px_rgba(28,25,23,.72)]">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/46">
                  Implementation path
                </p>
                <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-normal">
                  Designed for staged rollout, not a risky rewrite.
                </h2>
                <p className="mt-4 text-sm leading-7 text-white/62">
                  Each module can be connected one at a time while the visual shell, navigation,
                  and card system remain consistent across the portal.
                </p>
              </div>
              <div className="rounded-[30px] border border-white/70 bg-white/58 p-5 shadow-[0_24px_80px_-58px_rgba(64,54,42,.42)] backdrop-blur-2xl">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-[#6a7f68]">Recent workspace activity</p>
                    <h3 className="text-xl font-semibold tracking-normal text-stone-950">
                      Calm operational feed
                    </h3>
                  </div>
                  <span className="rounded-full bg-[#eef4ea] px-3 py-1 text-xs font-semibold text-[#405b48]">
                    Today
                  </span>
                </div>
                <div className="space-y-3">
                  {[
                    "DAA monthly patient list imported and versioned",
                    "Owing follow-up report prepared for pharmacist review",
                    "SafetyNet near-threshold queue updated",
                    "Stationary stocktaking variance list ready",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/62 bg-white/54 px-4 py-3">
                      <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-[#6a7f68]" />
                      <p className="text-sm text-stone-700">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </section>
      </div>

      <nav className="fixed bottom-4 left-4 right-4 z-40 grid grid-cols-4 gap-2 rounded-[26px] border border-white/78 bg-white/72 p-2 shadow-[0_24px_80px_-54px_rgba(64,54,42,.68)] backdrop-blur-2xl lg:hidden">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              className={[
                "flex flex-col items-center justify-center gap-1 rounded-2xl px-2 py-2 text-[11px] font-semibold transition",
                item.active ? "bg-stone-950 text-white" : "text-stone-500",
              ].join(" ")}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </main>
  );
}
