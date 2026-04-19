// Minispiel: Bomben-Timing (TODO)
//
// Konzept: Horizontaler Fortschrittsbalken mit schmalem grünen "Sweet-Spot"-Bereich.
// Ein Zeiger läuft hin und her. Klick im grünen Bereich = Bombe scharf,
// Chemieraum explodiert, Zombies weg. Daneben = Bombe geht nach hinten los,
// -1 ❤️. Drei Phasen hintereinander, jede mit kleinerem Sweet-Spot.
//
// UI-Idee: dicker horizontaler Balken, grüne Zone, dunkler Zeiger, Space oder Maus.
//
// Pattern siehe basketball.js.

function startBombenTiming(onWin, onLose) {
    console.warn("Bomben-Timing noch nicht implementiert — simuliere Sieg.");
    toast("Bomben-Timing TODO (Auto-Sieg)");
    setTimeout(() => onWin && onWin(), 600);
}
