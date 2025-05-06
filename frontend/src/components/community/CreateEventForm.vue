<script setup>

    import { ref, defineEmits, defineProps } from 'vue';

    const props = defineProps({
        modelValue: {
            type: Boolean,
            required: true
        },
        activities: {
            type: Array,
            required: true
        },
        locations: {
            type: Array,
            required: true
        },
        icons: {
            type: Array,
            required: true
        }
    });

    const emit = defineEmits(['update:modelValue', 'event-created']);

    const eventName = ref('');
    const description = ref('');
    const activityType = ref('');
    const startTime = ref('');
    const endTime = ref('');
    const location = ref('');
    const eventDate = ref(''); // Nueva ref para la fecha

    const formSubmitted = ref(false);
    const isShaking = ref(false); // Nuevo ref para controlar la animación

    const handleSubmit = () => {
        formSubmitted.value = true;
        if (!selectedIcon.value) {
            // Trigger animación
            isShaking.value = true;
            setTimeout(() => {
                isShaking.value = false;
            }, 500); // Duración de la animación
            return;
        }
        
        // Si llegamos aquí, todo está validado
        console.log("Form submitted");

        // Emitir el evento con todos los datos
        emit('event-created', {
            eventName: eventName.value,
            description: description.value,
            activityType: activityType.value,
            startTime: startTime.value,
            endTime: endTime.value,
            location: location.value,
            selectedIcon: selectedIcon.value,
            date: eventDate.value // Incluir la fecha
        });
        
        // Limpiar el formulario
        eventName.value = '';
        description.value = '';
        activityType.value = '';
        startTime.value = '';
        endTime.value = '';
        location.value = '';
        eventDate.value = '';
        selectedIcon.value = null;
        formSubmitted.value = false; // Reiniciar el estado de validación
        isShaking.value = false;     // Reiniciar la animación
        
        emit('update:modelValue', false);
    };

    // Nueva función para restablecer el error
    const resetIconError = () => {
        formSubmitted.value = false;
    };
    // Menu de Iconos

    const showIconMenu = ref(false);
    const selectedIcon = ref(null);

    const openIconMenu = () => {
        showIconMenu.value = true;
    };

    const selectIcon = (activity) => {
        selectedIcon.value = activity;
        showIconMenu.value = false;
    };

    const closeForm = () => {
        formSubmitted.value = false; // Reiniciar el estado de validación

        eventName.value = '';
        description.value = '';
        activityType.value = '';
        startTime.value = '';
        endTime.value = '';
        location.value = '';
        eventDate.value = '';
        selectedIcon.value = null;
        formSubmitted.value = false; // Reiniciar el estado de validación
        isShaking.value = false;     // Reiniciar la animación

        emit('update:modelValue', false);
    };

</script>

  

<template>

    <!-- Menu de Crear Eventos -->

    <Transition name="fade">

        <div v-if="modelValue" class="form-overlay" @click.self="closeForm">

            <form class="create-event-form" @submit.prevent="handleSubmit">

                <!-- Agregar input oculto para hacer que el icono sea requerido para el evento -->
                <input 
                    type="hidden" 
                    :value="selectedIcon ? selectedIcon.title : ''" 
                    required
                    @invalid="openIconMenu"
                >

                <header class="form-header">
                    <h1 class="form-title">CREAR EVENTO</h1>
                    <button type="button" class="close-button mt-4" @click="closeForm">
                        <i class="fas fa-times"></i>
                    </button>
                </header>

                <section class="form-content">
                    <label class="form-label">Nombre del evento:</label>

                    <div class="input-container">

                        <input 
                            v-model="eventName" 
                            type="text" 
                            class="form-input" 
                            required
                            maxlength="60"
                        >

                        <span class="char-count">{{ eventName.length }}/60</span>

                    </div>
            
                    <div class="form-grid">

                        <section class="form-column">

                            <label class="form-label">Descripción del evento:</label>
                            
                            <div class="input-container">
                                <textarea 
                                    v-model="description" 
                                    class="form-textarea" 
                                    required 
                                    @focus="resetIconError"
                                    maxlength="600"
                                ></textarea>
                                <span class="char-count">{{ description.length }}/600</span>
                            </div>
            
                            <label class="form-label">Tipo de actividad:</label>
                            
                            <select v-model="activityType" class="form-input" required @focus="resetIconError">

                                <option value="" disabled selected class="placeholder-option">
                                    Selecciona una Actividad
                                </option>

                                <option v-for="activity in activities" :key="activity" :value="activity">
                                    {{ activity }}
                                </option>

                            </select>

                        </section>
            
                        
                        <section class="form-column">

                            <label class="form-label">Fecha del evento:</label>
                            <input 
                                v-model="eventDate"
                                type="date"
                                class="time-input"
                                required
                                :min="new Date().toISOString().split('T')[0]"
                                @focus="resetIconError"
                            >

                            <div class="time-grid">

                                <div class="time-column">
                                    <label class="form-label">Hora de inicio:</label>
                                    <input v-model="startTime" type="time" class="time-input" required @focus="resetIconError">
                                </div>

                                <div class="time-column">
                                    <label class="form-label">Hora de cierre:</label>
                                    <input v-model="endTime" type="time" class="time-input" required @focus="resetIconError">
                                </div>

                            </div>

                            <label class="form-label">Ubicación</label>
                            <select v-model="location" class="form-input" required @focus="resetIconError">

                                <option value="" disabled selected class="placeholder-option">
                                    Selecciona una Ubicación
                                </option>

                                <option v-for="loc in locations" :key="loc" :value="loc">
                                    {{ loc }}
                                </option>
                            </select>
                            
                            <div class="icon-select-container row">

                                <div class="icon-select" 
                                    :class="{ 
                                        'invalid': formSubmitted && !selectedIcon,
                                        'shake': isShaking && !selectedIcon 
                                    }"
                                    @click="openIconMenu"
                                    :style="selectedIcon ? { backgroundColor: selectedIcon.bgColor } : {}">
                                    <span v-if="!selectedIcon" class="icon-select-text">
                                        Elige Icono de Evento
                                    </span>
                                    <img v-else 
                                        :src="selectedIcon.image" 
                                        :alt="selectedIcon.title"
                                        class="selected-icon-image">
                                </div>

                                <span v-if="formSubmitted && !selectedIcon" class="error-feedback">
                                    Por favor seleccione un icono
                                </span>
                            </div>
                            
                        </section>

                    </div>

                </section>
            
                <button type="submit" class="submit-button mb-3">
                    <span>CREAR</span>
                </button>

            </form>
        </div>
    </Transition>

  

    <!-- Sub-Menu de Iconos -->

    <Transition name="fade">

        <div v-if="showIconMenu" class="icon-menu-overlay" @click.self="showIconMenu = false">

            <div class="icon-menu-container">
                
                <header class="menu-header">
                    <h2 class="menu-title">SELECCIONAR ICONO</h2>
                    <button type="button" class="close-button mb-2" @click="showIconMenu = false">
                        <i class="fas fa-times"></i>
                    </button>
                </header>

                <div class="icon-view">
                    <div v-for="icon in icons" 
                        :key="icon.title"
                        class="activity-card"
                        @click="selectIcon(icon)"
                    >
                        <h2 class="activity-title">
                            {{ icon.title }}
                        </h2>
                        <div class="image-container" :style="{ backgroundColor: icon.bgColor }">
                            <img :src="icon.image" :alt="icon.title" class="activity-image" />
                            <div class="image-border"></div>
                        </div>
                    </div>
                </div>

            </div>

        </div>

    </Transition>

</template>

  

<style scoped>

    /* ### Menu de Crear Eventos ### */

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
        font-family: "Josefin Sans", -apple-system, Roboto, Helvetica, sans-serif;
        font-size: 16px;
        color: rgba(0, 14, 50, 1);
        border-radius: 10px;
        border: 1px solid rgba(126, 131, 130, 1);
        height: 200px;
        min-height: 65px;
        max-height: 350px; /* Limita la altura máxima */
        width: 100%;
        padding: 10px;
        resize: vertical; /* Solo permite redimensionar verticalmente */
        transition: all 0.3s ease;
        padding-bottom: 25px; /* Space for character count */
    }

    .create-event-form {
        width: 75%;
        height: 100%;
        max-height: 775px;
        max-width: 900px;
        border-radius: 20px;
        background-color: rgba(255, 255, 255, 1);
        box-shadow: 0px 4px 100px rgba(0, 0, 0, 0.5);
        display: flex;
        padding: 8px 24px;
        flex-direction: column;
        overflow-y: auto;
        align-items: center;
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
        font-weight: 700;
        text-align: center;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    .form-title {
        font-size: 38px;
        align-self: end;
        margin-top: 10px;
        font-weight: 700;
    }

    .close-button {
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
        background: none;

        font-size: 30px;
        color: rgba(0, 71, 255, 1);
        transition: all 0.4s ease;

        &:hover {
            color: #FBE326;
        }
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
        padding-right: 50px; /* Space for character count */

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

        display: flex;
        gap: 20px;
    }

    .form-column {
        width: 50%;
        display: flex;
        flex-direction: column;
    }

    .time-grid {
        display: flex;
        gap: 20px;
    }

    .time-column {
        width: 50%;
    }

    .time-input {
        font-size: 16px;
        font-weight: 600;
        color: rgba(0, 14, 50, 1);
        border-radius: 10px;
        border: 1px solid rgba(126, 131, 130, 1);
        height: 54px;
        width: 100%;
        padding: 10px;
        transition: all 0.3s ease;
    }

    .submit-button {
        display: flex;
        justify-content: center;
        align-items: center;

        border-radius: 20px;
        background-color: rgba(0, 71, 255, 1);
        margin-top: 25px;
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
        transition: all 0.4s ease;

        span {
            height: 40px;
        }

        &:hover {
            background-color: #FBE326;
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

    .input-container {
        position: relative;
        width: 100%;
    }

    .char-count {
        position: absolute;
        bottom: 5px;
        right: 10px;
        font-size: 12px;
        color: rgba(0, 14, 50, 0.6);
        font-family: "Josefin Sans", -apple-system, Roboto, Helvetica, sans-serif;
    }

    /* ### Sub-Menu de Iconos ### */

    .icon-view {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 20px;
        padding: 24px;
        max-width: 1200px;
        margin: 0 auto;
        overflow-y: auto; /* Añadido */
        max-height: calc(90vh - 89px); /* Añadido - altura del viewport menos altura del header */
    }

    .activity-card {
        position: relative;
        width: 100%;
        aspect-ratio: 1;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .activity-card:hover {
        transform: scale(1.05);

        .image-border{
            opacity: 1;
        }
    }

    .activity-title {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        background-color: #000E32;
        color: white;
        padding: 10px;
        margin: 0;
        font-family: 'Josefin Sans';
        font-size: 16px;
        font-weight: 700;
        text-align: center;
        z-index: 1;
        border-radius: 30px 30px 0px 0px;
    }

    .image-container {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 40px 20px 20px 20px;
        border-radius: 30px;
    }

    .image-border {
        opacity: 0;
        position: absolute;
        border: 1px solid #000E32;
        border-radius: 50%;
        width:75%;
        height: 75%;
        object-fit: contain;
        margin: 13px auto 0;

        background: none;
        transition: all 0.3s ease;
    }

    .activity-image {
        padding-top: 10px;
        max-width: 80%;
        max-height: 80%;
        object-fit: contain;
    }

    .icon-select-container {
        position: relative;
        width: fit-content;
        margin: 10px auto 0;
        /* Agregar padding-bottom para dejar espacio para el mensaje de error */
        padding: 0px 20px 10px 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .icon-select {
        position: relative;
        border: 1px solid rgba(126, 131, 130, 1);
        border-radius: 50%;
        width: 180px;
        height: 180px;
        margin: 10px auto 0;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        transition: all 0.3s ease;
        background-color: white;
    }

    .shake {
        animation: shake 0.5s;
    }

    /* Remover el estilo anterior de form:invalid */
    /* Agregar nuevos estilos para la validación */
    .icon-select.invalid {
        border-color: red;
        box-shadow: 0 0 5px rgba(255, 0, 0, 0.2);
    }

    .error-feedback {

        position: absolute;
        bottom: -15px;
        left: 50%;
        transform: translateX(-50%);
        color: red;
        font-size: 12px;
        text-align: center;
        font-family: "Josefin Sans", -apple-system, Roboto, Helvetica, sans-serif;
        width: 100%;
        /* Eliminar margin ya que usamos posicionamiento absoluto */
        margin: 0;
    }

    /* Mantener los estilos de hover */
    .icon-select:hover:not(.invalid) {
        border-color: rgba(0, 71, 255, 0.5);
        box-shadow: 0 0 5px rgba(0, 71, 255, 0.2);
    }

    .icon-select.invalid:hover {
        border-color: red;
        box-shadow: 0 0 8px rgba(255, 0, 0, 0.3);
    }

    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-15px); }
        75% { transform: translateX(15px); }
    }

    .icon-select:hover {
        border-color: rgba(0, 71, 255, 0.5);
        box-shadow: 0 0 5px rgba(0, 71, 255, 0.2);
    }

    .icon-select-text {
        color: rgba(126, 131, 130, 1);
        font-family: "Josefin Sans", -apple-system, Roboto, Helvetica, sans-serif;
        font-size: 16px;
        text-align: center;
        padding: 20px;
        height: 80px;
    }

    .selected-icon-image {
        width: 80%;
        height: 80%;
        object-fit: contain;
    }

    .icon-menu-overlay {
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

    .icon-menu-container {
        background-color: white;
        border-radius: 20px;
        max-width: 90%;
        max-height: 90vh;
        box-shadow: 0px 4px 100px rgba(0, 0, 0, 0.5);
        position: relative; /* Añadido */
        padding: 0; /* Modificado */
        overflow: hidden; /* Cambiado de overflow-y: auto */
    }

    .menu-header {
        position: sticky; /* Cambiado de position: fixed */
        top: 0;
        left: 0;
        right: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 24px;
        padding-bottom: 20px;
        padding-left: 24px;
        padding-right: 24px;
        background-color: white; /* Añadido */
        z-index: 2; /* Añadido */
        border-bottom: 1px solid rgba(0, 0, 0, 0.1); /* Añadido */
    }

    .menu-title {
        font-family: "Crimson Text", -apple-system, Roboto, Helvetica, sans-serif;
        font-size: 38px;
        color: rgba(0, 14, 50, 1);
        font-weight: 700;
        margin: 0; /* Añadido */
    }

    /* ################## Media Queries ################## */

    /* Breakpoint 768px */
    @media (max-width: 768px) {

        .create-event-form {
            width: 95%;
            padding: 15px 10px;
            max-height: 90vh;
        }

        .form-content {
            width: 100%;
            padding: 0 15px;
        }

        .form-grid {
            flex-direction: column;
            width: 100%;
            margin: 0;
            padding: 0;
        }

        .form-column {
            width: 100%;
        }

        .time-grid {
            width: 100%;
            padding: 0;
            gap: 10px;
        }

        .time-column {
            width: 100%;
        }

        .submit-button {
            max-width: 100%;
        }

        .icon-view {
            flex-direction: column;
            align-items: center;
        }

        .form-title {
            font-size: 28px;
        }

        .close-button {
            font-size: 24px;
        }

        .form-label {
            font-size: 14px;
            margin: 8px 0 4px 4px;
        }
        
        .input-container {
            width:100%;
        }

        .form-input {
            height: 35px;
            font-size: 14px;
            padding: 8px;
        }

        .form-textarea {
            height: 150px;
            font-size: 14px;
        }

        .time-input {
            height: 45px;
            font-size: 14px;
        }

        .submit-button {
            padding: 15px;
            font-size: 24px;

            span {
                height: 30px;
            }
        }

        /* Menú de iconos */
        .icon-select {
            width: 140px;
            height: 140px;
        }

        .icon-select-text {
            font-size: 14px;
            padding: 15px;
            height: 60px;
        }

        .icon-menu-container {
            width: 90%;
            max-height: 80vh;
        }

        .menu-header {
            padding: 15px;
        }

        .menu-title {
            font-size: 24px;
        }

        .icon-view {
            grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
            gap: 15px;
            padding: 15px;
        }

        .activity-title {
            font-size: 14px;
            padding: 8px;
        }

        .image-container {
            padding: 30px 15px 15px 15px;
        }

        .image-border {
            width: 70%;
            height: 70%;
        }

        .activity-image {
            max-width: 70%;
            max-height: 70%;
        }
    }

    /* Breakpoint 480px */
    @media (max-width: 480px) {

        .icon-view {
            grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
            gap: 10px;
            padding: 10px;
            max-height: calc(85vh - 70px); /* Ajustar la altura máxima considerando el header */
            padding-bottom: 10px; /* Añadir padding inferior */
        }

        .activity-title {
            font-size: 12px;
            padding: 6px;
        }

        .icon-menu-container {
            width: 95%;
            max-height: 85vh;
            padding-bottom: 20px; /* Añadir padding inferior */
        }

        .icon-select-container {
            padding: 0px 50px 10px 50px;
        }

        .icon-select {
            width: 120px;
            height: 120px;
        }

        .icon-select-text {
            font-size: 12px;
            padding: 10px;
            height: 50px;
        }

        .form-textarea {
            height: 120px;
        }

        .char-count {
            font-size: 10px;
        }

        .submit-button {
            padding: 12px;
            font-size: 20px;
        }
    }

</style>