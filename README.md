# Klimmzug-Tracker

Trainings-App für zu Hause und die Klimmzugstange – ohne Gewichte, ohne Konto, ohne Server.
Läuft im Browser auf iPhone und Mac und lässt sich als App installieren (Safari → Teilen → „Zum Home-Bildschirm“).

## Funktionen

- **Klimmzug-Programm**: 10 Sätze pro Einheit mit steigender Last, Pausen-Stoppuhr, Max-Test, Verlauf mit Prognose bis Ende 2026
- **Persönlicher Coach**: Ziel, Level und Trainingstage wählen – daraus entsteht jede Woche ein Plan; die Intensität passt sich nach jedem Workout an
- **40 Übungen** (Stange, Oberkörper, Beine, Core, Cardio, Mobility) mit Schritt-für-Schritt-Anleitung, Tipp und YouTube-Tutorial
- **10 fertige Workouts**, Aufwärmen und Cool-down + **eigene Workouts** zusammenstellen
- **Interaktiver Workout-Player**: Countdown-Ring, automatische Pausen, Töne, deutsche Sprachansage, Display bleibt an, Wiederholungen anpassen, persönliche Bestleistungen, Tastatursteuerung am Mac (Leertaste, Pfeiltasten, +/-)
- **Fortschritt**: Wochenziel, Aktivitäts-Balken, Kalender, Serie, kcal-Schätzung, 20 Erfolge
- **Videos direkt in der App** (eingebettet, im Workout als Overlay mit Auto-Pause)
- **Erinnerungen**: Wochenplan als wiederkehrende Kalendertermine mit Alarm (iPhone/Mac-Kalender)
- **Übertragen** zwischen iPhone und Mac per AirDrop/Teilen, **Backup** als JSON-Datei – alle Daten bleiben auf dem Gerät

## Dateien

| Datei | Inhalt |
|---|---|
| `index.html` | Struktur der fünf Tabs |
| `styles.css` | Design |
| `data.js` | Übungen, Workouts, Video-Links |
| `app.js` | App-Logik |
| `sw.js`, `manifest.json`, `icon-*.png` | Installation und Offline-Betrieb |

Neue Übung hinzufügen: Eintrag in `EXERCISES` in `data.js`, optional ein Video in `VIDEOS`.
