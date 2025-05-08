function createAudioPlayer(containerId, audioFilePath, audioTitle = "") {
  const container = document.getElementById(containerId);

  // Estilo general del reproductor
  container.classList.add("audio-player-box");

  // Título
  const title = document.createElement("div");
  title.className = "audio-title";
  title.textContent = audioTitle;
  container.appendChild(title);

  // Waveform
  const waveformDiv = document.createElement("div");
  waveformDiv.id = `${containerId}-waveform`;
  waveformDiv.className = "wave";
  container.appendChild(waveformDiv);

  // Controles
  const controlsDiv = document.createElement("div");
  controlsDiv.className = "controls";

  const playButton = document.createElement("button");
  playButton.id = `${containerId}-play`;
  playButton.textContent = "▶";

  const volumeSlider = document.createElement("input");
  volumeSlider.id = `${containerId}-volume`;
  volumeSlider.type = "range";
  volumeSlider.min = "0";
  volumeSlider.max = "1";
  volumeSlider.step = "0.01";
  volumeSlider.value = "1";

  controlsDiv.appendChild(playButton);
  controlsDiv.appendChild(volumeSlider);
  container.appendChild(controlsDiv);

  // WaveSurfer
  const wavesurfer = WaveSurfer.create({
    container: `#${containerId}-waveform`,
    waveColor: "#ccc",
    progressColor: "#2196f3",
    height: 80
  });

  wavesurfer.load(audioFilePath);

  // Play/Pause
  playButton.addEventListener("click", () => {
    wavesurfer.playPause();
  });

  wavesurfer.on("play", () => {
    playButton.textContent = "❚❚";
  });

  wavesurfer.on("pause", () => {
    playButton.textContent = "▶";
  });

  wavesurfer.on("finish", () => {
    playButton.textContent = "▶";
  });

  // Volumen
  volumeSlider.addEventListener("input", (e) => {
    wavesurfer.setVolume(e.target.value);
  });
}
