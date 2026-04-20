// Minispiel: Labyrinth-Flucht (TODO)
//
// Konzept: 16×9 Grid à 80×80 px auf dem Kampf-Bild als Hintergrund.
// Spieler startet unten links, Zieltür oben rechts. 3–5 Zombies patrouillieren
// auf festen Routen, alle ~0,8 s einen Schritt. Kollision = -1 ❤️ + Reset zum Start.
// Zeitlimit 30 s. Steuerung WASD (ein Feld pro Tastendruck).
//
// UI-Idee: SVG-Grid overlay, Spieler und Zombies als Emoji-Sprites auf Tile-Positionen.
// Items: "Buch der Überlebenden" zeigt 3 s lang Zombie-Routen, Basketball wirft
// Ablenkung.
//
// Pattern siehe basketball.js.

function startLabyrinth(onWin, onLose) {
    console.warn("Labyrinth noch nicht implementiert — simuliere Sieg.");
    toast("Labyrinth TODO (Auto-Sieg)");
    setTimeout(() => onWin && onWin(), 600);
}
