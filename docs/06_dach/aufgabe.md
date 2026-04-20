# Station 06 – Dach (Endszene: Hubschrauber)

**Deine Aufgabe:** Das große Finale — eigenes Bild, Hubschrauber-Animation und epischen Abschluss-Ton.

---

> 📋 **Stil-Vorlage:** Die fett markierten Stil-Zeilen in jedem Prompt stammen aus `docs/00_stil-vorlage.md` — nie weglassen, damit alle Bilder zusammenpassen.

## 🎨 Bilder mit Gemini generieren

### Hintergrundbild `dach.png`

> 📸 **Referenzfoto:** `docs/originalschauplätze/basketballplatz_luft.jpg` — Luftaufnahme des Schulgeländes mit dem markanten weißen Kuppeldach in der Mitte. Du kannst es mit in Gemini hochladen.

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

Hovering in the air directly above the white dome roof in the center: a rescue
helicopter, close to the rooftop, rotor blades spinning with motion blur, a rope
ladder dangling down toward the dome. The helicopter should be the clear focal point.

STYLE: Stylized painterly cartoon illustration, slightly brushy textures, high contrast,
clear silhouettes, dark but vibrant palette — dominated by mossy greens, moody greys,
warm amber accents. Inspired by LucasArts adventure game backgrounds, Tim Burton,
Goosebumps book covers, Hotel Transylvania. Spooky but kid-friendly (age 10–14).

ATMOSPHERE: Overcast sky with a sickly yellow-green tint. Low ground fog drifting
between the trees and across the schoolyard. Long diagonal shadows from the late
afternoon sun. Dried leaves and torn paper pages swirling in cold wind. Subtle
volumetric light rays cutting through the clouds around the helicopter.

TECHNICAL: 16:9 aspect ratio, 1280x720 resolution, aerial top-down perspective
(slight tilt), sharp focus on the helicopter and the white dome roof,
slight atmospheric depth-of-field on the surrounding treetops.
No text, no speech bubbles, no UI overlays, no watermarks. No gore.
```
Speichere als `game/06_dach/assets/dach.png`.

### 🎬 Video aus dem Bild generieren (Veo 3.1)

Aus dem eben erstellten Bild kannst du in Gemini direkt ein kurzes Animations-Video machen — perfekt für die Endszene.

1. Geh auf [gemini.google.com](https://gemini.google.com).
2. Lade dein eben generiertes Dach-Bild hoch (das Comic-Bild mit dem Hubschrauber).
3. Wähle im Prompt-Feld die Option **„Videos"** — oder beginne deinen Prompt mit `Generate a video from this image`.
4. Veo 3.1 nimmt dein Bild als Start-Frame und animiert es (bis zu ca. 8 Sekunden, 720p oder höher je nach Plan).

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

## 🤖 Endszene und Animation mit Claude Code bauen

Öffne Claude Code und paste diesen Prompt:

```
Ich baue ein Browser-Spiel (Vanilla JS, kein Framework).

Schritt 1 — Dach-Asset in scenes.js eintragen:
In game/scenes.js bei der Szene "dach":
Ändere image zu "06_dach/assets/dach.png"
(die Datei wird gleich durch Gemini erstellt und liegt dann dort).

Schritt 2 — Hubschrauber-Animation:
Erstelle die Datei game/06_dach/endszene.js mit der Funktion startEndszene(onFinish).
Die Funktion soll:
1. Den Hubschrauber (06_dach/assets/hubschrauber.png) als <img> in #combat-area einbauen.
   Startposition: rechts außerhalb des Bildschirms (left: 110%).
2. Den Hubschrauber mit einer CSS-Transition (3 Sekunden, ease-in-out) nach links fliegen lassen bis left: 35%.
3. Nach 3,5 Sekunden ein Seil animieren: ein schmales div (4px breit, braun) wächst von height: 0 auf height: 180px nach unten (Transition 1,5 Sekunden).
4. Nach weiteren 2 Sekunden: combat-area leeren, onFinish() aufrufen.

Schritt 3 — In scenes.js einbinden:
In der Szene "dach" soll es keinen direkten Button mehr geben.
Stattdessen: onEnter ruft startEndszene(() => showScene("dach_ende")) auf.
Erstelle die neue Szene "dach_ende" mit:
  image: "06_dach/assets/dach.png"
  text: "🎉 Gerettet!\nDu hast es geschafft."
  choices: [{ label: "Nochmal spielen", target: "start" }]

Schritt 4 — Script-Tag:
Füge <script src="06_dach/endszene.js"></script> in game/index.html vor scenes.js ein.
```

---

## 🎙️ Epischen Abschluss-Ton mit ElevenLabs

Wähle eine dramatische Erzählstimme. Speichere in `game/06_dach/assets/`.

**`dach_voice_ankunft.mp3`** — beim Betreten des Dachs:
```
Das Dach. Unter dir die Horde.
Aber die kommen hier nicht rauf.
```

**`dach_voice_hubschrauber.mp3`** — wenn der Hubschrauber erscheint:
```
Da. In der Ferne.
Ein Hubschrauber.
Er kommt näher.
```

**`dach_voice_gerettet.mp3`** — beim Sieg:
```
Du greifst zu.
Winner, winner — Zombie dinner.
```

Dann Claude Code bitten:
```
In game/scenes.js:
- In dach.onEnter: spiele "06_dach/assets/dach_voice_ankunft.mp3"
In game/06_dach/endszene.js:
- Wenn der Hubschrauber ins Bild einfliegt (nach Transition-Start): spiele "06_dach/assets/dach_voice_hubschrauber.mp3"
- Wenn onFinish aufgerufen wird: spiele "06_dach/assets/dach_voice_gerettet.mp3"
Benutze new Audio(...).play().
```
