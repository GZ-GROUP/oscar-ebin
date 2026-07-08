import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import { apiCall } from "../services/api";
import styles from "./Profile.module.css";

function getInitials(name) {
    if (!name) return "U";
    return name
        .split(" ")
        .filter(Boolean)
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
}

function ProfileAvatar({ name, imageUrl }) {
    if (imageUrl) {
        return (
            <img
                src={imageUrl}
                alt={`${name || "Perfil"} avatar`}
                style={{
                    width: "96px",
                    height: "96px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    backgroundColor: "#e7f2ed",
                }}
            />
        );
    }

    return (
        <div
            style={{
                width: "96px",
                height: "96px",
                borderRadius: "50%",
                display: "grid",
                placeItems: "center",
                backgroundColor: "#d4e9e2",
                color: "#1e3932",
                fontSize: "32px",
                fontWeight: 700,
            }}
        >
            {getInitials(name)}
        </div>
    );
}

// ── Icono de reciclaje inline (sin dependencias externas) ──
function RecycleIcon() {
    return (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#3d7a56" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="1 4 1 10 7 10" />
            <polyline points="23 20 23 14 17 14" />
            <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4-4.64 4.36A9 9 0 0 1 3.51 15" />
        </svg>
    );
}

// ── Icono de lápiz ──
function PencilIcon() {
    return (
        <svg viewBox="0 0 20 20" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793z" />
            <path d="M11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
        </svg>
    );
}

// ── Icono check ──
function CheckIcon() {
    return (
        <svg viewBox="0 0 20 20" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="4 10 8 14 16 6" />
        </svg>
    );
}

// ── Icono de configuración (tuerca) inline ──
function GearIcon() {
    return (
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
    );
}

// ── Icono de historial (reloj) ──
function HistoryIcon() {
    return (
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="9" />
            <polyline points="12 7 12 12 16 14" />
        </svg>
    );
}

// ── Icono de regalo (canjear puntos) ──
function GiftIcon() {
    return (
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="8" width="18" height="4" rx="1" />
            <path d="M12 8v13" />
            <path d="M19 12v7a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-7" />
            <path d="M7.5 8a2.5 2.5 0 0 1 0-5C11 3 12 8 12 8" />
            <path d="M16.5 8a2.5 2.5 0 0 0 0-5C13 3 12 8 12 8" />
        </svg>
    );
}

// ── Icono de papelera (mis residuos) ──
function TrashIcon() {
    return (
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        </svg>
    );
}

// ── Icono de cerrar (X) ──
function CloseIcon() {
    return (
        <svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" y1="4" x2="16" y2="16" />
            <line x1="16" y1="4" x2="4" y2="16" />
        </svg>
    );
}

// ── Icono de descarga (reporte PDF) ──
function DownloadIcon() {
    return (
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
    );
}

// Traducción de las categorías de residuos que llegan de la API
const TYPE_LABELS = {
    Organic: "Orgánico",
    Can: "Lata",
    "Paper/Cardboard": "Papel/Cartón",
    Plastic: "Plástico",
};

// Recompensas disponibles para canjear.
// NOTA: mock local — cuando exista un endpoint real (p.ej. GET /rewards),
// basta con reemplazar este arreglo por el resultado de apiCall("/rewards").
const REWARDS = [
    { id: "r1", name: "Descuento 5% en tienda OSCAR", cost: 2, icon: "🏷️" },
    { id: "r2", name: "Envío gratis en tu próximo pedido", cost: 3, icon: "🚚" },
    { id: "r3", name: "Bono ecológico OSCAR", cost: 5, icon: "🌱" },
    { id: "r4", name: "Entrada a evento OSCAR", cost: 8, icon: "🎟️" },
];

// ══════════════════════════════════════════════
//  MODAL BASE (reutilizable)
// ══════════════════════════════════════════════
function Modal({ title, icon, onClose, children }) {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div
                className={styles.modalContent}
                role="dialog"
                aria-modal="true"
                aria-label={title}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={styles.modalHeader}>
                    <h3 className={styles.modalTitle}>
                        {icon} {title}
                    </h3>
                    <button className={styles.modalCloseBtn} onClick={onClose} aria-label="Cerrar">
                        <CloseIcon />
                    </button>
                </div>
                <div className={styles.modalBody}>{children}</div>
            </div>
        </div>
    );
}

// ══════════════════════════════════════════════
//  MODAL: Configuración
// ══════════════════════════════════════════════
function ConfiguracionModal({ user, onClose, onSaveName }) {
    const [name, setName] = useState(user?.name || "");
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        if (name.trim()) onSaveName(name.trim());
        setSaved(true);
        setTimeout(() => setSaved(false), 1800);
    };

    return (
        <Modal title="Configuración" icon={<GearIcon />} onClose={onClose}>
            <div className={styles.settingsField}>
                <label className={styles.settingsLabel} htmlFor="settings-name">
                    Nombre
                </label>
                <input
                    id="settings-name"
                    className={styles.settingsInput}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div className={styles.settingsField}>
                <label className={styles.settingsLabel}>Correo</label>
                <p className={styles.settingsStaticValue}>{user?.email || "Sin email"}</p>
            </div>

            <div className={styles.settingsField}>
                <label className={styles.settingsLabel}>Tipo de cuenta</label>
                <p className={styles.settingsStaticValue}>
                    {user?.is_company ? "Cuenta de empresa" : "Cuenta personal"}
                </p>
            </div>

            <div className={styles.settingsToggleRow}>
                <label className={styles.settingsLabel} htmlFor="settings-notifications">
                    Notificaciones por correo
                </label>
                <button
                    id="settings-notifications"
                    role="switch"
                    aria-checked={emailNotifications}
                    className={`${styles.toggleSwitch} ${emailNotifications ? styles.toggleSwitchOn : ""}`}
                    onClick={() => setEmailNotifications((prev) => !prev)}
                >
                    <span className={styles.toggleKnob} />
                </button>
            </div>

            <div className={styles.modalFooter}>
                {saved && <span className={styles.savedNotice}>Cambios guardados</span>}
                <button className={styles.modalPrimaryBtn} onClick={handleSave}>
                    Guardar cambios
                </button>
            </div>
        </Modal>
    );
}

// ══════════════════════════════════════════════
//  MODAL: Historial
// ══════════════════════════════════════════════
function HistorialModal({ onClose }) {
    const [history, setHistory] = useState([]);
    const [histLoading, setHistLoading] = useState(true);
    const [histUnavailable, setHistUnavailable] = useState(false);

    useEffect(() => {
        let isActive = true;

        const fetchHistory = async () => {
            try {
                const result = await apiCall("/profile/history");
                const data = result?.data || result;
                const list = Array.isArray(data) ? data : data?.history || [];
                if (isActive) setHistory(list);
            } catch (fetchError) {
                // El endpoint todavía puede no existir en el backend;
                // degradamos con un mensaje amigable en vez de un error.
                if (isActive) setHistUnavailable(true);
            } finally {
                if (isActive) setHistLoading(false);
            }
        };

        fetchHistory();
        return () => {
            isActive = false;
        };
    }, []);

    return (
        <Modal title="Historial" icon={<HistoryIcon />} onClose={onClose}>
            {histLoading && <p className={styles.modalEmptyText}>Cargando historial...</p>}

            {!histLoading && (histUnavailable || history.length === 0) && (
                <p className={styles.modalEmptyText}>
                    Aún no hay historial de sesiones disponible. Vuelve pronto para ver tu
                    actividad reciente.
                </p>
            )}

            {!histLoading && !histUnavailable && history.length > 0 && (
                <ul className={styles.historyList}>
                    {history.map((entry, index) => (
                        <li key={entry.id || index} className={styles.historyItem}>
                            <span className={styles.historyDate}>
                                {entry.date || entry.created_at || ""}
                            </span>
                            <span className={styles.historyDesc}>
                                {entry.description || entry.title || "Sesión completada"}
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </Modal>
    );
}

// ══════════════════════════════════════════════
//  MODAL: Canjear puntos
// ══════════════════════════════════════════════
function CanjearPuntosModal({ pointsAvailable, onClose }) {
    const [redeemedIds, setRedeemedIds] = useState([]);

    const handleRedeem = (reward) => {
        if (reward.cost > pointsAvailable || redeemedIds.includes(reward.id)) return;
        // NOTA: mock local — cuando exista el endpoint real, reemplazar por
        // apiCall("/rewards/redeem", { method: "POST", body: { reward_id: reward.id } })
        setRedeemedIds((prev) => [...prev, reward.id]);
    };

    return (
        <Modal title="Canjear puntos" icon={<GiftIcon />} onClose={onClose}>
            <p className={styles.pointsAvailableText}>
                Puntos disponibles: <strong>{pointsAvailable}</strong>
            </p>

            <ul className={styles.rewardsList}>
                {REWARDS.map((reward) => {
                    const isRedeemed = redeemedIds.includes(reward.id);
                    const canAfford = reward.cost <= pointsAvailable;
                    return (
                        <li key={reward.id} className={styles.rewardItem}>
                            <span className={styles.rewardIcon}>{reward.icon}</span>
                            <div className={styles.rewardInfo}>
                                <p className={styles.rewardName}>{reward.name}</p>
                                <p className={styles.rewardCost}>{reward.cost} puntos</p>
                            </div>
                            <button
                                className={styles.rewardBtn}
                                disabled={!canAfford || isRedeemed}
                                onClick={() => handleRedeem(reward)}
                            >
                                {isRedeemed ? "Solicitado ✓" : "Canjear"}
                            </button>
                        </li>
                    );
                })}
            </ul>
        </Modal>
    );
}

// Genera y descarga un PDF con el detalle de residuos del usuario.
function generateWasteReportPDF(user, activities, total) {
    const green = [45, 90, 60];      // #2d5a3c
    const lightGreen = [61, 122, 86]; // #3d7a56
    const rowAlt = [240, 244, 238];   // #f0f4ee
    const textDark = [26, 46, 26];    // #1a2e1a
    const textMuted = [90, 110, 90];  // #5a6e5a

    const doc = new jsPDF();

    // Encabezado
    doc.setFillColor(...green);
    doc.rect(0, 0, 210, 28, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("OSCAR", 14, 18);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text("Reporte de residuos", 196, 18, { align: "right" });

    // Datos del usuario
    let y = 42;
    doc.setTextColor(...textDark);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text(`Usuario: ${user?.name || "Usuario"}`, 14, y);

    y += 7;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(...textMuted);
    doc.text(`Correo: ${user?.email || "Sin email"}`, 14, y);

    y += 6;
    const generatedDate = new Date().toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
    doc.text(`Generado el: ${generatedDate}`, 14, y);
    y += 12;

    if (activities.length === 0) {
        doc.setTextColor(...textDark);
        doc.setFontSize(11);
        doc.text("No hay registros de residuos disponibles.", 14, y);
    } else {
        // Encabezado de la tabla
        doc.setFillColor(...lightGreen);
        doc.rect(14, y, 182, 9, "F");
        doc.setTextColor(255, 255, 255);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        doc.text("Tipo de residuo", 18, y + 6);
        doc.text("Unidades", 120, y + 6);
        doc.text("Porcentaje", 160, y + 6);
        y += 9;

        // Filas
        doc.setFont("helvetica", "normal");
        activities.forEach((item, index) => {
            const percentage = total > 0 ? Math.round((item.count / total) * 100) : 0;
            if (index % 2 === 0) {
                doc.setFillColor(...rowAlt);
                doc.rect(14, y, 182, 8, "F");
            }
            doc.setTextColor(...textDark);
            doc.text(TYPE_LABELS[item.name] || item.name, 18, y + 6);
            doc.text(String(item.count), 120, y + 6);
            doc.text(`${percentage}%`, 160, y + 6);
            y += 8;
        });

        // Total
        y += 4;
        doc.setDrawColor(...lightGreen);
        doc.line(14, y, 196, y);
        y += 8;
        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.setTextColor(...textDark);
        doc.text(`Total de unidades recolectadas: ${total}`, 14, y);
    }

    // Pie de página
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(...textMuted);
    doc.text("Generado automáticamente por OSCAR.", 14, 285);

    const safeName = (user?.name || "usuario").toLowerCase().replace(/\s+/g, "-");
    doc.save(`reporte-residuos-${safeName}.pdf`);
}

// ══════════════════════════════════════════════
//  MODAL: Mis residuos
// ══════════════════════════════════════════════
function MisResiduosModal({ user, activities, onClose }) {
    const total = activities.reduce((sum, item) => sum + (item.count || 0), 0);

    return (
        <Modal title="Mis residuos" icon={<TrashIcon />} onClose={onClose}>
            {activities.length === 0 ? (
                <p className={styles.modalEmptyText}>No hay registros de residuos disponibles.</p>
            ) : (
                <ul className={styles.wasteList}>
                    {activities.map((item, index) => {
                        const percentage = total > 0 ? Math.round((item.count / total) * 100) : 0;
                        return (
                            <li key={item.name || index} className={styles.wasteItem}>
                                <div className={styles.wasteItemHeader}>
                                    <span className={styles.wasteItemName}>
                                        {TYPE_LABELS[item.name] || item.name}
                                    </span>
                                    <span className={styles.wasteItemCount}>
                                        {item.count} unidades ({percentage}%)
                                    </span>
                                </div>
                                <div className={styles.wasteBarTrack}>
                                    <div
                                        className={styles.wasteBarFill}
                                        style={{ width: `${percentage}%` }}
                                    />
                                </div>
                            </li>
                        );
                    })}
                </ul>
            )}

            <div className={styles.modalFooter}>
                <button
                    className={styles.modalPrimaryBtn}
                    disabled={activities.length === 0}
                    onClick={() => generateWasteReportPDF(user, activities, total)}
                >
                    <DownloadIcon /> Generar reporte PDF
                </button>
            </div>
        </Modal>
    );
}

// ══════════════════════════════════════════════
//  COMPONENTE PRINCIPAL
// ══════════════════════════════════════════════
export default function Profile() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState("");
    const [activeModal, setActiveModal] = useState(null); // "configuracion" | "historial" | "canjear" | "residuos" | null

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const result = await apiCall("/profile");
                const data = result.data || result;
                setUserData(data);
                setEditValue(data?.user?.name || "");
            } catch (fetchError) {
                setError(fetchError.message || "Error al cargar el perfil");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleEditToggle = () => {
        if (isEditing && editValue.trim()) {
            setUserData((prev) =>
                prev ? { ...prev, user: { ...prev.user, name: editValue.trim() } } : prev
            );
        }
        setIsEditing((prev) => !prev);
    };

    const handleSaveNameFromSettings = (newName) => {
        setUserData((prev) => (prev ? { ...prev, user: { ...prev.user, name: newName } } : prev));
        setEditValue(newName);
    };

    const closeModal = () => setActiveModal(null);

    const user = userData?.user;
    const activities = userData?.trash_items_by_type || [];
    const pointsAvailable = userData?.points_available ?? 0;
    const pointsTotal = userData?.points_earned_total ?? 0;
    const sessionsCompleted = userData?.sessions_completed ?? 0;
    const rewardsClaimed = userData?.rewards_claimed ?? 0;

    if (loading) {
        return (
            <div className={styles.page}>
                <div className={styles.card}>
                    <p style={{ padding: "24px", fontSize: "18px" }}>Cargando perfil...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.page}>
                <div className={styles.card}>
                    <p style={{ padding: "24px", fontSize: "18px", color: "#d32f2f" }}>
                        {error}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.page}>
            <div className={styles.card}>

                {/* ══ SIDEBAR ══ */}
                <aside className={styles.sidebar}>

                    {/* Avatar */}
                    <div className={styles.avatarWrapper}>
                        <ProfileAvatar name={user?.name} imageUrl={user?.profile_image_url} />
                    </div>

                    {/* Nombre editable */}
                    <div className={styles.nameRow}>
                        {isEditing ? (
                            <input
                                className={styles.nameInput}
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleEditToggle()}
                                autoFocus
                            />
                        ) : (
                            <span className={styles.userName}>{user?.name || "Usuario"}</span>
                        )}
                        <button
                            className={styles.editBtn}
                            onClick={handleEditToggle}
                            title={isEditing ? "Guardar nombre" : "Editar nombre"}
                        >
                            {isEditing ? <CheckIcon /> : <PencilIcon />}
                        </button>
                    </div>

                    <div className={styles.profileMeta}>
                        <p>{user?.email || "Sin email"}</p>
                        <p>{user?.is_company ? "Cuenta de empresa" : "Cuenta personal"}</p>
                    </div>

                    {/* Navegación lateral */}
                    <nav className={styles.sideNav}>
                        <button
                            className={`${styles.navBtn} ${activeModal === "configuracion" ? styles.navBtnActive : ""}`}
                            onClick={() => setActiveModal("configuracion")}
                        >
                            <GearIcon /> Configuración
                        </button>
                        <button
                            className={`${styles.navBtn} ${activeModal === "historial" ? styles.navBtnActive : ""}`}
                            onClick={() => setActiveModal("historial")}
                        >
                            <HistoryIcon /> Historial
                        </button>
                        <button
                            className={`${styles.navBtn} ${activeModal === "canjear" ? styles.navBtnActive : ""}`}
                            onClick={() => setActiveModal("canjear")}
                        >
                            <GiftIcon /> Canjear puntos
                        </button>
                        <button
                            className={`${styles.navBtn} ${activeModal === "residuos" ? styles.navBtnActive : ""}`}
                            onClick={() => setActiveModal("residuos")}
                        >
                            <TrashIcon /> Mis residuos
                        </button>
                    </nav>

                </aside>

                {/* ══ CONTENIDO PRINCIPAL ══ */}
                <main className={styles.main}>

                    {/* Estadísticas */}
                    <div className={styles.statsRow}>
                        <div className={styles.statCard}>
                            <p className={styles.statLabel}>Sesiones completadas</p>
                            <p className={styles.statNumber}>{sessionsCompleted}</p>
                        </div>
                        <div className={styles.statCard}>
                            <p className={styles.statLabel}>Puntos disponibles</p>
                            <p className={styles.statNumber}>{pointsAvailable}</p>
                        </div>
                    </div>

                    <div className={styles.statsRow} style={{ marginTop: "16px" }}>
                        <div className={styles.statCard}>
                            <p className={styles.statLabel}>Puntos ganados totales</p>
                            <p className={styles.statNumber}>{pointsTotal}</p>
                        </div>
                        <div className={styles.statCard}>
                            <p className={styles.statLabel}>Recompensas reclamadas</p>
                            <p className={styles.statNumber}>{rewardsClaimed}</p>
                        </div>
                    </div>

                    {/* Lista de actividad + Residuos */}
                    <div className={styles.contentRow}>

                        <div className={styles.activityList}>
                            <h2 style={{ fontFamily: "'Cabin Condensed', sans-serif", fontSize: "22px", marginBottom: "18px" }}>
                                Residuos por tipo
                            </h2>
                            {activities.length ? (
                                activities.map((item, index) => (
                                    <div key={item.name || index} className={styles.activityItem}>
                                        <div className={styles.activityMeta}>
                                            <span className={styles.activityDate}>{item.name}</span>
                                        </div>
                                        <div className={styles.activityBody}>
                                            <div className={styles.activityIcon}>
                                                <RecycleIcon />
                                            </div>
                                            <div>
                                                <p className={styles.activityTitle}>{item.count} unidades</p>
                                                <p className={styles.activityDesc}>Cantidad recogida</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className={styles.activityItem}>
                                    <p className={styles.activityDesc}>No hay registros de residuos disponibles.</p>
                                </div>
                            )}
                        </div>

                        <div className={styles.chartPlaceholder}>
                            <div className={styles.chartInner}>
                                <span className={styles.chartIcon}>📊</span>
                                <p className={styles.chartTitle}>Resumen mensual</p>
                                <p className={styles.chartSub}>Datos reales cargados desde la API</p>
                            </div>
                        </div>

                    </div>
                </main>

            </div>

            {/* ══ MODALES ══ */}
            {activeModal === "configuracion" && (
                <ConfiguracionModal user={user} onClose={closeModal} onSaveName={handleSaveNameFromSettings} />
            )}
            {activeModal === "historial" && <HistorialModal onClose={closeModal} />}
            {activeModal === "canjear" && (
                <CanjearPuntosModal pointsAvailable={pointsAvailable} onClose={closeModal} />
            )}
            {activeModal === "residuos" && (
                <MisResiduosModal user={user} activities={activities} onClose={closeModal} />
            )}
        </div>
    );
}