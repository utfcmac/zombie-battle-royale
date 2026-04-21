# Station 02 – Mensa (Minispiel: Teller werfen)

**Deine Aufgabe:** Das Teller-Wurf-Minispiel bauen — mit Claude Code. Kein Programmieren von Hand.

> ✅ **Bereits vorhanden:**
> - Start-Bildschirmfoto: [`game/02_mensa/assets/mensa_intro.png`](../../game/02_mensa/assets/mensa_intro.png)
> - Kampf-Hintergrundbild: [`game/02_mensa/assets/mensa_kampf.png`](../../game/02_mensa/assets/mensa_kampf.png)
>
> Schau sie dir kurz an — gefallen sie dir? Dann brauchen wir jetzt einen Sprecher für unsere Texte.

---

## 2.1 🎙️ Ton vor dem Minispiel – mit ElevenLabs (KI für Umwandlung von Text in Sprache) vertonen

Bevor das Minispiel startet, soll ein Sprecher die Szene einleiten. Der Basistext:

```
Die Mensa. Überall Zombies.
Aber da — ein Stapel Teller.
```

ElevenLabs **v3** versteht **Audio-Tags** in eckigen Klammern direkt im Text — sie steuern, wie die Stimme klingt (z. B. flüsternd, schreiend, keuchend).

Geh auf [elevenlabs.io](https://elevenlabs.io), stelle **Model = v3** ein, wähle die Stimme **„Commander Brake – Strict & Dominant"** und kopier diesen Text 1:1 rein:

```
[gasp] [panicked] Die Mensa — überall Zombies!
[pause] [whispering] Aber da... ein Stapel Teller.
```

Speichere die generierte Datei als `game/02_mensa/assets/mensa_voice_intro.mp3`.

Dann lass Claude Code den Ton einbauen im Projektordner `zombie-battle-royale`. Paste dort diesen Prompt::
```
In game/scenes.js bei der Szene "mensa_intro":
Füge ein audio-Feld hinzu mit Wert "02_mensa/assets/mensa_voice_intro.mp3".
Die Engine spielt das Audio dann automatisch beim ersten Aufruf ab und zeigt
einen Lautsprecher-Button neben dem Text.
```

---

## 2.2 🤖 Minispiel bauen mit Claude Code

Öffne Claude Code im Projektordner `zombie-battle-royale` und paste diesen Prompt:

```
Ich baue ein Browser-Spiel (Vanilla JS, kein Framework).
Erstelle die Datei game/02_mensa/teller.js mit der Funktion startTellerWerfen(onWin, onLose).

Das Minispiel läuft im Element #combat-area (position: relative, 1280x720px).
Hintergrundbild: renderSceneImage("02_mensa/assets/mensa_kampf.png") — diese Funktion existiert schon in engine.js.

Wichtig zur Perspektive: Das Hintergrundbild (mensa_kampf.png) zeigt die Mensa
aus Alex' Blick — Tischreihen fluchten in einen **Fluchtpunkt in der Bildmitte**
(ungefähr horizontal zentriert, vertikal bei ca. 40% Höhe = die hintere Wand mit
den Fenstern). Die Zombies müssen sich in dieser Perspektive bewegen, sonst
wirkt es, als würden sie in der Luft schweben.

Spielmechanik:
- Alex-Sprite (ove_mensa.png aus 02_mensa/assets/) steht am unteren Rand (Vordergrund),
  bewegt sich mit A/D oder Pfeiltasten links/rechts.
- Mit Leertaste wirft Alex einen Plastikteller in Richtung Fluchtpunkt — dargestellt
  als reiner weißer Kreis (div, ca. 36px, `background: white`, `border-radius: 50%`,
  dezenter `box-shadow` für Plastik-Look). Der Teller fliegt geradeaus nach oben und
  wird mit zunehmender Distanz **kleiner** (Scale abnehmend von 1.0 auf ca. 0.3),
  passend zur Perspektive.
- Zombies spawnen **klein am Fluchtpunkt** (nahe der Bildmitte, ca. y=40% Höhe,
  x leicht gestreut zwischen den Tischreihen) und laufen auf Alex zu —
  also in Richtung Vordergrund. Dabei:
   - ihre y-Position wandert Richtung unterer Rand,
   - ihre x-Position fächert sich leicht nach außen auf (zur jeweils nächsten
     Tischreihen-Gasse), damit sie den Fluchtlinien folgen statt in der Mitte
     zu drängen,
   - ihre **Größe (Scale) wächst** mit der Distanz zur Kamera (z. B. von 0.25
     am Fluchtpunkt auf 1.2 am Vordergrund).
- Bilder aus 02_mensa/assets/: zombie_deutschlehrerin.png, zombie_hausmeister.png,
  zombie_koechin.png, zombie_mathelehrer.png, zombie_schueler.png,
  zombie_schuelerin.png (pro Spawn zufällig einen auswählen).
- Trifft ein Teller einen Zombie → beide verschwinden, Punkt +1. Kollision muss die
  aktuelle skalierte Größe des Zombies berücksichtigen (kein fester Hit-Radius).
- Erreicht ein Zombie den unteren Rand (Alex ist getroffen) → loseHeart(1) aufrufen
  (existiert in engine.js), dann Zombie entfernen.
- 3 Wellen: Welle 1 = 3 Zombies langsam, Welle 2 = 5 Zombies schneller, Welle 3 = 7
  Zombies mit leichtem Zickzack zwischen den Gassen.
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

## 2.3 🎨 Mensa-Siegbild mit Gemini generieren

Nach dem gewonnenen Minispiel brauchen wir einen **Abschlussbildschirm** — Alex
hat's durch die Hintertür der Mensa geschafft und steht im Foyer.

> 📸 **Referenzfoto:** [`docs/02_mensa/mensa_ausgang.jpg`](mensa_ausgang.jpg) — echtes
> Foto des Foyer-Bereichs hinter der Mensa. **Lade es mit in Gemini hoch**, damit der
> Schauplatz wiedererkennbar bleibt (hohe Glasfront mit Bäumen dahinter, dunkler
> quaderförmiger Metallkasten mit Durchgang rechts, Galerie-Brüstung mit vertikalen
> Streben oben, helle glatte Bodenfliesen, lineare Deckenleuchten).

> 📋 **Stil-Vorlage:** Die fett markierten Stil-Zeilen in jedem Prompt stammen aus `docs/00_stil-vorlage.md` — nie weglassen, damit alle Bilder zusammenpassen.

```
In the exact style of a LucasArts adventure game background:

Interior of a modern German school entrance foyer, just behind the cafeteria's
back door — based exactly on the attached reference photo. Match the architecture:
- A tall floor-to-ceiling glass window front on the left, with green trees
  visible outside through the glass
- A dark weathered-steel cuboid structure in the center-right with a dark
  archway/passage cut through it (the back-of-house service box)
- A first-floor balcony/gallery running along the top with vertical metal
  slats as a railing
- Polished light-grey concrete floor, small dark metal bench against the
  side wall
- Modern ceiling with long linear LED strip lights and round recessed spotlights

The space is empty of zombies — Alex just barely made it through and slammed
the door shut. Signs of the struggle: one overturned cafeteria tray on the
floor, a single plastic plate cracked near the door, faint dirty handprints
smeared on the glass window. Subtle scuff marks. No people visible.

STYLE: Stylized painterly cartoon illustration, slightly brushy textures, high contrast,
clear silhouettes, dark but vibrant palette — dominated by mossy greens, moody greys,
warm amber accents. Inspired by LucasArts adventure game backgrounds, Tim Burton,
Goosebumps book covers, Hotel Transylvania. Spooky but kid-friendly (age 10–14).

ATMOSPHERE: Sickly yellow-green daylight coming in through the large glass front
under an overcast sky. Long diagonal shadows across the polished floor from the
window frames. Dust motes drifting in the light. A single leaf blown in through
the door. Eerie silence, the aftermath — but a moment of relief.

TECHNICAL: 16:9 aspect ratio, 1280x720 resolution, same camera angle as the
reference photo (eye-level, looking into the foyer from roughly where the
cafeteria door would be), sharp focus on the metal cuboid and glass front,
slight atmospheric depth-of-field in the background.
No text, no speech bubbles, no UI overlays, no watermarks. No gore.
```

<details>
<summary>📖 Deutsche Übersetzung zum Verstehen (nicht in Gemini eingeben!)</summary>

```
Im exakten Stil eines LucasArts-Adventure-Hintergrundbilds:

Innenraum eines modernen deutschen Schul-Eingangsfoyers, direkt hinter der
Hintertür der Mensa — genau nach dem beigefügten Referenzfoto. Architektur
übernehmen:
- Eine raumhohe Glasfassade links, dahinter sind grüne Bäume durch das
  Glas sichtbar
- Eine dunkle, verwitterte Stahlquader-Konstruktion rechts in der Bildmitte
  mit einem dunklen Durchgang/Tor mittendurch (der Service-Block)
- Eine Galerie/Brüstung im ersten Stock, die oben entlangläuft, mit vertikalen
  Metallstreben als Geländer
- Polierter hellgrauer Betonboden, kleine dunkle Metallbank an der Seitenwand
- Moderne Decke mit langen linearen LED-Streifen und runden Einbauspots

Der Raum ist leer von Zombies — Alex hat es gerade noch durchgeschafft und
die Tür zugeschlagen. Spuren des Kampfes: ein umgekipptes Tablett auf dem
Boden, ein einzelner zerbrochener Plastikteller nahe der Tür, schwache
schmutzige Handabdrücke auf der Glasscheibe. Leichte Schrammen. Keine
Personen sichtbar.

STIL: Stilisierte malerische Cartoon-Illustration, leicht pinselige
Texturen, hoher Kontrast, klare Silhouetten, dunkle aber kräftige Palette
— dominiert von moosigen Grüntönen, düsteren Grautönen, warmen
Bernstein-Akzenten. Inspiriert von LucasArts-Adventure-Hintergrundbildern,
Tim Burton, Goosebumps-Buchcovern, Hotel Transylvania. Gruselig, aber
kindgerecht (Alter 10–14).

ATMOSPHÄRE: Krankhaft gelb-grünes Tageslicht, das durch die große
Glasfront unter einem bewölkten Himmel hereinfällt. Lange diagonale
Schatten quer über den polierten Boden von den Fensterrahmen. Staubpartikel
treiben im Licht. Ein einzelnes Blatt, durch die Tür hereingeweht.
Unheimliche Stille, das Nachher — aber ein Moment der Erleichterung.

TECHNISCH: 16:9-Seitenverhältnis, 1280x720 Auflösung, gleicher Kamerawinkel
wie im Referenzfoto (Augenhöhe, in das Foyer blickend von dort, wo
ungefähr die Mensa-Tür sein müsste), scharfer Fokus auf den Metallquader
und die Glasfront, leichte atmosphärische Tiefenunschärfe im Hintergrund.
Kein Text, keine Sprechblasen, keine UI-Overlays, keine Wasserzeichen.
Keine Gewaltdarstellung.
```

</details>

Speichere als `game/02_mensa/assets/mensa_sieg.png`.

Falls das Bild in der Siegszene noch nicht angezeigt wird, lass Claude Code das übernehmen:
```
In game/scenes.js bei der Szene "mensa_sieg":
Setze das image-Feld auf "02_mensa/assets/mensa_sieg.png".
```

---

## 2.4 🎙️ Sieg-Ton mit ElevenLabs

Nach gewonnenem Minispiel soll ein Abschluss-Text gesprochen werden. Wieder **Model = v3** einstellen und die Stimme **„Commander Brake – Strict & Dominant"** auf [elevenlabs.io](https://elevenlabs.io) wählen. Der Text ist schon mit Audio-Tags versehen — kopier ihn 1:1 rein:

```
[shouting] [panicked] Schnell raus hier! [gasp] Die Mensa ist verloren!
[pause] [breathing heavily] [whispering] Aber du lebst noch. Und vielleicht kann man sich in einem Kassenraum verstecken.
```

Speichere als `game/02_mensa/assets/mensa_voice_sieg.mp3`.

Dann lass Claude Code den Ton einbauen:
```
In game/scenes.js bei der Szene "mensa_sieg":
Füge ein audio-Feld hinzu mit Wert "02_mensa/assets/mensa_voice_sieg.mp3".
```
