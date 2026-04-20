# Station 01 – Schulhof (Start)

**Deine Aufgabe:** Den Schulhof zum Leben erwecken — mit einem besseren Hintergrundbild und einer gesprochenen Einleitung.

---

> 📋 **Stil-Vorlage:** Die fett markierten Stil-Zeilen in jedem Prompt stammen aus `docs/00_stil-vorlage.md` — nie weglassen, damit alle Bilder zusammenpassen.

## 🎨 Hintergrundbild mit Gemini generieren

> ✅ **Bereits vorhanden:** `game/01_schulhof/assets/pausenhof.png`
> Schau es dir kurz an — gefällt es dir? Wenn ja, kannst du diesen Abschnitt überspringen.
> Wenn du ein besseres Bild willst, generiere es mit dem Prompt unten und **überschreibe die Datei**.

Geh auf [gemini.google.com](https://gemini.google.com), gib den Prompt ein und speichere das Ergebnis als `game/01_schulhof/assets/pausenhof.png`.

```
Schoolyard of a German school overrun by a zombie apocalypse.
Wide establishing shot, slight top-down angle.
Zombies visible in the background stumbling around.
A baseball bat lies in the bushes in the foreground.

STYLE: Stylized painterly cartoon illustration, slightly brushy textures, high contrast,
clear silhouettes, dark but vibrant palette — dominated by mossy greens, moody greys,
warm amber accents. Inspired by LucasArts adventure game backgrounds, Tim Burton,
Goosebumps book covers, Hotel Transylvania. Spooky but kid-friendly (age 10–14).

ATMOSPHERE: Overcast sky with a sickly yellow-green tint. Low ground fog drifting
across the yard. Long diagonal shadows. Dried leaves swirling in cold wind.
Subtle volumetric light rays cutting through the clouds.

TECHNICAL: 16:9 aspect ratio, 1280x720 resolution, sharp focus on foreground,
slight atmospheric depth-of-field on background.
No text, no speech bubbles, no UI overlays, no watermarks. No gore.
```

---

## 🎙️ Sprecher-Intro mit ElevenLabs vertonen

Geh auf [elevenlabs.io](https://elevenlabs.io), wähle eine dramatische Jugendstimme (z. B. „Adam" oder „Josh") und lass diesen Text sprechen. Speichere die Datei als `game/01_schulhof/assets/intro_voice.mp3`.

```
Ein ganz normaler Schultag.
Bis der erste Schrei durch den Flur hallt.
```

---

## 🤖 Ton ins Spiel einbauen mit Claude Code

Öffne Claude Code im Projektordner `zombie-battle-royale` und paste diesen Prompt:

```
In der Datei game/scenes.js gibt es eine Szene mit id "start".
Füge dort in onEnter einen Audio-Playback ein:
Spiele die Datei "01_schulhof/assets/intro_voice.mp3" ab,
sobald die Start-Szene zum ersten Mal gezeigt wird.
Benutze die Web Audio API oder ein einfaches new Audio(...).play().
Der Sound soll nur beim allerersten Aufruf spielen, nicht bei jedem Neustart.
Speichere in gameState ob der Ton schon gespielt wurde.
```
