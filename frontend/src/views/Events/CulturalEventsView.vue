<script setup>
import Calendar from '@/components/Events/Calendar/Calendar.vue';
import EventsList from '@/components/Events/EventsList.vue';
import SearchBar from '@/components/SearchBar.vue';
import HeroVideo from '@/components/Events/HeroVideo.vue';
const bannerImage = new URL('@/assets/img/events/Banner.png', import.meta.url).href;
</script>
<template>
    <HeroVideo :img="bannerImage" title="CULTURALES" />
    <EventsList 
        category="Cultural"
        :imageField="'Image_url'"
    />
    <Calendar nombre="eventsCultural" category="Cultural"/>
</template>