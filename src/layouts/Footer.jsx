import React from "react";

import logoImg from "/src/assets/whiteGZ.svg";
const githubIcon = "https://www.figma.com/api/mcp/asset/3424c3d2-55aa-46ef-b6e1-7b6bddf6aa34";

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#1e3932",
        width: "100%",
        boxSizing: "border-box",
        padding: "48px 24px 48px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "24px",
        }}
      >
        {/* Left: Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          { 
              <img src={logoImg} alt="GZ Group logo" style={{ width: 60, height: 60 }} />
          }
          <div style={{ width: 60, height: 60 }} />
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <span
              style={{
                fontFamily: "'Roboto', sans-serif",
                fontWeight: 700,
                fontSize: "20px",
                lineHeight: "32px",
                color: "#fff",
                whiteSpace: "nowrap",
              }}
            >
              GZ Group
            </span>
            <span
              style={{
                fontFamily: "'Roboto', sans-serif",
                fontWeight: 400,
                fontSize: "14px",
                lineHeight: "20px",
                color: "rgba(255,255,255,0.8)",
                whiteSpace: "nowrap",
              }}
            >
              Development Team
            </span>
          </div>
        </div>

        {/* Center: GitHub link */}
        <a
          href="https://github.com/GZ-GROUP"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            textDecoration: "none",
          }}
        >
          <img
            src={githubIcon}
            alt="GitHub"
            style={{ width: 28, height: 28 }}
          />
          <span
            style={{
              fontFamily: "'Roboto', sans-serif",
              fontWeight: 400,
              fontSize: "16px",
              lineHeight: "24px",
              color: "#fff",
              whiteSpace: "nowrap",
            }}
          >
            github.com/gz-group
          </span>
        </a>

        {/* Right: Copyright */}
        <span
          style={{
            fontFamily: "'Roboto', sans-serif",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "20px",
            color: "rgba(255,255,255,0.8)",
            whiteSpace: "nowrap",
          }}
        >
          © 2026 GZ Group. All rights reserved.
        </span>
      </div>
    </footer>
  );
}