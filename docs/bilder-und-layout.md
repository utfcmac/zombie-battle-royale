# Bilder & Layout-Maße

Referenz für Bildergenerierung und Spielflächen-Dimensionen.

## Bildergenerierung — Workflow

### 1. Primary: Google Gemini / Imagen 3

- **URL:** [gemini.google.com](https://gemini.google.com)
- Login mit Google-Konto
- Prompt einfügen (siehe Abschnitte unten) → „Bild generieren"
- Liefert hochwertige Bilder, versteht 16:9 zuverlässig

### 2. Fallback: Microsoft Bing Image Creator (DALL-E 3)

- **URL:** [bing.com/create](https://www.bing.com/create)
- Login mit Microsoft-Konto
- **Wann nutzen:** Wenn Gemini den Prompt ablehnt (z. B. bei „Zombie"-Filter) oder die Qualität/der Stil nicht passt
- 15 schnelle Generierungen pro Tag (unbegrenzt langsame)

### 3. Prompt-Regel: diese Blöcke gehören IMMER dazu

Jeder Prompt – egal welche Szene – enthält exakt diese drei Blöcke wortgleich (siehe Abschnitt „Prompt-Vorlage" weiter unten):

- **STYLE:** definiert den Look (Cartoon-Illustration, Farbpalette, Referenzen)
- **ATMOSPHERE:** definiert die Stimmung (Nebel, Licht, Wind)
- **TECHNICAL:** definiert Format (16:9, 1280×720) und was *nicht* im Bild sein darf (kein Text, kein Blut)

Nur FOREGROUND / MIDGROUND / BACKGROUND werden pro Szene ausgetauscht. So sehen alle 9 Bilder aus wie aus einem Guss.

### 4. Bild speichern und ins Projekt kopieren

1. **Runterladen:** Rechtsklick aufs Bild → „Bild speichern unter…"
2. **Auf 1280 × 720 croppen/skalieren** (falls Bild andere Maße hat):
   - **macOS Vorschau.app:** öffnen → Rechteck-Auswahl → *Werkzeuge → Zuschneiden* → *Werkzeuge → Größe anpassen* auf 1280×720
   - **Online (ohne Install):** [photopea.com](https://www.photopea.com) oder [pixlr.com](https://pixlr.com) — Bild öffnen, Bild → Bildgröße → 1280×720
3. **Als PNG speichern** mit *exakt* diesem Dateinamen (Groß/Kleinschreibung beachten) ins Verzeichnis [game/images/](../game/images/):
   - `pausenhof.png`
   - `basketballplatz.png`
   - `dach.png`
   - `ending_win.png`
   - `ending_fail.png`
   - `klassenraum_flur.png`
   - `chemieraum.png`
   - `versteck.png`
   - `bibliothek.png`

Die Szenen in [game/scenes.js](../game/scenes.js) referenzieren diese Namen bereits (`image: "images/pausenhof.png"`). Sobald das PNG da liegt, erscheint es beim nächsten Reload automatisch im Spiel — kein Code-Änderung nötig.

---


## Spielfläche (fix)

| Element | Maße |
|---------|------|
| Gesamte Seite | ~1435 × 1000 px |
| **Stage (Spielbereich)** | **1280 × 920 px** |
| **Szenen-Bild** | **1280 × 720 px** (16:9 / 720p HD) |
| Text + Buttons | 1280 × ~200 px |
| Inventar-Spalte | 130 × 920 px |

Alle Werte als CSS-Variablen in [game/style.css](../game/style.css) (`:root`) — eine Änderung dort skaliert alles.

## Bilder-Checkliste

Alle Bilder als **1280 × 720 px PNG** in [game/images/](../game/images/). Einheitliche Größe → passen exakt ins Bild-Fenster, kein Verzerren.

### Naming-Convention: Phasen pro Kampfort

Jeder Kampfort hat **3 Pflicht-Bilder + 1 optionales Action-Bild**, damit Sieg UND Niederlage eigene Stimmung bekommen:

- **`_intro`** *(pflicht)* – Alex betritt den Ort, Gefahr sichtbar aber statisch. Weitwinkel, Balance-Moment
- **`_kampf`** *(optional)* – Action im Gang. Close-up, Dynamik, Staub/Bewegungslinien
- **`_sieg`** *(pflicht)* – Ruhe nach dem Sturm. Feind besiegt, Alex mit Loot / Sieger-Pose
- **`_fail`** *(pflicht)* – Alex überwältigt, Feind triumphiert. Dramatischer Verlust-Moment, aber kein Blut

Orte ohne Kampf (Start, reine Übergänge) brauchen nur 1 Bild. Der Dach-Endkampf nutzt die globalen `ending_win.png` / `ending_fail.png` als Sieg/Fail (die sind gleichzeitig die Story-Endings).

### Tag 1 – Minimum-Set (9 Bilder, +2 mit `_kampf`)

| # | Datei | Motiv |
|---|-------|-------|
| 1 | `pausenhof.png` | Schulhof mit schlurfenden Zombies, Baseballschläger im Gebüsch (Start, kein Kampf) |
| 2 | `basketballplatz_intro.png` | Zombie-Sportlehrer starrt Alex an, Pfeife im Mund, Basketball in der Hand |
| 3 | `basketballplatz_kampf.png` *(opt)* | Action: Ball fliegt durch die Luft, Alex duckt sich, Sportlehrer brüllt |
| 4 | `basketballplatz_sieg.png` | Sportlehrer liegt am Boden, Halle verwüstet, Alex triumphiert mit Pfeife |
| 5 | `basketballplatz_fail.png` | Alex am Boden, Sportlehrer beugt sich grinsend über ihn, Ball rollt weg |
| 6 | `dach_intro.png` | Dach im Dämmerlicht, Hubschrauber nähert sich, Zombie-Direktor stellt sich in den Weg |
| 7 | `dach_kampf.png` *(opt)* | Boss-Fight: Direktor wirft Akten, Alex im Angriff, Hubschrauber kreist |
| 8 | `ending_win.png` | Alex winkt vom Hubschrauber, Schule klein im Hintergrund, Sonnenaufgang *(= dach_sieg)* |
| 9 | `ending_fail.png` | Alex als Zombielehrer an der Tafel („Mathe für Zombies"), Klasse voller Zombie-Schüler *(= dach_fail)* |

### Tag 2+ – Erweiterung (11 Bilder, inkl. 2 optionale `_kampf`)

| # | Datei | Motiv |
|---|-------|-------|
| 10 | `klassenraum_flur_intro.png` | Blick in den langen Flur, Zombies schlurfen zwischen Tischen — Preview-Shot |
| 11 | `klassenraum_flur_kampf.png` *(opt)* | Top-down/Isometrisch: Flur als Grid mit Hindernissen, perfekt als Labyrinth-Backdrop |
| 12 | `klassenraum_flur_sieg.png` | Alex an der Tür am anderen Ende, schaut zurück auf den überwundenen Flur |
| 13 | `klassenraum_flur_fail.png` | Alex mitten im Flur von Zombies umzingelt, Hände greifen von allen Seiten |
| 14 | `chemieraum_intro.png` | Chaotisches Chemielabor, rauchende Reagenzgläser, Zombie-Chemiker |
| 15 | `chemieraum_kampf.png` *(opt)* | Bombe mischt, Funken sprühen, Chemiker-Zombie taumelt |
| 16 | `chemieraum_sieg.png` | Explosions-Nachwirkung, Rauch, Bombe in Alex' Hand, Chemiker besiegt |
| 17 | `chemieraum_fail.png` | Alex von grüner Chemikalienwolke eingehüllt, hustet, Chemiker lacht im Hintergrund |
| 18 | `bibliothek_intro.png` | Bibliothek ruhig, schlafende Zombies zwischen Regalen, leuchtendes Buch auf Tisch |
| 19 | `bibliothek_sieg.png` | Alex mit dem „Buch der Überlebenden" unterm Arm, Buch glimmt, Zombies schlafen noch |
| 20 | `bibliothek_fail.png` | Zombies wachen auf, packen Alex zwischen den Regalen, Buch fällt zu Boden |

**Gesamt:** 7 Bilder minimum / **9 komplett** (Tag 1) oder 16 minimum / **20 komplett** (Vollversion).

### Prompt-Zusätze je Phase

Neben dem Szenen-Content im Prompt die Phase anhängen:

| Phase | Prompt-Zusatz |
|-------|---------------|
| `_intro` | `wide establishing shot, tense balance before action, threat visible but static` |
| `_kampf` | `mid-action dynamic composition, motion blur on flying objects, dust and debris in air, intense moment` |
| `_sieg` | `aftermath scene, dust settling, defeated enemy on ground, hero in heroic pose with loot, calm after storm` |
| `_fail` | `hero overwhelmed and cornered, enemy looming large, low dramatic camera angle, darker mood — still cartoon style, NO blood, NO graphic injuries, kid-friendly spooky` |

## Prompt-Vorlage (für alle Bilder wiederverwenden)

Die **STYLE-**, **ATMOSPHERE-** und **TECHNICAL-**Blöcke wörtlich in jeden Prompt übernehmen — dann sehen alle 9 Bilder wie aus einem Guss aus. Nur FOREGROUND / MIDGROUND / BACKGROUND pro Szene austauschen.

```
STYLE: Stylized painterly cartoon illustration, slightly brushy textures,
high contrast, clear silhouettes, dark but vibrant palette — dominated
by mossy greens, moody greys, warm amber accents. Inspired by LucasArts
adventure game backgrounds, Tim Burton, Goosebumps book covers,
Hotel Transylvania. Spooky but kid-friendly (age 10–14).

ATMOSPHERE: Overcast sky with a sickly yellow-green tint. Low ground fog.
Long diagonal shadows. Dried leaves and torn paper pages swirling in cold
wind. Subtle volumetric light rays.

TECHNICAL: 16:9 aspect ratio, 1280x720 resolution, sharp focus on
foreground, slight atmospheric depth-of-field on background. No text,
no speech bubbles, no UI overlays, no watermarks. No gore.
```

### Generator-Flags

- **Midjourney:** `--ar 16:9 --stylize 400 --quality 2`
- **DALL-E 3 (ChatGPT):** einfach reinkopieren, liefert ~1792×1024 → auf 1280×720 croppen
- **Stable Diffusion / Flux:** Negative Prompt: `text, letters, watermark, logo, blood, gore, realistic, photographic, distorted faces, extra limbs, low quality`

## Komplett-Prompt: Pausenhof (Referenz)

```
A German school courtyard (Schulhof) at eerie dusk. Stylized dark cartoon
illustration, mood somewhere between "Coraline" and "Plants vs Zombies".

FOREGROUND: Lush green bush on the left with an old wooden baseball bat
half-hidden inside, handle sticking out clearly — obviously the player's
waiting weapon. Cobblestone ground scattered with school chaos: an open
backpack with pencils and notebooks spilling out, a half-eaten school
sandwich wrapped in foil, a crumpled homework sheet, a tipped-over lunch
box, a single sneaker.

MIDGROUND: Three to four cartoon zombies wandering aimlessly — a math
teacher zombie in a rumpled blazer with crooked tie and chalk-stained
hands; a hoodie-wearing student zombie with glowing greenish-yellow eyes;
a janitor zombie dragging a dirty mop; a chubby P.E. teacher zombie with
a whistle dangling from his neck. Pale grey-green skin, simple stitches,
tilted heads, slightly goofy dumb expressions (drooling, mouths hanging
open). Creepy silhouettes but NOT gory — no blood, no wounds, no guts.

BACKGROUND: A large multi-story German Gymnasium-style school building on
the right, red brick Gründerzeit architecture with tall arched windows,
one cracked. A torn "SOMMERFEST" banner flapping between lamp posts.
A tipped-over bicycle at the rack, a deflated basketball under a rusty
hoop. Distant silhouettes of more zombies shuffling near the entrance.

ATMOSPHERE: Late afternoon turning to dusk. Overcast sky with a sickly
yellow-green tint. Low ground fog creeping across the courtyard. Long
diagonal shadows. Dried leaves and torn paper pages swirling in cold
wind. Subtle volumetric light rays breaking through clouds.

STYLE: Stylized painterly cartoon illustration, slightly brushy textures,
high contrast, clear silhouettes, dark but vibrant palette — dominated
by mossy greens, moody greys, warm amber accents on windows. Inspired by
LucasArts adventure game backgrounds, Tim Burton, Goosebumps book covers,
Hotel Transylvania. Spooky but kid-friendly (age 10–14).

CAMERA: Slightly low third-person hero perspective looking into the
courtyard, wide angle, showing depth and scale.

TECHNICAL: 16:9 aspect ratio, 1280x720 resolution, sharp focus on
foreground bat/bush, slight atmospheric depth-of-field on background.
No text, no speech bubbles, no UI overlays, no watermarks. No gore.
```
