import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import { apiCall } from "../services/api";
import styles from "./Profile.module.css";

function formatPoints(value) {
    return Number(value ?? 0).toFixed(2);
}

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

// Traduce la categoría de un movimiento del historial a texto legible
function formatHistoryDescription(entry) {
    if (entry.reward_name) return `Canje: ${entry.reward_name}`;
    if (entry.oscar_name) return `Sesión en ${entry.oscar_name}`;
    if (entry.note) return entry.note;
    return "Movimiento";
}

function formatHistoryDate(isoDate) {
    if (!isoDate) return "";
    const date = new Date(isoDate);
    if (Number.isNaN(date.getTime())) return isoDate;
    return date.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

// ══════════════════════════════════════════════
//  MODAL: Historial
// ══════════════════════════════════════════════
function HistorialModal({ onClose }) {
    const [history, setHistory] = useState([]);
    const [histLoading, setHistLoading] = useState(true);
    const [histError, setHistError] = useState("");
    const [categoryFilter, setCategoryFilter] = useState(""); // "" | "session" | "claim"
    const [typeFilter, setTypeFilter] = useState(""); // "" | "credit" | "debit"
    const [page, setPage] = useState(1);
    const limit = 10;

    useEffect(() => {
        let isActive = true;

        const fetchHistory = async () => {
            setHistLoading(true);
            setHistError("");
            try {
                const params = new URLSearchParams();
                if (categoryFilter) params.set("category", categoryFilter);
                if (typeFilter) params.set("type", typeFilter);
                params.set("page", String(page));
                params.set("limit", String(limit));

                const result = await apiCall(`/history?${params.toString()}`, "GET");
                const list = result?.data || [];
                if (isActive) setHistory(list);
            } catch (fetchError) {
                if (isActive) setHistError(fetchError.message || "No se pudo cargar el historial");
            } finally {
                if (isActive) setHistLoading(false);
            }
        };

        fetchHistory();
        return () => {
            isActive = false;
        };
    }, [categoryFilter, typeFilter, page]);

    const handleFilterChange = (setter) => (e) => {
        setter(e.target.value);
        setPage(1);
    };

    return (
        <Modal title="Historial" icon={<HistoryIcon />} onClose={onClose}>
            <div className={styles.historyFilters}>
                <select
                    className={styles.historySelect}
                    value={categoryFilter}
                    onChange={handleFilterChange(setCategoryFilter)}
                >
                    <option value="">Todas las categorías</option>
                    <option value="session">Sesiones</option>
                    <option value="claim">Canjes</option>
                </select>
                <select
                    className={styles.historySelect}
                    value={typeFilter}
                    onChange={handleFilterChange(setTypeFilter)}
                >
                    <option value="">Todos los movimientos</option>
                    <option value="credit">Créditos</option>
                    <option value="debit">Débitos</option>
                </select>
            </div>

            {histLoading && <p className={styles.modalEmptyText}>Cargando historial...</p>}

            {!histLoading && histError && (
                <p className={styles.modalEmptyText} style={{ color: "#c0392b" }}>
                    {histError}
                </p>
            )}

            {!histLoading && !histError && history.length === 0 && (
                <p className={styles.modalEmptyText}>
                    No hay movimientos que coincidan con estos filtros.
                </p>
            )}

            {!histLoading && !histError && history.length > 0 && (
                <>
                    <ul className={styles.historyList}>
                        {history.map((entry) => {
                            const amount = Number(entry.amount) || 0;
                            const isCredit = entry.type === "credit";
                            return (
                                <li key={entry.id} className={styles.historyItem}>
                                    <div className={styles.historyItemMain}>
                                        <span className={styles.historyDesc}>
                                            {formatHistoryDescription(entry)}
                                        </span>
                                        <span
                                            className={styles.historyAmount}
                                            style={{ color: isCredit ? "#2d5a3c" : "#c0392b" }}
                                        >
                                            {isCredit ? "+" : "-"}
                                            {Math.abs(amount)}
                                        </span>
                                    </div>
                                    <span className={styles.historyDate}>
                                        {formatHistoryDate(entry.created_at)}
                                    </span>
                                </li>
                            );
                        })}
                    </ul>

                    <div className={styles.historyPagination}>
                        <button
                            className={styles.historyPageBtn}
                            disabled={page === 1}
                            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                        >
                            Anterior
                        </button>
                        <span className={styles.historyPageLabel}>Página {page}</span>
                        <button
                            className={styles.historyPageBtn}
                            disabled={history.length < limit}
                            onClick={() => setPage((prev) => prev + 1)}
                        >
                            Siguiente
                        </button>
                    </div>
                </>
            )}
        </Modal>
    );
}

function formatClaimDate(isoDate) {
    if (!isoDate) return "";
    const date = new Date(isoDate);
    if (Number.isNaN(date.getTime())) return isoDate;
    return date.toLocaleDateString("es-ES", { year: "numeric", month: "short", day: "numeric" });
}

const CLAIM_STATUS_LABELS = {
    pending: "Pendiente",
    redeemed: "Canjeado",
    rejected: "Rechazado",
    cancelled: "Cancelado",
};

// ══════════════════════════════════════════════
//  MODAL: Canjear puntos
// ══════════════════════════════════════════════
function CanjearPuntosModal({ pointsAvailable, onClose, onRedeemSuccess }) {
    const [rewards, setRewards] = useState([]);
    const [claims, setClaims] = useState([]);
    const [pointsBalance, setPointsBalance] = useState(pointsAvailable);
    const [catalogLoading, setCatalogLoading] = useState(true);
    const [catalogError, setCatalogError] = useState("");
    const [redeemingId, setRedeemingId] = useState(null);
    const [errorByReward, setErrorByReward] = useState({});

    useEffect(() => {
        let isActive = true;

        const fetchCatalog = async () => {
            try {
                const result = await apiCall("/rewards/me", "GET");
                const data = result?.data || {};
                if (!isActive) return;
                setRewards(data.available_rewards || []);
                setClaims(data.my_claims || []);
                if (data.user?.points_balance !== undefined) {
                    setPointsBalance(Number(data.user.points_balance) || 0);
                }
            } catch (fetchError) {
                if (isActive) setCatalogError(fetchError.message || "No se pudo cargar el catálogo de recompensas");
            } finally {
                if (isActive) setCatalogLoading(false);
            }
        };

        fetchCatalog();
        return () => {
            isActive = false;
        };
    }, []);

    // Una recompensa ya tiene una solicitud pendiente si aparece en my_claims con status "pending"
    const pendingClaimFor = (rewardId) =>
        claims.find((claim) => claim.reward_id === rewardId && claim.status === "pending");

    const handleRedeem = async (reward) => {
        const price = Number(reward.price) || 0;
        if (!reward.is_active || reward.stock <= 0 || price > pointsBalance || pendingClaimFor(reward.id)) {
            return;
        }

        setRedeemingId(reward.id);
        setErrorByReward((prev) => ({ ...prev, [reward.id]: "" }));

        try {
            const result = await apiCall("/redeem", "POST", { reward_id: reward.id });
            const claim = result?.data;

            setClaims((prev) => [claim, ...prev]);
            setPointsBalance((prev) => prev - price);
            setRewards((prev) =>
                prev.map((r) => (r.id === reward.id ? { ...r, stock: Math.max(0, r.stock - 1) } : r))
            );
            onRedeemSuccess(price);
        } catch (redeemError) {
            setErrorByReward((prev) => ({
                ...prev,
                [reward.id]: redeemError.message || "No se pudo canjear la recompensa",
            }));
        } finally {
            setRedeemingId(null);
        }
    };

    return (
        <Modal title="Canjear puntos" icon={<GiftIcon />} onClose={onClose}>
            <p className={styles.pointsAvailableText}>
                Puntos disponibles: <strong>{formatPoints(pointsBalance)}</strong>
            </p>

            {catalogLoading && <p className={styles.modalEmptyText}>Cargando recompensas...</p>}

            {!catalogLoading && catalogError && (
                <p className={styles.modalEmptyText} style={{ color: "#c0392b" }}>
                    {catalogError}
                </p>
            )}

            {!catalogLoading && !catalogError && rewards.length === 0 && (
                <p className={styles.modalEmptyText}>No hay recompensas disponibles por ahora.</p>
            )}

            {!catalogLoading && !catalogError && rewards.length > 0 && (
                <ul className={styles.rewardsList}>
                    {rewards.map((reward) => {
                        const price = Number(reward.price) || 0;
                        const pendingClaim = pendingClaimFor(reward.id);
                        const isRedeeming = redeemingId === reward.id;
                        const outOfStock = reward.stock <= 0;
                        const inactive = !reward.is_active;
                        const canAfford = price <= pointsBalance;
                        const isDisabled =
                            outOfStock || inactive || !canAfford || !!pendingClaim || isRedeeming;
                        const rewardError = errorByReward[reward.id];

                        let buttonLabel = "Canjear";
                        if (isRedeeming) buttonLabel = "Enviando...";
                        else if (pendingClaim) buttonLabel = "Solicitado ✓";
                        else if (outOfStock) buttonLabel = "Sin stock";
                        else if (inactive) buttonLabel = "No disponible";

                        return (
                            <li key={reward.id} className={styles.rewardItem}>
                                {reward.image_url ? (
                                    <img
                                        src={reward.image_url}
                                        alt={reward.name}
                                        className={styles.rewardImage}
                                    />
                                ) : (
                                    <span className={styles.rewardIcon}>🎁</span>
                                )}
                                <div className={styles.rewardInfo}>
                                    <p className={styles.rewardName}>{reward.name}</p>
                                    {reward.description && (
                                        <p className={styles.rewardDescription}>{reward.description}</p>
                                    )}
                                    <p className={styles.rewardCost}>
                                        {formatPoints(price)} puntos
                                        {reward.company?.name ? ` · ${reward.company.name}` : ""}
                                        {typeof reward.stock === "number" ? ` · Stock: ${reward.stock}` : ""}
                                    </p>
                                    {rewardError && <p className={styles.rewardError}>{rewardError}</p>}
                                </div>
                                <button
                                    className={styles.rewardBtn}
                                    disabled={isDisabled}
                                    onClick={() => handleRedeem(reward)}
                                >
                                    {buttonLabel}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            )}

            {claims.length > 0 && (
                <div className={styles.claimsSection}>
                    <h4 className={styles.claimsTitle}>Tus canjes recientes</h4>
                    <ul className={styles.claimsList}>
                        {claims.map((claim) => (
                            <li key={claim.id} className={styles.claimItem}>
                                <span className={styles.claimDate}>
                                    {formatClaimDate(claim.created_at)}
                                </span>
                                <span className={styles.claimStatus}>
                                    {CLAIM_STATUS_LABELS[claim.status] || claim.status}
                                </span>
                                {claim.code && <span className={styles.claimCode}>{claim.code}</span>}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
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
            const count = Number(item.count) || 0;
            const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
            if (index % 2 === 0) {
                doc.setFillColor(...rowAlt);
                doc.rect(14, y, 182, 8, "F");
            }
            doc.setTextColor(...textDark);
            doc.text(TYPE_LABELS[item.name] || item.name, 18, y + 6);
            doc.text(String(count), 120, y + 6);
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
    const total = activities.reduce((sum, item) => sum + (Number(item.count) || 0), 0);

    return (
        <Modal title="Mis residuos" icon={<TrashIcon />} onClose={onClose}>
            {activities.length === 0 ? (
                <p className={styles.modalEmptyText}>No hay registros de residuos disponibles.</p>
            ) : (
                <ul className={styles.wasteList}>
                    {activities.map((item, index) => {
                        const count = Number(item.count) || 0;
                        const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
                        return (
                            <li key={item.name || index} className={styles.wasteItem}>
                                <div className={styles.wasteItemHeader}>
                                    <span className={styles.wasteItemName}>
                                        {TYPE_LABELS[item.name] || item.name}
                                    </span>
                                    <span className={styles.wasteItemCount}>
                                        {count} unidades ({percentage}%)
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

    // Actualiza el estado local de forma optimista tras un canje exitoso.
    // El backend ya descontó el saldo real; esto solo refleja el cambio
    // de inmediato en la UI sin esperar a un nuevo fetch del perfil.
    const handleRedeemSuccess = (cost) => {
        setUserData((prev) => {
            if (!prev) return prev;
            const currentPoints = Number(prev.points_available) || 0;
            const currentRewardsClaimed = Number(prev.rewards_claimed) || 0;
            return {
                ...prev,
                points_available: currentPoints - cost,
                rewards_claimed: currentRewardsClaimed + 1,
            };
        });
    };

    const closeModal = () => setActiveModal(null);

    const user = userData?.user;
    const activities = userData?.trash_items_by_type || [];
    // Los valores numéricos llegan como string desde la API (p.ej. "120.00")
    const pointsAvailable = Number(userData?.points_available ?? 0);
    const pointsTotal = Number(userData?.points_earned_total ?? 0);
    const sessionsCompleted = Number(userData?.sessions_completed ?? 0);
    const rewardsClaimed = Number(userData?.rewards_claimed ?? 0);

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
                            <p className={styles.statNumber}>{formatPoints(pointsAvailable)}</p>
                        </div>
                    </div>

                    <div className={styles.statsRow} style={{ marginTop: "16px" }}>
                        <div className={styles.statCard}>
                            <p className={styles.statLabel}>Puntos ganados totales</p>
                            <p className={styles.statNumber}>{formatPoints(pointsTotal)}</p>
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
                <CanjearPuntosModal
                    pointsAvailable={pointsAvailable}
                    onClose={closeModal}
                    onRedeemSuccess={handleRedeemSuccess}
                />
            )}
            {activeModal === "residuos" && (
                <MisResiduosModal user={user} activities={activities} onClose={closeModal} />
            )}
        </div>
    );
}