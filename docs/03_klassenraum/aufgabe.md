# Station 03 – Klassenraum (Minispiel: Labyrinth-Flucht)

**Deine Aufgabe:** Das Labyrinth-Minispiel fertigbauen — alle Sprites liegen schon bereit!

---

## 🤖 Minispiel bauen mit Claude Code

Öffne Claude Code im Projektordner `zombie-battle-royale` und paste diesen Prompt:

```
Ich baue ein Browser-Spiel (Vanilla JS, kein Framework).
Implementiere die Funktion startLabyrinth(onWin, onLose) in game/03_klassenraum/labyrinth.js.
Die Datei existiert schon als Stub — ersetze den Inhalt vollständig.

Das Minispiel läuft im Element #combat-area (1280x720px, position: relative).
Hintergrundbild: renderSceneImage("03_klassenraum/assets/klassenraum_kampf.png") — diese Funktion existiert in engine.js.

Spielmechanik — Kachel-Labyrinth (Top-down):
- Grid: 10 Spalten × 7 Zeilen. Kachelgröße: 128×100px (passt auf 1280x700px).
- Wände (Tische): tisch.png aus 03_klassenraum/assets/, skaliert auf eine Kachel.
- Spieler: ove_von_oben.png aus 03_klassenraum/assets/, startet auf Kachel (0,0) oben links.
- Ausgang: Kachel (9,6) unten rechts — markiert mit einem grünen Rahmen oder Pfeil-Div.
- 3 Zombies (zombie_oben_01/02/03.png aus 03_klassenraum/assets/) patrouillieren auf festen Routen:
  Zombie 1: bewegt sich horizontal auf Zeile 2 (links↔rechts, Schritt alle 900ms)
  Zombie 2: bewegt sich vertikal auf Spalte 5 (hoch↔runter, Schritt alle 1100ms)
  Zombie 3: bewegt sich horizontal auf Zeile 5 (links↔rechts, Schritt alle 800ms)
- Wand-Layout: Zeilen 1,3,5 haben abwechselnde Wand-Blöcke (Spalten 1,3,5,7 = Wand, Rest frei) — Zombie-Routen müssen auf freien Feldern liegen.
- Spieler bewegt sich mit WASD oder Pfeiltasten (ein Feld pro Tastendruck, keine Diagonale).
- Kollision Spieler↔Zombie → loseHeart(1) aus engine.js aufrufen, Spieler zurück zu (0,0).
- Spieler erreicht (9,6) → cleanup, onWin().
- Zeitlimit 30 Sekunden (nutze startTimer/stopTimer aus engine.js) — abgelaufen → cleanup, onLose().
- gameState.hearts === 0 → cleanup, onLose().

Schau dir game/05_basketballplatz/basketball.js als Muster für Aufbau und Cleanup an.
```

---

> 📋 **Stil-Vorlage:** Die fett markierten Stil-Zeilen in jedem Prompt stammen aus `docs/00_stil-vorlage.md` — nie weglassen, damit alle Bilder zusammenpassen.

## 🎨 Klassenraum-Sprites verbessern mit Gemini

Die vorhandenen Sprites passen gut — falls du Varianten willst:

**Neuer Zombie-Sprite (top-down, 4. Variante):**
```
Single zombie student seen strictly from directly above, camera perpendicular to floor.
Visible: top of messy hair, hunched shoulders, both arms stretched forward.
Torn school uniform, grey-green skin, subtle bruising.

STYLE: Stylized painterly cartoon illustration, slightly brushy textures, high contrast,
clear silhouettes, dark but vibrant palette — dominated by mossy greens, moody greys,
warm amber accents. Inspired by LucasArts adventure game backgrounds, Tim Burton,
Goosebumps book covers, Hotel Transylvania. Spooky but kid-friendly (age 10–14).

TECHNICAL: Transparent background, PNG with alpha channel, object centered on canvas,
no drop shadow, no cast ground shadow, no floor, no background elements.
No text, no watermarks. No gore.
```
Speichere als `game/03_klassenraum/assets/zombie_oben_04_clean.png`.

---

## 🎙️ Szenen-Ton mit ElevenLabs

Dateien in `game/03_klassenraum/assets/` speichern:

**`klassenraum_voice_intro.mp3`:**
```
Sie haben dich aufgespürt.
Die Tür fliegt auf.
Komm durch — oder bleib für immer hier.
```

**`klassenraum_voice_sieg.mp3`:**
```
Brandschutztür zu. Du hast es durch das Labyrinth geschafft.
```

Dann Claude Code bitten, die Sounds einzubauen:
```
In game/scenes.js: Spiele in klassenraum_intro.onEnter die Datei
"03_klassenraum/assets/klassenraum_voice_intro.mp3" ab,
und in klassenraum_sieg.onEnter die Datei
"03_klassenraum/assets/klassenraum_voice_sieg.mp3".
Benutze new Audio(...).play().
```
