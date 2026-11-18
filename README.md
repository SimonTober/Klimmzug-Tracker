# Klimmzug-Tracker

Trainings-App für zu Hause und die Klimmzugstange – ohne Gewichte, ohne Konto, ohne Server.
Läuft im Browser auf iPhone und Mac und lässt sich als App installieren (Safari → Teilen → „Zum Home-Bildschirm“).

## Funktionen

- **Klimmzug-Programm**: 10 Sätze pro Einheit mit steigender Last, Pausen-Stoppuhr, Max-Test, Verlauf mit Prognose bis Ende 2026
- **32 Übungen** (Stange, Oberkörper, Beine, Core, Cardio) mit Schritt-für-Schritt-Anleitung, Tipp und YouTube-Tutorial
- **9 fertige Workouts** + **eigene Workouts** zusammenstellen
- **Interaktiver Workout-Player**: Countdown-Ring, automatische Pausen, Töne, deutsche Sprachansage, Display bleibt an, Tastatursteuerung am Mac (Leertaste, Pfeiltasten)
- **Fortschritt**: Wochenziel, Aktivitäts-Balken, Kalender, Serie, kcal-Schätzung, 16 Erfolge
- **Backup** als JSON-Datei – alle Daten bleiben auf dem Gerät

## Dateien

| Datei | Inhalt |
|---|---|
| `index.html` | Struktur der fünf Tabs |
| `styles.css` | Design |
| `data.js` | Übungen, Workouts, Video-Links |
| `app.js` | App-Logik |
| `sw.js`, `manifest.json`, `icon-*.png` | Installation und Offline-Betrieb |

Neue Übung hinzufügen: Eintrag in `EXERCISES` in `data.js`, optional ein Video in `VIDEOS`.
