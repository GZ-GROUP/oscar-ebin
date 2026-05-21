import React from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

const plans = [
  {
    name: "Básico",
    price: "$29",
    featured: false,
    features: [
      "Acceso a recursos básicos",
      "Soporte por email",
      "5 usuarios incluidos",
      "Actualizaciones mensuales",
      "Dashboard personalizado",
      "Reportes básicos",
      "Almacenamiento 10GB",
    ],
  },
  {
    name: "Profesional",
    price: "$79",
    featured: true,
    features: [
      "Todo lo del Plan Básico",
      "Soporte prioritario 24/7",
      "20 usuarios incluidos",
      "Actualizaciones semanales",
      "Analytics avanzados",
      "Integraciones ilimitadas",
      "Almacenamiento 100GB",
    ],
  },
  {
    name: "Empresarial",
    price: "$149",
    featured: false,
    features: [
      "Todo lo del Plan Profesional",
      "Gerente de cuenta dedicado",
      "Usuarios ilimitados",
      "Actualizaciones en tiempo real",
      "API completa",
      "Seguridad empresarial",
      "Almacenamiento ilimitado",
    ],
  },
];

// ─── Styles ──────────────────────────────────────────────────────────────────

const S = {
  page: {
    backgroundColor: "#d4e9e2",
    width: "100%",
    boxSizing: "border-box",
  },

  // ── Header section ──
  header: {
    textAlign: "center",
    padding: "80px 35px 48px",
  },
  headerTitle: {
    fontFamily: "'Roboto', sans-serif",
    fontWeight: 700,
    fontSize: "48px",
    lineHeight: "1.2",
    color: "#006241",
    margin: "0 0 16px",
  },
  headerSubtitle: {
    fontFamily: "'Roboto', sans-serif",
    fontWeight: 400,
    fontSize: "20px",
    lineHeight: "28px",
    color: "#2b5148",
    margin: 0,
  },

  // ── Cards section ──
  cardsSection: {
    padding: "0 35px 80px",
    display: "flex",
    justifyContent: "center",
    alignItems: "stretch",
    gap: "24px",
    flexWrap: "nowrap",
  },

  // ── Card ──
  card: (featured) => ({
    display: "flex",
    flexDirection: "column",
    borderRadius: "20px",
    overflow: "hidden",
    // featured card gets a stronger shadow instead of the translateY lift
    boxShadow: featured
      ? "0px 20px 25px -5px rgba(0,0,0,0.15), 0px 8px 10px -6px rgba(0,0,0,0.15)"
      : "0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -4px rgba(0,0,0,0.1)",
    flex: "1 1 0",
    minWidth: 0,
    boxSizing: "border-box",
  }),


  cardHeader: {
    backgroundColor: "#00c785",
    padding: "32px",
    textAlign: "center",
  },
  cardName: (featured) => ({
    fontFamily: "'Roboto', sans-serif",
    fontWeight: 600,
    fontSize: featured ? "40px" : "36px",
    lineHeight: "1.2",
    color: "#006241",
    margin: "0 0 12px",
  }),
  cardPrice: (featured) => ({
    fontFamily: "'Roboto', sans-serif",
    fontWeight: 400,
    fontSize: featured ? "40px" : "36px",
    lineHeight: "1.2",
    color: "#2b5148",
    margin: 0,
  }),

  cardBody: {
    backgroundColor: "#edebe9",
    flex: 1,
    padding: "48px 32px 32px",
  },
  featureList: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  featureItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
  },
  featureBullet: {
    fontFamily: "'Roboto', sans-serif",
    fontSize: "20px",
    color: "#006241",
    lineHeight: "28px",
    flexShrink: 0,
  },
  featureText: {
    fontFamily: "'Roboto', sans-serif",
    fontWeight: 400,
    fontSize: "18px",
    lineHeight: "28px",
    color: "#004d33",
  },

  cardFooter: {
    backgroundColor: "#edebe9",
    padding: "16px 32px 32px",
  },
  planButton: {
    width: "100%",
    backgroundColor: "#2b5148",
    color: "#fff",
    border: "none",
    borderRadius: "15px",
    padding: "18px 24px",
    fontFamily: "'Roboto', sans-serif",
    fontWeight: 500,
    fontSize: "20px",
    cursor: "pointer",
    transition: "background 0.2s",
  },

  // ── CTA section ──
  cta: {
    backgroundColor: "#2b5148",
    padding: "64px 35px",
    textAlign: "center",
  },
  ctaTitle: {
    fontFamily: "'Roboto', sans-serif",
    fontWeight: 700,
    fontSize: "40px",
    lineHeight: "1.2",
    color: "#fff",
    margin: "0 0 16px",
  },
  ctaSubtitle: {
    fontFamily: "'Roboto', sans-serif",
    fontWeight: 400,
    fontSize: "18px",
    lineHeight: "28px",
    color: "#d4e9e2",
    margin: "0 0 40px",
  },
  ctaButton: {
    backgroundColor: "#fff",
    color: "#006241",
    border: "none",
    borderRadius: "10px",
    padding: "16px 32px",
    fontFamily: "'Roboto', sans-serif",
    fontWeight: 600,
    fontSize: "18px",
    cursor: "pointer",
    transition: "opacity 0.2s",
  },
};

// ─── Component ───────────────────────────────────────────────────────────────

export default function Shop() {
  return (
    <div style={S.page}>
      {/* Section header */}
      <div style={S.header}>
        <h2 style={S.headerTitle}>Nuestros Planes</h2>
        <p style={S.headerSubtitle}>
          Selecciona la opción que mejor se adapte a tus necesidades
        </p>
      </div>

      {/* Pricing cards */}
      <div style={S.cardsSection}>
        {plans.map((plan) => (
          <div key={plan.name} style={S.card(plan.featured)}>
            {/* Card header */}
            <div style={S.cardHeader}>
              <p style={S.cardName(plan.featured)}>{plan.name}</p>
              <p style={S.cardPrice(plan.featured)}>{plan.price}<span style={{ fontSize: "16px", color: "#2b5148" }}>/mes</span></p>
            </div>

            {/* Features list */}
            <div style={S.cardBody}>
              <ul style={S.featureList}>
                {plan.features.map((feature) => (
                  <li key={feature} style={S.featureItem}>
                    <span style={S.featureBullet}>•</span>
                    <span style={S.featureText}>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA button */}
            <div style={S.cardFooter}>
              <button
                style={S.planButton}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1e3932")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#2b5148")}
              >
                Quiero este Plan
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Custom plan CTA */}
      <div style={S.cta}>
        <h2 style={S.ctaTitle}>¿Necesitas un plan personalizado?</h2>
        <p style={S.ctaSubtitle}>
          Nuestro equipo está listo para ayudarte a encontrar la solución perfecta para tu empresa
        </p>
        <button
          style={S.ctaButton}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          Contactar con Ventas
        </button>
      </div>
    </div>
  );
}