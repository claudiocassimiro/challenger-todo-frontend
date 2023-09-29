import "./globals.css";
import StyledComponentsRegistry from "./lib/registry";

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
      <body suppressHydrationWarning={true}>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
