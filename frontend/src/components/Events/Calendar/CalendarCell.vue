<template>
  <div class="h-100 cell-content" :class="{ 'other-month': isOtherMonth }">
    <div v-if="date" class="fw-bold mb-1 date-number">{{ date }}</div>
    
    <!-- Eventos como texto (visible solo en >=1076px) -->
    <ul class="list-unstyled text-primary mb-0 events-list" v-if="events.length">
      <li v-for="(event, i) in events" :key="i">- {{ event }}</li>
    </ul>

    <div class="event-markers" v-if="events.length">
      <div 
        v-for="(event, i) in events" 
        :key="i" 
        class="event-marker"
        :style="{ backgroundColor: getEventColor(event) }"
        :title="event"
      ></div>
    </div>
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
  },
  methods: {
    getEventColor(event) {
      let hash = 0;
      for (let i = 0; i < event.length; i++) {
        hash = event.charCodeAt(i) + ((hash << 5) - hash);
      }
      return `hsl(${hash % 360}, 70%, 70%)`;
    }
  },
};
</script>

<style scoped>
.other-month {
  opacity: 0.4;
}

.event-container {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.event-marker {
  width: 100%;
  height: 12px;
  border-radius: 2px;
}

ul {
  font-size: 0.7rem;
  line-height: 1.1;
  margin: 0;
  padding-left: 15px;
}

@media (max-width: 1076px) {
  .event-container {
    display: none;
  }
}

.event-markers {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-top: 2px;
}

.event-marker {
  width: 100%;
  height: 10px;
  border-radius: 2px;
  cursor: help;
}

.cell-content {
  padding: 3px;
  position: relative;
}

.date-number {
  font-size: 0.9rem;
}
.event-markers {
  display: none;
}
.events-list {
  display: block;
}
.events-list {
  font-size: 0.65rem;
  line-height: 1.2;
}

@media (max-width: 876px) {
  .event-markers {
    display: flex;
    flex-direction: column;
    gap: 2px;
    margin-top: 2px;
  }
  .events-list {
    display: none;
  }
}
</style>