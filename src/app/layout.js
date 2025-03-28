import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "antd/dist/reset.css";
import { ScopeTwoProvider } from "./(Scopes)/Scopetwo/Context/ScopeTwoContext";
import { ScopeThreeProvider } from "./(Scopes)/Scopethree/Context/ScopeThreeContext";
import { ScopeOneProvider } from "./(Scopes)/ScopeOne/Context/ScopeOneContext";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Emission Tracker",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
      >
        <ScopeOneProvider>
          <ScopeTwoProvider>
            <ScopeThreeProvider>

              {children}
            </ScopeThreeProvider>


          </ScopeTwoProvider></ScopeOneProvider>
      </body>
    </html>
  );
}
