import express from 'express';
import checkAuth from '../middlewares/checkAuth.js';
import mailService from '../config/mail.js';

const router = express.Router();

router.post('/send', checkAuth, async (req, res) => {
  try {
    const { to, subject, text, html, attachments } = req.body;
    
    // Validar campos requeridos
    if (!to || !subject || !(text || html)) {
      return res.status(400).json({
        error: 'Se requieren los campos: to, subject, y (text o html)'
      });
    }
    
    const result = await mailService.sendMail(req.user, {
      to, subject, text, html, attachments
    });
    
    res.status(200).json({
      success: true,
      messageId: result.messageId
    });
  } catch (error) {
    console.error('Error al enviar correo:', error);
    res.status(500).json({
      error: 'Error al enviar correo',
      details: error.message
    });
  }
});

// Endpoint para probar la configuración
router.get('/test', checkAuth, async (req, res) => {
  try {
    const { email } = req.query;
    console.log('!! Email de prueba:', email);
    const testEmail = email || req.user.emails[0].value;
    
    const result = await mailService.sendTestEmail(req.user, testEmail);
    
    res.status(200).json({
      success: true,
      messageId: result.messageId
    });
  } catch (error) {
    console.error('Error en prueba de correo:', error);
    res.status(500).json({
      error: 'Error al probar configuración',
      details: error.message
    });
  }
});

export default router;