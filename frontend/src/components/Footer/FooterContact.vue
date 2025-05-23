<script setup>
// Component for the contact information section of the footer
</script>

   

<template>
  
  <section class="footer-contact">
    
    <div class="footer-contact__content">

      <h3 class="footer-contact__title">CONTÁCTANOS</h3>

      <div class="footer-contact__email-section">

          <i class="footer-contact__email-icon">
            <i class="fa-solid fa-envelope"></i>
          </i>
          <a href="mailto:cinformacion@itmexicali.edu.mx" class="footer-contact__email">
            cinformacion@itmexicali.edu.mx
          </a>

      </div>

      <div class="footer-contact__phone-section">

          <i class="footer-contact__phone-icon">
            <i class="fa-solid fa-phone"></i>
          </i>
          <a href="tel:6865804920" class="footer-contact__phone">
            686 - 580 -4920 Ext. 4920
          </a>

      </div>

    </div>

  </section>

</template>

   
  
<style scoped>

  .footer-contact {
    display: flex;
    flex-direction: column;
    align-items: center;
    line-height: normal;
  }
  
  .footer-contact__content {
    margin-bottom: auto;
    align-self: center;
  }

  .footer-contact__title {
    text-align: center;
    color: rgba(0, 14, 50, 1);
    font-size: 29px;
    font-family:
      "Josefin Sans",
      -apple-system,
      Roboto,
      Helvetica,
      sans-serif;
    font-weight: bold;
    margin: 0;
  }

  /* Email */
  
  .footer-contact__email-section {
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: start;
    text-align: start;
    flex-grow: 1;
    flex-shrink: 0;
    flex-basis: 0;
    width: fit-content;
    gap: 15px;
    margin-top: 10px;
  }

  .footer-contact__email-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 30px;
    font-size: 26px;
    color: rgba(0, 14, 50, 1);
    margin: 0;
    padding: 0;
  }

  .footer-contact__email {
    color: rgba(0, 71, 255, 1);
    font-size: 18px;
    font-family:
      Nunito Sans,
      -apple-system,
      Roboto,
      Helvetica,
      sans-serif;
    margin: 2px 0;
    text-decoration: none;
    transition: text-decoration 0.3s;
  }
  
  /* Phone */

  .footer-contact__phone-section {
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: start;
    text-align: start;
    flex-grow: 1;
    flex-shrink: 0;
    flex-basis: 0;
    width: fit-content;
    gap: 15px;
    margin-top: 30px;
  }
  
  .footer-contact__phone-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 30px;
    font-size: 22px;
    color: rgba(0, 14, 50, 1);
    margin: 0;
    padding: 0;
  }
  
  .footer-contact__phone {
    color: rgba(0, 71, 255, 1);
    font-size: 18px;
    font-family:
      Nunito Sans,
      -apple-system,
      Roboto,
      Helvetica,
      sans-serif;
    margin: 2px 0;
    text-decoration: none;
    transition: text-decoration 0.3s;
  }
  
  .footer-contact__phone:hover,.footer-contact__email:hover {
    text-decoration: underline;
  }


  
  @media (max-width: 991px) {

    .footer-contact {
      margin-top: 20px;
      width: 100%;
    }
  
    .footer-contact__email-section {
      display: flex;
      align-items: center;
      justify-content: center;
    }

  }

  @media (max-width: 576px) {
    
    .footer-contact {
      text-align: center;
      width: 100%;
      margin: 0;
      padding: 0 15px;
    }

    .footer-contact__title {
      text-align: center;
      font-size: 29px;
    }
    
    .footer-contact__email {
      font-size: 16px;
      margin: 5px 0px;
      text-decoration: none;
      transition: text-decoration 0.3s;
      word-break: break-all;
    }

    .footer-contact__email-section {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      flex-grow: 1;
      flex-shrink: 0;
      flex-basis: 0;
      width: fit-content;
      gap: 15px;
    }

    .footer-contact__title {
      justify-content: center;
      font-size: 24px;
    }

    .footer-contact__phone {
      font-size: 16px;
      margin: 5px 0px;
      text-decoration: none;
      transition: text-decoration 0.3s;
      word-break: break-all;
    }
    
    .footer-contact__phone-section {
      align-self: center;
      display: flex;
      margin-top: 10px;
      align-items: center;
      gap: 15px;
      font-size: 18px;
    }
  }

</style>