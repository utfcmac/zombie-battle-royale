# Station 01 – Schulhof (Start)

**Deine Aufgabe:** Ankommen, orientieren — und dann den ersten eigenen Ton ins Spiel bringen.

---

## 1.1 🗂️ Projektstruktur kennenlernen

Öffne den Projektordner `zombie-battle-royale` in deinem Editor und schau dir kurz diese Dateien an:

| Datei                      | Was sie macht                                                                       |
|----------------------------|-------------------------------------------------------------------------------------|
| `game/index.html`          | Startet das Spiel, lädt alle Programmteile und Spiele                               |
| `docs/01_schulhof/assets/` | Hier liegt die Beschreibung der Aufgabe und ggf Arbeitsmaterial                     |
| `game/01_schulhof/assets/` | Fertige generierte Bilder und Sounds für diese Station, um sie im Spiel zu benutzen |

Starte das Spiel einmal im Browser — einfach [`game/index.html`](../../game/index.html) öffnen. Du siehst den Schulhof-Bildschirm.

---

## 1.2 🎙️ Ton anhören

Der Sprecher-Intro-Sound ist schon fertig aufgenommen — hör ihn dir kurz an:

> 🔊 [`game/01_schulhof/assets/intro_voice.mp3`](../../game/01_schulhof/assets/intro_voice.mp3)

```
Ein ganz normaler Schultag — bis der erste Schrei durch den Flur hallt.

Innerhalb von Minuten ist die Schule voll. Überall stolpern Zombies herum —
der Mathe-Lehrer, der Hausmeister, sogar deine Banknachbarin. Du rennst auf
den Schulhof. Dein Baseballschläger liegt im Gebüsch, zum Glück!

Die Mensa hat solide Türen. Vielleicht ein Zufluchtsort.
```

---

## 1.3 🤖 Ton einbauen mit Claude Code (KI für Programmierung)

Öffne Claude Code im Projektordner `zombie-battle-royale` und paste diesen Prompt:

```
In der Datei game/scenes.js gibt es eine Szene mit id "start".
Füge dort zwei Felder hinzu:

  audio: "01_schulhof/assets/intro_voice.mp3",
  startOverlay: true,

Das audio-Feld sorgt dafür, dass die Engine den Ton automatisch abspielt
und einen Lautsprecher-Button neben dem Text zeigt.
Das startOverlay-Feld blendet beim ersten Aufruf einen "Spiel starten"-Button
mittig über das Schulhof-Bild — erst beim Klick startet der Ton (notwendig,
damit der Browser den Sound zulässt).
```

Starte das Spiel neu im Browser — beim ersten Öffnen erscheint der Start-Button, Klick startet den Sound. ✅
