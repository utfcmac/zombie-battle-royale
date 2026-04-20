# Station 05 – Basketballplatz (Minispiel: Basketball-Ausweichen)

**Status: fertig und spielbar.** Deine Aufgabe: Ton hinzufügen und das Minispiel verfeinern.

Das Basketball-Minispiel ist die **Referenz** für alle anderen Stationen — schau es dir an, wenn du verstehen willst wie ein Minispiel aufgebaut ist: `game/05_basketballplatz/basketball.js`.

---

## 🎙️ Szenen-Ton mit ElevenLabs

Lass diese Texte sprechen. Wähle für den Sportlehrer eine tiefe, grummelige Stimme. Speichere in `game/05_basketballplatz/assets/`.

**`basketball_voice_intro.mp3`** — Sportlehrer-Zombie (grummelig):
```
Ausweichen nützt dir nichts.
Ich habe noch dreißig Bälle.
```

**`basketball_voice_sieg.mp3`** — Erzähler (dramatisch):
```
Der letzte Ball geht daneben.
Der Sportlehrer geht zu Boden.
Das Seil — jetzt!
```

**`basketball_voice_fail.mp3`** — Erzähler:
```
Volltreffer. Das hat wehgetan.
```

Dann Claude Code bitten, die Sounds einzubauen:
```
In game/scenes.js:
- In basketballplatz.onEnter: spiele "05_basketballplatz/assets/basketball_voice_intro.mp3"
- In basketballplatz_sieg.onEnter: spiele "05_basketballplatz/assets/basketball_voice_sieg.mp3"
- In basketballplatz_fail.onEnter: spiele "05_basketballplatz/assets/basketball_voice_fail.mp3"
Benutze new Audio(...).play().
```

---

## 🤖 Minispiel verbessern mit Claude Code

Hast du das Minispiel gespielt und findest es zu leicht oder zu schwer? Paste diesen Prompt:

```
In game/05_basketballplatz/basketball.js:
Mache das Minispiel schwieriger:
- Ab Sekunde 15 soll der Zombie-Sportlehrer zwei Bälle gleichzeitig werfen (mit 200ms Versatz).
- Ab Sekunde 25 sollen die Bälle 30% schneller fliegen.
- Füge einen sichtbaren Countdown-Timer im Minispiel ein (großer Text oben in der Mitte, zählt von 30 runter).
Ändere nichts am Muster der Funktion startBasketballAusweichen(onWin, onLose).
```

---

> 📋 **Stil-Vorlage:** Die fett markierten Stil-Zeilen in jedem Prompt stammen aus `docs/00_stil-vorlage.md` — nie weglassen, damit alle Bilder zusammenpassen.

## 🎨 Hintergrundbild aufwerten mit Gemini (optional)

```
Outdoor covered basketball court at a school, overrun by zombie apocalypse.
The court is surrounded by a chain-link fence. Zombies press against the fence from outside.
A zombie PE teacher with a whistle around his neck stands on the court holding a basketball.
View from slightly above.

STYLE: Stylized painterly cartoon illustration, slightly brushy textures, high contrast,
clear silhouettes, dark but vibrant palette — dominated by mossy greens, moody greys,
warm amber accents. Inspired by LucasArts adventure game backgrounds, Tim Burton,
Goosebumps book covers, Hotel Transylvania. Spooky but kid-friendly (age 10–14).

ATMOSPHERE: Overcast sky with sickly yellow-green tint. Low ground fog drifting across
the court. Long diagonal shadows. Dried leaves swirling through the chain-link fence.
Subtle volumetric light rays cutting through the roof structure.

TECHNICAL: 16:9 aspect ratio, 1280x720 resolution, sharp focus on foreground,
slight atmospheric depth-of-field on background.
No text, no speech bubbles, no UI overlays, no watermarks. No gore.
```
Speichere als `game/05_basketballplatz/assets/basketballplatz_kampf.png`.
