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
     <!-- </RouterLink> -->
    </div>
</template>

<style scoped>
.card{
    background-color: #F8F7F7;
    width: 418px;
    height: 424px;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    padding: 0px;
}
.card-cover{
    width: 418px;
    height: 235px;
    margin-bottom: 15px;
}
.card-image{
    width: 100%;
    height: 220px;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
}
.card-title {
    margin-bottom: 5px;
    font-weight: 400;
    font-size: 26px;
    width: 402px;
    height: 40px;
    font-family: "freeman";
    text-align:center;
}    
.card-description {
    font-weight: 400;
    font-size: 18px;
    padding-left: 10px;
    width: 396px;
    height: 124px;
    color: #0047FF;
    text-align: justify;
    font-family: "Nunito sans";
}
</style>

  <script>
  export default {
    name: 'Card',
    props: {
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