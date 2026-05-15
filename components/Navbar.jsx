import Link from "next/link";

export default function Navbar({ watchlistCount }) {
  return (
    <nav style={styles.nav}>
      <Link href="/" style={styles.logo}>
        🎬 MovieApp
      </Link>
      <Link href="/watchlist" style={styles.watchlistBtn}>
        ❤️ Watchlist
        {watchlistCount > 0 && (
          <span style={styles.badge}>{watchlistCount}</span>
        )}
      </Link>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 32px",
    background: "#0a0a0a",
    borderBottom: "1px solid #222",
    position: "sticky",
    top: 0,
    zIndex: 50,
  },
  logo: {
    fontSize: "22px",
    fontWeight: "800",
    color: "#fff",
    textDecoration: "none",
    letterSpacing: "-0.02em",
  },
  watchlistBtn: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "#1a1a1a",
    color: "#fff",
    padding: "9px 18px",
    borderRadius: "10px",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "600",
    border: "1px solid #333",
    position: "relative",
  },
  badge: {
    background: "#e50914",
    color: "#fff",
    borderRadius: "50%",
    width: "20px",
    height: "20px",
    fontSize: "11px",
    fontWeight: "700",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};