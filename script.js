let startTime;
let isRunning = false;
let laps = [];

function startStop() {
    if (isRunning) {
        stop();
    } else {
        start();
    }
}

function start() {
    isRunning = true;
    startTime = Date.now() - laps.reduce((total, lap) => total + lap, 0);
    document.getElementById("startStop").textContent = "Stop";
    update();
}

function stop() {
    isRunning = false;
    document.getElementById("startStop").textContent = "Start";
    laps.push(Date.now() - startTime);
    updateLaps();
}

function reset() {
    isRunning = false;
    document.getElementById("startStop").textContent = "Start";
    startTime = 0;
    laps = [];
    update();
    updateLaps();
}

function lap() {
    if (isRunning) {
        laps.push(Date.now() - startTime);
        updateLaps();
    }
}

function update() {
    const elapsedTime = isRunning ? Date.now() - startTime : 0;
    const formattedTime = formatTime(elapsedTime);
    document.getElementById("display").textContent = formattedTime;
    requestAnimationFrame(update);
}

function updateLaps() {
    const lapsElement = document.getElementById("laps");
    lapsElement.innerHTML = "";
    laps.forEach((lapTime, index) => {
        const lapItem = document.createElement("li");
        lapItem.textContent = `Lap ${index + 1}: ${formatTime(lapTime)}`;
        lapsElement.appendChild(lapItem);
    });
}

function formatTime(time) {
    const totalSeconds = Math.floor(time / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = time % 1000;

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.${String(milliseconds).padStart(3, "0")}`;
}

// Initial update
update();
