<script setup>
import HeroVideo from '@/components/Events/HeroVideo.vue';
import Carousel1 from '@/components/Events/Carousel1.vue';
import Carousel2 from '@/components/Events/Carousel2.vue';
import Carousel3 from '@/components/Events/Carousel3.vue';
import Calendar from '@/components/Events/Calendar/Calendar.vue';
import EventsPages from '@/components/Events/EventsList.vue';

const bannerImage = new URL('@/assets/img/events/Banner.png', import.meta.url).href;
</script>

<template>
<HeroVideo :img="bannerImage" title="EVENTOS" />

<br><br>
<div class="container">
    <h1 class="title">CULTURALES</h1>
    <!--Carrusel-->
    <Carousel1 />
    <br><br>
</div>
<div class="container">
    <h1 class="title">ESCOLARES</h1>
    <!--Carrusel-->
    <Carousel2 />
    <br><br>
</div>
<div class="container">
    <h1 class="title">DEPORTIVOS</h1>
    <!--Carrusel-->
    <Carousel3 />
    <br><br>
</div>
<div class="container">
    <h1 class="title">CALENDARIO</h1>
    <!--Carrusel-->
    <Calendar nombre="events"/>
    <br><br>
</div>
</template>
<style scoped>
.title {
    font-family: 'Josefin Sans';
    font-weight: 700;
    font-size: 40px;
}
</style>