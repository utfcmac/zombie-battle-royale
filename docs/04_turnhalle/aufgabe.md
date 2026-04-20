# Station 04 – Turnhalle (Minispiel: Seilklettern)

**Deine Aufgabe:** Das Seilklettern-Minispiel bauen — und die Turnhalle mit einem eigenen Bild und Ton zum Leben erwecken.

---

## 🤖 Minispiel bauen mit Claude Code

Öffne Claude Code im Projektordner `zombie-battle-royale` und paste diesen Prompt:

```
Ich baue ein Browser-Spiel (Vanilla JS, kein Framework).
Erstelle die Datei game/04_turnhalle/seilklettern.js mit der Funktion startSeilklettern(onWin, onLose).

Das Minispiel läuft im Element #combat-area (1280x720px, position: relative).
Hintergrundbild: renderSceneImage("04_turnhalle/assets/turnhalle_kampf.png") — existiert in engine.js.

Spielmechanik — vertikaler Kletterer:
- Es gibt 3 vertikale Seile nebeneinander (links, mitte, rechts) als schmale braune Streifen (8px breit, volle Höhe).
- Alex (ove_turnhalle.png aus 04_turnhalle/assets/) hängt am mittleren Seil, startet unten.
- Mit A/← wechselt Alex auf das linke Seil, mit D/→ auf das rechte. Kein Wechsel über den Rand hinaus.
- Alex klettert automatisch nach oben (gleichmäßig, kein Button nötig).
- Ein Fortschrittsbalken (schmaler Streifen rechts) zeigt den Aufstieg — bei 100% = Dachluke erreicht → onWin().
- Fallende Hindernisse (runde Divs in rot/braun = Medizinbälle) spawnen zufällig auf einem der 3 Seile und fallen nach unten. Bei Kollision mit Alex → loseHeart(1) aus engine.js, kurze Unverwundbarkeit (300ms Flackern).
- Schwierigkeit steigt mit der Höhe: unter 33% = 1 Ball gleichzeitig, 33–66% = 2 Bälle, über 66% = 3 Bälle, alle schneller.
- gameState.hearts === 0 → cleanup, onLose().

Danach:
1. Füge in game/index.html vor scenes.js ein: <script src="04_turnhalle/seilklettern.js"></script>
2. Ersetze in game/scenes.js beim turnhalle_intro den placeholderMinigame-Aufruf durch:
   startSeilklettern(() => showScene("turnhalle_sieg"), () => showScene("turnhalle_fail"))

Schau dir game/05_basketballplatz/basketball.js als Muster an.
```

---

> 📋 **Stil-Vorlage:** Die fett markierten Stil-Zeilen in jedem Prompt stammen aus `docs/00_stil-vorlage.md` — nie weglassen, damit alle Bilder zusammenpassen.

## 🎨 Turnhallen-Bilder mit Gemini generieren

**Hintergrund `turnhalle_kampf.png`** (nur wenn du ein besseres Bild willst):
```
Inside a school gymnasium seen from a top-down bird's eye view.
Three climbing ropes hanging from the ceiling, visible as vertical lines.
Gymnastics mats, medicine balls and benches scattered on the floor.
A roof hatch visible at the top of the image.
A few zombies have entered through the gym door (bottom of image).

STYLE: Stylized painterly cartoon illustration, slightly brushy textures, high contrast,
clear silhouettes, dark but vibrant palette — dominated by mossy greens, moody greys,
warm amber accents. Inspired by LucasArts adventure game backgrounds, Tim Burton,
Goosebumps book covers, Hotel Transylvania. Spooky but kid-friendly (age 10–14).

ATMOSPHERE: Overcast light through high gym windows with sickly yellow-green tint.
Low ground fog drifting across the gym floor. Long diagonal shadows from the ropes.
Dust motes in the air. Cold, eerie silence implied by the emptiness.

TECHNICAL: 16:9 aspect ratio, 1280x720 resolution, sharp focus on foreground,
slight atmospheric depth-of-field on background.
No text, no speech bubbles, no UI overlays, no watermarks. No gore.
```
Speichere als `game/04_turnhalle/assets/turnhalle_kampf.png`.

**Alex-Kletterpose `ove_klettern.png`** (optional, ersetzt ove_turnhalle.png im Minispiel):
```
Single teenage boy seen from the front, climbing a rope, arms raised above head gripping rope,
slightly hunched, determined expression, black jacket and jeans, dark hair.

STYLE: Stylized painterly cartoon illustration, slightly brushy textures, high contrast,
clear silhouettes, dark but vibrant palette — dominated by mossy greens, moody greys,
warm amber accents. Inspired by LucasArts adventure game backgrounds, Tim Burton,
Goosebumps book covers, Hotel Transylvania. Spooky but kid-friendly (age 10–14).

TECHNICAL: Transparent background, PNG with alpha channel, object centered on canvas,
no drop shadow, no cast ground shadow, no floor, no background elements.
No text, no watermarks. No gore.
```
Speichere als `game/04_turnhalle/assets/ove_klettern.png`.

---

## 🎙️ Szenen-Ton mit ElevenLabs

Dateien in `game/04_turnhalle/assets/` speichern:

**`turnhalle_voice_intro.mp3`:**
```
Die Turnhalle. Kletterseile.
Das ist dein Weg nach oben.
```

**`turnhalle_voice_sieg.mp3`:**
```
Oben. Aber das Dach endet im Nichts.
Wenigstens hast du ein Seil.
Zum Basketballplatz. Letzte Chance.
```

Dann Claude Code bitten, die Sounds einzubauen:
```
In game/scenes.js: Spiele in turnhalle_intro.onEnter die Datei
"04_turnhalle/assets/turnhalle_voice_intro.mp3" ab,
und in turnhalle_sieg.onEnter die Datei
"04_turnhalle/assets/turnhalle_voice_sieg.mp3".
Benutze new Audio(...).play().
```
