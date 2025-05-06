<template>
  <!-- Clickable thumbnail image -->
  <img 
    src="@/assets/img/footer/tec-map.png" 
    alt="Mapa del TecNM" 
    class="img-fluid cursor-pointer" 
    data-bs-toggle="modal" 
    data-bs-target="#mapModal"
  >
  
  <!-- Custom Fullscreen Map Modal -->
  <div class="modal fade" id="mapModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog custom-fullscreen-modal">
      <div class="modal-content content-bg p-0 border-0">
        <div class="map-container position-relative">
          <!-- Close button -->
          <button 
            type="button" 
            class="btn-close map-close-btn" 
            data-bs-dismiss="modal" 
            aria-label="Close"
          ></button>

          <!-- Full-size image -->
          <img 
            src="@/assets/img/footer/full-tec-map.jpeg" 
            alt="Mapa completo del TecNM" 
            class="custom-full-map"
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}

.custom-fullscreen-modal {
  width: 100vw;
  height: 100vh;
  max-width: none;
  margin: 0;
  padding: 0;
  overflow: auto;
}

.content-bg {
  background-color: transparent;
}

.map-container {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  box-sizing: border-box;
}

.custom-full-map {
  max-width: 95vw;
  max-height: 90vh;
  object-fit: contain;
  display: block;
  border-radius: 8px;
}

.map-close-btn {
  position: absolute;
  top: 15px;
  right: 15px;
  z-index: 1050;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  width: 2.5rem;
  height: 2.5rem;
}

.map-close-btn:hover {
  background-color: white;
  transform: scale(1.1);
}

@media (max-width: 576px) {
  .custom-full-map {
    max-width: 100vw;
    max-height: 80vh;
  }

  .map-close-btn {
    top: 10px;
    right: 10px;
    width: 2rem;
    height: 2rem;
  }
}
</style>
