// Minispiel: Würfel-Duell (TODO)
//
// Konzept: klassischer D20-Wurf des Spielers (+ passive Item-Boni wie
// Baseballschläger +3) vs. D20-Wurf des Feinds. Höherer Wurf gewinnt,
// Gleichstand = nochmal. Niederlage = -1 ❤️.
//
// UI-Idee: zwei große Würfel-Kästen nebeneinander, animierter Würfel-Roll
// (ca. 1 s), Ergebnis + Boni prominent, dann Winner-Flash.
//
// Pattern siehe basketball.js.

function startWuerfelKampf(onWin, onLose) {
    console.warn("Würfelkampf noch nicht implementiert — simuliere Sieg.");
    toast("Würfelkampf TODO (Auto-Sieg)");
    setTimeout(() => onWin && onWin(), 600);
}
