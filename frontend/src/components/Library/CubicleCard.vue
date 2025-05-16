<template>
  <div class="cubicle-container">
    <div class="image-wrapper">
      <img src="@/assets/img/library/cubicleCardImage1.jpg" alt="Cubículos de estudio" />
    </div>
    <div class="text-box">
      <p>
        Los cubículos son espacios reservados para el estudio en conjunto o para ciertas clases.
        A diferencia de los salones, los cubículos pueden ser apartados por los estudiantes.
        Se encuentran ubicados en la planta alta de la biblioteca.
      </p>
    </div>
  </div>
</template>

<style scoped>

.cubicle-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 30px;
  flex-wrap: nowrap;
  height: 400px;
}

.image-wrapper img {
  border-radius: 20px;
  width: 280px;
  height: auto;
  object-fit: cover;
}
.text-box {
  background-color: #00113d;
  color: white;
  border-radius: 30px;
  padding: 60px;
  max-width: 700px;
  height: 380px;
  font-family: "Nunito Sans", sans-serif;
  font-size: 23px;
  line-height: 1.8;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);

  display: flex;
  justify-content: center;
  align-items: center;
  text-align:justify;
}

@media (max-width: 1058px) {
  .text-box {
    flex: 1;
    font-size: 18px;
    line-height: 1.5;
    min-height: 100%;
    height: auto;
    padding: 15px;
    border-radius: 15px;
    box-sizing: border-box;
  }
}
@media (max-width: 768px) {
  .cubicle-container {
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: flex-start;
    justify-content: center;
    padding: 10px;
    gap: 10px;
    width: 100%;
    height: 210px;
  }

  .image-wrapper {
    height: 100%;
    flex: 0 0 40%;
  }

  .image-wrapper img {
    width: 100%;
    height: 100%;
    border-radius: 15px;
    object-fit: cover;
  }

  .text-box {
    flex: 1;
    font-size: 12px;
    line-height: 1.5;
    min-height: 100%;
    height: auto;
    padding: 15px;
    border-radius: 15px;
    box-sizing: border-box;
  }
}
@media (max-width: 320px) {
  .cubicle-container {
    min-height: 210px;
    height: auto;
  }

  .image-wrapper {
    height: 100%;
    flex: 0 0 40%;
  }

  .image-wrapper img {
    width: 100%;
    height: 100%;
    border-radius: 15px;
    object-fit: cover;
  }

  .text-box {
    flex: 1;
    font-size: 12px;
    line-height: 1.5;
    min-height: 100%;
    height: auto;
    padding: 15px;
    border-radius: 15px;
    box-sizing: border-box;
  }
}

</style>

