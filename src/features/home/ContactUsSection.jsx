function ContactUsSection() {
  return (
    <section
      style={{
        backgroundColor: "#D4D4D4",
        minHeight: "380px",
        display: "flex",
        alignItems: "center",
        padding: "80px 90px",
        boxSizing: "border-box",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle background texture dots */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage:
            "radial-gradient(circle, #aaa 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          opacity: 0.15,
          pointerEvents: "none",
        }}
      />

      {/* LEFT — Text content */}
      <div style={{ flex: "1 1 50%", position: "relative", zIndex: 1 }}>
        <p
          style={{
            fontSize: "11px",
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: "#666",
            fontFamily: "'Helvetica Neue', sans-serif",
            marginBottom: "16px",
          }}
        >
          GZ Group · Tecnología
        </p>

        <h2
          style={{
            fontSize: "clamp(36px, 5vw, 54px)",
            fontWeight: "400",
            color: "#111",
            margin: "0 0 24px 0",
            letterSpacing: "-1px",
            lineHeight: "1.05",
            fontFamily: "'Georgia', serif",
          }}
        >
          Contáctanos
        </h2>

        <p
          style={{
            fontSize: "14.5px",
            color: "#444",
            lineHeight: "1.75",
            margin: "0 0 44px 0",
            maxWidth: "400px",
            fontFamily: "'Helvetica Neue', sans-serif",
            fontWeight: "300",
          }}
        >
          Desarrollamos soluciones tecnológicas a medida para empresas que buscan
          escalar. Cuéntanos tu proyecto y te respondemos en menos de 24 horas.
        </p>

        {/* Contact info — email & phone only */}
        <div style={{ display: "flex", gap: "48px" }}>
          {[
            {
              label: "Email",
              value: "contacto@gzgroup.com",
              href: "mailto:contacto@gzgroup.com",
            },
            {
              label: "Teléfono",
              value: "+507 600-0000",
              href: "tel:+5076000000",
            },
          ].map(({ label, value, href }) => (
            <div key={label}>
              <p
                style={{
                  fontSize: "10px",
                  letterSpacing: "2.5px",
                  textTransform: "uppercase",
                  color: "#888",
                  fontFamily: "'Helvetica Neue', sans-serif",
                  marginBottom: "6px",
                }}
              >
                {label}
              </p>
              <a
                href={href}
                style={{
                  fontSize: "14px",
                  color: "#111",
                  fontFamily: "'Helvetica Neue', sans-serif",
                  textDecoration: "none",
                  borderBottom: "1px solid #999",
                  paddingBottom: "2px",
                }}
              >
                {value}
              </a>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ marginTop: "48px" }}>
          <a
            href="mailto:contacto@gzgroup.com"
            style={{
              display: "inline-block",
              backgroundColor: "#111",
              color: "#D4D4D4",
              padding: "14px 40px",
              fontSize: "12px",
              letterSpacing: "2px",
              textTransform: "uppercase",
              textDecoration: "none",
              fontFamily: "'Helvetica Neue', sans-serif",
              fontWeight: "400",
            }}
          >
            Iniciar conversación
          </a>
        </div>
      </div>

      {/* RIGHT — GZ Logo */}
      <div
        style={{
          flex: "0 0 220px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Small floating dot accent — matches style of original image */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "-40px",
            top: "50%",
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            backgroundColor: "#111",
            opacity: 0.7,
          }}
        />
        <img
          src="" {/* RUTA DEL LOGO */}
          alt="GZ Group"
          style={{ width: "200px", objectFit: "contain" }}
        />
      </div>
    </section>
  );
};

export default ContactUsSection;