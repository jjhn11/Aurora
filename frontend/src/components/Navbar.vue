<script setup>
  // [Imports]
  import { RouterLink, useRoute } from 'vue-router';
  import { ref, onMounted, onUnmounted, computed, watch } from 'vue';
  import { useStore } from 'vuex';
  const store = useStore();
  
  const isAdmin = computed(() => {
      if (!isAuthenticated.value) return false;
      
      const adminEmails = [
          "a22490408@itmexicali.edu.mx",
          "a22490390@itmexicali.edu.mx",
          "a22490388@itmexicali.edu.mx",
          "a22490378@itmexicali.edu.mx",
          "a22490352@itmexicali.edu.mx",
          "a22490416@itmexicali.edu.mx"
      ];
      
      return adminEmails.includes(user.value.email);
  });

  // [Imagenes]
  import logo from '../assets/img/navbar/LogoAurora.png';
  import tec from '../assets/img/navbar/tec.png';
  import B2R from '../assets/img/navbar/B2 RESEÑAS.png';
  import B3C from '../assets/img/navbar/B3 CATALOGO.png';
  import E1C from '../assets/img/navbar/E1 CULTURALES.png';
  import E2D from '../assets/img/navbar/E2 DEPORTIVOS.png';
  import E3E from '../assets/img/navbar/E3 ESCOLARES.png';
  import C1R from '../assets/img/navbar/C1 RECREATIVAS.png'
  import C2D from '../assets/img/navbar/C2 DEPORTES.png'
  import C3C from '../assets/img/navbar/C3 CULTURAL.png'
  import C4V from '../assets/img/navbar/C4 VIDEOJUEGOS.png'

  import INV from '../assets/img/navbar/CUENTA INVITADO.png';

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
        const user = computed(() => {
          // Obtener datos combinados del usuario (Google + datos de la BD)
          const profile = store.state.user || {}; // Datos de Google
          const userData = store.state.user?.userData || {}; // Datos extendidos de la BD
          
          return {
            name: profile.name || userData.Name_user || 'Usuario',
            email: profile.email || userData.Email || '',
            photo: profile.photo || null,
            id: profile.id || userData.Id_user,
            status: profile.status || userData.Id_user_status
          };
        });

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
          try {
            // Comprobar estado de autenticación 
            await store.dispatch('checkAuth');
            
            // Establecer la vista correcta según estado de autenticación
            currentView.value = store.state.isAuthenticated ? 'MainMenuAc' : 'MainMenu';
            viewStack.value = [currentView.value];
            
            document.addEventListener('click', handleClickOutside);
          } catch (error) {
            console.error('Error al inicializar Navbar:', error);
          }
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

  <div class="container-fluid">
    
    <nav class="navbar navbar-expand-lg navbar-light fixed-top justify-content-center" :class="{ 'navbar-shrunk': isNavbarShrunk }">
      
      <div class="row">
  
          <!-- CONTAINER EDU -->
          
            <div class="container-fluid col-12 p-1 mb-3 mt-2 d-flex justify-content-center" id="edu" :class="{ 'edu-shrunk': isNavbarShrunk }">

              <header>
                <img class="edu-brand" :src="tec">
              </header>
            
            </div>

          <!-- CONTAINER NAVBAR -->

          <div class="container-fluid col-12 pb-3 d-flex justify-content-center">

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" 
              aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
              
              <RouterLink to="/" class="navbar-brand me-auto" id="aurlog" :style="{ transform: isNavbarShrunk ? 'translateY(25px)' : 'translateY(0)' }">
                  <img :src="logo" id="log">
                  <span id="aur">AURORA</span>
              </RouterLink>

              <ul class="navbar-nav border-top border-black border-2 d-flex justify-content-center" id="nav" :class="{ 'no-border': isNavbarShrunk }">

                <li class="nav-item mt-4 di1">
                  <RouterLink to="/" class="nav-link" id="bot" :class="{ 'active-link': isActiveLink('/') }">
                    INICIO
                  </RouterLink>
                </li>

                <li class="nav-item dropdown position-static mt-4 db2" id="droph">
                  <RouterLink to="/biblioteca" class="nav-link" role="button" aria-expanded="false" id="bot" :class="{ 'active-link': isActiveLink('/biblioteca') || isActiveLink('/biblioteca/catalogo') || isActiveLink('/biblioteca/cubiculos') }">
                    BIBLIOTECA
                  </RouterLink>

                  <ul class="dropdown-menu">
                    <div class="container-fluid d-flex justify-content-center align-items-center">
                      <div class="row w-100 justify-content-center px-0">

                        <div class="col-12 col-md-5 py-2">

                          <li><RouterLink to="/biblioteca/catalogo" class="dropdown-item" id="dbut" :class="{'active': isActiveLink('/biblioteca/catalogo')}">
                            <img :src="B3C" class="mt-3" id="dim2">
                            <span class="my-3">CATÁLOGO</span>
                          </RouterLink></li>

                        </div>

                        <div class="col-12 col-md-5 py-2">

                          <li><RouterLink to="/biblioteca/cubiculos" class="dropdown-item" id="dbut" :class="{'active': isActiveLink('/biblioteca/cubiculos')}">
                            <img :src="B2R" class="mt-3" id="dim2">
                            <span class="my-3">CUBÍCULOS</span>
                          </RouterLink></li>

                        </div>
                      </div>
                    </div>
                  </ul>

                </li>

                <li class="nav-item dropdown position-static mt-4 de3" id="droph">
                  <RouterLink to="/eventos" class="nav-link" role="button" aria-expanded="false" id="bot" :class="{ 'active-link': isActiveLink('/eventos') || isActiveLink('/eventos/culturales') || isActiveLink('/eventos/deportivos') || isActiveLink('/eventos/escolares') }">
                    EVENTOS
                  </RouterLink>
                  
                  <ul class="dropdown-menu">
                    <div class="container-fluid d-flex justify-content-center align-items-center">
                      <div class="row w-100 justify-content-center px-0">

                        <div class="col-12 col-md-4 py-2">

                          <li><RouterLink to="/eventos/culturales" class="dropdown-item" id="dbut" :class="{'active': isActiveLink('/eventos/culturales')}">
                            <img :src="E1C" class="mt-3" id="dim3">
                            <span class="my-3">CULTURALES</span>
                          </RouterLink></li>

                        </div>

                        <div class="col-12 col-md-4 py-2">

                          <li><RouterLink to="/eventos/deportivos" class="dropdown-item" id="dbut" :class="{'active': isActiveLink('/eventos/deportivos')}">
                            <img :src="E2D" class="mt-3" id="dim3">
                            <span class="my-3">DEPORTIVOS</span>
                          </RouterLink></li>

                        </div>

                        <div class="col-12 col-md-4 py-2">

                          <li><RouterLink to="/eventos/escolares" class="dropdown-item" id="dbut" :class="{'active': isActiveLink('/eventos/escolares')}">
                            <img :src="E3E" class="mt-3" id="dim3">
                            <span class="my-3">ESCOLARES</span>
                          </RouterLink></li>

                        </div>
                        
                      </div>
                    </div>
                  </ul>

                </li>

                <li class="nav-item dropdown position-static mt-4 dc4" id="droph">
                  <a class="nav-link" role="button" aria-expanded="false" id="bot" :class="{ 'active-link': isActiveLink('/comunidad/cultural') || isActiveLink('/comunidad/videojuegos') || isActiveLink('/comunidad/deportes') || isActiveLink('/comunidad/recreativas')}">
                    COMUNIDAD
                  </a>

                  <ul class="dropdown-menu">
                    <div class="container-fluid d-flex justify-content-center align-items-center">
                      <div class="row w-110 justify-content-center px-0">

                        <div class="col-12 col-md-3 py-2 px-1">

                          <li><RouterLink to="/comunidad/recreativas" class="dropdown-item" id="dbut" :class="{'active': isActiveLink('/comunidad/recreativas')}">
                            <img :src="C1R" class="mt-4" id="dim4">
                            <span class="my-3">RECREATIVAS</span>
                          </RouterLink></li>

                        </div>

                        <div class="col-12 col-md-3 py-2 px-1">

                          <li><RouterLink to="/comunidad/deportes" class="dropdown-item" id="dbut" :class="{'active': isActiveLink('/comunidad/deportes')}">
                            <img :src="C2D" class="mt-4" id="dim4">
                            <span class="my-3">DEPORTES</span>
                          </RouterLink></li>

                        </div>

                        <div class="col-12 col-md-3 py-2 px-1">

                          <li><RouterLink to="/comunidad/cultural" class="dropdown-item" id="dbut" :class="{'active': isActiveLink('/comunidad/cultural')}">
                            <img :src="C3C" class="mt-4" id="dim4">
                            <span class="my-3">CULTURAL</span>
                          </RouterLink></li>

                        </div>

                        <div class="col-12 col-md-3 py-2 px-1">

                          <li><RouterLink to="/comunidad/videojuegos" class="dropdown-item" id="dbut" :class="{'active': isActiveLink('/comunidad/videojuegos')}">
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

  <div class="container-fluid">
    
    <!-- Contenedor del menú -->
    <form class="bg-white border" id="uform"  :class="{'form-shrunk': isNavbarShrunk,
                                                        'show': showMenu, 
                                                        'hide': !showMenu
                                                      }, 
                                                      currentView === 'MainMenuAc' ? 'ac-size' : 'nac-size',
                                                      currentView === 'AcProfile' ? 'acp-size' : 'nac-size'" 
    @click.stop>

      <div class="container p-1 d-flex flex-column">
        
          <!-- ######################### Ventana Principal Sin Cuenta ######################### -->

        <!-- <div v-if="!isAuthenticated"> -->
        <div v-if="currentView === 'MainMenu'" class="window">

          <!-- ------------------------------------------- -->
          
          <div class="window-header gapg">

            <img class="ac-img" :src="INV">

            <label class="form-menu-label">
              INVITADO
            </label>

          </div>

          <!-- ------------------------------------------- -->
          
          <div class="window-content gapmd">

            <button @click="handleLogin" class="button-container default btn" type="button">

              <i class="button-icon fa-solid fa-circle-user"></i>
              <span class="button-text">
                INICIAR SESION
              </span>

            </button>

            <button @click="navigateTo('ConfigMenu')" class="button-container default btn" type="button">

              <i class="button-icon fa-solid fa-gear"></i>
              <span class="button-text">
                CONFIGURACION
              </span>

            </button>

          </div>

          <!-- ------------------------------------------- -->
        
        </div>

          <!-- ######################### Ventana Principal Con Cuenta ######################### -->

        <!-- <div v-if="isAuthenticated"> -->
        <div v-if="currentView === 'MainMenuAc'" class="window account">

          <!-- ------------------------------------------- -->
          
          <div class="window-header alleft gapsm">

            <img class="ac-img" :src="user.photo || INV">

            <div class="ac-content">
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

          <!-- ------------------------------------------- -->
          
          <div class="window-content account gaplg">

            <button @click="navigateTo('AcProfile')" class="button-container account btn" type="button">

              <i class="button-ac-icon fa-solid fa-user-gear"></i>
              <span class="button-ac-text">
                PERFIL
              </span>

            </button>

            <RouterLink v-if="isAdmin" to="/admin-eventos" class="button-container account btn" type="button">

              <i class="button-ac-icon fa-solid fa-calendar-days"></i>
              <span class="button-ac-text">
                EVENTOS
              </span>

            </RouterLink>

            <button @click="navigateTo('ConfigMenu')" class="button-container account btn" type="button">

              <i class="button-ac-icon fa-solid fa-gear"></i>
              <span class="button-ac-text">
                CONFIGURACION
              </span>

            </button>

            <button @click="handleLogout" class="btn btn-white" type="button" id="csbot">
                CERRAR SESION
            </button>

          </div>

          <!-- ------------------------------------------- -->
        
        </div>

          <!-- ######################### Ventana Perfil ######################### -->

        <!-- <div v-if="isAuthenticated"> -->
        <div v-if="currentView === 'AcProfile'" class="window prof">

          <!-- ------------------------------------------- -->

          <div class="window-header prof gapsm">

            <img class="pf-img" :src="user.photo || INV">

            <label class="form-pf-label">
              {{ user.name }}
            </label>

          </div>

          <!-- ------------------------------------------- -->

          <div class="window-content alleft gapmd">

            <div>
              <label class="form-pf-sublabel" id="act">
                ESTATUS:
              </label>
              
              <label class="form-pf-sublabel">
                Activo
              </label>
            </div>

            <div>
              <label class="form-pf-sublabel" id="act">
                OCUPACIÓN:
              </label>

              <label class="form-pf-sublabel">
                Alumno <!--{{ user.role }}-->
              </label>
            </div>

            <div>
              <label class="form-pf-sublabel" id="act">
                CORREO:
              </label>

              <label class="form-pf-sublabel">
                {{ user.email }}
              </label>
            </div>

            <div>
              <label class="form-pf-sublabel" id="act">
                NUMERO DE CONTROL:
              </label>

              <label class="form-pf-sublabel">
                22490xxx <!--{{ user.id }}-->
              </label>
            </div>

            <div>
              <label class="form-pf-sublabel" id="act">
                GENERO:
              </label>

              <label class="form-pf-sublabel">
                Masculino <!--{{ user.gender }}-->
              </label>
            </div>
          
          </div>

          <div class="window-content mt-3">
            
            <button @click="handleLogout" class="btn btn-white prof" type="button" id="csbot">
              CERRAR SESION
            </button>

          </div>

          <!-- ------------------------------------------- -->

        </div>

          <!-- ######################### Ventana de Configuración ######################### -->
        
        <div v-if="currentView === 'ConfigMenu'" class="window">

          <!-- ------------------------------------------- -->

          <div class="window-header gapmd">

              <i class="form-menu-icon fa-solid fa-gear" id="labi"></i>

              <label class="form-menu-label">
                CONFIGURACION
              </label>

          </div>

          <!-- ------------------------------------------- -->
            
          <div class="window-content gapmd">

            <button @click="navigateTo('PersonalizationMenu')" class="button-container default btn" type="button">

              <i class="button-icon bi bi-brush"></i>

              <span class="button-text">
                PERSONALIZACION
              </span>

            </button>

            <button @click="navigateTo('LanguageMenu')" class="button-container default btn" type="button">

              <i class="button-icon fa-solid fa-language"></i>
              <span class="button-text">
                LENGUAJE
              </span>

            </button>

          </div>

          <!-- ------------------------------------------- -->

        </div>

          <!-- ######################### Ventana de Personalización ######################### -->
        
        <div v-if="currentView === 'PersonalizationMenu'" class="window">

          <!-- ------------------------------------------- -->

          <div class="window-header gaplg">

                <i class="form-menu-icon bi bi-brush" id="labi"></i>

                <label class="form-menu-label">
                  PERSONALIZACION
                </label>

          </div>

          <!-- ------------------------------------------- -->

          <div class="window-content gapmd">

                <button @click="toggleTheme" class="button-container default btn" type="button">

                  <i class="button-icon" :class="darkTheme ? 'bi bi-moon' : 'bi bi-brightness-high'" id="theme"></i>
                  <span class="button-text" :class="darkTheme ? 'dark' : 'bright'">
                    {{ darkTheme ? 'TEMA OSCURO' : 'TEMA CLARO' }}
                  </span>

                </button>

                <button @click="changeFontSize" class="button-container default btn" type="button">

                  <i class="button-icon fa-solid fa-text-height"></i>
                  <span class="button-text">
                    TAMAÑO: {{ currentFontSize }}rem
                  </span>

                </button>

          </div>

          <!-- ------------------------------------------- -->
          
        </div>

          <!-- ######################### Ventana de Idioma ######################### -->
        
        <div v-if="currentView === 'LanguageMenu'" class="window">
          
          <!-- ------------------------------------------- -->

          <div class="window-header gapsm">

                <i class="form-menu-icon fa-solid fa-language" id="labi"></i>

                <label class="form-menu-label">
                  LENGUAJE
                </label>

          </div>

          <!-- ------------------------------------------- -->

          <div class="window-content gapmd">

            <button @click="changeLanguage('Español')"  class="button-container default btn" type="button">

              <i class="button-icon fi fi-mx"></i>
              <span class="button-text">
                ESPAÑOL
              </span>

            </button>

            <button @click="changeLanguage('English')" class="button-container default btn" type="button">

              <i class="button-icon fa-solid fi fi-us"></i>
              <span class="button-text">
                ENGLISH
              </span>

            </button>

          </div>

          <!-- ------------------------------------------- -->

        </div>

        <button v-if="currentView !== 'MainMenu' && currentView !== 'MainMenuAc'" @click="goBack" class="btn btn-outline-danger" type="button" id="atbot">
          <i class="fa-solid fa-chevron-left"></i>
        </button>

      </div>

        <!-- ######################### Botón de regreso al menú principal ######################### -->
        <!-- Este botón solo se muestra si no estamos en el menú principal -->

    </form>

  </div>

</template>

<style scoped>

/* @@@@@@@@@@@@@@@@@@@@@@@ Navbar Style @@@@@@@@@@@@@@@@@@@@@@@ */

.fixed-top {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1030;
}

.navbar {
  padding-top: 0; /* Elimina padding adicional en la navbar */
  margin-top: 0; /* Elimina márgenes adicionales */

  background-color: white;

  font-family: 'Josefin Sans';
  font-weight: bold;

  border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  transition: all 0.5s ease;
}

.navbar-shrunk {
  transform: translateY(-100px); /* Sube la navbar hacia arriba */
}

.no-border {
  border-top: none !important; /* Oculta la línea de border-top */
  transition: border-top 0.5s ease; /* Transición suave para la línea */
}

  /* ########################### Navbar row 1 (Up) ########################### */

    #edu {
      transition: all 0.3s ease; /* Transición suave para altura y opacidad */

      &.edu-shrunk {
        opacity: 0; /* Desaparece visualmente */
        overflow: hidden; /* Oculta el contenido cuando se reduce */
      }

      .edu-brand {
        width: auto; 
        height: 70px;
      }
    }

  /* ########################### Navbar row 2 (Down) ########################### */

    /* ===================== Logo y Nombre ===================== */

    #aurlog.navbar-brand {
      margin-top: 0; /* Asegúrate de que no haya márgenes */
      margin-bottom: 0; /* Asegúrate de que no haya márgenes */
      padding-top: 0; /* Asegúrate de que no haya padding */
      padding-bottom: 0; /* Asegúrate de que no haya padding */

      display: flex;

      flex-direction: column;
      justify-content: flex-start;
      align-items: center;

      position: relative;
      left: 100px;
      bottom: 20px; 
      margin-bottom: -15px;

      transition: transform 0.3s ease;

      #log {
        width: auto;
        height: 50px;
      }
      
      #aur {
        position: relative;
        bottom: 2px;

        font-family: 'Cinzel Decorative';
        font-size: 17px;
        font-weight: 600;
        color: #000E32;
        opacity: 0;

        transition: 0.6s;
      }

      #log:hover + #aur {
        opacity: 1;
      }

    }
    
    @media (max-width: 1299px) {
        #aurlog.navbar-brand {
          left: 25px;
      }
    }



    /* ===================== Botones ===================== */
    
    #nav {
      transition: border-top 0.3s ease;
    }
    
    #nav li > a {
      height: 40px;
      background-color: rgba(255, 255, 255, 0);

      font-family: 'Josefin Sans';
      font-size: 18px;
      font-weight: 700;
      color: #000E32;
      border-radius: 10px;

      transition: 0.4s;
    }

    #nav li > #bot:hover,
    #nav li > #bot.active-link {
      color: white;
      background-color: #000E32;
      border-radius: 10px;
    }
    

    /* ===================== Dropdowns ===================== */

    #droph.dropdown {

      border-radius: 60px;
      
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

    @media (min-width: 1400px) 
    {
      .di1 {
        margin-left: 15px;
        margin-right: 65px;
      }
      .db2 {
        
        margin-left: 65px;
        margin-right: 65px;
      }
      .de3 {
        margin-left: 65px;
        margin-right: 65px;
      }
      .dc4 {
        margin-left: 65px;
        margin-right: 15px;
      }
    }

    @media (max-width: 1399px) 
    {
      .di1 {
        margin-left: 15px;
        margin-right: 50px;
      }
      .db2 {
        margin-left: 50px;
        margin-right: 50px;
      }
      .de3 {
        margin-left: 50px;
        margin-right: 50px;
      }
      .dc4 {
        margin-left: 50px;
        margin-right: 15px;
      }
    }

    @media (max-width: 1199px) 
    {
      .di1 {
        margin-left: 15px;
        margin-right: 25px;
      }
      .db2 {
        margin-left: 25px;
        margin-right: 25px;
      }
      .de3 {
        margin-left: 25px;
        margin-right: 25px;
      }
      .dc4 {
        margin-left: 25px;
        margin-right: 15px;
      }
    }


  
    .dropdown .dropdown-menu {
      width: 75% !important;
      height: 280px;
      left: 50% !important;
      transform: translateX(-50%) !important;
      right: auto !important;

      text-align: center; /* Para centrar el texto si lo deseas */
      min-width: 200px; /* Ancho mínimo */
      display: block;
      opacity: 0;

      transition: all 0.4s;
      transition-delay: 0s, 0s;
      pointer-events: none;

    }

    #droph.dropdown:hover .dropdown-menu {
      transform: translateY(100px);
      margin-top: 10px;

      opacity: 1;

      transition-delay: 0s, 0s;

      pointer-events: initial;
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

      &:hover {
        background-color: #000E32;
        color: white;
      }

      &.active {
        background-color: #000E32;
        color: white;
      }
    }
    
    /* Size Large */

    @media (min-width: 1410px) {
      #dbut.dropdown-item {
        img#dim2 {
          width: 300px;
          height: 175px;
        }

        img#dim3 {
          width: 300px;
          height: 175px;
        }

        img#dim4{
          width: 250px;
          height: 175px;
        }
      }
    }

    /* Size Medium */

    @media (max-width: 1409px) {
      #dbut.dropdown-item {
        img#dim2 {
          width: 250px;
          height: 175px;
        }

        img#dim3 {
          width: 240px;
          height: 175px;
        }
      }
    }

    @media (max-width: 1499px) {
      #dbut.dropdown-item {
        img#dim4{
          width: 215px;
          height: 175px;
        }
      }
    }

    /* Size Small */

    @media (max-width: 1309px) {
      #dbut.dropdown-item {
        img#dim3 {
          width: 200px;
          height: 175px;
        }
      }
    }

    @media (max-width: 1299px) {
      #dbut.dropdown-item {
        img#dim4{
          width: 175px;
          height: 175px;
        }
      }
    }

    /* Size X-Small */

    @media (max-width: 1199px) {
      #dbut.dropdown-item {
        img#dim4{
          width: 155px;
          height: 175px;
        }
      }
    }
    

    /* ===================== Cuenta ===================== */

    #user.btn{
      position: relative;
      display: flex;
      justify-items: center;
      align-items: center;

      width: 45px;
      height: 45px;
      border-radius: 80px;

      transition: all 0.6s;

      i {
        color: #000E32;
        display: flex;
        align-items: center;
        font-size: 30px;
      }

      &:hover{
        background-color: #000E32;
        
        i {
          color: white;
        }
      }
    }

    @media (min-width: 1300px) {
        #user.btn{
          right: 100px;
          top: 5px;
      }
    }

  /* @@@@@@@@@@@@@@@@@ User Form Style @@@@@@@@@@@@@@@@@ */ 

  #uform {
    position: fixed;
    top: 190px;
    right: -330px;
    z-index: 1029;

    width: 400px;
    max-width: 90%; /* Asegúrate de que no exceda el ancho de la pantalla */

    height: 300px;
    margin: 0 auto; /* Centra el formulario horizontalmente */

    display: flex;
    flex-direction: row;
    justify-content: center;

    text-align: center;
    
    background-color: white;
    border: 2px solid black;
    border-bottom-left-radius: 25px;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
    
    font-weight: 700;
    
    opacity: 0;
    visibility: hidden;
    transition: all 0.5s ease;

    /* Normal Size */

    &.nac-size {
      height: 300px;
    }

    /* Account Size */

    &.ac-size {
      height: 300px;
    }

    /* Profile Size */

    &.acp-size {
      height: 575px;

      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: start;
      text-align:center;
    }

    &.show {
      right: 0;
      opacity: 1;
      visibility: visible;
    }

    &.hide {
      right: -330px;
      opacity: 0;
      visibility: hidden;
    }
  
    &.form-shrunk {
      transform: translateY(-100px);
    }

    .ac-img{

      display: flex;
      justify-content: center;
      align-items: center;

      width: 80px;
      height: 80px;
    }

    .window {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      align-self: center;
      text-align: center;
      flex-grow: 1;
      flex-shrink: 0;
      flex-basis: 0;
      width: fit-content;

      &.prof {
        margin-top: 20px;
      }

      &.account {
        width: 100% !important;
      }
    }

    .window-header {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      text-align: center;
      width: fit-content;
      margin-bottom: 15px;

      &.alleft {
        display: flex;
        align-self: flex-start;
        align-items: center;
        justify-content: start;
        text-align: start;
        margin-left: 30px;
      }

      &.prof {
        flex-direction: column !important;
        margin-bottom: 17.5px;
      }

      &.gapg {
        gap: 35px;
      }

      &.gapxxsm {
        gap: 30px;
      }

      &.gapxsm {
        gap: 25px;
      }

      &.gapsm {
        gap: 20px;
      }

      &.gapmd {
        gap: 15px;
      }

      &.gaplg {
        gap: 10px;
      }

      &.gapxlg {
        gap: 5px;
      }
    }

    .window-content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      width: fit-content;

      &.alleft {
        display: flex;
        align-self: flex-start;
        align-items: flex-start;
        justify-content: left;
        text-align: left;
        margin-left: 10px;
      }
      
      &.gapg {
        gap: 35px;
      }

      &.gapxxsm {
        gap: 30px;
      }

      &.gapxsm {
        gap: 25px;
      }

      &.gapsm {
        gap: 20px;
      }

      &.gapmd {
        gap: 15px;
      }

      &.gaplg {
        gap: 10px;
      }

      &.gapxlg {
        gap: 5px;
      }
    }

    .form-menu-label{
      height: 35px;
      margin-top: 10px;

      text-align: center; /* Centra el texto dentro del label */
      display: flex;
      justify-content: center;
      align-items: center;

      font-family: "Josefin Sans", -apple-system, Roboto, Helvetica, sans-serif;
      font-size: 32px;
      font-weight: 700;
    }

    
    .form-menu-icon{

      white-space: normal; /* Permite que el texto se divida en varias líneas */
      word-wrap: break-word; /* Divide palabras largas si es necesario */
      text-align: center; /* Centra el texto dentro del label */

      display: flex;
      justify-content: center;
      align-items: center;

      font-size: 35px;
    }

    .form-ac-label{
      white-space: normal; /* Permite que el texto se divida en varias líneas */
      word-wrap: break-word; /* Divide palabras largas si es necesario */
      text-align: start; /* Centra el texto dentro del label */
      line-height: 1.0;

      display: flex;
      justify-content: center;
      align-items: center;

      font-family: "Josefin Sans", -apple-system, Roboto, Helvetica, sans-serif;
      font-size: 18px;
      font-weight: 700;
    }

    .form-ac-sublabel {
      white-space: normal; /* Permite que el texto se divida en varias líneas */
      word-wrap: break-word; /* Divide palabras largas si es necesario */
      text-align: left; /* Centra el texto dentro del label */
      line-height: 1.0;

      display: flex;
      justify-content: left;
      align-items: left;

      font-family: "Nunito Sans", sans-serif;
      font-size: 16px;
      font-weight: 700;

      &#est {
        font-family: "Josefin Sans", -apple-system, Roboto, Helvetica, sans-serif;
        color:grey;
      }

      &#act {
        font-family: "Josefin Sans", -apple-system, Roboto, Helvetica, sans-serif;
        color:#0047FF;
      }
    }

    /* @@@@@@@@@@@@@@@@ Profile Style @@@@@@@@@@@@@@@@ */

    .pf-img {
      display: flex;
      justify-content: center;
      align-items: center;

      width: 130px;
      height: 130px;
    }
    
    .ac-content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      text-align: center;
      width: fit-content;
      max-width: 225px;
    }

    .form-pf-label {
      word-wrap: break-word; /* Divide palabras largas si es necesario */
      text-align: center; /* Centra el texto dentro del label */
      line-height: 1.0;

      display: flex;
      justify-content: center;
      align-items: center;

      font-family: "Josefin Sans", -apple-system, Roboto, Helvetica, sans-serif;
      font-size: 16px;
      font-weight: 700;
    }

    .form-pf-sublabel {
      height: 20px;
      display: flex;
      justify-content: left;
      align-items: left;
      text-align: left; /* Centra el texto dentro del label */

      font-family: "Nunito Sans", sans-serif;
      font-size: 16px;
      font-weight: 700;

      &#act {
        font-family: "Josefin Sans", -apple-system, Roboto, Helvetica, sans-serif;
        color:#0047FF;
      }
    }
    
    /* @@@@@@@@@@@@@@@@ Label Icon @@@@@@@@@@@@@@@@ */

    i#labi {
      display: flex;
      justify-content: center; 
      align-items: center;
      text-align: center; /* Centra el texto dentro del label */

      font-size: 45px;
      font-weight: 700;
      color: #0047FF;
    }

    i#theme {
      &.bi-sun-fill {
        color: #FBE326; /* Color amarillo para el sol */
      }
      
      &.bi-moon-fill {
        color: #000E32; /* Color oscuro para la luna */
      }
    }

    i#cac{
      opacity: 0;
    }

    .button-container {
      display: flex;
      justify-content: center;
      align-content: center;
      align-items: center;
      padding: 0;
      background: none;
      border: none;
      color: #0047FF;
      text-decoration: none;
      font-size: 16px;
      font-weight: 700;
      transition: all 0.3s ease;
      position: relative;
      cursor: pointer;

      &.account {
        gap: 15px;
        margin-right: 65px;
      }
      
      &.default{
        gap: 15px;
      }
    
      .button-icon {
        width: 35px; /* Ancho fijo para todos los íconos */
        display: flex;
        justify-content: center;
        align-items: center;

        font-size: 30px;
        color: #0047FF;
        transition: all 0.3s ease;
        flex-shrink: 0;
      }
    
      .button-text {
        text-align: center;
        width: 185px; /* Ancho fijo para todos los botones */
        flex-grow: 0; /* Quitar flex-grow para mantener el ancho fijo */
        padding: 0.25rem 1rem;
        border: 0.5px solid #0047FF;
        border-radius: 50px;
        transition: all 0.3s ease;

        &#lbt {

          width: 145px;;
          padding: 0.25rem 1rem;
        }
      }

      .button-ac-text {
        font-family: "Nunito Sans", sans-serif;
        font-size: 16px;
        font-weight: 600;
        color: black;
        text-align: left;
        width: 120px; /* Ancho fijo para todos los botones */
        flex-grow: 0; /* Quitar flex-grow para mantener el ancho fijo */
        padding: 0.25rem 0;
        border: 1px;
        border-radius: 50px;
        transition: all 0.3s ease;
      }

      .button-ac-icon {
        width: 45px; /* Ancho fijo para todos los íconos */
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;

        font-size: 25px;
        color: #0047FF;
        transition: all 0.3s ease;
        flex-shrink: 0;
      }
    
      &:hover {
        .button-text {
          border: 1px solid white;
          background-color: #FBE326;
          color: white;
          
          &.bright {
            background-color: #FBE326;
            color: white;
          }

          &.dark {
            background-color: #000E32;
            color: white;
          }
        }
    
        .button-icon, .button-ac-icon {
          color: #FBE326;

          &.bi-brightness-high {
            color: #FBE326;
          }
          
          &.bi-moon {
            color: #000E32;
          }
        }

        
      }
    }

    #csbot.btn {
      margin-left: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 30px;

      border-radius: 50px;
      border-color: #0047FF;

      font-size: 16px;
      font-weight: 700;
      color: #0047FF;
      
      transition: all 0.3s ease;

      &.prof {
        margin-right: 0px;
      }

      &:hover {
        border-color: white;
        background-color: #FBE326;
        color: white;
      }
    }

    #atbot.btn {
      position: absolute;
      bottom: 5px;
      left: 5px;

      width: 45px;
      height: 45px;
      border-radius: 50px;

      font-size: 22px;

      color: #bb1b1b;
      background-color: white;
      border-color: #bb1b1b;
      transition: all 0.3s ease;

      &:hover {
        color: white;
        background-color: #bb1b1b;
      }
    }
  }
</style>