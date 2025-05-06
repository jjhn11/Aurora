<template>
      <div class="modal-overlay" @click="close">
        <div class="modal-dialog" @click.stop>
          <div class="modal-header">
            <h3>COMPARTIR</h3>
            <button @click="close" class="close-button" type="button">&times;</button>
          </div>
          <div class="modal-body">
            <p>Comparte nuestro contenido con tus amigos y que formen parte de esta gran comunidad</p>
            <div class="social-icons">
              <button @click="shareOn('facebook')" class="social-icon facebook" type="button">
                <i class="fab fa-facebook-f"></i>
              </button>
              <button @click="shareOn('twitter')" class="social-icon twitter" type="button">
                <i class="fab fa-twitter"></i>
              </button>
              <button @click="shareOn('whatsapp')" class="social-icon whatsapp" type="button">
                <i class="fab fa-whatsapp"></i>
              </button>
              <button @click="shareOn('pinterest')" class="social-icon pinterest" type="button">
                <i class="fab fa-pinterest-p"></i>
              </button>
              <button @click="shareOn('instagram')" class="social-icon instagram" type="button">
                <i class="fab fa-instagram"></i>
              </button>
            </div>
            <div class="share-link-section">
              <input
                ref="linkInput"
                type="text"
                readonly
                :value="currentPageUrl"
                class="share-link-input"
                @click="selectLink"
              />
              <button @click="copyLink" class="copy-link-button" type="button">COPIAR LINK</button>
            </div>
          </div>
        </div>
      </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import { useStore } from "vuex";
  
  const store = useStore();

  const linkInput = ref(null);
  const currentPageUrl = computed(() => window.location.href);
  
    // const emit = defineEmits(['close']);
    const close = () => {
        store.commit('setShowingShareModal', false);
    };

  const selectLink = () => {
    linkInput.value && linkInput.value.select();
  };
  
  const shareOn = (platform) => {
    const url = encodeURIComponent(currentPageUrl.value);
    const title = encodeURIComponent(document.title || '');
    let shareUrl = '';
    switch (platform) {
      case 'facebook': shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`; break;
      case 'twitter': shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`; break;
      case 'whatsapp': shareUrl = `https://api.whatsapp.com/send?text=${title}%20${url}`; break;
      case 'pinterest': shareUrl = `https://pinterest.com/pin/create/button/?url=${url}&description=${title}`; break;
      case 'instagram':
        alert('Para compartir en Instagram, copia y pega manualmente: ' + decodeURIComponent(url));
        return;
    }
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };
  
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentPageUrl.value);
      alert('Enlace copiado al portapapeles');
    } catch {
      selectLink();
      document.execCommand('copy');
      alert('Enlace copiado');
    }
  };
  </script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001;
  pointer-events: auto; /* Needed for proper event handling */
}

.modal-dialog {
  background-color: white;
  width: 90%;
  max-width: 500px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
  position: relative;
  z-index: 1002; /* Higher than overlay */
  pointer-events: auto; /* Ensure clicks work */
}

.modal-header {
display: flex;
justify-content: space-between;
align-items: center;
padding: 15px 20px;
border-bottom: 1px solid #eee;
}

.modal-header h3 {
margin: 0;
font-family: 'Crimson Text', serif;
font-size: 24px;
color: #000E32;
}

.close-button {
background: none;
border: none;
font-size: 24px;
color: #0047FF;
cursor: pointer;
}

.modal-body {
padding: 20px;
}

.modal-body p {
text-align: center;
margin-bottom: 20px;
font-family: 'Nunito Sans', sans-serif;
}

.social-icons {
display: flex;
justify-content: center;
gap: 20px;
margin: 20px 0;
}

.social-icon {
width: 50px;
height: 50px;
border-radius: 50%;
display: flex;
align-items: center;
justify-content: center;
font-size: 20px;
color: white;
cursor: pointer;
transition: transform 0.3s;
}

.social-icon:hover {
transform: scale(1.1);
}

.facebook { background-color: #3b5998; }
.twitter { background-color: #000000; }
.whatsapp { background-color: #25D366; }
.pinterest { background-color: #E60023; }
.instagram { 
background: linear-gradient(45deg, #405DE6, #5851DB, #833AB4, #C13584, #E1306C, #FD1D1D);
}

.share-link-section {
margin-top: 20px;
display: flex;
gap: 10px;
}

.share-link-input {
flex: 1;
padding: 10px;
border: 1px solid #ccc;
border-radius: 4px;
font-family: 'Nunito Sans', sans-serif;
}

.copy-link-button {
background-color: #0047FF;
color: white;
border: none;
border-radius: 4px;
padding: 5px 15px;
font-family: 'Josefin Sans', sans-serif;
cursor: pointer;
}

/* Responsive adjustments */
@media (max-width: 576px) {
.social-icons {
    gap: 15px;
}

.social-icon {
    width: 40px;
    height: 40px;
    font-size: 18px;
}

.share-link-section {
    flex-direction: column;
}

.copy-link-button {
    align-self: stretch;
}
}
</style>