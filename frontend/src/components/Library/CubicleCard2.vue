<template>
  <div class="cubicle-container">
    <div class="text-box">
      <p class="bold"> Número mínimo de personas:</p>
      <p> 4 personas</p>
      <p class="bold"> Número máximo de personas:</p>
      <p> 8 personas</p>
      <p class="tlo"> El tiempo de reserva varia según la disponibilidad</p>
    </div>
    <div class="image-wrapper">
      <img src="@/assets/img/library/cubicleCardImage1.jpg" alt="Cubículos de estudio" />
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
  flex-wrap: wrap;
  height: 400px;
}
.bold {
  font-weight: 700;
  font-family: "Nunito Sans", sans-serif;
}
.image-wrapper img {
  border-radius: 20px;
  width: 280px;
  height: 340px;
  object-fit: cover;
  transform: scaleX(-1);

}
.tlo {
  margin-top: 8%;
  font-style: italic;
}
.text-box {
  background-color: #313D59;
  color: white;
  border-radius: 50px;
  padding-top: 20px;
  padding-left: 50px;
  padding-right: 50px;
  text-align: center;
  /*padding: 30px;*/
  max-width: 550px;
  height: 340px;
  font-family: "Nunito Sans", sans-serif;
  font-size: 32px;
  font-weight: 300;
  line-height: 1.1;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

@media (max-width: 1058px) {
  .cubicle-container {
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: flex-start;
    justify-content: center;
    padding: 10px;
    gap: 10px;
    width: 100%;
    height: 230px;
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
    font-size: 16px;
    line-height: 1;
    height: 100%;
    padding: 10px;
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
    height: 230px;
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
    line-height: 1;
    height: 100%;
    padding: 10px;
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
