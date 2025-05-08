<template>
    <div class="container">
      <div class="card mb-3">
        <div class="row g-0">
          <div class="col-md-8">
            <div class="card-body">
              <p class="card-text">Numero minimo de personas: 4 personas</p>
              <p class="card-text">Numero maximo de personas: 8 personas</p>
              <p class="card-text">Tiempo de estancia: El solicitado</p>
              <p class="card-text">Via de apartado: Internet</p>
              <p class="card-text">Para mas detalles e informacion, acudir a la planta baja de Biblioteca.</p>
            </div>
          </div>
          <div class="col-md-4">
              <img src="@/assets/img/library/cubicleCardImage1.jpg" class="img-fluid" alt="Cubículos de estudio">
          </div>
        </div>
      </div>
    </div>
</template>
<style scoped>
.col-md-4 img {
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px ;
  height: 100%; 
  object-fit: cover; 
}
.container {
width: 100%;
display: flex;
justify-content: center;
align-items: center; 
padding: 20px;  
}

.card {
background-color: #6a6a6a;
border-radius: 10px;
width: 70%;
}

.col-md-8 {
display: flex;
align-items: center;
}

.card-text {
color: white;
font-weight: 700;
font-size: 1.2rem;
line-height: 1.8;
font-family: "Nunito Sans", sans-serif;
text-align: right;
}

/* movil */
@media (max-width: 768px) {
.card {
  padding-top: 1%;
  padding-right: 1%;
  padding-bottom: 1%;
  border-radius: 6%;
  width: 100%; 
  margin: 0 10px;
}
.card-text {
  font-size: 12px;
  line-height: 12px;
}

.row {
  display: flex;
  flex-wrap: nowrap; 
}

.col-md-4 {
  width: 30%; 
}

.col-md-8 {
  width: 70%; 
  padding: 0px;
}

.col-md-4 img {
  border-radius: 20px;
  height: 100%;
  width: auto;
  object-fit: cover;
}
}
</style>