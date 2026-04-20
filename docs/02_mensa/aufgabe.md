# Station 02 – Mensa (Minispiel: Teller werfen)

**Deine Aufgabe:** Das Teller-Wurf-Minispiel bauen — mit Claude Code. Kein Programmieren von Hand.

---

## 🤖 Minispiel bauen mit Claude Code

Öffne Claude Code im Projektordner `zombie-battle-royale` und paste diesen Prompt:

```
Ich baue ein Browser-Spiel (Vanilla JS, kein Framework).
Erstelle die Datei game/02_mensa/teller.js mit der Funktion startTellerWerfen(onWin, onLose).

Das Minispiel läuft im Element #combat-area (position: relative, 1280x720px).
Hintergrundbild: renderSceneImage("02_mensa/assets/mensa_kampf.png") — diese Funktion existiert schon in engine.js.

Spielmechanik:
- Alex-Sprite (ove_mensa.png aus 02_mensa/assets/) steht am unteren Rand, bewegt sich mit A/D oder Pfeiltasten links/rechts.
- Mit Leertaste wirft Alex einen Plastikteller nach oben (weißes rundes div, border-radius 50%).
- Zombies spawnen am oberen Rand und laufen gerade nach unten. Bilder: zombie_oben_01.png, zombie_oben_02.png, zombie_oben_03.png aus 03_klassenraum/assets/.
- Trifft ein Teller einen Zombie → beide verschwinden, Punkt +1.
- Erreicht ein Zombie den unteren Rand → loseHeart(1) aufrufen (existiert in engine.js), dann Zombie entfernen.
- 3 Wellen: Welle 1 = 3 Zombies langsam, Welle 2 = 5 Zombies schneller, Welle 3 = 7 Zombies mit leichtem Zickzack.
- Alle 3 Wellen geschafft → cleanup, onWin() aufrufen.
- gameState.hearts === 0 → cleanup, onLose() aufrufen.

Schau dir game/05_basketballplatz/basketball.js als Muster an — gleiche Struktur: combat-area befüllen, Game-Loop mit requestAnimationFrame, Keyboard-Listener registrieren und am Ende wieder entfernen.

Danach füge in game/index.html vor scenes.js den Tag
<script src="02_mensa/teller.js"></script>
ein.

Ersetze außerdem in game/scenes.js bei der mensa_intro-Szene den placeholderMinigame-Aufruf durch:
startTellerWerfen(() => showScene("mensa_sieg"), () => showScene("mensa_fail"))
```

---

> 📋 **Stil-Vorlage:** Die fett markierten Stil-Zeilen in jedem Prompt stammen aus `docs/00_stil-vorlage.md` — nie weglassen, damit alle Bilder zusammenpassen.

## 🎨 Mensa-Kampfbild aufwerten mit Gemini

Das aktuelle `mensa_kampf.png` zeigt die Mensa von oben. Falls du ein dramatischeres Bild willst, ersetze es mit diesem Prompt:

```
Inside a German school cafeteria overrun by zombies.
View from slightly above (bird's eye, top-down tilt).
Zombies shambling between the cafeteria tables and benches.
Plastic plates and trays scattered on the floor.
Cafeteria serving counter visible at the top.

STYLE: Stylized painterly cartoon illustration, slightly brushy textures, high contrast,
clear silhouettes, dark but vibrant palette — dominated by mossy greens, moody greys,
warm amber accents. Inspired by LucasArts adventure game backgrounds, Tim Burton,
Goosebumps book covers, Hotel Transylvania. Spooky but kid-friendly (age 10–14).

ATMOSPHERE: Sickly yellow-green fluorescent lighting flickering overhead. Low ground fog
drifting between the benches. Overturned food trays. Long diagonal shadows.
Dried leaves and torn paper swirling through broken windows.

TECHNICAL: 16:9 aspect ratio, 1280x720 resolution, sharp focus on foreground,
slight atmospheric depth-of-field on background.
No text, no speech bubbles, no UI overlays, no watermarks. No gore.
```

Speichere als `game/02_mensa/assets/mensa_kampf.png`.

---

## 🎙️ Szenen-Ton mit ElevenLabs

Lass diese zwei Texte sprechen und speichere sie in `game/02_mensa/assets/`:

**Datei `mensa_voice_intro.mp3`** — vor dem Minispiel:
```
Die Mensa. Überall Zombies.
Aber da — ein Stapel Teller.
```

**Datei `mensa_voice_sieg.mp3`** — nach dem Sieg:
```
Hintertür zu. Die Mensa ist verloren.
Aber du lebst noch.
```

Dann lass Claude Code die Sounds einbauen:
```
In game/scenes.js: Spiele in mensa_intro.onEnter die Datei
"02_mensa/assets/mensa_voice_intro.mp3" ab,
und in mensa_sieg.onEnter die Datei "02_mensa/assets/mensa_voice_sieg.mp3".
Benutze new Audio(...).play(). Kein Try-Catch nötig.
```
