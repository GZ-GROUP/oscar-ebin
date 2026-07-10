import React, { useState, useEffect } from "react";

const P = {
  bg:       "#f2f0eb",
  dark:     "#1e3932",
  green:    "#006241",
  greenHov: "#004d33",
  mint:     "#d4e9e2",
  border:   "#2b5148",
  chrome:   "#edebe9",
  white:    "#ffffff",
};

/* ── Íconos ── */
const IconX = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const IconSend = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);
const IconCheck = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const IconUser = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);
const IconMail = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="2,4 12,13 22,4"/>
  </svg>
);
const IconPhone = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.12 2.18 2 2 0 012.1 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
  </svg>
);
const IconTag = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>
  </svg>
);
const IconMsg = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
  </svg>
);

/* ── Campo label ── */
function Field({ label, icon, error, children }) {
  return (
    <div style={{ marginBottom: "14px" }}>
      <label style={{
        display: "flex", alignItems: "center", gap: "5px",
        fontFamily: "'ABeeZee', sans-serif",
        fontSize: "10px", letterSpacing: "1.8px",
        textTransform: "uppercase",
        color: error ? "#e05252" : P.border,
        marginBottom: "6px",
      }}>
        <span style={{ opacity: 0.7 }}>{icon}</span>
        {label}
        {error && <span style={{ marginLeft: "auto", fontSize: "10px", color: "#e05252", letterSpacing: 0 }}>{error}</span>}
      </label>
      {children}
    </div>
  );
}

/* ── Input ── */
function Input({ value, onChange, placeholder, type = "text", hasError }) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      placeholder={placeholder}
      style={{
        width: "100%", boxSizing: "border-box",
        padding: "11px 14px", borderRadius: "8px",
        backgroundColor: focused ? "#f9f8f5" : P.white,
        border: `1.5px solid ${hasError ? "#e05252" : focused ? P.green : P.chrome}`,
        color: P.dark,
        fontFamily: "'ABeeZee', sans-serif", fontSize: "14px",
        outline: "none", transition: "all 0.18s ease",
      }}
    />
  );
}

/* ── Select ── */
function Select({ value, onChange, options }) {
  const [focused, setFocused] = useState(false);
  return (
    <select
      value={value}
      onChange={onChange}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        width: "100%", boxSizing: "border-box",
        padding: "11px 14px", borderRadius: "8px",
        backgroundColor: focused ? "#f9f8f5" : P.white,
        border: `1.5px solid ${focused ? P.green : P.chrome}`,
        color: value ? P.dark : "#999",
        fontFamily: "'ABeeZee', sans-serif", fontSize: "14px",
        outline: "none", cursor: "pointer",
        transition: "all 0.18s ease", appearance: "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%232b5148' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
        backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center",
      }}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  );
}

/* ── Textarea ── */
function Textarea({ value, onChange, placeholder, hasError }) {
  const [focused, setFocused] = useState(false);
  return (
    <textarea
      value={value}
      onChange={onChange}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      placeholder={placeholder}
      rows={4}
      style={{
        width: "100%", boxSizing: "border-box",
        padding: "11px 14px", borderRadius: "8px",
        backgroundColor: focused ? "#f9f8f5" : P.white,
        border: `1.5px solid ${hasError ? "#e05252" : focused ? P.green : P.chrome}`,
        color: P.dark,
        fontFamily: "'ABeeZee', sans-serif", fontSize: "14px",
        outline: "none", resize: "vertical", minHeight: "90px",
        transition: "all 0.18s ease",
      }}
    />
  );
}

/* ══ Modal principal ══ */
export default function ContactModal({ isOpen, onClose }) {
  const [form, setForm]       = useState({ name: "", email: "", phone: "", topic: "", message: "" });
  const [errors, setErrors]   = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [btnHov, setBtnHov]   = useState(false);

  /* Cerrar con Escape */
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    if (isOpen) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  /* Bloquear scroll del body */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  const sanitizeName = (value) => value.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñ\s]/g, "");

  const set = (key) => (e) => {
    const rawValue = e.target.value;
    const value = key === "name" ? sanitizeName(rawValue) : rawValue;
    setForm((f) => ({ ...f, [key]: value }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = "Requerido";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Email inválido";
    if (!form.message.trim()) e.message = "Requerido";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setSubmitted(true);
  };

  const handleReset = () => {
    setForm({ name: "", email: "", phone: "", topic: "", message: "" });
    setSubmitted(false);
    onClose();
  };

  const topics = [
    { value: "",           label: "Selecciona un tema…" },
    { value: "reciclaje",  label: "Reciclaje y clasificación" },
    { value: "puntos",     label: "Puntos y recompensas" },
    { value: "empresa",    label: "Soluciones para empresas" },
    { value: "soporte",    label: "Soporte técnico" },
    { value: "otro",       label: "Otro" },
  ];

  return (
    /* ── Overlay ── */
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        backgroundColor: "rgba(30,57,50,0.55)",
        backdropFilter: "blur(4px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "24px",
        animation: "fadeIn 0.2s ease",
      }}
    >
      {/* ── Caja del modal ── */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%", maxWidth: "520px",
          backgroundColor: P.bg,
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0 24px 64px rgba(0,0,0,0.25)",
          animation: "slideUp 0.25s ease",
        }}
      >
        {/* ── Header verde oscuro ── */}
        <div style={{
          backgroundColor: P.dark,
          padding: "24px 28px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          position: "relative", overflow: "hidden",
        }}>
          {/* Textura */}
          <div aria-hidden="true" style={{
            position: "absolute", inset: 0,
            backgroundImage: "radial-gradient(circle, rgba(212,233,226,0.07) 1px, transparent 1px)",
            backgroundSize: "20px 20px", pointerEvents: "none",
          }} />

          <div style={{ position: "relative" }}>
            {/* Badge online */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              backgroundColor: "rgba(212,233,226,0.1)",
              border: "1px solid rgba(212,233,226,0.2)",
              borderRadius: "999px", padding: "4px 12px",
              marginBottom: "8px",
            }}>
              <div style={{
                width: "6px", height: "6px", borderRadius: "50%",
                backgroundColor: "#4ade80", boxShadow: "0 0 5px #4ade80",
              }} />
              <span style={{ fontFamily: "'ABeeZee', sans-serif", fontSize: "11px", color: P.mint }}>
                En línea · Respuesta &lt; 24 h
              </span>
            </div>
            <div style={{
              fontFamily: "'Cabin Condensed', sans-serif",
              fontWeight: 700, fontSize: "22px", color: P.white,
            }}>
              Oscar E.Bin
            </div>
            <div style={{
              fontFamily: "'ABeeZee', sans-serif",
              fontSize: "12px", color: "rgba(212,233,226,0.5)",
              letterSpacing: "1.5px", textTransform: "uppercase",
            }}>
              Cuéntanos tu caso
            </div>
          </div>

          {/* Botón cerrar */}
          <button
            onClick={onClose}
            style={{
              position: "relative",
              width: "36px", height: "36px", borderRadius: "50%",
              backgroundColor: "rgba(212,233,226,0.1)",
              border: "1px solid rgba(212,233,226,0.2)",
              color: P.mint, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "rgba(212,233,226,0.2)"}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "rgba(212,233,226,0.1)"}
          >
            <IconX />
          </button>
        </div>

        {/* ── Body ── */}
        <div style={{ padding: "28px" }}>
          {submitted ? (
            /* Estado enviado */
            <div style={{
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              gap: "16px", padding: "32px 0", textAlign: "center",
            }}>
              <div style={{
                width: "64px", height: "64px", borderRadius: "50%",
                backgroundColor: `${P.green}18`,
                border: `2px solid ${P.green}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: P.green,
              }}>
                <IconCheck />
              </div>
              <div>
                <div style={{
                  fontFamily: "'Cabin Condensed', sans-serif",
                  fontWeight: 700, fontSize: "22px",
                  color: P.dark, marginBottom: "8px",
                }}>
                  ¡Mensaje enviado!
                </div>
                <div style={{
                  fontFamily: "'ABeeZee', sans-serif",
                  fontSize: "13px", color: P.border,
                  lineHeight: 1.7, maxWidth: "280px",
                }}>
                  Nos pondremos en contacto a{" "}
                  <strong>{form.email}</strong>{" "}
                  en menos de 24 horas hábiles.
                </div>
              </div>
              <button
                onClick={handleReset}
                style={{
                  marginTop: "8px", padding: "10px 32px",
                  borderRadius: "8px",
                  backgroundColor: P.green, border: "none",
                  color: P.white,
                  fontFamily: "'Cabin Condensed', sans-serif",
                  fontWeight: 600, fontSize: "15px",
                  cursor: "pointer", transition: "background 0.2s",
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = P.greenHov}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = P.green}
              >
                Cerrar
              </button>
            </div>
          ) : (
            /* Formulario */
            <>
              {/* Nombre + Teléfono */}
              <div style={{ display: "flex", gap: "12px" }}>
                <div style={{ flex: 1 }}>
                  <Field label="Nombre" icon={<IconUser />} error={errors.name}>
                    <Input value={form.name} onChange={set("name")} placeholder="Tu nombre" hasError={!!errors.name} />
                  </Field>
                </div>
                <div style={{ flex: 1 }}>
                  <Field label="Teléfono" icon={<IconPhone />}>
                    <Input value={form.phone} onChange={set("phone")} placeholder="+507 600-0000" type="tel" />
                  </Field>
                </div>
              </div>

              {/* Email */}
              <Field label="Correo electrónico" icon={<IconMail />} error={errors.email}>
                <Input value={form.email} onChange={set("email")} placeholder="tu@correo.com" type="email" hasError={!!errors.email} />
              </Field>

              {/* Tema */}
              <Field label="Tema" icon={<IconTag />}>
                <Select value={form.topic} onChange={set("topic")} options={topics} />
              </Field>

              {/* Mensaje */}
              <Field label="Mensaje" icon={<IconMsg />} error={errors.message}>
                <Textarea value={form.message} onChange={set("message")} placeholder="Cuéntanos en qué podemos ayudarte…" hasError={!!errors.message} />
              </Field>

              {/* Nota email */}
              <p style={{
                fontFamily: "'ABeeZee', sans-serif",
                fontSize: "11px", color: P.border,
                margin: "0 0 16px 0", lineHeight: 1.6,
              }}>
                También puedes escribirnos a{" "}
                <a href="mailto:contactus@gzgroup.dev" style={{ color: P.green, textDecoration: "none", borderBottom: `1px solid ${P.green}` }}>
                  contactus@gzgroup.dev
                </a>
              </p>

              {/* Botón */}
              <button
                onClick={handleSubmit}
                onMouseEnter={() => setBtnHov(true)}
                onMouseLeave={() => setBtnHov(false)}
                style={{
                  width: "100%", padding: "14px",
                  borderRadius: "10px", border: "none",
                  backgroundColor: btnHov ? P.greenHov : P.green,
                  color: P.white,
                  fontFamily: "'Cabin Condensed', sans-serif",
                  fontWeight: 600, fontSize: "16px", letterSpacing: "0.5px",
                  cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
                  transition: "background 0.2s, transform 0.15s, box-shadow 0.2s",
                  transform: btnHov ? "translateY(-1px)" : "translateY(0)",
                  boxShadow: btnHov ? "0 6px 20px rgba(0,98,65,0.35)" : "0 3px 10px rgba(0,98,65,0.2)",
                }}
              >
                <IconSend />
                Enviar mensaje
              </button>
            </>
          )}
        </div>
      </div>

      {/* Animaciones */}
      <style>{`
        @keyframes fadeIn  { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(24px) } to { opacity: 1; transform: translateY(0) } }
      `}</style>
    </div>
  );
}
