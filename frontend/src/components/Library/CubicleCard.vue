<template>
  <div class="container">
    <div class="card mb-3">
      <div class="row g-0">
        <div class="col-12 col-md-4">
          <img src="@/assets/img/library/cubicleCardImage1.jpg" class="img-fluid" alt="Cubículos de estudio">
        </div>
        <div class="col-12 col-md-8">
          <div class="card-body">
            <p class="card-text">Los cubiculos son espacios reservados para los estudios o ciertas clases, a diferencia de los salones normales, los cubiculos puedes ser apartados por los alumnos. Se encuentran en la planta Alta de Biblioteca.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.col-md-4 img {
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px ;
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
padding-right: 10%;
font-family: "Nunito Sans", sans-serif;
}

/* movil */
@media (max-width: 768px) {
.card {
  padding-top: 1%;
  padding-left: 1%;
  padding-bottom: 1%;
  border-radius: 6%;
  width: 100%; 
  margin: 0 10px;
}
.card-text {
  font-size: 12px;
  line-height: 20px;
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
  object-fit: cover;
}
}
</style>