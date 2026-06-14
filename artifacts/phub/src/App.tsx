import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Shield, Package, BookOpen, ExternalLink, Activity } from "lucide-react";

const queryClient = new QueryClient();

const tools = [
  {
    id: "safety-net",
    title: "Safety Net Claim Assistant",
    description:
      "Streamline Safety Net concession claims and entitlement checks. Verify patient eligibility, track contribution thresholds, and generate accurate claim documentation for PBS Safety Net items.",
    icon: Shield,
    iconColor: "text-sky-600",
    iconBg: "bg-sky-50",
    accentBar: "bg-sky-500",
    url: "https://safetynetclaimappv-08-zip.replit.app/",
    tag: "Claims & Entitlements",
  },
  {
    id: "webster-pack",
    title: "Webster Pack Manager",
    description:
      "Manage blister pack schedules and medication administration records. Track patient profiles, packing cycles, medication changes, and special order requirements in one organised workflow.",
    icon: Package,
    iconColor: "text-teal-600",
    iconBg: "bg-teal-50",
    accentBar: "bg-teal-500",
    url: "https://webster-pack-pro-v-235-special-orders-testedzip.replit.app/",
    tag: "Dose Administration",
  },
  {
    id: "direction-assistant",
    title: "Direction Assistant",
    description:
      "Generate clear, compliant dispensing directions and patient counselling notes. Supports standard and complex dosing regimens, ensuring labels meet regulatory requirements and patient safety standards.",
    icon: BookOpen,
    iconColor: "text-indigo-600",
    iconBg: "bg-indigo-50",
    accentBar: "bg-indigo-500",
    url: "https://547408d4-3b88-4ba6-a67b-7b91f3ee12a9-00-1qsjpwozxhw3k.kirk.replit.dev/",
    tag: "Dispensing & Labels",
  },
];

function ToolCard({ tool }: { tool: (typeof tools)[number] }) {
  const Icon = tool.icon;
  return (
    <div className="group relative bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 shadow-sm">
      <div className={`h-1 w-full ${tool.accentBar}`} />
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-start gap-4 mb-4">
          <div
            className={`flex-shrink-0 w-11 h-11 rounded-lg ${tool.iconBg} flex items-center justify-center`}
          >
            <Icon className={`w-5 h-5 ${tool.iconColor}`} strokeWidth={1.8} />
          </div>
          <div className="flex-1 min-w-0">
            <span className="inline-block text-xs font-medium tracking-wide uppercase text-slate-400 mb-1">
              {tool.tag}
            </span>
            <h2 className="text-base font-semibold text-slate-800 leading-snug">
              {tool.title}
            </h2>
          </div>
        </div>
        <p className="text-sm text-slate-500 leading-relaxed flex-1 mb-6">
          {tool.description}
        </p>
        <a
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg bg-sky-600 text-white text-sm font-medium transition-all duration-150 hover:bg-sky-700 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
        >
          Open Tool
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-slate-50">
        <header className="border-b border-slate-200 bg-white shadow-sm">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-sky-600">
              <Activity className="w-5 h-5 text-white" strokeWidth={2} />
            </div>
            <div>
              <h1 className="text-base font-semibold text-slate-800 leading-tight">
                Pharmacy Workflow Hub
              </h1>
              <p className="text-xs text-slate-400">Clinical tool portal</p>
            </div>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-800 mb-1.5">Workflow Tools</h2>
            <p className="text-sm text-slate-500">
              Select a tool below to open it in a new tab. Each tool runs independently.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {tools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>

          <div className="mt-10 pt-8 border-t border-slate-200 flex items-center gap-2 text-xs text-slate-400">
            <div className="w-1.5 h-1.5 rounded-full bg-teal-500" />
            <span>All tools open in a new tab and run on their own independent servers.</span>
          </div>
        </main>
      </div>
    </QueryClientProvider>
  );
}

export default App;
