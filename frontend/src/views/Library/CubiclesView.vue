<script setup>
import HeroVideo from '@/components/Events/HeroVideo.vue';
import CubicleCard from '@/components/Library/CubicleCard.vue';
import CubicleCard2 from '@/components/Library/CubicleCard2.vue';

const bannerImage = new URL('@/assets/img/library/cubiclesImage.jpg', import.meta.url).href;
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Crimson+Text:wght@400;600;700&family=Josefin+Sans:wght@400;600&display=swap');
</style>
<template>
    <HeroVideo :img="bannerImage" title="CUBICULOS" />
    <br><br>
    <h1 class="text">HORARIO DISPONIBLE:      7 a.m. - 9 p.m.</h1>
    <br>
    <CubicleCard />
    <br><br>
    <CubicleCard2 />
    <br><br>
    <div class="button-container">
      <button class="outline-button">RESERVAR CUBÍCULO</button>
    </div>
</template>
<style scoped>
.text {
    margin-top: 5%;
    margin-bottom: 7%;
    text-align: center;
    font-weight: 700;
    size: 64px;
    font-family: "crimson text";
}
.button-container {
    display: flex;
    justify-content: center;
    margin-top: 5%; 
    margin-bottom: 10%; 
}

.outline-button {
    width: 30%;
    height: 20%;
    background-color: transparent;
    color: rgb(0, 0, 0);           
    border: 2px solid rgb(0, 0, 0);       
    padding: 10px 10px;
    border-radius: 20px;
    cursor: pointer;
    font-size: 35px;
    font-weight: 700;
    font-family: "nunito sans";
}

@media (max-width:576px) {
    .text {
        font-size: 25px;
    }
    .outline-button {
        width: 70%;
        border-radius: 30px;
        font-size: 20px;
    }
}

</style>