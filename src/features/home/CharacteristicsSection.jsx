import React from 'react';
import './CharacteristicsSection.css';
import oscarImg from '/src/assets/mainOscar.svg';

const features = [
  {
    icon: "♻️",
    title: "Clasificación Automática",
    description: "Oscar identifica y clasifica los residuos automáticamente usando sensores inteligentes.",
  },
  {
    icon: "⭐",
    title: "Sistema de Puntos",
    description: "Cada reciclaje suma puntos a tus usuarios, incentivando hábitos sostenibles.",
  },
  {
    icon: "📊",
    title: "Dashboard en Tiempo Real",
    description: "Monitorea el impacto ambiental y la actividad de tu sede desde un solo lugar.",
  },
  {
    icon: "🔗",
    title: "Fácil Integración",
    description: "Conecta Oscar con tu app, web o sistema de fidelización existente vía API.",
  },
  {
    icon: "🌱",
    title: "Impacto Medible",
    description: "Reportes de CO₂ evitado, materiales recuperados y huella ambiental reducida.",
  },
  {
    icon: "🏢",
    title: "Escala con tu Negocio",
    description: "Desde una sede hasta cientos de ubicaciones, Oscar crece contigo.",
  },
];

function CharacteristicsSection() {
  return (
    <section className="chars-section">

      {/* Top: headline + subtext */}
      <div className="chars-header">
        <span className="chars-eyebrow">¿Por qué Oscar?</span>
        <h2 className="chars-title">Reciclaje inteligente,<br />resultados reales</h2>
        <p className="chars-subtitle">
          Oscar convierte cada residuo en una oportunidad: para tu negocio,
          para tus clientes y para el planeta.
        </p>
      </div>

      {/* Middle: image + feature grid */}
      <div className="chars-body">

        {/* Left: Oscar image with accent ring */}
        <div className="chars-image-col">
          <div className="chars-image-ring">
            <img src={oscarImg} alt="Oscar Bin" className="chars-image" />
          </div>
          <div className="chars-image-badge">
            <span className="chars-badge-number">+10k</span>
            <span className="chars-badge-label">reciclajes diarios</span>
          </div>
        </div>

        {/* Right: 2-col feature grid */}
        <ul className="chars-grid">
          {features.map((f) => (
            <li key={f.title} className="chars-card">
              <span className="chars-card-icon">{f.icon}</span>
              <div>
                <h3 className="chars-card-title">{f.title}</h3>
                <p className="chars-card-desc">{f.description}</p>
              </div>
            </li>
          ))}
        </ul>

      </div>
    </section>
  );
}

export default CharacteristicsSection;