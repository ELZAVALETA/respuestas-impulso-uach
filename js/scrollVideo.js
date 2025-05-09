const video = document.getElementById("scrollVideo");
video.pause(); // evita reproducción automática
video.currentTime = 0;

// Espera a que se pueda reproducir
video.addEventListener('loadedmetadata', () => {
  const duration = video.duration;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const scrollFraction = scrollTop / maxScroll;
    const videoTime = duration * scrollFraction;
    video.currentTime = videoTime;
  });
});
