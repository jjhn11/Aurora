<template>
    <br><br>
    <div v-if="isAdmin" class="admin-events-container">
      <div class="header-section">
        <h1>Administración de Eventos</h1>
        <div class="actions">
          <button class="btn btn-primary" @click="showEventForm()">
            <i class="fas fa-plus-circle"></i> Nuevo Evento
          </button>
        </div>
      </div>
  
      <!-- Filters section -->
      <div class="filters-section">
        <div class="row g-3">
          <div class="col-md-4">
            <div class="input-group">
              <span class="input-group-text"><i class="fas fa-search"></i></span>
              <input 
                type="text" 
                class="form-control" 
                placeholder="Buscar por título..." 
                v-model="filters.search"
                @input="applyFilters"
              >
            </div>
          </div>
          <div class="col-md-3">
            <select class="form-select" v-model="filters.category" @change="applyFilters">
              <option value="">Todas las categorías</option>
              <option 
                v-for="category in eventCategories" 
                :key="category.Id_category" 
                :value="category.Id_category"
              >
                {{ category.Category_event_name }}
              </option>
            </select>
          </div>
          <div class="col-md-3">
            <div class="input-group">
              <span class="input-group-text">Fecha</span>
              <input 
                type="date" 
                class="form-control" 
                v-model="filters.date"
                @change="applyFilters"
                :min="minDate"
                :max="maxDate"
              >
            </div>
          </div>
          <div class="col-md-2">
            <button class="btn btn-secondary w-100" @click="resetFilters">
              <i class="fas fa-sync-alt"></i> Reiniciar
            </button>
          </div>
        </div>
      </div>
  
      <!-- Loading indicator -->
      <div v-if="loading" class="text-center p-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Cargando...</span>
        </div>
        <p class="mt-2">Cargando eventos...</p>
      </div>
  
      <!-- Error message -->
      <div v-else-if="error" class="alert alert-danger mt-3">
        <i class="fas fa-exclamation-triangle"></i> {{ error }}
      </div>
  
      <!-- Table section -->
      <div v-else-if="filteredEvents.length > 0" class="table-responsive mt-4">
        <table class="table table-striped table-hover">
          <thead class="table-primary">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Título</th>
              <th scope="col">Categoría</th>
              <th scope="col">Fecha</th>
              <th scope="col" style="width: 180px;">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="event in paginatedEvents" :key="event.Id_event">
              <td>{{ event.Id_event }}</td>
              <td>{{ event.Title }}</td>
              <td><span class="badge bg-info">{{ event.category?.Category_event_name }}</span></td>
              <td>{{ formatDate(event.Event_date) }}</td>
              <td>
                <div class="btn-group">
                  <button class="btn btn-sm btn-info" @click="viewEventDetails(event)">
                    <i class="fas fa-eye"></i>
                  </button>
                  <button class="btn btn-sm btn-warning" @click="showEventForm(event)">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button class="btn btn-sm btn-danger" @click="confirmDelete(event)">
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
  
        <!-- Pagination -->
        <div class="d-flex justify-content-between align-items-center">
          <div>
            Mostrando {{ startIndex + 1 }} - {{ endIndex }} de {{ filteredEvents.length }} eventos
          </div>
          <nav aria-label="Paginación de eventos">
            <ul class="pagination">
              <li class="page-item" :class="{ disabled: currentPage === 1 }">
                <button class="page-link" @click="currentPage = 1" :disabled="currentPage === 1">
                  <i class="fas fa-angle-double-left"></i>
                </button>
              </li>
              <li class="page-item" :class="{ disabled: currentPage === 1 }">
                <button class="page-link" @click="currentPage--" :disabled="currentPage === 1">
                  <i class="fas fa-angle-left"></i>
                </button>
              </li>
              <li 
                v-for="page in pageNumbers" 
                :key="page" 
                class="page-item"
                :class="{ active: currentPage === page }"
              >
                <button class="page-link" @click="currentPage = page">{{ page }}</button>
              </li>
              <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                <button class="page-link" @click="currentPage++" :disabled="currentPage === totalPages">
                  <i class="fas fa-angle-right"></i>
                </button>
              </li>
              <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                <button class="page-link" @click="currentPage = totalPages" :disabled="currentPage === totalPages">
                  <i class="fas fa-angle-double-right"></i>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
  
      <!-- No results message -->
      <div v-else class="text-center p-5">
        <i class="fas fa-calendar-times fa-4x text-muted mb-3"></i>
        <h3>No se encontraron eventos</h3>
        <p>Intente cambiar los filtros o cree un nuevo evento.</p>
      </div>
  
      <!-- Event form modal -->
      <div class="modal fade" id="eventModal" tabindex="-1" aria-labelledby="eventModalLabel" aria-hidden="true" ref="eventModal">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="eventModalLabel">{{ isEditing ? 'Editar Evento' : 'Nuevo Evento' }}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="saveEvent">
                <!-- Title -->
                <div class="mb-3">
                  <label for="eventTitle" class="form-label">Título *</label>
                  <input 
                    type="text" 
                    class="form-control" 
                    id="eventTitle" 
                    v-model="eventForm.title" 
                    :class="{ 'is-invalid': titleError }"
                    required
                  >
                  <div class="invalid-feedback">{{ titleError }}</div>
                </div>
                
                <!-- Category -->
                <div class="mb-3">
                  <label for="eventCategory" class="form-label">Categoría *</label>
                  <select 
                    class="form-select" 
                    id="eventCategory" 
                    v-model="eventForm.category"
                    required
                  >
                    <option value="" disabled>Seleccione una categoría</option>
                    <option 
                      v-for="category in eventCategories" 
                      :key="category.Id_category" 
                      :value="category.Id_category"
                    >
                      {{ category.Category_event_name }}
                    </option>
                  </select>
                </div>
  
                <!-- Event Date -->
                <div class="mb-3">
                  <label for="eventDate" class="form-label">Fecha del Evento *</label>
                  <input 
                    type="date" 
                    class="form-control" 
                    id="eventDate" 
                    v-model="eventForm.date"
                    required
                  >
                </div>
  
                <!-- Is Coming Switch -->
                <div class="mb-3">
                  <div class="form-check form-switch">
                    <input 
                      class="form-check-input" 
                      type="checkbox" 
                      id="isComingSwitch"
                      v-model="eventForm.isComing"
                    >
                    <label class="form-check-label" for="isComingSwitch">
                      Evento Próximo
                    </label>
                  </div>
                  <small class="text-muted">
                    Active esta opción si desea mostrar este evento en la sección de próximos eventos
                  </small>
                </div>
  
                <!-- Description (only if isComing) -->
                <div class="mb-3" v-if="eventForm.isComing">
                  <label for="eventDescription" class="form-label">Descripción *</label>
                  <textarea 
                    class="form-control" 
                    id="eventDescription" 
                    v-model="eventForm.description" 
                    rows="4"
                    required
                  ></textarea>
                </div>
  
                <!-- Image URL (only if isComing) -->
                <div class="mb-3" v-if="eventForm.isComing">
                  <label for="eventImage" class="form-label">URL de Imagen *</label>
                  <input 
                    type="url" 
                    class="form-control" 
                    id="eventImage" 
                    v-model="eventForm.imageUrl"
                    placeholder="https://ejemplo.com/imagen.jpg"
                    required
                  >
                </div>
  
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                  <button type="submit" class="btn btn-primary">
                    <i class="fas fa-save"></i> {{ isEditing ? 'Actualizar' : 'Guardar' }}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Event details modal -->
      <div class="modal fade" id="eventDetailsModal" tabindex="-1" aria-labelledby="eventDetailsModalLabel" aria-hidden="true" ref="eventDetailsModal">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="eventDetailsModalLabel">Detalles del Evento</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body" v-if="selectedEvent">
              <div class="card mb-3">
                <div class="card-body">
                  <h3 class="card-title">{{ selectedEvent.title }}</h3>
                  <div class="d-flex mb-3">
                    <span class="badge bg-info me-2">{{ selectedEvent.category }}</span>
                    <span class="text-muted">{{ formatDate(selectedEvent.date) }}</span>
                  </div>
                  <p class="card-text">{{ selectedEvent.description }}</p>
                </div>
              </div>
              
              <!-- Calendar info if available -->
              <div class="card" v-if="hasCalendarInfo">
                <div class="card-header">
                  Información de Calendario
                </div>
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-6">
                      <p><strong>Fecha Calendario:</strong> {{ formatDate(selectedEvent.calendarDate) }}</p>
                    </div>
                    <div class="col-md-6">
                      <p><strong>Fecha Inicio:</strong> {{ formatDate(selectedEvent.startDate) }}</p>
                    </div>
                    <div class="col-md-6">
                      <p><strong>Fecha Fin:</strong> {{ formatDate(selectedEvent.endDate) }}</p>
                    </div>
                    <div class="col-md-12" v-if="selectedEvent.notes">
                      <p><strong>Notas:</strong> {{ selectedEvent.notes }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
              <button 
                type="button" 
                class="btn btn-warning" 
                @click="showEventForm(selectedEvent)"
                data-bs-dismiss="modal"
              >
                <i class="fas fa-edit"></i> Editar
              </button>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Delete confirmation modal -->
      <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true" ref="deleteModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="deleteModalLabel">Confirmar Eliminación</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body" v-if="selectedEvent">
              <div class="alert alert-danger">
                <i class="fas fa-exclamation-triangle fa-lg me-2"></i>
                ¿Está seguro que desea eliminar el evento <strong>{{ selectedEvent.title }}</strong>?
              </div>
              <p>Esta acción no se puede deshacer.</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
              <button type="button" class="btn btn-danger" @click="deleteEvent">
                <i class="fas fa-trash"></i> Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
  
    </div>
    <div v-else class="text-center p-5">
      <i class="fas fa-user-lock fa-4x text-muted mb-3"></i>
      <h3>Acceso Denegado</h3>
      <p>No tiene permisos para acceder a esta sección.</p>
      <button class="btn btn-primary" @click="printUserInfo">
        Regresar al Inicio
      </button>
    </div>
  </template>
  
<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { Modal } from 'bootstrap';

const store = useStore();

// Refs for DOM elements
const eventModal = ref(null);
const eventDetailsModal = ref(null);
const deleteModal = ref(null);
const selectedEvent = ref(null);
const isEditing = ref(false);
const titleError = ref('');

// User info
const isAuthenticated = computed(() => store.state.isAuthenticated);
const user = computed(() => store.state.user);
// Check if user is admin based on email
const isAdmin = computed(() => {
    if (!isAuthenticated.value) return false;
  return user.value.email === "a22490388@itmexicali.edu.mx";
});

// Pagination
const currentPage = ref(1);
const itemsPerPage = 10;

// Filters
const filters = ref({
  search: '',
  category: '',
  date: ''
});

// Event form
const eventForm = ref({
  id: null,
  title: '',
  description: '',
  category: '',
  date: '',
  isComing: true,
  imageUrl: ''
});

// Get events from store
const events = computed(() => store.getters['events/getAllEvents']);
const eventCategories = computed(() => store.state.events.categories);
const loading = computed(() => store.state.events.loading.events);
const error = computed(() => store.state.events.error.events);

// Filtered events
const filteredEvents = computed(() => {
  let result = [...events.value];
  
  // Apply search filter
  if (filters.value.search) {
    const searchTerm = filters.value.search.toLowerCase();
    result = result.filter(event => 
      event.Title.toLowerCase().includes(searchTerm) || 
      (event.Description && event.Description.toLowerCase().includes(searchTerm))
    );
  }
  
  // Apply category filter
  if (filters.value.category) {
    result = result.filter(event => event.Id_category === parseInt(filters.value.category));
  }
  
  // Apply date filter
  if (filters.value.date) {
    result = result.filter(event => {
      if (!event.Event_date) return false;
      
      // Normalize dates to avoid timezone issues
      const filterDate = new Date(filters.value.date);
      filterDate.setHours(0, 0, 0, 0);
      
      const eventDate = new Date(event.Event_date);
      eventDate.setHours(0, 0, 0, 0);
      
      return filterDate.getTime() === eventDate.getTime();
    });
  }
  
  return result;
});

// Pagination calculations
const totalPages = computed(() => 
  Math.ceil(filteredEvents.value.length / itemsPerPage)
);

const startIndex = computed(() => 
  (currentPage.value - 1) * itemsPerPage
);

const endIndex = computed(() => 
  Math.min(startIndex.value + itemsPerPage, filteredEvents.value.length)
);

const paginatedEvents = computed(() => 
  filteredEvents.value.slice(startIndex.value, endIndex.value)
);

const pageNumbers = computed(() => {
  const pages = [];
  const maxPages = 5; // Show max 5 page numbers
  
  if (totalPages.value <= maxPages) {
    // Show all pages if there are less than maxPages
    for (let i = 1; i <= totalPages.value; i++) {
      pages.push(i);
    }
  } else {
    // Show pages around current page
    let startPage = Math.max(1, currentPage.value - Math.floor(maxPages / 2));
    let endPage = startPage + maxPages - 1;
    
    if (endPage > totalPages.value) {
      endPage = totalPages.value;
      startPage = Math.max(1, endPage - maxPages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
  }
  
  return pages;
});

// Check if the selected event has calendar info
const hasCalendarInfo = computed(() => {
  return selectedEvent.value && 
    (selectedEvent.value.calendarDate || 
    selectedEvent.value.startDate || 
    selectedEvent.value.endDate || 
    selectedEvent.value.notes);
});

// Add these computed properties
const minDate = computed(() => {
  const first = events.value[0]?.Event_date;
  return first ? new Date(first).toISOString().split('T')[0] : '';
});

const maxDate = computed(() => {
  if (!events.value.length) return '';
  const dates = events.value.map(e => new Date(e.Event_date));
  const last = new Date(Math.max(...dates));
  return last.toISOString().split('T')[0];
});

// Load events on mount
onMounted(async () => {
  try {
    await Promise.all([
      store.dispatch('events/fetchEvents'),
      store.dispatch('events/fetchCategories')
    ]);
  } catch (err) {
    console.error('Error loading initial data:', err);
  }
});

// Format date for display
const formatDate = (dateString) => {
  if (!dateString) return '';
  
  // Create date object and normalize to local timezone
  const date = new Date(dateString);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
  
  return date.toLocaleDateString('es-ES', {
    year: 'numeric', 
    month: 'long', 
    day: 'numeric'
  });
};

// Modal management
const showEventForm = (event = null) => {
  isEditing.value = !!event;
  titleError.value = '';
  
  if (event) {
    eventForm.value = {
      id: event.Id_event,
      title: event.Title,
      description: event.Description || '',
      category: event.Id_category,
      date: new Date(event.Event_date).toISOString().split('T')[0],
      isComing: event.Is_coming === 1,
      imageUrl: event.Image_url || ''
    };
  } else {
    eventForm.value = {
      id: null,
      title: '',
      description: '',
      category: '',
      date: new Date().toISOString().split('T')[0],
      isComing: true,
      imageUrl: ''
    };
  }
  
  const modal = new Modal(eventModal.value);
  modal.show();
};

const viewEventDetails = (event) => {
  selectedEvent.value = {
    title: event.Title,
    category: event.category?.Category_event_name,
    date: event.Event_date,
    description: event.Description,
    calendarDate: event.Event_date,
    startDate: event.Start_date,
    endDate: event.End_date,
    notes: event.Notes
  };
  const modal = new Modal(eventDetailsModal.value);
  modal.show();
};

const confirmDelete = (event) => {
  selectedEvent.value = event;
  const modal = new Modal(deleteModal.value);
  modal.show();
};

// CRUD operations
const saveEvent = async () => {
  if (eventForm.value.title.trim().length < 3) {
    titleError.value = 'El título debe tener al menos 3 caracteres';
    return;
  }
  
  try {
    const eventData = {
      Title: eventForm.value.title,
      Id_category: parseInt(eventForm.value.category),
      Event_date: eventForm.value.date,
      Is_coming: eventForm.value.isComing ? 1 : 0,
      Description: eventForm.value.isComing ? eventForm.value.description : null,
      Image_url: eventForm.value.isComing ? eventForm.value.imageUrl : null
    };
    
    if (isEditing.value) {
      await store.dispatch('events/updateEvent', {
        eventId: eventForm.value.id,
        eventData
      });
      alert('Evento actualizado correctamente');
    } else {
      await store.dispatch('events/createEvent', eventData);
      alert('Evento creado correctamente');
    }
    
    const modal = Modal.getInstance(eventModal.value);
    modal.hide();
    
    await store.dispatch('events/fetchEvents');
  } catch (err) {
    console.error('Error saving event:', err);
    alert('Error al guardar el evento: ' + err.message);
  }
};

const deleteEvent = async () => {
  try {
    await store.dispatch('events/deleteEvent', selectedEvent.value.Id_event);
    const modal = Modal.getInstance(deleteModal.value);
    modal.hide();
    alert('Evento eliminado correctamente');
    
    // Refresh events list
    await store.dispatch('events/fetchEvents');
  } catch (err) {
    console.error('Error deleting event:', err);
    alert('Error al eliminar el evento: ' + err.message);
  }
};

// Filter methods
const applyFilters = () => {
  currentPage.value = 1; // Reset to first page when filters change
};

const resetFilters = () => {
  filters.value = {
    search: '',
    category: '',
    date: ''
  };
  currentPage.value = 1;
};
</script>
  
  <style scoped>
  .admin-events-container {
    padding: 2rem;
  }
  
  .header-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }
  
  .filters-section {
    background-color: #f8f9fa;
    padding: 1.5rem;
    border-radius: 0.5rem;
    margin-bottom: 1.5rem;
  }
  
  .table th {
    background-color: #e7f1ff;
  }
  
  .table tbody tr:hover {
    background-color: #f5f8ff;
  }
  
  /* Make buttons more visible for older users */
  .btn {
    font-weight: 500;
    padding: 0.5rem 1rem;
  }
  
  .btn-group .btn {
    margin: 0 2px;
  }
  
  /* Increase text contrast */
  .table {
    color: #333;
  }
  
  .form-label {
    font-weight: 500;
    margin-bottom: 0.5rem;
  }
  
  /* Responsive adjustments */
  @media (max-width: 768px) {
    .admin-events-container {
      padding: 1rem;
    }
    
    .header-section {
      flex-direction: column;
      align-items: start;
    }
    
    .header-section .actions {
      margin-top: 1rem;
      width: 100%;
    }
    
    .header-section .actions button {
      width: 100%;
    }
  }
  </style>