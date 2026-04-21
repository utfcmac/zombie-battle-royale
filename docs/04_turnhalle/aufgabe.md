# Station 04 – Turnhalle (Minispiel: Seilklettern)

**Deine Aufgabe:** Die Turnhalle mit eigenem Startbild und Ton zum Leben erwecken — und dann das Seilklettern-Minispiel bauen.

---

## 4.1 🎨 Startbild mit Gemini generieren

> 📸 **Referenzfoto:** [`docs/04_turnhalle/turnhalle1.jpg`](turnhalle1.jpg) — die echte Schulsporthalle von der erhöhten Galerie aus: Holz-Rippendecke mit T-förmigen Stahlträgern, Sportbodenmarkierungen, Tribünen an den Seiten, Anzeigetafel, hohe Fensterreihen. **Lade es mit in Gemini hoch**, damit der Schauplatz wiedererkennbar bleibt.

> 📋 **Stil-Vorlage:** aus `docs/00_stil-vorlage.md` — immer ans Ende des Prompts, nie weglassen.

```
In the exact style of a LucasArts adventure game background:

Interior of a school gymnasium during a zombie apocalypse — based exactly
on the attached reference photo. Match the architecture:
- Wide sports hall seen from an elevated gallery angle looking down and across
- Distinctive wooden slatted ceiling with T-shaped steel support beams running
  across the full width
- Long rows of high windows along both side walls
- Bleacher benches along the sides
- Sports court with painted floor markings (basketball, handball lines)
- Electronic scoreboard visible on the far wall
- A green emergency exit door at the far end

Six thick climbing ropes hang in a row from the ceiling rafters at the far
end of the hall — the key detail. High above where the ropes are attached,
a jagged hole has been broken through the roof — sickly daylight and overcast
sky visible through the opening.
Gymnastics mats and medicine balls lie scattered on the floor.
A teenage boy is sprinting toward the ropes: black hair, black hoodie, black
backpack, blue jeans, black shoes — desperate and determined. Several zombies
are chasing him from behind, uncomfortably close.

STYLE: Stylized painterly cartoon illustration, slightly brushy textures, high contrast,
clear silhouettes, dark but vibrant palette — dominated by mossy greens, moody greys,
warm amber accents. Inspired by LucasArts adventure game backgrounds, Tim Burton,
Goosebumps book covers, Hotel Transylvania. Spooky but kid-friendly (age 10–14).

ATMOSPHERE: Sickly yellow-green light filtering through the high windows. Low ground
fog drifting across the gym floor. Long diagonal shadows from the ceiling beams and
ropes. Dust motes swirling in cold shafts of light. An eerie hush — the squeak of
sneakers and distant shuffling echoing from below.

TECHNICAL: 16:9 aspect ratio, 1280x720 resolution, elevated gallery angle looking
down and across the hall, sharp focus on the ropes and floor, slight atmospheric
depth-of-field on the far wall.
No text, no speech bubbles, no UI overlays, no watermarks. No gore.
```

<details>
<summary>📖 Deutsche Übersetzung zum Verstehen (nicht in Gemini eingeben!)</summary>

```
Im exakten Stil eines LucasArts-Adventure-Hintergrundbilds:

Innenraum einer Schulsporthalle während einer Zombie-Apokalypse — genau nach
dem beigefügten Referenzfoto. Architektur übernehmen:
- Breite Sporthalle aus erhöhter Galerieansicht, schräg nach unten blickend
- Markante Holz-Rippendecke mit T-förmigen Stahlträgern quer über die
  gesamte Breite
- Lange Reihen hoher Fenster an beiden Seitenwänden
- Tribünenbänke an den Seiten
- Sportboden mit aufgemalten Linien (Basketball, Handball)
- Elektronische Anzeigetafel an der Stirnwand
- Grüne Notausgangstür am hinteren Ende

Sechs dicke Kletterseile hängen in einer Reihe von den Deckenträgern am
hinteren Ende der Halle — das entscheidende Detail. Hoch oben, wo die Seile
befestigt sind, ist ein zackiges Loch durch das Dach gebrochen — krankhaftes
Tageslicht und bedeckter Himmel scheinen hindurch.
Turnmatten und Medizinbälle liegen auf dem Boden verstreut.
Ein Teenager sprintet auf die Seile zu: schwarze Haare, schwarzer Hoodie,
schwarzer Rucksack, blaue Jeans, schwarze Schuhe — verzweifelt und entschlossen.
Mehrere Zombies verfolgen ihn von hinten, bedrohlich nah.

STIL: Stilisierte malerische Cartoon-Illustration, leicht pinselige Texturen,
hoher Kontrast, klare Silhouetten, dunkle aber kräftige Palette — dominiert
von moosigen Grüntönen, düsteren Grautönen, warmen Bernstein-Akzenten.

ATMOSPHÄRE: Krankhaft gelbgrünes Licht durch die hohen Fenster. Bodennaher
Nebel über dem Hallenboden. Lange diagonale Schatten von Trägern und Seilen.
Staubpartikel wirbeln in kalten Lichtstrahlen. Gespenstische Stille — nur das
Quietschen von Turnschuhen und entferntes Schlurfen von unten.

TECHNISCH: 16:9-Seitenverhältnis, 1280x720 Auflösung, erhöhte Galerieansicht
schräg nach unten, scharfer Fokus auf Seile und Boden, leichte atmosphärische
Tiefenunschärfe zur Stirnwand hin.
Kein Text, keine Sprechblasen, keine UI-Overlays, keine Wasserzeichen.
Keine Gewaltdarstellung.
```

</details>

Speichere als `game/04_turnhalle/assets/turnhalle_intro.png`.

Falls das Bild noch nicht im Spiel angezeigt wird, lass Claude Code das übernehmen:
```
In game/scenes.js bei der Szene "turnhalle_intro":
Setze das image-Feld auf "04_turnhalle/assets/turnhalle_intro.png".
```

---

## 4.2 🎙️ Startbildschirm-Sound mit ElevenLabs

ElevenLabs **v3** versteht **Audio-Tags** in eckigen Klammern direkt im Text — sie steuern, wie die Stimme klingt (z. B. flüsternd, schreiend, keuchend).

Geh auf [elevenlabs.io](https://elevenlabs.io), stelle **Model = v3** ein, wähle die Stimme **„Commander Brake – Strict & Dominant"** und kopier diesen Text 1:1 rein:

```
[breathing heavily] Die Turnhalle.
[pause] [whispering] Kletterseile — hängen von der Decke.
[pause] [determined] Das ist dein Weg nach oben.
[pause] [tense] Aber die Zombies haben dich schon entdeckt.
```

Speichere als `game/04_turnhalle/assets/turnhalle_voice_intro.mp3`.

Dann lass Claude Code den Ton einbauen:
```
In game/scenes.js bei der Szene "turnhalle_intro":
Füge ein audio-Feld hinzu mit Wert "04_turnhalle/assets/turnhalle_voice_intro.mp3".
Die Engine spielt das Audio dann automatisch beim ersten Aufruf ab und zeigt
einen Lautsprecher-Button neben dem Text.
```

---

## 4.3 🤖 Minispiel bauen mit Claude Code

Öffne Claude Code im Projektordner `zombie-battle-royale` und paste diesen Prompt:

```
Ich baue ein Browser-Spiel (Vanilla JS, kein Framework).
Erstelle die Datei game/04_turnhalle/seilklettern.js mit der Funktion startSeilklettern(onWin, onLose).

Das Minispiel läuft im Element #combat-area (1280x720px, position: relative).
Hintergrundbild: renderSceneImage("04_turnhalle/assets/turnhalle_kampf.png") — existiert in engine.js.

Wichtig zur Hintergrundgrafik: turnhalle_kampf.png zeigt die Turnhalle aus einer leicht erhöhten
Seitenperspektive. Die 6 Kletterseile sind im Bild im linken Bereich sichtbar und hängen vertikal
von der Decke. Positioniere die 6 Spiel-Seile so, dass sie optisch mit dem Hintergrundbild
übereinstimmen: gleichmäßig verteilt zwischen x=80px und x=560px (je ~96px Abstand).

Spielmechanik — vertikaler Kletterer:
- Es gibt 6 vertikale Seile nebeneinander als schmale braune Streifen (8px breit, volle Höhe),
  positioniert bei x ≈ 80, 176, 272, 368, 464, 560px (Mitte des Streifens).
- Alex (ove_turnhalle.png aus 04_turnhalle/assets/, ~60px breit) hängt am 3. Seil von links,
  startet unten (y ≈ 580px).
- Mit A/← wechselt Alex ein Seil nach links, mit D/→ ein Seil nach rechts.
  Kein Wechsel über den Rand (Seil 1 und Seil 6) hinaus.
- Alex klettert automatisch nach oben (gleichmäßig, kein Button nötig).
- Ein Fortschrittsbalken (schmaler Streifen, rechts am Rand, z. B. x=1240px) zeigt den Aufstieg
  von unten nach oben — bei 100% = Loch im Dach erreicht → onWin().
- Fallende Hindernisse (runde Divs ~40px, rot/braun = Medizinbälle) spawnen zufällig auf einem
  der 6 Seile oben und fallen nach unten. Bei Kollision mit Alex → loseHeart(1) aus engine.js,
  kurze Unverwundbarkeit (300ms Flackern, Alex-Div opacity wechselt).
- Schwierigkeit steigt mit der Höhe: unter 33% = 2 Bälle gleichzeitig, 33–66% = 3 Bälle,
  über 66% = 4 Bälle, alle mit zunehmender Fallgeschwindigkeit.
- gameState.hearts === 0 → cleanup, onLose().

Danach:
1. Füge in game/index.html vor scenes.js ein: <script src="04_turnhalle/seilklettern.js"></script>
2. Ersetze in game/scenes.js beim turnhalle_intro den placeholderMinigame-Aufruf durch:
   startSeilklettern(() => showScene("turnhalle_sieg"), () => showScene("turnhalle_fail"))

Schau dir game/05_basketballplatz/basketball.js als Muster an.
```

---

> 📋 **Stil-Vorlage:** Die Stil-Zeilen in jedem Prompt stammen aus `docs/00_stil-vorlage.md` — nie weglassen, damit alle Bilder zusammenpassen.

## 4.4 🎨 Siegesbild mit Gemini generieren

> 📸 **Referenzfoto:** [`docs/04_turnhalle/turnhalle2.jpg`](turnhalle2.jpg) — die Sporthalle aus der erhöhten Galerieansicht schräg nach unten: Holz-Rippendecke, Sportboden mit Linien, Tribünen, Anzeigetafel, runde Fenster an der Stirnwand. **Lade es mit in Gemini hoch.**

> 📋 **Stil-Vorlage:** aus `docs/00_stil-vorlage.md` — immer ans Ende des Prompts, nie weglassen.

```
In the exact style of a LucasArts adventure game background:

Interior of a school gymnasium during a zombie apocalypse — based exactly
on the attached reference photo. Match the architecture:
- Wide sports hall seen from an elevated gallery angle looking down and across
- Distinctive wooden slatted ceiling with T-shaped steel support beams
- Round windows and electronic scoreboard on the far wall
- Bleacher benches along the sides
- Sports court with painted floor markings

View from just above the jagged hole that has been broken through the roof:
the ragged edges of the hole frame the top of the image, and through it we
look down steeply into the gymnasium below.
Six thick climbing ropes hang from the ceiling rafters directly below the hole.
Several zombies are on the ropes — mid-climb, reaching upward toward the viewer,
grotesque faces tilted up, grasping hands extended. One or two more zombies
stand on the gym floor below, waiting their turn.

STYLE: Stylized painterly cartoon illustration, slightly brushy textures, high contrast,
clear silhouettes, dark but vibrant palette — dominated by mossy greens, moody greys,
warm amber accents. Inspired by LucasArts adventure game backgrounds, Tim Burton,
Goosebumps book covers, Hotel Transylvania. Spooky but kid-friendly (age 10–14).

ATMOSPHERE: Sickly yellow-green daylight pours through the jagged roof hole from above,
casting a harsh cone of light down onto the ropes and climbing zombies. Long diagonal
shadows from the beams. Low ground fog across the gym floor below. Dust and plaster
debris falling from the broken roof edge. The sense of immediate, closing danger.

TECHNICAL: 16:9 aspect ratio, 1280x720 resolution, steep top-down angle looking through
the hole into the hall below, sharp focus on the ropes and climbing zombies, slight
atmospheric depth-of-field on the gym floor in the background.
No text, no speech bubbles, no UI overlays, no watermarks. No gore.
```

<details>
<summary>📖 Deutsche Übersetzung zum Verstehen (nicht in Gemini eingeben!)</summary>

```
Im exakten Stil eines LucasArts-Adventure-Hintergrundbilds:

Innenraum einer Schulsporthalle während einer Zombie-Apokalypse — genau nach
dem beigefügten Referenzfoto. Architektur übernehmen:
- Breite Sporthalle aus erhöhter Galerieansicht, schräg nach unten blickend
- Markante Holz-Rippendecke mit T-förmigen Stahlträgern
- Runde Fenster und elektronische Anzeigetafel an der Stirnwand
- Tribünenbänke an den Seiten
- Sportboden mit aufgemalten Linien

Blick von knapp oberhalb des zackigen Lochs, das durch das Dach gebrochen wurde:
Die ausgefransten Ränder des Lochs rahmen den oberen Bildrand, und durch das Loch
schauen wir steil nach unten in die Sporthalle.
Sechs dicke Kletterseile hängen von den Deckenträgern direkt unterhalb des Lochs.
Mehrere Zombies sind bereits auf den Seilen — mitten im Klettern, greifen nach oben
in Richtung Betrachter, groteske Gesichter nach oben gewandt, ausgestreckte Hände.
Ein oder zwei weitere Zombies stehen auf dem Hallenboden darunter und warten.

STIL: Stilisierte malerische Cartoon-Illustration, leicht pinselige Texturen, hoher
Kontrast, klare Silhouetten, dunkle aber kräftige Palette — dominiert von moosigen
Grüntönen, düsteren Grautönen, warmen Bernstein-Akzenten.

ATMOSPHÄRE: Krankhaft gelbgrünes Tageslicht fällt durch das zackige Dachloch von oben
herein und wirft einen harten Lichtkegel auf die Seile und kletternden Zombies. Lange
diagonale Schatten von den Trägern. Bodennaher Nebel auf dem Hallenboden unten. Staub
und Putzreste rieseln von den Dachkanten. Das Gefühl unmittelbarer, nahender Gefahr.

TECHNISCH: 16:9-Seitenverhältnis, 1280x720 Auflösung, steile Aufsicht durch das Loch
in die Halle darunter, scharfer Fokus auf Seile und kletternde Zombies, leichte
atmosphärische Tiefenunschärfe auf dem Hallenboden im Hintergrund.
Kein Text, keine Sprechblasen, keine UI-Overlays, keine Wasserzeichen.
Keine Gewaltdarstellung.
```

</details>

Speichere als `game/04_turnhalle/assets/turnhalle_sieg.png`.

Dann lass Claude Code das Bild einbauen:
```
In game/scenes.js bei der Szene "turnhalle_sieg":
Setze das image-Feld auf "04_turnhalle/assets/turnhalle_sieg.png".
```

---

## 4.5 🎙️ Sieg-Ton mit ElevenLabs

Wieder **Model = v3** und Stimme **„Commander Brake – Strict & Dominant"**:

```
[sighs] [breathing heavily] Oben. Geschafft.
[pause] [panicked] Warte — sie klettern nach! Die Seile!
[pause] [determined] Weg vom Dach. Zum Basketballplatz — letzte Chance.
```

Speichere als `game/04_turnhalle/assets/turnhalle_voice_sieg.mp3`.

Dann lass Claude Code den Ton einbauen:
```
In game/scenes.js bei der Szene "turnhalle_sieg":
Füge ein audio-Feld hinzu mit Wert "04_turnhalle/assets/turnhalle_voice_sieg.mp3".
```
