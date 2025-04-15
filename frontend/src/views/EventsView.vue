<script setup>
import HeroVideo from '@/components/Events/HeroVideo.vue';
import Carousel1 from '@/components/Events/Carousel1.vue';
import Carousel2 from '@/components/Events/Carousel2.vue';
import Carousel3 from '@/components/Events/Carousel3.vue';
</script>

<template>
<HeroVideo />
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
</template>