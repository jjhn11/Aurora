import nodemailer from 'nodemailer';
import { google } from 'googleapis';

/**
 * Obtiene un token de acceso válido para un usuario
 * @param {Object} user - Usuario con tokens en sesión
 * @returns {Promise<string>} Token de acceso válido
 */
async function getValidAccessToken(user) {
  // Si no hay usuario o no tiene los tokens necesarios
  if (!user || !user._accessToken || !user._refreshToken) {
    throw new Error('Usuario sin información de tokens');
  }
  
  // Si hay un token activo que no ha expirado
  if (user._tokenExpiry && new Date() < new Date(user._tokenExpiry)) {
    return user._accessToken;
  }
  
  // Si hay que renovar el token
  try {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_CALLBACK_URL
    );
    
    // Configurar refresh token
    oauth2Client.setCredentials({
      refresh_token: user._refreshToken
    });
    
    // Obtener nuevo token
    const { tokens } = await oauth2Client.refreshAccessToken();
    
    // Actualizar en el objeto del usuario (sesión)
    user._accessToken = tokens.access_token;
    user._tokenExpiry = new Date(Date.now() + (tokens.expires_in * 1000));
    
    return tokens.access_token;
  } catch (error) {
    console.error('Error al renovar token de acceso:', error);
    throw new Error('No se pudo renovar el token de acceso');
  }
}

/**
 * Crea un transportador de Nodemailer con autenticación OAuth2
 * @param {Object} user - Usuario con tokens de sesión... Usualmente, req.user
 * @returns {Promise<nodemailer.Transporter>} Transportador configurado
 */
async function createTransporter(user) {
  try {
    // Obtener token de acceso válido
    const accessToken = await getValidAccessToken(user);
    
    // Crear transportador
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: user.emails[0].value,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: user._refreshToken,
        accessToken: accessToken
      }
    });
    
    // Verificar configuración
    await transporter.verify();
    
    return transporter;
  } catch (error) {
    console.error('Error creando transportador de correo:', error);
    throw error;
  }
}

/**
 * Envía un correo electrónico usando la cuenta del usuario autenticado
 * @param {Object} user - Usuario autenticado con tokens... Usualmente,
 * @param {Object} options - Opciones del correo (to, subject, text, html)
 * @returns {Promise<Object>} Resultado del envío
 */
async function sendMail(user, { to, subject, text, html, attachments }) {
  try {
    const transporter = await createTransporter(user);
    
    const mailOptions = {
      from: `${user.displayName} <${user.emails[0].value}>`,
      to,
      subject,
      text,
      html,
      attachments
    };
    
    const info = await transporter.sendMail(mailOptions);
    console.log('Correo enviado: %s', info.messageId);
    return info;
  } catch (error) {
    console.error('Error al enviar correo:', error);
    throw error;
  }
}

/**
 * Envía un correo de prueba para verificar la configuración
 * @param {Object} user - Usuario autenticado
 * @param {string} testEmail - Correo electrónico de destino para la prueba
 * @returns {Promise<Object>} Resultado del envío
 */
async function sendTestEmail(user, testEmail) {
  return sendMail(user, {
    to: testEmail,
    subject: 'Prueba de configuración de correo - Aurora',
    text: '¡La configuración de correo funciona correctamente!',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 5px;">
        <h2 style="color: #4285f4;">¡La configuración de correo funciona correctamente!</h2>
        <p>Este es un correo de prueba enviado desde la aplicación Aurora.</p>
        <p>Si estás recibiendo este correo, significa que la configuración de Nodemailer con OAuth2 está funcionando correctamente.</p>
        <p style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee;">
          Enviado por: ${user.displayName} (${user.emails[0].value})
        </p>
      </div>
    `
  });
}

export default {
  sendMail,
  sendTestEmail
};