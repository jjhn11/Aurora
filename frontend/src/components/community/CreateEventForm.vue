<script setup>

    import { ref, defineEmits, defineProps } from 'vue';

    const props = defineProps({
        activities: {
            type: Array,
            required: true
        },
        locations: {
            type: Array,
            required: true
        }
    });

    const emit = defineEmits(['update:modelValue']);

    const eventName = ref('');
    const description = ref('');
    const activityType = ref('');
    const startTime = ref('');
    const endTime = ref('');
    const location = ref('');

    const handleSubmit = () => {
        console.log("Form submitted");
        emit('update:modelValue', false);
    };

    const closeForm = () => {
        emit('update:modelValue', false);
    };

</script>

<template>
    <Transition name="fade">
        <div class="form-overlay" @click.self="closeForm">
            <form class="create-event-form" @submit.prevent="handleSubmit">
                <header class="form-header">
                    <h1 class="form-title">CREAR EVENTO</h1>
                    <button type="button" class="close-button" @click="closeForm">
                        <i class="fas fa-times"></i>
                    </button>
                </header>

                <section class="form-content">
                    <label class="form-label">Nombre del evento:</label>
                    <input v-model="eventName" type="text" class="form-input" required>
            
                    <div class="form-grid">

                        <section class="form-column">

                            <div class="description-section">

                                <label class="form-label">Descripción del evento:</label>
                                <textarea v-model="description" class="form-textarea" required></textarea>
                
                                <label class="form-label">Tipo de actividad:</label>
                                <select v-model="activityType" class="form-input" required>

                                    <option value="" disabled selected class="placeholder-option">
                                        SELECCIONAR UNA ACTIVIDAD
                                    </option>

                                    <option v-for="activity in activities" :key="activity" :value="activity">
                                        {{ activity }}
                                    </option>

                                </select>


                            </div>

                        </section>
            
                        <section class="form-column">

                            <div class="time-section">

                                <div class="time-grid">

                                    <div class="time-column">
                                        <label class="form-label">Hora de inicio:</label>
                                        <input v-model="startTime" type="time" class="time-input" required>
                                    </div>

                                    <div class="time-column">
                                        <label class="form-label">Hora de cierre:</label>
                                        <input v-model="endTime" type="time" class="time-input" required>
                                    </div>

                                </div>

                                <label class="form-label">Ubicación</label>
                                <select v-model="location" class="form-input" required>

                                    <option value="" disabled selected class="placeholder-option">
                                        SELECCIONAR UNA UBICACION
                                    </option>

                                    <option v-for="loc in locations" :key="loc" :value="loc">
                                        {{ loc }}
                                    </option>
                                </select>
                            
                            </div>
                
                            <div class="location-map"></div>
                            
                        </section>

                    </div>

                </section>
            
                <button type="submit" class="submit-button">CREAR</button>

            </form>
        </div>
    </Transition>   
</template>

<style scoped>

    .form-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.3s ease;
    }

    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }

    .form-textarea {
        border-radius: 10px;
        border: 1px solid rgba(126, 131, 130, 1);
        height: 200px;
        min-height: 65px;
        max-height: 350px; /* Limita la altura máxima */
        width: 100%;
        padding: 10px;
        resize: vertical; /* Solo permite redimensionar verticalmente */
    }

    .create-event-form {
        border-radius: 20px;
        background-color: rgba(255, 255, 255, 1);
        box-shadow: 0px 4px 100px rgba(0, 0, 0, 0.5);
        display: flex;
        padding: 8px 24px;
        flex-direction: column;
        overflow: hidden;
        align-items: center;
    }

    @media (max-width: 991px) {
        .create-event-form {
            padding: 20px;
        }
    }

    .form-header {
        align-self: stretch;
        display: flex;
        align-items: flex-start;
        gap: 12px;
        font-family:
            "Crimson Text",
            -apple-system,
            Roboto,
            Helvetica,
            sans-serif;
        font-size: 22px;
        color: rgba(0, 14, 50, 1);
        font-weight: 600;
        text-align: center;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    @media (max-width: 991px) {
        .form-header {
            max-width: 100%;
            font-size: 40px;
        }
    }

    .form-title {
        align-self: end;
        margin-top: 20px;
    }

    @media (max-width: 991px) {
        .form-title {
            margin-top: 20px;
            padding: 12px;
            font-size: 20px;
        }
    }

    .header-icon {
        aspect-ratio: 1;
        object-fit: contain;
        object-position: center;
        width: 20px;
        align-self: start;
        flex-shrink: 0;
    }

    .form-label {
        color: rgba(0, 14, 50, 1);
        font-size: 15px;
        font-family:
            "Josefin Sans",
            -apple-system,
            Roboto,
            Helvetica,
            sans-serif;
        font-weight: 600;
        text-align: center;
        align-self: start;
        margin: 12px 0 8px 8px;
    }

    .form-input {
        display: flex;
        justify-content: center;
        border-radius: 10px;
        border: 1px solid rgba(126, 131, 130, 1);
        width: 100%;
        height: 40px;
        padding: 10px;
        

        font-family: "Josefin Sans", -apple-system, Roboto, Helvetica, sans-serif;
        font-size: 16px;
        color: rgba(0, 14, 50, 1);
        transition: all 0.3s ease;
        background-color: white;
        cursor: pointer;

        transition: all 0.3s ease;

        option[value=""][disabled] {
            color: rgba(0, 14, 50, 1);
            font-family: "Josefin Sans", -apple-system, Roboto, Helvetica, sans-serif;
            font-size: 16px;
            font-weight: 500;
            padding: 10px;
        }

        option {
            color: rgba(0, 14, 50, 1);
            font-family: "Josefin Sans", -apple-system, Roboto, Helvetica, sans-serif;
            font-size: 16px;
            font-weight: 500;
            padding: 15px;
            background-color: white;
            transition: background-color 0.3s ease;
        }  

        :invalid {
            color: rgba(0, 71, 255, 0.1);
        }
        
    }

    /* Estilo para el select cuando tiene hover */
    .form-input:hover {
        border-color: rgba(0, 71, 255, 0.5);
        box-shadow: 0 0 5px rgba(0, 71, 255, 0.2);
    }

    /* Estilo para el select cuando está enfocado */
    .form-input:focus {
        outline: none;
        border-color: rgba(0, 71, 255, 1);
        box-shadow: 0 0 8px rgba(0, 71, 255, 0.3);
    }

    .form-grid {
        margin-top: 6px;
        width: 100%;
        max-width: 960px;
        display: flex;
        gap: 20px;
    }

    @media (max-width: 991px) {
        .form-grid {
            flex-direction: column;
        }
    }

    .form-column {
        width: 50%;
        display: flex;
        flex-direction: column;
    }

    @media (max-width: 991px) {
        .form-column {
            width: 100%;
        }
    }

    .form-textarea {
        border-radius: 10px;
        border: 1px solid rgba(126, 131, 130, 1);
        height: 200px;
        width: 100%;
        padding: 10px;
    }

    .dropdown-select {
        border-radius: 0 0 10px 10px;
        background-color: white;
        border: 1px solid rgba(126, 131, 130, 1);
        display: flex;
        padding: 6px 8px;
        align-items: center;
        justify-content: space-between;
        color: rgba(126, 131, 130, 1);
        font-family:
            "Josefin Sans",
            -apple-system,
            Roboto,
            Helvetica,
            sans-serif;
        font-size: 20px;
        font-weight: 600;
    }

    .dropdown-icon {
        aspect-ratio: 1;
        object-fit: contain;
        width: 20px;
    }

    .time-grid {
        display: flex;
        gap: 20px;
    }

    @media (max-width: 991px) {
        .time-grid {
            flex-direction: column;
        }
    }

    .time-column {
        width: 50%;
    }

@media (max-width: 991px) {
        .time-column {
            width: 100%;
        }
    }

    .time-input {
        border-radius: 10px;
        border: 1px solid rgba(126, 131, 130, 1);
        height: 54px;
        width: 100%;
        padding: 10px;
    }

    .location-select {
        border-radius: 10px 10px 0 0;
        background-color: white;
        border: 1px solid rgba(126, 131, 130, 1);
        display: flex;
        padding: 17px 21px 17px 10px;
        align-items: center;
        justify-content: space-between;
        font-family:
            "Josefin Sans",
            -apple-system,
            Roboto,
            Helvetica,
            sans-serif;
        font-size: 20px;
        color: rgba(126, 131, 130, 1);
        font-weight: 600;
    }

    .location-map {
        border: 1px solid rgba(126, 131, 130, 1);
        border-radius: 50%;
        width: 180px;
        height: 180px;
        margin: 32px auto 0;
    }

    .submit-button {
        border-radius: 20px;
        background-color: rgba(0, 71, 255, 1);
        margin-top: 39px;
        width: 100%;
        max-width: 1270px;
        padding: 20px;
        font-family:
            "Josefin Sans",
            -apple-system,
            Roboto,
            Helvetica,
            sans-serif;
        font-size: 30px;
        color: white;
        font-weight: 700;
        text-align: center;
        border: none;
        cursor: pointer;
    }

    @media (max-width: 991px) {
        .submit-button {
            max-width: 100%;
        }
    }

    /* Estilo hover */
    .form-textarea:hover {
        border-color: rgba(0, 71, 255, 0.5);
        box-shadow: 0 0 5px rgba(0, 71, 255, 0.2);
    }

    /* Estilo enfocado */
    .form-textarea:focus {
        outline: none;
        border-color: rgba(0, 71, 255, 1);
        box-shadow: 0 0 8px rgba(0, 71, 255, 0.3);
    }

    /* Estilo hover */
    .time-input:hover {
        border-color: rgba(0, 71, 255, 0.5);
        box-shadow: 0 0 5px rgba(0, 71, 255, 0.2);
    }

    /* Estilo enfocado */
    .time-input:focus {
        outline: none;
        border-color: rgba(0, 71, 255, 1);
        box-shadow: 0 0 8px rgba(0, 71, 255, 0.3);
    }

</style>