import React, { useState } from "react";
import styles from "./Profile.module.css";

// ── Placeholder data (reemplazar con datos reales / API) ──
const mockUser = {
    name: "Juan García",
    totalReciclado: 6,
    puntosCanjeables: 30,
    actividades: [
        {
            id: 1,
            fecha: "12 Jun 2025",
            titulo: "Plástico reciclado",
            descripcion: "Botella PET clasificada correctamente",
        },
        {
            id: 2,
            fecha: "10 Jun 2025",
            titulo: "Vidrio reciclado",
            descripcion: "Frasco de vidrio depositado",
        },
        {
            id: 3,
            fecha: "8 Jun 2025",
            titulo: "Papel reciclado",
            descripcion: "Caja de cartón procesada",
        },
        {
            id: 4,
            fecha: "5 Jun 2025",
            titulo: "Metal reciclado",
            descripcion: "Lata de aluminio clasificada",
        },
    ],
};

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
    const [userName, setUserName] = useState(mockUser.name);
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(mockUser.name);

    const handleEditToggle = () => {
        if (isEditing) {
            setUserName(editValue.trim() || userName);
        }
        setIsEditing((prev) => !prev);
    };

    return (
        <div className={styles.page}>
            <div className={styles.card}>

                {/* ══ SIDEBAR ══ */}
                <aside className={styles.sidebar}>

                    {/* Avatar */}
                    <div className={styles.avatarWrapper}>
                        <svg className={styles.avatar} viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="48" cy="36" r="22" fill="#3d7a56" />
                            <ellipse cx="48" cy="88" rx="34" ry="24" fill="#3d7a56" />
                        </svg>
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
                            <span className={styles.userName}>{userName}</span>
                        )}
                        <button
                            className={styles.editBtn}
                            onClick={handleEditToggle}
                            title={isEditing ? "Guardar nombre" : "Editar nombre"}
                        >
                            {isEditing ? <CheckIcon /> : <PencilIcon />}
                        </button>
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
                            <p className={styles.statLabel}>Total reciclado</p>
                            <p className={styles.statNumber}>{mockUser.totalReciclado}</p>
                        </div>
                        <div className={styles.statCard}>
                            <p className={styles.statLabel}>Puntos canjeables</p>
                            <p className={styles.statNumber}>{mockUser.puntosCanjeables}</p>
                        </div>
                    </div>

                    {/* Lista de actividad + Gráfica */}
                    <div className={styles.contentRow}>

                        {/* Lista de actividades recientes */}
                        <div className={styles.activityList}>
                            {mockUser.actividades.map((item) => (
                                <div key={item.id} className={styles.activityItem}>
                                    <div className={styles.activityMeta}>
                                        <span className={styles.activityDate}>{item.fecha}</span>
                                    </div>
                                    <div className={styles.activityBody}>
                                        <div className={styles.activityIcon}>
                                            <RecycleIcon />
                                        </div>
                                        <div>
                                            <p className={styles.activityTitle}>{item.titulo}</p>
                                            <p className={styles.activityDesc}>{item.descripcion}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Placeholder de gráfica */}
                        <div className={styles.chartPlaceholder}>
                            <div className={styles.chartInner}>
                                <span className={styles.chartIcon}>📊</span>
                                <p className={styles.chartTitle}>Gráfica de reciclaje</p>
                                <p className={styles.chartSub}>Próximamente disponible</p>
                            </div>
                        </div>

                    </div>
                </main>

            </div>
        </div>
    );
}