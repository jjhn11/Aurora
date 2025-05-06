<template>
    <div class="search-bar-container">
        <h2 class="search-bar-title">¡El conocimiento está al alcance de tus manos!</h2>
        <div class="search-bar">
            <button class="search-button">
                <i class="bi bi-search"></i>
            </button>
            <input
                type="text"
                placeholder="Buscar artículos, libros, publicaciones y más..."
                class="search-input"
            />
        </div>
        <!--<div class="advanced-search">
            <a href="#" class="advanced-search-link">[Búsqueda avanzada]</a>
        </div>-->
    </div>
</template>

<style scoped>
.search-bar-container {
    text-align: center;
}
.search-bar-title {
    font-size: 1.6rem;
    font-weight: bold;
    color: #000E32;

    margin-bottom: 1rem;
}

.search-bar {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
}

.search-input {
    width: 70%;
    padding: 0.75rem 1rem;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
    font-size: 1.1rem;
    padding-left: 6%; /* Add space for the button */
}

.search-button {
    position: absolute; /* Position the button inside the input */
    left: 15%; /* Adjust based on the input width */
    background-color: transparent;
    color: #3366cc;
    border: none;
    padding: 0.5rem;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2.5rem;
    width: 2.5rem;
}

.search-button i {
    font-size: 1.25rem;
    font-weight: 900;
}

.advanced-search {
    width: 85%;
    text-align: end;
}
.advanced-search-link {
    display: block;
    margin-top: 0.5rem;
    font-size: 1.2rem;
    font-weight: 900;
    color: #0047FF;
    text-decoration: none;
}

@media (max-width: 768px) {
  .search-bar-title {
    font-size: 1.3rem;
    padding: 0 15px;
  }

  .search-input {
    width: 90%;
    font-size: 1rem;
    padding: 0.6rem 1rem;
    padding-left: 8%;
  }

  .search-button {
    left: 6%;
    height: 2rem;
    width: 2rem;
  }

  .search-button i {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .search-bar-title {
    font-size: 1.1rem;
  }

  .search-input {
    width: 95%;
    font-size: 0.9rem;
  }
}
</style>