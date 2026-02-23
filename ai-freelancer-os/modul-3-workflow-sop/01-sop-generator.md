_# Modul 3 – Workflow & SOP System
## 3.1 SOP-Generator (Prompt)

---

## Was ist eine SOP?

Eine **Standard Operating Procedure (SOP)** ist eine detaillierte Schritt-für-Schritt-Anleitung, die beschreibt, wie eine wiederkehrende Aufgabe ausgeführt wird. Das Ziel ist, konsistente Ergebnisse zu gewährleisten, Fehler zu minimieren und Aufgaben delegierbar zu machen.

---

## Der universelle SOP-Generator-Prompt

Dieser Prompt erstellt eine vollständige, formatierte SOP für jeden beliebigen Prozess in deinem Freelancer-Business. Das Ergebnis kann direkt in Notion, Confluence oder ein anderes Wiki kopiert werden.

```
Du bist ein Experte für Prozessoptimierung und Dokumentation im DACH-Raum.

Erstelle eine detaillierte Standard Operating Procedure (SOP) für den folgenden Prozess:

**PROZESS:** [HIER DEN PROZESS EINFÜGEN, z.B. "Neuen Kunden onboarden", "Wöchentlichen Newsletter erstellen", "Reels in Batch-Produktion erstellen"]

Die SOP soll im Markdown-Format erstellt werden und folgende Abschnitte enthalten:

**1. ZWECK:** (1 Satz: Warum gibt es diesen Prozess?)
**2. VERANTWORTLICH:** (Wer führt diesen Prozess aus?)
**3. BENÖTIGTE TOOLS:** (Liste der Software/Zugänge)
**4. FREQUENZ:** (Wie oft wird dieser Prozess ausgeführt? z.B. wöchentlich, pro Projekt)
**5. CHECKLISTE (SCHRITT FÜR SCHRITT):**
   - [ ] Schritt 1: ...
   - [ ] Schritt 2: ...
   - [ ] Schritt 3: ...
   (Sei so detailliert wie möglich. Jeder Klick, jeder Befehl.)

**6. ERFOLGS-KRITERIEN:** (Wann ist der Prozess erfolgreich abgeschlossen?)
**7. HÄUFIGE FEHLER & LÖSUNGEN:** (Was kann schiefgehen und wie wird es behoben?)

Stil: Klar, präzise, professionell. Siezen ist nicht notwendig, da es eine interne SOP ist.
```

---

## Beispiel-Anwendung

**Eingabe für den Prompt:**
`PROZESS: "Wöchentlichen Newsletter mit einem KI-Tipp erstellen"`

**Ergebnis (Auszug):**

### SOP: Wöchentlicher Newsletter (KI-Tipp)

**1. ZWECK:**
Diese SOP stellt sicher, dass jeden Dienstag pünktlich ein qualitativ hochwertiger Newsletter mit einem KI-Tipp an unsere E-Mail-Liste versendet wird, um Vertrauen aufzubauen und Autorität zu demonstrieren.

**2. VERANTWORTLICH:**
[Dein Name]

**3. BENÖTIGTE TOOLS:**
- Notion (für Ideen)
- ChatGPT / Claude
- Brevo / MailerLite
- Canva (für optionale Grafiken)

**4. FREQUENZ:**
Jeden Montag (Vorbereitung für Versand am Dienstag)

**5. CHECKLISTE (SCHRITT FÜR SCHRITT):**
- [ ] **Thema finden:** Öffne die Notion-Liste "Newsletter-Ideen" und wähle ein Thema.
- [ ] **Prompt ausführen:** Nutze den "Newsletter-Ideen-Generator"-Prompt, um einen Rohtext zu erstellen.
- [ ] **Text verfeinern:** Überarbeite den Text, füge eine persönliche Einleitung und eine klare CTA hinzu.
- [ ] **Newsletter anlegen:** Logge dich in Brevo ein und erstelle eine neue Kampagne.
- [ ] **Inhalt einfügen:** Kopiere den finalen Text und die Betreffzeile in die Kampagne.
- [ ] **Test-E-Mail senden:** Sende eine Test-E-Mail an deine eigene Adresse und überprüfe Links und Formatierung.
- [ ] **Versand planen:** Plane den Versand für Dienstag, 8:00 Uhr an die Liste "Aktive Abonnenten".

**6. ERFOLGS-KRITERIEN:**
- Newsletter ist für Dienstag, 8:00 Uhr geplant.
- Test-E-Mail wurde geprüft und für gut befunden.
- Keine Rechtschreib- oder Formatierungsfehler.

**7. HÄUFIGE FEHLER & LÖSUNGEN:**
- **Fehler:** Links funktionieren nicht. **Lösung:** Immer jeden Link in der Test-E-Mail klicken.
- **Fehler:** Schlechte Öffnungsrate. **Lösung:** A/B-Test für Betreffzeilen durchführen.

---

## Workflow-Tipp

Erstelle eine "SOP-Datenbank" in Notion. Für jeden wiederkehrenden Prozess in deinem Business (mind. 2x pro Monat) erstellst du mit diesem Prompt eine SOP. Das ist die Grundlage für die Skalierung und das Outsourcing von Aufgaben.
