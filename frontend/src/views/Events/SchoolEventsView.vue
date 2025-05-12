<script setup>
import Calendar from '@/components/Events/Calendar/Calendar.vue';
import EventsList from '@/components/Events/EventsList.vue';
import SearchBar from '@/components/SearchBar.vue';
import HeroVideo from '@/components/Events/HeroVideo.vue';
const bannerImage = new URL('@/assets/img/events/Banner.png', import.meta.url).href;
</script>
<template>
    <HeroVideo :img="bannerImage" title="ESCOLARES" />
    <EventsList 
        category="Escolar"
        :imageField="'Image_url'"
    />
    <br><br>
    <Calendar nombre="eventsSchool" category="Escolar"/>
</template>