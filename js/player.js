function createAudioPlayer(containerId, audioFilePath, title = "") {
  const container = document.getElementById(containerId);
  container.classList.add("custom-player");

  // Título
  const titleDiv = document.createElement("div");
  titleDiv.className = "player-title";
  titleDiv.innerText = title;

  // Forma de onda y controles visuales
  const playerBody = document.createElement("div");
  playerBody.className = "player-body";

  const playButton = document.createElement("button");
  playButton.id = `${containerId}-play`;
  playButton.className = "play-btn";
  playButton.innerHTML = "▶";

  const waveformDiv = document.createElement("div");
  waveformDiv.id = `${containerId}-waveform`;
  waveformDiv.className = "wave";

  playerBody.appendChild(playButton);
  playerBody.appendChild(waveformDiv);

  // Barra inferior con duración y volumen
  const footerDiv = document.createElement("div");
  footerDiv.className = "player-footer";

  const timeDisplay = document.createElement("span");
  timeDisplay.id = `${containerId}-time`;
  timeDisplay.textContent = "0:00 / 0:00";

  const volumeInput = document.createElement("input");
  volumeInput.id = `${containerId}-volume`;
  volumeInput.type = "range";
  volumeInput.min = 0;
  volumeInput.max = 1;
  volumeInput.step = 0.01;
  volumeInput.value = 1;

  footerDiv.appendChild(volumeInput);
  footerDiv.appendChild(timeDisplay);

  // Ensamblar
  container.appendChild(titleDiv);
  container.appendChild(playerBody);
  container.appendChild(footerDiv);

  // Estilo global (solo la primera vez)
  if (!document.getElementById("player-style")) {
    const style = document.createElement("style");
    style.id = "player-style";
    style.textContent = `
      .custom-player {
        background: black;
        color: white;
        padding: 15px;
        border-radius: 10px;
        margin-bottom: 30px;
        width: 100%;
        box-sizing: border-box;
        font-family: sans-serif;
      }
      .player-title {
        font-size: 1.2em;
        margin-bottom: 10px;
        text-align: center;
      }
      .player-body {
        display: flex;
        align-items: center;
      }
      .play-btn {
        background: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 1.5em;
        margin-right: 15px;
        cursor: pointer;
      }
      .wave {
        flex-grow: 1;
        height: 80px;
      }
      .player-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 10px;
      }
      .player-footer input[type="range"] {
        width: 150px;
      }
    `;
    document.head.appendChild(style);
  }

  // WaveSurfer init
  const wavesurfer = WaveSurfer.create({
    container: `#${containerId}-waveform`,
    waveColor: "#ccc",
    progressColor: "#ff5500",
    height: 80
  });

  wavesurfer.load(audioFilePath);

  // Control play/pause
  playButton.addEventListener("click", () => {
    wavesurfer.playPause();
  });

  // Control volumen
  volumeInput.addEventListener("input", (e) => {
    wavesurfer.setVolume(e.target.value);
  });

  // Mostrar tiempo
  wavesurfer.on("ready", () => {
    timeDisplay.textContent = `0:00 / ${formatTime(wavesurfer.getDuration())}`;
  });
  wavesurfer.on("audioprocess", () => {
    timeDisplay.textContent = `${formatTime(wavesurfer.getCurrentTime())} / ${formatTime(wavesurfer.getDuration())}`;
  });

  function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }
}
