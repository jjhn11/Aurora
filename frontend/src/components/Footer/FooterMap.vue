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
          <!-- No header - just the image and close button -->
          <div class="map-container position-relative">
            <!-- Close button overlaid on image -->
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
  
  /* Custom fullscreen modal class */
  .custom-fullscreen-modal {
    width: 100vw;
    height: 100vh;
    max-width: none;
    margin: 0;
    padding: 0;
  }
  
  .content-bg{
    background-color: transparent;
  }
  
  .map-container {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.9);
  }
  
  .custom-full-map {
    max-width: 95;
    max-height: 95vh;
    object-fit: contain;
    display: block;
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
  </style>