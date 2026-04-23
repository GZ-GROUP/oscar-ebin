function ReadySection() {
    return (
        <section className="ready-section" style={{
            backgroundColor: "#ffffff",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "80px 40px",
            textAlign: "center",
            fontFamily: "'Helvetica Neue', sans-serif",
        }}>
            <p style={{
                fontSize: "11px",
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: "#888",
                marginBottom: "20px",
            }}>
                Oscar E. Bin · Reciclaje Inteligente
            </p>

            <h2 style={{
                fontSize: "clamp(28px, 4vw, 42px)",
                fontWeight: "700",
                color: "#111",
                margin: "0 0 20px 0",
                letterSpacing: "-0.5px",
                lineHeight: "1.15",
                maxWidth: "600px",
            }}>
                ¿Listo para Hacer la Diferencia?
            </h2>

            <p style={{
                fontSize: "15px",
                color: "#555",
                lineHeight: "1.75",
                maxWidth: "460px",
                margin: "0 0 48px 0",
                fontWeight: "300",
            }}>
                Únete a la revolución del reciclaje inteligente con <strong style={{ fontWeight: "600", color: "#111" }}>Oscar E. Bin</strong>.
                Una solución diseñada tanto para usuarios individuales como para empresas que quieren
                reducir su huella ambiental de forma simple y medible.
            </p>

            <div style={{
                display: "flex",
                gap: "16px",
                flexWrap: "wrap",
                justifyContent: "center",
            }}>
                <a
                    href="#"
                    style={{
                        display: "inline-block",
                        backgroundColor: "#111",
                        color: "#fff",
                        padding: "15px 40px",
                        fontSize: "13px",
                        letterSpacing: "1.5px",
                        textTransform: "uppercase",
                        textDecoration: "none",
                        fontWeight: "500",
                        transition: "background 0.2s",
                    }}
                    onMouseEnter={e => e.target.style.backgroundColor = "#333"}
                    onMouseLeave={e => e.target.style.backgroundColor = "#111"}
                >
                    Soy Individuo
                </a>

                <a
                    href="#"
                    style={{
                        display: "inline-block",
                        backgroundColor: "#111",
                        color: "#fff",
                        padding: "15px 40px",
                        fontSize: "13px",
                        letterSpacing: "1.5px",
                        textTransform: "uppercase",
                        textDecoration: "none",
                        fontWeight: "500",
                        transition: "background 0.2s",
                    }}
                    onMouseEnter={e => e.target.style.backgroundColor = "#333"}
                    onMouseLeave={e => e.target.style.backgroundColor = "#111"}
                >
                    Soy Empresa
                </a>
            </div>

            <p style={{
                marginTop: "28px",
                fontSize: "12px",
                color: "#aaa",
                letterSpacing: "0.5px",
            }}>
                Sin compromisos. Empieza gratis hoy.
            </p>
        </section>
    );
}

export default ReadySection;