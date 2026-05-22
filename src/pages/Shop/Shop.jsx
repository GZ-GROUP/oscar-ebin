import React from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

const plans = [
  {
    name: "Plan Básico",
    price: "$29",
    featured: false,
    features: [
      "1 máquina Oscar incluida",
      "Dashboard de actividad básico",
      "Hasta 500 reciclajes/mes",
      "Reportes mensuales",
      "Soporte por email",
      "Historial de puntos de usuarios",
      "Almacenamiento de datos 3 meses",
    ],
  },
  {
    name: "Plan Profesional",
    price: "$79",
    featured: true,
    features: [
      "Hasta 3 máquinas Oscar",
      "Dashboard avanzado en tiempo real",
      "Reciclajes ilimitados",
      "Reportes semanales y exportables",
      "Soporte prioritario 24/7",
      "Gestión de puntos personalizable",
      "Integraciones con tu app o web",
      "Almacenamiento de datos 12 meses",
    ],
  },
  {
    name: "Plan Empresarial",
    price: "$149",
    featured: false,
    features: [
      "Máquinas Oscar ilimitadas",
      "Dashboard multi-sede centralizado",
      "Reciclajes ilimitados",
      "Reportes de impacto ambiental",
      "Gerente de cuenta dedicado",
      "API completa para integraciones",
      "Programa de puntos white-label",
      "Almacenamiento de datos ilimitado",
    ],
  },
];

// ─── Styles ──────────────────────────────────────────────────────────────────

const FONT_HEADER = "'Cabin Condensed', sans-serif";
const FONT_BODY   = "'ABeeZee', sans-serif";

const S = {
  page: {
    backgroundColor: "#f2f0eb",
    width: "100%",
    boxSizing: "border-box",
  },

  // ── Section header ──
  header: {
    textAlign: "center",
    padding: "80px 35px 48px",
  },
  headerTitle: {
    fontFamily: FONT_HEADER,
    fontWeight: 700,
    fontSize: "48px",
    lineHeight: "1.2",
    color: "#006241",
    margin: "0 0 16px",
  },
  headerSubtitle: {
    fontFamily: FONT_BODY,
    fontWeight: 400,
    fontSize: "20px",
    lineHeight: "28px",
    color: "#2b5148",
    margin: 0,
  },

  // ── Cards row ──
  cardsSection: {
    padding: "0 35px 80px",
    display: "flex",
    justifyContent: "center",
    alignItems: "stretch",
    gap: "24px",
    flexWrap: "nowrap",
  },

  // ── Individual card ──
  card: (featured) => ({
    display: "flex",
    flexDirection: "column",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: featured
      ? "0px 20px 25px -5px rgba(0,0,0,0.15), 0px 8px 10px -6px rgba(0,0,0,0.15)"
      : "0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -4px rgba(0,0,0,0.1)",
    flex: "1 1 0",
    minWidth: 0,
    boxSizing: "border-box",
  }),

  // Fixed height so all three headers line up regardless of name length
  cardHeader: {
    backgroundColor: "#2b5148",
    padding: "28px 32px",
    height: "140px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    boxSizing: "border-box",
    gap: "8px",
  },
  cardName: {
    fontFamily: FONT_HEADER,
    fontWeight: 700,
    fontSize: "28px",
    lineHeight: "1.2",
    color: "#fff",
    margin: 0,
  },
  cardPrice: {
    fontFamily: FONT_HEADER,
    fontWeight: 400,
    fontSize: "32px",
    lineHeight: "1.2",
    color: "#d4e9e2",
    margin: 0,
  },
  cardPriceSuffix: {
    fontSize: "15px",
    color: "#a8c8be",
    fontFamily: FONT_BODY,
  },

  // ── Feature list ──
  cardBody: {
    backgroundColor: "#edebe9",
    flex: 1,
    padding: "36px 32px 24px",
  },
  featureList: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  featureItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: "10px",
  },
  featureBullet: {
    fontFamily: FONT_BODY,
    fontSize: "18px",
    color: "#006241",
    lineHeight: "26px",
    flexShrink: 0,
  },
  featureText: {
    fontFamily: FONT_BODY,
    fontWeight: 400,
    fontSize: "16px",
    lineHeight: "26px",
    color: "#004d33",
  },

  // ── Card footer ──
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
    padding: "16px 24px",
    fontFamily: FONT_HEADER,
    fontWeight: 700,
    fontSize: "18px",
    cursor: "pointer",
    transition: "background 0.2s",
    letterSpacing: "0.03em",
  },

  // ── CTA banner ──
  cta: {
    backgroundColor: "#2b5148",
    padding: "64px 35px",
    textAlign: "center",
  },
  ctaTitle: {
    fontFamily: FONT_HEADER,
    fontWeight: 700,
    fontSize: "40px",
    lineHeight: "1.2",
    color: "#fff",
    margin: "0 0 16px",
  },
  ctaSubtitle: {
    fontFamily: FONT_BODY,
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
    fontFamily: FONT_HEADER,
    fontWeight: 700,
    fontSize: "18px",
    cursor: "pointer",
    transition: "opacity 0.2s",
    letterSpacing: "0.03em",
  },
};

// ─── Component ───────────────────────────────────────────────────────────────

export default function Shop() {
  return (
    <div style={S.page}>
      {/* Section header */}
      <div style={S.header}>
        <h2 style={S.headerTitle}>Impulsa el Cambio con Oscar</h2>
        <p style={S.headerSubtitle}>
          Selecciona la opción que mejor se adapte a tus necesidades
        </p>
      </div>

      {/* Pricing cards */}
      <div style={S.cardsSection}>
        {plans.map((plan) => (
          <div key={plan.name} style={S.card(plan.featured)}>

            {/* Card header — fixed height keeps all three aligned */}
            <div style={S.cardHeader}>
              <p style={S.cardName}>{plan.name}</p>
              <p style={S.cardPrice}>
                {plan.price}
                <span style={S.cardPriceSuffix}>/mes</span>
              </p>
            </div>

            {/* Features */}
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

            {/* Button */}
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