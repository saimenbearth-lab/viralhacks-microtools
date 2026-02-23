_# Modul 3 – Workflow & SOP System
## 3.3 Meeting-Zusammenfassungs-Workflow (Prompt)

---

## Das Problem

Meetings sind notwendig, aber das Schreiben von Protokollen ist ein enormer Zeitfresser. Dieser Workflow reduziert den Aufwand von 30 Minuten auf unter 2 Minuten pro Meeting.

---

## Der Workflow

1.  **Meeting aufzeichnen:** Nutze die Aufzeichnungsfunktion in Zoom, Google Meet oder Teams. Alternativ: Nutze ein Tool wie Otter.ai oder Fathom, das das Meeting transkribiert.
2.  **Transkript generieren:** Lass dir das automatisch erstellte Transkript ausgeben.
3.  **Prompt ausführen:** Kopiere das gesamte Transkript und füge es in den unten stehenden Prompt ein.
4.  **Ergebnis prüfen & versenden:** Überfliege die Zusammenfassung, korrigiere eventuelle Fehler und sende sie an alle Teilnehmer.

---

## Der magische Prompt: Meeting-Zusammenfassung

```
Du bist ein hocheffizienter Assistent für einen Freelancer im DACH-Raum.

Deine Aufgabe ist es, das folgende Meeting-Transkript zu analysieren und eine professionelle Zusammenfassung zu erstellen.

**TRANSKRIPT:**
"""
[HIER DAS VOLLSTÄNDIGE MEETING-TRANSKRIPT EINFÜGEN]
"""

**ANWEISUNGEN:**

1.  **ZUSAMMENFASSUNG (TL;DR):** Erstelle eine kurze Zusammenfassung der wichtigsten besprochenen Punkte und Entscheidungen (max. 5 Bullet Points).
2.  **ACTION ITEMS (NÄCHSTE SCHRITTE):** Extrahiere alle konkreten Aufgaben. Erstelle eine Tabelle mit den Spalten: "Aufgabe", "Verantwortlich" und "Deadline".
3.  **OFFENE FRAGEN:** Liste alle Punkte auf, die nicht geklärt werden konnten und weiterer Diskussion bedürfen.
4.  **TONALITÄT:** Analysiere die Stimmung des Gesprächs (z.B. positiv, konstruktiv, angespannt).

Formatiere die Ausgabe klar und übersichtlich im Markdown-Format. Sieze die Teilnehmer in der Zusammenfassung nicht, da es ein internes Dokument ist.
```

---

## Beispiel-Output

### **Meeting-Zusammenfassung: Projekt-Kick-off "Website Relaunch"**

**ZUSAMMENFASSUNG (TL;DR):**

*   Das Hauptziel des Relaunchs ist die Steigerung der Conversion Rate um 20%.
*   Die Zielgruppe sind KMUs im B2B-Bereich.
*   Das Design soll modern, aber seriös wirken.
*   Phase 1 (Konzept) soll bis Ende nächster Woche abgeschlossen sein.
*   Content wird vom Kunden geliefert.

**ACTION ITEMS (NÄCHSTE SCHRITTE):**

| Aufgabe | Verantwortlich | Deadline |
| --- | --- | --- |
| Moodboard mit 3 Design-Richtungen erstellen | [Dein Name] | 28.02.2026 |
| Bestehenden Content für die neue Struktur liefern | Kunde (Herr Meier) | 03.03.2026 |
| Technischen Zugang zum Hosting bereitstellen | Kunde (IT-Abteilung) | 27.02.2026 |

**OFFENE FRAGEN:**

*   Welches Budget steht für Stock-Fotos zur Verfügung?
*   Soll ein Blog integriert werden?

**TONALITÄT:**
Die Stimmung war sehr positiv und konstruktiv. Der Kunde ist motiviert und freut sich auf die Zusammenarbeit.

---

## Automatisierungs-Tipp (Make.com / Zapier)

Erstelle einen Workflow, der automatisch neue Aufzeichnungen aus deinem Google Drive / Zoom Cloud-Ordner nimmt, das Transkript an die KI sendet und die Zusammenfassung als Entwurf in deinem E-Mail-Programm oder als neue Seite in Notion ablegt. Das reduziert den manuellen Aufwand auf null.
