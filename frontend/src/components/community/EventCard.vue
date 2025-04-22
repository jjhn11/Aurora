<script>

export default {
    name: "EventCard",
    props: {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        organizer: {
            type: String,
            required: true,
        },
        startTime: {
            type: String,
            required: true,
        },
        endTime: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        imageSrc: {
            type: String,
            required: true,
        },
        backgroundColor: {
            type: String,
            default: "rgba(251, 227, 38, 1)",
        },
        date: {
            type: String,
            required: true,
        },
    },
    
    computed: {
        formattedDate() {
            const date = new Date(this.date);
            return date.toLocaleDateString('es-ES', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        }
    }
};

</script>

  

<template>
    <section class="event-card">
        <div class="event-content">
            <div class="event-info-column">
                <div class="event-details">
                    <h2 class="event-title">{{ title }}</h2>
                    <div class="event-info">
                        <p class="event-organizer">Organizador: {{ organizer }}</p>
                        <p class="event-description">{{ description }}</p>
                        <div class="event-datetime">
                            <p class="event-date">{{ formattedDate }}</p>
                            <div class="event-time-location">
                                <div class="event-time">
                                    <span>{{ startTime }}</span>
                                    <span class="time-separator">-</span>
                                    <span>{{ endTime }}</span>
                                </div>
                                <span class="event-location">{{ location }}</span>
                            </div>
                        </div>
                        <p class="event-category">{{ category }}</p>
                    </div>
                </div>
            </div>

            <div class="attendance-column">
                <div class="attendance-container">
                    <div class="attendance-circle" :style="{ backgroundColor }">
                        <img :src="imageSrc" class="attendance-image" alt="Event icon" />
                    </div>
                    <button class="attendance-button">ASISTENCIA</button>
                </div>
            </div>
        </div>
    </section>
</template>

 

<style scoped>

    .event-card {
        border-radius: 20px;
        background-color: rgba(246, 246, 246, 1);
        border: 1px solid rgba(126, 131, 130, 1);
        width: 1230px;
        max-width: 100%;
        padding: 25px 64px 45px;
    }
  
    .event-content {
        display: flex;
        gap: 20px;
    }
  
    .event-info-column {
        display: flex;
        flex-direction: column;
        width: 78%;
        line-height: normal;
    }
  
    .event-details {
        display: flex;
        margin-top: 22px;
        flex-grow: 1;
        flex-direction: column;
        color: rgba(0, 14, 50, 1);
        font-weight: 700;
    }
  
    .event-title {
        font-size: 50px;
        font-family:
            Crimson Text,
            -apple-system,
            Roboto,
            Helvetica,
            sans-serif;
        text-align: center;
        align-self: flex-start;
        margin: 0;
    }
  
    .event-info {
        align-self: flex-end;
        display: flex;
        min-height: 191px;
        width: 758px;
        max-width: 100%;
        padding: 10px;
        flex-direction: column;
        align-items: flex-start;
        font-family:
            Josefin Sans,
            -apple-system,
            Roboto,
            Helvetica,
            sans-serif;
        font-size: 30px;
        justify-content: space-between;
    }
  
    .event-organizer {
        align-self: stretch;
        padding: 10px;
        text-align: left;
        margin: 0;
    }
  
    .event-time-location {
        display: flex;
        width: 663px;
        max-width: 100%;
        padding: 10px;
        align-items: center;
        gap: 36px;
        justify-content: space-between;
        flex-wrap: wrap;
    }
  
    .event-time {
        text-align: center;
        align-self: stretch;
        margin: auto 0;
    }
  
    .event-location {
        align-self: stretch;
        margin: auto 0;
        width: 442px;
    }
  
    .event-category {
        padding: 10px;
        white-space: nowrap;
        text-align: center;
        margin: 0;
    }
  
    .attendance-column {
        display: flex;
        flex-direction: column;
        width: 22%;
        margin-left: 20px;
        line-height: normal;
    }
  
    .attendance-container {
        width: 100%;
    }
  
    .attendance-circle {
        border: 1px solid rgba(126, 131, 130, 1);
        border-radius: 50%;
        display: flex;
        margin: 0 10px;
        padding: 30px;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        aspect-ratio: 1;
    }
  
    .attendance-image {
        aspect-ratio: 1;
        object-fit: contain;
        object-position: center;
        width: 152px;
        border-radius: 200px;
    }
  
    .attendance-button {
        align-self: stretch;
        border-radius: 20px;
        background-color: #fff;
        border: 1px solid rgba(126, 131, 130, 1);
        margin-top: 12px;
        min-height: 51px;
        padding: 16px 10px;
        font-family:
            Josefin Sans,
            -apple-system,
            Roboto,
            Helvetica,
            sans-serif;
        font-size: 20px;
        color: rgba(0, 14, 50, 1);
        font-weight: 700;
        white-space: nowrap;
        text-align: center;
        cursor: pointer;
        width: 100%;
    }

    .event-description {
        align-self: stretch;
        padding: 10px;
        margin: 0 0 10px 0;
        text-align: justify;
        font-size: 20px;
        line-height: 1.4;
        color: rgba(0, 14, 50, 0.8);
    }

    .event-time {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .time-separator {
        color: rgba(0, 14, 50, 0.6);
    }

    .event-datetime {
        display: flex;
        flex-direction: column;
        gap: 10px;
        width: 100%;
    }

    .event-date {
        font-size: 24px;
        color: rgba(0, 14, 50, 0.9);
        margin: 0;
        padding: 10px;
        text-transform: capitalize;
    }
  
    @media (max-width: 991px) {
        .event-card {
            padding: 25px 20px 45px;
            margin-top: 40px;
        }
  
        .event-content {
            flex-direction: column;
            align-items: stretch;
            gap: 0;
        }
  
        .event-info-column {
            width: 100%;
        }
  
        .event-details {
            max-width: 100%;
            margin-top: 40px;
        }
  
        .event-title {
            font-size: 40px;
        }
  
        .event-location {
            max-width: 100%;
        }
  
        .event-category {
            white-space: initial;
        }
  
        .attendance-column {
            width: 100%;
            margin-left: 0;
        }
  
        .attendance-container {
            margin-top: 25px;
        }
  
        .attendance-circle {
            padding: 20px;
        }
  
        .attendance-button {
            white-space: initial;
        }

        .event-description {
            font-size: 16px;
        }

        .event-time {
            flex-direction: column;
            gap: 5px;
        }

        .time-separator {
            display: none;
        }

        .event-date {
            font-size: 20px;
        }
    }

</style>
