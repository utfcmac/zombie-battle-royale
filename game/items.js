// Alle sammelbaren Items.
// Neue Items hier eintragen. passive = Bonus im Hintergrund, !passive = per Taste 1–9 benutzbar.

const ITEMS = {
    baseballschlaeger: {
        id: "baseballschlaeger",
        name: "Baseballschläger",
        icon: "🏏",
        passive: true,
        description: "+3 Bonus im Würfelkampf."
    },
    verbandskasten: {
        id: "verbandskasten",
        name: "Verbandskasten",
        icon: "🩹",
        passive: false,
        description: "Heilt 1 Herz.",
        use: () => {
            if (gameState.hearts >= gameState.maxHearts) {
                toast("Schon volle Herzen!");
                return false;
            }
            gameState.hearts++;
            toast("+1 ❤️ geheilt!");
            return true;
        }
    }
};
