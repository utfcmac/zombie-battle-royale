# Station 05 – Basketballplatz (Minispiel: Basketball-Ausweichen)

**Deine Aufgabe:** Ton hinzufügen, Siegesbild generieren — das Minispiel selbst ist bereits fertig und spielbar.

> ✅ **Bereits vorhanden:**
> - Startbild: [`game/05_basketballplatz/assets/basketballplatz_intro.png`](../../game/05_basketballplatz/assets/basketballplatz_intro.png)
> - Kampf-Hintergrundbild: [`game/05_basketballplatz/assets/basketballplatz_kampf.png`](../../game/05_basketballplatz/assets/basketballplatz_kampf.png)
> - Das Minispiel selbst: `game/05_basketballplatz/basketball.js` — **Referenzimplementierung** für alle anderen Stationen!

---

## 5.1 🎙️ Startbildschirm-Sound mit ElevenLabs

Geh auf [elevenlabs.io](https://elevenlabs.io), stelle **Model = v3** ein, wähle die Stimme **„Commander Brake – Strict & Dominant"** und kopier diesen Text 1:1 rein:

```
[breathing heavily] Der Basketballplatz. Eingezäunt — überall Zombies am Zaun.
[pause] [determined] Aber das Dach. Mit dem Seil komm ich da rauf.
[pause] [panicked] Der Sportlehrer! Er hat mich gesehen!
```

Speichere als `game/05_basketballplatz/assets/basketball_voice_intro.mp3`.

Dann lass Claude Code den Ton einbauen:
```
In game/scenes.js bei der Szene "basketballplatz":
Füge ein audio-Feld hinzu mit Wert "05_basketballplatz/assets/basketball_voice_intro.mp3".
Die Engine spielt das Audio dann automatisch beim ersten Aufruf ab und zeigt
einen Lautsprecher-Button neben dem Text.
```

---

## 5.2 🤖 Minispiel anpassen mit Claude Code (optional)

Das Minispiel ist fertig — aber falls du es schwieriger machen willst:

```
In game/05_basketballplatz/basketball.js:
Mache das Minispiel schwieriger:
- Ab Sekunde 15 soll der Zombie-Sportlehrer zwei Bälle gleichzeitig werfen (mit 200ms Versatz).
- Ab Sekunde 25 sollen die Bälle 30% schneller fliegen.
- Füge einen sichtbaren Countdown-Timer im Minispiel ein (großer Text oben in der Mitte, zählt von 30 runter).
Ändere nichts am Muster der Funktion startBasketballAusweichen(onWin, onLose).
```

---

## 5.3 🎨 Siegesbild mit Gemini generieren

> 📸 **Referenzfoto:** [`docs/05_basketballplatz/basketballplatz.jpeg`](basketballplatz.jpeg) — der echte überdachte Schulbasketballplatz: geschwungene Holzträger mit weißen Membranpaneelen als Dach, Gitterzaun-Seiten, roter Gummibelag mit Linien, weiße Stahlpfosten, Bäume dahinter. **Lade es mit in Gemini hoch.**

> 📋 **Stil-Vorlage:** aus `docs/00_stil-vorlage.md` — immer ans Ende des Prompts, nie weglassen.

```
In the exact style of a LucasArts adventure game background:

Interior of a covered outdoor school basketball court during a zombie apocalypse —
based exactly on the attached reference photo. Match the architecture:
- Curved wooden roof beams with white stretched fabric membrane panels between them
- Chain-link fence walls on all sides, white steel pillars
- Red rubber sports floor with court line markings
- Trees and sky faintly visible through the fence and gaps in the roof

The zombie PE teacher has just been defeated — he lies slumped on the court floor below.
A climbing rope hangs from one of the curved roof beams, swaying slightly — just used.
Alex has made it up onto the roof structure: he sits on one of the broad curved wooden
beams near the top, looking out. No rope hole needed — the beam itself is the vantage point.

Outside the chain-link fence on every side: a dense, pressing horde of zombies,
silhouetted and grasping at the mesh. Inside the court — completely empty. Safe.

STYLE: Stylized painterly cartoon illustration, slightly brushy textures, high contrast,
clear silhouettes, dark but vibrant palette — dominated by mossy greens, moody greys,
warm amber accents. Inspired by LucasArts adventure game backgrounds, Tim Burton,
Goosebumps book covers, Hotel Transylvania. Spooky but kid-friendly (age 10–14).

ATMOSPHERE: Overcast sky with a sickly yellow-green tint visible through the fabric
panels above. Long diagonal shadows from the roof beams across the empty court below.
Low ground fog drifting along the fence line outside. Zombie silhouettes fill the
perimeter — hundreds of them, pressing, clawing — but none can get in.
A strange, eerie silence inside. One moment of unlikely safety.

TECHNICAL: 16:9 aspect ratio, 1280x720 resolution, view from slightly above court level
looking across the court and out through the fence, sharp focus on the rope, the beam
Alex sits on, and the zombie-filled fence perimeter, slight atmospheric depth-of-field
on the far background.
No text, no speech bubbles, no UI overlays, no watermarks. No gore.
```

<details>
<summary>📖 Deutsche Übersetzung zum Verstehen (nicht in Gemini eingeben!)</summary>

```
Im exakten Stil eines LucasArts-Adventure-Hintergrundbilds:

Innenraum eines überdachten Schulbasketballplatzes während einer Zombie-Apokalypse —
genau nach dem beigefügten Referenzfoto. Architektur übernehmen:
- Geschwungene Holzträger mit weißen gespannten Membranpaneelen als Dach
- Gitterzaun-Wände an allen Seiten, weiße Stahlpfosten
- Roter Gummibelag mit Spielfeldlinien
- Bäume und Himmel schwach durch Zaun und Dachöffnungen sichtbar

Der Zombie-Sportlehrer wurde gerade besiegt — er liegt zusammengesunken auf dem
Hallenboden. Ein Kletterseil hängt von einem der geschwungenen Dachträger, leicht
schaukelnd — gerade erst benutzt. Alex hat es auf die Dachkonstruktion geschafft:
er sitzt auf einem der breiten geschwungenen Holzträger oben, schaut hinaus.
Kein Loch im Dach nötig — der Träger selbst ist der Aussichtspunkt.

Draußen am Gitterzaun auf allen Seiten: eine dichte, drängende Zombie-Horde,
silhouettiert und greifend ans Maschendraht. Im Platz selbst — komplett leer. Sicher.

STIL: Stilisierte malerische Cartoon-Illustration, leicht pinselige Texturen,
hoher Kontrast, klare Silhouetten, dunkle aber kräftige Palette — dominiert von
moosigen Grüntönen, düsteren Grautönen, warmen Bernstein-Akzenten.

ATMOSPHÄRE: Bedeckter Himmel mit krankhaft gelbgrünem Ton durch die Membranpaneele.
Lange diagonale Schatten der Dachträger auf dem leeren Platz unten. Bodennaher Nebel
entlang der Zaunlinie draußen. Zombie-Silhouetten füllen den gesamten Zaun — Hunderte,
drängend, kratzend — aber keiner kommt rein. Gespenstische Stille im Inneren.
Ein Moment unwahrscheinlicher Sicherheit.

TECHNISCH: 16:9-Seitenverhältnis, 1280x720 Auflösung, Blick von leicht oberhalb
des Bodens quer über den Platz und durch den Zaun, scharfer Fokus auf das Seil,
den Träger auf dem Alex sitzt, und die zombie-gefüllte Zaunlinie, leichte
atmosphärische Tiefenunschärfe im fernen Hintergrund.
Kein Text, keine Sprechblasen, keine UI-Overlays, keine Wasserzeichen.
Keine Gewaltdarstellung.
```

</details>

Speichere als `game/05_basketballplatz/assets/basketballplatz_sieg.png`.

Dann lass Claude Code das Bild einbauen:
```
In game/scenes.js bei der Szene "basketballplatz_sieg":
Setze das image-Feld auf "05_basketballplatz/assets/basketballplatz_sieg.png".
```

---

## 5.4 🎺 Trillerpfeife des Sportlehrers — Item-Belohnung einbauen

Nach dem Sieg liegt die Pfeife des Zombie-Sportlehrers auf dem Boden. Alex nimmt sie mit — sie wird später auf dem Dach gebraucht, um den Hubschrauber herbeizurufen.

Das Item ist bereits im Spiel definiert. Lass Claude Code es verteilen:

```
In game/scenes.js bei der Szene "basketballplatz_sieg":
Füge in onEnter folgendes ein (falls noch nicht vorhanden):
  if (!hasItem("trillerpfeife")) {
      addItem(ITEMS.trillerpfeife);
      toast("📯 Trillerpfeife des Sportlehrers eingesteckt!");
  }

Die Trillerpfeife ist bereits in game/items.js definiert.
Sie erscheint im Inventar und schaltet auf dem Dach den Button
"📯 Trillerpfeife einsetzen — Hilfe rufen!" frei.
```

---

## 5.5 🎙️ Sieg-Ton mit ElevenLabs

Wieder **Model = v3** und Stimme **„Commander Brake – Strict & Dominant"**:

```
[sighs] [breathing heavily] Er liegt. Der Platz gehört mir.
[pause] [determined] Das Seil — ans Dach. Jetzt.
[pause] [whispering] Da oben... kein einziger. Nur die Horde draußen am Zaun.
```

Speichere als `game/05_basketballplatz/assets/basketball_voice_sieg.mp3`.

Dann lass Claude Code den Ton einbauen:
```
In game/scenes.js bei der Szene "basketballplatz_sieg":
Füge ein audio-Feld hinzu mit Wert "05_basketballplatz/assets/basketball_voice_sieg.mp3".
```
