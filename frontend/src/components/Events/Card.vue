<style>
  @import url('https://fonts.googleapis.com/css2?family=Freeman&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Inria+Sans:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap');
</style>
<script>
  
  export default {
    name: 'Card',
    props: {
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
    }
  }
</script>

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
     <!-- </RouterLink> -->
    </div>
</template>

<style scoped>
.card{
    background-color: #F8F7F7;
    width: 100%;
    height: auto;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
.card-cover{
    width: 100%;
    height: 50%;
    margin-bottom: 15px;
}
.card-image{
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
}
.card {
  cursor: pointer;
}
.card-title {
    margin-bottom: 5px;
    font-weight: 400;
    font-size: 26px;
    width: 100%;
    height: 40px;
    font-family: "freeman";
    text-align:center;
}    
.card-description {
    font-weight: 400;
    font-size: 18px;
    padding-left: 5%;
    padding-right: 5%;
    width: 100%;
    height: 124px;
    color: #0047FF;
    text-align: justify;
    font-family: "Nunito sans";
}
@media (max-width: 1524px) {
  .card-description{
    font-size: 17px;
  }
}
@media (max-width: 1023px) {
  .card{
    background-color: #F8F7F7;
    width: 100%;
    height: auto;
    border-color: #0047FF;
    border-radius: 20px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    padding: 0px;
    margin-bottom: 8px;
  }
  .card-cover{
    width: 100%;
    min-height: 60%;
    margin-bottom: 6px;
  }
  .card-image{
      width: 100%;
      height: 100%;
      border-top-right-radius: 20px;
      border-top-left-radius: 20px;
  }
  .card-title {
    margin-bottom: 8px;
    font-weight: 700;
    font-size: 14px;
    height: auto;
    font-family: "freeman";
    text-align: center;
  } 
  .card-description {
    display: none;
  }
}
@media (max-width: 476px) {
  .card-title{
    font-size:10px;
  }
}
</style>