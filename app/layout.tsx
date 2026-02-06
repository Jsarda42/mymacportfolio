import { OSProvider } from "@/context/OSContext";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <OSProvider>
          {children}
        </OSProvider>
      </body>
    </html>
  );
}