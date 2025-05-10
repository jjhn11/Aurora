<template>
    <section class="footer-copyright">
      <p class="footer-copyright__text">
        © 2025 Sunware. Todos Los Derechos Reservados
      </p>
    </section>
  </template>
  
  <script setup>
  // Component for the copyright section of the footer
  </script>
  
  <style scoped>
  .footer-copyright {
    background-color: rgba(0, 14, 50, 1);
    margin-top: 30px;
    width: 100%;
    padding: 21px 28px;
    font-family: "Nunito Sans", sans-serif;
    font-size: 20px;
    color: rgba(255, 255, 255, 1);
    font-weight: 600;
  }
  
  .footer-copyright__text {
    margin: 0;
  }
  
  @media (max-width: 991px) {
    .footer-copyright {
      max-width: 100%;
      padding: 21px 20px;
    }
    .footer-copyright__text {
      font-size: 15px;
    }
  }

  @media (max-width: 576px) {
    .footer-copyright {
      padding: 15px;
      text-align: center;
    }

    .footer-copyright__text {
      font-size: 14px;
    }
  }
  </style>
  