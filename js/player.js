function createAudioPlayer(containerId, audioFilePath) {
  const container = document.getElementById(containerId);

  const waveformDiv = document.createElement("div");
  waveformDiv.id = `${containerId}-waveform`;
  waveformDiv.className = "wave";

  const controlsDiv = document.createElement("div");
  controlsDiv.className = "controls";
  controlsDiv.innerHTML = `
    <button id="${containerId}-play">Play</button>
    <input id="${containerId}-volume" type="range" min="0" max="1" step="0.01" value="1">
  `;

  container.appendChild(waveformDiv);
  container.appendChild(controlsDiv);

  const wavesurfer = WaveSurfer.create({
    container: `#${containerId}-waveform`,
    waveColor: "#ccc",
    progressColor: "#2196f3",
    height: 80
  });

  wavesurfer.load(audioFilePath);

  document.getElementById(`${containerId}-play`).addEventListener("click", () => {
    wavesurfer.playPause();
  });

  document.getElementById(`${containerId}-volume`).addEventListener("input", (e) => {
    wavesurfer.setVolume(e.target.value);
  });
}
