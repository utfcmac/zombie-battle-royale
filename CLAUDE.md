# CLAUDE.md — Zombie Battle Royale

## Wer baut dieses Spiel?

Dieses Projekt wird von **Schülerinnen und Schülern (ca. 13 Jahre)** in einem Workshop gebaut.
Sie haben wenig oder keine Programmiererfahrung. Du bist ihr KI-Assistent.

**Deine Aufgabe als Claude Code:**
- Erklärungen kurz und einfach halten — kein Fachjargon, kein "wie du sicher weißt…"
- Immer zeigen, *wo genau* etwas eingetragen wird (Dateiname + Kontext)
- Keine Frameworks vorschlagen, nichts umstrukturieren — alles bleibt Vanilla JS
- Änderungen klein und nachvollziehbar halten
- Wenn etwas nicht klappt: konkrete nächste Schritte nennen, nicht nur "überprüfe den Code"
- Erfolge feiern 🎉 — ein funktionierender Ton oder ein neues Bild ist für die Schüler ein Highlight

---

## Was ist dieses Projekt?

Ein **Browser-Adventure-Game** über eine Zombie-Apokalypse in einer echten Schule.
Kein Framework, kein Build-Step — alles läuft mit `game/index.html` direkt im Browser.

**Spielfluss:**
```
Schulhof → Mensa → Klassenraum → Turnhalle → Basketballplatz → Dach → Hubschrauber
```

Jede Station hat:
- Ein **Startbild** (von Gemini generiert, LucasArts-Stil)
- Einen **Einleitungstext** mit Sprachausgabe (ElevenLabs v3)
- Ein **Minispiel** (Vanilla JS, läuft in `#combat-area`)
- Ein **Siegesbild** + Sieg-Ton

---

## Projektstruktur

```
game/
  index.html          — Startet alles, lädt Scripts in der richtigen Reihenfolge
  engine.js           — Kern-Engine: Szenen, Audio, Herzen, Inventar, Timer, HUD
  scenes.js           — Alle Szenen als JS-Objekte (Szenen-Graph)
  items.js            — Alle sammelbaren Items
  style.css           — Das gesamte CSS

  01_schulhof/assets/ — Bilder & Sounds für Station 01
  02_mensa/
    assets/           — Bilder & Sounds
    teller.js         — Minispiel: Teller werfen
  03_klassenraum/
    assets/
    labyrinth.js      — Minispiel: Labyrinth-Flucht
  04_turnhalle/
    assets/
    seilklettern.js   — Minispiel: Seil hochklettern (TODO — von Schülern zu bauen)
  05_basketballplatz/
    assets/
    basketball.js     — Minispiel: Bällen ausweichen ✅ REFERENZIMPLEMENTIERUNG
  06_dach/
    assets/           — dach.png, hubschrauber.png, dach_ende.mp4 (sobald generiert)

docs/
  01_schulhof/aufgabe.md   — Aufgabenblatt Station 01
  02_mensa/aufgabe.md      — Aufgabenblatt Station 02
  ...
  06_dach/aufgabe.md       — Aufgabenblatt Station 06
  00_stil-vorlage.md       — Gemini-Stil-Vorlage (immer ans Ende jedes Bild-Prompts)
```

---

## Wie eine Szene aufgebaut ist (`scenes.js`)

```js
meineSzene: {
    id: "meineSzene",
    image: "02_mensa/assets/mensa_intro.png",   // Hintergrundbild
    video: "06_dach/assets/dach_ende.mp4",       // ODER Video statt Bild (Endszene)
    audio: "02_mensa/assets/mensa_voice_intro.mp3", // Wird beim ersten Besuch auto-abgespielt
    startOverlay: true,                           // Zeigt "Spiel starten"-Button (nur Startszene)
    text: "Der Text, der im Textfeld erscheint.",
    onEnter: () => {
        // Wird beim Betreten der Szene ausgeführt
        addItem(ITEMS.schokoriegel);
        toast("🍫 Schokoriegel eingesteckt!");
    },
    choices: [
        { label: "Weiter",        target: "naechsteSzene" },
        { label: "Minispiel!",    onSelect: () => startMeinMinispiel(onWin, onLose) },
        { label: "Nur mit Item",  target: "ziel", condition: () => hasItem("seil") }
    ]
}
```

**Wichtig:** `condition` zeigt den Button ausgegraut, wenn die Bedingung nicht erfüllt ist.

---

## Engine-Funktionen (globale Helfer für Minispiele)

| Funktion | Was sie tut |
|---|---|
| `showScene("id")` | Wechselt zur Szene mit dieser ID |
| `loseHeart(1)` | Zieht 1 Herz ab; bei 0 → Game Over |
| `addItem(ITEMS.seil)` | Fügt Item ins Inventar |
| `hasItem("seil")` | Gibt `true` zurück wenn Item im Inventar |
| `removeItem("seil")` | Entfernt Item aus Inventar |
| `toast("Text")` | Zeigt kurze Benachrichtigung oben |
| `renderHUD()` | Aktualisiert Herzen, Timer, Zombie-Zähler |
| `startSceneTimer(30, onExpire)` | Startet 30-Sekunden-Countdown, ruft onExpire() auf |
| `stopTimer()` / `clearSceneTimer()` | Stoppt den Timer |
| `renderSceneImage("pfad/bild.png")` | Zeigt ein Bild im Szenen-Bereich (für Minispiele) |

---

## Wie ein Minispiel aufgebaut ist

Alle Minispiele folgen demselben Muster — **`game/05_basketballplatz/basketball.js` ist die Referenz**.

```js
function startMeinMinispiel(onWin, onLose) {
    const area = document.getElementById("combat-area");
    area.classList.remove("hidden");
    area.innerHTML = "";

    // Hintergrundbild setzen:
    renderSceneImage("02_mensa/assets/mensa_kampf.png");

    // Spielobjekte erstellen (div-Elemente in area)...

    // Tastatur-Listener registrieren:
    function onKey(e) { /* ... */ }
    document.addEventListener("keydown", onKey);

    // Game-Loop:
    let rafId = requestAnimationFrame(loop);
    function loop() {
        if (/* verloren */) return cleanup(false);
        if (/* gewonnen */) return cleanup(true);
        rafId = requestAnimationFrame(loop);
    }

    // Cleanup — IMMER am Ende aufräumen:
    function cleanup(won) {
        cancelAnimationFrame(rafId);
        document.removeEventListener("keydown", onKey);
        area.classList.add("hidden");
        area.innerHTML = "";
        if (won) onWin(); else onLose();
    }
}
```

**`#combat-area` ist 1280×720px, position: relative** — alle Spielobjekte werden mit `position: absolute` darin platziert.

---

## Items (`items.js`)

| Item | Icon | Typ | Wo gefunden |
|---|---|---|---|
| `baseballschlaeger` | 🏏 | passiv | Schulhof (Start) |
| `schokoriegel` | 🍫 | aktiv (heilt 1 ❤️) | Mensa-Sieg |
| `verbandskasten` | 🩹 | aktiv (heilt 1 ❤️) | Klassenraum-Sieg |
| `seil` | 🪢 | passiv | Turnhalle-Sieg |
| `trillerpfeife` | 📯 | passiv (Key-Item) | Basketballplatz-Sieg |

Neue Items in `items.js` eintragen, dann in `scenes.js` per `addItem(ITEMS.xyz)` verteilen.

---

## Audio-System

- Feld `audio: "pfad/datei.mp3"` in der Szene → Engine spielt beim **ersten Besuch** automatisch ab
- Lautsprecher-Button 🔊 erscheint neben dem Text → zum erneuten Abspielen / Stoppen
- `startOverlay: true` → erst „Spiel starten"-Klick, dann Audio (wichtig für Browsersperren)
- ElevenLabs v3 mit Stimme „Commander Brake – Strict & Dominant" — Audio-Tags wie `[whispering]`, `[panicked]`, `[shouting]`, `[pause]`, `[sighs]`, `[breathing heavily]`

---

## Szenen-IDs — Übersicht

| ID | Beschreibung |
|---|---|
| `start` | Schulhof — Anfang |
| `mensa_intro` / `mensa_sieg` / `mensa_fail` | Mensa |
| `klassenraum_intro` / `klassenraum_sieg` / `klassenraum_fail` | Klassenraum |
| `turnhalle_intro` / `turnhalle_sieg` / `turnhalle_fail` | Turnhalle |
| `basketballplatz` / `basketballplatz_sieg` / `basketballplatz_fail` | Basketballplatz |
| `dach` | Dach — leer, Trillerpfeife-Wahl |
| `dach_hubschrauber` | Dach — Hubschrauber erscheint |
| `dach_abflug` | Endszene — Video, Abflug |

---

## Häufige Schüler-Aufgaben

**Ton einbauen:**
```js
// In scenes.js bei der gewünschten Szene:
audio: "02_mensa/assets/mensa_voice_intro.mp3",
```

**Bild einbauen:**
```js
// In scenes.js bei der gewünschten Szene:
image: "02_mensa/assets/mensa_intro.png",
```

**Item beim Sieg vergeben:**
```js
onEnter: () => {
    if (!hasItem("verbandskasten")) {
        addItem(ITEMS.verbandskasten);
        toast("🩹 Verbandskasten gefunden!");
    }
}
```

**Minispiel in Szene einbinden:**
```js
// In scenes.js choices:
{
    label: "🍽️ Teller schmeißen!",
    onSelect: () => startTellerWerfen(
        () => showScene("mensa_sieg"),
        () => showScene("mensa_fail")
    )
}
// In index.html vor scenes.js:
<script src="02_mensa/teller.js"></script>
```

---

## Was NICHT verändert werden sollte

- Die Struktur von `engine.js` — nur ergänzen, nicht umbauen
- Die Load-Reihenfolge in `index.html` (Items → Minispiele → scenes.js → engine.js)
- Das `gameState`-Objekt direkt von außen manipulieren — immer die Helfer-Funktionen nutzen
