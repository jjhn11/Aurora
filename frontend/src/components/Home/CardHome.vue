<script setup>
defineProps({
  id: {
    type: String,
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
      <!--<RouterLink to="/library/book" class="book-link"> -->
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
     <!-- </RouterLink> -->
    </div>
    
</template>
<style scoped>
.freeman-regular {
  font-family: "Freeman", sans-serif;
  font-weight: 400;
  font-style: normal;
}
.card:hover {
    transform: translateY(-5px);
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
.card {
    background-color: #F3F4F5;
    /* width: 436px; */
    /*height: 400px; */
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease-out;
    flex: 0 0 auto;
    margin: 0 auto;
    padding: 0;
}
.card-image {
    height: 191px;
    width: 389px; 
    object-position: center top;
    object-fit: cover;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    margin-bottom: 5px;
}
.card-title {
    text-align: center;
    font-family:'Freeman';
    font-weight:400;
    line-height: 100%;
    text-transform: uppercase;
    font-size: 23px;
    color: #1a1a1a;
}

.card-footer{
    background-color: #D9D9D9;
    text-align: right;
    padding: 14px;
}

.card-description {
    font-family: 'Inria sans';
    font-weight: 400;
    font-size: 15px;
    color: #7e8382;
}
</style>