// Minispiel: Teller werfen (Mensa)
//
// Alex steht unten, bewegt sich mit A/D (oder ← →) und wirft mit Leertaste
// Plastikteller in Richtung Fluchtpunkt (Bildmitte, ~40 % Höhe). Zombies
// spawnen klein am Fluchtpunkt und wachsen perspektivisch an, während sie
// auf Alex zulaufen. Treffer = Zombie weg, Vordergrund erreicht = -1 ❤️.
//
// 5 Wellen — schrittweise schneller, Welle 5 schnell, aber noch machbar.

function startTellerWerfen(onWin, onLose) {
    const stage = document.getElementById("stage");
    const combatArea = document.getElementById("combat-area");

    renderSceneImage("02_mensa/assets/mensa_kampf.png");
    combatArea.innerHTML = `
        <div class="tw-hud">
            <span class="tw-wave">Welle 1 / 5</span>
            <span class="tw-score">🍽️ 0</span>
            <span class="tw-info">A / D (← →) bewegen · Leertaste oder Mausklick werfen</span>
        </div>
        <div class="tw-field">
            <img class="tw-player" src="02_mensa/assets/ove_mensa.png" alt="">
        </div>
    `;
    combatArea.classList.remove("hidden");
    combatArea.classList.add("tw-combat");
    stage.classList.add("combat-active");

    const field = combatArea.querySelector(".tw-field");
    const playerEl = field.querySelector(".tw-player");
    const waveEl = combatArea.querySelector(".tw-wave");
    const scoreEl = combatArea.querySelector(".tw-score");

    const fieldW = field.offsetWidth;
    const fieldH = field.offsetHeight;
    const VP = { x: fieldW / 2, y: fieldH * 0.4 };

    const PLAYER_W = 180;
    const PLAYER_H = 220;
    const PLATE_BASE = 36;
    const ZOMBIE_BASE_W = 150;
    const ZOMBIE_BASE_H = 210;
    const PLAYER_SPEED = 520;
    const THROW_COOLDOWN = 260;
    const PLATE_TRAVEL_MS = 700;
    const PLATE_SCALE_MIN = 0.3;
    const ZOMBIE_SCALE_MIN = 0.25;
    const ZOMBIE_SCALE_MAX = 1.2;

    const ZOMBIE_IMAGES = [
        "02_mensa/assets/zombie_deutschlehrerin.png",
        "02_mensa/assets/zombie_hausmeister.png",
        "02_mensa/assets/zombie_koechin.png",
        "02_mensa/assets/zombie_mathelehrer.png",
        "02_mensa/assets/zombie_schueler.png",
        "02_mensa/assets/zombie_schuelerin.png"
    ];

    // Lane-Offsets (Anteil von fieldW/2, den der Zombie am Vordergrund links/rechts
    // von der Bildmitte erreicht) — folgt den Tischreihen-Fluchtlinien.
    const LANES = [-0.38, -0.19, 0, 0.19, 0.38];

    const WAVES = [
        { count: 3, travelMs: 6000, spawnInterval: 1400, zigzagAmp: 0 },
        { count: 4, travelMs: 5200, spawnInterval: 1150, zigzagAmp: 0 },
        { count: 5, travelMs: 4400, spawnInterval: 1000, zigzagAmp: 0.08 },
        { count: 6, travelMs: 3700, spawnInterval: 850,  zigzagAmp: 0.13 },
        { count: 7, travelMs: 3000, spawnInterval: 750,  zigzagAmp: 0.15 }
    ];

    const state = {
        player: { x: fieldW / 2 - PLAYER_W / 2 },
        plates: [],
        zombies: [],
        waveIdx: 0,
        spawnedInWave: 0,
        resolvedInWave: 0,
        score: 0,
        lastSpawn: 0,
        lastThrow: 0,
        keys: { left: false, right: false },
        startingHearts: gameState.hearts,
        finished: false
    };

    function handleKeyDown(e) {
        const k = e.key.toLowerCase();
        if (k === "a" || e.key === "ArrowLeft")  { state.keys.left = true; e.preventDefault(); }
        else if (k === "d" || e.key === "ArrowRight") { state.keys.right = true; e.preventDefault(); }
        else if (e.key === " ") { tryThrow(); e.preventDefault(); }
    }
    function handleKeyUp(e) {
        const k = e.key.toLowerCase();
        if (k === "a" || e.key === "ArrowLeft")  state.keys.left = false;
        else if (k === "d" || e.key === "ArrowRight") state.keys.right = false;
    }
    function handleMouseDown(e) {
        if (e.button !== 0) return;
        tryThrow();
        e.preventDefault();
    }

    function tryThrow() {
        if (state.lastThrow < THROW_COOLDOWN) return;
        state.lastThrow = 0;
        const startX = state.player.x + PLAYER_W / 2;
        const startY = fieldH - PLAYER_H * 0.55;
        state.plates.push({
            startX, startY,
            t: 0,
            x: startX,
            y: startY,
            scale: 1,
            el: null
        });
    }

    function spawnZombie() {
        const wave = WAVES[state.waveIdx];
        const lane = LANES[Math.floor(Math.random() * LANES.length)];
        const img = ZOMBIE_IMAGES[Math.floor(Math.random() * ZOMBIE_IMAGES.length)];
        // Kleines Jitter am Fluchtpunkt, damit Zombies nicht exakt aufeinander spawnen
        const spawnJitterX = (Math.random() - 0.5) * 60;
        state.zombies.push({
            lane,
            spawnJitterX,
            zigzagPhase: Math.random() * Math.PI * 2,
            zigzagAmp: wave.zigzagAmp,
            img,
            t: 0,
            travelMs: wave.travelMs,
            footX: VP.x + spawnJitterX,
            footY: VP.y,
            scale: ZOMBIE_SCALE_MIN,
            el: null,
            dead: false
        });
        state.spawnedInWave++;
    }

    function advanceWaveIfDone() {
        const wave = WAVES[state.waveIdx];
        if (state.resolvedInWave < wave.count) return;
        if (state.waveIdx + 1 >= WAVES.length) {
            finishWin();
            return;
        }
        state.waveIdx++;
        state.spawnedInWave = 0;
        state.resolvedInWave = 0;
        state.lastSpawn = -400;
        waveEl.textContent = `Welle ${state.waveIdx + 1} / ${WAVES.length}`;
    }

    function rectsOverlap(ax, ay, aw, ah, bx, by, bw, bh) {
        return ax < bx + bw && ax + aw > bx && ay < by + bh && ay + ah > by;
    }

    function update(dt) {
        state.lastThrow = Math.min(state.lastThrow + dt, THROW_COOLDOWN + 10);

        const dx = (state.keys.right ? 1 : 0) - (state.keys.left ? 1 : 0);
        state.player.x = Math.max(0, Math.min(fieldW - PLAYER_W, state.player.x + dx * PLAYER_SPEED * dt / 1000));

        const wave = WAVES[state.waveIdx];
        state.lastSpawn += dt;
        if (state.spawnedInWave < wave.count && state.lastSpawn >= wave.spawnInterval) {
            state.lastSpawn = 0;
            spawnZombie();
        }

        // Teller-Update
        for (let i = state.plates.length - 1; i >= 0; i--) {
            const p = state.plates[i];
            p.t += dt / PLATE_TRAVEL_MS;
            if (p.t >= 1) {
                if (p.el) p.el.remove();
                state.plates.splice(i, 1);
                continue;
            }
            p.x = p.startX;
            p.y = p.startY + (VP.y - p.startY) * p.t;
            p.scale = 1 - (1 - PLATE_SCALE_MIN) * p.t;
        }

        // Zombie-Update
        for (let i = state.zombies.length - 1; i >= 0; i--) {
            const z = state.zombies[i];
            if (z.dead) continue;
            z.t += dt / z.travelMs;
            const tEased = z.t;
            const laneX = VP.x + z.spawnJitterX + (z.lane * (fieldW * 0.5)) * tEased;
            const zigzag = z.zigzagAmp > 0
                ? Math.sin(z.t * Math.PI * 4 + z.zigzagPhase) * z.zigzagAmp * fieldW * 0.5 * tEased
                : 0;
            z.footX = laneX + zigzag;
            z.footY = VP.y + (fieldH - VP.y) * tEased;
            z.scale = ZOMBIE_SCALE_MIN + (ZOMBIE_SCALE_MAX - ZOMBIE_SCALE_MIN) * tEased;

            if (z.t >= 1) {
                // Zombie hat Alex erreicht
                if (z.el) z.el.remove();
                state.zombies.splice(i, 1);
                state.resolvedInWave++;
                loseHeart(1);
                combatArea.classList.add("tw-hit-flash");
                setTimeout(() => combatArea.classList.remove("tw-hit-flash"), 180);
                if (gameState.hearts <= 0) { finishLose(); return false; }
                continue;
            }
        }

        // Kollision Teller ↔ Zombie
        for (let i = state.plates.length - 1; i >= 0; i--) {
            const p = state.plates[i];
            const ps = PLATE_BASE * p.scale;
            const pr = { x: p.x - ps / 2, y: p.y - ps / 2, w: ps, h: ps };
            for (let j = state.zombies.length - 1; j >= 0; j--) {
                const z = state.zombies[j];
                if (z.dead) continue;
                const zw = ZOMBIE_BASE_W * z.scale;
                const zh = ZOMBIE_BASE_H * z.scale;
                const zr = { x: z.footX - zw / 2, y: z.footY - zh, w: zw, h: zh };
                if (rectsOverlap(pr.x, pr.y, pr.w, pr.h, zr.x, zr.y, zr.w, zr.h)) {
                    z.dead = true;
                    if (z.el) z.el.classList.add("tw-zombie-hit");
                    if (p.el) p.el.remove();
                    state.plates.splice(i, 1);
                    state.resolvedInWave++;
                    state.score++;
                    scoreEl.textContent = `🍽️ ${state.score}`;
                    setTimeout(() => {
                        if (z.el) z.el.remove();
                        const idx = state.zombies.indexOf(z);
                        if (idx >= 0) state.zombies.splice(idx, 1);
                    }, 170);
                    break;
                }
            }
        }

        advanceWaveIfDone();
        if (state.finished) return false;
        return true;
    }

    function render() {
        playerEl.style.transform = `translate(${state.player.x}px, ${fieldH - PLAYER_H - 8}px)`;

        for (const p of state.plates) {
            if (!p.el) {
                p.el = document.createElement("div");
                p.el.className = "tw-plate";
                field.appendChild(p.el);
            }
            const ps = PLATE_BASE * p.scale;
            p.el.style.width = `${ps}px`;
            p.el.style.height = `${ps}px`;
            p.el.style.transform = `translate(${p.x - ps / 2}px, ${p.y - ps / 2}px)`;
        }

        for (const z of state.zombies) {
            if (!z.el) {
                z.el = document.createElement("img");
                z.el.className = "tw-zombie";
                z.el.src = z.img;
                z.el.alt = "";
                field.appendChild(z.el);
            }
            const zw = ZOMBIE_BASE_W * z.scale;
            const zh = ZOMBIE_BASE_H * z.scale;
            z.el.style.width = `${zw}px`;
            z.el.style.height = `${zh}px`;
            z.el.style.transform = `translate(${z.footX - zw / 2}px, ${z.footY - zh}px)`;
            z.el.style.zIndex = String(Math.floor(z.footY));
        }
    }

    function cleanup() {
        state.finished = true;
        cancelAnimationFrame(rafHandle);
        document.removeEventListener("keydown", handleKeyDown);
        document.removeEventListener("keyup", handleKeyUp);
        combatArea.removeEventListener("mousedown", handleMouseDown);
        stage.classList.remove("combat-active");
        combatArea.classList.add("hidden");
        combatArea.classList.remove("tw-combat", "tw-hit-flash");
        combatArea.innerHTML = "";
    }

    function finishWin() {
        cleanup();
        if (onWin) onWin();
    }
    function finishLose() {
        cleanup();
        if (onLose) onLose();
    }

    let lastTime = performance.now();
    let rafHandle = null;
    function loop(now) {
        if (state.finished) return;
        const dt = Math.min(50, now - lastTime);
        lastTime = now;
        const cont = update(dt);
        if (cont !== false) {
            render();
            rafHandle = requestAnimationFrame(loop);
        }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    combatArea.addEventListener("mousedown", handleMouseDown);
    rafHandle = requestAnimationFrame(loop);
}
