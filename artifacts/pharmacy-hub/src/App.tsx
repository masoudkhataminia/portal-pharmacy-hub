import { useMemo, useState, type FormEvent } from "react";
import { QueryClient, QueryClientProvider, useQueryClient } from "@tanstack/react-query";
import {
  useListTools,
  useCreateTool,
  useDeleteTool,
} from "@workspace/api-client-react";
import type { Tool } from "@workspace/api-client-react";

const AUTH_KEY = "ph_auth";
const VALID_USER = "hibiscus";
const VALID_PASS = "hibiscus";

const queryClient = new QueryClient();

const DEFAULT_WORKSPACES: Tool[] = [
  {
    id: "default-owing",
    title: "Owing Script Management",
    description: "Review owing scripts, payment follow-ups, notes, and monthly exceptions.",
    icon: "wallet",
    url: "#",
  },
  {
    id: "default-daa",
    title: "Hibiscus DAA Program",
    description: "Manage DAA patients, packing status, import history, and operational checks.",
    icon: "pill",
    url: "#",
  },
  {
    id: "default-rdh",
    title: "RDH Discharge Report",
    description: "Prepare clean discharge reports and keep historical exports easy to recover.",
    icon: "spreadsheet",
    url: "#",
  },
  {
    id: "default-safetynet",
    title: "SafetyNet Management",
    description: "Monitor SafetyNet thresholds with calm review queues and clear status signals.",
    icon: "shield",
    url: "#",
  },
  {
    id: "default-direction",
    title: "Direction Assistant",
    description: "Create consistent patient directions and reusable instruction templates.",
    icon: "clipboard",
    url: "#",
  },
  {
    id: "default-stocktake",
    title: "Stationary Stocktaking",
    description: "Run stock counts, check variances, and archive supply history beautifully.",
    icon: "package",
    url: "#",
  },
];

const WORKSPACE_IMAGES = [
  "https://images.unsplash.com/photo-1576602975754-efdf313b9342?auto=format&fit=crop&w=900&q=86",
  "https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&w=900&q=86",
  "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=900&q=86",
  "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=86",
  "https://images.unsplash.com/photo-1511174511562-5f7f18b874f8?auto=format&fit=crop&w=900&q=86",
  "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=86",
];

const ICON_OPTIONS = [
  { value: "shield", label: "Shield" },
  { value: "package", label: "Package" },
  { value: "book", label: "Book" },
  { value: "grid", label: "Grid" },
  { value: "star", label: "Star" },
  { value: "bell", label: "Bell" },
  { value: "pill", label: "Pill" },
  { value: "wallet", label: "Wallet" },
  { value: "spreadsheet", label: "Spreadsheet" },
  { value: "clipboard", label: "Clipboard" },
];

function Icon({ name, className }: { name?: string; className?: string }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: className ?? "icon",
  };

  switch (name) {
    case "shield":
      return <svg {...common}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>;
    case "package":
      return <svg {...common}><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><path d="M3.27 6.96 12 12.01l8.73-5.05" /><path d="M12 22.08V12" /></svg>;
    case "book":
      return <svg {...common}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>;
    case "star":
      return <svg {...common}><path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>;
    case "bell":
      return <svg {...common}><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>;
    case "wallet":
      return <svg {...common}><path d="M20 7H5a2 2 0 0 1 0-4h12" /><path d="M3 5v14a2 2 0 0 0 2 2h15V7" /><path d="M16 14h4" /></svg>;
    case "pill":
      return <svg {...common}><path d="m10.5 20.5 10-10a5 5 0 0 0-7.07-7.07l-10 10a5 5 0 0 0 7.07 7.07z" /><path d="m8.5 8.5 7 7" /></svg>;
    case "spreadsheet":
      return <svg {...common}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /><path d="M8 13h8" /><path d="M8 17h8" /></svg>;
    case "clipboard":
      return <svg {...common}><rect x="8" y="2" width="8" height="4" rx="1" /><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><path d="M8 12h8" /><path d="M8 16h5" /></svg>;
    case "search":
      return <svg {...common}><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>;
    case "settings":
      return <svg {...common}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>;
    case "external":
      return <svg {...common}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><path d="M15 3h6v6" /><path d="M10 14 21 3" /></svg>;
    case "trash":
      return <svg {...common}><path d="M3 6h18" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" /><path d="M10 11v6" /><path d="M14 11v6" /><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" /></svg>;
    default:
      return <svg {...common}><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>;
  }
}

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(false);
    setLoading(true);
    setTimeout(() => {
      if (username.trim().toLowerCase() === VALID_USER && password === VALID_PASS) {
        localStorage.setItem(AUTH_KEY, "1");
        onLogin();
      } else {
        setError(true);
        setLoading(false);
      }
    }, 350);
  }

  return (
    <main className="login-root">
      <div className="ambient-bg" />
      <section className="login-shell">
        <div className="login-visual">
          <div className="login-topline">
            <div className="brand-chip"><Icon name="star" />MyPharmacyHub</div>
            <span>Enterprise pharmacy platform</span>
          </div>
          <div className="login-copy glass-dark">
            <p>Calm healthcare operations</p>
            <h1>A premium portal for focused pharmacy work.</h1>
            <span>Secure workspaces for daily routines, reports, patient programs and operational follow-through.</span>
          </div>
        </div>

        <div className="login-panel">
          <form className="login-card glass" onSubmit={handleSubmit}>
            <div className="mobile-brand"><Icon name="star" /><div><strong>MyPharmacyHub</strong><span>Premium healthcare portal</span></div></div>
            <span className="soft-pill">Secure staff access</span>
            <h2>Welcome back.</h2>
            <p>Sign in to continue to your pharmacy operations dashboard.</p>
            <label>Username
              <input value={username} onChange={(e) => { setUsername(e.target.value); setError(false); }} placeholder="Enter username" autoComplete="username" autoFocus />
            </label>
            <label>Password
              <input value={password} onChange={(e) => { setPassword(e.target.value); setError(false); }} placeholder="Enter password" type="password" autoComplete="current-password" />
            </label>
            {error && <p className="form-error">Incorrect username or password.</p>}
            <button className="primary-btn" disabled={loading}>{loading ? "Signing in..." : "Continue to Dashboard"}</button>
            <div className="credential-note"><strong>Temporary credentials</strong><span>Username hibiscus / Password hibiscus</span></div>
          </form>
        </div>
      </section>
    </main>
  );
}

const EMPTY_FORM = { title: "", description: "", icon: "shield", url: "" };

function AdminPanel({ onClose }: { onClose: () => void }) {
  const qc = useQueryClient();
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState<string | null>(null);
  const createTool = useCreateTool({
    mutation: {
      onSuccess: () => {
        qc.invalidateQueries({ queryKey: ["/api/tools"] });
        setForm(EMPTY_FORM);
      },
    },
  });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!form.title.trim() || !form.url.trim()) {
      setError("Title and URL are required.");
      return;
    }
    createTool.mutate({ data: form });
  }

  return (
    <section className="admin-panel glass">
      <div className="panel-heading">
        <div><span className="soft-pill">Admin</span><h2>Manage tools</h2></div>
        <button className="icon-btn" onClick={onClose} aria-label="Close admin panel">×</button>
      </div>
      <p className="muted">Add or remove workspaces without changing code.</p>
      <form className="admin-form" onSubmit={handleSubmit}>
        <div className="admin-row">
          <label>Title<input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} placeholder="e.g. Drug Interaction Checker" /></label>
          <label>Icon<select value={form.icon} onChange={(e) => setForm((f) => ({ ...f, icon: e.target.value }))}>{ICON_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}</select></label>
        </div>
        <label>URL<input value={form.url} onChange={(e) => setForm((f) => ({ ...f, url: e.target.value }))} placeholder="https://your-tool.example.com" type="url" /></label>
        <label>Description<textarea value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} placeholder="Brief description of what this tool does" /></label>
        {error && <p className="form-error">{error}</p>}
        {createTool.error && <p className="form-error">Failed to add tool. Please try again.</p>}
        <button className="primary-btn small" disabled={createTool.isPending}>{createTool.isPending ? "Adding..." : "+ Add Tool"}</button>
      </form>
    </section>
  );
}

function WorkspaceCard({ tool, index, adminMode, onDelete }: { tool: Tool; index: number; adminMode: boolean; onDelete: (id: string) => void }) {
  const image = WORKSPACE_IMAGES[index % WORKSPACE_IMAGES.length];
  const isPlaceholder = tool.url === "#";

  return (
    <article className="workspace-card glass">
      <div className="workspace-image" style={{ backgroundImage: `linear-gradient(to top, rgba(28,25,23,.42), rgba(28,25,23,.04)), url(${image})` }}>
        <div className="icon-badge"><Icon name={tool.icon} /></div>
        <span className="stage-badge">0{index + 1}</span>
      </div>
      <div className="workspace-body">
        <h3>{tool.title}</h3>
        <p>{tool.description}</p>
        <div className="metric-row">
          <div><span>Current</span><strong>{index % 2 === 0 ? "Active" : "Ready"}</strong></div>
          <div><span>Queue</span><strong>{index + 3} items</strong></div>
        </div>
        <div className="card-actions">
          <a className={`workspace-link${isPlaceholder ? " disabled" : ""}`} href={tool.url} target={isPlaceholder ? undefined : "_blank"} rel="noopener noreferrer" onClick={(e) => { if (isPlaceholder) e.preventDefault(); }}>
            Open Workspace <Icon name="external" />
          </a>
          {adminMode && !tool.id.startsWith("default-") && <button className="remove-btn" onClick={() => onDelete(tool.id)}><Icon name="trash" />Remove</button>}
        </div>
      </div>
    </article>
  );
}

function PreviewCard({ tool, index }: { tool: Tool; index: number }) {
  return (
    <article className="preview-card glass">
      <div className="preview-heading">
        <div className="icon-badge"><Icon name={tool.icon} /></div>
        <div><strong>{tool.title}</strong><span>{index % 2 === 0 ? "Review" : "Active"} workspace</span></div>
      </div>
      <div className="preview-metrics">
        <div className="dark-metric"><span>Primary metric</span><strong>{index + 12} records</strong></div>
        <div><span>Attention</span><strong>{index + 2} checks</strong></div>
      </div>
      <ol>
        <li>Open workspace</li>
        <li>Review imported data</li>
        <li>Export clean report</li>
      </ol>
    </article>
  );
}

function HubContent({ onLogout }: { onLogout: () => void }) {
  const { data: tools, isLoading, isError } = useListTools();
  const qc = useQueryClient();
  const deleteTool = useDeleteTool({ mutation: { onSuccess: () => qc.invalidateQueries({ queryKey: ["/api/tools"] }) } });
  const [adminOpen, setAdminOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const allTools = useMemo(() => {
    const liveTools = tools ?? [];
    return liveTools.length > 0 ? liveTools : DEFAULT_WORKSPACES;
  }, [tools]);

  const filtered = allTools.filter((tool) => {
    const q = query.trim().toLowerCase();
    return !q || tool.title.toLowerCase().includes(q) || tool.description.toLowerCase().includes(q);
  });

  function handleDelete(id: string) {
    if (confirm("Remove this tool from the hub?")) deleteTool.mutate({ id });
  }

  return (
    <main className="hub-root">
      <div className="ambient-bg" />
      <aside className={`sidebar glass ${sidebarCollapsed ? "collapsed" : ""}`}>
        <div className="sidebar-brand">
          <div className="brand-mark"><Icon name="star" /></div>
          <div><strong>MyPharmacyHub</strong><span>Premium healthcare portal</span></div>
        </div>
        <button className="collapse-btn" onClick={() => setSidebarCollapsed((v) => !v)}>{sidebarCollapsed ? "→" : "←"}</button>
        <nav>
          <button className="active"><Icon name="grid" />Dashboard</button>
          <button><Icon name="spreadsheet" />Reports</button>
          <button><Icon name="shield" />Programs</button>
          <button><Icon name="settings" />Settings</button>
        </nav>
        <div className="focus-card"><span>Today's focus</span><p>Review monthly program reports and keep workspaces up to date.</p></div>
      </aside>

      <section className="dashboard-shell">
        <header className="topbar glass">
          <div><span className="eyebrow">Enterprise pharmacy platform</span><h1>Dashboard</h1></div>
          <div className="top-actions">
            <div className="search-box"><Icon name="search" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search workspaces, reports, patients" /></div>
            <button className="secondary-btn" onClick={() => setAdminOpen((v) => !v)}><Icon name="settings" />Admin</button>
            <button className="secondary-btn danger" onClick={onLogout}>Sign out</button>
          </div>
        </header>

        {adminOpen && <AdminPanel onClose={() => setAdminOpen(false)} />}

        <section className="hero-grid">
          <div className="hero-card glass">
            <span className="soft-pill">Calm operations, premium clarity</span>
            <h2>A softer way to run every pharmacy workflow.</h2>
            <p>Minimal workspaces for Owing, DAA, Discharge, SafetyNet, directions, and stationary stocktaking. Designed to feel calm, fast, and enterprise-ready.</p>
            <div className="hero-actions"><button className="primary-btn">Open Dashboard</button><button className="ghost-btn">View Reports</button></div>
          </div>
          <div className="photo-card">
            <div className="photo-status glass-dark"><span>Workspace status</span><strong>{isLoading ? "Loading" : `${allTools.length} modules`}</strong><em>No AI Assistant</em></div>
          </div>
        </section>

        <section className="stat-strip">
          <div className="glass"><Icon name="shield" /><span>Data saved</span><strong>Server-ready</strong></div>
          <div className="glass"><Icon name="spreadsheet" /><span>Monthly history</span><strong>Versioned</strong></div>
          <div className="glass"><Icon name="pill" /><span>Patient workflows</span><strong>{allTools.length} areas</strong></div>
          <div className="glass"><Icon name="bell" /><span>Review rhythm</span><strong>Daily</strong></div>
        </section>

        <section className="section-heading">
          <div><span className="eyebrow">Portal modules</span><h2>Premium workspaces</h2></div>
          <p>Each workspace keeps the product minimal: one image, one purpose, one clear action.</p>
        </section>

        {isError && <div className="status-error glass">Could not load live tools. Showing default workspace layout.</div>}

        <section className="workspace-grid">
          {filtered.map((tool, index) => <WorkspaceCard key={tool.id} tool={tool} index={index} adminMode={adminOpen} onDelete={handleDelete} />)}
        </section>

        <section className="section-heading lower">
          <div><span className="eyebrow">Workspace previews</span><h2>Every module has a clear operating rhythm</h2></div>
          <p>The visual shell, navigation, and card system remain consistent across the portal.</p>
        </section>

        <section className="preview-grid">
          {filtered.slice(0, 4).map((tool, index) => <PreviewCard key={`${tool.id}-preview`} tool={tool} index={index} />)}
        </section>

        <footer className="hub-footer">© {new Date().getFullYear()} MyPharmacyHub — Internal Use Only</footer>
      </section>

      <nav className="mobile-nav glass"><button className="active"><Icon name="grid" />Dashboard</button><button><Icon name="spreadsheet" />Reports</button><button><Icon name="shield" />Programs</button><button><Icon name="settings" />Settings</button></nav>
    </main>
  );
}

function App() {
  const [authed, setAuthed] = useState(() => localStorage.getItem(AUTH_KEY) === "1");

  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />;

  return (
    <QueryClientProvider client={queryClient}>
      <HubContent onLogout={() => { localStorage.removeItem(AUTH_KEY); setAuthed(false); }} />
    </QueryClientProvider>
  );
}

export default App;
