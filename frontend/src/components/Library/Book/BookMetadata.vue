<template>
    <section class="book-metadata-section">
      <div class="metadata-container">
        <div class="metadata-column-left">
          <div class="metadata-group">
            <div class="metadata-item format">FORMATO: {{ format }}</div>
            <div class="metadata-item author-info">
              <span class="metadata-label">AUTOR:</span>
              <span
                v-for="(author, index) in authors"
                :key="index"
                class="metadata-value author"
              >
                {{ author }}{{ index < authors.length - 1 ? ', ' : '' }}
              </span>
            </div>
            <div class="metadata-item publisher-info">
              <span class="metadata-label">EDITORIAL:</span>
              <span class="metadata-value">{{ publisher }}</span>
            </div>
            <div class="metadata-item year">AÑO: {{ year }}</div>
            <div class="metadata-item pages">NO. PÁGINAS: {{ pages }}</div>
          </div>
        </div>
        <div class="metadata-column-right">
          <div class="metadata-group">
            <div class="metadata-item binding">ENCUADERNACIÓN: {{ binding }}</div>
            <div class="metadata-item isbn">ISBN: {{ isbn }}</div>
            <div class="metadata-item edition">NO. EDICIÓN: {{ edition }}</div>
            <div class="metadata-item categories-info">
              <span class="metadata-label">CATEGORÍAS:</span>
              <span
                v-for="(category, index) in categories"
                :key="index"
                class="metadata-value category"
              >
                {{ category }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    name: "BookMetadata",
    props: {
      format: {
        type: String,
        required: true,
      },
      authors: {
        type: Array, // Changed from String to Array
        required: true,
      },
      publisher: {
        type: String,
        required: true,
      },
      year: {
        type: String,
        required: true,
      },
      pages: {
        type: String,
        required: true,
      },
      binding: {
        type: String,
        required: true,
      },
      isbn: {
        type: String,
        required: true,
      },
      isbn13: {
        type: String,
        required: true,
      },
      edition: {
        type: String,
        required: true,
      },
      categories: {
        type: Array,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  .book-metadata-section {
    margin-top: 77px;
    margin-left: 78px;
    width: 100%;
    max-width: 1208px;
  }
  
  @media (max-width: 991px) {
    .book-metadata-section {
      max-width: 100%;
      margin-top: 40px;
      margin-left: 0px;
      justify-content: center;
    }
  }
  
  .metadata-container {
    gap: 20px;
    display: flex;
  }
  
  @media (max-width: 991px) {
    .metadata-container {
      align-items: stretch;
      gap: 0px;
    }
  }
  
  .metadata-column-left {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    line-height: normal;
    width: 59%;
    margin-left: 0px;
  }
  
  @media (max-width: 991px) {
    .metadata-column-left {
      width: 50%;
    }
  }
  
  .metadata-group {
    display: flex;
    min-height: 250px;
    width: 100%;
    padding: 10px;
    flex-direction: column;
    align-items: start;
    font-size: 25px;
    font-weight: 600;
    text-align: center;
    justify-content: start;
  }
  
  @media (max-width: 991px) {
    .metadata-group {
      max-width: 100%;
      margin-top: 40px;
    }
  }
  
  .metadata-item {
    align-self: stretch;
    text-align: left;
    padding: 5px;
    gap: 10px;
    font-family:
      Nunito Sans,
      -apple-system,
      Roboto,
      Helvetica,
      sans-serif;
    color: rgba(0, 14, 50, 1);
    margin-top: 5px;
  }
    
  @media (max-width: 991px) {
    .metadata-item {
      max-width: 100%;
      font-size: 12px;
    }
  }

  .author-info,
  .publisher-info {
    text-align: left;
    align-self: stretch;
    display: flex;
    width: 100%;
    padding: 5px;
    align-items: center;
    gap: 10px;
    justify-content: start;
    flex-wrap: wrap;
  }
  
  .metadata-label {
    color: rgba(0, 14, 50, 1);
    font-family:
      Nunito Sans,
      -apple-system,
      Roboto,
      Helvetica,
      sans-serif;
    align-self: stretch;
    margin-top: auto;
    margin-bottom: auto;
    
  }
  @media (max-width: 991px) {
    .metadata-label {
      max-width: 100%;
      font-size: 12px;
    }
  }
  .metadata-value {
    color: rgba(0, 71, 255, 1);
    font-family:
      Josefin Sans,
      -apple-system,
      Roboto,
      Helvetica,
      sans-serif;
    align-self: stretch;
    margin-top: auto;
    margin-bottom: auto; 
  }
  
  @media (max-width: 991px) {
    .metadata-value {
      max-width: 100%;
      font-size: 12px;
    }
  }
  
  @media (max-width: 991px) {
    .publisher-info {
      white-space: initial;
    }
  }
  
  .year {
    align-self: stretch;
    margin-top: 5px;
    padding: 5px;
    gap: 10px;
    font-family:
      Nunito Sans,
      -apple-system,
      Roboto,
      Helvetica,
      sans-serif;
    color: rgba(0, 14, 50, 1);
  }
  
  .pages {
    align-self: stretch;
    margin-top: 5px;
    padding: 5px;
    gap: 10px;
    font-family:
      Nunito Sans,
      -apple-system,
      Roboto,
      Helvetica,
      sans-serif;
    color: rgba(0, 14, 50, 1);
  }
  
  .metadata-column-right {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    line-height: normal;
    width: 41%;
    margin-left: 20px;
  }
  
  @media (max-width: 991px) {
    .metadata-column-right {
      width: 50%;
    }
  }
  
  .binding,
  .isbn,
  .isbn13,
  .edition {
    align-self: stretch;
    margin-top: 5px;
    padding: 5px;
    gap: 20px;
    font-family:
      Nunito Sans,
      -apple-system,
      Roboto,
      Helvetica,
      sans-serif;
    color: rgba(0, 14, 50, 1);
  }
  
  .categories-info {
    display: flex;
    align-items: stretch;
    gap: 26px;
    flex-wrap: wrap;
    margin-top: 15px;
    padding: 5px;
    align-items: center;
    gap: 10px;
    font-family:
      Josefin Sans,
      -apple-system,
      Roboto,
      Helvetica,
      sans-serif;
    color: rgba(0, 71, 255, 1);
    white-space: nowrap;
    justify-content: start;
  }
  
  @media (max-width: 991px) {
    .categories-info {
      flex-direction: column;
      align-items: flex-start;
      max-width: 100%;
      white-space: initial;
    }
  }
  
  .category {
    align-self: stretch;
    margin-top: auto;
    margin-bottom: auto;
    
  }
  @media (max-width: 991px) {
    .category-info {
      white-space: initial;
    }
  }

  .author {
    display: inline;
    margin-top: auto;
    margin-bottom: auto;
  }

  @media (max-width: 991px) {
    .author {
      font-size: 12px;
    }
  }
  </style>
