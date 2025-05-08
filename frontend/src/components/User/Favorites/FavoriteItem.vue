<script setup>
  defineProps({
    id: {
      type: String,
      required: true
    },

    coverImage: {
      type: String,
      required: true,
      default: 'https://t4.ftcdn.net/jpg/01/15/20/75/360_F_115207580_US2etunH78I7iMYHOoNVvxQTCIdoPdRj.jpg'
    },

    title: {
      type: String,
      required: true,
      default: 'Título desconocido'
    },

    description: {
      type: String,
      required: false,
      default: ''
    },

    addedDate: {
      type: String,
      required: true,
      default: 'XX/XX/XXXX'
    },


  });

</script>



<template>
    <article class="favorite-item">

      <div class="item-container">
        <img :src="coverImage" :alt="title" class="item-image" id="lib"/>
        <div class="item-content">

          <h2 class="item-title">{{ title }}</h2>
          <p class="item-description">{{ description }}</p>
          <p class="item-type">TIPO:</p>
          <p class="item-date">AGREGADO EL: <span>{{ addedDate }}</span></p>
          
          <div class="item-footer">

            <p class="comments-label">COMENTARIOS:</p>
            <div class="action-buttons">

              <RouterLink :to="`/library/book/${id}`" class="read-again-button">VOLVER A LEER</RouterLink>
              <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/0944cfdc59e7ceb4e7afad05d7d30d81b467aecd?placeholderIfAbsent=true&apiKey=31e7b46c22c443bc84c06a4f4720155e" alt="Action" class="action-icon" />
            
            </div>

          </div>

        </div>

      </div>

    </article>

</template>



<style scoped>

  .favorite-item {
    background-color: #ffffff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    width: 100%;
    padding: 16px 12px 6px 30px;
  }
  
  .item-container {
    display: flex;
    gap: 20px;
  }
  
  .item-image {
    aspect-ratio: 0.78;
    object-fit: contain;
    width: 281px;
    border-radius: 10px;
  }

  img#lib {
    width: 500px;
    height: 500px;
  }
  
  .item-content {
    display: flex;
    margin-top: 24px;
    flex-direction: column;
    align-items: start;
    font-family:
      "Nunito Sans",
      -apple-system,
      Roboto,
      Helvetica,
      sans-serif;
    font-size: 24px;
    font-weight: 700;
  }
  
  .item-title {
    color: #000000;
    font-size: 36px;
    font-family:
      "Josefin Sans",
      -apple-system,
      Roboto,
      Helvetica,
      sans-serif;
    font-weight: 400;
    letter-spacing: 0.72px;
  }
  
  .item-description {
    color: #000e32;
    font-weight: 600;
    margin-top: 34px;
  }
  
  .item-type {
    color: #000000;
    letter-spacing: 0.48px;
    margin-top: 31px;
  }
  
  .item-date {
    color: #000000;
    letter-spacing: 0.48px;
    margin-top: 42px;
  }
  
  .item-date span {
    font-weight: 400;
  }
  
  .item-footer {
    display: flex;
    margin-top: 31px;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    letter-spacing: 0.48px;
  }
  
  .comments-label {
    color: #000000;
  }
  
  .action-buttons {
    display: flex;
    align-items: center;
    gap: 31px;
  }
  
  .read-again-button {
    border-radius: 50px;
    background-color: #0047ff;
    border: 2px solid #0047ff;
    padding: 17px 21px;
    color: #ffffff;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    cursor: pointer;
  }
  
  .action-icon {
    aspect-ratio: 1.06;
    object-fit: contain;
    width: 53px;
  }
  
  @media (max-width: 991px) {
    .favorite-item {
      padding: 20px;
    }
  
    .item-container {
      flex-direction: column;
    }
  
    .item-image {
      margin-top: 40px;
    }
  
    .item-content {
      margin-top: 40px;
    }
  
    .item-footer {
      flex-wrap: wrap;
      gap: 20px;
    }
  }

</style>