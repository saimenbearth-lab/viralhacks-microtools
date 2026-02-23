_# Modul 3 – Workflow & SOP System
## 3.4 Task-Automatisierung (Anleitungen)

---

## Warum Automatisierung?

Jede manuelle, wiederkehrende Aufgabe ist ein potenzieller Zeitfresser und eine Fehlerquelle. Mit Tools wie Make.com oder Zapier kannst du diese Aufgaben automatisieren und so dein Business effizienter machen. Hier sind zwei grundlegende Anleitungen.

---

## Anleitung 1: E-Mail-Anhang automatisch in Google Drive speichern (Make.com)

**Problem:** Du bekommst ständig wichtige Anhänge per E-Mail (z.B. Briefings, Rechnungen) und musst sie manuell herunterladen und in Google Drive sortieren.

**Lösung:** Ein Make.com-Szenario, das dies automatisch erledigt.

**Setup-Video:** [Link zu einem kurzen Loom-Video, das den Prozess zeigt]

**Schritt-für-Schritt-Anleitung:**

1.  **Neues Szenario in Make.com erstellen.**
2.  **Modul 1: E-Mail-Trigger**
    *   Wähle das Modul `Gmail` (oder `Outlook Mail`).
    *   Als Trigger wähle `Watch emails`.
    *   Verbinde dein Google-Konto.
    *   Stelle den Filter so ein, dass nur E-Mails mit Anhang berücksichtigt werden (z.B. `Has attachment: Yes`).
    *   Optional: Filtere nach Absender oder Betreff, um nur relevante E-Mails zu verarbeiten.
3.  **Modul 2: Iterator**
    *   Füge einen `Iterator` hinzu. Dieser ist notwendig, da eine E-Mail mehrere Anhänge haben kann.
    *   Verbinde den Iterator mit dem `Attachments`-Array aus dem E-Mail-Modul.
4.  **Modul 3: Google Drive Upload**
    *   Wähle das Modul `Google Drive`.
    *   Als Aktion wähle `Upload a file`.
    *   Verbinde dein Google-Drive-Konto.
    *   Wähle den Zielordner aus (z.B. `Kunden-Uploads`).
    *   Als `File Name` wähle den Dateinamen aus dem Iterator-Modul.
    *   Als `Data` wähle die `Data`-Variable aus dem Iterator-Modul.
5.  **Szenario aktivieren:** Speichere das Szenario und aktiviere es. Es läuft nun automatisch im Hintergrund.

---

## Anleitung 2: Neue Kunden in eine Brevo-Liste eintragen (Zapier)

**Problem:** Du gewinnst einen neuen Kunden (z.B. über Stripe, oder du markierst ihn in deinem CRM) und musst ihn manuell zu deiner E-Mail-Liste für Bestandskunden hinzufügen.

**Lösung:** Ein Zap, der dies automatisch erledigt.

**Setup-Video:** [Link zu einem kurzen Loom-Video, das den Prozess zeigt]

**Schritt-für-Schritt-Anleitung:**

1.  **Neuen Zap in Zapier erstellen.**
2.  **Trigger: Neuer Kunde**
    *   Wähle die App, die einen neuen Kunden signalisiert. Beispiele:
        *   `Stripe`: Trigger `New Customer`.
        *   `Pipedrive / HubSpot`: Trigger `New Deal` in Stage `Won`.
        *   `Google Sheets`: Trigger `New Row` in einem Sheet "Neue Kunden".
    *   Verbinde dein Konto und konfiguriere den Trigger.
3.  **Action: Kontakt in Brevo erstellen/aktualisieren**
    *   Wähle die App `Brevo` (ehemals Sendinblue).
    *   Als Aktion wähle `Create or Update Contact`.
    *   Verbinde dein Brevo-Konto.
    *   **Mapping der Felder:**
        *   `Email`: Ziehe das E-Mail-Feld aus dem Trigger-Schritt hierher.
        *   `First Name`: Ziehe das Vornamen-Feld hierher.
        *   `Last Name`: Ziehe das Nachnamen-Feld hierher.
    *   **Liste auswählen:** Wähle die Liste aus, zu der der Kontakt hinzugefügt werden soll (z.B. "Bestandskunden").
4.  **Zap aktivieren:** Teste den Zap und aktiviere ihn.

---

## Prompt: Automatisierungs-Ideen finden

```
Du bist ein Automatisierungs-Berater für Freelancer.

Ich bin ein [DEINE PROFESSION, z.B. Content Marketing Freelancer].
Meine meistgenutzten Tools sind: [Gmail, Notion, Slack, Google Drive, Canva, ChatGPT].

Liste 5 wiederkehrende Aufgaben in meinem Alltag auf, die ich mit Make.com oder Zapier automatisieren kann.

Für jede Idee:
1.  **Der Prozess:** Was wird automatisiert?
2.  **Der Trigger:** Wodurch wird die Automation ausgelöst?
3.  **Die Action:** Was passiert am Ende?
4.  **Der Nutzen:** Wie viel Zeit spare ich pro Woche?
```
