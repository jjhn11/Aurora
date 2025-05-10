<template>
    <nav class="footer-nav">
      <div class="footer-nav__content">
        <h3 class="footer-nav__title">EXPLORAR</h3>
        <ul class="footer-nav__links">
          <li>
            <RouterLink to="/" class="footer-nav__link footer-nav__link--inicio"
              >INICIO</RouterLink
            >
          </li>
          <li>
            <RouterLink to="/biblioteca" class="footer-nav__link footer-nav__link--biblioteca"
              >BIBLIOTECA</RouterLink
            >
          </li>
          <li>
            <RouterLink to="/eventos" class="footer-nav__link footer-nav__link--eventos"
              >EVENTOS</RouterLink
            >
          </li>
          <li>
            <RouterLink to="/comunidad/recreativas" class="footer-nav__link footer-nav__link--comunidad"
              >RECREATIVAS</RouterLink
            >
          </li>
          <li>
            <RouterLink to="/comunidad/deportes" class="footer-nav__link footer-nav__link--comunidad"
              >DEPORTES</RouterLink
            >
          </li>
          <li>
            <RouterLink to="/comunidad/cultural" class="footer-nav__link footer-nav__link--comunidad"
              >CULTURALES</RouterLink
            >
          </li>
          <li>
            <RouterLink to="/comunidad/videojuegos" class="footer-nav__link footer-nav__link--comunidad"
              >VIDEOJUEGOS</RouterLink
            >
            </li>
        </ul>
      </div>
    </nav>
  </template>
  
  <script setup>
  // Component for the navigation links section of the footer
  </script>
  
  <style scoped>
  .footer-nav {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    margin-top: 40px;
    line-height: normal;
    width: 17%;
  }
  
  .footer-nav__content {
    margin-bottom: auto;
    align-self: stretch;
  }
  
  .footer-nav__title {
    color: rgba(0, 14, 50, 1);
    font-size: 29px;
    font-family:
      Crimson Text,
      -apple-system,
      Roboto,
      Helvetica,
      sans-serif;
    font-weight: 700;
    margin: 0 0 20px 0;
  }
  
  .footer-nav__links {
    display: flex;
    min-height: 158px;
    width: 130px;
    max-width: 100%;
    padding: 0;
    flex-direction: column;
    align-items: stretch;
    font-family:
      Nunito Sans,
      -apple-system,
      Roboto,
      Helvetica,
      sans-serif;
    font-size: 18px;

    color: rgba(0, 71, 255, 1);
    font-weight: 800;
    white-space: nowrap;
    justify-content: space-between;
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
  
  .footer-nav__link {
    padding: 5px 0px;
    color: rgba(0, 71, 255, 1);
    text-decoration: none;
    display: inline-block;
    transition:
      background-color 0.3s,
      color 0.3s;
  }
  
  .footer-nav__link:hover {
    color: #FBE326;
  }
  
  .footer-nav__link--inicio,
  .footer-nav__link--eventos {
    align-self: start;
  }
  
  .footer-nav__link--biblioteca,
  .footer-nav__link--comunidad {
    align-self: stretch;
    width: 100%;
  }
  
  .footer-nav__link--comunidad {
    overflow: hidden;
  }
  
  @media (max-width: 991px) {
    .footer-nav {
      width: 100%;
      margin-top: 20px;
    }

    .footer-nav__content {
      display: flex;
      justify-content: center;
      align-items: center;
      align-self: stretch;
      text-align: center;
      flex-direction: column;
      margin-bottom: auto;
    }
  
    .footer-nav__title {
      align-self: center;
    }
  
    .footer-nav__links {
      white-space: initial;
    }
  
    .footer-nav__link {
      white-space: initial;
    }
  }
  </style>
  