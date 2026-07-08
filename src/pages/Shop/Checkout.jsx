import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaLock, FaArrowLeft, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

// ─── Font constants ───────────────────────────────────────────────────────────
const FONT_HEADER = "'Cabin Condensed', sans-serif";
const FONT_BODY   = "'ABeeZee', sans-serif";
const FONT_MONO   = "'Courier New', monospace";

// ─── Luhn algorithm ────────────────────────────────────────────────────────────
// Validates a card number using the Luhn (mod 10) checksum.
// Returns true when the digits form a valid Luhn sequence.
function luhnCheck(cardNumber) {
  const digits = String(cardNumber).replace(/\D/g, "");
  if (digits.length < 12) return false;

  let sum = 0;
  let shouldDouble = false;

  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits[i], 10);

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
}

// ─── Toast ─────────────────────────────────────────────────────────────────────
function Toast({ message, visible }) {
  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        position: "fixed",
        bottom: visible ? "32px" : "-80px",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        backgroundColor: "#004d33",
        color: "#fff",
        padding: "16px 24px",
        borderRadius: "14px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
        fontFamily: FONT_BODY,
        fontSize: "15px",
        fontWeight: 600,
        opacity: visible ? 1 : 0,
        transition: "bottom 0.35s ease, opacity 0.35s ease",
        zIndex: 1000,
        pointerEvents: "none",
        whiteSpace: "nowrap",
      }}
    >
      <FaCheckCircle size={18} color="#5fe0a8" />
      {message}
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function FormField({ label, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px", width: "100%" }}>
      <label style={{ fontFamily: FONT_BODY, fontWeight: 600, fontSize: "14px", color: "#2b5148" }}>
        {label}
      </label>
      {children}
    </div>
  );
}

function TextInput({ placeholder, type = "text", mono = false, value, onChange, onBlur, error = false }) {
  const [focused, setFocused] = useState(false);
  const borderColor = error ? "#d92d20" : focused ? "#006241" : "transparent";
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onFocus={() => setFocused(true)}
      onBlur={(e) => { setFocused(false); onBlur?.(e); }}
      style={{
        fontFamily: mono ? FONT_MONO : FONT_BODY,
        fontSize: "16px",
        color: "#004d33",
        backgroundColor: "#edebe9",
        border: `2px solid ${borderColor}`,
        borderRadius: "14px",
        padding: "14px 18px",
        height: "52px",
        width: "100%",
        boxSizing: "border-box",
        outline: "none",
        transition: "border-color 0.15s",
      }}
    />
  );
}

function SelectInput({ value, onChange }) {
  const [focused, setFocused] = useState(false);
  return (
    <select
      value={value}
      onChange={onChange}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        fontFamily: FONT_BODY,
        fontSize: "16px",
        color: value ? "#004d33" : "rgba(43,81,72,0.4)",
        backgroundColor: "#edebe9",
        border: `2px solid ${focused ? "#006241" : "transparent"}`,
        borderRadius: "14px",
        padding: "14px 18px",
        height: "52px",
        width: "100%",
        boxSizing: "border-box",
        outline: "none",
        appearance: "none",
        cursor: "pointer",
        transition: "border-color 0.15s",
      }}
    >
      <option value="">Seleccionar país...</option>
      <option>Panamá</option>
      <option>México</option>
      <option>Colombia</option>
      <option>Argentina</option>
      <option>Costa Rica</option>
      <option>Chile</option>
      <option>Perú</option>
      <option>España</option>
      <option>Estados Unidos</option>
    </select>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();

  // Receives selected plan from Shop via: navigate("/checkout", { state: { plan } })
  const plan = location.state?.plan ?? {
    name: "Plan Básico",
    price: "$29",
    features: [
      "1 máquina Oscar incluida",
      "Dashboard de actividad básico",
      "Hasta 500 reciclajes/mes",
      "Reportes mensuales",
      "Soporte por email",
      "Historial de puntos de usuarios",
      "Almacenamiento de datos 3 meses",
    ],
  };

  const [form, setForm] = useState({
    nombre: "", email: "", direccion: "", ciudad: "", pais: "",
    cardNumber: "", cardName: "", expiry: "", cvv: "",
  });

  const [cardTouched, setCardTouched] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);

  const cardIsValid = luhnCheck(form.cardNumber);
  const showCardError = cardTouched && form.cardNumber.length > 0 && !cardIsValid;

  const set = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = () => {
    setCardTouched(true);
    if (!cardIsValid || isProcessing) return;

    setIsProcessing(true);

    // Mock payment processing delay.
    setTimeout(() => {
      setIsProcessing(false);
      setToastVisible(true);
    }, 1200);
  };

  // Once the success toast shows, redirect home after a short beat.
  useEffect(() => {
    if (!toastVisible) return;
    const redirectTimer = setTimeout(() => navigate("/"), 2000);
    return () => clearTimeout(redirectTimer);
  }, [toastVisible, navigate]);

  const displayNumber = form.cardNumber
    ? form.cardNumber.replace(/\s/g, "").replace(/(.{4})/g, "$1 ").trim()
    : "•••• •••• •••• ••••";
  const displayName   = form.cardName  || "NOMBRE APELLIDO";
  const displayExpiry = form.expiry    || "MM/AA";

  return (
    <div style={{ backgroundColor: "#f2f0eb", minHeight: "100vh", width: "100%", boxSizing: "border-box" }}>

      {/* ── Body ── */}
      <div style={{ maxWidth: "980px", margin: "0 auto", padding: "40px 24px 80px" }}>

        {/* Back button */}
        <button
          onClick={() => navigate("/shop")}
          style={{
            display: "flex", alignItems: "center", gap: "8px",
            background: "none", border: "none", cursor: "pointer",
            fontFamily: FONT_BODY, fontWeight: 600, fontSize: "16px", color: "#006241",
            padding: 0, marginBottom: "32px",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          <FaArrowLeft size={16} />
          Volver a Planes
        </button>

        {/* ── Two-column layout ── */}
        <div style={{ display: "flex", gap: "32px", alignItems: "flex-start", flexWrap: "wrap" }}>

          {/* ── LEFT: Forms ── */}
          <div style={{ flex: "1 1 520px", minWidth: 0, display: "flex", flexDirection: "column", gap: "24px" }}>

            {/* Personal info */}
            <div style={{ backgroundColor: "#fff", borderRadius: "16px", padding: "32px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
              <h2 style={{ fontFamily: FONT_HEADER, fontWeight: 700, fontSize: "20px", color: "#004d33", margin: "0 0 24px" }}>
                Información Personal
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <FormField label="Nombre completo">
                  <TextInput placeholder="María García López" value={form.nombre} onChange={set("nombre")} />
                </FormField>
                <FormField label="Correo electrónico">
                  <TextInput placeholder="maria@empresa.com" type="email" value={form.email} onChange={set("email")} />
                </FormField>
                <FormField label="Dirección">
                  <TextInput placeholder="Av. Reforma 123, Col. Centro" value={form.direccion} onChange={set("direccion")} />
                </FormField>
                <div style={{ display: "flex", gap: "16px" }}>
                  <FormField label="Ciudad">
                    <TextInput placeholder="Ciudad de México" value={form.ciudad} onChange={set("ciudad")} />
                  </FormField>
                  <FormField label="País">
                    <SelectInput value={form.pais} onChange={set("pais")} />
                  </FormField>
                </div>
              </div>
            </div>

            {/* Payment info */}
            <div style={{ backgroundColor: "#fff", borderRadius: "16px", padding: "32px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
                <FaLock size={18} color="#006241" />
                <h2 style={{ fontFamily: FONT_HEADER, fontWeight: 700, fontSize: "20px", color: "#004d33", margin: 0 }}>
                  Información de Pago
                </h2>
              </div>

              {/* Live card preview */}
              <div style={{
                borderRadius: "16px", padding: "24px", marginBottom: "24px",
                position: "relative", overflow: "hidden", height: "200px",
                background: "linear-gradient(167deg, #006241 0%, #004d33 100%)",
                boxSizing: "border-box",
              }}>
                <div style={{ position: "absolute", width: 192, height: 192, borderRadius: "50%", background: "rgba(255,255,255,0.05)", top: -96, right: 0 }} />
                <div style={{ position: "absolute", width: 128, height: 128, borderRadius: "50%", background: "rgba(255,255,255,0.05)", bottom: -40, left: -32 }} />
                <div style={{ position: "relative", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontFamily: FONT_BODY, fontSize: "13px", color: "rgba(212,233,226,0.7)", letterSpacing: "1.4px", textTransform: "uppercase" }}>
                      Oscar Pay
                    </span>
                    <div style={{ display: "flex", gap: "4px" }}>
                      <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(255,255,255,0.3)" }} />
                      <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(255,255,255,0.5)", marginLeft: -12 }} />
                    </div>
                  </div>
                  <p style={{ fontFamily: FONT_MONO, fontSize: "22px", color: "#fff", letterSpacing: "4px", margin: 0 }}>
                    {displayNumber}
                  </p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                    <div>
                      <p style={{ fontFamily: FONT_BODY, fontSize: "11px", color: "rgba(212,233,226,0.6)", letterSpacing: "1.2px", textTransform: "uppercase", margin: "0 0 4px" }}>Titular</p>
                      <p style={{ fontFamily: FONT_BODY, fontSize: "15px", color: "#fff", margin: 0, textTransform: "uppercase" }}>{displayName}</p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <p style={{ fontFamily: FONT_BODY, fontSize: "11px", color: "rgba(212,233,226,0.6)", letterSpacing: "1.2px", textTransform: "uppercase", margin: "0 0 4px" }}>Vence</p>
                      <p style={{ fontFamily: FONT_MONO, fontSize: "15px", color: "#fff", margin: 0 }}>{displayExpiry}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card fields */}
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <FormField label="Número de tarjeta">
                  <TextInput placeholder="1234 5678 9012 3456" mono value={form.cardNumber}
                    error={showCardError}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "").slice(0, 16);
                      setForm((p) => ({ ...p, cardNumber: val }));
                    }}
                    onBlur={() => setCardTouched(true)}
                  />
                  {showCardError && (
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <FaExclamationCircle size={13} color="#d92d20" />
                      <span style={{ fontFamily: FONT_BODY, fontSize: "13px", color: "#d92d20" }}>
                        Número de tarjeta inválido. Verifícalo e intenta de nuevo.
                      </span>
                    </div>
                  )}
                </FormField>
                <FormField label="Titular de la tarjeta">
                  <TextInput placeholder="NOMBRE COMO APARECE EN LA TARJETA" value={form.cardName} onChange={set("cardName")} />
                </FormField>
                <div style={{ display: "flex", gap: "16px" }}>
                  <FormField label="Fecha de vencimiento">
                    <TextInput placeholder="MM/AA" mono value={form.expiry}
                      onChange={(e) => {
                        let val = e.target.value.replace(/\D/g, "").slice(0, 4);
                        if (val.length > 2) val = val.slice(0, 2) + "/" + val.slice(2);
                        setForm((p) => ({ ...p, expiry: val }));
                      }}
                    />
                  </FormField>
                  <FormField label="CVV">
                    <TextInput placeholder="•••" type="password" mono value={form.cvv}
                      onChange={(e) => setForm((p) => ({ ...p, cvv: e.target.value.replace(/\D/g, "").slice(0, 4) }))}
                    />
                  </FormField>
                </div>
              </div>
            </div>

            {/* Confirm button */}
            <button
              onClick={handleSubmit}
              disabled={isProcessing}
              style={{
                width: "100%", backgroundColor: "#006241", color: "#fff", border: "none",
                borderRadius: "16px", padding: "18px", cursor: isProcessing ? "default" : "pointer",
                fontFamily: FONT_HEADER, fontWeight: 700, fontSize: "18px",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
                boxShadow: "0 10px 20px rgba(0,98,65,0.3)",
                opacity: isProcessing ? 0.75 : 1,
                transition: "background 0.2s, box-shadow 0.2s, opacity 0.2s",
              }}
              onMouseEnter={(e) => { if (isProcessing) return; e.currentTarget.style.backgroundColor = "#004d33"; e.currentTarget.style.boxShadow = "0 14px 24px rgba(0,98,65,0.4)"; }}
              onMouseLeave={(e) => { if (isProcessing) return; e.currentTarget.style.backgroundColor = "#006241"; e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,98,65,0.3)"; }}
            >
              <FaLock size={16} />
              {isProcessing ? "Procesando pago..." : `Confirmar y Pagar ${plan.price}/mes`}
            </button>

            <p style={{ fontFamily: FONT_BODY, fontSize: "13px", color: "rgba(43,81,72,0.6)", textAlign: "center", margin: 0 }}>
              Al confirmar aceptas nuestros{" "}
              <a href="#" style={{ color: "#006241" }}>Términos de Servicio</a>
              {" "}y{" "}
              <a href="#" style={{ color: "#006241" }}>Política de Privacidad</a>.
            </p>
          </div>

          {/* ── RIGHT: Order summary ── */}
          <div style={{ flex: "0 0 320px", minWidth: "280px" }}>
            <div style={{ backgroundColor: "#fff", borderRadius: "16px", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>

              {/* Summary header */}
              <div style={{ background: "linear-gradient(170deg, #006241 0%, #004d33 100%)", padding: "24px 32px" }}>
                <p style={{ fontFamily: FONT_BODY, fontSize: "13px", color: "rgba(212,233,226,0.7)", letterSpacing: "1.4px", textTransform: "uppercase", margin: "0 0 4px" }}>
                  Resumen del pedido
                </p>
                <p style={{ fontFamily: FONT_HEADER, fontWeight: 700, fontSize: "24px", color: "#fff", margin: "0 0 12px" }}>
                  {plan.name}
                </p>
                <div style={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
                  <span style={{ fontFamily: FONT_HEADER, fontWeight: 700, fontSize: "36px", color: "#fff" }}>{plan.price}</span>
                  <span style={{ fontFamily: FONT_BODY, fontSize: "16px", color: "rgba(212,233,226,0.7)" }}>/mes</span>
                </div>
              </div>

              {/* Includes + totals */}
              <div style={{ padding: "24px 32px" }}>
                <p style={{ fontFamily: FONT_BODY, fontSize: "12px", color: "rgba(43,81,72,0.5)", letterSpacing: "1.2px", textTransform: "uppercase", margin: "0 0 16px" }}>
                  Incluye
                </p>
                <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                  {plan.features.map((f) => (
                    <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                      <div style={{ width: 20, height: 20, borderRadius: "50%", backgroundColor: "#d4e9e2", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                        <FaCheckCircle size={11} color="#006241" />
                      </div>
                      <span style={{ fontFamily: FONT_BODY, fontSize: "14px", color: "#2b5148", lineHeight: "20px" }}>{f}</span>
                    </li>
                  ))}
                </ul>

                <div style={{ borderTop: "1px solid #d4e9e2", marginTop: "24px", paddingTop: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontFamily: FONT_BODY, fontSize: "14px", color: "#2b5148" }}>Subtotal</span>
                    <span style={{ fontFamily: FONT_BODY, fontSize: "14px", color: "#2b5148" }}>{plan.price}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontFamily: FONT_BODY, fontSize: "14px", color: "#2b5148" }}>IVA (16%)</span>
                    <span style={{ fontFamily: FONT_BODY, fontSize: "14px", color: "#2b5148" }}>Incluido</span>
                  </div>
                  <div style={{ borderTop: "1px solid #d4e9e2", paddingTop: "10px", display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontFamily: FONT_HEADER, fontWeight: 700, fontSize: "18px", color: "#004d33" }}>Total mensual</span>
                    <span style={{ fontFamily: FONT_HEADER, fontWeight: 700, fontSize: "18px", color: "#004d33" }}>{plan.price}</span>
                  </div>
                </div>

                <div style={{ backgroundColor: "rgba(212,233,226,0.5)", borderRadius: "14px", padding: "14px 16px", marginTop: "16px", display: "flex", alignItems: "flex-start", gap: "10px" }}>
                  <FaLock size={14} color="#2b5148" style={{ marginTop: 2, flexShrink: 0 }} />
                  <p style={{ fontFamily: FONT_BODY, fontSize: "12px", color: "#2b5148", margin: 0, lineHeight: "18px" }}>
                    Tu información está protegida con cifrado de 256 bits. Cancela cuando quieras, sin penalizaciones.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <Toast message={`¡Pago exitoso! Redirigiendo a inicio...`} visible={toastVisible} />
    </div>
  );
}