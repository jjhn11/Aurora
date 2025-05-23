<script setup>
  import face from '@/assets/img/footer/fb.png';
  import insta from '@/assets/img/footer/insta.png';
  import yutu from '@/assets/img/footer/youtube.png';
  import school from '@/assets/img/footer/school-sharp.png';
</script>

   

<template>
    <section class="footer-social">
      <h3 class="footer-social__title">SIGUENOS</h3>

      <div class="footer-social__icons">

        <div class="button-space col-3">
          <a href="https://www.facebook.com/profile.php?id=100063534524546&locale=es_LA " class="btn footer-social__button">
            <img :src="face" class="img fb" alt="">
          </a>
        </div>

        <div class="button-space col-3">
          <a href="https://www.instagram.com/aurora.mxli/" class="btn footer-social__button" >
            <img :src="insta" class="img ig" alt="">
          </a>
        </div>

        <div class="button-space col-3">
          <a href="https://www.youtube.com/@tecnmcampusmexicali7369" class="btn footer-social__button">
            <img :src="yutu" class="img yt" alt="">
          </a>    
        </div>

        <div class="button-space col-3">
          <a href="http://www.itmexicali.edu.mx" class="btn footer-social__button">
            <img :src="school" class="img sch" alt="">
          </a>
        </div>

      </div>

    </section>
</template>

   

<style scoped>
  .footer-social {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-top: 40px;
  }
  
  .footer-social__title {
    color: rgba(0, 14, 50, 1);
    font-size: 29px;
    font-family:
      "Josefin Sans",
      -apple-system,
      Roboto,
      Helvetica,
      sans-serif;
    font-weight: 700;
    margin-bottom: 20px;
  }

  .footer-social__icons {
    display: flex;
    justify-content: center;
    align-items: center;

    .button-space {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0px 50px;

      .footer-social__button {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: transparent;
        border: none;
        cursor: pointer;

        width: 35px;
        height: 35px;

        .fb {
          width: 35px;
          height: auto;
        }
        .ig {
          width: 34.25px;
          height: auto;
        }
        .yt {
          width: 38px;
          height: auto;
        }
        .sch {
          width: 42.5px;
          height: auto;
        }
      }
    }
  }
  
  .footer-social__image {
    aspect-ratio: 7.87;
    object-fit: contain;
    object-position: center;
    width: 473px;
    max-width: 100%;
  }

  @media (max-width: 576px) {
    .footer-social {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .footer-social__icons {
      justify-content: center;
      width: 100%;

      .button-space {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0px 20px;

        .footer-social__button {
          
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: transparent;
          border: none;
          cursor: pointer;

          width: 35px;
          height: 35px;

          .fb {
            width: 27px;
            height: auto;
          }
          .ig {
            width: 26.25px;
            height: auto;
          }
          .yt {
            width: 30px;
            height: auto;
          }
          .sch {
            width: 34.5px;
            height: auto;
          }
        }
      }
    }

    .footer-social__image {
      width: 280px;
    }

    .footer-social__title {
      display: none;
    }
  }
</style>
  