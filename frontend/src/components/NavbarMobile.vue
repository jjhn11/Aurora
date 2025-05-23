<script setup>

  import { RouterLink, useRoute } from 'vue-router';
  import { ref, onMounted, onUnmounted, computed, watch } from 'vue';
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';
  import { Offcanvas } from 'bootstrap';

  const router = useRouter();
  const store = useStore();

  // Images
  import logo from '../assets/img/navbar/LogoAurora.png';
  import tec from '../assets/img/navbar/tec.png';
  import INV from '../assets/img/navbar/INVITADO.png';

  // User menu functionality (reused from Navbar.vue)
  const showMenu = ref(false);
  const currentView = ref('MainMenu');
  const viewStack = ref(['MainMenu']);
  const isAuthenticated = computed(() => store.state.isAuthenticated);
  const user = computed(() => store.state.user);

  const toggleMenu = () => {
    showMenu.value = !showMenu.value;
  };

  // Handle outside clicks for user menu
  const handleClickOutside = (event) => {
    const form = document.getElementById('uform');
    if (form && !form.contains(event.target)) {
      showMenu.value = false;
    }
  };

  const handleOffcanvasClickOutside = (event) => {
    const offcanvasElement = document.getElementById('offcanvasWithBothOptions');
    const hamburgerButton = document.querySelector('.offnav');
    
    if (offcanvasElement && 
        !offcanvasElement.contains(event.target) && 
        !hamburgerButton.contains(event.target)) {
      const bsOffcanvas = Offcanvas.getInstance(offcanvasElement);
      if (bsOffcanvas) {
        bsOffcanvas.hide();
      }
    }
  };

  const handleEscapeKey = (event) => {
    if (event.key === 'Escape') {
      const offcanvasElement = document.getElementById('offcanvasWithBothOptions');
      const bsOffcanvas = Offcanvas.getInstance(offcanvasElement);
      if (bsOffcanvas) {
        bsOffcanvas.hide();
      }
    }
  };

  onMounted(async () => {
    await store.dispatch('checkAuth');
    document.addEventListener('click', handleClickOutside);
    document.addEventListener('click', handleOffcanvasClickOutside);
    document.addEventListener('keydown', handleEscapeKey); // Agregar esta línea
  });

  // Modificar el onUnmounted
  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
    document.removeEventListener('click', handleOffcanvasClickOutside);
    document.removeEventListener('keydown', handleEscapeKey); // Agregar esta línea
  });

  // Add these new reactive refs for configuration
  const darkTheme = ref(false);
  const currentFontSize = ref(1);
  const fontSizes = [0.8, 1, 1.2];
  const currentLanguage = ref('Español');

  // Watch for authentication changes
  watch(() => store.state.isAuthenticated, (newValue) => {
    currentView.value = newValue ? 'MainMenuAc' : 'MainMenu';
    viewStack.value = [currentView.value];
  });

  // Add navigation functions
  const navigateTo = (view) => {
    viewStack.value.push(view);
    currentView.value = view;
  };

  const goBack = () => {
    if (viewStack.value.length > 1) {
      viewStack.value.pop();
      currentView.value = viewStack.value[viewStack.value.length - 1];
    } else {
      currentView.value = isAuthenticated.value ? 'MainMenuAc' : 'MainMenu';
      viewStack.value = [currentView.value];
    }
  };

  // Add auth handling functions
  const handleLogin = async () => {
    await store.dispatch('loginWithGoogle');
    currentView.value = 'MainMenuAc';
    viewStack.value = ['MainMenuAc'];
  };

  const handleLogout = () => {
    store.dispatch('logout');
    currentView.value = 'MainMenu';
    viewStack.value = ['MainMenu'];
  };

  // Add configuration functions
  const toggleTheme = () => {
    darkTheme.value = !darkTheme.value;
    document.body.classList.toggle('dark-theme', darkTheme.value);
  };

  const changeFontSize = () => {
    const currentIndex = fontSizes.indexOf(currentFontSize.value);
    const nextIndex = (currentIndex + 1) % fontSizes.length;
    currentFontSize.value = fontSizes[nextIndex];
    document.documentElement.style.fontSize = `${currentFontSize.value}rem`;
  };

  const changeLanguage = (lang) => {
    currentLanguage.value = lang;
  };

  // Modify the onMounted hook
  onMounted(async () => {
    await store.dispatch('checkAuth');
    currentView.value = store.state.isAuthenticated ? 'MainMenuAc' : 'MainMenu';
    viewStack.value = [currentView.value];
    document.addEventListener('click', handleClickOutside);
  });

  // Añadir el route
  const route = useRoute();

  // Modificar la lógica del estado y scroll
  const isNavbarWhite = ref(true); // Por defecto será blanco (bg-appear)

  // Modificar la función para manejar el scroll
  const handleScroll = () => {
    if (route.path === '/') { // Solo en la página de inicio
      const heroHeight = window.innerHeight * 0.45;
      const curvePosition = heroHeight - 100;
      isNavbarWhite.value = window.scrollY >= curvePosition;
    }
  };

  // Modificar los event listeners
  onMounted(() => {
    if (route.path === '/') {
      window.addEventListener('scroll', handleScroll);
      isNavbarWhite.value = window.scrollY >= (window.innerHeight * 0.45 - 100);
    }
  });

  onUnmounted(() => {
    if (route.path === '/') {
      window.removeEventListener('scroll', handleScroll);
    }
  });

  // Añadir un watcher para cambios de ruta
  watch(() => route.path, (newPath) => {
    if (newPath === '/') {
      window.addEventListener('scroll', handleScroll);
      isNavbarWhite.value = window.scrollY >= (window.innerHeight * 0.45 - 100);
    } else {
      window.removeEventListener('scroll', handleScroll);
      isNavbarWhite.value = true; // Forzar el estilo bg-appear en otras rutas
    }
  });

  const handleNavigation = (path) => {
    router.push(path);
  };

  // Agregar esto en la sección de script setup, junto con los otros refs
  const dropdownStates = ref({
    bibliotecaMenu: false,
    eventosMenu: false,
    comunidadMenu: false
  });

  // Agregar este método
  const toggleDropdown = (menuId) => {
    dropdownStates.value[menuId] = !dropdownStates.value[menuId];
  };

</script>

<template>

  
  <div class="container-fluid">

    <!-- Main Navbar -->
  
    <nav class="navbar navbar-expand-lg navbar-light fixed-top" :class="{'bg-none': !isNavbarWhite, 'bg-appear': isNavbarWhite}">
      
      <div class="row g-0 w-100">

        <!-- NAV Container -->

        <div class="container-fluid d-flex justify-content-center align-items-end py-1 mt-2" id="cnav">

          <!-- Hamburger Menu Button -->

          <button class="offnav navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">
            <span class="offcanva-icon fa-solid fa-bars"></span>
          </button>

          <!-- Center Logo -->

          <RouterLink to="/" class="navbar-brand mx-auto">
            <img :src="logo" alt="Aurora" class="mobile-logo">
          </RouterLink>

          <!-- User Menu Button -->

          <button @click.stop="toggleMenu" type="button" class="user-btn btn-white" :class="{ 'active': showMenu }">
            <i class="bi bi-person-circle"></i>
          </button>

        </div>
        
        <!-- EDU Container -->
        <div class="container-fluid d-flex justify-content-center mt-2" id="cedu">
          <img :src="tec" alt="TEC" class="edu-logo">
        </div>

      </div>

    </nav>

  </div>

  <!-- Mobile Menu (Offcanvas) -->

  <div class="container-fluid">
    
    <div class="offcanvas offcanvas-start" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
      
      <div class="offcanvas-header">

        <div class="d-flex flex-column align-items-center w-100">
          <img :src="logo" alt="Aurora" class="mobile-menu-logo">
          <span class="mobile-menu-text">AURORA</span>
        </div>

        <button type="button" class="close-button" data-bs-dismiss="offcanvas">
          <i class="close-icon fas fa-times"></i>
        </button>

      </div>

      <div class="offcanvas-body px-0">

        <ul class="navbar-nav d-flex p-0">

          <li class="nav-item">
            <RouterLink to="/" class="btn btn-main flex-grow-1 d-flex align-items-center ps-3" @click="handleNavigation('/')" data-bs-dismiss="offcanvas">
              INICIO
            </RouterLink>
          </li>

          <!-- Biblioteca Dropdown -->

          <li class="nav-item">

            <div class="nav-link d-flex p-0">

              <!-- Botón principal -->

              <RouterLink to="/biblioteca" class="btn btn-main flex-grow-1 d-flex align-items-center ps-3" 
              @click="handleNavigation('/biblioteca')" data-bs-dismiss="offcanvas">
                <span>BIBLIOTECA</span>
              </RouterLink>

              <!-- Botón toggle dropdown -->
              <button class="btn-toggle px-3" 
              @click.prevent="toggleDropdown('bibliotecaMenu')"
              :class="{ 
                'collapsed': !dropdownStates.bibliotecaMenu,
                'show': dropdownStates.bibliotecaMenu
              }">
                <span class="arrow-icon">
                  <i class="bi bi-caret-up-fill"></i>
                </span>

              </button>

            </div>

            <div class="collapse" 
                :class="{ 'show': dropdownStates.bibliotecaMenu }">
              <RouterLink to="/biblioteca/catalogo" class="nav-link sub-link" 
                @click="handleNavigation('/biblioteca/catalogo')" data-bs-dismiss="offcanvas">
                CATÁLOGO
              </RouterLink>
              <RouterLink to="/biblioteca/cubiculos" class="nav-link sub-link" 
                @click="handleNavigation('/biblioteca/cubiculos')" data-bs-dismiss="offcanvas">
                CUBÍCULOS
              </RouterLink>
            </div>

          </li>

          <!-- Eventos Dropdown -->

          <li class="nav-item">

            <div class="nav-link d-flex p-0">

              <!-- Botón principal -->

              <RouterLink to="/eventos" class="btn btn-main flex-grow-1 d-flex align-items-center ps-3" 
              @click="handleNavigation('/eventos')" data-bs-dismiss="offcanvas">
                <span>EVENTOS</span>
              </RouterLink>

              <!-- Botón toggle dropdown -->

              <button class="btn-toggle px-3"
              @click.prevent="toggleDropdown('eventosMenu')"
              :class="{ 
                'collapsed': !dropdownStates.eventosMenu,
                'show': dropdownStates.eventosMenu
              }">

                <span class="arrow-icon">
                  <i class="bi bi-caret-up-fill"></i>
                </span>

              </button>

            </div>

            <div class="collapse" 
                :class="{ 'show': dropdownStates.eventosMenu }">
              <RouterLink to="/eventos/culturales" class="nav-link sub-link" 
              @click="handleNavigation('/eventos/culturales')" data-bs-dismiss="offcanvas">
                CULTURALES
              </RouterLink>

              <RouterLink to="/eventos/deportivos" class="nav-link sub-link" 
              @click="handleNavigation('/eventos/deportivos')" data-bs-dismiss="offcanvas">
                DEPORTIVOS
              </RouterLink>

              <RouterLink to="/eventos/escolares" class="nav-link sub-link" 
              @click="handleNavigation('/eventos/escolares')" data-bs-dismiss="offcanvas">
                ESCOLARES
              </RouterLink>
            </div>

          </li>

          <!-- Comunidad Dropdown -->

          <li class="nav-item">

            <div class="nav-link d-flex p-0">

              <!-- Botón principal -->

              <button class="btn btn-main flex-grow-1 d-flex align-items-center ps-3">
                <span>COMUNIDAD</span>
              </button>

              <!-- Botón toggle dropdown -->

              <button class="btn-toggle px-3"
              @click.prevent="toggleDropdown('comunidadMenu')"
              :class="{ 
                'collapsed': !dropdownStates.comunidadMenu,
                'show': dropdownStates.comunidadMenu
              }">

                <span class="arrow-icon">
                  <i class="bi bi-caret-up-fill"></i>
                </span>

              </button>

            </div>

            <div class="collapse" 
                :class="{ 'show': dropdownStates.comunidadMenu }">
              <RouterLink to="/comunidad/recreativas" class="nav-link sub-link" 
              @click="handleNavigation('/comunidad/recreativas')" data-bs-dismiss="offcanvas">
                RECREATIVAS
              </RouterLink>

              <RouterLink to="/comunidad/deportes" class="nav-link sub-link" 
              @click="handleNavigation('/comunidad/deportes')" data-bs-dismiss="offcanvas">
                DEPORTES
              </RouterLink>

              <RouterLink to="/comunidad/cultural" class="nav-link sub-link" 
              @click="handleNavigation('/comunidad/cultural')" data-bs-dismiss="offcanvas">
                CULTURAL
              </RouterLink>

              <RouterLink to="/comunidad/videojuegos" class="nav-link sub-link" 
              @click="handleNavigation('/comunidad/videojuegos')" data-bs-dismiss="offcanvas">
                VIDEOJUEGOS
              </RouterLink>
            </div>

          </li>

          <div class="off-fin-drop border-bottom border-2 border-black"></div>

        </ul>

      </div>

    </div>
    
  </div>

  <!-- @@@@@@@@ Menu de Usuario @@@@@@@@ -->

  <div class="container-fluid">
    
    <!-- Contenedor del menú -->
    <form class="bg-white border" id="uform"  :class="{ 'show': showMenu, 
                                                        'hide': !showMenu,
                                                        'bg-none': !isNavbarWhite, 
                                                        'bg-appear': isNavbarWhite
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

        <!-- ######################### Botón de regreso al menú principal ######################### -->
        <!-- Este botón solo se muestra si no estamos en el menú principal -->
        <button v-if="currentView !== 'MainMenu' && currentView !== 'MainMenuAc'" @click="goBack" class="btn btn-outline-danger" type="button" id="atbot">
          <i class="fa-solid fa-chevron-left"></i>
        </button>

      </div>

    </form>

  </div>
</template>

<style scoped>
.mobile-nav-container {
  padding-top: 110px;
}

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1031;
  padding-top: 0;
  margin-top: 0;
  font-family: 'Anek Odia';
  font-weight: bold;
  transition: all 0.5s ease;
}

.bg-none {
  background-color: rgba(255, 255, 255, 0);
}

.bg-appear {
  z-index: 1031;
  background-color: rgba(255, 255, 255, 1);
}

/* Agregar nuevo estilo para el contenedor de los botones */
#cnav {
  margin-left: 0; /* Asegúrate de que no haya márgenes */
  margin-right: 0; /* Asegúrate de que no haya márgenes */
  padding-left: 0; /* Asegúrate de que no haya padding */
  padding-right: 0; /* Asegúrate de que no haya padding */

  border-bottom: 1.5px solid;
  width: 85%;
  margin: 0 auto;
  padding-bottom: 3px;
  transition: border-color 0.3s ease;
}

.bg-none #cnav {
  border-bottom: 1.5px solid rgba(255, 255, 255, 1);
}

.bg-appear #cnav {
  z-index: 1031;
  border-bottom: 1.5px solid rgba(0, 0, 0, 1);
}

.navbar-brand{
  margin-top: 0; /* Asegúrate de que no haya márgenes */
  margin-bottom: 0; /* Asegúrate de que no haya márgenes */
  padding-top: 0; /* Asegúrate de que no haya padding */
  padding-bottom: 0; /* Asegúrate de que no haya padding */

  display: flex;

  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  .mobile-logo {
    height: 35px;
    width: auto;
  }
  /*
  .mobile-brand-text {
    font-family: 'Cinzel Decorative';
    font-size: 20px;
    color: #000E32;
    margin-top: -5px;
  }
  */
}

.edu-logo {
  height: 25px;
  width: auto;
}

.offnav{
  display: flex;
  justify-content: center;
  align-items: center;

  height: 30px;
  width: 30px;

  border-color: rgba(255, 255, 255, 0);
  transition: all 0.4s ease;
  
  .offcanva-icon{
    font-size: 20px;
    color:#000E32;
  }

  &:hover {
    background-color: #000E32;
    border-color:#000E32;

    .offcanva-icon {
      color: white;
    }
  }

  &:focus {
    outline: none;
    box-shadow: none;
  }
  
  &:active {
    outline: none;
    box-shadow: none;
  }
}

/* Mobile Menu Styles */
.offcanvas {
  width: 80%;

  transition: all 0.5s ease;
}

.offcanvas-backdrop {
  transition: all 0.5s ease;
}

.offcanvas-header {
  justify-content: center;
  padding: 25px 0px 10px 0px;
}

/* Ajustar el estilo del contenedor del logo para centrarlo */
.offcanvas-header .d-flex {
  width: 100%;
}

.offnav .offcanva-icon {
  font-size: 20px;
  transition: color 0.3s ease;
}

.bg-none .offnav .offcanva-icon {
  color: white;
}

.bg-appear .offnav .offcanva-icon {
  color: #000E32;
}

.close-button {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 1rem;
  top: 1rem;
  
  height: 40px;
  width: auto;
  border-radius: 5px;

  background-color: white;
  border-color: white;
  transition: all 0.4s ease;
  padding: 8px;
  z-index: 1;

  .close-icon {
    font-size: 24px;

    color:#000E32;
  }

  &:hover {
    border-radius: 50px;
    background-color: #000E32;
    border-color:#000E32;

    .close-icon {
      color: white
    }
  }
}

.mobile-menu-logo {
  height: 70px;
  width: auto;
}

.mobile-menu-text {
  font-family: 'Cinzel Decorative';
  font-size: 22px;
  color: #000E32;
}

.btn-main {
  background: none;
  border: none;
  font-family: 'Josefin Sans';
  font-size: 16px;
  font-weight: 700;
  color: #000E32;
  text-align: left;
  padding: 15px 0;
  transition: all 0.3s ease;
}

.btn-toggle {
  background: none;
  border: none;
  color: #000E32;
  border-left: 2px solid #dee2e6;
  padding: 0 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 45px;
  transition: all 0.3s ease;

  &.show,
  &:hover {
    background-color: #f8f9fa;
  }
}

.btn-toggle:hover,
.btn-main:hover {
  background-color: #f8f9fa;
}

/* Remover los estilos antiguos de las flechas */
.bi-caret-up-fill,
.bi-caret-down-fill {
  font-size: 16px;
}

/* Nuevo estilo para el contenedor de la flecha */
.arrow-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

/* Estilo cuando el dropdown está abierto */
.collapsed .arrow-icon {
  transform: rotate(180deg);
}

.nav-link {
  width: 100%;
  padding: 15px 20px;
  font-family: 'Josefin Sans';
  font-size: 16px;
  font-weight: 700;
  color: #000E32;
  transition: all 0.15s ease;
}

/* Estilos para los dropdowns */
.collapse {
  display: block !important;
  height: 0;
  padding: 0;
  margin: 0;
  overflow: hidden;
  opacity: 0;
  transition: all 0.3s ease-in-out;
  transform: translateY(-10px);
  visibility: hidden;
}

.collapse.show {
  height: auto;
  opacity: 1;
  transform: translateY(0);
  visibility: visible;
}

.sub-link {
  padding-left: 40px;
  background: #f8f9fa;
  font-size: 14px;
  font-weight: 500;
  opacity: 0;
  transform: translateY(-10px);
  transition: all 0.15s ease;

  .collapse.show & {
    opacity: 1;
    transform: translateY(0);
  }

  &:hover {
    opacity: 1;
    background: #e9ecef;
  }
}

.off-fin-drop {
  margin: 0 auto;
  padding-top: 10px;

  display: center;
  justify-content: center;
  align-items: center;
  width: 90%;
}

/* ===================== Cuenta ===================== */

.user-btn {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    width: 30px;
    height: 30px;
    border-radius: 80px;

    background-color: rgba(255, 255, 255, 0);
    border-color:rgba(255, 255, 255, 0);
    transition: all 0.6s;

    i {
      display: flex;
      align-items: center;
      font-size: 20px;
    }
  }

  .bg-none .user-btn i {
    color: white;
  }

  .bg-appear .user-btn i {
    color: #000E32;
  }

  /* Modificar los estados hover de los botones */
  .bg-none .user-btn:hover,
  .bg-none .user-btn.active {
    border-color: white;
    background-color: white;
  }

  .bg-none .user-btn:hover i,
  .bg-none .user-btn.active i {
    color: #000E32;
  }

  .bg-appear .user-btn:hover,
  .bg-appear .user-btn.active {
    border-color: #000E32;
    background-color: #000E32;
  }

  .bg-appear .user-btn:hover i,
  .bg-appear .user-btn.active i {
    color: white;
  }

  .bg-none .offnav:hover {
    background-color: white;
    border-color: white;
  }

  .bg-none .offnav:hover .offcanva-icon {
    color: #000E32;
  }

  .bg-appear .offnav:hover {
    background-color: #000E32;
    border-color: #000E32;
  }

  .bg-appear .offnav:hover .offcanva-icon {
    color: white;
  }

  /* @@@@@@@@@@@@@@@@@ User Form Style @@@@@@@@@@@@@@@@@ */ 

  #uform {
    position: fixed;
    top: 90px;
    right: -250px; /* Reducido de -330px */
    z-index: 1030;

    width: 320px; /* Reducido de 400px */
    max-width: 85%; /* Ajustado de 90% */

    height: 250px; /* Reducido de 300px */
    padding: 0 auto;
    margin: 0 auto;

    display: flex;
    flex-direction: row;
    justify-content: center;
    text-align: center;
    
    background-color: white;
    border: 2px solid black;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);

    font-weight: 700;
    
    opacity: 0;
    visibility: hidden;
    transition: all 0.5s ease;

    /* Normal Size */

    &.nac-size {
      height: 250px; /* Reducido de 300px */
    }

    &.ac-size {
      height: 250px; /* Reducido de 300px */
    }

    &.acp-size {
      height: 505px; /* Reducido de 560px */

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
      right: -250px; /* Reducido de -330px */
      opacity: 0;
      visibility: hidden;
    }

    &.bg-none {
      border-radius: 25px 0px 0px 25px;
    }

    &.bg-appear {
      border-radius: 0px 0px 0px 25px;
    }
  
    /* &.form-shrunk {
      transform: translateY(-100px);
    } */

    .ac-img{

      display: flex;
      justify-content: center;
      align-items: center;

      width: 60px; /* Reducido de 80px */
      height: 60px; /* Reducido de 80px */
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
        margin-left: 15px;
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
      margin-top: 5px;
      text-align: center; /* Centra el texto dentro del label */

      display: flex;
      justify-content: center;
      align-items: center;

      font-family: "Josefin Sans", -apple-system, Roboto, Helvetica, sans-serif;
      font-size: 25px; /* Reducido de 35px */
      font-weight: 700;
    }

    .form-menu-icon {
      white-space: normal; /* Permite que el texto se divida en varias líneas */
      word-wrap: break-word; /* Divide palabras largas si es necesario */

      display: flex;
      justify-content: center; 
      align-items: center;
      text-align: center; /* Centra el texto dentro del label */

      font-size: 30px; /* Reducido de 45px */
      font-weight: 700;
      color: #0047FF;
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
      font-size: 15px; /* Reducido de 22px */
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
      font-size: 13px; /* Reducido de 16px */
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

    .ac-content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      text-align: center;
      width: fit-content;
      max-width: 225px;
    }

    /* @@@@@@@@@@@@@@@@ Profile Style @@@@@@@@@@@@@@@@ */

    .pf-img {
      display: flex;
      justify-content: center;
      align-items: center;

      width: 100px; /* Reducido de 130px */
      height: 100px; /* Reducido de 130px */
    }

    .form-pf-label {
      word-wrap: break-word; /* Divide palabras largas si es necesario */
      text-align: center; /* Centra el texto dentro del label */
      line-height: 1.0;

      display: flex;
      justify-content: center;
      align-items: center;

      font-family: "Josefin Sans", -apple-system, Roboto, Helvetica, sans-serif;
      font-size: 17px; /* Reducido de 20px */
      font-weight: 700;
    }

    .form-pf-sublabel {
      word-wrap: break-word; /* Divide palabras largas si es necesario */
      text-align: left; /* Centra el texto dentro del label */
      line-height: 1.25;

      display: flex;
      justify-content: left;
      align-items: left;

      font-family: "Nunito Sans", sans-serif;
      font-size: 13px; /* Reducido de 16px */
      font-weight: 700;

      &#act {
        font-family: "Josefin Sans", -apple-system, Roboto, Helvetica, sans-serif;
        color:#0047FF;
      }
    }
    
    /* @@@@@@@@@@@@@@@@ Label Icon @@@@@@@@@@@@@@@@ */

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
      font-size: 14px; /* Reducido de 16px */
      font-weight: 700;
      transition: all 0.3s ease;
      position: relative;
      cursor: pointer;

      &.account {
        gap: 20px;
        margin-right: 50px;
      }
      
      &.default{
        gap: 15px;
      }
    
      .button-icon {
        width: 30px; /* Reducido de 35px */
        display: flex;
        justify-content: center;
        align-items: center;

        font-size: 24px; /* Reducido de 30px */
        color: #0047FF;
        transition: all 0.3s ease;
        flex-shrink: 0;
      }
    
      .button-text {
        text-align: center;
        width: 150px; /* Reducido de 185px */
        flex-grow: 0; /* Quitar flex-grow para mantener el ancho fijo */
        padding: 0.2rem 0rem; /* Reducido de 0.25rem 1rem */
        border: 0.5px solid #0047FF;
        border-radius: 50px;
        transition: all 0.3s ease;

        &#lbt {
          width: 120px; /* Reducido de 145px */
          padding: 0.25rem 1rem;
        }
      }

      .button-ac-text {
        font-family: "Nunito Sans", sans-serif;
        font-size: 14px; /* Reducido de 16px */
        font-weight: 600;
        color: black;
        text-align: left;
        width: 100px; /* Reducido de 185px */
        flex-grow: 0; /* Quitar flex-grow para mantener el ancho fijo */
        padding: 0.2rem 0;
        border: 1px;
        border-radius: 50px;
        transition: all 0.3s ease;
      }

      .button-ac-icon {
        width: 25px; /* Reducido de 10px */
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;

        font-size: 20px; /* Reducido de 25px */
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
      margin-left: 5px; /* Reducido de 75px */
      display: flex;
      justify-content: center;
      align-items: center;
      height: 25px; /* Reducido de 30px */

      border-radius: 50px;
      border-color: #0047FF;

      font-size: 14px; /* Reducido de 16px */
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
      display: flex;
      justify-content: center;
      align-items: center;

      bottom: 5px;
      left: 5px;

      width: 35px; /* Reducido de 45px */
      height: 35px; /* Reducido de 45px */
      border-radius: 50px;

      font-size: 20px; /* Reducido de 22px */

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