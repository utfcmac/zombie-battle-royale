// Minispiel: Seilklettern (Turnhalle)
//
// 6 Seile nebeneinander. Alex hängt am 3. Seil, klettert gleichmäßig hoch.
// Seil wechseln mit A/D oder Pfeiltasten. Von oben fallen Medizinbälle.
// Treffer = -1 ❤️ + kurzes Flackern. Ab 90% Fortschritt keine neuen Bälle mehr.
//
// Pattern siehe basketball.js.

function startSeilklettern(onWin, onLose) {
    const WIN_MS = 22000;            // 22 s Kletterzeit bis 100 %
    const PLAYER_SIZE = 100;
    const BALL_SIZE = 40;
    const INVULN_MS = 300;
    const ROPE_X = [120, 328, 536, 744, 952, 1160]; // Seile über gesamten Spielbereich verteilt
    const ROPE_WIDTH = 5;
    const PLAYER_Y = 580;
    const ROPE_START_IDX = 2;        // 3. Seil von links

    const stage = document.getElementById("stage");
    const combatArea = document.getElementById("combat-area");

    renderSceneImage("04_turnhalle/assets/turnhalle_kampf.png");
    combatArea.innerHTML = `
        <div class="sk-hud">
            <span class="sk-title">🪢 Seilklettern</span>
            <span class="sk-info">A / D (← →) Seil wechseln · Kopf einziehen!</span>
        </div>
        <div class="sk-field">
            ${ROPE_X.map(x =>
                `<div class="sk-rope" style="transform: translate(${x - ROPE_WIDTH / 2}px, 0)"></div>`
            ).join("")}
            <img class="sk-player" src="04_turnhalle/assets/ove_turnhalle.png" alt="">
            <div class="sk-progress">
                <div class="sk-progress-fill"></div>
            </div>
        </div>
    `;
    combatArea.classList.remove("hidden");
    combatArea.classList.add("sk-combat");
    stage.classList.add("combat-active");

    const field = combatArea.querySelector(".sk-field");
    const playerEl = field.querySelector(".sk-player");
    const progressFill = field.querySelector(".sk-progress-fill");

    const fieldH = field.offsetHeight;

    const state = {
        ropeIdx: ROPE_START_IDX,
        elapsed: 0,
        balls: [],
        lastSpawn: 0,
        invuln: 0,
        finished: false
    };

    function progress() {
        return Math.min(1, state.elapsed / WIN_MS);
    }

    function maxBalls() {
        const p = progress();
        if (p < 0.33) return 2;
        if (p < 0.66) return 3;
        return 4;
    }

    function ballSpeed() {
        // 280 → 520 px/s
        return 280 + (520 - 280) * progress();
    }

    function spawnInterval() {
        // 900 → 500 ms
        return 900 - 400 * progress();
    }

    function handleKeyDown(e) {
        if (state.finished) return;
        const k = e.key.toLowerCase();
        if (k === "a" || e.key === "ArrowLeft") {
            if (state.ropeIdx > 0) state.ropeIdx--;
            e.preventDefault();
        } else if (k === "d" || e.key === "ArrowRight") {
            if (state.ropeIdx < ROPE_X.length - 1) state.ropeIdx++;
            e.preventDefault();
        }
    }

    function rectsOverlap(ax, ay, aw, ah, bx, by, bw, bh) {
        return ax < bx + bw && ax + aw > bx && ay < by + bh && ay + ah > by;
    }

    function spawnBall() {
        const ropeIdx = Math.floor(Math.random() * ROPE_X.length);
        state.balls.push({
            ropeIdx,
            x: ROPE_X[ropeIdx] - BALL_SIZE / 2,
            y: 0,
            vy: ballSpeed(),
            el: null
        });
    }

    function update(dt) {
        state.elapsed += dt;

        const p = progress();
        progressFill.style.height = (p * 100) + "%";

        // Ab 90 % keine neuen Bälle mehr — Fairness vor dem Ziel
        if (p < 0.90) {
            state.lastSpawn += dt;
            if (state.lastSpawn >= spawnInterval() && state.balls.length < maxBalls()) {
                state.lastSpawn = 0;
                spawnBall();
            }
        }

        for (let i = state.balls.length - 1; i >= 0; i--) {
            const b = state.balls[i];
            b.y += b.vy * dt / 1000;
            if (b.y > fieldH + 10) {
                if (b.el) b.el.remove();
                state.balls.splice(i, 1);
                continue;
            }

            if (state.invuln <= 0) {
                const playerX = ROPE_X[state.ropeIdx] - PLAYER_SIZE / 2;
                const pxi = playerX + 18, pyi = PLAYER_Y + 18;
                const pwi = PLAYER_SIZE - 36, phi = PLAYER_SIZE - 32;
                const bxi = b.x + 4, byi = b.y + 4;
                const bwi = BALL_SIZE - 8, bhi = BALL_SIZE - 8;
                if (rectsOverlap(pxi, pyi, pwi, phi, bxi, byi, bwi, bhi)) {
                    if (b.el) b.el.remove();
                    state.balls.splice(i, 1);
                    loseHeart(1);
                    state.invuln = INVULN_MS;
                    combatArea.classList.add("sk-hit-flash");
                    setTimeout(() => combatArea.classList.remove("sk-hit-flash"), 220);
                    if (gameState.hearts === 0) { end(false); return false; }
                }
            }
        }

        if (state.invuln > 0) state.invuln = Math.max(0, state.invuln - dt);

        if (p >= 1) { end(true); return false; }
        return true;
    }

    function render() {
        const playerX = ROPE_X[state.ropeIdx] - PLAYER_SIZE / 2;
        playerEl.style.transform = `translate(${playerX}px, ${PLAYER_Y}px)`;
        playerEl.style.opacity =
            (state.invuln > 0 && Math.floor(state.elapsed / 60) % 2 === 0) ? 0.35 : 1;

        for (const b of state.balls) {
            if (!b.el) {
                b.el = document.createElement("div");
                b.el.className = "sk-ball";
                field.appendChild(b.el);
            }
            b.el.style.transform = `translate(${b.x}px, ${b.y}px)`;
        }
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
        document.removeEventListener("keydown", handleKeyDown);
        stage.classList.remove("combat-active");
        combatArea.classList.add("hidden");
        combatArea.classList.remove("sk-combat", "sk-hit-flash");
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
    render();
    rafHandle = requestAnimationFrame(loop);
}
