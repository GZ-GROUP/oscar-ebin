import React, { useEffect, useState } from "react";
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

// ── Icono de configuración ──
function GearIcon() {
    return (
        <svg viewBox="0 0 20 20" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="10" cy="10" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
    );
}

export default function Profile() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState("");

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
                        <button className={`${styles.navBtn} ${styles.navBtnActive}`}>
                            <GearIcon /> Configuración
                        </button>
                        <button className={styles.navBtn}>Historial</button>
                        <button className={styles.navBtn}>Canjear puntos</button>
                        <button className={styles.navBtn}>Mis residuos</button>
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
        </div>
    );
}
