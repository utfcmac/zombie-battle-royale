// Minispiel: Labyrinth-Flucht (Klassenraum)
//
// Kachel-Grid 10x7 (128x100 px). Spieler startet oben links, Ziel unten rechts.
// 3 Zombies patrouillieren auf festen Routen. Kollision = -1 ❤️ + Reset zum Start.
// Zeitlimit 30 s über startSceneTimer.
//
// Pattern siehe basketball.js.

function startLabyrinth(onWin, onLose) {
    const COLS = 10, ROWS = 7;
    const TILE_W = 128, TILE_H = 100;
    const KEY_COOLDOWN = 110; // ms zwischen Spieler-Schritten

    const START = { c: 0, r: 0 };
    const EXIT  = { c: 9, r: 6 };

    // Wände (Tische) zufällig verteilen. Start, Ziel und deren direkte Nachbarn
    // bleiben frei; BFS stellt sicher, dass ein Weg existiert.
    const WALL_COUNT = 14;
    const wallSet = generateWalls();
    function isWall(c, r) { return wallSet.has(c + "," + r); }

    function hasPath(walls) {
        const seen = new Set(["0,0"]);
        const q = [[0, 0]];
        while (q.length) {
            const [c, r] = q.shift();
            if (c === EXIT.c && r === EXIT.r) return true;
            for (const [dc, dr] of [[1,0],[-1,0],[0,1],[0,-1]]) {
                const nc = c + dc, nr = r + dr;
                if (nc < 0 || nc >= COLS || nr < 0 || nr >= ROWS) continue;
                const k = nc + "," + nr;
                if (seen.has(k) || walls.has(k)) continue;
                seen.add(k);
                q.push([nc, nr]);
            }
        }
        return false;
    }

    function generateWalls() {
        const forbidden = new Set([
            "0,0", "1,0", "0,1",   // Start + direkte Nachbarn
            "9,6", "8,6", "9,5"    // Ziel + direkte Nachbarn
        ]);
        for (let attempt = 0; attempt < 60; attempt++) {
            const walls = new Set();
            let guard = 0;
            while (walls.size < WALL_COUNT && guard++ < 400) {
                const c = Math.floor(Math.random() * COLS);
                const r = Math.floor(Math.random() * ROWS);
                const key = c + "," + r;
                if (forbidden.has(key)) continue;
                walls.add(key);
            }
            if (hasPath(walls)) return walls;
        }
        // Fallback: altes Muster
        const fallback = new Set();
        for (const r of [1, 3, 5]) for (const c of [1, 3, 5, 7]) fallback.add(c + "," + r);
        return fallback;
    }

    const stage = document.getElementById("stage");
    const combatArea = document.getElementById("combat-area");

    renderSceneImage("03_klassenraum/assets/klassenraum_kampf.png");
    combatArea.innerHTML = `
        <div class="lab-hud">
            <span class="lab-title">🧭 Labyrinth</span>
            <span class="lab-info">WASD / Pfeiltasten — erreiche den grünen Ausgang</span>
        </div>
        <div class="lab-field"></div>
    `;
    combatArea.classList.remove("hidden");
    combatArea.classList.add("lab-combat");
    stage.classList.add("combat-active");

    const field = combatArea.querySelector(".lab-field");
    const boardW = COLS * TILE_W;
    const boardH = ROWS * TILE_H;
    field.style.width = boardW + "px";
    field.style.height = boardH + "px";

    // Wände (Tische) platzieren
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            if (!isWall(c, r)) continue;
            const w = document.createElement("img");
            w.src = "03_klassenraum/assets/tisch.png";
            w.className = "lab-wall";
            w.style.width = TILE_W + "px";
            w.style.height = TILE_H + "px";
            w.style.transform = `translate(${c * TILE_W}px, ${r * TILE_H}px)`;
            field.appendChild(w);
        }
    }

    // Ausgang
    const exitEl = document.createElement("div");
    exitEl.className = "lab-exit";
    exitEl.style.width = TILE_W + "px";
    exitEl.style.height = TILE_H + "px";
    exitEl.style.transform = `translate(${EXIT.c * TILE_W}px, ${EXIT.r * TILE_H}px)`;
    field.appendChild(exitEl);

    // Spieler
    const playerEl = document.createElement("img");
    playerEl.src = "03_klassenraum/assets/ove_von_oben.png";
    playerEl.className = "lab-player";
    playerEl.style.width = TILE_W + "px";
    playerEl.style.height = TILE_H + "px";
    field.appendChild(playerEl);

    // Zombie-Routen: nur freie Zellen entlang der Achse
    function rowRoute(row) {
        const cells = [];
        for (let c = 0; c < COLS; c++) if (!isWall(c, row)) cells.push(c);
        return cells;
    }
    function colRoute(col) {
        const cells = [];
        for (let r = 0; r < ROWS; r++) if (!isWall(col, r)) cells.push(r);
        return cells;
    }

    const zombieDefs = [
        { img: "03_klassenraum/assets/zombie_oben_01.png",
          axis: "row", fixed: 2, route: rowRoute(2),
          startAtEnd: false, dir: 1, stepMs: 900 },
        { img: "03_klassenraum/assets/zombie_oben_02.png",
          axis: "col", fixed: 5, route: colRoute(5),
          startAtEnd: false, dir: 1, stepMs: 1100 },
        { img: "03_klassenraum/assets/zombie_oben_03.png",
          axis: "row", fixed: 5, route: rowRoute(5),
          startAtEnd: false, dir: 1, stepMs: 800 },
        { img: "03_klassenraum/assets/zombie_oben_01.png",
          axis: "row", fixed: 4, route: rowRoute(4),
          startAtEnd: true, dir: -1, stepMs: 1000 }
    ];

    const zombies = [];
    for (const d of zombieDefs) {
        if (d.route.length === 0) continue; // Achse ist komplett dicht — Zombie entfällt
        const idx = d.startAtEnd ? d.route.length - 1 : 0;
        const z = { ...d, idx, lastStep: 0, el: null };
        z.el = document.createElement("img");
        z.el.src = z.img;
        z.el.className = "lab-zombie";
        z.el.style.width = TILE_W + "px";
        z.el.style.height = TILE_H + "px";
        field.appendChild(z.el);
        zombies.push(z);
    }

    const state = {
        player: { c: START.c, r: START.r },
        lastKey: 0,
        finished: false
    };

    function zombieCell(z) {
        const v = z.route[z.idx];
        return z.axis === "row" ? { c: v, r: z.fixed } : { c: z.fixed, r: v };
    }

    function place(el, c, r) {
        el.style.transform = `translate(${c * TILE_W}px, ${r * TILE_H}px)`;
    }

    function render() {
        place(playerEl, state.player.c, state.player.r);
        for (const z of zombies) {
            const p = zombieCell(z);
            place(z.el, p.c, p.r);
        }
    }

    function playerOnZombie() {
        for (const z of zombies) {
            const p = zombieCell(z);
            if (p.c === state.player.c && p.r === state.player.r) return true;
        }
        return false;
    }

    function onHit() {
        loseHeart(1);
        combatArea.classList.add("lab-hit-flash");
        setTimeout(() => combatArea.classList.remove("lab-hit-flash"), 220);
        if (gameState.hearts === 0) { end(false); return; }
        state.player.c = START.c;
        state.player.r = START.r;
        render();
    }

    function handleKeyDown(e) {
        if (state.finished) return;
        const k = e.key.toLowerCase();
        let dc = 0, dr = 0;
        if (k === "w" || e.key === "ArrowUp") dr = -1;
        else if (k === "s" || e.key === "ArrowDown") dr = 1;
        else if (k === "a" || e.key === "ArrowLeft") dc = -1;
        else if (k === "d" || e.key === "ArrowRight") dc = 1;
        else return;
        e.preventDefault();

        const now = performance.now();
        if (now - state.lastKey < KEY_COOLDOWN) return;
        state.lastKey = now;

        const nc = state.player.c + dc;
        const nr = state.player.r + dr;
        if (nc < 0 || nc >= COLS || nr < 0 || nr >= ROWS) return;
        if (isWall(nc, nr)) return;

        state.player.c = nc;
        state.player.r = nr;
        render();

        if (nc === EXIT.c && nr === EXIT.r) { end(true); return; }
        if (playerOnZombie()) onHit();
    }

    function end(won) {
        if (state.finished) return;
        state.finished = true;
        cleanup();
        if (won) { if (onWin) onWin(); }
        else     { if (onLose) onLose(); }
    }

    function cleanup() {
        cancelAnimationFrame(rafHandle);
        clearSceneTimer();
        document.removeEventListener("keydown", handleKeyDown);
        stage.classList.remove("combat-active");
        combatArea.classList.add("hidden");
        combatArea.classList.remove("lab-combat", "lab-hit-flash");
        combatArea.innerHTML = "";
    }

    let lastTime = performance.now();
    let rafHandle = null;
    function loop(now) {
        if (state.finished) return;
        const dt = Math.min(100, now - lastTime);
        lastTime = now;

        for (const z of zombies) {
            if (z.route.length <= 1) continue;
            z.lastStep += dt;
            if (z.lastStep >= z.stepMs) {
                z.lastStep = 0;
                let next = z.idx + z.dir;
                if (next < 0 || next >= z.route.length) {
                    z.dir = -z.dir;
                    next = z.idx + z.dir;
                }
                z.idx = next;
            }
        }

        if (playerOnZombie()) {
            onHit();
            if (state.finished) return;
        }

        render();
        rafHandle = requestAnimationFrame(loop);
    }

    document.addEventListener("keydown", handleKeyDown);
    render();
    startSceneTimer(30, () => end(false));
    rafHandle = requestAnimationFrame(loop);
}
