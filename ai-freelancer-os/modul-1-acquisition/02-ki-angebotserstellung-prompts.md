# Modul 1 – Client Acquisition System
## 1.2 KI-gestützte Angebotserstellung (Prompt-Chain)

---

## Übersicht

Diese Prompt-Chain verwandelt ein Kundenbriefing in ein versandfertiges Angebot in unter 10 Minuten.

**Ablauf:** Briefing einfügen → 4 Prompts nacheinander ausführen → Angebot kopieren → versenden.

---

## PROMPT 1: Kunden-Painpoint-Analyse

```
Du bist ein erfahrener Business-Analyst für Freelancer im DACH-Raum.

Analysiere das folgende Kundenbriefing und extrahiere:

1. DIE 3 GRÖSSTEN SCHMERZPUNKTE des Kunden (was kostet ihn Geld/Zeit/Nerven?)
2. DAS EIGENTLICHE ZIEL hinter der Anfrage (nicht was er sagt, sondern was er wirklich will)
3. DRINGLICHKEIT: Wie zeitkritisch ist das Projekt? (1-10)
4. BUDGET-SIGNAL: Gibt es Hinweise auf das Budget? (ja/nein + Einschätzung)
5. ENTSCHEIDER: Wer trifft die finale Entscheidung?

Kundenbriefing:
"""
[HIER BRIEFING EINFÜGEN]
"""

Formatiere die Ausgabe als strukturierte Liste. Sei direkt, keine Floskeln.
```

---

## PROMPT 2: Lösungs-Framework erstellen

```
Basierend auf dieser Painpoint-Analyse:

"""
[AUSGABE VON PROMPT 1 EINFÜGEN]
"""

Erstelle ein Lösungs-Framework mit:

1. LÖSUNGSANSATZ: Was genau wird geliefert? (3-5 konkrete Deliverables)
2. PHASEN: Teile die Lösung in 2-3 logische Phasen auf (mit Zeitrahmen)
3. QUICK WIN: Was kann der Kunde als erstes sichtbares Ergebnis erwarten? (innerhalb Woche 1)
4. MESSBARER ERFOLG: Wie wird der Erfolg gemessen? (KPIs oder konkrete Metriken)
5. RISIKO-MINIMIERUNG: Was passiert, wenn es nicht funktioniert? (Sicherheitsnetz für den Kunden)

Denke wie ein Freelancer, der 6k-15k/Monat macht und professionell arbeitet.
Keine Übertreibungen, keine leeren Versprechen.
```

---

## PROMPT 3: Nutzenkommunikation (Value Proposition)

```
Du schreibst jetzt die Nutzen-Argumentation für ein Freelancer-Angebot im DACH-Raum.

Basierend auf diesem Lösungs-Framework:

"""
[AUSGABE VON PROMPT 2 EINFÜGEN]
"""

Erstelle:

1. HEADLINE: Ein Satz, der den Kernnutzen auf den Punkt bringt
   (Format: "[Ergebnis] für [Kunde] in [Zeitraum] – ohne [größte Angst]")

2. 3 NUTZEN-ARGUMENTE: Jeweils:
   - Was der Kunde bekommt (Feature)
   - Was das für ihn bedeutet (Benefit)
   - Was das in Euro/Zeit/Aufwand wert ist (Value)

3. SOCIAL PROOF ELEMENT: Formuliere einen Satz, der Kompetenz zeigt,
   ohne anzugeben. (z.B. "Diesen Ansatz setze ich seit X Projekten ein...")

4. RISIKOUMKEHR: Ein Satz, der dem Kunden die Angst vor der Entscheidung nimmt.

Schreibe im Stil: professionell, direkt, DACH-konform (kein US-Marketing-Sprech).
Duze NICHT. Sieze den Kunden.
```

---

## PROMPT 4: Vollständiges Angebot generieren

```
Erstelle jetzt das vollständige, versandfertige Angebot.

Nutze diese Informationen:

PAINPOINT-ANALYSE:
"""
[AUSGABE VON PROMPT 1]
"""

LÖSUNGS-FRAMEWORK:
"""
[AUSGABE VON PROMPT 2]
"""

NUTZENKOMMUNIKATION:
"""
[AUSGABE VON PROMPT 3]
"""

ANGEBOTS-FORMAT: [Festpreis / Retainer / Modular]

PREIS: [DEIN PREIS] € netto

MEINE DATEN:
- Name: [DEIN NAME]
- Firma: [FIRMENNAME]
- E-Mail: [E-MAIL]
- Telefon: [TELEFON]

KUNDENDATEN:
- Firma: [KUNDENNAME]
- Ansprechpartner: [NAME]

Erstelle das Angebot im folgenden Format:
- Betreff-Zeile für die E-Mail
- Kurze persönliche Einleitung (2-3 Sätze, Bezug auf Gespräch)
- Ausgangslage (Painpoints des Kunden widerspiegeln)
- Zielsetzung
- Leistungsumfang (in Phasen)
- Nicht enthalten (Scope-Abgrenzung)
- Investition + Zahlungsplan
- Timeline
- Nächster Schritt (eine klare Handlungsaufforderung)
- Signatur

Stil: Professionell, klar, DACH-konform. Siezen. Keine Emojis.
Länge: Max. 1 A4-Seite.
```

---

## Bonus-Prompt: Angebot optimieren

```
Überprüfe dieses Angebot auf:

"""
[FERTIGES ANGEBOT EINFÜGEN]
"""

1. KLARHEIT: Versteht der Kunde in 30 Sekunden, was er bekommt?
2. NUTZEN: Ist der Nutzen für den Kunden klar formuliert (nicht nur Features)?
3. PREIS-PSYCHOLOGIE: Wird der Preis als Investition positioniert?
4. DRINGLICHKEIT: Gibt es einen Grund, JETZT zu entscheiden?
5. NÄCHSTER SCHRITT: Ist die Handlungsaufforderung glasklar?
6. RECHTLICH: Sind MwSt., Zahlungsziel und Gültigkeit angegeben?

Gib für jeden Punkt eine Bewertung (✓ oder ✗) und konkrete Verbesserungsvorschläge.
```

---

## Workflow-Zusammenfassung

| Schritt | Prompt | Dauer | Output |
|---|---|---|---|
| 1 | Painpoint-Analyse | 1 Min | Strukturierte Kundenanalyse |
| 2 | Lösungs-Framework | 2 Min | Phasenplan + Deliverables |
| 3 | Nutzenkommunikation | 2 Min | Value Proposition + Argumente |
| 4 | Angebot generieren | 3 Min | Versandfertiges Angebot |
| 5 | Optimierung (optional) | 2 Min | Qualitätscheck |

**Gesamtzeit: 8-10 Minuten** von Briefing zu versandfertigem Angebot.
