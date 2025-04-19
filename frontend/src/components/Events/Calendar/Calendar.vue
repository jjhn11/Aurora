<template>
  <div class="container py-4">
    <!-- Encabezado con flechas y mes -->
    <div class="d-flex align-items-center mb-3">
      <button class="nav-arrow me-3" @click="prevMonth">&lt;</button>
      <h3 class="calendar-month m-0">{{ monthName }} {{ currentYear }}</h3>
      <button class="nav-arrow ms-3" @click="nextMonth">&gt;</button>
    </div>

    <!-- Días de la semana -->
    <div class="row fw-bold text-primary mb-2 text-uppercase day-headers">
      <div class="col" v-for="day in weekDays" :key="day">{{ day }}</div>
    </div>
    <div class="calendar-grid-wrapper position-relative">
      <!-- Flecha izquierda -->
      <button class="side-arrow left" @click="prevMonth">&lt;</button>

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
      </div>

      <!-- Flecha derecha -->
      <button class="side-arrow right" @click="nextMonth">&gt;</button>
    </div>
  </div>
</template>

<script>
import CalendarCell from './CalendarCell.vue';

export default {
  components: { CalendarCell },
  data() {
    return {
      currentMonth: 0,
      currentYear: 2025,
      weekDays: [
        'Lunes',
        'Martes',
        'Miércoles',
        'Jueves',
        'Viernes',
        'Sábado',
        'Domingo'
      ],
      events: {
        '2025-01-06': ['INICIO DE LABORES', 'PAGO CURSO C BÚFALO'],
        '2025-01-07': ['FIN PAGO CURSO C BÚFALO'],
        '2025-01-08': ['INICIO SOLICITUD DE EXENCIÓN DE PAGO'],
        '2025-01-10': ['FIN SOLICITUD DE EXENCIÓN DE PAGO', 'HOLA EJEMPLO FECHA'],
        '2025-01-12': ['FIN SOLICITUD DE EXENCIÓN DE PAGO'],
        '2025-02-01': ['FIN SOLICITUD DE EXENCIÓN DE PAGO'],
        '2025-04-12': ['si'],
        //Agregar eventos... 'YYYY-MM-DD': ['Tezto'],
      }
    };
  },
  computed: {
    monthName() {
      return new Date(this.currentYear, this.currentMonth).toLocaleString('es-ES', {
        month: 'long'
      });
    },
    calendarGrid() {
      const firstDay = new Date(this.currentYear, this.currentMonth, 1);
      const startDay = (firstDay.getDay() + 6) % 7;
      const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();

      const prevMonth = this.currentMonth === 0 ? 11 : this.currentMonth - 1;
      const prevYear = this.currentMonth === 0 ? this.currentYear - 1 : this.currentYear;
      const daysInPrevMonth = new Date(prevYear, prevMonth + 1, 0).getDate();

      const nextMonth = this.currentMonth === 11 ? 0 : this.currentMonth + 1;
      const nextYear = this.currentMonth === 11 ? this.currentYear + 1 : this.currentYear;

      const grid = [];
      let week = [];

      // Días del mes anterior
      for (let i = startDay - 1; i >= 0; i--) {
        const dateNum = daysInPrevMonth - i;
        const dateStr = `${prevYear}-${String(prevMonth + 1).padStart(2, '0')}-${String(dateNum).padStart(2, '0')}`;
        week.push({ date: dateNum, events: this.events[dateStr] || [], isOtherMonth: true });
      }

      // Días del mes actual
      for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${this.currentYear}-${String(this.currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        week.push({ date: day, events: this.events[dateStr] || [], isOtherMonth: false });

        if (week.length === 7) {
          grid.push(week);
          week = [];
        }
      }

      // Días del mes siguiente
      let nextDay = 1;
      while (week.length < 7) {
        const dateStr = `${nextYear}-${String(nextMonth + 1).padStart(2, '0')}-${String(nextDay).padStart(2, '0')}`;
        week.push({ date: nextDay, events: this.events[dateStr] || [], isOtherMonth: true });
        nextDay++;
      }
      grid.push(week);

      // Rellenar calendario hasta tener 6 semanas
      while (grid.length < 6) {
        const emptyWeek = [];
        for (let i = 0; i < 7; i++) {
          const dateStr = `${nextYear}-${String(nextMonth + 1).padStart(2, '0')}-${String(nextDay).padStart(2, '0')}`;
          emptyWeek.push({ date: nextDay, events: this.events[dateStr] || [], isOtherMonth: true });
          nextDay++;
        }
        grid.push(emptyWeek);
      }

      return grid;
    }
  },
  methods: {
    nextMonth() {
      if (this.currentMonth === 11) {
        this.currentMonth = 0;
        this.currentYear++;
      } else {
        this.currentMonth++;
      }
    },
    prevMonth() {
      if (this.currentMonth === 0) {
        this.currentMonth = 11;
        this.currentYear--;
      } else {
        this.currentMonth--;
      }
    }
  }
};
</script>

<style scoped>
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

.calendar-month {
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

.day-headers .col {
  font-size: 20px;
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

.calendar-cell {
  border: 1px solid #ddd;
  min-height: 110px;
  width: 100px;
  padding: 1px;
  box-sizing: border-box;
  text-align: left;
}
</style>
