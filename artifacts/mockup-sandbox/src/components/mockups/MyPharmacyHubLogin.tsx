import {
  ArrowRight,
  Eye,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";

const heroImage =
  "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1800&q=90";

export default function MyPharmacyHubLogin() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f3ec] font-sans text-stone-950">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_16%_12%,rgba(172,193,172,.34),transparent_30rem),radial-gradient(circle_at_88%_10%,rgba(230,204,151,.30),transparent_28rem),linear-gradient(180deg,rgba(255,255,255,.72),rgba(247,243,236,.86))]" />

      <section className="relative grid min-h-screen p-4 lg:grid-cols-[1.04fr_.96fr] lg:p-6">
        <div className="relative hidden overflow-hidden rounded-[36px] border border-white/62 shadow-[0_34px_120px_-70px_rgba(64,54,42,.72)] lg:block">
          <img src={heroImage} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/58 via-stone-950/18 to-white/10" />
          <div className="absolute left-8 right-8 top-8 flex items-center justify-between">
            <div className="flex items-center gap-3 rounded-full border border-white/26 bg-white/16 px-4 py-3 text-white shadow-2xl backdrop-blur-2xl">
              <Sparkles className="h-5 w-5" />
              <span className="text-sm font-semibold">MyPharmacyHub</span>
            </div>
            <div className="rounded-full border border-white/24 bg-white/14 px-4 py-2 text-xs font-semibold text-white/82 backdrop-blur-2xl">
              Enterprise pharmacy platform
            </div>
          </div>
          <div className="absolute bottom-8 left-8 max-w-xl rounded-[30px] border border-white/24 bg-white/14 p-7 text-white shadow-2xl backdrop-blur-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/62">
              Calm healthcare operations
            </p>
            <h1 className="mt-4 text-5xl font-semibold leading-[1.03] tracking-normal">
              A premium portal for focused pharmacy work.
            </h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-white/72">
              Secure workspaces for daily pharmacy routines, monthly reporting, patient programs,
              and operational follow-through.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center px-2 py-8 lg:px-10">
          <div className="w-full max-w-[480px]">
            <div className="mb-8 flex items-center gap-3 lg:hidden">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e4ece3] text-[#405b48]">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xl font-semibold">MyPharmacyHub</p>
                <p className="text-xs text-stone-500">Premium healthcare portal</p>
              </div>
            </div>

            <div className="rounded-[34px] border border-white/76 bg-white/58 p-6 shadow-[0_28px_100px_-70px_rgba(64,54,42,.68)] backdrop-blur-2xl sm:p-8">
              <div className="mb-8">
                <span className="inline-flex rounded-full border border-white/80 bg-white/62 px-3 py-1 text-xs font-semibold text-[#667a65] shadow-sm">
                  Secure staff access
                </span>
                <h2 className="mt-5 text-4xl font-semibold tracking-normal text-stone-950">
                  Welcome back.
                </h2>
                <p className="mt-3 text-sm leading-6 text-stone-600">
                  Sign in to continue to your pharmacy operations dashboard.
                </p>
              </div>

              <form className="space-y-4">
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-stone-700">Username</span>
                  <div className="flex h-14 items-center gap-3 rounded-2xl border border-white/84 bg-white/68 px-4 shadow-sm transition focus-within:border-[#9eb39c] focus-within:bg-white/84 focus-within:shadow-[0_0_0_4px_rgba(158,179,156,.18)]">
                    <UserRound className="h-5 w-5 text-stone-400" />
                    <input
                      value="hibiscus"
                      readOnly
                      className="w-full bg-transparent text-base font-medium text-stone-900 outline-none"
                    />
                  </div>
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-stone-700">Password</span>
                  <div className="flex h-14 items-center gap-3 rounded-2xl border border-white/84 bg-white/68 px-4 shadow-sm transition focus-within:border-[#9eb39c] focus-within:bg-white/84 focus-within:shadow-[0_0_0_4px_rgba(158,179,156,.18)]">
                    <LockKeyhole className="h-5 w-5 text-stone-400" />
                    <input
                      value="hibiscus"
                      readOnly
                      type="password"
                      className="w-full bg-transparent text-base font-medium text-stone-900 outline-none"
                    />
                    <Eye className="h-5 w-5 text-stone-400" />
                  </div>
                </label>

                <div className="flex items-center justify-between gap-3 pt-1 text-sm">
                  <label className="flex items-center gap-2 text-stone-600">
                    <span className="flex h-5 w-5 items-center justify-center rounded-md border border-[#bdcbbb] bg-[#e7efe4]">
                      <span className="h-2 w-2 rounded-sm bg-[#405b48]" />
                    </span>
                    Remember this device
                  </label>
                  <button type="button" className="font-semibold text-[#405b48]">
                    Need help?
                  </button>
                </div>

                <button
                  type="button"
                  className="mt-3 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-[#405b48] text-sm font-semibold text-white shadow-[0_22px_60px_-34px_rgba(64,91,72,.92)] transition hover:bg-[#344b3b]"
                >
                  Continue to Dashboard
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>

              <div className="mt-6 rounded-2xl border border-[#dfe8d9] bg-[#eef4ea]/72 p-4">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 h-5 w-5 text-[#405b48]" />
                  <div>
                    <p className="text-sm font-semibold text-stone-800">Temporary credentials</p>
                    <p className="mt-1 text-sm leading-6 text-stone-600">
                      Username <span className="font-semibold text-stone-900">hibiscus</span> ·
                      Password <span className="font-semibold text-stone-900">hibiscus</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-5 text-center text-xs text-stone-500">
              Protected pharmacy workspace · UI preview only · Authentication unchanged
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
