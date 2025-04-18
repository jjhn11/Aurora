<script setup>
  // [Imports]
  import { RouterLink, useRoute } from 'vue-router';
  import { ref, onMounted, onUnmounted, computed, watch } from 'vue';
  import { useStore } from 'vuex';
  const store = useStore();
  
  // [Imagenes]
  import logo from '../assets/img/navbar/LogoAurora.png';
  import tec from '../assets/img/navbar/tec.png';
  import B1N from '../assets/img/navbar/B1 NOVEDADES.png';
  import B2R from '../assets/img/navbar/B2 RESEÑAS.png';
  import B3C from '../assets/img/navbar/B3 CATALOGO.png';
  import E1C from '../assets/img/navbar/E1 CULTURALES.png';
  import E2D from '../assets/img/navbar/E2 DEPORTIVOS.png';
  import E3E from '../assets/img/navbar/E3 ESCOLARES.png';
  import C1R from '../assets/img/navbar/C1 RECREATIVAS.png'
  import C2D from '../assets/img/navbar/C2 DEPORTES.png'
  import C3C from '../assets/img/navbar/C3 CULTURAL.png'
  import C4V from '../assets/img/navbar/C4 VIDEOJUEGOS.png'
  import DDMV from '../assets/img/navbar/DDM VACIO.png';

  import INV from '../assets/img/navbar/INVITADO.png';
  import ZEN from '../assets/img/navbar/ZENY PERFIL.png';

  // [JavaScript]

    // Función para verificar si un enlace está activo

    const isActiveLink = (routePath) => {
      const route = useRoute();
      return route.path === routePath;
    }

    // @@@@@@@@@@@@@@@@@@@@@ Nav Bar @@@@@@@@@@@@@@@@@@@@@

        // Estado reactivo para controlar la visibilidad del Container Edu
        const showEduContainer = ref(true);
        
        // Estado reactivo para controlar si la navbar está reducida
        const isNavbarShrunk = ref(false);

        // Función para manejar el evento de scroll
        const handleScroll = () => {
          showEduContainer.value = window.scrollY === 0; // Mostrar solo si el scroll está en la parte superior
          isNavbarShrunk.value = window.scrollY > 0; // Reducir la navbar si el scroll es mayor a 0
        };

        // Registrar y eliminar el evento de scroll
        onMounted(() => {
          window.addEventListener('scroll', handleScroll);
        });

        onUnmounted(() => {
          window.removeEventListener('scroll', handleScroll);
        });



    // @@@@@@@@@@@@@@@@@@@@@ Menu de Usuario @@@@@@@@@@@@@@@@@@@@@

      // ## Datos reactivos para el menú de usuario ##

        // Add computed properties for auth state and user
        const isAuthenticated = computed(() => store.state.isAuthenticated);
        const user = computed(() => store.state.user);

        watch(() => store.state.isAuthenticated, (newValue) => {
          currentView.value = newValue ? 'MainMenuAc' : 'MainMenu';
          viewStack.value = [currentView.value];
        });

        // Reactive data for the user menu
        const showMenu = ref(false) // Estado del menú de usuario
        const currentView = ref('MainMenu') // Vista actual del menú
        const viewStack = ref(['MainMenu']) // Pila de vistas para la navegación

      // ## Funciones para manejar la navegación del menú ##

        // Función para mostrar/ocultar el menú de usuario

        const toggleMenu = () => {
          showMenu.value = !showMenu.value;
        }

        // Función para cerrar el menú
        const closeMenu = () => {
          showMenu.value = false;
        };
        
        // Función para manejar clics fuera del formulario
        const handleClickOutside = (event) => {
          const form = document.getElementById('uform');
          if (form && !form.contains(event.target)) {
            closeMenu();
          }
        };

        // Registrar y eliminar el evento global de clic
        onMounted(async () => {
          await store.dispatch('checkAuth');

          currentView.value = store.state.isAuthenticated ? 'MainMenuAc' : 'MainMenu';
          viewStack.value = [currentView.value];

          document.addEventListener('click', handleClickOutside);
        });

        onUnmounted(() => {
          document.removeEventListener('click', handleClickOutside);
        });

        // Función para navegar a una vista específica y agregarla a la pila de vistas

        const navigateTo = (view) => {
          viewStack.value.push(view)
          currentView.value = view
        }

        // Función para regresar a la vista anterior (si hay más de una vista en la pila)

        const goBack = () => {
          if (viewStack.value.length > 1) {
            viewStack.value.pop()
            currentView.value = viewStack.value[viewStack.value.length - 1]
          } else {
            // Si solo queda una vista en la pila, volver a la vista principal según el estado de autenticación
            currentView.value = isAuthenticated.value ? 'MainMenuAc' : 'MainMenu'
            viewStack.value = [currentView.value]
          }
        }

        // Agrega estas nuevas funciones para manejar el inicio y cierre de sesión
        const handleLogin = async () => {
          await store.dispatch('loginWithGoogle');
          // isAuthenticated.value = true
          currentView.value = 'MainMenuAc'
          viewStack.value = ['MainMenuAc'] // Resetea la pila de vistas
        }

        const handleLogout = () => {
          store.dispatch('logout');
          // isAuthenticated.value = false
          currentView.value = 'MainMenu'
          viewStack.value = ['MainMenu'] // Resetea la pila de vistas
        }

        // ## Datos reactivos para las configuraciones ##

        const darkTheme = ref(false)
        const currentFontSize = ref(1)
        const fontSizes = [0.8, 1, 1.2]
        const currentLanguage = ref('Español')

      // ## Funciones para manejar las configuraciones ##
      
        // Cambia el tema entre claro y oscuro

        const toggleTheme = () => {
          darkTheme.value = !darkTheme.value
          document.body.classList.toggle('dark-theme', darkTheme.value)
        }

        // Cambia el tamaño de la fuente entre los valores definidos en fontSizes y actualiza el tamaño de fuente del documento
        
        const changeFontSize = () => {
          const currentIndex = fontSizes.indexOf(currentFontSize.value)
          const nextIndex = (currentIndex + 1) % fontSizes.length
          currentFontSize.value = fontSizes[nextIndex]
          document.documentElement.style.fontSize = `${currentFontSize.value}rem`
        }

        // Cambia el idioma actual y actualiza la lógica de idioma (aquí se puede agregar la lógica para cambiar el idioma de la aplicación)
        // En este caso, solo se actualiza el valor de currentLanguage

        const changeLanguage = (lang) => {
          currentLanguage.value = lang
          // Aquí iría la lógica para cambiar el idioma
        }

  ///////////////////////////

</script>

<template>
  
  <!-- @@@@@@@@ Navbar @@@@@@@@ -->

  <div class="container-fluid p-3">
    
    <nav class="navbar navbar-expand-lg navbar-light fixed-top justify-content-center" :class="{ 'navbar-shrunk': isNavbarShrunk }">
      
      <div class="col-12">
  
          <!-- CONTAINER EDU -->
          
            <div class="container-fluid p-1 mb-3 mt-2 d-flex justify-content-center mb-1" id="edu" :class="{ 'edu-shrunk': isNavbarShrunk }">

              <header>
                <img :src="tec" width="525" height="70">
              </header>
            
            </div>

          <!-- CONTAINER NAVBAR -->

          <div class="container-fluid pb-3 justify-content-center">

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" 
              aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
              
              <a class="navbar-brand me-auto" id="aurlog" :style="{ transform: isNavbarShrunk ? 'translateY(25px)' : 'translateY(0)' }">
                  <img :src="logo" width="130" height="50" id="log">
                  <span id="aur">AURORA</span>
              </a>

              <ul class="navbar-nav border-top border-black border-2 d-flex justify-content-center" id="nav" :class="{ 'no-border': isNavbarShrunk }">

                <li class="nav-item pe-5 mt-4 ms-3 me-5">
                  <RouterLink to="/" class="nav-link" id="bot" :class="{ 'active-link': isActiveLink('/') }">
                    INICIO
                  </RouterLink>
                </li>

                <li class="nav-item dropdown position-static pe-5 mt-4 ms-5 me-4" id="droph">
                  <RouterLink to="/library" class="nav-link" role="button" aria-expanded="false" id="bot" :class="{ 'active-link': isActiveLink('/library') }">
                    BIBLIOTECA
                  </RouterLink>

                  <ul class="dropdown-menu">
                    <div class="container-fluid d-flex justify-content-center align-items-center">
                      <div class="row w-100 justify-content-center px-0">

                        <div class="col-12 col-md-4 py-2">

                          <li><RouterLink to="/library" class="dropdown-item" id="dbut">
                            <img :src="B1N" class="mt-3" id="dim3">
                            <span class="my-3">NOVEDADES</span>
                          </RouterLink></li>

                        </div>

                        <div class="col-12 col-md-4 py-2">

                          <li><RouterLink to="/library" class="dropdown-item" id="dbut">
                            <img :src="B2R" class="mt-3" id="dim3">
                            <span class="my-3">RESEÑAS</span>
                          </RouterLink></li>

                        </div>

                        <div class="col-12 col-md-4 py-2">

                          <li><RouterLink to="/library" class="dropdown-item" id="dbut">
                            <img :src="B3C" class="mt-3" id="dim3">
                            <span class="my-3">CATALOGO</span>
                          </RouterLink></li>

                        </div>
                        
                      </div>
                    </div>
                  </ul>

                </li>

                <li class="nav-item dropdown position-static pe-5 mt-4 ms-5 me-4" id="droph">
                  <RouterLink to="/events" class="nav-link" role="button" aria-expanded="false" id="bot" :class="{ 'active-link': isActiveLink('/events') || isActiveLink('/events/cultural') || isActiveLink('/events/sports') || isActiveLink('/events/school') }">
                    EVENTOS
                  </RouterLink>
                  
                  <ul class="dropdown-menu">
                    <div class="container-fluid d-flex justify-content-center align-items-center">
                      <div class="row w-100 justify-content-center px-0">

                        <div class="col-12 col-md-4 py-2">

                          <li><RouterLink to="/events/cultural" class="dropdown-item" id="dbut">
                            <img :src="E1C" class="mt-3" id="dim3">
                            <span class="my-3">CULTURALES</span>
                          </RouterLink></li>

                        </div>

                        <div class="col-12 col-md-4 py-2">

                          <li><RouterLink to="/events/sports" class="dropdown-item" id="dbut">
                            <img :src="E2D" class="mt-3" id="dim3">
                            <span class="my-3">DEPORTIVOS</span>
                          </RouterLink></li>

                        </div>

                        <div class="col-12 col-md-4 py-2">

                          <li><RouterLink to="/events/school" class="dropdown-item" id="dbut">
                            <img :src="E3E" class="mt-3" id="dim3">
                            <span class="my-3">ESCOLARES</span>
                          </RouterLink></li>

                        </div>
                        
                      </div>
                    </div>
                  </ul>

                </li>

                <li class="nav-item dropdown position-static mt-4 ms-5 me-2" id="droph">
                  <RouterLink class="nav-link" role="button" aria-expanded="false" id="bot" :class="{ 'active-link': isActiveLink('/community/cultural') || isActiveLink('/community/gaming') || isActiveLink('/community/sports') || isActiveLink('/community/recreational')}">
                    COMUNIDAD
                  </RouterLink>

                  <ul class="dropdown-menu">
                    <div class="container-fluid d-flex justify-content-center align-items-center">
                      <div class="row w-110 justify-content-center px-0">

                        <div class="col-12 col-md-3 py-2 px-1">

                          <li><RouterLink to="/community/recreational" class="dropdown-item" id="dbut">
                            <img :src="C1R" class="mt-4" id="dim4">
                            <span class="my-3">RECREATIVAS</span>
                          </RouterLink></li>

                        </div>

                        <div class="col-12 col-md-3 py-2 px-1">

                          <li><RouterLink to="/community/sports" class="dropdown-item" id="dbut">
                            <img :src="C2D" class="mt-4" id="dim4">
                            <span class="my-3">DEPORTES</span>
                          </RouterLink></li>

                        </div>

                        <div class="col-12 col-md-3 py-2 px-1">

                          <li><RouterLink to="/community/cultural" class="dropdown-item" id="dbut">
                            <img :src="C3C" class="mt-4" id="dim4">
                            <span class="my-3">CULTURAL</span>
                          </RouterLink></li>

                        </div>

                        <div class="col-12 col-md-3 py-2 px-1">

                          <li><RouterLink to="/community/gaming" class="dropdown-item" id="dbut">
                            <img :src="C4V" class="mt-4" id="dim4">
                            <span class="my-3">VIDEOJUEGOS</span>
                          </RouterLink></li>

                        </div>
                        
                      </div>
                    </div>
                  </ul>
                  
                </li>
              </ul>
              
              <button @click.stop="toggleMenu" type="button" class="btn btn-white mt-3 ms-auto me-5 justify-content-center" id="user"> 
                <i class="bi bi-person-circle"></i>
              </button>

            </div>

          </div>
    
      </div>

    </nav>

  </div>

  <!-- @@@@@@@@ Menu de Usuario @@@@@@@@ -->

  <div class="container-fluid p-3">
    
    <!-- Contenedor del menú -->
    <form class="bg-white border" id="uform"  :class="{'form-shrunk': isNavbarShrunk,
                                                        'show': showMenu, 
                                                        'hide': !showMenu
                                                      }, currentView === 'MainMenuAc' ? 'ac-size' : 'nac-size'" 
    @click.stop>

      <div>

        <div class="container-fluid p-1 justify-content-center d-flex flex-column align-items-center">
          
          <!-- ######################### Ventana Principal Sin Cuenta ######################### -->

          <!-- <div v-if="!isAuthenticated"> -->
          <div v-if="currentView === 'MainMenu'">

            <!-- ------------------------------------------- -->
            
            <div class="container mt-3">

              <div class="row">

                <div class="col-4 mb-3 pe-4 d-flex justify-content-center align-items-center">
                  <img :src="INV">
                </div>

                <div class="col-8 mb-3 ps-2 d-flex justify-content-center align-items-center">
                  <label class="form-menu-label">
                    INVITADO
                  </label>
                </div>

              </div>

            </div>

            <!-- ------------------------------------------- -->
            
            <div class="container mt-1">

              <div class="row">

                <div class="col-12 mb-3 ps-4">
                  <button @click="handleLogin" class="button-container btn" type="button">

                    <i class="button-icon fa-solid fa-circle-user"></i>
                    <span class="button-text">
                      INICIAR SESION
                    </span>

                  </button>
                </div>

              </div>

            </div>

            <!-- ------------------------------------------- -->

            <div class="container">

              <div class="row">

                <div class="col-12 mb-3 ps-4">
                  <RouterLink to="/"  class="button-container btn" type="button">

                    <i class="button-icon fa-solid fa-address-card"></i>
                    <span class="button-text">
                      CREAR CUENTA
                    </span>

                  </RouterLink>
                </div>

              </div>

            </div>

            <!-- ------------------------------------------- -->

            <div class="container">

              <div class="row">

                <div class="col-12 mb-3 ps-4">
                  <button @click="navigateTo('ConfigMenu')" class="button-container btn" type="button">

                    <i class="button-icon fa-solid fa-gear"></i>
                    <span class="button-text">
                      CONFIGURACION
                    </span>

                  </button>
                </div>

              </div>

            </div>

            <!-- ------------------------------------------- -->
          
          </div>

          <!-- ######################### Ventana Principal Con Cuenta ######################### -->

          <!-- <div v-if="isAuthenticated"> -->
          <div v-if="currentView === 'MainMenuAc'">

            <!-- ------------------------------------------- -->
            
            <div class="container mt-3">

              <div class="row">

                <div class="col-5 mb-3 d-flex justify-content-center align-items-center">
                  <img :src="user.photo || ZEN">
                </div>

                <div class="col-7 mb-3 ps-1 d-flex justify-content-center align-items-center">
                  <div>
                    <label class="form-ac-label">
                      {{ user.name }}
                    </label>
                    <label class="form-ac-sublabel" id="est">
                      ESTATUS
                    </label>
                    <label class="form-ac-sublabel" id="act">
                      ACTIVO
                    </label>
                  </div>
                </div>

              </div>

            </div>

            <!-- ------------------------------------------- -->
            
            <div class="container mt-1">

              <div class="row">

                <div class="col-9 mb-2 ps-5 ms-5">
                  <RouterLink to="/user/profile" class="button-container btn" type="button">

                    <i class="button-ac-icon fa-solid fa-user-gear"></i>
                    <span class="button-ac-text">
                      PERFIL
                    </span>

                  </RouterLink>
                </div>

              </div>

            </div>

            <!-- ------------------------------------------- -->

            <div class="container">

              <div class="row">

                <div class="col-9 mb-2 ps-5 ms-5">
                  <button class="button-container btn" type="button">

                    <i class="button-ac-icon fa-solid fa-hand-holding-hand"></i>
                    <span class="button-ac-text">
                      SERVICIOS
                    </span>

                  </button>
                </div>

              </div>

            </div>

            <!-- ------------------------------------------- -->

            <div class="container">

              <div class="row">

                <div class="col-9 mb-2 ps-5 ms-5">
                  <button class="button-container btn" type="button">

                    <i class="button-ac-icon fa-solid fa-clock-rotate-left"></i>
                    <span class="button-ac-text">
                      HISTORIAL
                    </span>

                  </button>
                </div>

              </div>

            </div>

            <!-- ------------------------------------------- -->

            <div class="container">

              <div class="row">

                <div class="col-9 mb-2 ps-5 ms-5">
                  <button class="button-container btn" type="button">

                    <i class="button-ac-icon fa-solid fa-wallet"></i>
                    <span class="button-ac-text">
                      ADEUDOS
                    </span>

                  </button>
                </div>

              </div>

            </div>

            <!-- ------------------------------------------- -->

            <div class="container">

              <div class="row">

                <div class="col-9 mb-2 ps-5 ms-5">
                  <RouterLink to="/user/favorites" class="button-container btn" type="button">

                    <i class="button-ac-icon fa-solid fa-heart"></i>
                    <span class="button-ac-text">
                      FAVORITOS
                    </span>

                  </RouterLink>
                </div>

              </div>

            </div>

            <!-- ------------------------------------------- -->

            <div class="container">

              <div class="row">

                <div class="col-9 mb-3 ps-5 ms-5">
                  <button @click="navigateTo('ConfigMenu')" class="button-container btn" type="button">

                    <i class="button-ac-icon fa-solid fa-gear"></i>
                    <span class="button-ac-text">
                      CONFIGURACION
                    </span>

                  </button>
                </div>

              </div>

            </div>

            <!-- ------------------------------------------- -->

            <div class="container">

              <div class="row">

                <div class="col-12 mb-3 ps-5 ms-3">
                  <button @click="handleLogout" class="btn btn-white" type="button" id="csbot">
                      CERRAR SESION
                  </button>
                </div>

              </div>

            </div>

            <!-- ------------------------------------------- -->
          
          </div>


          <!-- ######################### Ventana de Configuración ######################### -->
          
          <div v-if="currentView === 'ConfigMenu'">

            <!-- ------------------------------------------- -->

            <div class="container">

              <div class="row">

                <div class="col-3 mb-3 d-flex justify-content-center align-items-center">
                  <i class="form-menu-label fa-solid fa-gear" id="labi"></i>
                </div>

                <div class="col-8 mb-3 pe-4 d-flex justify-content-center align-items-center">
                  <label class="form-menu-label">
                    CONFIGURACION
                  </label>
                </div>

              </div>

            </div>

            <!-- ------------------------------------------- -->

            <div class="container mt-1">

              <div class="row">

                <div class="col-11 mb-3 ps-5">
                  <button @click="navigateTo('PersonalizationMenu')" class="button-container btn" type="button">

                    <i class="button-icon bi bi-brush"></i>
                    <span class="button-text">
                      PERSONALIZACION
                    </span>

                  </button>
                </div>

              </div>

            </div>

            <!-- ------------------------------------------- -->

            <div class="container">

              <div class="row">

                <div class="col-11 mb-3 ps-5 pb-2">
                  <button @click="navigateTo('LanguageMenu')" class="button-container btn" type="button">

                    <i class="button-icon fa-solid fa-language"></i>
                    <span class="button-text">
                      LENGUAJE
                    </span>

                  </button>
                </div>

              </div>

            </div>

            <!-- ------------------------------------------- -->

          </div>

          <!-- ######################### Ventana de Personalización ######################### -->
          
          <div v-if="currentView === 'PersonalizationMenu'">

            <!-- ------------------------------------------- -->

            <div class="container">

              <div class="row">

                <div class="col-2 mb-3 d-flex justify-content-center align-items-center">
                  <i class="form-menu-label bi bi-brush" id="labi"></i>
                </div>

                <div class="col-10 mb-3 ps-3 pe-4 d-flex justify-content-center align-items-center">
                  <label class="form-menu-label">
                    PERSONALIZACION
                  </label>
                </div>

              </div>

            </div>

            <!-- ------------------------------------------- -->

            <div class="container mt-1">

              <div class="row">

                <div class="col-11 mb-3 ps-5">
                  <button @click="toggleTheme" class="button-container btn" type="button">

                    <i class="button-icon" :class="darkTheme ? 'bi bi-moon' : 'bi bi-brightness-high'" id="theme"></i>
                    <span class="button-text" :class="darkTheme ? 'dark' : 'bright'">
                      {{ darkTheme ? 'TEMA OSCURO' : 'TEMA CLARO' }}
                    </span>

                  </button>
                </div>

              </div>

            </div>

            <!-- ------------------------------------------- -->

            <div class="container">

              <div class="row">

                <div class="col-11 mb-3 ps-5 pb-2">
                  <button @click="changeFontSize" class="button-container btn" type="button">

                    <i class="button-icon fa-solid fa-text-height"></i>
                    <span class="button-text">
                      TAMAÑO: {{ currentFontSize }}rem
                    </span>

                  </button>
                </div>

              </div>

            </div>

            <!-- ------------------------------------------- -->
            
          </div>

          <!-- ######################### Ventana de Idioma ######################### -->
          
          <div v-if="currentView === 'LanguageMenu'">
            
            <!-- ------------------------------------------- -->

            <div class="container">

              <div class="row">

                <div class="col-4 mb-3 d-flex justify-content-center align-items-center">
                  <i class="form-menu-label fa-solid fa-language" id="labi"></i>
                </div>

                <div class="col-7 mb-3 ps-3 pe-4 d-flex justify-content-center align-items-center">
                  <label class="form-menu-label">
                    LENGUAJE
                  </label>
                </div>

              </div>

            </div>

            <!-- ------------------------------------------- -->

            <div class="container mt-1">

              <div class="row">

                <div class="col-11 mb-3 ps-4 ms-1">
                  <button @click="changeLanguage('Español')"  class="button-container btn" type="button">

                    <i class="button-icon fi fi-mx"></i>
                    <span class="button-text">
                      ESPAÑOL
                    </span>

                  </button>
                </div>

              </div>

            </div>

            <!-- ------------------------------------------- -->

            <div class="container">

              <div class="row">

                <div class="col-11 mb-3 ps-4 ms-1 pb-2">
                  <button @click="changeLanguage('English')" class="button-container btn" type="button">

                    <i class="button-icon fa-solid fi fi-us"></i>
                    <span class="button-text">
                      ENGLISH
                    </span>

                  </button>
                </div>

              </div>

            </div>

            <!-- ------------------------------------------- -->

          </div>

        </div>

        <!-- ######################### Botón de regreso al menú principal ######################### -->
        <!-- Este botón solo se muestra si no estamos en el menú principal -->

        <div class="container-fluid">
          <button v-if="currentView !== 'MainMenu' && currentView !== 'MainMenuAc'" @click="goBack" class="btn btn-outline-danger" type="button" id="atbot">
            <i class="fa-solid fa-chevron-left"></i>
          </button>
        </div>

      </div>
    </form>

  </div>

</template>

<style scoped>

@media (min-width: 992px) {

  #droph.dropdown {

    
    &::before {
      content: '';
      opacity: 0;

      display: flex;
      left: 50% !important;
      transform: translateX(-50%) !important;
      right: auto !important;
      min-width: 200px; /* Ancho mínimo */
      justify-content: center;
      align-items: center;

      font-size: 30px;
      position: absolute;
      top: 162.5px;
      height: 291px;
      width: 75%;
      z-index: 999; 
      pointer-events: none;
      background-color: blue;

      transition: opacity 0.3s ease; 
    }

    &:hover::before {
      pointer-events: auto; 
      opacity: 0;
    }

  }

  #dbut.dropdown-item {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    position: relative;

    height: 245px;
    border-radius: 30px;

    img {
      box-shadow: 0rem 0.35rem 0.75rem rgba(0, 0, 0, 0.4);
      border-radius: 30px;
    }

    img#dim3 {
      width: 300px;
      height: 175px;
    }

    img#dim4{
      width: 250px;
      height: 175px;
    }

    &:hover {
      background-color: #000E32;
      color: white;
    }
  }

}

</style>