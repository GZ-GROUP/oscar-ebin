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
            fontFamily: "'Cabin Condensed', sans-serif",
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
                fontFamily: "'ABeeZee', sans-serif",
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
                <button
                    style={{
                        fontFamily: "'ABeeZee', sans-serif",
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
                    Escoge tu Bin
                </button>
            </div>
        </section>
    );
}

export default ReadySection;