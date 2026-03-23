import { useState } from "react";

const LOGO_URL = "/logo.png";

const dashboards = [
  { name: "Alpha", owner: "Felipe", status: "ativo", url: "https://dash-alpha-fitness.vercel.app/" },
  { name: "Arvo Festival", owner: "Felipe", status: "execução", url: "https://arvo-festival.vercel.app/" },
  { name: "BW2", owner: "Felipe", status: "ativo", url: "https://bw2-step.vercel.app/dashboard" },
  { name: "NW", owner: "Felipe", status: "execução", url: null },
  { name: "Cam SSA", owner: "Felipe", status: "stand-by", url: null },
  { name: "Básica e Joshua", owner: "Dilvan", status: "execução", url: "https://basica-joshua-phi.vercel.app/dashboard" },
  { name: "FeedHub", owner: "Dilvan", status: "execução", url: null },
  { name: "Orla Salvador", owner: "Dilvan", status: "execução", url: null },
  { name: "Viva Gula", owner: "Dilvan", status: "execução", url: "https://viva-gula.vercel.app/dashboard" },
];

const statusConfig = {
  ativo: { label: "Ativo", color: "#00e676", bg: "rgba(0,230,118,0.08)", border: "rgba(0,230,118,0.25)", pulse: true },
  "execução": { label: "Em Execução", color: "#ffc107", bg: "rgba(255,193,7,0.08)", border: "rgba(255,193,7,0.25)", pulse: false },
  "stand-by": { label: "Stand-by", color: "#78909c", bg: "rgba(120,144,156,0.08)", border: "rgba(120,144,156,0.25)", pulse: false },
};

const filters = ["Geral", "Dilvan", "Felipe"];

export default function StepAdsDashboards() {
  const [activeFilter, setActiveFilter] = useState("Geral");

  const filtered = activeFilter === "Geral" ? dashboards : dashboards.filter(d => d.owner === activeFilter);

  const totalAtivos = dashboards.filter(d => d.status === "ativo").length;
  const totalExecucao = dashboards.filter(d => d.status === "execução").length;
  const totalStandby = dashboards.filter(d => d.status === "stand-by").length;

  const stats = [
    { label: "Total Dashs", value: dashboards.length, accent: "#ffffff" },
    { label: "Ativos", value: totalAtivos, accent: "#00e676" },
    { label: "Em Execução", value: totalExecucao, accent: "#ffc107" },
    { label: "Stand-by", value: totalStandby, accent: "#78909c" },
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0a",
      color: "#e0e0e0",
      fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
      padding: 0,
      margin: 0,
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap');

        @keyframes pulse-green {
          0%, 100% { box-shadow: 0 0 0 0 rgba(0,230,118,0.5); }
          50% { box-shadow: 0 0 0 6px rgba(0,230,118,0); }
        }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .card-row:hover {
          background: rgba(255,255,255,0.04) !important;
          transform: translateX(4px);
        }
        .filter-btn {
          border: 1px solid rgba(255,255,255,0.1);
          background: transparent;
          color: #999;
          padding: 8px 20px;
          border-radius: 6px;
          cursor: pointer;
          font-family: 'Space Mono', monospace;
          font-size: 13px;
          transition: all 0.25s ease;
          letter-spacing: 0.5px;
        }
        .filter-btn:hover { border-color: rgba(255,255,255,0.3); color: #ccc; }
        .filter-btn.active {
          background: #fff;
          color: #0a0a0a;
          border-color: #fff;
          font-weight: 700;
        }
        .dash-link {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          color: #00e676;
          text-decoration: none;
          font-size: 12px;
          font-family: 'Space Mono', monospace;
          padding: 4px 10px;
          border: 1px solid rgba(0,230,118,0.3);
          border-radius: 4px;
          transition: all 0.2s;
        }
        .dash-link:hover {
          background: rgba(0,230,118,0.12);
          border-color: #00e676;
        }
        * { box-sizing: border-box; }
      `}</style>

      {/* Header */}
      <header style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "24px 40px",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        animation: "fade-up 0.5s ease",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <img src={LOGO_URL} alt="Step Ads" style={{ height: 44, filter: "brightness(1.1)" }} />
          <div style={{
            width: 1,
            height: 28,
            background: "rgba(255,255,255,0.12)",
          }} />
          <span style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 12,
            color: "#666",
            letterSpacing: 2,
            textTransform: "uppercase",
          }}>Dashboard Manager</span>
        </div>
        <div style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: 11,
          color: "#555",
        }}>
          {new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "long", year: "numeric" })}
        </div>
      </header>

      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px 60px" }}>

        {/* Stats */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 16,
          marginBottom: 40,
          animation: "fade-up 0.6s ease",
        }}>
          {stats.map((s, i) => (
            <div key={i} style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 10,
              padding: "20px 24px",
              position: "relative",
              overflow: "hidden",
            }}>
              <div style={{
                position: "absolute",
                top: 0, left: 0, right: 0,
                height: 2,
                background: `linear-gradient(90deg, transparent, ${s.accent}, transparent)`,
                opacity: 0.6,
              }} />
              <div style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 11,
                color: "#666",
                letterSpacing: 1.5,
                textTransform: "uppercase",
                marginBottom: 8,
              }}>{s.label}</div>
              <div style={{
                fontSize: 36,
                fontWeight: 700,
                color: s.accent,
                lineHeight: 1,
                fontFamily: "'DM Sans', sans-serif",
              }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div style={{
          display: "flex",
          gap: 10,
          marginBottom: 24,
          animation: "fade-up 0.7s ease",
          flexWrap: "wrap",
        }}>
          {filters.map(f => (
            <button
              key={f}
              className={`filter-btn ${activeFilter === f ? "active" : ""}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
              <span style={{
                marginLeft: 6,
                opacity: 0.6,
                fontSize: 11,
              }}>
                ({f === "Geral" ? dashboards.length : dashboards.filter(d => d.owner === f).length})
              </span>
            </button>
          ))}
        </div>

        {/* Table */}
        <div style={{
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 10,
          overflow: "hidden",
          animation: "fade-up 0.8s ease",
        }}>
          {/* Table Header */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1.5fr 1fr 1fr 1.2fr",
            padding: "14px 24px",
            background: "rgba(255,255,255,0.03)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            fontFamily: "'Space Mono', monospace",
            fontSize: 11,
            color: "#555",
            letterSpacing: 1.5,
            textTransform: "uppercase",
          }}>
            <div>Dashboard</div>
            <div>Colaborador</div>
            <div>Status</div>
            <div>Acesso</div>
          </div>

          {/* Rows */}
          {filtered.map((d, i) => {
            const sc = statusConfig[d.status];
            return (
              <div
                key={d.name}
                className="card-row"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.5fr 1fr 1fr 1.2fr",
                  padding: "16px 24px",
                  borderBottom: i < filtered.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                  alignItems: "center",
                  transition: "all 0.25s ease",
                  animationDelay: `${i * 0.05}s`,
                }}
              >
                {/* Name */}
                <div style={{
                  fontWeight: 600,
                  fontSize: 15,
                  color: "#f0f0f0",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}>
                  <span style={{
                    width: 8, height: 8,
                    borderRadius: "50%",
                    background: sc.color,
                    display: "inline-block",
                    flexShrink: 0,
                    animation: sc.pulse ? "pulse-green 2s infinite" : "none",
                  }} />
                  {d.name}
                </div>

                {/* Owner */}
                <div style={{
                  fontSize: 13,
                  color: "#888",
                }}>{d.owner}</div>

                {/* Status */}
                <div>
                  <span style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "4px 12px",
                    borderRadius: 20,
                    fontSize: 12,
                    fontWeight: 600,
                    color: sc.color,
                    background: sc.bg,
                    border: `1px solid ${sc.border}`,
                    fontFamily: "'DM Sans', sans-serif",
                  }}>
                    {sc.label}
                  </span>
                </div>

                {/* Link */}
                <div>
                  {d.url ? (
                    <a href={d.url} target="_blank" rel="noopener noreferrer" className="dash-link">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                      Abrir Dash
                    </a>
                  ) : (
                    <span style={{
                      fontSize: 12,
                      color: "#444",
                      fontFamily: "'Space Mono', monospace",
                    }}>—</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div style={{
          marginTop: 40,
          textAlign: "center",
          fontFamily: "'Space Mono', monospace",
          fontSize: 11,
          color: "#333",
          letterSpacing: 1,
        }}>
          STEP ADS © {new Date().getFullYear()} — PAINEL INTERNO
        </div>
      </main>
    </div>
  );
}
