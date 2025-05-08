<script setup>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import CreateEventForm from '@/components/community/CreateEventForm.vue';
import EventCard from '@/components/community/EventCard.vue';

import NOEVE from '@/assets/img/community/IMAGEN SIN EVENTOS.png';
import VOLLEY from '@/assets/img/community/icons/sports/ICONO VOLLEYBALL.png'
import BEIS from '@/assets/img/community/icons/sports/ICONO BEISBOL.png'
import ATLET from '@/assets/img/community/icons/sports/ICONO ATLETISMO.png'
import FUTB from '@/assets/img/community/icons/sports/ICONO FUTBOL.png'
import BASKET from '@/assets/img/community/icons/sports/ICONO BASQUETBOL.png'
import SOFT from '@/assets/img/community/icons/sports/ICONO SOFTBOL.png'
import PORRA from '@/assets/img/community/icons/sports/ICONO PORRA.png'
import BOX from '@/assets/img/community/icons/sports/ICONO BOX.png'

const store = useStore();
const showForm = ref(false);
const events = ref([]);
const isLoading = ref(false);
const error = ref(null);

// Cargar eventos desde el backend al montar el componente
onMounted(async () => {
    isLoading.value = true;
    try {
        // Obtener ID de la categoría "Deportiva" (en un sistema real deberías buscar este ID)
        const sportsCategoryId = 2; // ID simulado
        
        // Cargar eventos por categoría
        const activities = await store.dispatch('community/fetchActivities', sportsCategoryId);
        
        // Convertir las actividades del backend al formato que espera el componente EventCard
        events.value = activities.map(activity => ({
            activityId: activity.Id_activity,
            title: activity.Title,
            description: activity.Description,
            organizer: activity.Organizer_id, 
            startTime: activity.Start_time,
            endTime: activity.End_time,
            location: activity.location_name,
            category: "Deportivo", // Texto mostrado
            // Usar los metadatos para el ícono y color
            imageSrc: activity._metadata?.iconPath || "/src/assets/img/community/icons/sports/ICONO VOLLEYBALL.png", 
            backgroundColor: activity._metadata?.backgroundColor || "#5C77BA",
            date: activity.Event_date
        }));

    } catch (err) {
        error.value = err.message || "Error al cargar eventos";
        console.error("Error al cargar eventos:", err);
    } finally {
        isLoading.value = false;
    }
});

// Función para manejar la creación de eventos (usando el backend)
const handleEventCreated = async (eventData) => {
    try {
        // Crear actividad usando la store
        await store.dispatch('community/createEventFromForm', eventData);
        
        // Actualizar la lista de eventos
        const sportsCategoryId = 2; // ID simulado
        await store.dispatch('community/fetchActivities', sportsCategoryId);
        
        // Cerrar el formulario
        showForm.value = false;
    } catch (err) {
        console.error("Error al crear evento:", err);
        // Aquí puedes mostrar un mensaje de error al usuario
    }
};

    const recreationalActivities = [
        'Volleyball Sala',
        'Volleyball Playa',
        'Softball',
        'Baseball',
        'Basketball',
        'Atletismo',
        'Porra',
        'Box',
        'Football'
    ];

    const recreationalLocations = [
        'Cancha Volleyball Sala Trasera 1',
        'Cancha Volleyball Sala Trasera 2',
        'Cancha Volleyball Playa',
        'Campo Softball',
        'Campo Baseball 1',
        'Campo Baseball 2',
        'Cancha Basketball Central',
        'Cancha Basketball Trasera',
        'Cancha Soccer / Football 1',
        'Cancha Soccer / Football 2',
        'Cancha Soccer / Football 3'
    ];

    const recreationalIcons = [
        {
            title: 'VOLLEYBALL',
            image: VOLLEY,
            bgColor: 'rgba(255, 226, 0, 1)'
        },
        {
            title: 'BASEBALL',
            image: BEIS,
            bgColor: 'rgba(168, 56, 59, 1)'
        },
        {
            title: 'ATLETISMO',
            image: ATLET,
            bgColor: 'rgba(107, 183, 83, 1)'
        },
        {
            title: 'FUTBALL',
            image: FUTB,
            bgColor: 'rgba(92, 119, 186, 1)'
        },
        {
            title: 'BASKETBALL',
            image: BASKET,
            bgColor: 'rgba(240, 138, 57, 1)'
        },
        {
            title: 'SOFTBALL',
            image: SOFT,
            bgColor: 'rgba(193, 15, 2, 1)'
        },
        {
            title: 'PORRA',
            image: PORRA,
            bgColor: 'rgba(255, 177, 229, 1)'
        },
        {
            title: 'BOX',
            image: BOX,
            bgColor: 'rgba(135, 213, 204, 1)'
        },
    ];
</script>

<template>
    <!-- ### Hero ### -->
    <div>
        <section class="hero-container">
            <div class="hero-overlay">
                <span class="hero-title">DEPORTES</span>
            </div>
        </section>
    </div>

    <!-- ### Botón Crear Evento ### -->
    <div class="container-fluid justify-content-center">
        <div class="cre-cont col-12 d-flex justify-content-end text-center pe-4">
            <button class="cre-button btn btn-primary" type="button" @click="showForm = true">
                <i class="cre-icon fa-solid fa-circle-plus"></i>
                <span> CREAR EVENTO</span>
            </button>
        </div>
    </div>

    <CreateEventForm 
        v-model="showForm"
        :activities="recreationalActivities"
        :locations="recreationalLocations"
        :icons="recreationalIcons"
        :useBackendSubmit="true"
        @event-created="handleEventCreated"
    />
    
    <!-- Estado de carga -->
    <div v-if="isLoading" class="loading-container">
        <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Cargando...</span>
        </div>
    </div>
    
    <!-- Mostrar mensaje de error -->
    <div v-else-if="error" class="error-container alert alert-danger">
        {{ error }}
    </div>

    <!-- Lista de Eventos -->
    <div v-else-if="events.length > 0" class="events-container">
        <EventCard 
            v-for="(event, index) in events" 
            :key="index"
            :activityId="event.activityId"
            :title="event.title"
            :description="event.description"
            :organizer="event.organizer"
            :startTime="event.startTime"
            :endTime="event.endTime"
            :location="event.location"
            :category="event.category"
            :imageSrc="event.imageSrc"
            :backgroundColor="event.backgroundColor"
            :date="event.date"
        />
    </div>

    <!-- ### Aviso de "Ningún Evento" ### -->
    <div v-else class="container-fluid justify-content-center">
        <div class="avit-cont col-12 text-center">
            <p class="avit-text-up">¡CREA TU EVENTO!</p>
            <img class="avit-img" :src="NOEVE">
            <p class="avit-text-down">No hay ningún evento de la comunidad, por favor regrese en un momento.</p>
            <RouterLink to="/" class="avit-button btn btn-primary mt-2">
                <span>Regresar a Inicio</span>
            </RouterLink>
        </div>
    </div>
</template>

<style scoped>
    /* Hero Container */
    .hero-container {
        position: relative;
        width: 100%;
        height: 240px;
        overflow: hidden;
        display: flex;
        background-color: #000E32;
        justify-content: center; /* Centra horizontalmente */
        align-items: center;     /* Centra verticalmente */
    }

    /* Gradient Overlay
    .hero-container::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0.66) 70%);
        z-index: 2;
        pointer-events: none; /* Asegura que la superposición no bloquee las interacciones 
    }
    */

    /* Background elements */
    .hero-background, .hero-video {
        position: absolute;
        top: 0;
        width: 100%;
        height: 200%;
        object-fit:cover;
        object-position: 100% 95%;
    }

    .hero-background {
        z-index: 0;
    }

    .hero-video {
        z-index: 1;
    }

    /* Overlay Content */
    .hero-overlay {
        position: relative;
        z-index: 3; /* Asegura que el contenido esté encima de la superposición */
        color: white;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .hero-title {
        font-family: 'Playfair Display';
        font-weight: 700;
        font-size: 6rem;
        color: white;
        text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
        letter-spacing: 0.05em;
        margin: 0;
        transform: translateY(30%);
        width: 870px;
        height: 280px;
        max-width: 80%; 
    }

    .cre-cont {
        margin-top: 30px;

        .cre-button {
            display: flex;
            align-items: center; /* Centra verticalmente */
            justify-content: center; /* Centra horizontalmente */
            text-align: center;

            background-color: rgba(0, 0, 0, 0);
            border-color: rgba(0, 0, 0, 0); /* Updated border color */


            width: 225px;
            height: 50px;

            transition: all 0.5s ease;

            span {
                height: 25px;
                color:#000E32;
                font-family: 'Josefin Sans';
                font-weight: 700;
                font-size: 18px;

                transition: all 0.2s ease;
            }

            .cre-icon {
                font-size: 30px;
                margin-right: 15px;
                color:#000E32;

                transition: all 0.2s ease;
            }

            &:hover {
                span, .cre-icon {
                    color: #FBE326;
                }
            }
        }
    }

    .avit-cont {
        margin-top: 30px;
        margin-bottom: 35px;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        
        .avit-text-up {
            font-family: 'Playfair Display';
            font-weight: 700;
            font-size: 35px;
            color: rgb(145, 145, 145);
            letter-spacing: 0.05em;
            width: 900px;
        }

        .avit-text-down {
            font-family: 'Playfair Display';
            font-weight: 700;
            font-size: 45px;
            color: rgb(145, 145, 145);
            letter-spacing: 0.05em;
            width: 900px;
        }

        .avit-img {
            width: auto;
            height: 300px;
            margin: 20px 0;
        }

        .avit-button {
            display: flex;
            align-items: center; /* Centra verticalmente */
            justify-content: center; /* Centra horizontalmente */
            text-align: center;

            background-color: white;
            border-radius: 50px;
            border-color:#000E32;

            width: 150px;
            height: 50px;

            transition: all 0.5s ease;

            span {
                height: 22.5px;
                color:#000E32;
                font-family: 'Anek Odia';
                font-weight: 700;
                font-size: 18px;
            }

            i {
                color:#000E32;
            }

            &:hover {
                background-color:#000E32;

                span,i {
                    color:white;
                }
            }
            
            
        }

    }

        /* Agregar estilos para el contenedor de eventos */
    .events-container {
        display: flex;
        flex-direction: column;
        gap: 20px;
        padding: 30px 20px;
        align-items: center;
    }

    /* Media Queries para Responsive Design */
    @media screen and (max-width: 1024px) {
        /* Hero Section */
        .hero-container {
            height: 180px;
        }

        .hero-title {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 3.5rem;
            width: 100%;
            height: auto;
            transform: none;
            padding: 10px 0 0 0;
        }

        /* Botón Crear Evento */
        .cre-cont {
            display: flex;
            justify-content: center !important;
            padding-right: 0 !important;
            
            .cre-button {
                border-color: rgba(126, 131, 130, 1);
                background-color: rgba(242, 242, 242, 1);
                border-radius: 50px;

                height: 50px;
                width: 90%;
                max-width: 300px;
                margin: 0px auto;
                

                &:hover {
                    background-color: #000E32;

                    span, .cre-icon {
                        color: white;
                    }
                }
            }
        }

        /* Mensaje sin eventos */
        .avit-cont {
            padding: 0 15px;

            .avit-text-up {
                width: 100%;
                font-size: 22px;
                text-align: center;
                padding: 0 10px;
            }
            
            .avit-text-down {
                width: 100%;
                font-size: 28px;
                text-align: center;
                padding: 0 10px;
            }

            .avit-img {
                width: auto;
                height: 250px;
                margin: 10px 0;
            }

            .avit-button {
                border-color: rgba(126, 131, 130, 1);
                background-color: rgba(242, 242, 242, 1);
                width: 200px;
                margin-top: 20px;
            }
        }
    }

    @media screen and (max-width: 480px) {
        /* Hero Section ajustes para móviles pequeños */
        .hero-container {
            height: 100px;
        }

        .hero-title {
            font-size: 2.5rem;
        }

        /* Botón Crear Evento ajustes */
        .cre-cont {
            .cre-button {
                border-color: rgba(126, 131, 130, 1);
                background-color: rgba(242, 242, 242, 1);
                border-radius: 50px;

                height: 45px;
                
                span {
                    height: 20px;
                    font-size: 16px;
                }

                .cre-icon {
                    font-size: 24px;
                    margin-right: 10px;
                }

                &:hover {
                    background-color: #000E32;

                    span, .cre-icon {
                        color: white;
                    }
                }
            }
        }

        /* Mensaje sin eventos ajustes */
        .avit-cont {

            .avit-text-up {
                font-size: 20px;
            }

            .avit-text-down {
                font-size: 24px;
            }

            .avit-img {
                width: auto;
                height: 200px;
                margin: 5px 0;
            }

            .avit-button {
                border-color: rgba(126, 131, 130, 1);
                background-color: rgba(242, 242, 242, 1);
                width: 180px;
                height: 45px;
                
                span {
                    font-size: 16px;
                }
            }
        }
    }

    /* Contenedor de eventos responsive */
    @media screen and (max-width: 768px) {
        .events-container {
            padding: 30px 10px;
            width: 100%;
        }
    }

</style>