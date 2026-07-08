import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import logoImg from "/src/assets/mainOscar.svg";
import { getStoredUser, isAuthenticated, logout } from "../services/authService";
import ContactModal from "./ContactModal";

export default function Navbar() {
  const [user, setUser]           = useState(null);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [contactOpen, setContactOpen] = useState(false);   // ← modal
  const navigate  = useNavigate();
  const menuRef   = useRef(null);

  useEffect(() => { setUser(getStoredUser()); }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => { logout(); setMenuOpen(false); navigate("/signin"); };

  const isAuth      = isAuthenticated();
  const displayName = user?.name || user?.username || "Usuario";

  const navLinkStyle = {
    fontFamily: "'ABeeZee', sans-serif",
    fontStyle: "normal", fontSize: "18px",
    color: "rgba(0,0,0,0.87)", textDecoration: "none", whiteSpace: "nowrap",
  };

  return (
    <>
      <nav style={{
        backgroundColor: "#d4e9e2",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "16px 48px", height: "83.5px",
        width: "100%", boxSizing: "border-box", position: "relative",
      }}>
        {/* Logo */}
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <img src={logoImg} alt="Oscar logo" style={{ width: 48, height: 48, objectFit: "contain" }} />
            <span style={{
              fontFamily: "'Cabin Condensed', serif", fontWeight: 700,
              fontSize: "24px", color: "#1e3932",
              textTransform: "uppercase", letterSpacing: "0.05em", whiteSpace: "nowrap",
            }}>
              Oscar
            </span>
          </div>
        </Link>

        {/* Links */}
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          {["¿Cómo Funciona?", "Características"].map((link) => (
            <a key={link} href="#" style={navLinkStyle}
              onMouseEnter={(e) => (e.target.style.color = "#1e3932")}
              onMouseLeave={(e) => (e.target.style.color = "rgba(0,0,0,0.87)")}
            >{link}</a>
          ))}

          {/* Contáctanos → abre modal */}
          <button
            onClick={() => setContactOpen(true)}
            style={{
              ...navLinkStyle,
              background: "none", border: "none",
              cursor: "pointer", padding: 0,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#1e3932")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(0,0,0,0.87)")}
          >
            Contáctanos
          </button>

          <Link to="/leaderboard" style={navLinkStyle}>Ranking</Link>

          {isAuth ? (
            <div ref={menuRef} style={{ position: "relative" }}>
              <button
                type="button"
                onClick={() => setMenuOpen((o) => !o)}
                style={{
                  fontFamily: "'ABeeZee', sans-serif", fontWeight: 600,
                  fontSize: "16px", color: "#1e3932",
                  background: "transparent", border: "2px solid #1e3932",
                  borderRadius: "4px", padding: "10px 24px",
                  cursor: "pointer", whiteSpace: "nowrap",
                }}
              >
                Hola {displayName}
              </button>

              {menuOpen && (
                <div style={{
                  position: "absolute", right: 0, top: "100%", marginTop: "10px",
                  background: "#ffffff", border: "1px solid #c4c4c4",
                  borderRadius: "10px", boxShadow: "0 12px 24px rgba(0,0,0,0.12)",
                  minWidth: "180px", zIndex: 20, overflow: "hidden",
                }}>
                  <Link to="/profile" onClick={() => setMenuOpen(false)} style={{
                    display: "block", padding: "12px 18px", color: "#1e3932",
                    textDecoration: "none", fontFamily: "'ABeeZee', sans-serif", fontSize: "15px",
                  }}>
                    Ver perfil
                  </Link>
                  <button type="button" onClick={handleLogout} style={{
                    width: "100%", padding: "12px 18px", border: "none",
                    background: "transparent", textAlign: "left", cursor: "pointer",
                    fontFamily: "'ABeeZee', sans-serif", fontSize: "15px", color: "#d32f2f",
                  }}>
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/signup" style={{
              fontFamily: "'ABeeZee', sans-serif", fontWeight: 500, fontSize: "18px",
              color: "#1e3932", background: "transparent", border: "2px solid #1e3932",
              borderRadius: "4px", padding: "10px 24px", cursor: "pointer",
              whiteSpace: "nowrap", transition: "background 0.2s, color 0.2s",
              textDecoration: "none", display: "inline-block",
            }}
              onMouseEnter={(e) => { e.target.style.background = "#1e3932"; e.target.style.color = "#fff"; }}
              onMouseLeave={(e) => { e.target.style.background = "transparent"; e.target.style.color = "#1e3932"; }}
            >
              Registrate
            </Link>
          )}
        </div>
      </nav>

      {/* Modal de contacto */}
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}