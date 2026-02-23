# Modul 1 – Client Acquisition System
## 1.3 Follow-Up System (Templates & Workflow)

---

## Warum Follow-Up entscheidend ist

80 % der Abschlüsse passieren nach dem 2.–5. Kontakt. Die meisten Freelancer senden ein Angebot und warten. Das hier ist dein System, um systematisch nachzufassen – ohne aufdringlich zu wirken.

---

## Follow-Up E-Mail 1: Tag 2 nach Angebotsversand

**Betreff:** Kurze Rückfrage zu meinem Angebot

```
Guten Tag [Herr/Frau Nachname],

ich wollte kurz nachfragen, ob mein Angebot vom [Datum] bei Ihnen
angekommen ist und ob es noch offene Fragen gibt.

Falls Sie bestimmte Punkte anpassen möchten oder der Umfang nicht
ganz passt – ich bin flexibel und finde gerne eine Lösung, die
für Sie funktioniert.

Ich stehe Ihnen jederzeit für ein kurzes Gespräch zur Verfügung.

Beste Grüße
[Dein Name]
```

---

## Follow-Up E-Mail 2: Tag 7 (Value-Add)

**Betreff:** Eine Idee für [Firmenname/Projekt]

```
Guten Tag [Herr/Frau Nachname],

unabhängig von meinem Angebot ist mir noch ein Gedanke zu
[Thema/Projekt] gekommen, der für Sie relevant sein könnte:

[1-2 Sätze: Konkreter Mehrwert, Tipp oder Beobachtung, die zeigt,
dass du mitdenkst. Z.B.: "Mir ist aufgefallen, dass Ihre
Landingpage auf Mobile die CTA unter dem Fold hat – das allein
könnte Ihre Conversion um 15-20% verbessern."]

Das ist natürlich unverbindlich und kostenlos – ich teile das gerne,
weil mir gute Zusammenarbeit wichtig ist.

Falls mein Angebot noch aktuell ist: Ich halte den vorgeschlagenen
Zeitrahmen noch bis [Datum] offen.

Beste Grüße
[Dein Name]
```

---

## Follow-Up E-Mail 3: Tag 14 (Soft Close)

**Betreff:** Soll ich den Slot freihalten?

```
Guten Tag [Herr/Frau Nachname],

kurze Frage: Ist das Projekt [Projektname] noch aktuell für Sie?

Ich plane gerade meine Kapazitäten für die kommenden Wochen und
würde den Slot gerne für Sie reservieren – brauche dafür aber
eine kurze Rückmeldung.

Drei Möglichkeiten:

1. „Ja, wir starten" → Ich sende die Rechnung
2. „Noch nicht, aber bald" → Ich halte den Slot 7 weitere Tage
3. „Aktuell kein Bedarf" → Kein Problem, ich melde mich in 3 Monaten

Ein kurzes „1", „2" oder „3" als Antwort reicht völlig.

Beste Grüße
[Dein Name]
```

---

## Follow-Up E-Mail 4: Tag 30 (Breakup-E-Mail)

**Betreff:** Ich schließe die Akte [Projektname]

```
Guten Tag [Herr/Frau Nachname],

da ich nichts mehr von Ihnen gehört habe, gehe ich davon aus,
dass das Projekt aktuell nicht mehr relevant ist. Das ist
völlig in Ordnung.

Ich schließe das Angebot hiermit ab.

Falls sich in Zukunft etwas ergibt – Sie wissen, wo Sie mich finden.

Ich wünsche Ihnen weiterhin viel Erfolg.

Beste Grüße
[Dein Name]

P.S.: Sollte ich falsch liegen und das Thema ist doch noch aktuell –
antworten Sie einfach auf diese E-Mail. Ich reagiere innerhalb von 24h.
```

---

## Automatisierungs-Workflow (Brevo / MailerLite)

### Setup-Anleitung

**Schritt 1: Kontaktliste erstellen**
- Erstelle eine Liste: "Offene Angebote"
- Pflichtfelder: E-Mail, Vorname, Nachname, Firma, Angebotsdatum, Projekttitel

**Schritt 2: Automation erstellen**
- Trigger: Kontakt wird zur Liste "Offene Angebote" hinzugefügt
- Ablauf:

```
[Kontakt hinzugefügt]
    ↓
[Warte 2 Tage]
    ↓
[Sende Follow-Up 1]
    ↓
[Warte 5 Tage]
    ↓
[Prüfe: Hat geantwortet?]
    ├── JA → [Verschiebe zu "Aktive Kunden"] → STOP
    └── NEIN ↓
[Sende Follow-Up 2 (Value-Add)]
    ↓
[Warte 7 Tage]
    ↓
[Prüfe: Hat geantwortet?]
    ├── JA → [Verschiebe zu "Aktive Kunden"] → STOP
    └── NEIN ↓
[Sende Follow-Up 3 (Soft Close)]
    ↓
[Warte 16 Tage]
    ↓
[Sende Follow-Up 4 (Breakup)]
    ↓
[Verschiebe zu "Kalte Leads"]
    ↓
[Warte 90 Tage]
    ↓
[Sende Re-Engagement E-Mail]
    ↓
STOP
```

**Schritt 3: Tags setzen**
- Tag "angebot-offen" → bei Hinzufügen zur Liste
- Tag "angebot-gewonnen" → bei Antwort + Zusage
- Tag "angebot-verloren" → nach Breakup-E-Mail
- Tag "re-engagement" → nach 90 Tagen

---

## KPI-Tracking

| Metrik | Zielwert | Messung |
|---|---|---|
| Follow-Up 1 Öffnungsrate | > 60 % | Brevo/MailerLite |
| Follow-Up 2 Antwortrate | > 15 % | Manuell tracken |
| Gesamte Abschlussquote (mit Follow-Up) | > 25 % | Angebote vs. Zusagen |
| Durchschnittliche Tage bis Zusage | < 10 Tage | Manuell tracken |

---

## Prompt: Follow-Up personalisieren

```
Personalisiere diese Follow-Up E-Mail für meinen Kunden:

TEMPLATE:
"""
[FOLLOW-UP TEMPLATE EINFÜGEN]
"""

KONTEXT:
- Kundenname: [NAME]
- Firma: [FIRMA]
- Projekt: [PROJEKT]
- Besonderheit aus dem Gespräch: [WAS WURDE BESPROCHEN?]
- Branche: [BRANCHE]

Passe den Text an, sodass er persönlich wirkt, aber professionell bleibt.
Füge einen branchenspezifischen Mehrwert-Tipp in Follow-Up 2 ein.
Sieze den Kunden. Kein Marketing-Sprech.
```
