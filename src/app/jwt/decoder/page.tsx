import { Metadata } from "next";
import JWTDecoderClient from "./JWTDecoderClient";

export const metadata: Metadata = {
  title: "JWT Decoder Online - Decode & Inspect JSON Web Tokens | DevDashboard",
  description: "Decode and inspect JSON Web Tokens (JWT) safely. View encoded token headers, payload data, algorithms, and expirations inside your browser. 100% secure client-side execution.",
  keywords: [
    "JWT Decoder",
    "decode JWT online",
    "JSON Web Token reader",
    "inspect JWT token",
    "JWT payload viewer",
    "HS256 decoder",
    "offline JWT decoder"
  ],
  alternates: {
    canonical: "/jwt/decoder",
  },
  openGraph: {
    title: "JWT Decoder Online - Decode & Inspect JSON Web Tokens | DevDashboard",
    description: "Decode token claims, algorithms, and exp dates instantly in your browser. Complete client-side conversion, zero server calls.",
    type: "website",
  }
};

export default function JWTDecoderPage() {
  return <JWTDecoderClient />;
}
