import React, { useState } from "react";

const mockData = [
  { rank: 1, name: "María González", points: 4820, badges: 12, kg: 96.4, avatar: "MG" },
  { rank: 2, name: "Carlos Méndez",  points: 3975, badges: 9,  kg: 79.5, avatar: "CM" },
  { rank: 3, name: "Sofía Ramírez",  points: 3610, badges: 11, kg: 72.2, avatar: "SR" },
  { rank: 4, name: "Diego Torres",   points: 2890, badges: 7,  kg: 57.8, avatar: "DT" },
  { rank: 5, name: "Lucía Herrera",  points: 2540, badges: 6,  kg: 50.8, avatar: "LH" },
  { rank: 6, name: "Andrés Pérez",   points: 2210, badges: 5,  kg: 44.2, avatar: "AP" },
  { rank: 7, name: "Valentina Cruz", points: 1980, badges: 4,  kg: 39.6, avatar: "VC" },
  { rank: 8, name: "Mateo Ruiz",     points: 1740, badges: 4,  kg: 34.8, avatar: "MR" },
];

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

function Podium({ data }) {
  const top3 = data.slice(0, 3);
  // reorder: 2nd, 1st, 3rd
  const order = [top3[1], top3[0], top3[2]];
  const heights = [podiumHeights[1], podiumHeights[0], podiumHeights[2]];
  const colors  = [podiumColors[1],  podiumColors[0],  podiumColors[2]];
  const ranks   = [2, 1, 3];

  return (
    <div style={{
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "center",
      gap: "12px",
      marginBottom: "48px",
    }}>
      {order.map((user, i) => (
        <div key={user.rank} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
          {/* Avatar */}
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
            {user.avatar}
          </div>

          {/* Medal */}
          <span style={{ fontSize: ranks[i] === 1 ? "28px" : "22px", lineHeight: 1 }}>
            {medals[ranks[i] - 1]}
          </span>

          {/* Name */}
          <span style={{
            fontFamily: "'Cabin Condensed', sans-serif",
            fontWeight: 600,
            fontSize: "13px",
            color: PALETTE.dark,
            textAlign: "center",
            maxWidth: "80px",
            lineHeight: 1.2,
          }}>
            {user.name.split(" ")[0]}
          </span>

          {/* Points */}
          <span style={{
            fontFamily: "'ABeeZee', sans-serif",
            fontSize: "12px",
            color: PALETTE.green,
            fontWeight: 600,
          }}>
            {user.points.toLocaleString()} pts
          </span>

          {/* Podium block */}
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
              {ranks[i]}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

function RankRow({ user, isCurrentUser }) {
  const [hovered, setHovered] = useState(false);

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
      {/* Rank number */}
      <div style={{
        width: "32px",
        fontFamily: "'Cabin Condensed', sans-serif",
        fontWeight: 700,
        fontSize: "18px",
        color: user.rank <= 3 ? PALETTE.green : PALETTE.border,
        flexShrink: 0,
      }}>
        {user.rank <= 3 ? medals[user.rank - 1] : `#${user.rank}`}
      </div>

      {/* Avatar */}
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
        {user.avatar}
      </div>

      {/* Name */}
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
          {user.name}
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
          {user.badges} insignias · {user.kg} kg reciclados
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ width: "100px", margin: "0 20px", flexShrink: 0 }}>
        <div style={{
          height: "6px",
          backgroundColor: PALETTE.chrome,
          borderRadius: "3px",
          overflow: "hidden",
        }}>
          <div style={{
            height: "100%",
            width: `${Math.round((user.points / mockData[0].points) * 100)}%`,
            backgroundColor: PALETTE.green,
            borderRadius: "3px",
            transition: "width 0.4s ease",
          }} />
        </div>
      </div>

      {/* Points */}
      <div style={{
        fontFamily: "'Cabin Condensed', sans-serif",
        fontWeight: 700,
        fontSize: "20px",
        color: PALETTE.green,
        minWidth: "80px",
        textAlign: "right",
        flexShrink: 0,
      }}>
        {user.points.toLocaleString()}
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
  const currentUserRank = 4; // Simula que el usuario actual es el #4

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

        {/* Header */}
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

        {/* Podium */}
        <Podium data={mockData} />

        {/* Divider */}
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

        {/* List */}
        <div>
          {mockData.map((user) => (
            <RankRow
              key={user.rank}
              user={user}
              isCurrentUser={user.rank === currentUserRank}
            />
          ))}
        </div>

        {/* Footer note */}
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