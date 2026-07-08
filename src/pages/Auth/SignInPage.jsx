import React, { useState } from "react";
import { Link } from "react-router-dom";
import { login } from "../../services/authService";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const validateInputs = () => {
    const newErrors = {};

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Por favor, ingresa un email válido.";
    }

    if (!password || password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSuccessMessage("");
    setErrors({});
    
    if (validateInputs()) {
      setLoading(true);
      try {
        const result = await login(email, password);
        setSuccessMessage(result.message || "¡Inicio de sesión exitoso!");
        
        // Redirigir a home después de 1 segundo
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      } catch (error) {
        setErrors({ submit: error.message || "Error al iniciar sesión" });
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

  const checkboxStyle = {
    marginRight: "8px",
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
          Inicia Sesión
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
          Accede a tu cuenta y continúa contribuyendo al medio ambiente con
          nuestro basurero inteligente. Acumula puntos y haz la diferencia.
        </p>
      </div>

      {/* Right: Sign in form card */}
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
            Iniciar Sesión
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
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={inputStyle}
                placeholder="tu@email.com"
                autoComplete="email"
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
                autoComplete="current-password"
              />
              {errors.password && <div style={errorStyle}>{errors.password}</div>}
            </div>

            <div style={{ marginBottom: "24px", display: "flex", alignItems: "center" }}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={checkboxStyle}
                id="remember"
              />
              <label
                htmlFor="remember"
                style={{
                  fontFamily: "'ABeeZee', sans-serif",
                  fontSize: "16px",
                  color: "#1e3932",
                  cursor: "pointer",
                }}
              >
                Recordarme
              </label>
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
              {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </button>

            <div style={{ textAlign: "center", marginTop: "16px" }}>
              <Link to="#" style={linkStyle}>
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            <div style={{ margin: "24px 0", textAlign: "center", color: "rgba(0,0,0,0.6)" }}>
              o
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <button
                type="button"
                style={{
                  ...buttonStyle,
                  backgroundColor: "#db4437",
                  color: "#fff",
                }}
                onClick={() => alert("Iniciar sesión con Google")}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#c23321";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#db4437";
                }}
              >
                Iniciar sesión con Google
              </button>

              <button
                type="button"
                style={{
                  ...buttonStyle,
                  backgroundColor: "#4267b2",
                  color: "#fff",
                }}
                onClick={() => alert("Iniciar sesión con Facebook")}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#365899";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#4267b2";
                }}
              >
                Iniciar sesión con Facebook
              </button>
            </div>

            <div style={{ textAlign: "center", marginTop: "16px" }}>
              <span style={{ fontSize: "16px", color: "rgba(0,0,0,0.87)" }}>
                ¿No tienes cuenta?{" "}
                <Link to="/signup" style={linkStyle}>
                  Regístrate
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}