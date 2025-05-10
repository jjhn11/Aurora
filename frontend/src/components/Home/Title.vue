<script setup>
    defineProps({
            title: String,
            border: {
                type: Boolean,
                default: false
            }
    });
</script>

<template>
    <div class="container-fluid text-center">
                <div v-if="border" class="d-flex justify-content-center">
                    <h1 class="title borders">{{ title }}</h1>
                </div>
                <div v-else class="d-flex justify-content-center">
                    <h1 class="title">{{ title }}</h1>
                </div>
    </div>
</template>

<style scoped>
.title {
    font-family: Crimson Text;
    font-weight: 600;
    font-size: 50px;
    line-height: 100%;
    letter-spacing: 0%;
    width: 70%;
    margin-bottom: 30px;
}
.borders {
    border-top: 3.75px solid #0047FF;
    border-bottom: 3.75px solid #0047FF;
    padding: 25px 0 10px 0;
}

@media (max-width: 768px) {
  .title {
    font-size: 45px;
    width: 90%;
    margin-bottom: 5px;
  }

  .borders {
    border-top: 2.5px solid #0047FF;
    border-bottom: 2.5px solid #0047FF;
    padding: 15px 0 5px 0;
  }
}

@media (max-width: 480px) {
  .title {
    font-size: 35px;
    width: 95%;
  }
}
</style>