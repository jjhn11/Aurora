<script setup>
  import logo from '@/assets/img/navbar/LogoAurora.png';
</script>

   

<template>
  <section class="footer-logo">
    <div class="footer-logo__content">
      <div class="footer-logo__header">
        <img :src="logo" alt="Aurora Logo" class="footer-logo__image" />
        <h2 class="footer-logo__title">AURORA</h2>
      </div>
      <p class="footer-logo__description">
        Se brida un servicio de apoyo al área de conocimiento, para facilitar el
        acceso a la información y el conocimiento, por medio de bibliograficas
        actualizadas y servicios de información.
      </p>
    </div>
  </section>
</template>

   

<style scoped>
  .footer-logo {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
    margin-top: 20px;
    line-height: normal;
    width: 47%;
    margin-left: 0px;
  }
  
  .footer-logo__content {
    width: 100%;
    color: rgba(0, 14, 50, 1);
    font-weight: 700;
  }
  
  .footer-logo__header {
    display: flex;
    justify-content: center;
    width: 100%;
    max-width: 100%;
    align-items: center;
    text-align: center;
    gap: 2px;
    font-family:
      Cinzel Decorative,
      -apple-system,
      Roboto,
      Helvetica,
      sans-serif;
    font-size: 32px;
    white-space: nowrap;
  }
  
  .footer-logo__image {
    aspect-ratio: 2.47;
    object-fit: contain;
    object-position: center;
    width: 175px;
    flex-shrink: 0;
    max-width: 100%;
  }
  
  .footer-logo__title {
    align-self: stretch;
    margin-top: 12px;
    padding: 10px 10px 10px 10px;
    font-size: 32px;
    font-weight: 700;
  }
  
  .footer-logo__description {
    font-size: 18px;
    font-family:
      Nunito Sans,
      -apple-system,
      Roboto,
      Helvetica,
      sans-serif;
    margin-top: 20px;
    font-weight: 600;
    text-align: justify;
  }
  
  @media (max-width: 991px) {
    .footer-logo {
      width: 100%;
    }
  
    .footer-logo__content {
      max-width: 100%;
    }
  
    .footer-logo__header {
      width: 100%;
      white-space: initial;
    }
  
    .footer-logo__title {
      white-space: initial;
    }
  
    .footer-logo__description {
      max-width: 100%;
      margin-top: 10px;
      text-align: center;
    }
  }

  @media (max-width: 576px) {

    .footer-logo {
      margin-top: 20px;
      width: 100%;
      padding: 0 15px;
    }

    .footer-logo__header {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      width: 100%;
      max-width: 100%;
      gap: 0px;
      white-space: nowrap;
    }
  
    .footer-logo__image {
      aspect-ratio: 2.47;
      object-fit: contain;
      object-position: center;
      width: 125px;
      height: auto;
      flex-shrink: 0;
      max-width: 100%;
    }
    
    .footer-logo__title {
      font-size: 22px;
      font-weight: 700;
      margin: 0;
      padding: 0px 10px 10px 10px;
    }

    .footer-logo__description {
      font-size: 16px;
      margin: 5px 0;
      text-align: center;
    }
  
  }
</style>
  