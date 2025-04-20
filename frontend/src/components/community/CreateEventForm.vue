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
        emit('update:modelValue', false);
    };

</script>

<template>

    <!-- Menu de Crear Eventos -->

    <Transition name="fade">

        <div class="form-overlay" @click.self="closeForm">

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
                    <input v-model="eventName" type="text" class="form-input" required>
            
                    <div class="form-grid">

                        <section class="form-column">

                            <div class="description-section">

                                <label class="form-label">Descripción del evento:</label>
                                <textarea v-model="description" class="form-textarea" required @focus="resetIconError"></textarea>
                
                                <label class="form-label">Tipo de actividad:</label>
                                <select v-model="activityType" class="form-input" required @focus="resetIconError">

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
                                        SELECCIONAR UNA UBICACION
                                    </option>

                                    <option v-for="loc in locations" :key="loc" :value="loc">
                                        {{ loc }}
                                    </option>
                                </select>
                            
                            </div>

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
                                        :src="selectedIcon.imageUrl" 
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
                    <button type="button" class="close-button mt-4" @click="showIconMenu = false">
                        <i class="fas fa-times"></i>
                    </button>
                </header>

                <div class="recreational-activities">
                    <!-- Reemplazar todo el contenido actual del recreational-activities con: -->
                    
                    <div class="activity-card"
                        @click="selectIcon({
                            title: 'LECTURAS',
                            imageUrl: 'https://cdn.builder.io/api/v1/image/assets/TEMP/f9f6be2a94c6a95207d669e4148c4429c60f2e8a?placeholderIfAbsent=true&apiKey=31e7b46c22c443bc84c06a4f4720155e',
                            bgColor: 'rgba(248, 237, 156, 1)'
                        })"
                    >
                        <h2 class="activity-title title-top-right-radius">LECTURAS</h2>
                        <div class="image-container" style="background-color: rgba(248, 237, 156, 1)">
                            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/f9f6be2a94c6a95207d669e4148c4429c60f2e8a?placeholderIfAbsent=true&apiKey=31e7b46c22c443bc84c06a4f4720155e" alt="" class="activity-image" />
                        </div>
                    </div>

                    <div class="activity-card"
                        @click="selectIcon({
                            title: 'BANDA DE GUERRA',
                            imageUrl: 'https://cdn.builder.io/api/v1/image/assets/TEMP/07a5ccfe03a04ceeb404db097d82b8424d860004?placeholderIfAbsent=true&apiKey=31e7b46c22c443bc84c06a4f4720155e',
                            bgColor: 'rgba(197, 237, 232, 1)'
                        })"
                    >
                        <h2 class="activity-title">BANDA DE GUERRA</h2>
                        <div class="image-container" style="background-color: rgba(197, 237, 232, 1)">
                            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/07a5ccfe03a04ceeb404db097d82b8424d860004?placeholderIfAbsent=true&apiKey=31e7b46c22c443bc84c06a4f4720155e" alt="" class="activity-image" />
                        </div>
                    </div>

                    <div class="activity-card"
                        @click="selectIcon({
                            title: 'ESCOLTA',
                            imageUrl: 'https://cdn.builder.io/api/v1/image/assets/TEMP/774c27c98dfedd6f867a4a8e1949a738de5ecf7a?placeholderIfAbsent=true&apiKey=31e7b46c22c443bc84c06a4f4720155e',
                            bgColor: 'rgba(255, 175, 146, 1)'
                        })"
                    >
                        <h2 class="activity-title">ESCOLTA</h2>
                        <div class="image-container" style="background-color: rgba(255, 175, 146, 1)">
                            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/774c27c98dfedd6f867a4a8e1949a738de5ecf7a?placeholderIfAbsent=true&apiKey=31e7b46c22c443bc84c06a4f4720155e" alt="" class="activity-image" />
                        </div>
                    </div>

                    <div class="activity-card"
                        @click="selectIcon({
                            title: 'TUTORÍAS',
                            imageUrl: 'https://cdn.builder.io/api/v1/image/assets/TEMP/8a1ab2524cdc5c949f14638039420ea27f533247?placeholderIfAbsent=true&apiKey=31e7b46c22c443bc84c06a4f4720155e',
                            bgColor: 'rgba(189, 238, 166, 1)'
                        })"
                    >
                        <h2 class="activity-title title-bottom-radius">TUTORÍAS</h2>
                        <div class="image-container" style="background-color: rgba(189, 238, 166, 1)">
                            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/8a1ab2524cdc5c949f14638039420ea27f533247?placeholderIfAbsent=true&apiKey=31e7b46c22c443bc84c06a4f4720155e" alt="" class="activity-image" />
                        </div>
                    </div>

                    <div class="activity-card"
                        @click="selectIcon({
                            title: 'AJEDREZ',
                            imageUrl: 'https://cdn.builder.io/api/v1/image/assets/TEMP/f26dff28f7f1dc38613dc3763d2864c0aa701c1c?placeholderIfAbsent=true&apiKey=31e7b46c22c443bc84c06a4f4720155e',
                            bgColor: 'rgba(245, 91, 75, 1)'
                        })"
                    >
                        <h2 class="activity-title title-bottom-radius">AJEDREZ</h2>
                        <div class="image-container" style="background-color: rgba(245, 91, 75, 1)">
                            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/f26dff28f7f1dc38613dc3763d2864c0aa701c1c?placeholderIfAbsent=true&apiKey=31e7b46c22c443bc84c06a4f4720155e" alt="" class="activity-image" />
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

    .submit-button {
        display: flex;
        justify-content: center;
        align-items: center;

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
        transition: all 0.4s ease;

        span {
            height: 40px;
        }

        &:hover {
            background-color: #FBE326;
        }
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




    /* ### Sub-Menu de Iconos ### */

    .recreational-activities {
        background-color: rgba(255, 255, 255, 1);
        display: flex;
        padding: 23px 16px;
        align-items: stretch;
        gap: 26px;
        overflow: hidden;
    }

    .activity-card {
        display: flex;
        flex-direction: column;
        align-items: stretch;
    }

    .activity-title {
        align-self: center;
        padding: 10px;
        gap: 10px;
        font-family: Nunito Sans, -apple-system, Roboto, Helvetica, sans-serif;
        font-size: 15px;
        color: rgba(0, 14, 50, 1);
        font-weight: 700;
        white-space: nowrap;
    }

    .image-container {
        border-color: rgba(126, 131, 130, 1);
        border-style: solid;
        border-width: 1px;
        border-radius: 50%;
        display: flex;
        margin-top: 5px;
        padding: 30px;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        aspect-ratio: 1;
    }

    .activity-image {
        aspect-ratio: 1;
        object-fit: contain;
        object-position: center;
        width: 152px;
        border-radius: 200px;
    }

    .title-top-right-radius {
        border-radius: 0 10px 0 0;
    }
    
    .title-bottom-radius {
        border-radius: 0 0 10px 10px;
    }

    @media (max-width: 991px) {
        .recreational-activities {
            flex-direction: column;
            align-items: center;
        }

        .activity-title {
            white-space: initial;
        }
    
        .image-container {
            padding: 20px;
        }
    }

    .icon-select-container {
        position: relative;
        width: fit-content;
        margin: 32px auto 0;
        /* Agregar padding-bottom para dejar espacio para el mensaje de error */
        padding-bottom: 20px;
        padding-left: 20px;
        padding-right: 20px;
    }


    .icon-select {
        position: relative;
        border: 1px solid rgba(126, 131, 130, 1);
        border-radius: 50%;
        width: 180px;
        height: 180px;
        margin: 13px auto 0;
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
        bottom: 0;
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
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }

    /* Asegurarse que el contenedor tenga suficiente espacio para el mensaje de error */
    .icon-select-container {
        position: relative;
        width: fit-content;
        margin: 16px auto 0;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    /* ...rest of existing styles... */

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
        padding: 24px;
        max-width: 90%;
        max-height: 90vh;
        overflow-y: auto;
        box-shadow: 0px 4px 100px rgba(0, 0, 0, 0.5);
    }

    .menu-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }

    .menu-title {
        font-family: "Crimson Text", -apple-system, Roboto, Helvetica, sans-serif;
        font-size: 22px;
        color: rgba(0, 14, 50, 1);
        font-weight: 600;
    }

</style>