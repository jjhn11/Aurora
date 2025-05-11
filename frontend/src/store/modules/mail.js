import axios from 'axios';

export default {
  namespaced: true,
  
  state: {
    loading: false,
    error: null,
    success: false,
  },
  
  getters: {
    isLoading: state => state.loading,
    getError: state => state.error,
    isSuccess: state => state.success,
  },
  
  mutations: {
    SET_LOADING(state, value) {
      state.loading = value;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
    SET_SUCCESS(state, value) {
      state.success = value;
    },
    RESET_STATE(state) {
      state.loading = false;
      state.error = null;
      state.success = false;
    }
  },
  
  actions: {
    // Enviar un correo electrónico
    async sendEmail({ commit }, { subject, text, html, attachments }) {
      commit('SET_LOADING', true);
      commit('SET_ERROR', null);
      commit('SET_SUCCESS', false);
      
      try {
        // EMAIL DE QUIEN ADMINISTRA LOS PRESTAMOS (CHAV EN ESTE CASO)
        // EMAIL DE QUIEN ADMINISTRA LOS PRESTAMOS (CHAV EN ESTE CASO)
        // EMAIL DE QUIEN ADMINISTRA LOS PRESTAMOS (CHAV EN ESTE CASO)
        // EMAIL DE QUIEN ADMINISTRA LOS PRESTAMOS (CHAV EN ESTE CASO)
        const to = 'a22490388@itmexicali.edu.mx';
        
        const response = await axios.post('/mail/send', {
          to,
          subject,
          text,
          html,
          attachments
        });
        
        commit('SET_SUCCESS', true);
        commit('SET_LOADING', false);
        return response.data;
      } catch (error) {
        const errorMsg = error.response?.data?.error || 'Error al enviar correo';
        commit('SET_ERROR', errorMsg);
        commit('SET_LOADING', false);
        throw error;
      }
    },
    
    // Enviar correo de reservación de libro
    async sendBookReservation({ dispatch, rootState }, { book, pickupDate, pickupTime, message }) {
      // Obtener datos del usuario
      const userName = rootState.user?.userData?.Name_user || 
                       rootState.user?.profile?.name || 
                       'Usuario Anónimo';
      
      // Formatear fecha para mostrar
      const formattedDate = new Date(pickupDate).toLocaleDateString('es-MX');
      
      // Construir contenido del correo
      const subject = `Reservación de libro: ${book.Title}`;
      const html = `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 5px;">
          <h2 style="color: #000E32;">Solicitud de Reservación de Libro</h2>
          <p><strong>Usuario:</strong> ${userName}</p>
          <p><strong>Libro:</strong> ${book.Title}</p>
          <p><strong>Autor:</strong> ${book.authorText || book.authors?.join(', ') || 'No especificado'}</p>
          <p><strong>ISBN:</strong> ${book.ISBN || 'No disponible'}</p>
          <p><strong>Fecha de recogida:</strong> ${formattedDate}</p>
          <p><strong>Hora de recogida:</strong> ${pickupTime}</p>
          ${message ? `<p><strong>Mensaje adicional:</strong> ${message}</p>` : ''}
          <p style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee;">
            Correo enviado desde el sistema de biblioteca Aurora.
          </p>
        </div>
      `;
      
      // Versión en texto plano como respaldo
      const text = `
        Solicitud de Reservación de Libro\n
        Usuario: ${userName}\n
        Libro: ${book.Title}\n
        Autor: ${book.authorText || book.authors?.join(', ') || 'No especificado'}\n
        ISBN: ${book.ISBN || 'No disponible'}\n
        Fecha de recogida: ${formattedDate}\n
        Hora de recogida: ${pickupTime}\n
        ${message ? `Mensaje adicional: ${message}\n` : ''}
        \n
        Correo enviado desde el sistema de biblioteca Aurora.
      `;
      
      // Enviar el correo
      return dispatch('sendEmail', { subject, text, html });
    },

    // Enviar correo de reservación de cubículo
    async sendCubicleReservation({ dispatch, rootState }, { date, checkInTime, checkOutTime, peopleCount }) {
      // Obtener datos del usuario
      const userName = rootState.user?.userData?.Name_user || 
                       rootState.user?.profile?.name || 
                       'Usuario Anónimo';
      const userEmail = rootState.user?.userData?.Email ||
                        rootState.user?.profile?.email ||
                        'No disponible';
      
      // Formatear fecha para mostrar
      const formattedDate = new Date(date).toLocaleDateString('es-MX');
      
      // Construir contenido del correo
      const subject = `Reservación de Cubículo - ${formattedDate}`;
      const html = `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 5px;">
          <h2 style="color: #000E32;">Solicitud de Reservación de Cubículo</h2>
          
          <div style="margin-bottom: 20px;">
            <h3 style="color: #000E32;">Información del Usuario</h3>
            <p><strong>Nombre:</strong> ${userName}</p>
            <p><strong>Email:</strong> ${userEmail}</p>
          </div>

          <div style="margin-bottom: 20px;">
            <h3 style="color: #000E32;">Detalles de la Reserva</h3>
            <p><strong>Fecha:</strong> ${formattedDate}</p>
            <p><strong>Hora de entrada:</strong> ${checkInTime}</p>
            <p><strong>Hora de salida:</strong> ${checkOutTime}</p>
            <p><strong>Número de personas:</strong> ${peopleCount}</p>
          </div>

          <p style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee; color: #666;">
            Correo enviado desde el sistema de biblioteca Aurora.
          </p>
        </div>
      `;
      
      // Versión en texto plano como respaldo
      const text = `
        Solicitud de Reservación de Cubículo\n
        \nInformación del Usuario:
        Nombre: ${userName}
        Email: ${userEmail}
        \nDetalles de la Reserva:
        Fecha: ${formattedDate}
        Hora de entrada: ${checkInTime}
        Hora de salida: ${checkOutTime}
        Número de personas: ${peopleCount}
        \n
        Correo enviado desde el sistema de biblioteca Aurora.
      `;
      
      // Enviar el correo
      return dispatch('sendEmail', { subject, text, html });
    }
  }
};