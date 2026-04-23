import React from 'react';

const styles = {
  section: {
    width: '1440px',
    height: '656px',
    maxWidth: '100%',
    backgroundColor: '#f0ede8',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: "'Georgia', 'Times New Roman', serif",
    overflow: 'hidden',
    boxSizing: 'border-box',
  },

  // ── TOP 25% ──────────────────────────────────────────────────────────────
  headerBlock: {
    height: '25%',           // 164px of 656px
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    padding: '0 80px',
  },
  title: {
    margin: 0,
    fontSize: '2.4rem',
    fontWeight: '700',
    color: '#1a3a2a',
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
    textAlign: 'center',
    lineHeight: 1.15,
  },
  subtitle: {
    margin: 0,
    fontSize: '1.05rem',
    fontWeight: '400',
    color: '#4a6355',
    letterSpacing: '0.06em',
    textAlign: 'center',
    fontStyle: 'italic',
  },

  // ── BOTTOM 75% ───────────────────────────────────────────────────────────
  cardsRow: {
    height: '75%',           // 492px of 656px
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '48px',
    padding: '0 80px',
    boxSizing: 'border-box',
  },

  // Each card is a perfect square: 3 cards + 2 gaps inside ~1280px usable
  // 1280 - 2*48 = 1184 / 3 ≈ 394px → cap at height constraint (492px - vertical padding)
  card: {
    position: 'relative',
    width: '340px',
    height: '340px',
    borderRadius: '12px',
    overflow: 'hidden',
    flexShrink: 0,
    boxShadow: '0 8px 32px rgba(26,58,42,0.18)',
  },

  // Dark overlay that sits on top of the bg image
  overlay: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(18, 40, 28, 0.68)',
    zIndex: 1,
  },

  cardContent: {
    position: 'absolute',
    inset: 0,
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '32px 28px',
    textAlign: 'center',
    gap: '14px',
  },

  stepLabel: {
    fontSize: '0.72rem',
    fontWeight: '700',
    color: '#7ecfa0',
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
  },

  cardText: {
    margin: 0,
    fontSize: '1.15rem',
    fontWeight: '600',
    color: '#ffffff',
    lineHeight: 1.5,
    letterSpacing: '0.01em',
  },

  stepNumber: {
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    backgroundColor: '#2d7a4f',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.2rem',
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: '4px',
    flexShrink: 0,
  },
};

// Unsplash images that match the recycling / sustainability theme
const CARD_DATA = [
  {
    step: 1,
    text: 'Le muestras a Oscar lo que deseas reciclar',
    // person showing items / waste sorting
    bg: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=700&q=80',
  },
  {
    step: 2,
    text: 'Espera que Oscar clasifique tu materia de reciclaje',
    // smart bin / technology
    bg: 'https://images.unsplash.com/photo-1611270629569-8b357cb88da9?w=700&q=80',
  },
  {
    step: 3,
    text: 'Oscar te premiará con puntos por reciclar',
    // reward / celebration / green
    bg: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=700&q=80',
  },
];

function HowToSection() {
  return (
    <section style={styles.section}>

      {/* ── TOP 25%: Header ── */}
      <div style={styles.headerBlock}>
        <h2 style={styles.title}>¿Cómo Funciona Oscar?</h2>
        <p style={styles.subtitle}>Tecnología inteligente para un futuro sostenible</p>
      </div>

      {/* ── BOTTOM 75%: Three equal cards ── */}
      <div style={styles.cardsRow}>
        {CARD_DATA.map((card) => (
          <div
            key={card.step}
            style={{
              ...styles.card,
              backgroundImage: `url('${card.bg}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* Darkened overlay */}
            <div style={styles.overlay} />

            {/* Text content */}
            <div style={styles.cardContent}>
              <div style={styles.stepNumber}>{card.step}</div>
              <span style={styles.stepLabel}>Paso {card.step}</span>
              <p style={styles.cardText}>{card.text}</p>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}

export default HowToSection;