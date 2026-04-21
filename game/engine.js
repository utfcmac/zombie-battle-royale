const SAVE_KEY = "zombieRoyaleSave";
const INVENTORY_SIZE = 9;
const DEFAULT_ZOMBIES = 30;

const gameState = {
    hearts: 3,
    maxHearts: 3,
    timer: 0,
    currentSceneId: "start",
    inventory: new Array(INVENTORY_SIZE).fill(null),
    zombiesRemaining: DEFAULT_ZOMBIES,
    zombiesKilled: 0,
    endingsUnlocked: [],
    playerName: "Alex",
    paused: false
};

let sceneTimerInterval = null;
let currentSceneAudio = null;

function init() {
    loadGame();
    buildInventorySlots();
    wireButtons();
    wireKeyboard();
    showScene(gameState.currentSceneId);
}

function buildInventorySlots() {
    const wrap = document.getElementById("inventory-slots");
    wrap.innerHTML = "";
    for (let i = 0; i < INVENTORY_SIZE; i++) {
        const slot = document.createElement("div");
        slot.className = "slot";
        slot.dataset.slot = i;
        slot.innerHTML = `<span class="slot-key">${i + 1}</span>`;
        slot.addEventListener("click", () => useItem(i));
        wrap.appendChild(slot);
    }
    renderInventory();
}

function wireButtons() {
    document.getElementById("help-btn").addEventListener("click", toggleHelp);
    document.getElementById("pause-btn").addEventListener("click", togglePause);
    document.getElementById("reset-btn").addEventListener("click", () => {
        if (confirm("Speicherstand wirklich löschen und neu starten?")) resetGame();
    });
    document.querySelectorAll("#dev-nav button[data-scene]").forEach(btn => {
        btn.addEventListener("click", () => showScene(btn.dataset.scene));
    });
}

function wireKeyboard() {
    document.addEventListener("keydown", (e) => {
        if (e.key >= "1" && e.key <= "9") {
            e.preventDefault();
            useItem(parseInt(e.key, 10) - 1);
            return;
        }
        switch (e.key) {
            case "Escape":
                togglePause();
                break;
            case "h":
            case "H":
                toggleHelp();
                break;
            case "Enter":
                // reserved: restart on Game Over
                break;
            case " ":
                e.preventDefault();
                break;
            // A/D (+ Pfeile) werden von den Minispielen selbst behandelt
        }
    });
}

function showScene(id) {
    const scene = SCENES[id];
    if (!scene) {
        console.error("Unknown scene:", id);
        return;
    }
    clearSceneTimer();
    gameState.currentSceneId = id;

    document.getElementById("start-overlay").classList.add("hidden");
    if (scene.onEnter) scene.onEnter();

    renderSceneImage(scene.image);
    document.getElementById("scene-text").textContent = scene.text;
    renderSceneAudio(scene);
    renderChoices(scene.choices || []);

    renderHUD();
    saveGame();
}

function renderSceneImage(src) {
    const img = document.getElementById("scene-image");
    if (!src) {
        img.classList.remove("loaded");
        img.removeAttribute("src");
        return;
    }
    img.onload = () => img.classList.add("loaded");
    img.onerror = () => img.classList.remove("loaded");
    img.classList.remove("loaded");
    img.src = src;
}

function renderSceneAudio(scene) {
    const btn = document.getElementById("scene-audio-btn");
    if (currentSceneAudio) {
        currentSceneAudio.pause();
        currentSceneAudio = null;
    }
    if (!scene.audio) {
        btn.classList.add("hidden");
        btn.classList.remove("playing");
        btn.onclick = null;
        return;
    }
    btn.classList.remove("hidden", "playing");
    const audio = new Audio(scene.audio);
    currentSceneAudio = audio;
    const stopGlow = () => btn.classList.remove("playing");
    audio.addEventListener("play", () => btn.classList.add("playing"));
    audio.addEventListener("pause", stopGlow);
    audio.addEventListener("ended", stopGlow);
    audio.addEventListener("timeupdate", () => {
        if (audio.duration && audio.currentTime >= audio.duration - 0.05) stopGlow();
    });
    btn.onclick = () => {
        if (audio.paused) {
            audio.play().catch(() => {});
        } else {
            audio.pause();
            audio.currentTime = 0;
        }
        markScenePlayed(scene.id);
    };
    if (!gameState.scenesAudioPlayed) gameState.scenesAudioPlayed = [];
    const alreadyPlayed = gameState.scenesAudioPlayed.includes(scene.id);
    if (scene.startOverlay && !alreadyPlayed) {
        showStartOverlay(() => {
            audio.play().then(() => markScenePlayed(scene.id)).catch(() => {});
        });
    } else if (!alreadyPlayed) {
        audio.play()
            .then(() => markScenePlayed(scene.id))
            .catch(() => waitForInteractionThenPlay(audio, scene.id));
    }
}

function showStartOverlay(onStart) {
    const overlay = document.getElementById("start-overlay");
    const btn = document.getElementById("start-btn");
    overlay.classList.remove("hidden");
    btn.onclick = () => {
        overlay.classList.add("hidden");
        onStart();
    };
}

function waitForInteractionThenPlay(audio, sceneId) {
    const tryPlay = () => {
        if (currentSceneAudio !== audio) return cleanup();
        audio.play()
            .then(() => { markScenePlayed(sceneId); cleanup(); })
            .catch(() => { /* noch kein Gesture, weiter warten */ });
    };
    const cleanup = () => {
        document.removeEventListener("pointerdown", tryPlay);
        document.removeEventListener("keydown", tryPlay);
    };
    document.addEventListener("pointerdown", tryPlay);
    document.addEventListener("keydown", tryPlay);
}

function markScenePlayed(sceneId) {
    if (!gameState.scenesAudioPlayed) gameState.scenesAudioPlayed = [];
    if (!gameState.scenesAudioPlayed.includes(sceneId)) {
        gameState.scenesAudioPlayed.push(sceneId);
        saveGame();
    }
}

function renderChoices(choices) {
    const wrap = document.getElementById("scene-choices");
    wrap.innerHTML = "";
    choices.forEach((choice) => {
        const locked = choice.condition && !choice.condition();
        const btn = document.createElement("button");
        btn.className = "choice-btn" + (locked ? " locked" : "");
        btn.textContent = choice.label;
        btn.disabled = locked;
        btn.addEventListener("click", () => {
            if (choice.onSelect) choice.onSelect();
            if (choice.target) showScene(choice.target);
        });
        wrap.appendChild(btn);
    });
}

function renderHUD() {
    const hearts = "❤️".repeat(gameState.hearts) + "🖤".repeat(gameState.maxHearts - gameState.hearts);
    document.getElementById("hearts").textContent = hearts;
    document.getElementById("timer").textContent = gameState.timer > 0 ? `⏱️ ${gameState.timer}s` : "⏱️ --";
    document.getElementById("zombie-counter").textContent = `🧟 ${gameState.zombiesRemaining}`;
}

function renderInventory() {
    const slots = document.querySelectorAll(".slot");
    slots.forEach((slot, i) => {
        const item = gameState.inventory[i];
        slot.classList.toggle("filled", !!item);
        slot.classList.toggle("passive", !!item && item.passive);
        const existingIcon = slot.querySelector(".slot-icon");
        const existingName = slot.querySelector(".slot-name");
        if (existingIcon) existingIcon.remove();
        if (existingName) existingName.remove();
        if (item) {
            const icon = document.createElement("span");
            icon.className = "slot-icon";
            icon.textContent = item.icon || "❔";
            const name = document.createElement("span");
            name.className = "slot-name";
            name.textContent = item.name;
            slot.appendChild(icon);
            slot.appendChild(name);
            slot.title = `${item.name} – ${item.description}${item.passive ? " (passiv)" : ""}`;
        } else {
            slot.title = "Leerer Slot";
        }
    });
}

function hasItem(itemId) {
    return gameState.inventory.some((it) => it && it.id === itemId);
}

function addItem(item) {
    if (hasItem(item.id)) return false;
    const freeSlot = gameState.inventory.findIndex((it) => it === null);
    if (freeSlot === -1) {
        toast("Inventar voll!");
        return false;
    }
    gameState.inventory[freeSlot] = { ...item };
    renderInventory();
    saveGame();
    return true;
}

function removeItem(itemId) {
    const idx = gameState.inventory.findIndex((it) => it && it.id === itemId);
    if (idx === -1) return false;
    gameState.inventory[idx] = null;
    renderInventory();
    saveGame();
    return true;
}

function useItem(slotIndex) {
    const item = gameState.inventory[slotIndex];
    if (!item) return;
    if (item.passive) {
        toast(`${item.icon} ${item.name} wirkt passiv.`);
        return;
    }
    const used = item.use ? item.use() : false;
    if (used) {
        gameState.inventory[slotIndex] = null;
        renderInventory();
        renderHUD();
        saveGame();
    }
}

function startSceneTimer(seconds, onExpire) {
    clearSceneTimer();
    gameState.timer = seconds;
    renderHUD();
    sceneTimerInterval = setInterval(() => {
        if (gameState.paused) return;
        gameState.timer--;
        renderHUD();
        if (gameState.timer <= 0) {
            clearSceneTimer();
            if (onExpire) onExpire();
        }
    }, 1000);
}

function clearSceneTimer() {
    if (sceneTimerInterval) {
        clearInterval(sceneTimerInterval);
        sceneTimerInterval = null;
    }
    gameState.timer = 0;
}

function loseHeart(amount = 1) {
    gameState.hearts = Math.max(0, gameState.hearts - amount);
    renderHUD();
    saveGame();
    if (gameState.hearts === 0) onGameOver();
}

function onGameOver() {
    showOverlay(`
        <h2>💀 Game Over</h2>
        <p>Du wurdest ein Zombie und unterrichtest jetzt Mathe für die Ewigkeit.</p>
        <p style="margin-top: 12px;">Drück <b>Enter</b> für Neustart.</p>
    `);
}

function saveGame() {
    try {
        localStorage.setItem(SAVE_KEY, JSON.stringify(gameState));
    } catch (e) {
        console.warn("Speichern fehlgeschlagen", e);
    }
}

function loadGame() {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return;
    try {
        const saved = JSON.parse(raw);
        Object.assign(gameState, saved);
        if (!SCENES[gameState.currentSceneId]) gameState.currentSceneId = "start";
    } catch (e) {
        console.warn("Laden fehlgeschlagen", e);
    }
}

function resetGame() {
    localStorage.removeItem(SAVE_KEY);
    location.reload();
}

function togglePause() {
    gameState.paused = !gameState.paused;
    if (gameState.paused) {
        showOverlay(`
            <h2>⏸️ Pause</h2>
            <p>Klick oder drück ESC zum Weitermachen.</p>
            <p style="margin-top: 12px; color: var(--text-dim);">
                <button class="choice-btn" onclick="resetGame()">Neustart (löscht Speicherstand)</button>
            </p>
        `);
    } else {
        hideOverlay();
    }
}

function toggleHelp() {
    const overlay = document.getElementById("overlay");
    if (!overlay.classList.contains("hidden")) {
        hideOverlay();
        return;
    }
    showOverlay(`
        <h2>❓ Steuerung</h2>
        <table>
            <tr><td>Maus-Klick</td><td>Entscheidung wählen</td></tr>
            <tr><td>1–9</td><td>Item aus Slot nutzen</td></tr>
            <tr><td>A / D oder ← →</td><td>Minispiele: Bewegen</td></tr>
            <tr><td>W / Space</td><td>Minispiele: Aktion</td></tr>
            <tr><td>ESC</td><td>Pause</td></tr>
            <tr><td>H</td><td>Diese Hilfe</td></tr>
            <tr><td>Enter</td><td>Restart (bei Game Over)</td></tr>
        </table>
        <p style="margin-top: 16px; color: var(--text-dim);">Klick irgendwo oder drück H zum Schließen.</p>
    `);
}

function showOverlay(html) {
    const overlay = document.getElementById("overlay");
    document.getElementById("overlay-content").innerHTML = html;
    overlay.classList.remove("hidden");
    overlay.onclick = (e) => {
        if (e.target.id === "overlay") hideOverlay();
    };
}

function hideOverlay() {
    document.getElementById("overlay").classList.add("hidden");
    gameState.paused = false;
}

function toast(msg) {
    const el = document.createElement("div");
    el.className = "toast";
    el.textContent = msg;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 2100);
}

init();
