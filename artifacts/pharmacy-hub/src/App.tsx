import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const tools = [
  {
    title: "Safety Net Claim Assistant",
    description:
      "Streamline Safety Net entitlement checks, claim lodgement, and concession card validation for eligible patients.",
    icon: "shield",
    url: "https://safetynetclaimappv-08-zip.replit.app/",
  },
  {
    title: "Webster Pack Manager",
    description:
      "Manage blister-pack schedules, special orders, and dispensing records for weekly and monthly Webster packs.",
    icon: "package",
    url: "https://webster-pack-pro-v-235-special-orders-testedzip.replit.app/",
  },
  {
    title: "Direction Assistant",
    description:
      "Generate clear, plain-language dispensing directions and counselling notes tailored to each patient's medication regimen.",
    icon: "book",
    url: "https://547408d4-3b88-4ba6-a67b-7b91f3ee12a9-00-1qsjpwozxhw3k.kirk.replit.dev/",
  },
];

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="tool-icon">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function PackageIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="tool-icon">
      <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" />
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="tool-icon">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}

function ActivityIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ width: 15, height: 15 }}>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function ToolCard({ tool }: { tool: typeof tools[0] }) {
  return (
    <div className="tool-card">
      <div className="tool-card-body">
        <div className="tool-icon-wrap">
          {tool.icon === "shield" && <ShieldIcon />}
          {tool.icon === "package" && <PackageIcon />}
          {tool.icon === "book" && <BookIcon />}
        </div>
        <h2 className="tool-title">{tool.title}</h2>
        <p className="tool-desc">{tool.description}</p>
        <a
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          className="tool-btn"
        >
          Open Tool <ExternalLinkIcon />
        </a>
      </div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="hub-root">
        <header className="hub-header">
          <div className="hub-header-inner">
            <div className="hub-logo">
              <ActivityIcon />
              <span>PharmacyHub</span>
            </div>
          </div>
        </header>

        <main className="hub-main">
          <div className="hub-intro">
            <h1 className="hub-title">Pharmacy Workflow Hub</h1>
            <p className="hub-subtitle">
              Central access point for pharmacy workflow tools.
            </p>
          </div>

          <div className="tools-grid">
            {tools.map((tool) => (
              <ToolCard key={tool.title} tool={tool} />
            ))}
          </div>
        </main>

        <footer className="hub-footer">
          <p>© {new Date().getFullYear()} Pharmacy Workflow Hub &mdash; Internal Use Only</p>
        </footer>
      </div>
    </QueryClientProvider>
  );
}

export default App;
