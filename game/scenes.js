// Szenen-Graph. Jede Szene:
//   id, image, text, onEnter?, choices[]
// Choice: { label, target?, onSelect?, condition? }
// Ein Minispiel starten: in onSelect `start<Name>(onWin, onLose)` aufrufen.
//
// Ablauf: Schulhof → Mensa → Klassenraum → Turnhalle → Basketballplatz → Dach.
// Noch nicht gebaute Minispiele nutzen `placeholderMinigame(...)` → Auto-Sieg.

function placeholderMinigame(title, onWin) {
    toast(`${title} — Minispiel TODO (Auto-Sieg)`);
    setTimeout(() => onWin && onWin(), 600);
}

const SCENES = {
    // ---------- Schulhof (Start) ----------
    start: {
        id: "start",
        image: "01_schulhof/assets/pausenhof.png",
        text: "Ein ganz normaler Schultag — bis der erste Schrei durch den Flur hallt.\n\nInnerhalb von Minuten ist die Schule voll. Überall stolpern Zombies herum — der Mathe-Lehrer, der Hausmeister, sogar deine Banknachbarin. Du rennst auf den Schulhof. Dein Baseballschläger liegt im Gebüsch, zum Glück!\n\nDie Mensa hat solide Türen. Vielleicht ein Zufluchtsort.",
        onEnter: () => {
            if (!hasItem("baseballschlaeger")) {
                addItem(ITEMS.baseballschlaeger);
                toast("🏏 Baseballschläger eingesteckt");
            }
        },
        choices: [
            { label: "Zur Mensa — Türen verriegeln!", target: "mensa_intro" }
        ]
    },

    // ---------- Mensa (Minispiel: Teller werfen) ----------
    mensa_intro: {
        id: "mensa_intro",
        image: "02_mensa/assets/mensa_intro.png",
        text: "Die Mensatüren stehen offen. Drinnen — überall Zombies. Zwischen den Tischen, hinter der Ausgabe, auf den Bänken. Kein Zufluchtsort. Kein Durchkommen.\n\nAber ein Stapel Plastikteller liegt griffbereit. Wenn du die Meute zurückdrängst, kommst du vielleicht zur Hintertür.\n\n(Minispiel: Teller werfen auf Zombies, die von der Ausgabe nach unten laufen.)",
        choices: [
            {
                label: "🍽️ Teller schmeißen und durch!",
                onSelect: () => placeholderMinigame(
                    "Teller werfen",
                    () => showScene("mensa_sieg")
                )
            },
            { label: "Zurück auf den Schulhof", target: "start" }
        ]
    },
    mensa_sieg: {
        id: "mensa_sieg",
        image: "02_mensa/assets/mensa_kampf.png",
        text: "Du holzt dich durch bis zur Hintertür und drückst sie zu. Die Mensa ist verloren — kein Zufluchtsort mehr.\n\nAber durch den Flur dahinter: ein offenes Klassenzimmer. Türe auf, reinschlüpfen, Türe zu. Erst mal Luft holen.",
        onEnter: () => {
            gameState.zombiesKilled = (gameState.zombiesKilled || 0) + 1;
            gameState.zombiesRemaining = Math.max(0, gameState.zombiesRemaining - 1);
            if (!hasItem("schokoriegel")) {
                addItem(ITEMS.schokoriegel);
                toast("🍫 Schokoriegel eingesteckt!");
            }
        },
        choices: [
            { label: "In den Klassenraum schleichen", target: "klassenraum_intro" }
        ]
    },
    mensa_fail: {
        id: "mensa_fail",
        image: "02_mensa/assets/mensa_kampf.png",
        text: "Zu viele. Die Teller gehen aus, die Zombies nicht. Du prallst zurück auf den Schulhof.",
        choices: [
            { label: "Nochmal versuchen", target: "mensa_intro" }
        ]
    },

    // ---------- Klassenraum (Minispiel: Labyrinth) ----------
    klassenraum_intro: {
        id: "klassenraum_intro",
        image: "03_klassenraum/assets/klassenraum_kampf.png",
        text: "Du drückst dich unter einen umgekippten Tisch. Stille — fast.\n\nDann Schritte im Flur. Sie haben dich aufgespürt. Die Tür fliegt auf, Zombies strömen rein, zwischen Tischen und Rucksäcken. Die Hintertür ist dein einziger Ausweg — und sie ist auf der anderen Seite des Raums.\n\n(Minispiel: Top-down — durch das Tisch-Labyrinth zur Hintertür, ohne erwischt zu werden.)",
        choices: [
            {
                label: "🧭 Durchs Chaos zur Hintertür!",
                onSelect: () => {
                    startLabyrinth(
                        () => showScene("klassenraum_sieg"),
                        () => showScene("klassenraum_fail")
                    );
                }
            },
            { label: "Zurück in die Mensa", target: "mensa_sieg" }
        ]
    },
    klassenraum_sieg: {
        id: "klassenraum_sieg",
        image: "03_klassenraum/assets/klassenraum_kampf.png",
        text: "Letzte Lücke — du schlüpfst durch und wirfst die Brandschutztür ins Schloss. Dahinter: die Turnhalle.\n\nKletterseile. Wenn du auf ein Dach kommst, bist du weg von hier.",
        onEnter: () => {
            gameState.zombiesKilled = (gameState.zombiesKilled || 0) + 1;
            gameState.zombiesRemaining = Math.max(0, gameState.zombiesRemaining - 1);
            if (!hasItem("verbandskasten")) {
                addItem(ITEMS.verbandskasten);
                toast("🩹 Verbandskasten gefunden!");
            }
        },
        choices: [
            { label: "In die Turnhalle — Seil holen!", target: "turnhalle_intro" }
        ]
    },
    klassenraum_fail: {
        id: "klassenraum_fail",
        image: "03_klassenraum/assets/klassenraum_kampf.png",
        text: "Ein Zombie kriegt dich am Ärmel zu fassen. Du reißt dich los und krabbelst zurück unter den Tisch.",
        choices: [
            { label: "Nochmal versuchen", target: "klassenraum_intro" }
        ]
    },

    // ---------- Turnhalle (Minispiel: Seilklettern) ----------
    turnhalle_intro: {
        id: "turnhalle_intro",
        image: "04_turnhalle/assets/turnhalle_kampf.png",
        text: "Die Turnhalle. Kletterseile hängen von der Decke — genau das, was du brauchst. Aber ein paar Zombies sind schon drin, und Medizinbälle rollen rum.\n\nHoch ans Seil, raus über die Dachluke. Schnell.\n\n(Minispiel: Seil hochklettern, herabfliegenden Gegenständen ausweichen.)",
        choices: [
            {
                label: "🪢 Ans Seil und hoch!",
                onSelect: () => placeholderMinigame(
                    "Seilklettern",
                    () => showScene("turnhalle_sieg")
                )
            },
            { label: "Zurück zum Klassenraum", target: "klassenraum_sieg" }
        ]
    },
    turnhalle_sieg: {
        id: "turnhalle_sieg",
        image: "04_turnhalle/assets/turnhalle_kampf.png",
        text: "Oben — aber das Turnhallendach endet im Nichts. Kein Nachbargebäude, kein Vorsprung. Nur Luft.\n\nWenigstens hast du ein Seil mitgenommen. Du kletterst am Abflussrohr wieder runter. Mit letzter Kraft: zum Basketballplatz. Der ist eingezäunt, draußen alles voll Zombies. Aber über dem überdachten Bereich — ein Dach. Das ist deine letzte Chance.",
        onEnter: () => {
            if (!hasItem("seil")) {
                addItem(ITEMS.seil);
                toast("🪢 Kletterseil eingesteckt!");
            }
        },
        choices: [
            { label: "Zum Basketballplatz — letzte Chance!", target: "basketballplatz" }
        ]
    },
    turnhalle_fail: {
        id: "turnhalle_fail",
        image: "04_turnhalle/assets/turnhalle_kampf.png",
        text: "Ein Medizinball trifft dich mitten im Aufstieg. Du rutschst am Seil runter — zum Glück auf eine Matte.",
        choices: [
            { label: "Nochmal versuchen", target: "turnhalle_intro" }
        ]
    },

    // ---------- Basketballplatz (Minispiel fertig implementiert) ----------
    basketballplatz: {
        id: "basketballplatz",
        image: "05_basketballplatz/assets/basketballplatz_intro.png",
        text: "Der Basketballplatz — eingezäunt, und draußen wimmelt es von Zombies. Kein Entkommen nach vorne.\n\nAber da: das Dach über dem überdachten Bereich. Mit dem Seil erreichbar — wenn du erst an den Zombie-Sportlehrer vorbeikommst. Der hat die Pfeife um den Hals, den Ball in der Hand, und er hat dich entdeckt.\n\nSteuerung: A / D (oder ← →) zum Ausweichen. Jeder Ball = -1 ❤️. 30 Sekunden durchhalten.",
        choices: [
            {
                label: "🏏 Alles oder nichts — rein!",
                onSelect: () => {
                    startBasketballAusweichen(
                        () => showScene("basketballplatz_sieg"),
                        () => showScene("basketballplatz_fail")
                    );
                }
            },
            { label: "Kurz zurück zur Turnhalle", target: "turnhalle_sieg" }
        ]
    },
    basketballplatz_sieg: {
        id: "basketballplatz_sieg",
        image: "05_basketballplatz/assets/basketballplatz_kampf.png",
        text: "Der Sportlehrer geht zu Boden. Du schnappst dir einen Ständer, wirfst das Seil über den Dachrand — erster Versuch sitzt. Hand über Hand. Du bist oben.",
        onEnter: () => {
            gameState.zombiesKilled = (gameState.zombiesKilled || 0) + 1;
            gameState.zombiesRemaining = Math.max(0, gameState.zombiesRemaining - 1);
            if (!hasItem("trillerpfeife")) {
                addItem(ITEMS.trillerpfeife);
                toast("📯 Trillerpfeife des Sportlehrers eingesteckt!");
            }
        },
        choices: [
            { label: "🏆 Auf das Dach!", target: "dach" }
        ]
    },
    basketballplatz_fail: {
        id: "basketballplatz_fail",
        image: "05_basketballplatz/assets/basketballplatz_kampf.png",
        text: "Der Ball trifft dich voll. Du liegst am Boden, der Sportlehrer grient. Mit letzter Kraft rollst du zur Seite.",
        choices: [
            { label: "Nochmal versuchen", target: "basketballplatz" }
        ]
    },

    // ---------- Dach (Endszene: Hubschrauber) ----------
    // TODO: eigenes Dach-Asset fehlt noch — nutzt vorübergehend basketballplatz_kampf.png.
    dach: {
        id: "dach",
        image: "06_dach/assets/dach.png",
        text: "Das Dach des Basketballplatzes. Unter dir die Horde, aber die kommen hier nicht rauf.\n\nWeit und breit kein Entkommen — außer nach oben. Irgendwo da draußen muss jemand sein.",
        choices: [
            {
                label: "📯 Trillerpfeife einsetzen — Hilfe rufen!",
                condition: () => hasItem("trillerpfeife"),
                target: "dach_hubschrauber"
            },
            { label: "Warten und hoffen…", target: "dach_hubschrauber" }
        ]
    },
    dach_hubschrauber: {
        id: "dach_hubschrauber",
        image: "06_dach/assets/hubschrauber.png",
        text: "In der Ferne — ein Rattern. Ein Hubschrauber! Er kommt näher. Näher. Wirbelt deine Haare. Ein Seil fällt runter.\n\n🎉 Du greifst zu.",
        choices: [
            { label: "Nochmal spielen", target: "start" }
        ]
    }
};
