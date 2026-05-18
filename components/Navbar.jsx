import Link from "next/link";

export default function Navbar({ watchlistCount }) {
  return (
    <nav style={s.nav}>
      <Link href="/" style={s.logo}>🎬 MovieApp</Link>
      <Link href="/watchlist" style={s.wlBtn}>
        ❤️ Watchlist
        {watchlistCount > 0 && (
          <span style={s.badge}>{watchlistCount}</span>
        )}
      </Link>
    </nav>
  );
}

const s = {
  nav: {
    display: "flex", justifyContent: "space-between",
    alignItems: "center", padding: "16px 32px",
    background: "#0a0a0a", borderBottom: "1px solid #1a1a1a",
    position: "sticky", top: 0, zIndex: 50,
  },
  logo: {
    fontSize: "22px", fontWeight: "800",
    color: "#fff", textDecoration: "none",
  },
  wlBtn: {
    display: "flex", alignItems: "center", gap: "8px",
    background: "#1a1a1a", color: "#fff",
    padding: "9px 18px", borderRadius: "10px",
    textDecoration: "none", fontSize: "14px",
    fontWeight: "600", border: "1px solid #333",
  },
  badge: {
    background: "#e50914", color: "#fff",
    borderRadius: "50%", width: "20px", height: "20px",
    fontSize: "11px", fontWeight: "700",
    display: "flex", alignItems: "center", justifyContent: "center",
  },
};