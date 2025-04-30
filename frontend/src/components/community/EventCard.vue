<script>

export default {
    name: "EventCard",
    data() {
        return {
            showInfoModal: false,
            isAttending: false,
            isHovering: false
        }
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
    methods: {
        toggleInfoModal() {
            this.showInfoModal = !this.showInfoModal;
        },
        toggleAttendance() {
            this.isAttending = !this.isAttending;
        }
    }
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
                        <div class="event-header">
                            <p class="event-organizer">• Organizador: {{ organizer }}</p>
                        </div>
                        <div class="event-datetime">
                            <p class="event-category">• Categoria: {{ category }}</p>
                            <p class="event-date">• Fecha: {{ formattedDate }}</p>
                            <div class="event-time-location">
                                <div class="event-time">
                                    <span>• Hora: {{ formattedTime.start }}</span>
                                    <span class="time-separator">-</span>
                                    <span>{{ formattedTime.end }}</span>
                                </div>
                                <span class="event-location">• Ubicacion: {{ location }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="attendance-column">
                <div class="attendance-container">
                    <div class="attendance-circle mt-4" :style="{ backgroundColor }">
                        <img :src="imageSrc" class="attendance-image" alt="Event icon" />
                    </div>
                    <div class="buttons-container mt-4">
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
                            <div class="buttons-container mt-4">
                                <button 
                                    class="attendance-button"
                                    :style="attendanceButtonStyle"
                                    @click="toggleAttendance"
                                    @mouseenter="isHovering = true"
                                    @mouseleave="isHovering = false"
                                >
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
        min-width: 0;
        max-width: calc(100% - 300px); /* Ensures proper spacing from attendance column */
        margin-right: 20px;
        line-height: normal;
    }
  
    .event-details {
        display: flex;
        margin-top: 22px;
        flex-grow: 1;
        flex-direction: column;
        color: rgba(0, 14, 50, 1);
        font-weight: 700;
    }

    .title-container {
        width: 800px; /* Reduced from 900px to create more space */
        margin-bottom: 10px;
    }
  
    .event-title {
        font-family: "Crimson Text", -apple-system, Roboto, Helvetica, sans-serif;
        font-size: 50px;
        font-weight: 700;
        color: rgba(0, 14, 50, 1);
        margin: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 100%;
    }
  
    .event-info {
        align-self: flex-start;
        display: flex;
        min-height: 191px;
        width: 800px;
        max-width: 100%;
        padding: 10px 10px 10px 0px;
        flex-direction: column;
        align-items: flex-start;
        font-family:
            Josefin Sans,
            -apple-system,
            Roboto,
            Helvetica,
            sans-serif;
        font-size: 30px;
        justify-content: space-between;
    }
  
    .event-organizer {
        align-self: stretch;
        padding: 10px;
        text-align: left;
        margin: 0px;
    }
  
    .event-time-location {
        display: flex;
        width: 663px;
        max-width: 100%;
        padding: 10px;
        align-items: left;
        gap: 36px;
        justify-content: space-between;
        flex-wrap: wrap;
    }
  
    .event-time {
        text-align: left;
        align-self: stretch;
        margin: auto 0;
    }
  
    .event-location {
        align-self: stretch;
        margin: auto 0;
        width: 800px;
    }
  
    .event-category {
        padding: 10px;
        white-space: nowrap;
        text-align: left;
        margin: 0;
    }
  
    .attendance-column {
        display: flex;
        flex-direction: column;
        width: 22%;
        line-height: normal;
        min-width: 250px; /* Ensures minimum width for attendance section */
    }
  
    .attendance-container {
        width: 100%;
    }
  
    .attendance-circle {
        border: 1px solid rgba(126, 131, 130, 1);
        border-radius: 50%;
        display: flex;
        margin: 0 10px;
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

    .attendance-button:hover {
        transform: scale(1.05);
    }

    .event-time {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .time-separator {
        color: black;

    }

    .event-datetime {
        display: flex;
        flex-direction: column;
        gap: 10px;
        width: 100%;
    }

    .event-date {
        color: rgba(0, 14, 50, 1);
        margin: 0;
        padding: 10px;
        text-transform: capitalize;
    }

    .event-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        margin-bottom: 15px;
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

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.3s ease;
    }

    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }
  
    @media (max-width: 991px) {
        .event-card {
            padding: 25px 20px 45px;
            margin-top: 40px;
        }
  
        .event-content {
            flex-direction: column;
            gap: 30px;
        }
  
        .event-info-column {
            margin-right: 0;
            margin-bottom: 20px;
            max-width: 100%;
        }
  
        .event-details {
            max-width: 100%;
            margin-top: 40px;
        }
  
        .event-title {
            font-size: 40px;
        }
  
        .event-location {
            max-width: 100%;
        }
  
        .event-category {
            white-space: initial;
        }
  
        .attendance-column {
            width: 100%;
            margin-left: 0;
        }
  
        .attendance-container {
            margin-top: 25px;
        }
  
        .attendance-circle {
            padding: 20px;
        }
  
        .attendance-button {
            font-size: 18px;
            padding: 12px 8px;
        }

        .event-description {
            font-size: 16px;
        }

        .event-time {
            flex-direction: column;
            gap: 5px;
        }

        .time-separator {
            display: none;
        }

        .event-date {
            font-size: 20px;
        }

        .info-button {
            font-size: 18px;
            padding: 12px 8px;
        }

        .modal-content {
            width: 95%;
            padding: 20px;
        }

        .modal-title {
            font-size: 30px;
        }

        .modal-grid {
            grid-template-columns: 1fr;
        }

        .modal-icon-wrapper {
            order: -1;
            padding-top: 0;
        }

        .modal-icon-container {
            width: 200px;
            height: 200px;
            padding: 30px;
        }

        .event-full-title {
            font-size: 35px;
            text-align: center;
        }

        .event-info-item {
            font-size: 20px;
        }

        .event-description {
            font-size: 18px;
        }

        .title-container {
            width: 100%;
        }
    }

</style>
