<script setup>
defineProps({
  id: {
    type: [String, Number],
    required: true
  },
  image: {
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
  }
});
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Freeman&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Inria+Sans:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap');
</style>
<template>
  <div class="card">
    <div class="card-cover">
      <img :src="image" :alt="title" class="card-image" />
    </div>
    <div class="card-info">
      <h3 class="card-title">{{ title }}</h3>
      <p class="card-description">{{ description }}</p>
    </div>
    <div class="card-footer">
      <a class="btn-read-more" @click="$emit('openModal')">Leer más...</a>
    </div>
  </div>
</template>

<style scoped>
.card {
  background-color: #F3F4F5;
  width: 100%;
  min-height: 450px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin-bottom: 5%;
}

.card-cover {
  flex: 0 0 auto;
}

.card-image {
  object-fit: cover;
  object-position: center top;
  width: 100%;
  height: 220px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  margin-bottom: 5px;
}

.card-info {
  flex: 1 1 auto;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
}

.card-title {
  font-family: 'Freeman', sans-serif;
  font-weight: 400;
  text-transform: uppercase;
  font-size: 23px;
  color: #1a1a1a;
  margin: 8px 0;
}

.card-description {
  text-align: justify;
  font-family: 'Inria Sans', sans-serif;
  font-weight: 400;
  font-size: 15px;
  color: #7e8382;
  margin: 8px 0;
}

.card-footer {
  margin-top: auto;
  background-color: #D9D9D9;
  text-align: right;
  padding: 14px;
}

.btn-read-more {
  font-size: 14px;
  text-decoration: none;
  color: #007bff;
  font-weight: bold;
  cursor: pointer;
}

.btn-read-more:hover {
  text-decoration: underline;
}

/* Responsivo para mmedianas */
@media (max-width: 1176px) {
  .card {
    min-height: 450px;
  }

  .card-image {
    height: 180px;
  }

  .card-title {
    font-size: 18px;
  }

  .card-description {
    font-size: 14px;
  }

  .btn-read-more {
    font-size: 13px;
  }
}
/* Responsivo para celulares */
@media (max-width: 776px) {
  .card {
    min-height: 300px;
  }

  .card-image {
    height: 180px;
  }

  .card-title {
    font-size: 18px;
  }

  .card-description {
    font-size: 14px;
  }

  .btn-read-more {
    font-size: 13px;
  }
}
</style>