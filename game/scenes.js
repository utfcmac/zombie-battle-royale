// Szenen-Graph. Jede Szene:
//   id, image, text, onEnter?, choices[]
// Choice: { label, target?, onSelect?, condition? }
// Ein Minispiel starten: in onSelect `start<Name>(onWin, onLose)` aufrufen.

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
            { label: "Rüber zum Basketballplatz", target: "basketballplatz" },
            { label: "Erstmal verstecken (Verbandskasten-Dropp testen)", target: "versteck" }
        ]
    },
    basketballplatz: {
        id: "basketballplatz",
        image: "images/basketballplatz_intro.png",
        text: "Du kommst um die Ecke — da steht er schon auf dem überdachten Basketballplatz. Der Zombie-Sportlehrer. Pfeife um den Hals, Ball in der Hand, und er hat dich entdeckt.\n\nSteuerung: A / D (oder ← →) zum Ausweichen. Jeder Ball = -1 ❤️.\nÜberlebe 30 Sekunden, dann ist er platt.",
        choices: [
            {
                label: "🏏 Los geht's — reingehen!",
                onSelect: () => {
                    startBasketballAusweichen(
                        () => showScene("basketballplatz_sieg"),
                        () => showScene("basketballplatz_fail")
                    );
                }
            },
            { label: "Nee, zurück zum Pausenhof", target: "start" }
        ]
    },
    basketballplatz_sieg: {
        id: "basketballplatz_sieg",
        image: "images/basketballplatz_kampf.png",
        text: "Der letzte Ball geht daneben und knallt in den Zaun. Der Sportlehrer stolpert, verliert den Halt, geht zu Boden. Der Platz gehört dir.\n\n(Platzhalter — später geht's von hier Richtung Dach.)",
        onEnter: () => {
            gameState.zombiesKilled = (gameState.zombiesKilled || 0) + 1;
            gameState.zombiesRemaining = Math.max(0, gameState.zombiesRemaining - 1);
        },
        choices: [
            { label: "Durchatmen. Zurück zum Pausenhof.", target: "start" }
        ]
    },
    basketballplatz_fail: {
        id: "basketballplatz_fail",
        image: "images/basketballplatz_kampf.png",
        text: "Der Ball trifft voll. Du liegst am Boden, der Sportlehrer steht grinsend über dir. In letzter Sekunde krabbelst du unter dem Zaun durch und rennst.\n\n(Platzhalter — du kannst es nochmal probieren.)",
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
