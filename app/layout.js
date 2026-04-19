import "./globals.css";

export const metadata = {
  title: "AI Study App",
  description: "Generate study materials with AI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}