import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { FaqJsonLd, CalculatorJsonLd } from "@/components/JsonLd";
import PasswordGenEn from "./PasswordGenEn";

export const metadata: Metadata = {
  title: "Password Generator - Create Strong Random Passwords",
  description: "Need a strong password? Generate secure random passwords instantly. Custom length, symbols & strength indicator.",
  alternates: { canonical: "https://moduncalc.com/en/password" },
};

export default function Page() {
  return (
    <PageLayout eyebrow="Tools" title="Password Generator" description="Generate secure random passwords instantly.">
      <CalculatorJsonLd name="Password Generator" description="Generate secure random passwords with customizable length and character types." url="https://moduncalc.com/en/password" />
      <FaqJsonLd items={[
        { q: "How long should my password be?", a: "A strong password should be at least 12-16 characters long. Each additional character exponentially increases the time needed to crack it. For high-security accounts, use 20+ characters." },
        { q: "Are these passwords generated securely?", a: "Yes. This tool uses the Web Crypto API (crypto.getRandomValues), which provides cryptographically secure random number generation directly in your browser. No passwords are sent to any server." },
        { q: "Should I use a password manager?", a: "Absolutely. A password manager lets you use unique, strong passwords for every account without memorizing them. Popular options include Bitwarden (free/open-source), 1Password, and LastPass." },
      ]} />
      <PasswordGenEn />
    </PageLayout>
  );
}
