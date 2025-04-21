<template>
  <div class="h-100" :class="{ 'other-month': isOtherMonth }">
    <div v-if="date" class="fw-bold mb-1">{{ date }}</div>
    <ul v-if="events.length" class="list-unstyled text-primary mb-0">
      <li v-for="(event, i) in events" :key="i">- {{ event }}</li>
    </ul>
  </div>
</template>
  
  <script>
  export default {
    props: {
  date: Number,
  events: {
    type: Array,
    default: () => []
  },
  isOtherMonth: {
    type: Boolean,
    default: false
  }
}

  };
  </script>
  
  <style scoped>
  ul {
    font-size: 0.7rem;
    line-height: 1.1;
    text-align: left;
  }
  .other-month {
  opacity: 0.4;
}

  </style>
  