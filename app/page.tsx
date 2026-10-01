"use client";

import { useState, type FormEvent } from "react";
import {
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  Eye,
  EyeOff,
  HeartHandshake,
  LayoutDashboard,
  LockKeyhole,
  Mail,
  Package,
  UsersRound,
  Wallet,
} from "lucide-react";

type AuthMode = "login" | "register" | "reset";

const modules = [
  {
    name: "Product management",
    shortName: "Products",
    description: "Inventory, purchasing, and fulfillment",
    icon: Package,
    color: "mint",
  },
  {
    name: "Human resources",
    shortName: "People",
    description: "People, time, and team operations",
    icon: UsersRound,
    color: "lilac",
  },
  {
    name: "Sales management",
    shortName: "Sales",
    description: "Pipeline, orders, and revenue",
    icon: Wallet,
    color: "peach",
  },
  {
    name: "Customer management",
    shortName: "Customers",
    description: "Relationships, service, and follow-up",
    icon: BriefcaseBusiness,
    color: "lemon",
  },
];

const chartHeights = [32, 44, 37, 58, 48, 67, 55, 76, 61, 88, 72, 100];

export default function Home() {
  const [mode, setMode] = useState<AuthMode>("login");
  const [selectedModule, setSelectedModule] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [notice, setNotice] = useState("");

  function changeMode(nextMode: AuthMode) {
    setMode(nextMode);
    setNotice("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (mode === "reset") {
      setNotice("Password recovery is not connected yet. No reset email was sent.");
      return;
    }

    if (mode === "register") {
      setNotice("Registration is not connected yet. No account was created.");
      return;
    }

    setNotice("Sign-in is not connected yet. No credentials were sent.");
  }

  const isReset = mode === "reset";
  const isRegister = mode === "register";

  return (
    <main className="site-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Hope Inc. home">
          <span className="brand-mark" aria-hidden="true">
            <HeartHandshake size={21} strokeWidth={1.8} />
          </span>
          <span className="brand-name">hope<span>, inc.</span></span>
        </a>

        <div className="topbar-right">
          <a className="topbar-link" href="#modules">Explore workspace</a>
          <span className="topbar-divider" aria-hidden="true" />
          <a className="help-link" href="#support">
            Need help <ArrowUpRight size={14} strokeWidth={1.8} />
          </a>
        </div>
      </header>

      <section className="hero" id="top" aria-label="Hope Inc. workspace sign in">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-dot" /> THE HOPE WORKSPACE</div>
          <h1>Good work<br />moves <span>together.</span></h1>
          <p className="hero-description">
            One clear view of your people, products, customers, and the progress you make every day.
          </p>
        </div>

        <section className="auth-panel" aria-labelledby="auth-title">
          <div className="auth-panel-inner">
            <div className="auth-heading">
              <span className="auth-kicker">YOUR WORKSPACE IS READY</span>
              <h2 id="auth-title">
                {isReset ? "Reset your password" : isRegister ? "Create your account" : "Welcome back"}
              </h2>
              <p>
                {isReset
                  ? "Enter your work email and we’ll help you get back in."
                  : isRegister
                    ? "Start bringing your work together in one place."
                    : "Sign in to pick up where your team left off."}
              </p>
            </div>

            {!isReset && (
              <div className="auth-tabs" role="tablist" aria-label="Account access">
                <button
                  type="button"
                  className={!isRegister ? "auth-tab active" : "auth-tab"}
                  onClick={() => changeMode("login")}
                  role="tab"
                  aria-selected={!isRegister}
                >
                  Sign in
                </button>
                <button
                  type="button"
                  className={isRegister ? "auth-tab active" : "auth-tab"}
                  onClick={() => changeMode("register")}
                  role="tab"
                  aria-selected={isRegister}
                >
                  Create account
                </button>
              </div>
            )}

            <form className="auth-form" onSubmit={handleSubmit}>
              {isRegister && (
                <label className="field-label" htmlFor="full-name">
                  Full name
                  <span className="input-wrap">
                    <UsersRound size={17} aria-hidden="true" />
                    <input id="full-name" name="name" type="text" placeholder="Your name" autoComplete="name" required />
                  </span>
                </label>
              )}

              <label className="field-label" htmlFor="email">
                Work email
                <span className="input-wrap">
                  <Mail size={17} aria-hidden="true" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@company.com"
                    autoComplete="email"
                    required
                  />
                </span>
              </label>

              {!isReset && (
                <div className="password-field">
                  <label className="field-label" htmlFor="password">Password</label>
                  <span className="input-wrap">
                    <LockKeyhole size={17} aria-hidden="true" />
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder={isRegister ? "At least 8 characters" : "Enter your password"}
                      autoComplete={isRegister ? "new-password" : "current-password"}
                      minLength={isRegister ? 8 : undefined}
                      required
                    />
                    <button
                      className="password-toggle"
                      type="button"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                    </button>
                  </span>
                </div>
              )}

              {!isReset && !isRegister && (
                <div className="form-extras">
                  <label className="remember-control">
                    <input type="checkbox" name="remember" />
                    <span className="custom-check"><Check size={11} /></span>
                    Keep me signed in
                  </label>
                  <button className="text-action" type="button" onClick={() => changeMode("reset")}>
                    Forgot password?
                  </button>
                </div>
              )}

              <button className="submit-button" type="submit">
                <span>{isReset ? "Send reset instructions" : isRegister ? "Create account" : "Sign in to Hope"}</span>
                <ArrowRight size={17} strokeWidth={2} />
              </button>

              {notice && <p className="form-notice" role="status">{notice}</p>}
            </form>

            {isReset ? (
              <button className="back-link" type="button" onClick={() => changeMode("login")}>
                <ArrowLeft size={15} /> Back to sign in
              </button>
            ) : (
              <p className="auth-footnote">
                {isRegister ? "Already have an account?" : "New to Hope Inc.?"}{" "}
                <button type="button" onClick={() => changeMode(isRegister ? "login" : "register")}>
                  {isRegister ? "Sign in" : "Create an account"}
                </button>
              </p>
            )}

            <div className="secure-note"><LockKeyhole size={13} /> Your workspace is private and secure</div>
          </div>
        </section>

        <div className="dashboard-preview" aria-label="Example operations dashboard preview">
          <div className="preview-topline">
            <div className="preview-title-group">
              <span className="preview-app-icon"><LayoutDashboard size={15} /></span>
              <div>
                <p className="preview-overline">MONDAY, OCTOBER 12</p>
                <p className="preview-title">Operations overview</p>
              </div>
            </div>
            <span className="live-indicator"><span /> LIVE</span>
          </div>

          <div className="preview-metrics">
            <div className="metric-block">
              <span>Active projects</span>
              <strong>24</strong>
              <small><ArrowUpRight size={12} /> 8.2% <i>this month</i></small>
            </div>
            <div className="metric-block">
              <span>Team members</span>
              <strong>86</strong>
              <small><span className="metric-steady">●</span> All teams active</small>
            </div>
            <div className="metric-block revenue-metric">
              <span>Monthly sales</span>
              <strong>$128k</strong>
              <small><ArrowUpRight size={12} /> 12.4% <i>this month</i></small>
            </div>
          </div>

          <div className="preview-chart-row">
            <div className="chart-caption">
              <span>Revenue trend</span>
              <strong>Healthy momentum <ArrowUpRight size={12} /></strong>
            </div>
            <div className="mini-chart" aria-hidden="true">
              {chartHeights.map((height, index) => (
                <span
                  className={index === chartHeights.length - 1 ? "chart-bar chart-bar-current" : "chart-bar"}
                  key={index}
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
            <div className="chart-months"><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span></div>
          </div>
          <div className="preview-bottomline">
            <span><span className="activity-dot" /> Product stock synced</span>
            <span>2 min ago</span>
          </div>
        </div>

        <div className="hero-footnote">
          <span className="footnote-icon"><Check size={13} strokeWidth={2.4} /></span>
          Built to help your whole team see what matters.
        </div>
      </section>

      <section className="modules-section" id="modules" aria-labelledby="modules-title">
        <div className="modules-heading">
          <div>
            <span className="section-kicker">ONE CONNECTED WORKSPACE</span>
            <h2 id="modules-title">Everything works better together.</h2>
          </div>
          <span className="modules-hint">Choose a team to explore <ArrowDownRight size={15} /></span>
        </div>

        <div className="module-grid">
          {modules.map(({ name, shortName, description, icon: Icon, color }) => (
            <button
              className={`module-card ${selectedModule === name ? "selected" : ""}`}
              key={name}
              type="button"
              aria-pressed={selectedModule === name}
              onClick={() => setSelectedModule(selectedModule === name ? "" : name)}
            >
              <span className={`module-icon ${color}`}><Icon size={20} strokeWidth={1.8} /></span>
              <span className="module-copy">
                <strong>{name}</strong>
                <small>{description}</small>
              </span>
              <span className="module-arrow" aria-hidden="true">
                {selectedModule === name ? <Check size={17} /> : <ArrowUpRight size={17} />}
              </span>
              <span className="module-mobile-name">{shortName}</span>
            </button>
          ))}
        </div>
      </section>

      <footer className="footer" id="support">
        <span>© 2026 Hope, Inc.</span>
        <span className="footer-center">Good work, made possible.</span>
        <span className="footer-help">For access help, contact your administrator</span>
      </footer>
    </main>
  );
}