<script>

export default {
    name: "FilterControls",
};

</script>

<template>
    
    <section class="filter-controls">

        <div class="controls-container">

            <div class="filter-section">

                <h2 class="section-title">FILTRADO</h2>
                <button class="filter-button">
                    <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/fdf70cdc3ea1df14f146956349688f2add304fc8?placeholderIfAbsent=true&apiKey=31e7b46c22c443bc84c06a4f4720155e" alt="Filter" class="filter-icon" />
                </button>

            </div>

            <div class="view-section">

                <h2 class="section-title">VER</h2>
                <div class="view-options">
                    <button class="view-option">MOSAICO</button>
                    <button class="view-option">LISTA</button>
                </div>

            </div>

            <div class="sort-section">

                <h2 class="section-title">ORDENAR</h2>
                <div class="sort-button">
                    <span>AGREGADO RECIENTEMENTE</span>
                    <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/bbafc7745e6452db175086fb8d6c74f2f0fbd846?placeholderIfAbsent=true&apiKey=31e7b46c22c443bc84c06a4f4720155e" alt="Sort" class="sort-icon" />
                </div>

            </div>

        </div>

    </section>

</template>



<style scoped>

.filter-controls {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 52px;
    width: 100%;
    max-width: 1322px;
}

.controls-container {
    display: flex;
    gap: 20px;
}

.filter-section,
.view-section,
.sort-section {
    display: flex;
    flex-direction: column;
    align-items: stretch;
}

.section-title {
    color: #000000;
    font-size: 24px;
    font-family:
        "Nunito Sans",
        -apple-system,
        Roboto,
        Helvetica,
        sans-serif;
    font-weight: 700;
    letter-spacing: 0.48px;
    text-align: center;
}

.filter-button {
    border-radius: 50px;
    background-color: #ffffff;
    border: 2px solid #000000;
    padding: 16px 21px;
    margin-top: 31px;
    cursor: pointer;
}

.filter-icon {
    width: 40px;
    aspect-ratio: 1;
    object-fit: contain;
}

.view-options {
    display: flex;
    margin-top: 33px;
    gap: 4px;
}

.view-option {
    border-radius: 10px;
    background-color: #ffffff;
    border: 2px solid #000000;
    padding: 26px 15px;
    font-family:
        "Nunito Sans",
        -apple-system,
        Roboto,
        Helvetica,
        sans-serif;
    font-size: 24px;
    font-weight: 700;
    cursor: pointer;
}

.sort-button {
    border-radius: 10px;
    background-color: #ffffff;
    border: 2px solid #000000;
    display: flex;
    margin-top: 33px;
    padding: 12px 14px;
    align-items: center;
    gap: 9px;
    font-family:
        "Nunito Sans",
        -apple-system,
        Roboto,
        Helvetica,
        sans-serif;
    font-size: 24px;
    font-weight: 700;
}

.sort-icon {
    width: 44px;
    aspect-ratio: 1;
    object-fit: contain;
}

@media (max-width: 991px) {
    .filter-controls {
        max-width: 100%;
        margin-top: 40px;
    }

    .controls-container {
        flex-direction: column;
        align-items: stretch;
    }

    .view-options {
        flex-wrap: wrap;
    }
}

</style>
