import eventImage1 from '@/assets/img/events/cultural-event-1.jpg';
import eventImage2 from '@/assets/img/events/cultural-event-2.jpg';
import eventImage3 from '@/assets/img/events/cultural-event-2.jpg';
import eventImage4 from '@/assets/img/events/sports-event-1.jpg';
import eventImage5 from '@/assets/img/events/sports-event-2.jpg';
import eventImage6 from '@/assets/img/events/sports-event-2.jpg';
import eventImage7 from '@/assets/img/events/school-event-1.jpg';
import eventImage8 from '@/assets/img/events/school-event-1.jpg';
import eventImage9 from '@/assets/img/events/school-event-1.jpg';

export default {
  namespaced: true,
  state: {
    events: [
      {
        id: 1,
        title: "Book Discussion",
        date: "2025-04-15",
        time: "17:00",
        location: "Biblioteca Central",
        description: "Pachuca invites the entire TECNM Community and the general public to follow the book discussion on 'How Man Became a Giant'.",
        longDescription: "Join us for an engaging discussion about the fascinating book 'How Man Became a Giant'. This event will explore the key themes, characters, and philosophical questions raised by the author. Our panel of experts will guide the conversation and invite audience participation. Light refreshments will be served after the discussion.",
        image: eventImage1,
        category: "Cultural",
        organizer: "Department of Cultural Affairs",
        capacity: 120,
        registrationRequired: true,
        registrationLink: "https://example.com/register/event1",
        status: "Upcoming"
      },
      {
        id: 2,
        title: "National Meeting",
        date: "2025-04-11",
        time: "09:00",
        location: "Auditorio Principal",
        description: "An event aimed at strengthening innovation and research work in the dairy sector through knowledge exchange.",
        longDescription: "The National Meeting for Dairy Innovation brings together researchers, industry professionals, and students to share the latest advancements in dairy science and technology. The event will feature keynote speakers, panel discussions, and networking opportunities. This is a unique opportunity to learn about cutting-edge research and establish valuable connections in the dairy sector.",
        image: eventImage2,
        category: "Cultural",
        organizer: "Faculty of Agricultural Sciences",
        capacity: 250,
        registrationRequired: true,
        registrationLink: "https://example.com/register/event2",
        status: "Upcoming"
      },
      {
        id: 3,
        title: "INE Visit",
        date: "2025-04-15",
        time: "11:30",
        location: "Sala de Conferencias A",
        description: "We welcomed Lic. Efraín Morales de la Cruz, Executive Vocal of District Board 01 of the INE in Baja California, and Lic. Nancy Robledo Torres.",
        longDescription: "The Instituto Nacional Electoral (INE) representatives will provide an informative session about the electoral process, voter registration, and the importance of civic participation. Students will have the opportunity to ask questions and engage in a dialogue about democracy and electoral systems in Mexico. This event is part of our commitment to promoting civic education and active citizenship.",
        image: eventImage3,
        category: "Cultural",
        organizer: "Department of Social Sciences",
        capacity: 80,
        registrationRequired: false,
        status: "Upcoming"
      },
      {
        id: 4,
        title: "Volleyball Team Participation",
        date: "2025-03-15",
        time: "14:00",
        location: "Gimnasio Universitario",
        description: "Last Saturday, March 15, our women's volleyball team proudly represented the Instituto Tecnológico de Mexicali.",
        longDescription: "Our women's volleyball team competed in the regional championship, facing teams from various universities across the state. The tournament showcased incredible talent and sportsmanship from all participants. Come support our team and witness the culmination of months of training and dedication. The event will feature matches throughout the day, with the finals scheduled for the evening.",
        image: eventImage4,
        category: "Sports",
        organizer: "Sports Department",
        capacity: 300,
        registrationRequired: false,
        status: "Past"
      },
      {
        id: 5,
        title: "ITM Anniversary Run",
        date: "2025-04-15",
        time: "07:00",
        location: "Campus Principal",
        description: "Students, faculty, and runners participated yesterday in the 31st edition of the Anniversary Run of the Instituto Tecnológico de Mexicali.",
        longDescription: "Join us for the 31st Annual Anniversary Run of the Instituto Tecnológico de Mexicali! This traditional 5K run celebrates our institution's founding and brings together students, faculty, alumni, and the wider community. Participants will receive a commemorative t-shirt, and prizes will be awarded to the top finishers in various categories. Registration is open to all ages and fitness levels.",
        image: eventImage5,
        category: "Sports",
        organizer: "Anniversary Committee & Sports Department",
        capacity: 500,
        registrationRequired: true,
        registrationLink: "https://example.com/register/event5",
        status: "Upcoming"
      },
      {
        id: 6,
        title: "Softball Team Tryouts",
        date: "2025-04-15",
        time: "15:30",
        location: "Campo Deportivo Sur",
        description: "Good afternoon, Búfalos. We invite you to join the softball team for those interested.",
        longDescription: "The Instituto Tecnológico de Mexicali softball team is looking for new talent! If you're interested in joining our championship team, come to the tryouts at the South Sports Field. All skill levels are welcome, and our experienced coaches will evaluate your abilities in batting, fielding, throwing, and base running. This is a great opportunity to represent our institution in regional and national competitions while developing your athletic skills.",
        image: eventImage6,
        category: "Sports",
        organizer: "Sports Department",
        capacity: 50,
        registrationRequired: true,
        registrationLink: "https://example.com/register/event6",
        status: "Upcoming"
      },
      {
        id: 7,
        title: "Logical Dialectics Conference",
        date: "2025-04-15",
        time: "10:00",
        location: "Auditorio Magna",
        description: "We extend an invitation to the 'Logical Dialectics' Conference, which will be given by the Director General of the National Technological Institute of Mexico, Ramón Jiménez López.",
        longDescription: "Don't miss this exceptional opportunity to attend the 'Logical Dialectics' Conference presented by Ramón Jiménez López, Director General of the National Technological Institute of Mexico. The conference will explore the principles of logical reasoning, critical thinking, and their applications in scientific research and technological innovation. This event is essential for students and faculty interested in the philosophical foundations of scientific thought.",
        image: eventImage7,
        category: "School",
        organizer: "Office of the Director",
        capacity: 400,
        registrationRequired: true,
        registrationLink: "https://example.com/register/event7",
        status: "Upcoming"
      },
      {
        id: 8,
        title: "Job Fair",
        date: "2025-05-13",
        time: "09:00",
        location: "Centro de Convenciones",
        description: "May 13, 2025: Entrepreneurs, the student community, alumni, teachers, and the public are invited to participate.",
        longDescription: "The annual Job Fair brings together employers from various industries looking to recruit talented students and graduates. This event provides an excellent opportunity to explore career options, submit resumes, participate in on-site interviews, and network with industry professionals. Companies will have booths where they'll share information about job openings, internships, and professional development programs. Don't forget to bring multiple copies of your resume!",
        image: eventImage8,
        category: "School",
        organizer: "Career Services Center",
        capacity: 1000,
        registrationRequired: false,
        status: "Upcoming"
      },
      {
        id: 9,
        title: "Professional Residency Talk",
        date: "2025-04-15",
        time: "12:00",
        location: "Sala de Usos Múltiples",
        description: "Elizabeth Mora delivered an engaging talk aimed at students who are expected to graduate between December 2025 and June 2026.",
        longDescription: "Professional residency is a crucial step in your academic journey, providing real-world experience in your field of study. In this informative session, Elizabeth Mora will explain the process for securing a residency position, share tips for making the most of this opportunity, and answer common questions about the experience. This talk is especially important for students planning to graduate between December 2025 and June 2026, as you'll need to complete your residency before graduation.",
        image: eventImage9,
        category: "School",
        organizer: "Academic Affairs Office",
        capacity: 150,
        registrationRequired: false,
        status: "Upcoming"
      }
    ],
    eventCategories: ["All", "Cultural", "Sports", "School"],
    loading: {
      allEvents: false,
      eventDetails: false,
      categoryEvents: false
    },
    error: {
      allEvents: null,
      eventDetails: null,
      categoryEvents: null
    },
    currentCategory: "All"
  },

  getters: {
    // Get all events
    getAllEvents: (state) => {
      return state.events;
    },
    
    // Get upcoming events (future dates)
    getUpcomingEvents: (state) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Set to beginning of today
      
      return state.events.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate >= today;
      }).sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort by date ascending
    },
    
    // Get events by category
    getEventsByCategory: (state) => (category) => {
      if (category === "All") {
        return state.events;
      }
      return state.events.filter(event => event.category === category);
    },
    
    // Get event by ID
    getEventById: (state) => (id) => {
      return state.events.find(event => event.id === id || event.id === parseInt(id));
    },
    
    // Get events categories
    getEventCategories: (state) => {
      return state.eventCategories;
    },
    
    // Get current selected category
    getCurrentCategory: (state) => {
      return state.currentCategory;
    },
    
    // Get this month's events
    getCurrentMonthEvents: (state) => {
      const today = new Date();
      const currentMonth = today.getMonth();
      const currentYear = today.getFullYear();
      
      return state.events.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate.getMonth() === currentMonth && eventDate.getFullYear() === currentYear;
      }).sort((a, b) => new Date(a.date) - new Date(b.date));
    },
    
    // Get events by date range
    getEventsByDateRange: (state) => (startDate, endDate) => {
      const start = new Date(startDate);
      const end = new Date(endDate);
      
      return state.events.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate >= start && eventDate <= end;
      }).sort((a, b) => new Date(a.date) - new Date(b.date));
    }
  },

  mutations: {
    SET_EVENTS(state, events) {
      state.events = events;
    },
    
    SET_CURRENT_CATEGORY(state, category) {
      state.currentCategory = category;
    },
    
    ADD_EVENT(state, event) {
      state.events.push(event);
    },
    
    UPDATE_EVENT(state, updatedEvent) {
      const index = state.events.findIndex(event => event.id === updatedEvent.id);
      if (index !== -1) {
        state.events.splice(index, 1, updatedEvent);
      }
    },
    
    DELETE_EVENT(state, eventId) {
      state.events = state.events.filter(event => event.id !== eventId);
    },
    
    SET_LOADING(state, { type, value }) {
      state.loading[type] = value;
    },
    
    SET_ERROR(state, { type, value }) {
      state.error[type] = value;
    }
  },

  actions: {
    // Fetch all events
    fetchEvents({ commit, state }) {
      commit('SET_LOADING', { type: 'allEvents', value: true });
      commit('SET_ERROR', { type: 'allEvents', value: null });
      
      // Simulate API call
      return new Promise(resolve => {
        setTimeout(() => {
          // In a real app, this would be an API call
          commit('SET_LOADING', { type: 'allEvents', value: false });
          resolve(state.events);
        }, 500);
      });
    },
    
    // Fetch event by ID
    fetchEventById({ commit, getters }, eventId) {
      commit('SET_LOADING', { type: 'eventDetails', value: true });
      commit('SET_ERROR', { type: 'eventDetails', value: null });
      
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const event = getters.getEventById(eventId);
          
          if (event) {
            commit('SET_LOADING', { type: 'eventDetails', value: false });
            resolve(event);
          } else {
            commit('SET_ERROR', { type: 'eventDetails', value: 'Event not found' });
            commit('SET_LOADING', { type: 'eventDetails', value: false });
            reject(new Error('Event not found'));
          }
        }, 500);
      });
    },
    
    // Fetch events by category
    fetchEventsByCategory({ commit, getters }, category) {
      commit('SET_LOADING', { type: 'categoryEvents', value: true });
      commit('SET_ERROR', { type: 'categoryEvents', value: null });
      commit('SET_CURRENT_CATEGORY', category);
      
      return new Promise(resolve => {
        setTimeout(() => {
          const events = getters.getEventsByCategory(category);
          commit('SET_LOADING', { type: 'categoryEvents', value: false });
          resolve(events);
        }, 500);
      });
    },
    
    // Add new event
    addEvent({ commit }, eventData) {
      commit('SET_LOADING', { type: 'allEvents', value: true });
      commit('SET_ERROR', { type: 'allEvents', value: null });
      
      return new Promise(resolve => {
        setTimeout(() => {
          // Generate a new ID (in a real app, the backend would do this)
          const newEvent = {
            id: Date.now(), // Use timestamp as a simple ID
            ...eventData,
            status: 'Upcoming'
          };
          
          commit('ADD_EVENT', newEvent);
          commit('SET_LOADING', { type: 'allEvents', value: false });
          resolve(newEvent);
        }, 500);
      });
    },
    
    // Update existing event
    updateEvent({ commit }, eventData) {
      commit('SET_LOADING', { type: 'eventDetails', value: true });
      commit('SET_ERROR', { type: 'eventDetails', value: null });
      
      return new Promise(resolve => {
        setTimeout(() => {
          commit('UPDATE_EVENT', eventData);
          commit('SET_LOADING', { type: 'eventDetails', value: false });
          resolve(eventData);
        }, 500);
      });
    },
    
    // Delete event
    deleteEvent({ commit }, eventId) {
      commit('SET_LOADING', { type: 'allEvents', value: true });
      commit('SET_ERROR', { type: 'allEvents', value: null });
      
      return new Promise(resolve => {
        setTimeout(() => {
          commit('DELETE_EVENT', eventId);
          commit('SET_LOADING', { type: 'allEvents', value: false });
          resolve(true);
        }, 500);
      });
    }
  }
};