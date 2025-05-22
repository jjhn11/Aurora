<template>
  <div class="cubicle-container">
    <div class="image-wrapper">
      <img src="@/assets/img/library/cubicleCardImage1.jpg" alt="Cubículos de estudio" />
    </div>
    <div class="text-box">
      <p>
        Los cubículos son espacios diseñados para el estudio grupal, pueden ser
        reservados por los alumnos según sus necesidades. Se encuentran distribuidos
        tanto en la planta alta como en la planta baja de la biblioteca, ofreciendo un ambiente
        cómodo y adecuado para el aprendizaje y el trabajo colaborativo
      </p>
    </div>
  </div>
</template>

<style scoped>

.cubicle-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 60px;
  padding: 30px;
  flex-wrap: nowrap;
  height: 380px;
}

.image-wrapper img {
  border-radius: 20px;
  width: 280px;
  height: 340px;
  object-fit: cover;
}
.text-box {
  background-color: #313D59;
  color: white;
  border-radius: 50px;
  padding-left: 30px;
  padding-right: 30px;
  max-width: 550px;
  height: 340px;
  font-family: "Nunito Sans", sans-serif;
  font-size: 27px;
  font-weight: 300;
  text-align: center;
  line-height: 1.3;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);

  display: flex;
  justify-content: center;
  align-items: center;
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
@media (max-width: 668px) {
  .cubicle-container {
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: flex-start;
    justify-content: center;
    padding: 10px;
    gap: 10px;
    width: 100%;
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
    line-height: 1.2;
    min-height: 180px;
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

