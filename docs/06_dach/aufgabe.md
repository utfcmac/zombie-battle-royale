# Station 06 – Dach (Endszene: Hubschrauber)

**Deine Aufgabe:** Das große Finale — Töne vertonen, Abschluss-Video generieren und die Endszene einbauen.

> ✅ **Bereits vorhanden:**
> - Startbild Dach (leer): [`game/06_dach/assets/dach.png`](../../game/06_dach/assets/dach.png)
> - Hubschrauber-Bild: [`game/06_dach/assets/hubschrauber.png`](../../game/06_dach/assets/hubschrauber.png)

---

> 📋 **Stil-Vorlage:** Die Stil-Zeilen in jedem Prompt stammen aus `docs/00_stil-vorlage.md` — nie weglassen, damit alle Bilder zusammenpassen.

---

## 6.1 🎙️ Ton: Das Dach ist leer

Das Startbild ist bereits fertig. Jetzt braucht es einen Ton dazu.

Geh auf [elevenlabs.io](https://elevenlabs.io), stelle **Model = v3** ein, wähle die Stimme **„Commander Brake – Strict & Dominant"** und kopier diesen Text 1:1 rein:

```
[sighs] [breathing heavily] Aufs Dach. Du hast es wirklich geschafft.
[pause] [whispering] Unter dir die ganze Horde. Aber hier oben...
[pause] [whispering] Erstmal Ruhe.
```

Speichere als `game/06_dach/assets/dach_voice_ankunft.mp3`.

Dann lass Claude Code den Ton einbauen:
```
In game/scenes.js bei der Szene "dach":
Füge ein audio-Feld hinzu mit Wert "06_dach/assets/dach_voice_ankunft.mp3".
Die Engine spielt das Audio dann automatisch beim ersten Aufruf ab und zeigt
einen Lautsprecher-Button neben dem Text.
```

---

## 6.2 🎙️ Ton: Ein Hubschrauber taucht auf

Das Hubschrauber-Bild ist bereits fertig. Auch hier muss nur der Ton generiert werden.

Wieder **Model = v3** und Stimme **„Commander Brake – Strict & Dominant"**:

```
[whispering] Warte — hörst du das?
[pause] [panicked] Motorengeräusch! Aus der Ferne — es wird lauter!
[pause] [shouting] Ein Hubschrauber! Hier! Hier oben! Sie kommen!
```

Speichere als `game/06_dach/assets/dach_voice_hubschrauber.mp3`.

Dann lass Claude Code den Ton einbauen:
```
In game/scenes.js bei der Szene "dach_hubschrauber":
Füge ein audio-Feld hinzu mit Wert "06_dach/assets/dach_voice_hubschrauber.mp3".
```

---

## 6.3 🎬 Abschluss-Video mit Veo generieren

Für die eigentliche Endszene generieren wir ein Video — der Hubschrauber steigt auf und fliegt davon. Das Start-Frame ist bereits fertig (`hubschrauber.png`).

1. Geh auf [gemini.google.com](https://gemini.google.com).
2. Lade [`game/06_dach/assets/hubschrauber.png`](../../game/06_dach/assets/hubschrauber.png) hoch.
3. Wähle im Prompt-Feld die Option **„Videos"** — oder beginne deinen Prompt mit `Generate a video from this image`.

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

---

## 6.4 🎙️ Ton: Abflug

Wieder **Model = v3** und Stimme **„Commander Brake – Strict & Dominant"**:

```
[breathing heavily] Du bist drin. Die Tür fällt ins Schloss.
[pause] [whispering] Unter dir schrumpft die Schule. Die Zombies — winzig.
[pause] [determined] Du hast überlebt. Diesmal.
```

Speichere als `game/06_dach/assets/dach_voice_abflug.mp3`.

> ⚠️ **Ton-Konflikt:** Das Veo-Video hat einen eigenen Sound (Rotorgeräusch). Wenn gleichzeitig das Voice-Over läuft, überlagern sich beide. Varianten:
> - Video stummschalten → nur Voice-Over hörbar.
> - Voice-Over für Szene 3 weglassen → nur Video-Ton.
> - Einfach ausprobieren, was besser wirkt — Claude Code übernimmt das.
