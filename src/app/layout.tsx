import "./globals.css";

export const metadata = {
  title: "Todo List",
  description: "Seu assistente em Organização",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
