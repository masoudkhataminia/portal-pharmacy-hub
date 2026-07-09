import { useState, type FormEvent } from "react";
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
    }, 400);
  }

  return (
    <div className="login-root">
      <div className="login-bg" />
      <section className="login-shell">
        <div className="login-hero">
          <div className="login-hero-top">
            <div className="login-logo login-logo-pill">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="login-logo-icon">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
              <span>MyPharmacyHub</span>
            </div>
            <span className="login-hero-badge">Enterprise pharmacy platform</span>
          </div>
          <div className="login-hero-copy">
            <p className="login-kicker">Calm healthcare operations</p>
            <h1>A premium portal for focused pharmacy work.</h1>
            <p>
              Secure workspaces for daily pharmacy routines, reporting, patient programs,
              and operational follow-through.
            </p>
          </div>
        </div>
        <div className="login-panel">
          <div className="login-card">
            <div className="login-logo login-logo-mobile">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="login-logo-icon">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
              <span>MyPharmacyHub</span>
            </div>
            <span className="login-card-badge">Secure staff access</span>
            <h1 className="login-title">Welcome back.</h1>
            <p className="login-subtitle">Sign in to continue to your pharmacy operations dashboard.</p>
            <form className="login-form" onSubmit={handleSubmit}>
              <label className="login-label">
                Username
                <input
                  className={`login-input${error ? " login-input-error" : ""}`}
                  type="text"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => { setUsername(e.target.value); setError(false); }}
                  placeholder="Enter username"
                  autoFocus
                />
              </label>
              <label className="login-label">
                Password
                <input
                  className={`login-input${error ? " login-input-error" : ""}`}
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(false); }}
                  placeholder="Enter password"
                />
              </label>
              {error && <p className="login-error">Incorrect username or password.</p>}
              <button className="login-btn" type="submit" disabled={loading}>
                {loading ? "Signing in..." : "Continue to Dashboard"}
              </button>
            </form>
            <div className="login-note">
              <strong>Temporary credentials</strong>
              <span>Username hibiscus / Password hibiscus</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const queryClient = new QueryClient();

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className ?? "tool-icon"}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function PackageIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className ?? "tool-icon"}>
      <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" />
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  );
}

function BookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className ?? "tool-icon"}>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}

function GridIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className ?? "tool-icon"}>
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  );
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className ?? "tool-icon"}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function BellIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className ?? "tool-icon"}>
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

function ToolIconComponent({ icon, className }: { icon: string; className?: string }) {
  switch (icon) {
    case "shield": return <ShieldIcon className={className} />;
    case "package": return <PackageIcon className={className} />;
    case "book": return <BookIcon className={className} />;
    case "grid": return <GridIcon className={className} />;
    case "star": return <StarIcon className={className} />;
    case "bell": return <BellIcon className={className} />;
    default: return <GridIcon className={className} />;
  }
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

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="search-icon">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function ClearIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14 }}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ width: 15, height: 15 }}>
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

const ICON_OPTIONS = [
  { value: "shield", label: "Shield" },
  { value: "package", label: "Package" },
  { value: "book", label: "Book" },
  { value: "grid", label: "Grid" },
  { value: "star", label: "Star" },
  { value: "bell", label: "Bell" },
];

function ToolCard({ tool, adminMode, onDelete }: { tool: Tool; adminMode: boolean; onDelete: (id: string) => void }) {
  return (
    <div className="tool-card">
      <div className="tool-card-body">
        <div className="tool-icon-wrap">
          <ToolIconComponent icon={tool.icon} />
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
        {adminMode && (
          <button
            className="tool-delete-btn"
            onClick={() => onDelete(tool.id)}
            title="Remove tool"
          >
            <TrashIcon /> Remove
          </button>
        )}
      </div>
    </div>
  );
}

const EMPTY_FORM = { title: "", description: "", icon: "shield", url: "" };

function AdminPanel({ onClose }: { onClose: () => void }) {
  const qc = useQueryClient();
  const createTool = useCreateTool({
    mutation: {
      onSuccess: () => {
        qc.invalidateQueries({ queryKey: ["/api/tools"] });
        setForm(EMPTY_FORM);
      },
    },
  });
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!form.title.trim() || !form.url.trim()) {
      setError("Title and URL are required.");
      return;
    }
    createTool.mutate({ data: form });
  }

  return (
    <div className="admin-panel">
      <div className="admin-panel-header">
        <h2 className="admin-panel-title">Manage Tools</h2>
        <button className="admin-close-btn" onClick={onClose} aria-label="Close admin panel">✕</button>
      </div>
      <p className="admin-panel-hint">
        Add tools here — no code changes needed. Use the trash icon on any card to remove a tool.
      </p>
      <form className="admin-form" onSubmit={handleSubmit}>
        <div className="admin-form-row">
          <label className="admin-label">Title
            <input
              className="admin-input"
              type="text"
              placeholder="e.g. Drug Interaction Checker"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            />
          </label>
          <label className="admin-label">Icon
            <select
              className="admin-input"
              value={form.icon}
              onChange={(e) => setForm((f) => ({ ...f, icon: e.target.value }))}
            >
              {ICON_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </label>
        </div>
        <label className="admin-label">URL
          <input
            className="admin-input"
            type="url"
            placeholder="https://your-tool.replit.app/"
            value={form.url}
            onChange={(e) => setForm((f) => ({ ...f, url: e.target.value }))}
          />
        </label>
        <label className="admin-label">Description
          <textarea
            className="admin-input admin-textarea"
            placeholder="Brief description of what this tool does"
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
          />
        </label>
        {error && <p className="admin-error">{error}</p>}
        {createTool.error && <p className="admin-error">Failed to add tool. Please try again.</p>}
        <button
          type="submit"
          className="admin-submit-btn"
          disabled={createTool.isPending}
        >
          {createTool.isPending ? "Adding…" : "+ Add Tool"}
        </button>
      </form>
    </div>
  );
}

function HubContent({ onLogout }: { onLogout: () => void }) {
  const { data: tools, isLoading, isError } = useListTools();
  const qc = useQueryClient();
  const deleteTool = useDeleteTool({
    mutation: {
      onSuccess: () => qc.invalidateQueries({ queryKey: ["/api/tools"] }),
    },
  });
  const [adminOpen, setAdminOpen] = useState(false);
  const [query, setQuery] = useState("");

  const filtered = (tools ?? []).filter((t: Tool) => {
    const q = query.toLowerCase();
    return t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q);
  });

  function handleDelete(id: string) {
    if (confirm("Remove this tool from the hub?")) {
      deleteTool.mutate({ id });
    }
  }

  return (
    <div className="hub-root">
      <div className="hub-bg" />
      <header className="hub-header">
        <div className="hub-header-inner">
          <div className="hub-logo">
            <ActivityIcon />
            <div>
              <span>MyPharmacyHub</span>
              <small>Premium healthcare portal</small>
            </div>
          </div>
          <div className="hub-actions">
            <button
              className={`admin-toggle-btn${adminOpen ? " active" : ""}`}
              onClick={() => setAdminOpen((o) => !o)}
              title="Admin panel"
            >
              <SettingsIcon />
              <span>Admin</span>
            </button>
            <button className="logout-btn" onClick={onLogout} title="Sign out">
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {adminOpen && <AdminPanel onClose={() => setAdminOpen(false)} />}

      <main className="hub-main">
        <section className="hub-hero">
          <div className="hub-hero-copy">
            <span className="hub-eyebrow">Enterprise pharmacy platform</span>
            <h1 className="hub-title">A softer way to run every pharmacy workflow.</h1>
            <p className="hub-subtitle">
              Central access for clinical tools, patient programs, reporting and operational routines.
            </p>
            <div className="hub-hero-stats">
              <div><strong>{tools?.length ?? "-"}</strong><span>Active tools</span></div>
              <div><strong>{filtered.length}</strong><span>Visible now</span></div>
              <div><strong>Secure</strong><span>Staff workspace</span></div>
            </div>
          </div>
          <div className="hub-hero-image">
            <div className="hub-hero-status">
              <span>Workspace status</span>
              <strong>{isLoading ? "Loading" : "Ready"}</strong>
            </div>
          </div>
        </section>

        <section className="hub-toolbar">
          <div>
            <span className="hub-section-label">Portal tools</span>
            <h2>Operational workspaces</h2>
          </div>
          <div className="search-field">
            <SearchIcon />
            <input
              type="text"
              className="search-input"
              placeholder="Search tools…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search tools"
            />
            {query && (
              <button
                className="search-clear"
                onClick={() => setQuery("")}
                aria-label="Clear search"
              >
                <ClearIcon />
              </button>
            )}
          </div>
        </section>

        {isLoading && (
          <div className="hub-status">Loading tools…</div>
        )}

        {isError && (
          <div className="hub-status hub-error">
            Could not load tools. Please check the API server.
          </div>
        )}

        {tools && (
          filtered.length > 0 ? (
            <div className="tools-grid">
              {filtered.map((tool: Tool) => (
                <ToolCard key={tool.id} tool={tool} adminMode={adminOpen} onDelete={handleDelete} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-state-icon">
                <SearchIcon />
              </div>
              <p className="empty-state-title">
                {query ? "No tools found" : "No tools configured. Use the Admin panel to add one."}
              </p>
              {query && (
                <p className="empty-state-sub">
                  Try a different keyword, or{" "}
                  <button className="empty-state-clear" onClick={() => setQuery("")}>
                    clear the search
                  </button>
                </p>
              )}
            </div>
          )
        )}
      </main>

      <footer className="hub-footer">
        <p>© {new Date().getFullYear()} MyPharmacyHub &mdash; Internal Use Only</p>
      </footer>
    </div>
  );
}

function App() {
  const [authed, setAuthed] = useState(() => localStorage.getItem(AUTH_KEY) === "1");

  if (!authed) {
    return <LoginScreen onLogin={() => setAuthed(true)} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <HubContent onLogout={() => { localStorage.removeItem(AUTH_KEY); setAuthed(false); }} />
    </QueryClientProvider>
  );
}

export default App;
