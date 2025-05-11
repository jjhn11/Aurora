<script setup>
import HeroVideo from '@/components/Events/HeroVideo.vue';
import CubicleCard from '@/components/Library/CubicleCard.vue';
import CubicleCard2 from '@/components/Library/CubicleCard2.vue';
import CubicleForm from '@/components/Library/CubicleForm.vue';
import { ref, computed, watch, onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const bannerImage = new URL('@/assets/img/library/cubiclesImage.jpg', import.meta.url).href;
const showForm = ref(false);

// Authentication check
const isAuthenticated = computed(() => {
    const authState = store.state.user;
    return !!(authState && authState.isAuthenticated && authState.userData);
});

// Form handlers
const handleFormSuccess = () => {
    showForm.value = false;
};

// Watch for auth state changes
watch(
    () => store.state.user,
    (newUserState) => {
        if (!newUserState || !newUserState.isAuthenticated) {
            // Close form if user logs out
            showForm.value = false;
        }
    },
    { deep: true }
);

// ON MOUNTED
onMounted(() => {
  // Check initial auth state
  const authState = store.state.user;
  if (!authState || !authState.isAuthenticated) {
    showForm.value = false;
  }
});
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Crimson+Text:wght@400;600;700&family=Josefin+Sans:wght@400;600&display=swap');
</style>

<template>
    <HeroVideo :img="bannerImage" title="CUBICULOS" />
    <br><br>
    <h1 class="text">HORARIO DISPONIBLE: 7 a.m. - 9 p.m.</h1>
    <br>
    <CubicleCard />
    <br><br>
    <CubicleCard2 />
    <br><br>
    <div class="button-container">
        <button 
            class="outline-button" 
            @click="showForm = true"
            :disabled="!isAuthenticated"
        >
            RESERVAR CUBÍCULO
        </button>
    </div>

    <!-- Cubicle Reservation Form -->
    <CubicleForm 
        v-model="showForm"
        @form-sent-success="handleFormSuccess"
    />
</template>

<style scoped>
.text {
    margin-top: 5%;
    margin-bottom: 7%;
    text-align: center;
    font-weight: 700;
    size: 64px;
    font-family: "crimson text";
}

.button-container {
    display: flex;
    justify-content: center;
    margin-top: 5%; 
    margin-bottom: 10%; 
}

.outline-button {
    width: 30%;
    height: 20%;
    background-color: transparent;
    color: rgb(0, 0, 0);           
    border: 2px solid rgb(0, 0, 0);       
    padding: 10px 10px;
    border-radius: 20px;
    cursor: pointer;
    font-size: 35px;
    font-weight: 700;
    font-family: "nunito sans";
    transition: all 0.3s ease;
}

/* .outline-button:hover {
    background-color: #000;
    color: #fff;
} */
.outline-button:hover:not(:disabled) {
    background-color: #000;
    color: #fff;
}

.outline-button:disabled {
  background-color: #cccccc;
  border-color: #999999;
  color: #666666;
  cursor: not-allowed;
  opacity: 0.7;
}

@media (max-width:576px) {
    .text {
        font-size: 25px;
    }
    .outline-button {
        width: 70%;
        border-radius: 30px;
        font-size: 20px;
    }
}
</style>