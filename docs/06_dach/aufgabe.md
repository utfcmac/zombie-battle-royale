# Station 06 – Dach (Endszene: Hubschrauber)

**Deine Aufgabe:** Das große Finale — eigenes Bild, Hubschrauber-Animation und epischen Abschluss-Ton.

---

> 📋 **Stil-Vorlage:** Die fett markierten Stil-Zeilen in jedem Prompt stammen aus `docs/00_stil-vorlage.md` — nie weglassen, damit alle Bilder zusammenpassen.

## 🎨 Bilder mit Gemini generieren

### Hintergrundbild `dach.png`

> 📸 **Referenzfoto:** `docs/06_dach/basketballplatz_luft.jpg` — Luftaufnahme des Schulgeländes mit dem markanten weißen Kuppeldach in der Mitte. Du kannst es mit in Gemini hochladen.

```
In the exact style of a LucasArts adventure game background:

Aerial drone view of a German school complex overrun by a zombie apocalypse.
In the center of the image: a wide open schoolyard with a distinctive white tent-roof
structure made of connected dome sections (covering an outdoor basketball/sports area).
To the left: a long school building with an orange-and-white facade and grey roof,
plus a small blue outdoor sports court. To the right: another long school building
with a grey flat roof. The entire complex is surrounded by dense green trees,
with a suburban skyline in the far distance under an overcast sky.

The schoolyard, paths, and courtyards are swarming with dozens of shambling zombies —
teachers, students, a janitor, a cook — stumbling between the buildings, crowding the
basketball court, shuffling along the footpaths. Clear zombie silhouettes from above.
The white dome roof in the center is the clear focal point — empty, untouched, the
only safe spot in the whole scene.

STYLE: Stylized painterly cartoon illustration, slightly brushy textures, high contrast,
clear silhouettes, dark but vibrant palette — dominated by mossy greens, moody greys,
warm amber accents. Inspired by LucasArts adventure game backgrounds, Tim Burton,
Goosebumps book covers, Hotel Transylvania. Spooky but kid-friendly (age 10–14).

ATMOSPHERE: Overcast sky with a sickly yellow-green tint. Low ground fog drifting
between the trees and across the schoolyard. Long diagonal shadows from the late
afternoon sun. Dried leaves and torn paper pages swirling in cold wind. Subtle
volumetric light rays cutting through the clouds.

TECHNICAL: 16:9 aspect ratio, 1280x720 resolution, aerial top-down perspective
(slight tilt), sharp focus on the white dome roof in the center,
slight atmospheric depth-of-field on the surrounding treetops.
No text, no speech bubbles, no UI overlays, no watermarks. No gore.
```
Speichere als `game/06_dach/assets/dach.png`.

### 🎬 Video aus einem Hubschrauber-Bild generieren (Veo 3.1)

Für die eigentliche Endszene nutzen wir **ein anderes Bild** als Start-Frame — nämlich eine Nahaufnahme vom Hubschrauber über dem Dach. Das Referenz-Bild liegt schon bereit:

> 📸 **Start-Frame:** `docs/06_dach/hubschrauber.png`

1. Geh auf [gemini.google.com](https://gemini.google.com).
2. Lade `docs/06_dach/hubschrauber.png` hoch.
3. Wähle im Prompt-Feld die Option **„Videos"** — oder beginne deinen Prompt mit `Generate a video from this image`.
4. Veo 3.1 nimmt das Bild als Start-Frame und animiert es (bis zu ca. 8 Sekunden, 720p oder höher je nach Plan).

**Prompt:**
```
Generate an 8-second video from this exact reference image.
The military helicopter slowly lifts off from the white-roofed building,
rotors spinning fast with motion blur. The long ladder gets retracted as
the helicopter ascends and flies steadily away to the right, into the
foggy background. The people on the rooftop watch it leave, some turning
their heads and pointing.

Keep the exact same hand-drawn comic book illustration style, bold inked
lines, flat graphic novel colors, gritty post-apocalyptic atmosphere,
overgrown buildings and muted greenish tones. Do not change to photorealistic
or 3D — preserve the original 2D illustrated look perfectly.
Camera stays static.
```

Speichere das Video als `game/06_dach/assets/dach_ende.mp4`.

### Hubschrauber-Sprite `hubschrauber.png`
```
Single rescue helicopter, side view, slightly from below.
Military green color, large rotor on top, tail rotor visible.
A rope ladder hanging from the open side door.

STYLE: Stylized painterly cartoon illustration, slightly brushy textures, high contrast,
clear silhouettes, dark but vibrant palette — dominated by mossy greens, moody greys,
warm amber accents. Inspired by LucasArts adventure game backgrounds, Tim Burton,
Goosebumps book covers, Hotel Transylvania. Spooky but kid-friendly (age 10–14).

TECHNICAL: Transparent background, PNG with alpha channel, object centered on canvas,
no drop shadow, no cast ground shadow, no floor, no background elements.
No text, no watermarks. No gore.
```
Speichere als `game/06_dach/assets/hubschrauber.png`.

---

## ✍️ Dialogtexte für die Endszene ausdenken

Jetzt kommt der kreative Teil: **Denk dir drei kurze Erzähltexte aus**, einer pro Szene. Die Endszene läuft in drei Stufen:

1. **Szene 1 — Das Dach ist leer** (Bild: `dach.png`)
   Du hast es aufs Dach geschafft. Unter dir die Horde, aber hier oben erstmal Ruhe.
   → Schreib einen Text, der diesen Moment einfängt (1–3 Sätze).

2. **Szene 2 — Ein Hubschrauber taucht auf** (Bild: `hubschrauber.png`)
   In der Ferne Motorengeräusch. Rettung kommt.
   → Schreib einen Text für den Moment des Entdeckens / der Hoffnung (1–3 Sätze).

3. **Szene 3 — Der Hubschrauber fliegt weg** (Video: `dach_ende.mp4`)
   Du bist an Bord, der Hubschrauber steigt auf und dreht ab.
   → Schreib einen Abschlusstext — Triumph, Abspann, oder ein Cliffhanger (1–3 Sätze).

Trag deine drei Texte hier ein, damit du sie gleich beim Einbau parat hast:

```
SZENE 1 (Dach leer):


SZENE 2 (Hubschrauber da):


SZENE 3 (Hubschrauber fliegt weg):

```

---

## 🎙️ Texte vertonen mit ElevenLabs (optional)

Wenn du deine drei Texte auch als Sprachausgabe haben willst: auf [elevenlabs.io](https://elevenlabs.io) eine dramatische Erzählstimme auswählen und die drei Texte einzeln einsprechen lassen. Speichere als:

- `game/06_dach/assets/dach_voice_ankunft.mp3` — Szene 1
- `game/06_dach/assets/dach_voice_hubschrauber.mp3` — Szene 2
- `game/06_dach/assets/dach_voice_abflug.mp3` — Szene 3

> ⚠️ **Achtung Ton-Konflikt:** Das Veo-Video in Szene 3 hat einen eigenen Sound (Rotorgeräusch etc.). Wenn du gleichzeitig dein eigenes Voice-Over abspielst, überlagern sich die Töne. Varianten:
> - Video stummschalten (`video.muted = true`) → nur Voice-Over zu hören.
> - Voice-Over weglassen für Szene 3 → nur der Video-Ton bleibt.
> - Beides — einfach ausprobieren, ob die Mischung gut klingt.
>
> Ausprobieren und entscheiden, was besser wirkt.

---

## 🤖 Endszene mit Claude Code bauen

Öffne Claude Code und paste diesen Prompt (ersetze die `<…>`-Platzhalter durch deine eigenen Texte):

```
In game/scenes.js:

Ersetze die bestehende Szene "dach" durch drei aufeinanderfolgende Szenen.

Szene 1: id "dach"
  image: "06_dach/assets/dach.png"
  audio: "06_dach/assets/dach_voice_ankunft.mp3"   (falls vorhanden)
  text: "<MEIN TEXT FÜR SZENE 1: DACH LEER>"
  choices: [{ label: "Weiter", target: "dach_hubschrauber" }]

Szene 2: id "dach_hubschrauber"
  image: "06_dach/assets/hubschrauber.png"
  audio: "06_dach/assets/dach_voice_hubschrauber.mp3"   (falls vorhanden)
  text: "<MEIN TEXT FÜR SZENE 2: HUBSCHRAUBER DA>"
  choices: [{ label: "Einsteigen!", target: "dach_abflug" }]

Szene 3: id "dach_abflug"
  video: "06_dach/assets/dach_ende.mp4"   (neues Feld — siehe unten)
  audio: "06_dach/assets/dach_voice_abflug.mp3"   (optional, siehe Ton-Konflikt)
  text: "<MEIN TEXT FÜR SZENE 3: HUBSCHRAUBER FLIEGT WEG>"
  choices: [{ label: "Nochmal spielen", target: "start" }]

In game/engine.js (renderSceneImage und renderSceneAudio):
- Erweitere die Render-Logik so, dass eine Szene optional ein "video"-Feld haben kann.
- Wenn scene.video gesetzt ist: zeige statt des <img id="scene-image"> ein <video>-Element
  mit autoplay, playsinline und ohne controls. Passe die Größe an (gleicher Container).
- Ist scene.video nicht gesetzt: zeige weiterhin das Bild.
- Beim Szenen-Wechsel: das Video sauber stoppen und wegräumen.

Wenn Video und Voice-Over gleichzeitig laufen, stelle video.muted = true,
damit das Voice-Over hörbar bleibt. Falls es kein Voice-Over für Szene 3 gibt,
lass den Video-Ton an.
```
