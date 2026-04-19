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

const SCENES = {
    start: {
        id: "start",
        image: "images/pausenhof.png",
        text: "Du stehst im Pausenhof deiner Schule. Überall stolpern Zombies herum – der Mathe-Lehrer, der Hausmeister, sogar deine Banknachbarin. Dein Baseballschläger liegt im Gebüsch, zum Glück!\n\nWas jetzt?",
        onEnter: () => {
            if (!hasItem("baseballschlaeger")) {
                addItem(ITEMS.baseballschlaeger);
                toast("🏏 Baseballschläger aufgesammelt");
            }
        },
        choices: [
            { label: "Zur Sporthalle rennen", target: "sporthalle" },
            { label: "Erstmal verstecken (Verbandskasten-Dropp testen)", target: "versteck" }
        ]
    },
    sporthalle: {
        id: "sporthalle",
        image: "images/sporthalle.png",
        text: "Du stürmst in die Sporthalle. Der riesige Zombie-Sportlehrer pfeift und wirft Basketbälle nach dir!\n\n(Dummy: hier kommt später der Reaktionskampf.)",
        choices: [
            { label: "Zurück zum Pausenhof", target: "start" }
        ]
    },
    versteck: {
        id: "versteck",
        image: "images/versteck.png",
        text: "Du duckst dich hinter einen Mülleimer. Zwischen alten Pausenbroten findest du... einen Verbandskasten! Praktisch.\n\n(Dummy-Szene zum Testen des Inventar-Systems.)",
        onEnter: () => {
            if (!hasItem("verbandskasten")) {
                addItem(ITEMS.verbandskasten);
                toast("🩹 Verbandskasten gefunden");
            }
        },
        choices: [
            { label: "Zurück zum Pausenhof", target: "start" }
        ]
    }
};
