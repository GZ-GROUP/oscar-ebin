import React, { useEffect, useState } from "react";
import { apiCall } from "../services/api";
import { getStoredUser } from "../services/authService";

const PALETTE = {
  bg:         "#f2f0eb",
  dark:       "#1e3932",
  green:      "#006241",
  greenHover: "#004d33",
  mint:       "#d4e9e2",
  border:     "#2b5148",
  chrome:     "#edebe9",
  white:      "#ffffff",
  text:       "rgba(0,0,0,0.87)",
};

const medals = ["🥇", "🥈", "🥉"];

const podiumHeights = [180, 140, 110];
const podiumColors  = ["#006241", "#2b5148", "#3a6b5f"];

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

function Podium({ data }) {
  const top3 = data.slice(0, 3).filter(Boolean);
  if (top3.length === 0) {
    return null;
  }

  const order = top3.length === 3 ? [top3[1], top3[0], top3[2]] : top3;
  const heights = [podiumHeights[1], podiumHeights[0], podiumHeights[2]].slice(0, order.length);
  const colors = [podiumColors[1], podiumColors[0], podiumColors[2]].slice(0, order.length);
  const ranks = [2, 1, 3].slice(0, order.length);

  return (
    <div style={{
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "center",
      gap: "12px",
      marginBottom: "48px",
    }}>
      {order.map((user, i) => {
        const displayName = user?.name?.split(" ")[0] || user?.username || "Usuario";
        const rankNumber = typeof user?.rank === "number" ? user.rank : top3.indexOf(user) + 1;

        return (
          <div key={user?.rank ?? i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
            <div style={{
              width: ranks[i] === 1 ? "72px" : "56px",
              height: ranks[i] === 1 ? "72px" : "56px",
              borderRadius: "50%",
              backgroundColor: PALETTE.mint,
              border: `3px solid ${PALETTE.border}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "'Cabin Condensed', sans-serif",
              fontWeight: 700,
              fontSize: ranks[i] === 1 ? "22px" : "17px",
              color: PALETTE.dark,
              boxShadow: ranks[i] === 1 ? `0 0 0 4px ${PALETTE.green}33` : "none",
              transition: "transform 0.2s",
            }}>
              {user.profile_image_url ? (
                <img
                  src={user.profile_image_url}
                  alt={`${displayName} avatar`}
                  style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }}
                />
              ) : (
                getInitials(user.name || user.username)
              )}
            </div>

            <span style={{ fontSize: ranks[i] === 1 ? "28px" : "22px", lineHeight: 1 }}>
              {medals[ranks[i] - 1]}
            </span>

            <span style={{
              fontFamily: "'Cabin Condensed', sans-serif",
              fontWeight: 600,
              fontSize: "13px",
              color: PALETTE.dark,
              textAlign: "center",
              maxWidth: "80px",
              lineHeight: 1.2,
            }}>
              {displayName}
            </span>

            <div style={{
              width: "90px",
              height: `${heights[i]}px`,
              backgroundColor: colors[i],
              borderRadius: "8px 8px 0 0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "inset 0 4px 12px rgba(255,255,255,0.1)",
            }}>
              <span style={{
                fontFamily: "'Cabin Condensed', sans-serif",
                fontWeight: 700,
                fontSize: "28px",
                color: "rgba(255,255,255,0.3)",
              }}>
                {rankNumber ?? "-"}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function RankRow({ user, isCurrentUser, maxPoints, rankIndex }) {
  const [hovered, setHovered] = useState(false);
  const avatarText = user.profile_image_url ? null : user.avatar || getInitials(user.name || user.username);
  const rawRank = user.rank;
  const parsedRank = rawRank != null && rawRank !== "" && !Number.isNaN(Number(rawRank))
    ? Number(rawRank)
    : null;
  const rankNumber = typeof parsedRank === "number" ? parsedRank : rankIndex;
  const displayName = user.name || user.username || "Usuario";

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        padding: "14px 20px",
        borderRadius: "10px",
        backgroundColor: isCurrentUser
          ? `${PALETTE.green}18`
          : hovered ? PALETTE.mint : PALETTE.white,
        border: isCurrentUser
          ? `1.5px solid ${PALETTE.green}`
          : `1.5px solid ${hovered ? PALETTE.border : PALETTE.chrome}`,
        marginBottom: "10px",
        transition: "all 0.18s ease",
        cursor: "default",
      }}
    >
      <div style={{
        width: "32px",
        fontFamily: "'Cabin Condensed', sans-serif",
        fontWeight: 700,
        fontSize: "18px",
        color: rankNumber != null && rankNumber <= 3 ? PALETTE.green : PALETTE.border,
        flexShrink: 0,
      }}>
        {rankNumber != null && rankNumber >= 1 && rankNumber <= 3 ? medals[rankNumber - 1] : `#${rankNumber ?? "-"}`}
      </div>

      <div style={{
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        backgroundColor: PALETTE.mint,
        border: `2px solid ${PALETTE.border}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Cabin Condensed', sans-serif",
        fontWeight: 700,
        fontSize: "14px",
        color: PALETTE.dark,
        marginRight: "14px",
        flexShrink: 0,
      }}>
        {user.profile_image_url ? (
          <img
            src={user.profile_image_url}
            alt={`${user.name} avatar`}
            style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }}
          />
        ) : (
          avatarText
        )}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: "'Cabin Condensed', sans-serif",
          fontWeight: 600,
          fontSize: "17px",
          color: PALETTE.dark,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}>
          {displayName}
          {isCurrentUser && (
            <span style={{
              marginLeft: "8px",
              fontSize: "11px",
              backgroundColor: PALETTE.green,
              color: "#fff",
              borderRadius: "4px",
              padding: "1px 6px",
              fontFamily: "'ABeeZee', sans-serif",
              fontWeight: 400,
              verticalAlign: "middle",
            }}>
              Tú
            </span>
          )}
        </div>
        <div style={{
          fontFamily: "'ABeeZee', sans-serif",
          fontSize: "12px",
          color: PALETTE.border,
          marginTop: "2px",
        }}>
          {user.badges ?? 0} insignias · {user.kg ?? 0} kg reciclados
        </div>
      </div>

      <div style={{ width: "100px", margin: "0 20px", flexShrink: 0 }}>
        <div style={{
          height: "6px",
          backgroundColor: PALETTE.chrome,
          borderRadius: "3px",
          overflow: "hidden",
        }}>
          <div style={{
            height: "100%",
            width: `${Math.round(((user.points ?? 0) / Math.max(maxPoints, 1)) * 100)}%`,
            backgroundColor: PALETTE.green,
            borderRadius: "3px",
            transition: "width 0.4s ease",
          }} />
        </div>
      </div>

      <div style={{
        fontFamily: "'Cabin Condensed', sans-serif",
        fontWeight: 700,
        fontSize: "20px",
        color: PALETTE.green,
        minWidth: "80px",
        textAlign: "right",
        flexShrink: 0,
      }}>
        {(user.points ?? 0).toLocaleString()}
        <span style={{
          fontFamily: "'ABeeZee', sans-serif",
          fontWeight: 400,
          fontSize: "11px",
          color: PALETTE.border,
          marginLeft: "3px",
        }}>
          pts
        </span>
      </div>
    </div>
  );
}

export default function Leaderboard() {
  const [rankingData, setRankingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const currentUser = getStoredUser();

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const result = await apiCall("/ranking");
        const data = result.ranking || result.data || result;
        setRankingData(Array.isArray(data) ? data : []);
      } catch (fetchError) {
        setError(fetchError.message || "Error al cargar el ranking");
      } finally {
        setLoading(false);
      }
    };

    fetchRanking();
  }, []);

  const ranking = rankingData.length ? rankingData : [];
  const maxPoints = ranking[0]?.points || 1;
  const currentUserRank = ranking.find((user) => {
    if (!currentUser) return false;
    return (
      user.email === currentUser.email ||
      user.username === currentUser.username ||
      user.name === currentUser.name
    );
  })?.rank || null;

  if (loading) {
    return (
      <section style={{ backgroundColor: PALETTE.bg, minHeight: "100vh", padding: "60px 24px", boxSizing: "border-box" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <p style={{ fontFamily: "'ABeeZee', sans-serif", fontSize: "18px", color: PALETTE.text }}>Cargando ranking...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section style={{ backgroundColor: PALETTE.bg, minHeight: "100vh", padding: "60px 24px", boxSizing: "border-box" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <p style={{ fontFamily: "'ABeeZee', sans-serif", fontSize: "18px", color: "#d32f2f" }}>{error}</p>
        </div>
      </section>
    );
  }

  if (!ranking.length) {
    return (
      <section style={{ backgroundColor: PALETTE.bg, minHeight: "100vh", padding: "60px 24px", boxSizing: "border-box" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontFamily: "'ABeeZee', sans-serif", fontSize: "18px", color: PALETTE.text }}>No hay ranking disponible en este momento.</p>
        </div>
      </section>
    );
  }

  return (
    <section style={{
      backgroundColor: PALETTE.bg,
      minHeight: "100vh",
      padding: "60px 24px",
      boxSizing: "border-box",
    }}>
      <div style={{
        maxWidth: "720px",
        margin: "0 auto",
      }}>

        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h1 style={{
            fontFamily: "'Cabin Condensed', sans-serif",
            fontWeight: 600,
            fontSize: "48px",
            color: PALETTE.dark,
            margin: "0 0 10px",
            lineHeight: 1.1,
          }}>
            Tabla de Líderes
          </h1>
          <p style={{
            fontFamily: "'ABeeZee', sans-serif",
            fontSize: "16px",
            color: PALETTE.text,
            margin: 0,
          }}>
            Los recicladores más comprometidos del mes
          </p>
        </div>

        <Podium data={ranking} />

        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "20px",
        }}>
          <div style={{ flex: 1, height: "1px", backgroundColor: PALETTE.border, opacity: 0.25 }} />
          <span style={{
            fontFamily: "'ABeeZee', sans-serif",
            fontSize: "13px",
            color: PALETTE.border,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}>
            Clasificación completa
          </span>
          <div style={{ flex: 1, height: "1px", backgroundColor: PALETTE.border, opacity: 0.25 }} />
        </div>

        <div>
          {ranking.map((user, index) => (
            <RankRow
              key={user.rank ?? user.email ?? user.name ?? index}
              user={user}
              rankIndex={index + 1}
              isCurrentUser={user.rank === currentUserRank}
              maxPoints={maxPoints}
            />
          ))}
        </div>

        <p style={{
          fontFamily: "'ABeeZee', sans-serif",
          fontSize: "13px",
          color: PALETTE.border,
          textAlign: "center",
          marginTop: "32px",
          opacity: 0.7,
        }}>
          Actualizado en tiempo real · Período: Mayo 2026
        </p>
      </div>
    </section>
  );
}
