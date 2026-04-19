// Minispiel: Stealth-Schleichen (TODO)
//
// Konzept: Top-down-View auf die Bibliothek. Zombies schlafen zwischen
// Regalen, haben aber Sichtkegel (z. B. 3 Felder geradeaus). Spieler muss
// zum leuchtenden Buch in der Mitte schleichen und zurück zur Tür, ohne
// je in einen Sichtkegel zu laufen. Zombies wachen hin und wieder auf und
// rotieren ihre Blickrichtung.
//
// UI-Idee: Grid-basiert (ähnlich labyrinth), Sichtkegel als halbtransparente
// Polygone. WASD für 1-Feld-Schritte. Erfolg = Buch eingesammelt und retour.
//
// Pattern siehe basketball.js.

function startStealth(onWin, onLose) {
    console.warn("Stealth noch nicht implementiert — simuliere Sieg.");
    toast("Stealth TODO (Auto-Sieg)");
    setTimeout(() => onWin && onWin(), 600);
}
