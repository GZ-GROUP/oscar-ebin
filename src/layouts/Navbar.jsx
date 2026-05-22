import React from "react";
import { Link } from "react-router-dom";

import logoImg from "/src/assets/mainOscar.svg";


export default function Navbar() {
  return (
    <nav
      style={{
        backgroundColor: "#d4e9e2",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 48px",
        height: "83.5px",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* Logo + Brand */}
      <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <img
            src={logoImg}
            alt="Oscar logo"
            style={{ width: 48, height: 48, objectFit: "contain" }}
          />
          <span
            style={{
              fontFamily: "'Cabin Condensed', serif",
              fontWeight: 700,
              fontSize: "24px",
              color: "#1e3932",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              whiteSpace: "nowrap",
            }}
          >
            Oscar
          </span>
        </div>
      </Link>

      {/* Nav Links + CTA */}
      <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
        {["¿Cómo Funciona?", "Características", "Contáctanos"].map((link) => (
          <a
            key={link}
            href="#"
            style={{
              fontFamily: "'ABeeZee', sans-serif",
              fontStyle: "normal",
              fontSize: "18px",
              color: "rgba(0,0,0,0.87)",
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#1e3932")}
            onMouseLeave={(e) => (e.target.style.color = "rgba(0,0,0,0.87)")}
          >
            {link}
          </a>
        ))}

        <Link
          to="/signup"
          style={{
            fontFamily: "'ABeezee', sans-serif",
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
          onMouseEnter={(e) => {
            e.target.style.background = "#1e3932";
            e.target.style.color = "#fff";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "transparent";
            e.target.style.color = "#1e3932";
          }}
        >
          Registrate
        </Link>
      </div>
    </nav>
  );
}