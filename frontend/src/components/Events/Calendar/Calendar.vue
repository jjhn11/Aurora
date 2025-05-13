<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import CalendarCell from './CalendarCell.vue';

const store = useStore();

// Props
const props = defineProps({
  nombre: {
    type: String,
    default: 'events'
  },
  category: {
    type: String,
    default: null
  }
});

// State
const currentMonth = ref(new Date().getMonth());
const currentYear = ref(new Date().getFullYear());
const calendarBounds = ref({
  start: null,
  end: null
});
const weekDays = [
  'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'
];

// Get events from store and transform them to calendar format
const storeEvents = computed(() => {
  let events = store.getters['events/getAllEvents'];
  
  // Filter by category if specified
  if (props.category) {
    const categories = store.getters['events/getAllCategories'];
    const categoryObj = categories.find(
      cat => cat.Category_event_name?.toLowerCase() === props.category.toLowerCase()
    );
    
    if (categoryObj) {
      events = store.getters['events/getEventsByCategory'](categoryObj.Id_category);
    }
  }
  
  const calendarEvents = {};

  events.forEach(event => {
    if (event.Event_date) {
      const dateStr = new Date(event.Event_date).toISOString().split('T')[0];
      if (!calendarEvents[dateStr]) {
        calendarEvents[dateStr] = [];
      }
      calendarEvents[dateStr].push(event.Title);
    }
  });

  return calendarEvents;
});

// Computed properties
const eventosSeleccionados = computed(() => {
  return storeEvents.value;
  
  // Combine static and dynamic events
  const staticEvents = {
    events: {
      '2025-01-06': ['INICIO DE LABORES', 'PAGO CURSO C BÚFALO'],
    },
    eventsSports: {
      '2025-01-12': ['Entrenamiento de fútbol'],
      '2025-01-15': ['Torneo interno de básquet'],
    },
    eventsCultural: {
      '2025-01-01': ['Concierto estudiantil'],
      '2025-01-10': ['Exposición de arte'],
    },
    eventsSchool: {
      '2025-01-10': ['Evaluación semestral'],
      '2025-01-20': ['Entrega de proyectos'],
    }
  };

  return props.nombre === 'events' ? storeEvents.value : staticEvents[props.nombre] || {};
});

const monthName = computed(() => {
  return new Date(currentYear.value, currentMonth.value).toLocaleString('es-ES', {
    month: 'long'
  });
});

const calendarGrid = computed(() => {
  const firstDay = new Date(currentYear.value, currentMonth.value, 1);
  const startDay = (firstDay.getDay() + 6) % 7;
  const daysInMonth = new Date(currentYear.value, currentMonth.value + 1, 0).getDate();

  const prevMonth = currentMonth.value === 0 ? 11 : currentMonth.value - 1;
  const prevYear = currentMonth.value === 0 ? currentYear.value - 1 : currentYear.value;
  const daysInPrevMonth = new Date(prevYear, prevMonth + 1, 0).getDate();

  const nextMonth = currentMonth.value === 11 ? 0 : currentMonth.value + 1;
  const nextYear = currentMonth.value === 11 ? currentYear.value + 1 : currentYear.value;

  const grid = [];
  let week = [];

  // Previous month days
  for (let i = startDay - 1; i >= 0; i--) {
    const dateNum = daysInPrevMonth - i;
    const dateStr = `${prevYear}-${String(prevMonth + 1).padStart(2, '0')}-${String(dateNum).padStart(2, '0')}`;
    week.push({ date: dateNum, events: eventosSeleccionados.value[dateStr] || [], isOtherMonth: true });
  }

  // Current month days
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${currentYear.value}-${String(currentMonth.value + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    week.push({ date: day, events: eventosSeleccionados.value[dateStr] || [], isOtherMonth: false });

    if (week.length === 7) {
      grid.push(week);
      week = [];
    }
  }

  // Next month days
  let nextDay = 1;
  while (week.length < 7) {
    const dateStr = `${nextYear}-${String(nextMonth + 1).padStart(2, '0')}-${String(nextDay).padStart(2, '0')}`;
    week.push({ date: nextDay, events: eventosSeleccionados.value[dateStr] || [], isOtherMonth: true });
    nextDay++;
  }
  grid.push(week);

  // Fill remaining weeks
  while (grid.length < 6) {
    const emptyWeek = [];
    for (let i = 0; i < 7; i++) {
      const dateStr = `${nextYear}-${String(nextMonth + 1).padStart(2, '0')}-${String(nextDay).padStart(2, '0')}`;
      emptyWeek.push({ date: nextDay, events: eventosSeleccionados.value[dateStr] || [], isOtherMonth: true });
      nextDay++;
    }
    grid.push(emptyWeek);
  }

  return grid;
});

const uniqueEventsWithColor = computed(() => {
  const monthStr = String(currentMonth.value + 1).padStart(2, '0');
  const yearStr = String(currentYear.value);

  const filteredEvents = Object.entries(eventosSeleccionados.value)
    .filter(([date]) => {
      const [y, m] = date.split('-');
      return y === yearStr && m === monthStr;
    })
    .flatMap(([, events]) => events);

  const uniqueEvents = [...new Set(filteredEvents)];

  return uniqueEvents.map(event => {
    let hash = 0;
    for (let i = 0; i < event.length; i++) {
      hash = event.charCodeAt(i) + ((hash << 5) - hash);
    }
    return {
      name: event,
      color: `hsl(${hash % 360}, 70%, 70%)`
    };
  });
});

// Get calendar bounds from store
const initializeCalendarBounds = async () => {
  try {
    // Fetch calendar events if not already loaded
    const calendarEvents = store.state.events.calendarEvents;
    if (!calendarEvents.length) {
      await store.dispatch('events/fetchCalendarEvents');
    }

    // Get the current calendar period
    const currentDate = new Date();
    const currentCalendar = store.state.events.calendarEvents.find(calendar => {
      const startDate = new Date(calendar.Start_date);
      const endDate = new Date(calendar.End_date);
      return currentDate >= startDate && currentDate <= endDate;
    });

    if (currentCalendar) {
      const startDate = new Date(currentCalendar.Start_date);
      const endDate = new Date(currentCalendar.End_date);
      
      calendarBounds.value = {
        start: startDate,
        end: endDate
      };
    }
  } catch (error) {
    console.error('Error initializing calendar bounds:', error);
  }
};

// Add validation to navigation methods
const canNavigateNext = computed(() => {
  if (!calendarBounds.value.end) return true;
  const nextMonth = currentMonth.value === 11 ? 0 : currentMonth.value + 1;
  const nextYear = currentMonth.value === 11 ? currentYear.value + 1 : currentYear.value;
  const nextDate = new Date(nextYear, nextMonth + 1, 0); // Last day of next month
  return nextDate <= calendarBounds.value.end;
});

const canNavigatePrev = computed(() => {
  if (!calendarBounds.value.start) return true;
  const prevMonth = currentMonth.value === 0 ? 11 : currentMonth.value - 1;
  const prevYear = currentMonth.value === 0 ? currentYear.value - 1 : currentYear.value;
  const prevDate = new Date(prevYear, prevMonth, 1); // First day of prev month
  return prevDate >= calendarBounds.value.start;
});

// Update navigation methods
const nextMonth = () => {
  if (!canNavigateNext.value) return;
  
  if (currentMonth.value === 11) {
    currentMonth.value = 0;
    currentYear.value++;
  } else {
    currentMonth.value++;
  }
};

const prevMonth = () => {
  if (!canNavigatePrev.value) return;
  
  if (currentMonth.value === 0) {
    currentMonth.value = 11;
    currentYear.value--;
  } else {
    currentMonth.value--;
  }
};

// Lifecycle hooks
onMounted(async () => {
  await store.dispatch('events/loadInitialData');
  await initializeCalendarBounds();
});
</script>
<template>
  <div class="container py-4">
    <!-- Encabezado con flechas y mes -->
    <div class="d-flex align-items-center">
      <button 
        class="nav-arrow me-3" 
        @click="prevMonth"
        :disabled="!canNavigatePrev"
        :class="{ 'disabled': !canNavigatePrev }"
      >&lt;</button>
      <h3 class="calendar-month m-0">{{ monthName }} {{ currentYear }}</h3>
      <button 
        class="nav-arrow ms-3" 
        @click="nextMonth"
        :disabled="!canNavigateNext"
        :class="{ 'disabled': !canNavigateNext }"
      >&gt;</button>
    </div>

    <!-- Días de la semana -->
    <div class="custom-row row fw-bold text-primary mb-2 text-uppercase day-headers">
      <div class="col" v-for="day in weekDays" :key="day">{{ day }}</div>
    </div>
    <div class="calendar-grid-wrapper position-relative">
      <!-- Flecha izquierda -->
      <button 
        class="side-arrow left" 
        @click="prevMonth"
        :disabled="!canNavigatePrev"
        :class="{ 'disabled': !canNavigatePrev }"
      >&lt;</button>

      <!-- Calendario -->
      <div class="calendar-grid">
        <div
          class="calendar-row d-flex"
          v-for="(week, index) in calendarGrid"
          :key="index"
        >
          <div
            class="calendar-cell flex-fill"
            v-for="(date, i) in week"
            :key="i"
          >
            <CalendarCell
              :date="date.date"
              :events="date.events"
              :isOtherMonth="date.isOtherMonth"
            />
          </div>
        </div>
        <!-- Leyenda solo visible en móviles -->
<div class="event-legend">
  <h5 class="text">EVENTOS ESCOLARES</h5>
  <div class="event-legend-grid">
  <div
    v-for="(event, index) in uniqueEventsWithColor"
    :key="index"
    class="d-flex align-items-center mb-2"
  >
    <span
      class="legend-color me-2"
      :style="{ backgroundColor: event.color }"
    ></span>
    <span class="legend-label">{{ event.name }}</span>
  </div>
</div>
</div>

      </div>

      <!-- Flecha derecha -->
      <button 
        class="side-arrow right" 
        @click="nextMonth"
        :disabled="!canNavigateNext"
        :class="{ 'disabled': !canNavigateNext }"
      >&gt;</button>
    </div>
  </div>
</template>



<style scoped>
.custom-row >*{
  flex: 1 1 14%;
  max-width: 14%;
  font-family: "Josefin Sans";
}
.calendar-grid-wrapper {
  position: relative;
}

.side-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 5rem;
  color: #5404ff;
  z-index: 10;
  cursor: pointer;
  padding: 0 5px;
}

.side-arrow.left {
  left: -80px;
}

.side-arrow.right {
  right: -80px;
}

.side-arrow.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.calendar-month {
  font-family: "Anek Odia";
  font-weight: bold;
  font-size: 1.5rem;
  text-transform: uppercase;
}

.nav-arrow {
  font-size: 2rem;
  background: none;
  border: none;
  color: #5404ff;
  cursor: pointer;
}

.nav-arrow.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.day-headers .col {
  font-family: "Anek Odia";
  font-size: 25px;
  text-align: center;
}

.calendar-grid {
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid #ccc;
}

.calendar-row {
  display: flex;
}
.event-legend {
  display: none; /* Oculta por defecto */
}
.calendar-cell {
  border: 1px solid #ddd;
  min-height: 110px;
  width: 100px;
  padding: 1px;
  box-sizing: border-box;
  text-align: left;
}
@media (max-width: 988px) {
  .day-headers .col{
    font-size: 12px;
  }
}
@media (max-width: 876px) {
  .calendar-cell {
    border: 1px solid #ddd;
    min-height: 60px;
    width: 60px;
    padding: 1px;
    box-sizing: border-box;
    text-align: left;
  }
  .calendar-month {
    font-weight: bold;
    font-size: 15px;
    text-transform: uppercase;
  }
  .day-headers .col {
    font-size: 9px;
    text-align: center;
  }
  .event-legend {
    display: block;
    margin-top: 20px;
  }
}
.text{
  font-family: "Anek Odia";
  color: #000E32;
  font-size: 20px;
  padding: 10px;
  text-align: center;
}

.legend-color {
  min-width: 10px;
  min-height: 10px;
  display: inline-block;
}
.event-legend span {
  font-family: "Anek Odia";
  font-weight: 500;
  font-size: 12px; /* Ajusta el valor a tu gusto: 12px, 16px, etc. */
}
.event-legend-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 columnas */
  gap: 10px 20px; /* espacio entre filas y columnas */
}
@media (max-width: 476px) {
  .day-headers .col{
    font-size: 7px;
  }
}
</style>