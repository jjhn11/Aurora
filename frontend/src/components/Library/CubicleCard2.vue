<template>
  <div class="cubicle-container">
    <div class="text-box">
      <p> Número mínimo de personas:  4</p>
      <p> Número máximo de personas:  8</p>
      <p> Tiempo de estancia:  Según lo solicitado</p>
      <p> Vía de apartado:  Biblioteca en línea</p>
      <p> Para más detalles e información:  Acudir a la planta baja de la biblioteca.</p>
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
  gap: 20px;
  padding: 30px;
  flex-wrap: wrap;
  height: 500px;
}

.image-wrapper img {
  border-radius: 20px;
  width: 280px;
  height: auto;
  object-fit: cover;
  transform: scaleX(-1);

}

.text-box {
  background-color: #00113d;
  color: white;
  border-radius: 30px;
  padding-top: 30px;
  padding-left: 60px;
  padding-right: 60px;
  /*padding: 30px;*/
  max-width: 700px;
  height: 380px;
  font-family: "Nunito Sans", sans-serif;
  font-size: 23px;
  line-height: 1.8;
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
