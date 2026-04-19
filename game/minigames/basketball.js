// Minispiel: Basketball-Ausweichen (Basketballplatz, Sportlehrer-Zombie)
//
// Gameplay: Zombie oben patrouilliert, wirft Bälle nach unten. Spieler unten
// steuert mit A/D (oder ← →) und muss 30 s überleben. Jeder Treffer = -1 ❤️.
//
// Struktur (Pattern für weitere Minispiele):
//   1. renderSceneImage(kampf-bild) als Hintergrund
//   2. combat-area + stage.combat-active Klassen setzen
//   3. requestAnimationFrame-Loop mit update(dt) + render()
//   4. Keydown/Keyup für Input, eigene EventListener
//   5. cleanup() entfernt Listener, Klassen, Inhalt
//   6. Win → onWin(), KO → onLose() (nur falls hearts > 0, sonst GameOver)

function startBasketballAusweichen(onWin, onLose) {
    const WIN_MS = 30000;
    const PLAYER_SPEED = 520;
    const ZOMBIE_SPEED = 220;
    const PLAYER_SIZE = 80;
    const ZOMBIE_SIZE = 96;
    const BALL_SIZE = 36;
    const INVULN_MS = 900;

    const stage = document.getElementById("stage");
    const combatArea = document.getElementById("combat-area");

    renderSceneImage("images/basketballplatz_kampf.png");
    combatArea.innerHTML = `
        <div class="bb-hud">
            <span class="bb-wave">Welle 1</span>
            <span class="bb-time">⏱️ 0 / 30s</span>
            <span class="bb-info">A / D (oder ← →) ausweichen · Ball = -1 ❤️</span>
        </div>
        <div class="bb-field">
            <img class="bb-zombie" src="images/sportlehrer.png" alt="">
            <img class="bb-player" src="images/ove_running.png" alt="">
        </div>
    `;
    combatArea.classList.remove("hidden");
    combatArea.classList.add("bb-combat");
    stage.classList.add("combat-active");

    const field = combatArea.querySelector(".bb-field");
    const zombieEl = field.querySelector(".bb-zombie");
    const playerEl = field.querySelector(".bb-player");
    const waveEl = combatArea.querySelector(".bb-wave");
    const timeEl = combatArea.querySelector(".bb-time");

    const fieldW = field.offsetWidth;
    const fieldH = field.offsetHeight;

    const state = {
        player: { x: fieldW / 2 - PLAYER_SIZE / 2, y: fieldH - PLAYER_SIZE - 12, facing: 1 },
        zombie: { x: fieldW / 2 - ZOMBIE_SIZE / 2, y: 8, dir: 1 },
        balls: [],
        elapsed: 0,
        lastBall: 0,
        ballInterval: 1200,
        ballSpeed: 320,
        bouncingBalls: false,
        wave: 1,
        invuln: 0,
        keys: { left: false, right: false },
        finished: false
    };

    function setWave(n) {
        if (state.wave === n) return;
        state.wave = n;
        waveEl.textContent = `Welle ${n}`;
        if (n === 2) { state.ballInterval = 850; state.ballSpeed = 400; }
        if (n === 3) { state.ballInterval = 650; state.ballSpeed = 470; state.bouncingBalls = true; }
    }

    function handleKeyDown(e) {
        const k = e.key.toLowerCase();
        if (k === "a" || e.key === "ArrowLeft") { state.keys.left = true; e.preventDefault(); }
        else if (k === "d" || e.key === "ArrowRight") { state.keys.right = true; e.preventDefault(); }
    }
    function handleKeyUp(e) {
        const k = e.key.toLowerCase();
        if (k === "a" || e.key === "ArrowLeft") state.keys.left = false;
        else if (k === "d" || e.key === "ArrowRight") state.keys.right = false;
    }

    function spawnBall() {
        state.balls.push({
            x: state.zombie.x + ZOMBIE_SIZE / 2 - BALL_SIZE / 2,
            y: state.zombie.y + ZOMBIE_SIZE - 8,
            vx: state.wave === 3 ? (Math.random() - 0.5) * 160 : 0,
            vy: state.ballSpeed,
            bouncesLeft: state.bouncingBalls ? 1 : 0,
            el: null
        });
    }

    function rectsOverlap(ax, ay, aw, ah, bx, by, bw, bh) {
        return ax < bx + bw && ax + aw > bx && ay < by + bh && ay + ah > by;
    }

    function update(dt) {
        state.elapsed += dt;
        timeEl.textContent = `⏱️ ${Math.floor(state.elapsed / 1000)} / 30s`;

        if (state.elapsed >= 20000) setWave(3);
        else if (state.elapsed >= 10000) setWave(2);

        const dx = (state.keys.right ? 1 : 0) - (state.keys.left ? 1 : 0);
        state.player.x = Math.max(0, Math.min(fieldW - PLAYER_SIZE, state.player.x + dx * PLAYER_SPEED * dt / 1000));
        if (dx > 0) state.player.facing = 1;
        else if (dx < 0) state.player.facing = -1;

        state.zombie.x += state.zombie.dir * ZOMBIE_SPEED * dt / 1000;
        if (state.zombie.x <= 0) { state.zombie.x = 0; state.zombie.dir = 1; }
        if (state.zombie.x + ZOMBIE_SIZE >= fieldW) { state.zombie.x = fieldW - ZOMBIE_SIZE; state.zombie.dir = -1; }

        state.lastBall += dt;
        if (state.lastBall >= state.ballInterval) {
            state.lastBall = 0;
            spawnBall();
        }

        for (let i = state.balls.length - 1; i >= 0; i--) {
            const b = state.balls[i];
            b.x += b.vx * dt / 1000;
            b.y += b.vy * dt / 1000;

            if (b.x <= 0) { b.x = 0; b.vx = Math.abs(b.vx); }
            if (b.x + BALL_SIZE >= fieldW) { b.x = fieldW - BALL_SIZE; b.vx = -Math.abs(b.vx); }

            if (b.y + BALL_SIZE >= fieldH) {
                if (b.bouncesLeft > 0) {
                    b.bouncesLeft--;
                    b.y = fieldH - BALL_SIZE;
                    b.vy = -Math.abs(b.vy) * 0.75;
                    b.vx += (Math.random() - 0.5) * 100;
                } else {
                    if (b.el) b.el.remove();
                    state.balls.splice(i, 1);
                    continue;
                }
            }

            if (state.invuln <= 0) {
                const pxi = state.player.x + 12, pyi = state.player.y + 10;
                const pwi = PLAYER_SIZE - 24, phi = PLAYER_SIZE - 20;
                const bxi = b.x + 6, byi = b.y + 6;
                const bwi = BALL_SIZE - 12, bhi = BALL_SIZE - 12;
                if (rectsOverlap(pxi, pyi, pwi, phi, bxi, byi, bwi, bhi)) {
                    if (b.el) b.el.remove();
                    state.balls.splice(i, 1);
                    loseHeart();
                    state.invuln = INVULN_MS;
                    combatArea.classList.add("bb-hit-flash");
                    setTimeout(() => combatArea.classList.remove("bb-hit-flash"), 180);
                    if (gameState.hearts === 0) { cleanup(); return false; }
                }
            }
        }

        if (state.invuln > 0) {
            state.invuln = Math.max(0, state.invuln - dt);
            playerEl.style.opacity = Math.floor(state.elapsed / 80) % 2 === 0 ? 0.3 : 1;
        } else {
            playerEl.style.opacity = 1;
        }

        if (state.elapsed >= WIN_MS) {
            cleanup();
            if (onWin) onWin();
            return false;
        }
        return true;
    }

    function render() {
        playerEl.style.transform = `translate(${state.player.x}px, ${state.player.y}px) scaleX(${state.player.facing})`;
        zombieEl.style.transform = `translate(${state.zombie.x}px, ${state.zombie.y}px) scaleX(${state.zombie.dir})`;
        for (const b of state.balls) {
            if (!b.el) {
                b.el = document.createElement("span");
                b.el.className = "bb-ball";
                b.el.textContent = "🏀";
                field.appendChild(b.el);
            }
            b.el.style.transform = `translate(${b.x}px, ${b.y}px)`;
        }
    }

    function cleanup() {
        state.finished = true;
        cancelAnimationFrame(rafHandle);
        document.removeEventListener("keydown", handleKeyDown);
        document.removeEventListener("keyup", handleKeyUp);
        stage.classList.remove("combat-active");
        combatArea.classList.add("hidden");
        combatArea.classList.remove("bb-combat", "bb-hit-flash");
        combatArea.innerHTML = "";
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
    rafHandle = requestAnimationFrame(loop);
}
