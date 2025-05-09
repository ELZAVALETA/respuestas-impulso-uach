function showSection(event, sectionId) {
  // Oculta todas las secciones
  document.querySelectorAll('.content-section').forEach(section => {
    section.classList.remove('active');
  });

  // Muestra la sección seleccionada
  document.getElementById(sectionId).classList.add('active');

  // Actualiza el botón activo
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  event.target.classList.add('active');
}
