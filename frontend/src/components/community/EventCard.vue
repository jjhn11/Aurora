<script>
import { computed, ref, onMounted } from 'vue';
import { useStore } from 'vuex';

export default {
    name: "EventCard",
    setup(props) {
        const store = useStore();
        const isHovering = ref(false);
        const showInfoModal = ref(false);
        
        // Cargar datos de asistencia al montar el componente
        onMounted(async () => {
            try {
                // Solo cargar si hay un usuario autenticado y un ID de actividad
                if (store.state.isAuthenticated && store.state.user?.id && props.activityId) {
                    await store.dispatch('community/fetchAttendance');
                }
            } catch (error) {
                console.error("Error al cargar datos de asistencia:", error);
            }
        });
        
        // Estado reactivo para la asistencia
        const isAttending = computed(() => {
            const userId = store.state.user?.id;
            const activityId = props.activityId;
            
            if (!userId || !activityId) return false;
            
            // Comprobación directa de asistencia con console.log para depuración
            const attendance = store.state.community?.attendances?.find(
                a => a.Id_user === userId && 
                     a.Id_activity === parseInt(activityId) && 
                     a.Confirmation === 1
            );
            
            console.log("Usuario:", userId);
            console.log("Actividad:", activityId);
            console.log("¿Asiste?", !!attendance);
            console.log("Attendances:", store.state.community?.attendances);
            
            return !!attendance;
        });
        
        // Método para alternar asistencia
        const toggleAttendance = async () => {
            if (!props.activityId) return;
            
            if (!store.state.isAuthenticated) {
                alert("Debes iniciar sesión para registrar tu asistencia");
                return;
            }
            
            try {
                await store.dispatch('community/toggleAttendance', props.activityId);
                // Recargar datos de asistencia después de alternar para actualizar la UI
                await store.dispatch('community/fetchAttendance');
            } catch (error) {
                console.error("Error al registrar asistencia:", error);
                // Podrías mostrar una notificación al usuario
            }
        };
        
        return {
            isAttending,
            isHovering,
            toggleAttendance,
            showInfoModal,
            toggleInfoModal: () => {
                showInfoModal.value = !showInfoModal.value;
            }
        };
    },
    props: {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        organizer: {
            type: String,
            required: true,
        },
        startTime: {
            type: String,
            required: true,
        },
        endTime: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        imageSrc: {
            type: String,
            required: true,
        },
        backgroundColor: {
            type: String,
            default: "rgba(251, 227, 38, 1)",
        },
        date: {
            type: String,
            required: true,
        },
        activityId: {
            type: Number,
            default: null
        },
    },
    
    computed: {
        formattedDate() {
            const date = new Date(this.date);
            return date.toLocaleDateString('es-ES', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        },
        formattedTime() {
            const formatTime = (time) => {
                const [hours, minutes] = time.split(':');
                const hour = parseInt(hours);
                const ampm = hour >= 12 ? 'PM' : 'AM';
                const hour12 = hour % 12 || 12;
                return `${hour12}:${minutes} ${ampm}`;
            };

            return {
                start: formatTime(this.startTime),
                end: formatTime(this.endTime)
            };
        },
        attendanceButtonStyle() {
            if (this.isAttending && this.isHovering) {
                return {
                    backgroundColor: '#FF4444',
                    borderColor: '#FF4444',
                    color: 'white'
                }
            }
            if (this.isAttending) {
                return {
                    backgroundColor: '#0047FF',
                    borderColor: '#0047FF',
                    color: 'rgba(255, 255, 255, 1)'
                }
            }
            if (this.isHovering) {
                return {
                    backgroundColor: 'rgba(0, 14, 50, 1)',
                    borderColor: 'rgba(0, 14, 50, 1)',
                    color: 'white'
                }
            }
            return {
                backgroundColor: 'transparent',
                borderColor: 'rgba(126, 131, 130, 1)',
                color: 'rgba(0, 14, 50, 1)'
            }
        },
        attendanceButtonText() {
            /*
            if (this.isAttending && this.isHovering) {
                return 'DEJAR DE ASISTIR'
            }
            */
            if (this.isAttending) {
                return 'ASISTIRÉ'
            }
            /*
            if (this.isHovering) {
                return 'ASISTIR'
            }
            */
            return 'ASISTENCIA'
        }
    },
};

</script>

<template>
    <section class="event-card">

        <div class="event-content">

            <div class="event-info-column">

                <div class="event-details">
                    
                    <div class="title-container">
                        <h2 class="event-title">{{ title }}</h2>
                    </div>

                    <div class="event-info">

                        <p class="event-organizer">• Organizador: {{ organizer }}</p>
                        <p class="event-category">• Categoria: {{ category }}</p>
                        <p class="event-date">• Fecha: {{ formattedDate }}</p>
                        
                        <div class="event-time">
                            <p>• Hora: {{ formattedTime.start }}</p>
                            <p class="time-separator">-</p>
                            <p>{{ formattedTime.end }}</p>
                        </div>

                        <p class="event-location">• Ubicacion: {{ location }}</p>

                    </div>

                </div>

            </div>

            <div class="attendance-column">

                <div class="attendance-container">

                    <div class="attendance-circle" :style="{ backgroundColor }">
                        <img :src="imageSrc" class="attendance-image" alt="Event icon" />
                    </div>

                    <div class="buttons-container">

                        <button class="info-button" @click="toggleInfoModal">
                            <i class="fas fa-info-circle"></i> INFO
                        </button>

                        <button 
                            class="attendance-button"
                            :style="attendanceButtonStyle"
                            @click="toggleAttendance"
                            @mouseenter="isHovering = true"
                            @mouseleave="isHovering = false"
                        >
                            <i v-if="isAttending" class="fa-solid fa-check"></i>
                            {{ attendanceButtonText }}
                        </button>

                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Modal --> 

    <Transition name="fade">

        <div v-if="showInfoModal" class="modal-overlay" @click.self="toggleInfoModal">

            <div class="modal-content">

                <header class="modal-header">

                    <h2 class="modal-title">Información del Evento</h2>

                    <button type="button" class="modal-close-button" @click="toggleInfoModal">
                        <i class="fas fa-times"></i>
                    </button>

                </header>

                <div class="modal-body">

                    <div class="modal-grid">

                        <div class="modal-info">

                            <h3 class="event-full-title">{{ title }}</h3>
                            
                            <p class="event-info-item">• Organizador: {{ organizer }}</p>
                            <p class="event-info-item">• Categoria: {{ category }}</p>
                            <p class="event-info-item">• Fecha: {{ formattedDate }}</p>
                            <p class="event-info-item">• Hora: {{ formattedTime.start }} - {{ formattedTime.end }}</p>
                            <p class="event-info-item">• Ubicación: {{ location }}</p>
                            <p class="event-info-item">• Descripcion:</p>
                            <p class="event-description ms-2"> {{ description }}</p>

                        </div>

                        <div class="modal-icon-wrapper">
                            
                            <div class="modal-icon-container" :style="{ backgroundColor }">
                                <img :src="imageSrc" class="modal-icon" alt="Event icon" />
                            </div>

                            <div class="modal-buttons-container">
                                
                                <button 
                                    class="modal-attendance-button"
                                    :style="attendanceButtonStyle"
                                    @click="toggleAttendance"
                                    @mouseenter="isHovering = true"
                                    @mouseleave="isHovering = false"
                                >
                                    <i v-if="isAttending" class="fa-solid fa-check"></i>
                                    {{ attendanceButtonText }}
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>

<style scoped>

    .event-card {
        border-radius: 20px;
        background-color: rgba(246, 246, 246, 1);
        border: 1px solid rgba(126, 131, 130, 1);
        width: 1230px;
        max-width: 100%;
        padding: 25px 64px 45px;
    }
  
    .event-content {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 60px; /* Added specific gap to maintain consistent spacing */
    }
  
    .event-info-column {
        flex: 1;
        width: 100%;
        min-width: 0;
        max-width: calc(100% - 300px); /* Ensures proper spacing from attendance column */
        line-height: normal;
    }

    .title-container {
        display: flex;
        justify-content: start;
        align-items: start;
        width: 100%; /* Reduced from 900px to create more space */
    }
  
    .event-title {

        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        margin-top: 10px;
        width: 100%;

        font-family: "Crimson Text", -apple-system, Roboto, Helvetica, sans-serif;
        font-size: 50px;
        font-weight: 700;
        color: rgba(0, 14, 50, 1);
    }
  
    .event-info {
        display: flex;
        flex-direction: column;
        align-self: flex-start;
        align-items: start;
        justify-content: space-between;
        gap: 20px;

        min-height: 191px;
        width: 800px;
        max-width: 100%;
        
        padding: 5px 10px 0px 0px;

        font-family:
            Josefin Sans,
            -apple-system,
            Roboto,
            Helvetica,
            sans-serif;
        font-size: 30px;
    }

    .event-details {
        display: flex;
        justify-content: left;
        align-items: center;
        flex-direction: column;
        gap: 30px;
        width: 100%;
    }

    .event-time {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .time-separator {
        color: black;
    }

    .event-date {
        text-transform: capitalize;
    }

  
    .attendance-column {
        display: flex;
        flex-direction: column;
        width: 22%;
        line-height: normal;
        min-width: 250px; /* Ensures minimum width for attendance section */
    }
  
    .attendance-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
    }
  
    .attendance-circle {
        border: 1px solid rgba(126, 131, 130, 1);
        border-radius: 50%;
        display: flex;
        margin: 30px 10px;
        padding: 30px;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        aspect-ratio: 1;
    }
  
    .attendance-image {
        aspect-ratio: 1;
        object-fit: contain;
        object-position: center;
        width: 152px;
    }
  
    .attendance-button {
        align-self: stretch;
        border-radius: 20px;
        border: 1px solid;
        min-height: 60px;
        padding: 16px 10px;
        font-family: Josefin Sans, -apple-system, Roboto, Helvetica, sans-serif;
        font-size: 20px;
        font-weight: 700;
        text-align: center;
        cursor: pointer;
        width: 100%;
        transition: all 0.3s ease;
    }

    .attendance-button:hover, .modal-attendance-button:hover {
        transform: scale(1.05);
    }

    .buttons-container {
        display: flex;
        flex-direction: column;
        gap: 10px;
        width: 100%;
    }

    .info-button {
        align-self: stretch;
        border-radius: 20px;
        background-color: rgba(0, 14, 50, 1);
        border: 1px solid rgba(126, 131, 130, 1);
        min-height: 60px;
        padding: 16px 10px;
        font-family: Josefin Sans, -apple-system, Roboto, Helvetica, sans-serif;
        font-size: 20px;
        color: white;
        font-weight: 700;
        text-align: center;
        cursor: pointer;
        width: 100%;
        transition: all 0.3s ease;
    }

    .info-button:hover {
        transform: scale(1.05);
        background-color: rgba(0, 14, 50, 0.8);
    }

    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
    }

    .modal-content {
        background-color: white;
        border-radius: 20px;
        width: 90%;
        max-width: 1200px;
        max-height: 90vh;
        box-shadow: 0px 4px 100px rgba(0, 0, 0, 0.5);
        position: relative;
        padding: 0;
        overflow: hidden;
    }

    .modal-header {
        position: sticky;
        top: 0;
        left: 0;
        right: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 24px;
        background-color: white;
        z-index: 2;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }

    .modal-title {
        font-family: "Crimson Text", -apple-system, Roboto, Helvetica, sans-serif;
        font-size: 38px;
        color: rgba(0, 14, 50, 1);
        font-weight: 700;
        margin: 0;
    }

    .modal-close-button {
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
        background: none;
        font-size: 30px;
        color: rgba(0, 71, 255, 1);
        transition: all 0.4s ease;
    }

    .modal-close-button:hover {
        color: #FBE326;
    }

    .modal-body {
        padding: 0px 10px 10px 10px;
        overflow-y: auto;
        flex: 1;
    }

    .modal-grid {
        display: grid;
        grid-template-columns: 1fr 300px;
        gap: 30px;
    }

    .modal-info {
        border-radius: 20px;
        padding: 20px;
        height: fit-content;
    }

    .event-full-title {
        font-family: "Crimson Text", -apple-system, Roboto, Helvetica, sans-serif;
        font-weight: 700;
        font-size: 35px;
        color: rgba(0, 14, 50, 1);
        margin: 0 0 15px 0;
        overflow-wrap: break-word;
        word-wrap: break-word;
        -ms-word-break: break-all;
        word-break: break-word;
        -ms-hyphens: auto;
        -moz-hyphens: auto;
        -webkit-hyphens: auto;
        hyphens: auto;
        line-height: 1.2;
    }

    .event-info-item {
        font-family: "Josefin Sans", -apple-system, Roboto, Helvetica, sans-serif;
        font-size: 24px;
        color: rgba(0, 14, 50, 1);
        margin: 0;
    }

    .event-description {
        font-family: "Josefin Sans", -apple-system, Roboto, Helvetica, sans-serif;
        font-weight: 400;
        font-size: 20px;
        line-height: 1.6;
        color: rgba(0, 14, 50, 1);
        padding: 0px 0px 0px 12px;
        align-self: stretch;
        text-align: justify;
        overflow-wrap: break-word;
        word-wrap: break-word;
        -ms-word-break: break-all;
        word-break: break-word;
        -ms-hyphens: auto;
        -moz-hyphens: auto;
        -webkit-hyphens: auto;
        hyphens: auto;
        line-height: 1.4;
    }

    .modal-icon-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding-right: 45px;
    }

    .modal-icon-container {
        width: 250px;
        height: 250px;
        border: 1px solid rgba(126, 131, 130, 1);
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 40px;
    }

    .modal-icon {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }

    .modal-buttons-container {
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        width: 70%;
    }

    .modal-attendance-button {
        align-self: stretch;
        border-radius: 20px;
        border: 1px solid;
        min-height: 60px;
        padding: 16px 10px;
        font-family: Josefin Sans, -apple-system, Roboto, Helvetica, sans-serif;
        font-size: 20px;
        font-weight: 700;
        text-align: center;
        cursor: pointer;
        width: 100%;
        transition: all 0.3s ease;
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.3s ease;
    }

    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }
  
    @media screen and (max-width: 1024px) {
        .event-card {
            padding: 15px 20px;
            width: 100%;
        }

        .event-info-column {
            max-width: 100%;
        }

        .event-content {
            gap: 20px;
        }

        .event-details{
            gap: 10px;
        }

        .event-title {
            font-size: 27px;
            margin-top: 5px;
        }

        .event-info {
            font-size: 16px;
            gap: 5px;
            min-height: auto;
            width: 100%;
        }

        /* Ocultar elementos no necesarios en móvil */
        .event-time,
        .event-location {
            display: none;
        }

        .attendance-column {
            width: 30%;
            min-width: 120px;
        }

        .attendance-circle {
            padding: 15px;
            margin: 0 10px;
        }

        .attendance-image {
            width: 60px;
        }

        .buttons-container {
            gap: 5px;
            margin-top: 10px;
        }

        .attendance-button,
        .info-button {
            height: 30px;
            min-height: 30px;
            padding: 8px 5px;
            font-size: 14px;
        }

        /* Ajustes del Modal */
        .modal-content {
            width: 95%;
            max-height: 85vh;
        }

        .modal-header {
            padding: 15px;
        }

        .modal-title {
            font-size: 24px;
        }

        .modal-close-button {
            font-size: 24px;
        }

        .modal-body {
            padding: 15px;
        }

        .modal-grid {
            grid-template-columns: 1fr;
            gap: 20px;
        }

        /* Reordenar elementos del modal */
        .modal-icon-wrapper {
            order: -1; /* Mueve el icono y botón arriba */
            padding: 0;
            margin-bottom: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .modal-icon-container {
            width: 150px;
            height: 150px;
            padding: 20px;
        }

        .modal-info {
            padding: 10px;
        }

        .event-full-title {
            font-size: 24px;
            text-align: center;
        }

        .event-info-item {
            font-size: 16px;
            margin-bottom: 5px;
        }

        .event-description {
            font-size: 14px;
            padding: 0 0 0 8px;
        }
    }

    /* Ajustes adicionales para pantallas muy pequeñas */
    @media screen and (max-width: 480px) {
        .event-card {
            padding: 10px 15px;
        }

        .event-content {
            gap: 10px;
        }

        .event-title {
            font-size: 20px;
        }

        .event-info {
            font-size: 12px;
            gap: 2px;
        }

        .attendance-circle {
            padding: 10px;
        }

        .attendance-image {
            width: 50px;
        }

        .buttons-container {
            gap: 4px;
        }

        .attendance-button,
        .info-button {
            height: 10px;
            min-height: 30px;
            font-size: 10px;
            padding: 6px 4px;
        }

        /* Ajustes adicionales del Modal */
        .modal-grid {
            grid-template-columns: 1fr;
            gap: 5px;  /* Reducido de 20px a 10px */
        }

        .modal-icon-wrapper {
            padding: 0;
            margin-bottom: 5px;  /* Reducido de 20px a 10px */
        }

        .modal-icon-container {
            width: 120px;
            height: 120px;
            padding: 15px;
        }

        .modal-attendance-button {
            height: 10px;
            min-height: 30px;
            font-size: 10px;
            padding: 0px 4px;
        }

        .event-full-title {
            font-size: 20px;
        }

        .event-info-item {
            font-size: 14px;
        }

        .event-description {
            font-size: 12px;
        }

        .modal-title {
            font-size: 20px;
        }

        .modal-close-button {
            font-size: 20px;
        }
    }
</style>
``` 
