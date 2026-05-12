# BEARTH Website – Design Ideen

Drei Stilrichtungen für das BEARTH Master-Brand + BEARTH SIGNAL Cashflow-Hub. Brand-Farben fix: Navy `#1A1A2E`, Gold `#F5A623`, Signal Red `#E94560`, White `#FFFFFF`. Tonalität: radikal, operator, geerdet, kein Coach-Sprech.

---

<response>
<text>
**Idea 1 — Operator Terminal (gewählte Richtung)**

- **Design Movement:** Brutalist Editorial × Trading Terminal. Inspiriert von Bloomberg-Terminals, NTS Radio und Off-White Editorial.
- **Core Principles:** (1) Information dichte vor Whitespace-Romantik. (2) Mono-Schriften für Daten, Display-Schriften für Statements. (3) Live-Signal-Ästhetik – die Seite fühlt sich wie ein Dashboard an, nicht wie eine Marketingseite. (4) Nichts ist generisch – Ränder, Tickers, Status-Badges überall.
- **Color Philosophy:** Navy als Standard-Hintergrund (operator-grade dark), Gold als brand anchor (BEARTH-Logo, Headlines), Signal Red ausschliesslich für aktive Signale / CTAs / Live-Tag, White als hochkontrastige Datenfläche. Kein Lila, keine Gradients.
- **Layout Paradigm:** Asymmetrisches 12-Spalten-Raster mit linker Sidebar-Index (00 / 01 / 02 …) wie ein Operator-Manual. Sticky Top-Bar mit Live-Ticker (heutiges Signal, Gumroad-Drop, Vault-Status). Sektionen als „MODULES" nummeriert.
- **Signature Elements:** (1) Ticker-Bar oben („SIGNAL // 2026-05-12 // LIVE"), (2) ASCII / Mono-Linien als Trenner, (3) Status-Badges (LIVE, ARMED, IDLE), (4) BEARTH-Globus-Logo mit Gold-Outline.
- **Interaction Philosophy:** Hover = Status-Wechsel (Badge wechselt von IDLE auf ARMED). Klicks fühlen sich wie Befehle an. Keine Easter-Eggs, keine Spielereien – jedes Element hat einen Zweck.
- **Animation:** Reduziert. Ticker scrollt linear. Buttons: scale(0.97) on press, 160ms ease-out. Sektions-Entries: opacity 0→1 + translateY(8px), 220ms ease-out. Keine parallax, keine 3D.
- **Typography System:** Display: „Space Grotesk" (Bold/Black) für Headlines. Mono: „JetBrains Mono" für Ticker, Status, Daten, Code-Snippets. Body: „Inter" (Regular/Medium) – aber nie alleinstehend, immer im Kontrast zu Mono. Hierarchie: H1 80–120px Space Grotesk, H2 40–56px, Body 16–18px Inter, Mono 12–14px caps.
</text>
<probability>0.08</probability>
</response>

<response>
<text>
**Idea 2 — Editorial Magazine**
- Inspiriert von The Browser, Stratechery, Monocle. Heller Hintergrund, lange Lesefläche, serifige Headlines (Tiempos / GT Sectra), gold akzentuiert. Gut für Trust, schlecht für „Operator-Adrenalin". Verworfen, weil zu coach-haftig und zu wenig Cashflow-Trigger.
</text>
<probability>0.04</probability>
</response>

<response>
<text>
**Idea 3 — Cyberpunk Glitch**
- Neon-Akzente, CRT-Scanlines, Glitch-Effekte. Visuell aufregend, aber zu viel „AI-Slop"-Risiko, lenkt von Conversion ab und passt nicht zur „Stay Grounded"-Linie der Marke. Verworfen.
</text>
<probability>0.02</probability>
</response>

---

## GEWÄHLT: Idea 1 — Operator Terminal

Begründung: Maximaler Kontrast zum 08/15-Coach-Look, signalisiert sofort Kompetenz, lässt Cashflow-Module (Signal, Vault, Gumroad-Drop) prominent als Live-Daten erscheinen, und die Mono+Display-Kombi vermeidet den Inter-Only-AI-Look.

**Verbindliche Regeln für jede Datei:**
- Default theme: dark (Navy `#1A1A2E` als Background).
- Akzent-CTA: Signal Red `#E94560`. Sekundär-CTA: Gold `#F5A623`.
- Mono = JetBrains Mono. Display = Space Grotesk. Body = Inter.
- Jede Sektion bekommt eine Modul-Nummer („MODULE 01 — SIGNAL").
- Top-Bar: Live-Ticker, immer sichtbar.
- Keine Gradients, keine purple, keine zentrierten 1-Spalten-Hero-Layouts.
