// Importaciones para íconos culturales
import iconArtesPlasticas from '@/assets/img/community/icons/cultural/ICONO ARTES_PLÁSTICAS.png';
import iconCelebracionesInternacionales from '@/assets/img/community/icons/cultural/ICONO CELEBRACIONES_INTERNACIONALES.png';
import iconDanza from '@/assets/img/community/icons/cultural/ICONO DANZA.png';
import iconDebate from '@/assets/img/community/icons/cultural/ICONO DEBATE.png';
import iconMusica from '@/assets/img/community/icons/cultural/ICONO MÚSICA.png';
import iconPiano from '@/assets/img/community/icons/cultural/ICONO PIANO.png';
import iconOtraActividadCultural from '@/assets/img/community/icons/cultural/ICONO ICONO OTRA_ACTIVIDAD_CULTURAL.png';

// Importaciones para íconos deportivos
import iconAtletismo from '@/assets/img/community/icons/sports/ICONO ATLETISMO.png';
import iconBasquetbol from '@/assets/img/community/icons/sports/ICONO BASQUETBOL.png';
import iconBeisbol from '@/assets/img/community/icons/sports/ICONO BEISBOL.png';
import iconBox from '@/assets/img/community/icons/sports/ICONO BOX.png';
import iconFutbol from '@/assets/img/community/icons/sports/ICONO FUTBOL.png';
import iconOtroDeporte from '@/assets/img/community/icons/sports/ICONO OTRO_DEPORTE.png';
import iconPorra from '@/assets/img/community/icons/sports/ICONO PORRA.png';
import iconSoftbol from '@/assets/img/community/icons/sports/ICONO SOFTBOL.png';
import iconVolleyballPlaya from '@/assets/img/community/icons/sports/ICONO ICONO VOLLEYBALL_PLAYA.png';
import iconVolleyballSala from '@/assets/img/community/icons/sports/ICONO ICONO VOLLEYBALL_SALA.png';

// Importaciones para íconos recreativos
import iconAjedrez from '@/assets/img/community/icons/recreational/ICONO AJEDREZ.png';
import iconBandaDeGuerra from '@/assets/img/community/icons/recreational/ICONO BANDA_DE_GUERRA.png';
import iconBatallasFreestyle from '@/assets/img/community/icons/recreational/ICONO BATALLAS_DE_FREESTYLE_-_RAP.png';
import iconBazar from '@/assets/img/community/icons/recreational/ICONO BAZAR.png';
import iconConcurso from '@/assets/img/community/icons/recreational/ICONO CONCURSO.png';
import iconEscolta from '@/assets/img/community/icons/recreational/ICONO ESCOLTA.png';
import iconJuegosDeMesa from '@/assets/img/community/icons/recreational/ICONO JUEGOS_DE_MESA.png';
import iconLecturas from '@/assets/img/community/icons/recreational/ICONO LECTURAS.png';
import iconOtraActividadRecreativa from '@/assets/img/community/icons/recreational/ICONO OTRA_ACTIVIDAD_RECREATIVA.png';
import iconRallys from '@/assets/img/community/icons/recreational/ICONO RALLYS.png';
import iconTutorias from '@/assets/img/community/icons/recreational/ICONO TUTORÍAS.png';

// Importaciones para íconos de videojuegos
import iconAccion from '@/assets/img/community/icons/videogames/ICONO ACCIÓN.png';
import iconAventura from '@/assets/img/community/icons/videogames/ICONO AVENTURA.png';
import iconCarreras from '@/assets/img/community/icons/videogames/ICONO CARRERAS.png';
import iconDeportes from '@/assets/img/community/icons/videogames/ICONO DEPORTES.png';
import iconEstrategia from '@/assets/img/community/icons/videogames/ICONO ESTRATEGIA.png';
import iconMusical from '@/assets/img/community/icons/videogames/ICONO MUSICAL.png';
import iconOtroGenero from '@/assets/img/community/icons/videogames/ICONO OTRO_GENERO.png';
import iconPuzzles from '@/assets/img/community/icons/videogames/ICONO PUZZLES.png';
import iconRol from '@/assets/img/community/icons/videogames/ICONO ROL.png';
import iconSimulacion from '@/assets/img/community/icons/videogames/ICONO SIMLUACION.png';
import iconTerror from '@/assets/img/community/icons/videogames/ICONO TERROR.png';

// Objeto que mapea categorías y tipos a sus respectivos íconos
export const iconRegistry = {
  cultural: {
    ARTES_PLASTICAS: iconArtesPlasticas,
    CELEBRACIONES_INTERNACIONALES: iconCelebracionesInternacionales,
    DANZA: iconDanza,
    DEBATE: iconDebate,
    MUSICA: iconMusica,
    OTRA_ACTIVIDAD_CULTURAL: iconOtraActividadCultural,
    PIANO: iconPiano
  },
  sports: {
    ATLETISMO: iconAtletismo,
    BASQUETBOL: iconBasquetbol,
    BEISBOL: iconBeisbol,
    BOX: iconBox,
    FUTBOL: iconFutbol,
    OTRO_DEPORTE: iconOtroDeporte,
    PORRA: iconPorra,
    SOFTBOL: iconSoftbol,
    VOLLEYBALL_PLAYA: iconVolleyballPlaya,
    VOLLEYBALL_SALA: iconVolleyballSala
  },
  recreational: {
    AJEDREZ: iconAjedrez,
    BANDA_DE_GUERRA: iconBandaDeGuerra,
    BATALLAS_DE_FREESTYLE_RAP: iconBatallasFreestyle,
    BAZAR: iconBazar,
    CONCURSO: iconConcurso,
    ESCOLTA: iconEscolta,
    JUEGOS_DE_MESA: iconJuegosDeMesa,
    LECTURAS: iconLecturas,
    OTRA_ACTIVIDAD_RECREATIVA: iconOtraActividadRecreativa,
    RALLYS: iconRallys,
    TUTORÍAS: iconTutorias
  },
  videogames: {
    ACCION: iconAccion,
    AVENTURA: iconAventura,
    CARRERAS: iconCarreras,
    DEPORTES: iconDeportes,
    ESTRATEGIA: iconEstrategia,
    MUSICAL: iconMusical,
    OTRO_GENERO: iconOtroGenero,
    PUZZLES: iconPuzzles,
    ROL: iconRol,
    SIMULACION: iconSimulacion,
    TERROR: iconTerror
  }
};

// Función helper mejorada para obtener un ícono
export function getIcon(category, typeName) {
  if (!category || !typeName) {
    // Valor predeterminado si no se proporciona categoría o tipo
    return iconDanza;
  }
  
  // Normalizar el nombre del tipo
  const normalizedType = typeName
    .toUpperCase()
    .replace(/\s+/g, '_')
    .replace(/[áéíóúüÁÉÍÓÚÜ]/g, match => {
      return {
        'á': 'A', 'é': 'E', 'í': 'I', 'ó': 'O', 'ú': 'U', 'ü': 'U',
        'Á': 'A', 'É': 'E', 'Í': 'I', 'Ó': 'O', 'Ú': 'U', 'Ü': 'U'
      }[match];
    })
    .replace(/[\-()\/]/g, '')
    .replace(/_+/g, '_');
  
  // Buscar el ícono en el registro
  const icon = iconRegistry[category]?.[normalizedType];
  
  // Si no se encuentra, devolver un ícono predeterminado según la categoría
  if (!icon) {
    // Iconos predeterminados por categoría
    const defaultIcons = {
      cultural: iconDanza,
      sports: iconOtroDeporte,
      recreational: iconAjedrez,
      videogames: iconAccion
    };
    
    return defaultIcons[category] || iconDanza;
  }
  
  return icon;
}

// Función para depurar el mapeo de tipos a íconos
export function debugIconMapping(category, typeName) {
  const normalizedType = typeName
    .toUpperCase()
    .replace(/\s+/g, '_')
    .replace(/[áéíóúüÁÉÍÓÚÜ]/g, match => {
      return {
        'á': 'A', 'é': 'E', 'í': 'I', 'ó': 'O', 'ú': 'U', 'ü': 'U',
        'Á': 'A', 'É': 'E', 'Í': 'I', 'Ó': 'O', 'Ú': 'U', 'Ü': 'U'
      }[match];
    })
    .replace(/[\-()\/]/g, '')
    .replace(/_+/g, '_');
  
  console.log({
    original: typeName,
    normalized: normalizedType,
    category,
    foundIcon: !!iconRegistry[category]?.[normalizedType],
    availableKeys: Object.keys(iconRegistry[category] || {})
  });
  
  return getIcon(category, typeName);
}