<template>
  <Transition name="fade">
    <div v-if="modelValue" class="form-overlay" @click.self="closeModal">
      <div class="share-modal">
        <header class="modal-header"> 
          <div class="close-button-container">
            <button type="button" class="close-button" @click="closeModal">✕</button>
          </div>
          <h1 class="modal-title">COMPARTIR</h1>
        </header>

        <div class="modal-body">
          <p class="share-text">
            Comparte nuestro contenido con tus amigos y que formen parte de esta
            gran comunidad
          </p>
          <div class="divider-container">
            <div class="divider"></div>
          </div>

          <div class="social-icons">
            <div class="social-icon-wrapper">
              <div
                @click="shareOn('instagram')"
                class="social-icon instagram"
              >
                <img src="@/assets/img/library/insta.png" alt="Instagram" class=" social-icon-image" />
              </div>
              <span class="social-label">Instagram</span>
            </div>
            <div class="social-icon-wrapper">
              <div
                @click="shareOn('facebook')"
                class="social-icon facebook"
              >
                <img src="@/assets/img/library/fb.png" alt="Facebook" class=" social-icon-image" />
              </div>
              <span class="social-label">Facebook</span>
            </div>
            <div class="social-icon-wrapper">
              <div
                @click="shareOn('whatsapp')"
                class="social-icon whatsapp"
              >
                <img src="@/assets/img/library/whatsapp.png" alt="WhatsApp" class=" social-icon-image" />
              </div>
              <span class="social-label">WhatsApp</span>
            </div>
            <div class="social-icon-wrapper">
              <div
                @click="shareOn('twitter')"
                class="social-icon twitter"
              >
                <img src="@/assets/img/library/x.png" alt="Twitter" class=" social-icon-image" />
              </div>
              <span class="social-label">X</span>
            </div>
            <div class="social-icon-wrapper">
              <div
                @click="shareOn('pinterest')"
                class="social-icon pinterest"
              >
                <img src="@/assets/img/library/pinterest.png" alt="Pinterest" class=" social-icon-image" />
              </div>
              <span class="social-label">Pinterest</span>
            </div>
          </div>

          <div class="share-link-section">
            <div class="link-container">
              <input
                ref="linkInput"
                type="text"
                readonly
                :value="currentPageUrl"
                class="share-link-input"
                @click="selectLink"
              />
              <button @click="copyLink" class="copy-link-button" type="button">
                COPIAR LINK
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits } from "vue";

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

const linkInput = ref(null);
const currentPageUrl = computed(() => window.location.href);

const closeModal = () => {
  emit("update:modelValue", false);
};

// watch(() => props.modelValue);

const selectLink = () => {
  linkInput.value && linkInput.value.select();
};

const shareOn = (platform) => {
  const url = encodeURIComponent(currentPageUrl.value);
  const title = encodeURIComponent(document.title || "");
  const quote = encodeURIComponent("Check out this amazing content!");

  // Define sharing URLs by platform
  const platformUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${quote}`,
    twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
    whatsapp: `https://api.whatsapp.com/send?text=${title}%20${url}`,
    pinterest: `https://pinterest.com/pin/create/button/?url=${url}&description=${title}`,
  };

  // Instagram-specific handling
  if (platform === "instagram") {
    alert(
      "Instagram no permite compartir enlaces directamente. " +
      "Por favor, copia y pega este enlace en tu perfil o historia: " +
      decodeURIComponent(url)
    );
    return;
  }

  const shareUrl = platformUrls[platform];
  if (!shareUrl) {
    console.error(`Unsupported platform: ${platform}`);
    alert("Esta plataforma no es compatible para compartir.");
    return;
  }

  // Open the sharing URL in a new tab
  window.open(shareUrl, "_blank", "noopener,noreferrer");
};

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(currentPageUrl.value);
    alert("Enlace copiado al portapapeles");
  } catch {
    selectLink();
    document.execCommand("copy");
    alert("Enlace copiado");
  }
};
</script>

<style scoped>
/* Overlay */
.form-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

/* Modal */
.share-modal {
  background-color: white;
  width: 90%;
  max-width: 800px;
  border-radius: 10px;
  padding: 10px 20px 20px 10px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
}

/* Header */
.modal-header {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.modal-title {
  font-family: "Crimson Text", serif;
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  letter-spacing: 0.1rem;
  font-weight: bold;
  margin: 0 auto;
}

.close-button-container {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}

.close-button {
  background: none;
  border: none;
  font-weight: bold;
  font-size: 24px;
  color: #0047ff;
  cursor: pointer;
}

/* Body */
.modal-body .share-text {
  text-align: center;
  font-family: "Nunito Sans", sans-serif;
  font-weight: normal;
  margin-bottom: 20px;
}

.divider-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.divider {
  border: 0;
  border-top: 1px solid black;
  width: 90%;
}

/* Social Icons */
.social-icons {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin: 20px 0;
}

.social-icon-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.social-icon {
  width: 70px;
  height: 70px;
  /* border-radius: 50%; */
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  color: white;
  cursor: pointer;
  transition: transform 0.3s;
  background-color: transparent;
}

.twitter {
  width: 85px;
  height: 85px;
  margin-top: -5px;
}

.social-icon-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.social-icon:hover {
  transform: scale(1.1);
}

.social-label {
  margin-top: 8px;
  font-size: 14px;
  font-family: "Nunito Sans", sans-serif;
  font-weight: normal;
}

/* Link Section */
.share-link-section {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.link-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #F8F8F8;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding: 10px;
  width: 100%;
  max-width: 600px;
}

.share-link-input {
  width: 90%;
  padding: 10px;
  text-align: center;
  background-color: transparent;
  border: none;
  font-size: 1rem;
  font-weight: 500;
  font-family: "Nunito Sans", sans-serif;
}

.copy-link-button {
  background-color: #0047ff;
  color: white;
  border: none;
  border-radius: 12px;
  border: 1px solid black;
  padding: 10px 20px;
  font-family: "Josefin Sans", sans-serif;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  margin-top: 10px;
}

/* Responsive */
@media (max-width: 768px) {
  .share-modal {
    width: 95%;
    padding: 10px 15px 15px 10px;
  }

  .social-icons {
    gap: 20px;
    flex-wrap: wrap;
    padding: 0 10px;
    justify-content: center;
  }

  .social-icon-wrapper {
    flex: 0 0 calc(33.333% - 15px);
  }

  .social-icon {
    width: 60px;
    height: 60px;
  }

  .twitter {
    width: 70px;
    height: 70px;
  }

  .modal-body .share-text {
    font-size: 0.9rem;
    padding: 0 10px;
  }

  .copy-link-button {
    width: 100%;
    max-width: 200px;
  }
}

@media (max-width: 576px) {
  .share-modal {
    width: 95%;
    padding: 10px 15px 15px 10px;
  }

  .social-icons {
    gap: 20px;
    flex-wrap: wrap;
    padding: 0 10px;
    justify-content: center;
  }

  .social-icon-wrapper {
    flex: 0 0 calc(33.333% - 15px);
  }

  .social-icon {
    width: 45px;
    height: 45px;
  }

  .twitter {
    width: 55px;
    height: 55px;
  }
}

@media (max-width: 360px) {
  .social-icon-wrapper {
    flex: 0 0 calc(50% - 8px);
  }

  .social-icons {
    grid-template-columns: repeat(2, 1fr); /* Change to 2 columns */
    max-width: 200px;
    gap: 15px 8px; /* Vertical gap 15px, horizontal gap 8px */
  }

  .social-icon {
    width: 40px;
    height: 40px;
  }

  .twitter {
    width: 48px;
    height: 48px;
  }

  .social-label {
    font-size: 12px;
  }
}

/* Add smooth transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>