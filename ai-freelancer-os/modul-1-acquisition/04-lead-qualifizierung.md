# Modul 1 – Client Acquisition System
## 1.4 Lead-Qualifizierung (BANT-System für Freelancer)

---

## BANT-Checkliste (Freelancer-Adaption)

Jede Anfrage wird nach diesen 4 Kriterien bewertet. Jedes Kriterium gibt 0–3 Punkte.

### B – Budget

| Punkte | Signal |
|---|---|
| 0 | Kein Budget genannt, fragt nach "was kostet das ungefähr?" |
| 1 | Vages Budget ("wir haben nicht viel Budget") |
| 2 | Budget-Range genannt ("zwischen 2.000 und 5.000 €") |
| 3 | Konkretes Budget, passt zu deinem Preis oder liegt darüber |

### A – Authority (Entscheidungsbefugnis)

| Punkte | Signal |
|---|---|
| 0 | "Ich muss das noch mit meinem Chef besprechen" |
| 1 | "Wir entscheiden im Team" |
| 2 | "Ich bin zuständig, brauche aber finale Freigabe von GF" |
| 3 | "Ich entscheide das" / Geschäftsführer / Inhaber |

### N – Need (Bedarf)

| Punkte | Signal |
|---|---|
| 0 | "Wir schauen uns mal um" / Kein konkretes Problem |
| 1 | Problem erkannt, aber keine Dringlichkeit |
| 2 | Konkretes Problem, aktiv nach Lösung suchend |
| 3 | Akutes Problem, das Geld/Kunden kostet. Braucht JETZT eine Lösung |

### T – Timeline (Zeitrahmen)

| Punkte | Signal |
|---|---|
| 0 | "Irgendwann in der Zukunft" / Kein Zeitdruck |
| 1 | "In den nächsten 3-6 Monaten" |
| 2 | "In den nächsten 4-8 Wochen" |
| 3 | "So schnell wie möglich" / "Nächste Woche" / Deadline vorhanden |

---

## Bewertung & Handlung

| Score | Kategorie | Handlung |
|---|---|---|
| 10–12 | A-Lead (Hot) | Angebot innerhalb von 24h senden. Höchste Priorität. |
| 7–9 | B-Lead (Warm) | Angebot senden + Follow-Up-Sequenz aktivieren. |
| 4–6 | C-Lead (Lauwarm) | Kurzes Angebot oder Erstgespräch. Nicht zu viel Zeit investieren. |
| 0–3 | D-Lead (Kalt) | Höflich ablehnen oder auf Warteliste setzen. Kein Angebot. |

---

## Prompt: Anfrage automatisch qualifizieren

```
Du bist ein Lead-Qualifizierungs-Assistent für einen Freelancer im DACH-Raum.

Analysiere diese Kundenanfrage nach dem BANT-System:

ANFRAGE:
"""
[E-MAIL / NACHRICHT DES INTERESSENTEN EINFÜGEN]
"""

Bewerte jeden BANT-Faktor mit 0-3 Punkten:

B – Budget: [Punkte] – [Begründung in 1 Satz]
A – Authority: [Punkte] – [Begründung in 1 Satz]
N – Need: [Punkte] – [Begründung in 1 Satz]
T – Timeline: [Punkte] – [Begründung in 1 Satz]

GESAMT-SCORE: [X]/12
KATEGORIE: [A/B/C/D]-Lead
EMPFOHLENE HANDLUNG: [Was tun?]

FEHLENDE INFORMATIONEN:
[Liste der Infos, die im Erstgespräch geklärt werden müssen]

VORGESCHLAGENE RÜCKFRAGEN:
[2-3 konkrete Fragen, die die fehlenden BANT-Infos klären]
```

---

## Prompt: Absage-E-Mail für D-Leads

```
Schreibe eine höfliche Absage-E-Mail für einen Freelancer im DACH-Raum.

KONTEXT:
- Lead-Name: [NAME]
- Firma: [FIRMA]
- Anfrage: [KURZBESCHREIBUNG]
- Absagegrund: [Budget zu niedrig / Kein klarer Bedarf / Zeitrahmen passt nicht / Nicht mein Fachgebiet]

Die E-Mail soll:
- Höflich und wertschätzend sein
- Einen konkreten Grund nennen (ohne zu detailliert zu werden)
- Optional: Einen alternativen Anbieter oder Ressource empfehlen
- Die Tür für zukünftige Zusammenarbeit offen lassen
- Maximal 5 Sätze lang sein

Sieze den Empfänger. Professioneller DACH-Stil.
```

---

## Schnell-Checkliste: Anfrage in 60 Sekunden bewerten

```
□ Hat der Interessent ein konkretes Problem genannt?
□ Gibt es einen Zeitrahmen oder eine Deadline?
□ Ist ein Budget erwähnt oder impliziert?
□ Schreibt der Entscheider selbst?
□ Passt das Projekt zu meinem Leistungsangebot?
□ Kann ich in den nächsten 2 Wochen starten?

4+ Haken = Angebot schreiben
2-3 Haken = Rückfragen stellen
0-1 Haken = Höflich ablehnen
```
