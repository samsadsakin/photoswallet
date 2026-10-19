import "./globals.css";

export const metadata = {
  title: "Photo Wallet - Secure Cloud Storage",
  description: "Secure Personal Photo and Album Management",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn" className="dark">
      <body className="antialiased bg-[#050811] text-slate-100 min-h-screen selection:bg-blue-600">
        {children}
      </body>
    </html>
  );
}