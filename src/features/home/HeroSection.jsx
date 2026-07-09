
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import oscarImg from "/src/assets/grouch.png";

export default function HeroSection() {
  const [isNarrow, setIsNarrow] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 880px)");
    const handleResize = (event) => setIsNarrow(event.matches);
    handleResize(mediaQuery);
    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  return (
    <section
      style={{
        backgroundColor: "#f2f0eb",
        width: "100%",
        minHeight: isNarrow ? "auto" : "620px",
        boxSizing: "border-box",
        padding: isNarrow ? "60px 24px 36px" : "100px 72px 60px",
        display: "flex",
        flexDirection: isNarrow ? "column" : "row",
        alignItems: isNarrow ? "flex-start" : "center",
        justifyContent: "space-between",
        gap: isNarrow ? "28px" : "48px",
        position: "relative",
        overflow: "visible",
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
          Reciclaje Inteligente para un Futuro Sostenible
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
          Clasifica residuos automáticamente, acumula puntos de reciclaje y
          contribuye al medio ambiente. Una plataforma que conecta usuarios,
          empresas y sostenibilidad.
        </p>
        <Link
          to="/shop"
          style={{
            textDecoration: "none",
          }}
        >
          <button
            style={{
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
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#004d33";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#006241";
          }}
          
        >
          Obten un Oscar
        </button>
        </Link>
      </div>

      {/* Right: Browser mockup card */}
      <div
        style={{
          flex: "1 1 434px",
          width: isNarrow ? "100%" : "434px",
          maxWidth: "100%",
          backgroundColor: "#d4e9e2",
          border: "2px solid #2b5148",
          borderRadius: "8px",
          overflow: "hidden",
          boxSizing: "border-box",
          marginTop: isNarrow ? "0" : undefined,
        }}
      >
        {/* Browser chrome bar */}
        <div
          style={{
            backgroundColor: "#edebe9",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px 16px",
            height: "36px",
            boxSizing: "border-box",
          }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: 12,
                height: 12,
                borderRadius: "6px",
                border: "2px solid #2b5148",
                boxSizing: "border-box",
              }}
            />
          ))}
        </div>

        {/* Card content */}
        <div
          style={{
            backgroundColor: "#fff",
            padding: "32px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "290px",
          }}
        >
          <img
            src={oscarImg}
            alt="Oscar the Grouch in a trash can"
            style={{
              width: "100%",
              maxWidth: "220px",
              borderRadius: "31px",
              objectFit: "cover",
            }}
          />
        </div>
      </div>
    </section>
  );
}

