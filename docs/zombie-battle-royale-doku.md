# Zombie-Battle-Royale im Schulhof

Das komplette Spielkonzept & Technische Dokumentation

Version 1.3 – für 1-Tages-Projekt mit KI
Erstellt für einen 13-Jährigen – super einfach zu bauen und zu erweitern.

## 1. Die Story (Hintergrundgeschichte)

Es ist ein ganz normaler Schultag – bis plötzlich der „Direktor-Virus" ausbricht!

Ein verrücktes Experiment im Chemieraum ist schiefgegangen. Innerhalb von Minuten verwandeln sich der Direktor, fast alle Lehrer und die Hälfte der Klasse in Zombies. Die Schule wird zur letzten Battle-Royale-Arena der Welt.

Du bist Alex (oder der Name, den der Junge sich aussucht), der letzte normale Schüler. Du hast nur deinen Rucksack und ein paar Schul-Utensilien dabei. Dein Ziel: Überlebe das Chaos, sammle nützliche Items aus der Schule, besiege (oder umgehe) die Zombies und erreiche das Dach, wo ein Rettungshubschrauber wartet.

Dein Herzschlag rast – nur **3 Herzen**, ein paar Minuten Zeit und ein Schulhof voller hungriger Lehrer stehen zwischen dir und der Rettung. Jede falsche Entscheidung kann dich zum Zombie machen – oder zu einem epischen Helden!

**Witz-Faktor:** Die Zombies sind ehemalige Lehrer und Mitschüler – z. B. der Zombie-Sportlehrer, der Basketbälle nach dir wirft, die Klassenraum-Zombies, die durch die Flure schlurfen, oder der Chemie-Zombie, der mit Bombenzutaten um sich schmeißt. Alles bleibt lustig und nicht zu gruselig.

## 2. Sinn / Ziel des Spiels

**Hauptziel:** Der letzte Überlebende sein und das Dach erreichen („Winner Winner Zombie Dinner"), bevor deine Herzen alle sind oder die Zombie-Horde die Schule komplett übernommen hat.

**Nebenziele:**

- So viele Items wie möglich sammeln
- Alle Schulorte erkunden
- Mehrere Enden entdecken
- Highscore schlagen (niedrigste Zeit / meiste Zombies besiegt)
- Spaß haben und mit Freunden teilen

**Lern-Effekt:** Der Junge lernt, wie man eine Geschichte plant, Entscheidungen verknüpft, Zufall und Wahrscheinlichkeit (`Math.random()`) einsetzt und eine kleine Web-App mit persistentem Zustand (localStorage) baut – alles mit KI-Unterstützung.

## 3. Wie das Spiel funktioniert (Spielmechanik)

Das Spiel ist ein interaktives Text-Abenteuer mit Mini-Kämpfen, Zeitdruck und Zufallselementen – wie ein Buch, in dem du selbst entscheidest, aber mit echter Spannung.

**Technischer Aufbau:**

- Eine einzige HTML-Datei (`zombie-royale.html`)
- Oben: HUD mit Herzen, Timer und Zombie-Zähler
- Darunter: großes Bild (aktueller Ort)
- Darunter: Story-Text
- Darunter: 2–4 Buttons mit Entscheidungen (wechseln je nach Inventar und Zustand)
- Unten: Inventar-Bereich
- Speicherstand in `localStorage` → Highscore bleibt, auch wenn Tab geschlossen wird

### Kern-Systeme

- **❤️ Herzen (HP):** Start mit 3 Herzen. Verlierst du alle → Game Over. Items wie „Verbandskasten" heilen ein Herz.
- **⏱️ Timer pro Szene:** In Entscheidungs-Szenen hast du ~10 Sekunden. Läuft er ab → Zombie kommt näher, du verlierst ein Herz oder wirst in einen Kampf gezwungen.
- **🧟 Zombie-Counter:** Oben rechts steht z. B. „Zombies in der Schule: 24". Jeder Kampf, den du gewinnst, reduziert die Zahl. Erreicht sie 0 → Bonus-Ende.
- **🎲 Zufallselement:** Kämpfe und manche Events nutzen `Math.random()`. Items geben Boni (z. B. Baseballschläger: +3 auf Angriffswurf).
- **💾 Speichern:** Nach jedem Ort wird automatisch gespeichert. Highscore-Tabelle mit Name, Zeit und Zombie-Kills.

**Interaktionen im Überblick:**

- **Klicken auf Button** → Wechselt die Szene + Bild + Text
- **Item benutzen** → Zahlentaste 1–9 aktiviert das Item im entsprechenden Inventar-Slot
- **Kampf-Events** → Szene wechselt in einen Mini-Kampf (siehe Kapitel 5)
- **Zufalls-Events** → Manchmal kommt ein Zombie-Angriff und du hast 5 Sekunden Reaktionszeit
- **Mehrere Enden** → Je nach Herzen, Items, Zeit und besiegten Zombies gibt es 3–4 Abschlüsse

### Steuerung (Desktop-only)

Die Story nutzt nur Maus + Zahlentasten. Jedes Minispiel bringt seine eigene Tastenbelegung mit (dokumentiert im jeweiligen File in [game/minigames/](../game/minigames/)). Gemeinsamer Grundsatz: **A / D** (oder **← / →**) für Bewegung, **W / Space** für Aktion.

| Taste | Story | Minispiele (Default) |
|-------|-------|----------------------|
| **Maus-Klick** | Entscheidung wählen | spielabhängig |
| **1–9** | Item aus Slot nutzen | Item nutzen |
| **A / ←** | – | Bewegen links |
| **D / →** | – | Bewegen rechts |
| **W / Space** | Weiter (bei langem Text) | Aktion (Sprung / Werfen / Aufheben) |
| **ESC** | Pause | Pause |
| **H** | Hilfe (Cheat-Sheet) | Hilfe |
| **Enter** | Restart (Game Over) | – |

**Hinweise:**

- Entscheidungen in der Story werden **nur per Maus** gewählt – keine Tastenkürzel, damit 1–9 immer eindeutig Item-Slots sind.
- Aktive vs. passive Items: Passive Items (z. B. Baseballschläger) wirken automatisch als Bonus, aktive (z. B. Chemie-Bombe) werden per Zahlentaste ausgelöst.

## 4. Detaillierte Szenen & Interaktionen

**Scope:** 6 Stationen als linearer Flucht-Pfad, pro Station ein eigenes Minispiel. Basketball-Ausweichen ist fertig; die anderen sind Stubs / Platzhalter mit Auto-Sieg, damit der Ablauf klickbar bleibt.

### Haupt-Orte (Szenen, in Spielreihenfolge)

1. **Schulhof** (Start) — Baseballschläger-Pickup, Weg zur Mensa
2. **Mensa** — Minispiel: Teller werfen auf Zombies, die von oben nach unten laufen
3. **Klassenraum** — Minispiel: Labyrinth-Flucht (Top-down zwischen Tischen)
4. **Turnhalle** — Minispiel: An Seilen hochklettern, Gegenständen ausweichen
5. **Basketballplatz** — Minispiel: Ausweichen vor dem Zombie-Sportlehrer
6. **Dach** (Finale) — Endszene Hubschrauber

### Beispiel-Szenen mit allen Interaktionen

#### Szene 1 – Schulhof (Start)

**Text:** „Du stehst auf dem Schulhof. Überall stolpern Zombies herum. Dein Baseballschläger liegt im Gebüsch."

Buttons:

- Rüber zur Mensa

#### Szene 2 – Mensa

**Text:** „Die Mensa — früher Pommes und Pizza, jetzt taumeln Zombies von der Ausgabe nach unten. Zum Glück liegt hier ein Stapel Plastikteller."

→ **Kampf-Typ:** Teller werfen (Top-down-Shooter)

Buttons:

- Teller schmeißen (Minispiel starten)
- Zurück zum Schulhof

#### Szene 3 – Klassenraum

**Text:** „Stuhlreihen, umgestoßene Tische, Rucksäcke auf dem Boden. Zwischen den Tischen schleichen Zombies."

→ **Kampf-Typ:** Labyrinth-Flucht

Buttons:

- Rein ins Labyrinth
- Zurück zur Mensa

#### Szene 4 – Turnhalle

**Text:** „Seile hängen von der Decke, Matten und Medizinbälle liegen kreuz und quer. Von oben winkt die Dachluke."

→ **Kampf-Typ:** Seilklettern + Ausweichen

Buttons:

- Ans Seil und hoch
- Zurück zum Klassenraum

#### Szene 5 – Basketballplatz

**Text:** „Der riesige Zombie-Sportlehrer pfeift und wirft Basketbälle nach dir!"

→ **Kampf-Typ:** Basketball-Ausweichen *(fertig implementiert)*

Buttons:

- Los geht's — reingehen
- Zurück zur Turnhalle

#### Szene 6 – Dach (Finale)

**Text:** „In der Ferne das Rattern eines Hubschraubers — er kommt näher und lässt ein Seil runter."

→ **Endszene:** Hubschrauber (kein weiteres Minispiel, kinematische Outro-Sequenz)

Buttons:

- Spiel neu starten

### Inventar-System

**Start-Item:** Baseballschläger (+3 Angriffsbonus)

**Sammelbare Items (optional, an Minispiel-Siege koppelbar):**

- Teller-Stapel (Mensa) → Zusatzwürfe im Teller-Minispiel oder Ablenkung im Labyrinth
- Basketball (Basketballplatz) → Zusatzleben im Basketball-Minispiel, Ablenkung im Labyrinth
- Seil (Turnhalle) → kürzt den Seil-Climb beim Wiederholen ab
- Verbandskasten (Zufallsdrop) → heilt 1 Herz

### Enden

- **Epic Win** → Dach erreicht → Hubschrauber rettet dich
- **Funny Fail** → 0 Herzen unterwegs → Game Over, Neustart

## 5. Kampfsystem – Minispiele pro Ort

Jeder Kampfort ist ein **eigenes kleines Arcade-Spiel** mit Bewegung, Steuerung und eigener Mechanik — **keine** QTE-/Reaktions-Prompts. Sprites bewegen sich, der Spieler steuert aktiv, die Schwierigkeit steigt innerhalb eines Minispiels (Wellen-Prinzip).

Jedes Minispiel liegt als eigene Datei unter [game/minigames/](../game/minigames/) und folgt demselben Muster (siehe Kapitel 6). **Basketball-Ausweichen** ist die Referenzimplementierung — die anderen sind aktuell TODO-Stubs mit Auto-Sieg zum Testen.

### 5.1 🍽️ Teller werfen (Mensa)

**Gegen:** Zombies, die in der Mensa von der Essensausgabe oben nach unten in den Essbereich taumeln
**Mechanik:** Top-down-Shooter. Alex steht am unteren Rand, bewegt sich mit **A / D** seitlich, wirft mit **Space** Plastikteller nach oben. Zombies spawnen oben, laufen auf festen Bahnen langsam nach unten. Erreicht ein Zombie den unteren Rand → -1 ❤️. Alle Wellen überstehen → Sieg.

**Schwierigkeits-Wellen:**

1. Einzelne Zombies, gerade Bahnen
2. Gruppen, leicht versetzt
3. Zickzack-Bewegung, höhere Frequenz

**Status:** TODO (Scene-Placeholder mit Auto-Sieg)

**Lerneffekt:** Spawn-Logik, Projektil-Kollision, Wellen-Difficulty.

### 5.2 🏀 Basketball-Ausweichen *(Referenzspiel — fertig implementiert)*

**Gegen:** Zombie-Sportlehrer, rennt am oberen Bildschirmrand hin und her und wirft Basketbälle
**Mechanik:** Echtzeit-Ausweichspiel auf dem Basketballplatz-Hintergrundbild. Alex läuft am unteren Rand mit **A / D** (oder **← / →**). Bälle fallen / fliegen von oben. Ein Treffer kostet ein Herz + kurze Unverwundbarkeit (Flacker-Effekt). **30 Sekunden durchhalten = Sieg.**

**Schwierigkeits-Wellen:**

1. **0–10 s:** Bälle fallen gerade, Zombie wirft langsam
2. **10–20 s:** Wurf-Frequenz steigt, Zombie läuft schneller
3. **20–30 s:** Bälle haben leichten Winkel und prallen von Seitenwänden ab

**Code:** [game/minigames/basketball.js](../game/minigames/basketball.js) — `startBasketballAusweichen(onWin, onLose)`. Pattern-Referenz für alle weiteren Minispiele.

**Lerneffekt:** Game-Loop mit `requestAnimationFrame`, Delta-Time-Bewegung, AABB-Kollision, Keyboard-Events, Wellen-Logik.

### 5.3 🧭 Labyrinth-Flucht

**Gegen:** Klassenraum-Zombies, die durch Flur und Räume schlurfen
**Setting:** Ein Grid (z. B. 8×6 Felder) stellt den Klassenraum-Flur dar. Tische und Stühle sind Hindernisse (◼), die Start-Tür ist unten links, die Ziel-Tür oben rechts. 3–5 Zombies (🧟) patrouillieren auf festen Routen oder bewegen sich zufällig pro Tick.

**Mechanik:**

- Du bewegst dich mit **Pfeiltasten** oder **WASD** ein Feld pro Tastendruck
- Alle 0,8 Sekunden ziehen die Zombies ein Feld weiter
- Kollision mit Zombie → -1 Herz, du wirst zum Start zurückgesetzt
- Erreichst du die Ziel-Tür → nächste Szene freigeschaltet
- Timer: 30 Sekunden. Abgelaufen → -1 Herz und Rückwurf zum Pausenhof

**Spannungs-Elemente:**

- Zombies haben Sichtfeld (z. B. 3 Felder gerade voraus) – stehst du in der Linie, beschleunigen sie
- Versteck-Felder (🪑 unter Tischen) machen dich kurz unsichtbar
- Ein eingesammeltes „Keycard"-Feld öffnet Abkürzungen

**Item-Boost:**

- **Buch der Überlebenden** → blendet für 3 Sekunden die Zombie-Routen ein
- **Basketball** → einmal werfen, Zombie geht kurz zum Aufprallpunkt (Ablenkung)

**Lerneffekt:** 2D-Arrays, Keyboard-Events (`addEventListener('keydown', …)`), Kollisionserkennung, einfacher Game-Loop mit `setInterval`.

**ASCII-Skizze des Grids:**

```
┌─────────────────┐
│ . . . . . . . 🚪│   ← Ziel (oben rechts)
│ ◼ ◼ . ◼ . ◼ . .│
│ . . . 🧟. . . ◼│
│ . ◼ . ◼ . . ◼ .│
│ . . 🧟. . ◼ . .│
│🚪. . ◼ . . . . │   ← Start (unten links, Alex 🙂)
└─────────────────┘
```

### 5.4 🪢 Seilklettern (Turnhalle)

**Gegen:** herabfallende Medizinbälle, Sportgeräte, Seile anderer Zombies, die mitklettern
**Mechanik:** Vertikaler Climber. Alex hängt am Seil, klettert mit **W** nach oben, weicht mit **A / D** auf Nachbar-Seile aus. Gegenstände fliegen von oben nach unten, Seile werden zeitweise von Zombies blockiert. Oben an der Dachluke → Sieg. Treffer → -1 ❤️, zu oft getroffen → zurück in die Turnhalle.

**Status:** TODO (Scene-Placeholder mit Auto-Sieg)

**Lerneffekt:** Vertikales Scrolling, Hindernis-Patterns, Spur-Wechsel-Logik.

### 5.5 🚁 Endszene Hubschrauber (Dach)

**Gegen:** keine — reine kinematische Outro-Sequenz
**Mechanik:** Hubschrauber fliegt ins Bild, lässt ein Seil runter, Alex greift zu, Kamera zieht raus, Credits / „Spiel neu starten"-Button. Kein Input, keine Kollision.

**Status:** TODO (Scene-Placeholder nutzt vorübergehend `basketballplatz_kampf.png` als Hintergrund, bis ein Dach-Asset existiert)

**Lerneffekt:** Scripted Sequences, CSS-Animationen, Übergang zum End-Screen.

### Kampf-Übersichtstabelle

| # | Station | Minispiel | Gegner | Status | Item-Boost |
|---|---------|-----------|--------|--------|------------|
| 1 | Schulhof | — (Story/Pickup) | — | **fertig** | Baseballschläger-Start |
| 2 | Mensa | Teller werfen | Mensa-Zombies | TODO (Auto-Sieg) | — |
| 3 | Klassenraum | Labyrinth-Flucht | Klassenraum-Zombies | TODO (Auto-Sieg) | Buch = Routen sichtbar, Basketball = Ablenkung |
| 4 | Turnhalle | Seilklettern | Sport-Zombies + Medizinbälle | TODO (Auto-Sieg) | — |
| 5 | Basketballplatz | Basketball-Ausweichen | Sportlehrer | **fertig** | Basketball = Zusatzleben |
| 6 | Dach | Endszene Hubschrauber | — | TODO (Placeholder) | — |

## 6. Technische Hinweise für den Bau

### Layout-Dimensionen (fix)

Alles im Spielbereich hat feste Pixelmaße – vereinfacht Bildergenerierung, Labyrinth-Grid und Kampf-Overlays:

| Element | Maße |
|---------|------|
| Stage (Spielbereich) | **1280 × 920 px** |
| Szenen-Bild | **1280 × 720 px** (16:9, 720p HD) |
| Text + Buttons | 1280 × ~200 px |
| Inventar-Spalte | 130 × 920 px (rechts neben Stage) |

**KI-Bild-Prompt-Template:** `"…, 16:9 aspect ratio, 1280x720, cartoony, kid-friendly, not scary"`.

720p ist die native Standardgröße von DALL-E / Midjourney / Stable Diffusion → beste Bildqualität ohne Upscaling. Alle Orte mit identischen Maßen generieren → konsistenter Stil, nichts verzieht sich.

**Viewport-Hinweis:** Gesamtseite ~1435×1000 px → benötigt Monitor mit ≥1440×1050. Auf kleineren Displays wird gescrollt. Alle Werte sind CSS-Variablen in `:root` – eine Änderung dort skaliert alles.

### Code-Struktur

Der Code ist auf mehrere Dateien verteilt, damit jedes Minispiel eigenständig ist und neue leicht dazukommen. `index.html` lädt die Scripte in dieser Reihenfolge (globale Funktionen von oben nach unten):

```
game/
├── index.html          ← Markup + Script-Ladereihenfolge
├── style.css           ← CSS-Variablen, Grid, Inventar, Combat-Overlay
├── items.js            ← ITEMS-Registry (Item-Definitionen + Effekte)
├── minigames/
│   ├── basketball.js   ← startBasketballAusweichen()  [REFERENZ, fertig]
│   └── labyrinth.js    ← startLabyrinth()             [TODO-Stub]
├── scenes.js           ← SCENES-Graph; ruft start<Minispiel>(onWin, onLose)
└── engine.js           ← Core: gameState, showScene, HUD, Inventar, Save/Load
```

Platzhalter-Minispiele (Teller werfen, Seilklettern, Endszene) laufen aktuell über die Inline-Funktion `placeholderMinigame(...)` in `scenes.js` — Auto-Sieg nach kurzem Toast. Sobald ein Minispiel ausgebaut wird, wandert es in ein eigenes File unter `minigames/` und die Scene ruft stattdessen `start<Name>(onWin, onLose)`.

**Muster für Minispiele** (siehe `basketball.js` als Referenz):

1. Globale Funktion `start<Name>(onWin, onLose)` wird aus einer Szenen-Wahl aufgerufen.
2. Minispiel füllt `#combat-area` mit eigenem DOM, blendet `.hidden` aus.
3. Eigener Input-Loop (Keyboard-Handler + `requestAnimationFrame`).
4. Bei Sieg: aufräumen (Listener entfernen, `combatArea.classList.add('hidden')`, DOM leeren) → `onWin()`. Bei Niederlage dasselbe → `onLose()`.
5. Die Szene entscheidet über Bild (`_kampf.png` als Arcade-Hintergrund) und Folgeszene (`_sieg` / `_fail`).

**Zustand & Persistenz (in `engine.js`):**

- `gameState` (Herzen, Timer, Inventar, Zombie-Counter) als einfaches JS-Objekt.
- Speichern mit `localStorage.setItem('zombieSave', JSON.stringify(gameState))` nach jedem Szenenwechsel.
- Szenentimer via `setInterval`, beim Szenenwechsel immer `clearInterval`.
- Bilder über `<img>`-Tag (KI-generiert, eine Datei pro Phase — siehe [bilder-und-layout.md](bilder-und-layout.md)).
- Labyrinth-Grid (geplant) als 2D-Array (`grid[y][x]`) im 1280×720-Bild-Bereich: bei 16×9 Tiles je 80×80 px.
- Alles läuft offline nach einmaligem Laden.

## 7. Tipps für den 1-Tag-Bau

- **Vormittag (Story & Assets):** Story-Texte mit KI schreiben, Bilder für die 3 Kern-Orte generieren
- **Mittag (Kern-Code):** HTML-Grundgerüst, Szenen-Wechsel, Inventar, `gameState`
- **Nachmittag (Kampf-System):** Basketball-Ausweichen spielen + ein zweites Minispiel nach gleichem Muster bauen
- **Abend (Polish):** Timer, Herzen, Zombie-Counter, Highscore in `localStorage`
- **Bonus-Tag (Tag 2):** Teller-Minispiel, Labyrinth-Minispiel, Seilklettern, Endszene-Animation

### Reihenfolge-Tipp

Wenn Zeit knapp wird, lieber **weniger Minispiele, dafür funktionierende**. Der Ablauf ist durch die Platzhalter schon komplett klickbar — jedes TODO-Minispiel kann einzeln ausgebaut werden, ohne den Rest zu brechen. Reihenfolge nach Aufwand: **Teller werfen** (ähnelt Basketball, einfachster Ausbau) → **Labyrinth** (neue Mechanik, aber Sprites liegen schon fertig) → **Seilklettern** (vertikales Scrolling, etwas kniffliger) → **Endszene** (reine Animation, wenn Asset da ist).

---

Fertig! Das Spiel ist dann dein eigenes Zombie-Battle-Royale, das du stolz Freunden zeigen kannst.
