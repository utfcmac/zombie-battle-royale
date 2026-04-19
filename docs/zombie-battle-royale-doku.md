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

**Scope Tag 1 (solide fertig):** 3 Orte + 2 Enden + 2 Kampftypen
**Erweiterung Tag 2+ (wenn Zeit bleibt):** weitere 2 Orte, 1–2 Enden, mehr Kampftypen

### Haupt-Orte (Szenen)

**Tag 1 (Kernversion):**

1. Pausenhof (Start)
2. Basketballplatz
3. Dach (Finale)

**Tag 2+ (Erweiterung):**

4. Klassenraum-Flur (Labyrinth)
5. Chemieraum
6. Bibliothek

### Beispiel-Szenen mit allen Interaktionen

#### Szene 1 – Pausenhof

**Text:** „Du stehst im Pausenhof. Überall stolpern Zombies herum. Dein Baseballschläger liegt bereit."

Mögliche Buttons:

- Rüber zum Basketballplatz
- Durch den Klassenraum-Flur schleichen (Tag 2+)
- Zum Chemieraum (Tag 2+)
- In die Bibliothek schleichen (Tag 2+)
- (später: „Hubschrauber rufen" – nur mit Item „Funkgerät")

#### Szene 2 – Basketballplatz

**Text:** „Der riesige Zombie-Sportlehrer pfeift und wirft Basketbälle nach dir!"

→ **Kampf-Typ:** Basketball-Ausweichen (Minispiel, siehe Kapitel 5)

Buttons:

- Mit Baseballschläger zuschlagen (braucht Item, +3 Bonus)
- Basketball als Waffe nutzen (wenn du ihn vorher gefunden hast)
- Weglaufen (1 Herz verloren, weiter zum Chemieraum)

#### Szene 3 – Klassenraum-Flur (Tag 2+)

**Text:** „Ein langer Flur mit offenen Klassenzimmern. Zombies schlurfen zwischen den Tischen. Am anderen Ende: die Tür zum Chemietrakt."

→ **Kampf-Typ:** Labyrinth-Flucht

Buttons:

- Hineinwagen (Labyrinth starten)
- Zurück zum Pausenhof (kein Fortschritt)

#### Szene 4 – Chemieraum (Tag 2+)

**Text:** „Hier liegt alles rum! Du kannst eine Mega-Explosion mischen!"

→ **Kampf-Typ:** Bomben-Timing

Buttons:

- Chemie-Bombe brauen (Item erhalten)
- Schnell wieder raus (kein Item, aber -1 Sekunde Timer)

#### Szene 5 – Bibliothek (Tag 2+)

**Text:** „Hier ist es ruhig… fast zu ruhig. Das Buch der Überlebenden leuchtet!"

→ **Kampf-Typ:** Stealth

Buttons:

- Buch mitnehmen (starkes Item für Finale)
- Verstecken und warten (Timer pausiert, 1 Herz regeneriert)

#### Szene 6 – Dach (Finale)

**Text:** „Der Hubschrauber kommt! Aber der Direktor-Zombie blockiert den Weg!"

→ **Kampf-Typ:** Boss-Fight (Kombi aus mehreren Typen)

Je nach Zustand:

- **Mit allen Items + 2+ Herzen** → Epic Win
- **Ohne Items oder 0 Herzen übrig** → Drama-Ende
- **Mit Buch + Bombe** → lustiges „Zombies werden zu Konfetti"-Ende
- **Zombie-Counter = 0** → geheimes Held-Ende

### Inventar-System

**Start-Item:** Baseballschläger (+3 Angriffsbonus)

**Sammelbare Items:**

- Chemie-Bombe (Chemieraum) → besiegt ganze Zombie-Welle
- Basketball (Basketballplatz) → +0,5s im Reaktionskampf, Ablenkung im Labyrinth
- Buch der Überlebenden (Bibliothek) → zeigt Zombie-Routen im Labyrinth kurz an
- Funkgerät (verstecktes Item) → ruft Hubschrauber früher
- Verbandskasten (Zufallsdrop) → heilt 1 Herz

### Enden

- **Epic Win** → Dach + alle Items → Hubschrauber rettet dich
- **Funny Fail** → 0 Herzen → du wirst zum „Zombielehrer" und unterrichtest Mathe
- **Hero-Ende** (Tag 2+) → du rettest noch einen Freund und fliegt zusammen weg
- **Secret Ending** (Tag 2+) → Zombie-Counter auf 0 → du bist der Held, der die Schule rettet

## 5. Kampfsystem – Minispiele pro Ort

Jeder Kampfort ist ein **eigenes kleines Arcade-Spiel** mit Bewegung, Steuerung und eigener Mechanik — **keine** QTE-/Reaktions-Prompts. Sprites bewegen sich, der Spieler steuert aktiv, die Schwierigkeit steigt innerhalb eines Minispiels (Wellen-Prinzip).

Jedes Minispiel liegt als eigene Datei unter [game/minigames/](../game/minigames/) und folgt demselben Muster (siehe Kapitel 6). **Basketball-Ausweichen** ist die Referenzimplementierung — die anderen sind aktuell TODO-Stubs mit Auto-Sieg zum Testen.

### 5.1 ⚔️ Würfelkampf (Standard)

**Gegen:** normale Zombie-Schüler, Horde im Flur
**Mechanik:** Klassischer D20-Wurf. Du klickst „Angreifen", `Math.random() * 20` wird gewürfelt. Plus Item-Bonus. Ab Wert 12+ triffst du, darunter verlierst du ein Herz.

**Beispiel:**

```
Wurf: 8 + Baseballschläger (+3) = 11 → knapp daneben! -1 ❤️
Wurf: 14 + Baseballschläger (+3) = 17 → Treffer! Zombie besiegt.
```

**Lerneffekt:** Wahrscheinlichkeit, Zufallszahlen, Bonus-Addition.

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

### 5.4 💣 Bomben-Timing

**Gegen:** Chemie-Zombies (ganze Gruppe)
**Mechanik:** Ein Fortschrittsbalken füllt sich schnell. Du musst im **grünen Bereich** (20 % des Balkens) klicken, um die Chemie-Bombe zu zünden. Treffer → alle Zombies im Raum weg. Daneben → Bombe geht nach hinten los, -1 Herz.

**Variation:** Ohne Item „Chemie-Bombe" nicht möglich – dann nur wegrennen.

**Lerneffekt:** Timing, Animationen mit `requestAnimationFrame` oder CSS-Transition.

### 5.5 🕵️ Stealth-Kampf (Tag 2+)

**Gegen:** schlafende Zombies in der Bibliothek
**Mechanik:** Du klickst eine Reihenfolge von Aktionen: „Ducken" → „Leise gehen" → „Tür öffnen". Jeder falsche Klick weckt einen Zombie auf (+1 zum Zombie-Counter). Erfolgreich → du sneakst durch ohne Kampf.

**Lerneffekt:** Zustandsmaschinen, Sequenz-Logik.

### 5.6 👑 Boss-Fight (Finale)

**Gegen:** Direktor-Zombie auf dem Dach
**Mechanik:** 3-Phasen-Kampf, jede Phase ein anderer Kampf-Typ:

1. **Phase 1** – Ausweichen (Direktor wirft Akten, wie Basketball-Minispiel)
2. **Phase 2** – Mini-Labyrinth (Direktors Handlanger blockieren den Weg zum Hubschrauber)
3. **Phase 3** – Würfelkampf mit allen gesammelten Item-Boni

**Belohnung:** Epic-Win-Ende + Highscore-Eintrag.

### Kampf-Übersichtstabelle

| Minispiel | Gegner | Dauer | Status | Item-Boost |
|-----------|--------|-------|--------|------------|
| Würfelkampf | Standard-Zombies | ~10s | TODO | Baseballschläger +3 |
| Basketball-Ausweichen | Sportlehrer | 30s | **fertig** | Basketball = Zusatzleben |
| Labyrinth-Flucht | Klassenraum-Zombies | 30s | TODO | Buch = Routen sichtbar, Basketball = Ablenkung |
| Bomben-Timing | Chemie-Zombies | ~10s | TODO | Chemie-Bombe nötig |
| Stealth | Bibliotheks-Zombies | offen | TODO | Buch = keine Weckgefahr |
| Boss-Fight | Direktor | ~45s | TODO | alle Items kombiniert |

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
│   ├── wuerfel.js      ← startWuerfelKampf()          [TODO-Stub]
│   ├── labyrinth.js    ← startLabyrinth()             [TODO-Stub]
│   ├── bombe.js        ← startBombenTiming()          [TODO-Stub]
│   └── stealth.js      ← startStealth()               [TODO-Stub]
├── scenes.js           ← SCENES-Graph; ruft start<Minispiel>(onWin, onLose)
└── engine.js           ← Core: gameState, showScene, HUD, Inventar, Save/Load
```

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
- **Bonus-Tag (Tag 2):** Klassenraum-Flur mit Labyrinth, Chemieraum, Bibliothek, Boss-Fight

### Reihenfolge-Tipp

Wenn Zeit knapp wird, lieber **weniger Orte, dafür funktionierende Kampftypen**. Ein Spiel mit 3 Orten und 2 coolen Kämpfen ist besser als 5 Orte voller Bugs. Das Labyrinth ist der technisch anspruchsvollste Kampftyp – den Tag-2 aufsparen, außer dein Sohn hat schon Tastatur-Input gebaut.

---

Fertig! Das Spiel ist dann dein eigenes Zombie-Battle-Royale, das du stolz Freunden zeigen kannst.
