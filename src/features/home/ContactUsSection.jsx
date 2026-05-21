function ContactUsSection() {
  return (
    <section
      style={{
        backgroundColor: "#d4e9e2",
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
            fontFamily: "'ABeezee', sans-serif",
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
            letterSpacing: "1px",
            lineHeight: "1.05",
            fontFamily: "'Cabin Condensed', serif",
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
            fontFamily: "'ABeezee', sans-serif",
            fontWeight: "300",
          }}
        >
          ¿Quieres saber más sobre Oscar? ¿Tienes una idea de colaboración? ¿O solo quieres saludar?
          Envíanos un mensaje y nos pondremos en contacto contigo lo antes posible.
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
              value: "+507 6000-0000",
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
        />
        <img
          src="src\assets\mainOscar.svg" 
          alt="GZ Group"
          style={{ width: "200px", objectFit: "contain" }}
        />
      </div>
    </section>
  );
};

export default ContactUsSection;