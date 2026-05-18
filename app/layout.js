export const metadata = {
  title: "MovieApp",
  description: "Search and manage your favourite movies",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, background: "#0a0a0a", fontFamily: "system-ui, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}