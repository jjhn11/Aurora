<template>
  <div class="not-found">
    <div class="not-found__content">
      <div class="not-found__text">
        <h1>404</h1>
        <h2>¡Ups! Página no encontrada</h2>
        <p class="not-found__message">
          Parece que te has perdido en la biblioteca. 
          La página que buscas no existe o ha sido movida.
        </p>
      </div>

      <div class="not-found__animation">
        <img 
          src="@/assets/img/library/bufalito2.png" 
          class="img-bufalito" 
          alt="Búfalo buscando"
        >
        <div class="search-animation">
          <div class="magnifier"></div>
        </div>
      </div>

      <div class="not-found__actions">
        <RouterLink to="/" class="btn btn-primary">
          <i class="bi bi-house-fill me-2"></i>
          Regresar al inicio
        </RouterLink>
        <RouterLink to="/biblioteca" class="btn btn-outline">
          <i class="bi bi-book-fill me-2"></i>
          Ir a la biblioteca
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.not-found {
  min-height: 85vh; /* Reduced from 90vh */
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  padding: 1.5rem; /* Reduced from 2rem */
}

.not-found__content {
  max-width: 1000px; /* Increased from 800px */
  text-align: center;
  padding: 2rem 3rem; /* Adjusted padding to give more horizontal space */
  border-radius: 20px;
  background: white;
  box-shadow: 0 10px 30px rgba(0, 14, 50, 0.1);
}

.not-found__text h1 {
  font-size: 7rem; /* Slightly reduced from 8rem */
  font-weight: 800;
  background: linear-gradient(45deg, #000E32, #0047FF);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0;
  line-height: 1;
}

.not-found__text h2 {
  font-size: 2.25rem; /* Slightly reduced from 2.5rem */
  color: #000E32;
  margin-bottom: 1rem; /* Reduced from 1.5rem */
  font-family: "Josefin Sans", sans-serif;
}

.not-found__message {
  font-family: "Nunito Sans", sans-serif;
  font-size: 1.25rem;
  color: #6c757d;
  margin-bottom: 1.5rem; /* Reduced from 2rem */
  max-width: 800px; /* Added to control text width */
  margin-left: auto;
  margin-right: auto;
}

.not-found__animation {
  position: relative;
  margin: 2rem 0; /* Reduced from 3rem */
}

.img-bufalito {
  width: 180px; /* Reduced from 200px */
  height: auto;
  animation: float 3s ease-in-out infinite;
}

.not-found__actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
}

.btn {
  font-family: "Josefin Sans", sans-serif;
  font-weight: 700;
  font-size: 1.1rem;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
}

.btn-primary {
  background-color: #000E32;
  color: white;
  border: none;
}

.btn-primary:hover {
  background-color: #FBE326;
  color: #000E32;
  transform: translateY(-2px);
}

.btn-outline {
  border: 2px solid #000E32;
  color: #000E32;
  background: transparent;
}

.btn-outline:hover {
  background-color: #000E32;
  color: white;
  transform: translateY(-2px);
}

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
}

@media (max-width: 768px) {
  .not-found__content {
    padding: 1.5rem;
    width: 95%;
  }

  .not-found__text h1 {
    font-size: 5rem; /* Reduced from 6rem */
  }

  .not-found__text h2 {
    font-size: 1.75rem; /* Reduced from 2rem */
  }

  .not-found__message {
    font-size: 1.1rem;
    margin-bottom: 1rem;
  }

  .not-found__animation {
    margin: 1.5rem 0;
  }

  .img-bufalito {
    width: 130px; /* Reduced from 150px */
  }
}
</style>