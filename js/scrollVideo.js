const video = document.getElementById("scrollVideo");
video.pause();
video.currentTime = 0;

video.addEventListener('loadedmetadata', () => {
  const duration = video.duration;
  const sensitivity = 1.5; // Ajusta aquí (1 = directo, >1 = más lento)

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const scrollFraction = scrollTop / maxScroll;
    const videoTime = Math.min(duration, duration * scrollFraction * sensitivity);
    video.currentTime = videoTime;
  });
});
