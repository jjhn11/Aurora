<template>
    <div class="container-fluid d-flex justify-content-center">
      <div class="row flex-column d-flex justify-content-center align-items-center gap-3 flex-md-row">
        <div class="col-auto">
          <img src="@/assets/img/home/CajasBiblioteca.png" class="custom-image"/>
        </div>
        <div class="col-auto">
            <a href="https://docs.google.com/forms/u/2/d/e/1FAIpQLSf5KSHsmp2u8pep-7FZx0f5uOMGqeAtx6JHXEyH-dpcGofPSQ/viewform">
                <img src="@/assets/img/home/QRBiblioteca.png" class="custom-image"/>
            </a>
        </div>
      </div>
    </div>
  </template>
  
<style scoped>

  .custom-image {
    height: 359px;
    width: 359px;
    border: 2px solid black;
    border-radius: 12px;
    object-fit: cover;
  }

  @media (max-width: 1076px) {
    .custom-image {
      height: 359px;
      width: 359px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  @media (max-width: 576px) {
    .custom-image {
      height: 259px;
      width: 259px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

</style>