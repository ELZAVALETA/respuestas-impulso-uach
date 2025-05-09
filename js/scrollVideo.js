const video = document.getElementById('scrollVideo');

// Espera a que los metadatos del video estén cargados
video.addEventListener('loadedmetadata', () => {
  const duration = video.duration;

  let isVideoHovered = false; // Variable para verificar si el cursor está sobre el video

  const onScroll = () => {
    if (!isVideoHovered) {
      const scrollTop = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const scrollFraction = scrollTop / maxScroll;

      const videoTime = duration * scrollFraction;
      video.currentTime = videoTime;
    }
  };

  // Escucha el evento de scroll
  window.addEventListener('scroll', onScroll);

  // Detecta si el cursor está sobre el video
  video.addEventListener('mouseenter', () => {
    isVideoHovered = true;
    // Desactiva el scroll de la página mientras el cursor está sobre el video
    document.body.style.overflow = 'hidden';
  });

  video.addEventListener('mouseleave', () => {
    isVideoHovered = false;
    // Reactiva el scroll de la página cuando el cursor sale del video
    document.body.style.overflow = 'auto';
  });
});
