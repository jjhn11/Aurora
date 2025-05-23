<style>
  @import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Freeman&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Inria+Sans:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap');
</style>
<template>
    <div class="book-card">
      <RouterLink :to="`/biblioteca/libro/${id}`" class="book-link">
        <div class="book-cover">
            <img :src="coverImage" :alt="title" class="book-image" />
        </div>
        <div class="book-info">
            <h3 class="book-title">{{ title }}</h3>
            <p class="book-description">{{ description }}</p>
        </div>
      </RouterLink>
    </div>
</template>

<style>
.book-card a {
  text-decoration: none;
}
.book-card{
    width: 100%;
    height: 60%;
    background-color: white;
    border-radius: 12px;
}
.book-cover{
    width: auto;
    height: 100%;
    object-fit: cover;
    margin-bottom: 15px;
}
.book-image{
    width: 100%;
    height: 100%;
    border-radius: 7px;
}
.book-title {
  color: #000E32;
    font-weight: 400;
    font-size: 16px;
    width: 100%;
    height: 30px;
    font-family: "Josefin Sans";
    text-align: left;
}    
.book-description {
  color: #575757;
    font-weight: 300;
    font-size: 12px;
    width: 103px;
    height: 40px;
    font-family: "Nunito Sans", sans-serif;
    text-align: left;
}
/*BookList cards (catalogo) */
.custom-book-style .book-card{
    height: 75%;
    width: 85%;
    background-color: white;
    padding: 10px;
}
.custom-book-style .book-cover{
    width: 100%;
    height: 75%;
    object-fit: cover;
    margin-bottom: 15px;
}
.custom-book-style .book-image{
    width: 100%;
    height: 100%;
    border-radius: 10px;
}
.custom-book-style .book-title {
    font-weight: 400;
    font-size: 16px;
    width: auto;
    height: auto;
    font-family: "Josefin sans";
    text-align: center;
}    
.custom-book-style .book-description {
    font-weight: 300;
    font-size: 12px;
    width: auto;
    font-family: "Nunito sans";
    text-align: center;
}
@media (max-width:1400px) {
  .custom-book-style .book-cover{
      width: 100%;
      height: 70%;
      object-fit: cover;
  }
  .custom-book-style .book-title {
      height: 120%;
  }    
}
@media (max-width: 768px) {
  .custom-book-style .book-card{
    height: 100%;
    width: 95%;
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    padding: 10px;
}
  .custom-book-style .book-cover{
      width: 100%;
      height: 70%;
      object-fit: cover;
  }
  .custom-book-style .book-image{
      width: 100%;
      height: 100%;
      border-radius: 10px;
  }
  .custom-book-style .book-title {
      font-weight: 400;
      font-size: 12px;
      height: 100%;
      width: auto;
      font-family: "Josefin sans";
      text-align: center;
  }    
  .custom-book-style .book-description {
      font-weight: 300;
      font-size: 12px;
      height: 100%;
      width: auto;
      font-family: "Nunito sans";
      text-align: center;
  }
  .book-title {
    color: #000E32;
      font-weight: 400;
      font-size: 16px;
      width: 100%;
      height: auto;
      font-family: "josefin sans";
      text-align: center;
  }    
  .book-description {
    color: #575757;
      font-weight: 300;
      font-size: 12px;
      width: 100%;
      font-family: "Nunito sans";
      text-align: center;
  }
}
</style>

 <script setup>
defineProps({
  id: {
    type: [String, Number],
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
  author: {
    type: String,
    required: false,
    default: ''
  }
});
</script>