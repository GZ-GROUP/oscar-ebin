import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import logoImg from "/src/assets/mainOscar.svg";
import { getStoredUser, isAuthenticated, logout } from "../services/authService";
import ContactModal from "./ContactModal";

export default function Navbar() {
  const [user, setUser]               = useState(null);
  const [menuOpen, setMenuOpen]       = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [isMobile, setIsMobile]       = useState(false);
  const navigate = useNavigate();
  const menuRef  = useRef(null);

  useEffect(() => { setUser(getStoredUser()); }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const updateMobile = () => setIsMobile(window.innerWidth <= 768);
    updateMobile();
    window.addEventListener("resize", updateMobile);
    return () => window.removeEventListener("resize", updateMobile);
  }, []);

  const handleLogout = () => { logout(); setMenuOpen(false); navigate("/signin"); };

  const isAuth      = isAuthenticated();
  const displayName = user?.name || user?.username || "Usuario";

  const navLinkStyle = {
    fontFamily: "'ABeeZee', sans-serif",
    fontStyle: "normal",
    fontSize: "18px",
    color: "rgba(0,0,0,0.87)",
    textDecoration: "none",
    whiteSpace: "nowrap",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 0,
  };

  const hoverOn  = (e) => (e.currentTarget.style.color = "#1e3932");
  const hoverOff = (e) => (e.currentTarget.style.color = "rgba(0,0,0,0.87)");

  return (
    <>
      <nav style={{
        backgroundColor: "#d4e9e2",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: isMobile ? "12px 18px" : "16px 48px",
        height: isMobile ? "auto" : "83.5px",
        width: "100%",
        boxSizing: "border-box",
        position: "relative",
      }}>

        {/* ── Logo + Brand ── */}
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <img
              src={logoImg}
              alt="Oscar logo"
              style={{ width: 48, height: 48, objectFit: "contain" }}
            />
            <span style={{
              fontFamily: "'Cabin Condensed', serif",
              fontWeight: 700,
              fontSize: "24px",
              color: "#1e3932",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              whiteSpace: "nowrap",
            }}>
              Oscar
            </span>
          </div>
        </Link>

        {/* ── Links ── */}
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          {isMobile ? (
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "12px",
                background: "#1e3932",
                color: "#fff",
                border: "none",
                cursor: "pointer",
                display: "grid",
                placeItems: "center",
                fontSize: "24px",
                lineHeight: 1,
              }}
            >
              ☰
            </button>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
              {/* ¿Cómo Funciona? → scroll a #how-to */}
              <a
                href="/#how-to"
                style={navLinkStyle}
                onMouseEnter={hoverOn}
                onMouseLeave={hoverOff}
              >
                ¿Cómo Funciona?
              </a>

              {/* Características → scroll a #characteristics */}
              <a
                href="/#characteristics"
                style={navLinkStyle}
                onMouseEnter={hoverOn}
                onMouseLeave={hoverOff}
              >
                Características
              </a>

              {/* Contáctanos → abre modal */}
              <button
                onClick={() => setContactOpen(true)}
                style={navLinkStyle}
                onMouseEnter={hoverOn}
                onMouseLeave={hoverOff}
              >
                Contáctanos
              </button>

              {/* Ranking → página aparte */}
              <Link
                to="/leaderboard"
                style={navLinkStyle}
                onMouseEnter={hoverOn}
                onMouseLeave={hoverOff}
              >
                Ranking
              </Link>

              {/* ── Auth ── */}
              {isAuth ? (
                <div ref={menuRef} style={{ position: "relative" }}>
                  <button
                    type="button"
                    onClick={() => setMenuOpen((o) => !o)}
                    style={{
                      fontFamily: "'ABeeZee', sans-serif",
                      fontWeight: 600,
                      fontSize: "16px",
                      color: "#1e3932",
                      background: "transparent",
                      border: "2px solid #1e3932",
                      borderRadius: "4px",
                      padding: "10px 24px",
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Hola {displayName}
                  </button>

                  {menuOpen && (
                    <div style={{
                      position: "absolute",
                      right: 0,
                      top: "100%",
                      marginTop: "10px",
                      background: "#ffffff",
                      border: "1px solid #c4c4c4",
                      borderRadius: "10px",
                      boxShadow: "0 12px 24px rgba(0,0,0,0.12)",
                      minWidth: "180px",
                      zIndex: 20,
                      overflow: "hidden",
                    }}>
                      <Link
                        to="/profile"
                        onClick={() => setMenuOpen(false)}
                        style={{
                          display: "block",
                          padding: "12px 18px",
                          color: "#1e3932",
                          textDecoration: "none",
                          fontFamily: "'ABeeZee', sans-serif",
                          fontSize: "15px",
                        }}
                      >
                        Ver perfil
                      </Link>
                      <button
                        type="button"
                        onClick={handleLogout}
                        style={{
                          width: "100%",
                          padding: "12px 18px",
                          border: "none",
                          background: "transparent",
                          textAlign: "left",
                          cursor: "pointer",
                          fontFamily: "'ABeeZee', sans-serif",
                          fontSize: "15px",
                          color: "#d32f2f",
                        }}
                      >
                        Cerrar sesión
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/signup"
                  style={{
                    fontFamily: "'ABeeZee', sans-serif",
                    fontWeight: 500,
                    fontSize: "18px",
                    color: "#1e3932",
                    background: "transparent",
                    border: "2px solid #1e3932",
                    borderRadius: "4px",
                    padding: "10px 24px",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    transition: "background 0.2s, color 0.2s",
                    textDecoration: "none",
                    display: "inline-block",
                  }}
                  onMouseEnter={(e) => { e.target.style.background = "#1e3932"; e.target.style.color = "#fff"; }}
                  onMouseLeave={(e) => { e.target.style.background = "transparent"; e.target.style.color = "#1e3932"; }}
                >
                  Registrate
                </Link>
              )}
            </div>
          )}
        </div>
      </nav>

      {isMobile && menuOpen && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0, 0, 0, 0.35)",
          zIndex: 90,
          display: "flex",
          justifyContent: "flex-end",
        }}>
          <div style={{
            width: "280px",
            maxWidth: "100%",
            height: "100%",
            background: "#fff",
            padding: "24px",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            gap: "22px",
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "12px",
            }}>
              <span style={{
                fontFamily: "'ABeeZee', sans-serif",
                fontWeight: 700,
                fontSize: "18px",
                color: "#1e3932",
              }}>
                Menú
              </span>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Cerrar menú"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "12px",
                  border: "1px solid rgba(30,57,50,0.2)",
                  background: "#f2f0eb",
                  color: "#1e3932",
                  cursor: "pointer",
                  fontSize: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 0,
                }}
              >
                ×
              </button>
            </div>

            <a
              href="/#how-to"
              onClick={() => setMenuOpen(false)}
              style={{
                ...navLinkStyle,
                width: "100%",
                textAlign: "left",
                padding: "12px 0",
                borderBottom: "1px solid rgba(0,0,0,0.08)",
              }}
            >
              ¿Cómo Funciona?
            </a>

            <a
              href="/#characteristics"
              onClick={() => setMenuOpen(false)}
              style={{
                ...navLinkStyle,
                width: "100%",
                textAlign: "left",
                padding: "12px 0",
                borderBottom: "1px solid rgba(0,0,0,0.08)",
              }}
            >
              Características
            </a>

            <button
              type="button"
              onClick={() => { setMenuOpen(false); setContactOpen(true); }}
              style={{
                ...navLinkStyle,
                width: "100%",
                textAlign: "left",
                padding: "12px 0",
                borderBottom: "1px solid rgba(0,0,0,0.08)",
                background: "transparent",
              }}
            >
              Contáctanos
            </button>

            <Link
              to="/leaderboard"
              onClick={() => setMenuOpen(false)}
              style={{
                ...navLinkStyle,
                width: "100%",
                textAlign: "left",
                padding: "12px 0",
                borderBottom: "1px solid rgba(0,0,0,0.08)",
              }}
            >
              Ranking
            </Link>

            {isAuth ? (
              <>
                <div style={{ marginTop: "12px", color: "#444", fontFamily: "'ABeeZee', sans-serif", fontWeight: 700 }}>
                  Hola {displayName}
                </div>
                <Link
                  to="/profile"
                  onClick={() => setMenuOpen(false)}
                  style={{
                    ...navLinkStyle,
                    width: "100%",
                    textAlign: "left",
                    padding: "12px 0",
                    borderBottom: "1px solid rgba(0,0,0,0.08)",
                  }}
                >
                  Ver perfil
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  style={{
                    ...navLinkStyle,
                    width: "100%",
                    textAlign: "left",
                    padding: "12px 0",
                    color: "#d32f2f",
                    background: "transparent",
                    border: "none",
                  }}
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <Link
                to="/signup"
                onClick={() => setMenuOpen(false)}
                style={{
                  ...navLinkStyle,
                  width: "100%",
                  textAlign: "center",
                  padding: "12px 0",
                  border: "2px solid #1e3932",
                  borderRadius: "10px",
                  marginTop: "8px",
                }}
              >
                Registrate
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Modal de contacto */}
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}