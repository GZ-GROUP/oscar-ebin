import React from 'react';

const styles = {
  section: {
    width: '100%',
    height: 'auto',
    maxWidth: '100%',
    backgroundColor: '#f0ede8',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: "'Cabin Condensed', 'ABeeZee', serif",
    overflow: 'hidden',
    boxSizing: 'border-box',
    padding: '40px 24px 48px',
  },

  // ── TOP 20% ──────────────────────────────────────────────────────────────
  headerBlock: {
    height: '20%',           // 164px of 656px
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
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '24px',
    padding: '0 24px',
    boxSizing: 'border-box',
  },

  // Each card is a perfect square: 3 cards + 2 gaps inside ~1280px usable
  // 1280 - 2*48 = 1184 / 3 ≈ 394px → cap at height constraint (492px - vertical padding)
  card: {
    position: 'relative',
    width: 'min(100%, 340px)',
    aspectRatio: '1 / 1',
    minHeight: '320px',
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
    width: '60px',
    height: '60px',
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
    text: 'Escaneas el QR y alimentas a Oscar con tu materia de reciclaje',
    // person showing items / waste sorting
    bg: 'https://plus.unsplash.com/premium_vector-1764172293509-f2d2c764b8c2?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    step: 2,
    text: 'Oscar reconoce y clasifica tu materia de reciclaje',
    // smart bin / technology
    bg: 'https://plus.unsplash.com/premium_vector-1711877749643-73289b60330e?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    step: 3,
    text: 'Oscar te premiará con puntos por reciclar',
    // reward / celebration / green
    bg: 'https://plus.unsplash.com/premium_vector-1719014755221-c88255035aee?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

function HowToSection() {
  return (
    <section style={styles.section}>

      {/* ── TOP 20%: Header ── */}
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
              <p style={styles.cardText}>{card.text}</p>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}

export default HowToSection;