const video = document.getElementById('scrollVideo');

// Espera a que los metadatos del video estén cargados
video.addEventListener('loadedmetadata', () => {
  const duration = video.duration;

  const onScroll = () => {
    const scrollTop = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const scrollFraction = scrollTop / maxScroll;

    const videoTime = duration * scrollFraction;
    video.currentTime = videoTime;
  };

  // Escucha scroll y ejecuta función
  window.addEventListener('scroll', onScroll);
});
