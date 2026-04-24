import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signUp } from "../../services/authService";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const validateInputs = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "El nombre completo es obligatorio.";
    }

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Por favor, ingresa un email válido.";
    }

    if (!password || password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres.";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSuccessMessage("");
    
    if (validateInputs()) {
      setLoading(true);
      try {
        const result = await signUp(name, email, password);
        setSuccessMessage(result.message || "¡Cuenta creada exitosamente!");
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      } catch (error) {
        setErrors({ submit: error.message || "Error al registrarse" });
      } finally {
        setLoading(false);
      }
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 16px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "16px",
    fontFamily: "'ABeeZee', sans-serif",
    boxSizing: "border-box",
    marginBottom: "8px",
  };

  const errorStyle = {
    color: "red",
    fontSize: "14px",
    marginBottom: "16px",
  };

  const successStyle = {
    color: "green",
    fontSize: "14px",
    marginBottom: "16px",
    padding: "12px",
    backgroundColor: "#f0f9f7",
    borderRadius: "4px",
  };

  const buttonStyle = {
    fontFamily: "'Roboto', sans-serif",
    fontWeight: 500,
    fontSize: "18px",
    color: "#fff",
    backgroundColor: "#006241",
    border: "none",
    borderRadius: "10px",
    padding: "16px 32px",
    cursor: "pointer",
    boxShadow:
      "0px 3px 1px rgba(0,0,0,0.2), 0px 2px 2px rgba(0,0,0,0.14), 0px 1px 5px rgba(0,0,0,0.12)",
    transition: "background 0.2s, box-shadow 0.2s",
    whiteSpace: "nowrap",
    width: "100%",
  };

  const linkStyle = {
    color: "#006241",
    textDecoration: "none",
    fontSize: "16px",
  };

  return (
    <section
      style={{
        backgroundColor: "#f2f0eb",
        width: "100%",
        minHeight: "620px",
        boxSizing: "border-box",
        padding: "100px 72px 60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "48px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Left: Text content */}
      <div style={{ maxWidth: "440px", flex: "1 1 440px" }}>
        <h1
          style={{
            fontFamily: "'Cabin Condensed'",
            fontWeight: 600,
            fontSize: "56px",
            lineHeight: 1.15,
            color: "#1e3932",
            margin: "0 0 28px 0",
          }}
        >
          Regístrate
        </h1>

        <p
          style={{
            fontFamily: "'ABeeZee', sans-serif",
            fontWeight: 400,
            fontSize: "20px",
            lineHeight: "30px",
            color: "rgba(0,0,0,0.87)",
            margin: "0 0 48px 0",
          }}
        >
          Únete a nuestra plataforma de reciclaje inteligente. Crea tu cuenta y
          comienza a contribuir al medio ambiente acumulando puntos.
        </p>
      </div>

      {/* Right: Sign up form card */}
      <div
        style={{
          flex: "1 1 434px",
          maxWidth: "434px",
          backgroundColor: "#d4e9e2",
          border: "2px solid #2b5148",
          borderRadius: "8px",
          overflow: "hidden",
          boxSizing: "border-box",
        }}
      >
        {/* Card header */}
        <div
          style={{
            backgroundColor: "#edebe9",
            padding: "20px 32px",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontFamily: "'Cabin Condensed'",
              fontWeight: 600,
              fontSize: "28px",
              color: "#1e3932",
              margin: 0,
            }}
          >
            Crear Cuenta
          </h2>
        </div>

        {/* Form content */}
        <div
          style={{
            backgroundColor: "#fff",
            padding: "32px",
            minHeight: "400px",
          }}
        >
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
            {successMessage && <div style={successStyle}>{successMessage}</div>}
            {errors.submit && <div style={errorStyle}>{errors.submit}</div>}
            <div style={{ marginBottom: "16px" }}>
              <label
                style={{
                  display: "block",
                  fontFamily: "'ABeeZee', sans-serif",
                  fontSize: "16px",
                  color: "#1e3932",
                  marginBottom: "8px",
                }}
              >
                Nombre Completo
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={inputStyle}
                placeholder="Tu nombre completo"
              />
              {errors.name && <div style={errorStyle}>{errors.name}</div>}
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label
                style={{
                  display: "block",
                  fontFamily: "'ABeeZee', sans-serif",
                  fontSize: "16px",
                  color: "#1e3932",
                  marginBottom: "8px",
                }}
              >
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={inputStyle}
                placeholder="tu@email.com"
              />
              {errors.email && <div style={errorStyle}>{errors.email}</div>}
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label
                style={{
                  display: "block",
                  fontFamily: "'ABeeZee', sans-serif",
                  fontSize: "16px",
                  color: "#1e3932",
                  marginBottom: "8px",
                }}
              >
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={inputStyle}
                placeholder="••••••"
              />
              {errors.password && <div style={errorStyle}>{errors.password}</div>}
            </div>

            <div style={{ marginBottom: "24px" }}>
              <label
                style={{
                  display: "block",
                  fontFamily: "'ABeeZee', sans-serif",
                  fontSize: "16px",
                  color: "#1e3932",
                  marginBottom: "8px",
                }}
              >
                Confirmar Contraseña
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={inputStyle}
                placeholder="••••••"
              />
              {errors.confirmPassword && <div style={errorStyle}>{errors.confirmPassword}</div>}
            </div>

            <button
              type="submit"
              style={buttonStyle}
              disabled={loading}
              onMouseEnter={(e) => {
                if (!loading) e.currentTarget.style.backgroundColor = "#004d33";
              }}
              onMouseLeave={(e) => {
                if (!loading) e.currentTarget.style.backgroundColor = "#006241";
              }}
            >
              {loading ? "Registrando..." : "Registrarse"}
            </button>

            <div style={{ textAlign: "center", marginTop: "16px" }}>
              <span style={{ fontSize: "16px", color: "rgba(0,0,0,0.87)" }}>
                ¿Ya tienes cuenta?{" "}
                <Link to="/signin" style={linkStyle}>
                  Inicia Sesión
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}