import libroBigData from '@/assets/img/library/LibroBigData.png';
import libroFisicoquimica from '@/assets/img/library/LibroFisicoquimica.png';
import libroMarxismo from '@/assets/img/library/LibroMarxismo.jpg';
import libroPsicologia from '@/assets/img/library/LibroPsicologia.jpg';

//rutas de importacin de imagenes de libros
import GuiaDesarrolloProductos from '@C:/assets/img/library/CoverImage/42- Guía para el desarrollo de productos un enfoque práctico.jpg';
import controlEstadisticoCalidad from '@/assets/img/library/CoverImage/1-Control estadístico de la calidad.jpg';
import controlCalidadVaughn from '@/assets/img/library/CoverImage/2- Control de calidad.jpg';
import procesosManufactura from '@/assets/img/library/CoverImage/3- Procesos de manufactura.jpg';
import coreJava from '@/assets/img/library/CoverImage/16- Core Java 2 fundamentos.jpg';
import javascriptDummies from '@/assets/img/library/CoverImage/17- JavaScript for Dummies.jpg';
import sistemasOperativos from '@/assets/img/library/CoverImage/Sistemas operativos.jpg';
import cobolEstructurado from '@/assets/img/library/CoverImage/19- COBOL estructurado.jpeg';
import metodosAlgebra from '@/assets/img/library/CoverImage/Metodos computacionales de algebra.png';
import emprendedorExito from '@/assets/img/library/CoverImage/El emprendedor exitoso.png';
import comercioIndias from '@/assets/img/library/CoverImage/Comercio y navegacion.png';
import economiaInternacional from '@/assets/img/library/CoverImage/economia_internacional.jpg';
import introduccionContaduria from '@/assets/img/library/CoverImage/Introduccion a la contaduria.jpg';
import principiosContabilidad from '@/assets/img/library/CoverImage/principios_contabilidad.jpg';
import hannibal from '@/assets/img/library/CoverImage/hannibal.png';
import bajoMismaEstrella from '@/assets/img/library/CoverImage/Bajo la misma estrella.png';
import vueltaMundo80Dias from '@/assets/img/library/CoverImage/La vuelta en 80.png';
import dosTorres from '@/assets/img/library/CoverImage/Dos torres.jpg';
import historiaLisey from '@/assets/img/library/CoverImage/La historia de lisey.jpg';
import calculoDiferencial from '@/assets/img/library/CoverImage/24- Calculo diferencial e integral.jpg';
import circuitosElectronicos from '@/assets/img/library/CoverImage/25- Circuitos electrónicos Discretos e integrados.jpg';
import cuatroHerramientasSoftware from '@/assets/img/library/CoverImage/32- Cuatro herramientas de software-plus.jpg';
import microsoftAccess97 from '@/assets/img/library/CoverImage/34- Microsoft Access 97.jpg';
import matematicasDiscretas from '@/assets/img/library/CoverImage/21- Matematicas discretas.jpg';
import comunicacionRelaciones from '@/assets/img/library/CoverImage/37- Comunicación y relaciones humanas.jpg';
import identificacionCompuestos from '@/assets/img/library/CoverImage/11- Identificación de compuestos orgánicos por métodos espectroscópicos.jpg';
import higieneSeguridad from '@/assets/img/library/CoverImage/45- Higiene y seguridad industrial.jpg';
import origenEmpresas from '@/assets/img/library/CoverImage/Origen y evolucion de nuevas empresas.jpg';
import psicologiaSocial from '@/assets/img/library/CoverImage/36- Psicología social.jpg';
import sistemasBancosDatos from '@/assets/img/library/CoverImage/35- Sistemas de administración de bancos de datos.jpg';
import sunTzuMarketing from '@/assets/img/library/43- Sun Tzu Estrategias de marketing.jpg';
import termodinamicaAbbott from '@/assets/img/library/CoverImage/14- Termodinámica.jpeg';
import cppOop from '@/assets/img/library/CoverImage/28- C++ and the OOP Paradigm.jpg';
import pooCpp from '@/assets/img/library/CoverImage/27- Programación orientada a objetos conceptos, modelado, diseño y codificación en C mas mas.png';
import javaNow from '@/assets/img/library/CoverImage/30- Java Now.jpg';
import contabilidadAvanzada from '@/assets/img/library/Contabilidad avanzada.webp';




export default {
    namespaced: true,
    state: {
      popularBooks: [
        {
          id: "9788415832102",
          ISBN: "9788415832102",
          Title: "Big Data: La Revolución de los Datos Masivos",
          coverImage: libroBigData,
          category: "Computación",
          author: "Viktor Mayer-Schönberger"
        },
        {
          id: "9788415832102",
          ISBN: "9788415832102",
          Title: "Big Data: La Revolución de los Datos Masivos",
          coverImage: libroBigData,
          category: "Computación",
          author: "Viktor Mayer-Schönberger"
        },
        {
          id: "9788420674711",
          ISBN: "9788420674711",
          Title: "Breve Historia del Tiempo",
          coverImage: libroFisicoquimica,
          category: "Física",
          author: "Stephen Hawking"
        },
        {
          id: "9788499924212",
          ISBN: "9788499924212",
          Title: "Sapiens: De Animales a Dioses",
          coverImage: libroMarxismo,
          category: "Historia",
          author: "Yuval Noah Harari"
        },
        {
          id: "9788493464257",
          ISBN: "9788493464257",
          Title: "Cómo Ganar Amigos e Influir sobre las Personas",
          coverImage: libroPsicologia,
          category: "Ciencias Sociales",
          author: "Dale Carnegie"
        },
        {
          id: "9788483068915",
          ISBN: "9788483068915",
          Title: "Pensar Rápido, Pensar Despacio",
          coverImage: libroBigData,
          category: "Psicología",
          author: "Daniel Kahneman"
        },
        {
            id: "9788441532106",
            ISBN: "9788441532106",
            Title: "Clean Code: Manual de Desarrollo Ágil de Software",
            coverImage: libroFisicoquimica,
            category: "Computación",
            author: "Robert C. Martin"
        },
        {
            id: "9788499924212",
            ISBN: "9788499924212",
            Title: "Sapiens: De Animales a Dioses",
            coverImage: libroMarxismo,
            category: "Historia",
            author: "Yuval Noah Harari"
        },
        {
            id: "9788420674711",
            ISBN: "9788420674711",
            Title: "Breve Historia del Tiempo",
            coverImage: libroFisicoquimica,
            category: "Física",
            author: "Stephen Hawking"
        },
        {
            id: "9788415832102",
            ISBN: "9788415832102",
            Title: "Big Data: La Revolución de los Datos Masivos",
            coverImage: libroBigData,
            category: "Computación",
            author: "Viktor Mayer-Schönberger"
        },
      ],
      newBooks: [
        {
          id: "9788441532106",
          ISBN: "9788441532106",
          Title: "Clean Code: Manual de Desarrollo Ágil de Software",
          coverImage: libroBigData,
          category: "Computación",
          author: "Robert C. Martin"
        },
        {
          id: "9788434501621",
          ISBN: "9788434501621",
          Title: "Cosmos",
          coverImage: libroBigData,
          category: "Ciencias",
          author: "Carl Sagan"
        },
        {
          id: "9788499420047",
          ISBN: "9788499420047",
          Title: "Steve Jobs: La Biografía",
          coverImage: libroBigData,
          category: "Historia",
          author: "Walter Isaacson"
        },
        {
          id: "9786071128379",
          ISBN: "9786071128379",
          Title: "Outliers: Los Fuera de Serie",
          coverImage: libroBigData,
          category: "Ciencias Sociales",
          author: "Malcolm Gladwell"
        },
        {
          id: "9789584102881",
          ISBN: "9789584102881",
          Title: "Fundamentos de Programación",
          coverImage: libroBigData,
          category: "Computación",
          author: "Luis Joyanes Aguilar"
        },
        {
          id: "9788441532106",
          ISBN: "9788441532106",
          Title: "Clean Code: Manual de Desarrollo Ágil de Software",
          coverImage: libroBigData,
          category: "Computación",
          author: "Robert C. Martin"
        },
        {
          id: "9788434501621",
          ISBN: "9788434501621",
          Title: "Cosmos",
          coverImage: libroBigData,
          category: "Ciencias",
          author: "Carl Sagan"
        },
        {
          id: "9788499420047",
          ISBN: "9788499420047",
          Title: "Steve Jobs: La Biografía",
          coverImage: libroBigData,
          category: "Historia",
          author: "Walter Isaacson"
        },
        {
          id: "9786071128379",
          ISBN: "9786071128379",
          Title: "Outliers: Los Fuera de Serie",
          coverImage: libroBigData,
          category: "Ciencias Sociales",
          author: "Malcolm Gladwell"
        },
        {
          id: "9789584102881",
          ISBN: "9789584102881",
          Title: "Fundamentos de Programación",
          coverImage: libroBigData,
          category: "Computación",
          author: "Luis Joyanes Aguilar"
        },
        {
          id: "9788441532106",
          ISBN: "9788441532106",
          Title: "Clean Code: Manual de Desarrollo Ágil de Software",
          coverImage: libroBigData,
          category: "Computación",
          author: "Robert C. Martin"
        },
        {
          id: "9788434501621",
          ISBN: "9788434501621",
          Title: "Cosmos",
          coverImage: libroBigData,
          category: "Ciencias",
          author: "Carl Sagan"
        },
        {
          id: "9788499420047",
          ISBN: "9788499420047",
          Title: "Steve Jobs: La Biografía",
          coverImage: libroBigData,
          category: "Historia",
          author: "Walter Isaacson"
        },
        {
          id: "9786071128379",
          ISBN: "9786071128379",
          Title: "Outliers: Los Fuera de Serie",
          coverImage: libroBigData,
          category: "Ciencias Sociales",
          author: "Malcolm Gladwell"
        },
        {
          id: "9789584102881",
          ISBN: "9789584102881",
          Title: "Fundamentos de Programación",
          coverImage: libroBigData,
          category: "Computación",
          author: "Luis Joyanes Aguilar"
        }
      ],
      popularBooksMonth: [
        {
          id: "9788441532106",
          ISBN: "9788441532106",
          Title: "Clean: Manual de Desarrollo Ágil de Software",
          coverImage: libroBigData,
          category: "Computación",
          author: "Robert C. Martin"
        },
        {
          id: "9788434501621",
          ISBN: "9788434501621",
          Title: "Cosmos",
          coverImage: libroBigData,
          category: "Ciencias",
          author: "Carl Sagan"
        },
        {
          id: "9788499420047",
          ISBN: "9788499420047",
          Title: "Steve Jobs: La Biografía",
          coverImage: libroBigData,
          category: "Historia",
          author: "Walter Isaacson"
        },
        {
          id: "9786071128379",
          ISBN: "9786071128379",
          Title: "Outliers: Los Fuera de Serie",
          coverImage: libroBigData,
          category: "Ciencias Sociales",
          author: "Malcolm Gladwell"
        },
        {
          id: "9789584102881",
          ISBN: "9789584102881",
          Title: "Fundamentos de Programación",
          coverImage: libroBigData,
          category: "Computación",
          author: "Luis Joyanes Aguilar"
        },
        {
          id: "9788441532106",
          ISBN: "9788441532106",
          Title: "Clean Code: Manual de Desarrollo Ágil de Software",
          coverImage: libroBigData,
          category: "Computación",
          author: "Robert C. Martin"
        },
        {
          id: "9788434501621",
          ISBN: "9788434501621",
          Title: "Cosmos",
          coverImage: libroBigData,
          category: "Ciencias",
          author: "Carl Sagan"
        },
        {
          id: "9788499420047",
          ISBN: "9788499420047",
          Title: "Steve Jobs: La Biografía",
          coverImage: libroBigData,
          category: "Historia",
          author: "Walter Isaacson"
        },
        {
          id: "9786071128379",
          ISBN: "9786071128379",
          Title: "Outliers: Los Fuera de Serie",
          coverImage: libroBigData,
          category: "Ciencias Sociales",
          author: "Malcolm Gladwell"
        },
        {
          id: "9789584102881",
          ISBN: "9789584102881",
          Title: "Fundamentos de Programación",
          coverImage: libroBigData,
          category: "Computación",
          author: "Luis Joyanes Aguilar"
        },
        {
          id: "9788441532106",
          ISBN: "9788441532106",
          Title: "Clean Code: Manual de Desarrollo Ágil de Software",
          coverImage: libroBigData,
          category: "Computación",
          author: "Robert C. Martin"
        },
        {
          id: "9788434501621",
          ISBN: "9788434501621",
          Title: "Cosmos",
          coverImage: libroBigData,
          category: "Ciencias",
          author: "Carl Sagan"
        },
        {
          id: "9788499420047",
          ISBN: "9788499420047",
          Title: "Steve Jobs: La Biografía",
          coverImage: libroBigData,
          category: "Historia",
          author: "Walter Isaacson"
        },
        {
          id: "9786071128379",
          ISBN: "9786071128379",
          Title: "Outliers: Los Fuera de Serie",
          coverImage: libroBigData,
          category: "Ciencias Sociales",
          author: "Malcolm Gladwell"
        },
        {
          id: "9789584102881",
          ISBN: "9789584102881",
          Title: "Fundamentos de Programación",
          coverImage: libroBigData,
          category: "Computación",
          author: "Luis Joyanes Aguilar"
        }
      ],
      novels: [
        {
          id: "9788441532106",
          ISBN: "9788441532106",
          Title: "Clean: Manual de Desarrollo Ágil de Software",
          coverImage: libroBigData,
          category: "Computación",
          author: "Robert C. Martin"
        },
        {
          id: "9788434501621",
          ISBN: "9788434501621",
          Title: "Cosmos",
          coverImage: libroBigData,
          category: "Ciencias",
          author: "Carl Sagan"
        },
        {
          id: "9788499420047",
          ISBN: "9788499420047",
          Title: "Steve Jobs: La Biografía",
          coverImage: libroBigData,
          category: "Historia",
          author: "Walter Isaacson"
        },
        {
          id: "9786071128379",
          ISBN: "9786071128379",
          Title: "Outliers: Los Fuera de Serie",
          coverImage: libroBigData,
          category: "Ciencias Sociales",
          author: "Malcolm Gladwell"
        },
        {
          id: "9789584102881",
          ISBN: "9789584102881",
          Title: "Fundamentos de Programación",
          coverImage: libroBigData,
          category: "Computación",
          author: "Luis Joyanes Aguilar"
        },
        {
          id: "9788441532106",
          ISBN: "9788441532106",
          Title: "Clean Code: Manual de Desarrollo Ágil de Software",
          coverImage: libroBigData,
          category: "Computación",
          author: "Robert C. Martin"
        },
        {
          id: "9788434501621",
          ISBN: "9788434501621",
          Title: "Cosmos",
          coverImage: libroBigData,
          category: "Ciencias",
          author: "Carl Sagan"
        },
        {
          id: "9788499420047",
          ISBN: "9788499420047",
          Title: "Steve Jobs: La Biografía",
          coverImage: libroBigData,
          category: "Historia",
          author: "Walter Isaacson"
        },
        {
          id: "9786071128379",
          ISBN: "9786071128379",
          Title: "Outliers: Los Fuera de Serie",
          coverImage: libroBigData,
          category: "Ciencias Sociales",
          author: "Malcolm Gladwell"
        },
        {
          id: "9789584102881",
          ISBN: "9789584102881",
          Title: "Fundamentos de Programación",
          coverImage: libroBigData,
          category: "Computación",
          author: "Luis Joyanes Aguilar"
        },
        {
          id: "9788441532106",
          ISBN: "9788441532106",
          Title: "Clean Code: Manual de Desarrollo Ágil de Software",
          coverImage: libroBigData,
          category: "Computación",
          author: "Robert C. Martin"
        },
        {
          id: "9788434501621",
          ISBN: "9788434501621",
          Title: "Cosmos",
          coverImage: libroBigData,
          category: "Ciencias",
          author: "Carl Sagan"
        },
        {
          id: "9788499420047",
          ISBN: "9788499420047",
          Title: "Steve Jobs: La Biografía",
          coverImage: libroBigData,
          category: "Historia",
          author: "Walter Isaacson"
        },
        {
          id: "9786071128379",
          ISBN: "9786071128379",
          Title: "Outliers: Los Fuera de Serie",
          coverImage: libroBigData,
          category: "Ciencias Sociales",
          author: "Malcolm Gladwell"
        },
        {
          id: "9789584102881",
          ISBN: "9789584102881",
          Title: "Fundamentos de Programación",
          coverImage: libroBigData,
          category: "Computación",
          author: "Luis Joyanes Aguilar"
        }
      ],
      // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      industrialBooks: [
        {
          id: "9788436273298",
          ISBN: "9788436273298",
          Title: "Gestión de la Producción Industrial",
          coverImage: libroBigData,
          category: "Ingeniería Industrial",
          author: "Manuel García Sánchez"
        }
      ],
      // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      systemsBooks: [
        {
          id: "9788441541332",
          ISBN: "9788441541332",
          Title: "Sistemas Distribuidos: Conceptos y Diseño",
          coverImage: libroBigData,
          category: "Sistemas",
          author: "George Coulouris"
        }
      ],
      // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      administrativeBooks: [
        {
          id: "9788416583569",
          ISBN: "9788416583569",
          Title: "Administración de Empresas: Un Enfoque Moderno",
          coverImage: libroBigData,
          category: "Administración",
          author: "María Pérez Gómez"
        }
      ],
      // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      bookLovers: [
        {
          id: "9788415832102",
          ISBN: "9788415832102",
          Title: "Big Data: La Revolución de los Datos Masivos",
          coverImage: libroBigData,
          category: "Computación",
          author: "Viktor Mayer-Schönberger"
        }
      ],
      // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      bookDetails: {
        "9788415832102": {
          id: "9788415832102",
          ISBN: "9788415832102",
          Title: "Big Data: La Revolución de los Datos Masivos",
          coverImage: libroBigData,
          author: "Viktor Mayer-Schönberger",
          authors: ["Viktor Mayer-Schönberger", "Kenneth Cukier"],
          publisher: "Turner",
          year: "2013",
          pages: "278",
          binding: "Tapa Blanda",
          edition: "1",
          categories: ["Computación"],
          format: "Libro Físico",
          synopsis: "Qué color de pintura es más probable que le diga si un vehículo de segunda mano está en buen estado. Cómo puede identificar un ayuntamiento cuáles son los baches más peligrosos de una ciudad. La clave para responder a todas estas preguntas son los datos masivos, los big data. Este término hace referencia a la ingente cantidad de información que proviene de la red, una información que hoy estamos en condiciones de procesar, analizar, tabular y utilizar, para bien o para mal."
        },
        
        "9788420674711": {
          id: "9788420674711",
          ISBN: "9788420674711",
          Title: "Breve Historia del Tiempo",
          coverImage: libroFisicoquimica,
          author: "Stephen Hawking",
          authors: ["Stephen Hawking"],
          publisher: "Crítica",
          year: "2017",
          pages: "256",
          binding: "Tapa Dura",
          edition: "2",
          categories: ["Física", "Ciencias"],
          format: "Libro Físico",
          synopsis: "En este libro, Hawking nos conduce hasta las fronteras mismas de la física teórica para explicarnos en términos sencillos los principios que gobiernan el universo. Este es un paseo fascinante por los misterios del cosmos, una extraordinaria aventura intelectual al alcance de todos."
        },
        
        "9788499924212": {
          id: "9788499924212",
          ISBN: "9788499924212",
          Title: "Sapiens: De Animales a Dioses",
          coverImage: libroMarxismo,
          author: "Yuval Noah Harari",
          authors: ["Yuval Noah Harari"],
          publisher: "Debate",
          year: "2014",
          pages: "496",
          binding: "Tapa Blanda",
          edition: "1",
          categories: ["Historia", "Ciencias Sociales", "Antropología"],
          format: "Libro Físico",
          synopsis: "Hace 100.000 años al menos seis especies de humanos habitaban la Tierra. Hoy solo queda una, la nuestra: Homo sapiens. ¿Cómo logró nuestra especie imponerse en la lucha por la existencia? ¿Por qué nuestros ancestros recolectores se unieron para crear ciudades y reinos? ¿Cómo llegamos a creer en dioses, en naciones o en los derechos humanos; a confiar en el dinero, en los libros o en las leyes?"
        },
        
        "9788493464257": {
          id: "9788493464257",
          ISBN: "9788493464257",
          Title: "Cómo Ganar Amigos e Influir sobre las Personas",
          coverImage: libroPsicologia,
          author: "Dale Carnegie",
          authors: ["Dale Carnegie"],
          publisher: "Elipse",
          year: "2018",
          pages: "337",
          binding: "Tapa Blanda",
          edition: "4",
          categories: ["Ciencias Sociales", "Psicología"],
          format: "Libro Físico",
          synopsis: "Dale Carnegie nos enseña con su característico tono ameno y práctico cómo relacionarse mejor con otras personas tanto en el ámbito personal como en el profesional. Este clásico del desarrollo personal proporciona consejos que nunca pasan de moda sobre el arte de lograr que los demás se sientan importantes."
        },
        
        "9788483068915": {
          id: "9788483068915",
          ISBN: "9788483068915",
          Title: "Pensar Rápido, Pensar Despacio",
          coverImage: libroBigData,
          author: "Daniel Kahneman",
          authors: ["Daniel Kahneman"],
          publisher: "Debate",
          year: "2012",
          pages: "670",
          binding: "Tapa Dura",
          edition: "3",
          categories: ["Psicología", "Ciencias Sociales", "Economía"],
          format: "Libro Físico",
          synopsis: "Daniel Kahneman, uno de los pensadores más importantes del mundo, recibió el premio Nobel de Economía por su trabajo pionero en psicología sobre el modelo racional de la toma de decisiones. En este libro, el autor expone las dos formas de pensar: el pensamiento rápido, intuitivo y emocional y el pensamiento lento, deliberativo y lógico."
        },
        
        "9788441532106": {
          id: "9788441532106",
          ISBN: "9788441532106",
          Title: "Clean Code: Manual de Desarrollo Ágil de Software",
          coverImage: libroBigData,
          author: "Robert C. Martin",
          authors: ["Robert C. Martin"],
          publisher: "Anaya Multimedia",
          year: "2012",
          pages: "464",
          binding: "Tapa Blanda",
          edition: "1",
          categories: ["Computación", "Tecnología", "Programación"],
          format: "Libro Físico",
          synopsis: "Cada año, se invierten innumerables horas y se pierden importantes recursos debido a código mal escrito. Este libro se ha convertido en un clásico para los programadores profesionales que quieren escribir código limpio y eficiente. Martin nos muestra cómo escribir código que podamos leer y entender fácilmente."
        },
        
        "9788434501621": {
          id: "9788434501621",
          ISBN: "9788434501621",
          Title: "Cosmos",
          coverImage: libroBigData,
          author: "Carl Sagan",
          authors: ["Carl Sagan"],
          publisher: "Planeta",
          year: "2004",
          pages: "408",
          binding: "Tapa Dura",
          edition: "2",
          categories: ["Ciencias", "Astronomía", "Divulgación científica"],
          format: "Libro Físico",
          synopsis: "Carl Sagan trata de explicar la ciencia del universo a los profanos. Es un libro para divulgar la astronomía, la astrofísica y la cosmología a todo el mundo, con un lenguaje claro y comprensible para aquellos que no tienen una formación científica, pero que están interesados en comprender el mundo que nos rodea."
        },
        
        "9788499420047": {
          id: "9788499420047",
          ISBN: "9788499420047",
          Title: "Steve Jobs: La Biografía",
          coverImage: libroBigData,
          author: "Walter Isaacson",
          authors: ["Walter Isaacson"],
          publisher: "Debate",
          year: "2011",
          pages: "740",
          binding: "Tapa Dura",
          edition: "1",
          categories: ["Historia", "Tecnología", "Biografías"],
          format: "Libro Físico",
          synopsis: "La biografía definitiva de Steve Jobs, el fundador de Apple, escrita a partir de cuarenta entrevistas mantenidas con él a lo largo de dos años, y de más de cien entrevistas con familiares, amigos, adversarios y colegas. La muerte de Steve Jobs conmocionó al mundo. Tras entrevistarlo en más de cuarenta ocasiones en los últimos dos años, y a un centenar de personas de su entorno, familiares, amigos, adversarios y colegas, Walter Isaacson nos presenta la única biografía escrita con la colaboración de Jobs."
        },
        
        "9786071128379": {
          id: "9786071128379",
          ISBN: "9786071128379",
          Title: "Outliers: Los Fuera de Serie",
          coverImage: libroBigData,
          author: "Malcolm Gladwell",
          authors: ["Malcolm Gladwell"],
          publisher: "Taurus",
          year: "2013",
          pages: "328",
          binding: "Tapa Blanda",
          edition: "2",
          categories: ["Ciencias Sociales", "Psicología", "Sociología"],
          format: "Libro Físico",
          synopsis: "Malcolm Gladwell explora por qué algunas personas tienen éxito y otras no. ¿Es el talento natural? ¿La inteligencia? No, según Gladwell. Para entender a los fuera de serie, debemos mirar el contexto en el que se crían, la cultura de la que provienen, y las experiencias particulares que contribuyen a su desarrollo."
        },
        
        "9789584102881": {
          id: "9789584102881",
          ISBN: "9789584102881",
          Title: "Fundamentos de Programación",
          coverImage: libroBigData,
          author: "Luis Joyanes Aguilar",
          authors: ["Luis Joyanes Aguilar"],
          publisher: "McGraw-Hill",
          year: "2008",
          pages: "780",
          binding: "Tapa Blanda",
          edition: "4",
          categories: ["Computación", "Programación", "Tecnología"],
          format: "Libro Físico",
          synopsis: "Este libro constituye una guía completa para el estudio de los algoritmos, estructuras de datos y metodologías de la programación orientada a objetos. En esta cuarta edición, revisada y actualizada, se han incorporado las últimas versiones y avances de los lenguajes de programación Java, C++ y C#, se explica la metodología de programación orientada a objetos y se presenta una amplia colección de algoritmos y estructuras de datos."
        },

        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        // A PARTIR DE AQUÍ AÑADIR MÁS LIBROS CON SU INFORMACIÓN RESPECTIVA
        //PRIMEROS CUATRO LIBROS INDUSTRIAL 
        "9686863836": {
          id: "9686863836",
          ISBN: "9686863836",
          Title: "Guía para el desarrollo de productos: un enfoque práctico",
          coverImage: GuiaDesarrolloProductos,
          author: "Alejandro Eugenio Lerma Kirchner",
          authors: ["Alejandro Eugenio Lerma Kirchner"],
          publisher: "Ediciones Paraninfo",
          year: "2005",
          pages: "208",
          binding: "Tapa Blanda",
          edition: "3",
          categories: ["Ingeniería industrial", "Desarrollo de productos"],
          format: "Libro Físico",
          synopsis: "Ofrece metodologías prácticas para el desarrollo de productos y servicios, con enfoque en creatividad, estrategias y organización para mercados globales."
        },
        "9701506626": {
          id: "9701506626",
          ISBN: "970-15-0662-6",
          Title: controlEstadisticoCalidad,
          coverImage: "control_estadistico_calidad.jpg",
          author: "Vicente Carot Alonso",
          authors: ["Vicente Carot Alonso"],
          publisher: "Alfaomega",
          year: "2001",
          pages: "614",
          binding: "Tapa Dura",
          edition: "1",
          categories: ["Ingeniería", "Control de calidad", "Estadística aplicada"],
          format: "Libro Físico",
          synopsis: "Aborda fundamentos del control estadístico de calidad con casos prácticos para gestión industrial y de servicios."
        },
        "9681813154": {
          id: "9681813154",
          ISBN: "9681813154",
          Title: "Control de calidadd",
          coverImage: controlCalidadVaughn,
          author: "Richard C. Vaughn",
          authors: ["Richard C. Vaughn"],
          publisher: "Limusa",
          year: "2001",
          pages: "293",
          binding: "Tapa Blanda",
          edition: "1",
          categories: ["Ingeniería", "Gestión de calidad"],
          format: "Libro Físico",
          synopsis: "Principios y técnicas para implementar sistemas de calidad en procesos industriales, con enfoque teórico-práctico."
        },
        "9701061284": {
          id: "9701061284",
          ISBN: "9701061284",
          Title: "Procesos de manufactura",
          coverImage: procesosManufactura,
          author: "H.S. Bawa",
          authors: ["H.S. Bawa"],
          publisher: "McGraw-Hill",
          year: "2007",
          pages: "597",
          binding: "Tapa Dura",
          edition: "1",
          categories: ["Ingeniería", "Manufactura"],
          format: "Libro Físico",
          synopsis: "Técnicas y principios de manufactura con aplicaciones prácticas en la industria."
        },

        //CINCO LIBROS DE SISTEMAS CARRUCEL 
        "8483223104": {
          id: "8483223104",
          ISBN: "8483223104",
          Title: "Core Java 2: fundamentos",
          coverImage: coreJava,
          author: "Cay S. Horstmann, Gary Cornell",
          authors: ["Cay S. Horstmann", "Gary Cornell"],
          publisher: "Pearson",
          year: "2006",
          pages: "1060",
          binding: "Tapa Blanda",
          edition: "7",
          categories: ["Programación", "Java"],
          format: "Libro Físico",
          synopsis: "Guía detallada de programación en Java, desde sintaxis hasta estructuras de datos y POO."
        },
        "764576593": {
          id: "764576593",
          ISBN: "764576593",
          Title: "JavaScript for Dummies",
          coverImage: javascriptDummies,
          author: "Emily Vander Veer",
          authors: ["Emily Vander Veer"],
          publisher: "Wiley",
          year: "2005",
          pages: "358",
          binding: "Tapa Blanda",
          edition: "4",
          categories: ["Programación", "JavaScript"],
          format: "Libro Físico",
          synopsis: "Introducción práctica a JavaScript con ejemplos para desarrollo web."
        },
        "8478290672": {
          id: "8478290672",
          ISBN: "8478290672",
          Title: "Sistemas operativos",
          coverImage: sistemasOperativos,
          author: "Gary Nutt",
          authors: ["Gary Nutt"],
          publisher: "Pearson",
          year: "2004",
          pages: "832",
          binding: "Tapa Dura",
          edition: "3",
          categories: ["Informática", "Sistemas operativos"],
          format: "Libro Físico",
          synopsis: "Principios de diseño y gestión de sistemas operativos, incluyendo seguridad y procesos."
        },
        "968880004X": {
          id: "968880004X",
          ISBN: "968880004X",
          Title: "COBOL estructurado",
          coverImage: cobolEstructurado,
          author: "Robert T. Grauer",
          authors: ["Robert T. Grauer"],
          publisher: "Prentice-Hall",
          year: "1983",
          pages: "397",
          binding: "Tapa Blanda",
          edition: "1",
          categories: ["Programación", "COBOL"],
          format: "Libro Físico",
          synopsis: "Guía para programación estructurada en COBOL con ejemplos prácticos."
        },

              "8437604947": {
          id: "8437604947",
          ISBN: "8437604947",
          Title: "Métodos Computacionales en Álgebra para Informáticos: Matemática Discreta y Lógica",
          coverImage: metodosAlgebra,
          author: "Manuel Alcázar López",
          authors: ["Manuel Alcázar López"],
          publisher: "Ediciones Paraninfo",
          year: "2010",
          pages: "350",
          binding: "Tapa Blanda",
          edition: "1",
          categories: ["Matemáticas discretas", "Lógica computacional"],
          format: "Libro Físico",
          synopsis: "Integra álgebra computacional con aplicaciones en informática, incluyendo problemas resueltos y algoritmos para matemática discreta."
        },
          // CINCO LIBROS ADMINISTRATIVOS CARRUCEL 
              "970105914X": {
          id: "970105914X",
          ISBN: "970105914X",
          Title: "El emprendedor de éxito",
          coverImage: emprendedorExito,
          author: "Rafael E. Alcaraz Rodríguez",
          authors: ["Rafael E. Alcaraz Rodríguez"],
          publisher: "McGraw-Hill",
          year: "2006",
          pages: "312",
          binding: "Tapa Blanda",
          edition: "3",
          categories: ["Emprendimiento", "Plan de negocios"],
          format: "Libro Físico",
          synopsis: "Guía práctica para estructurar planes de negocios y materializar ideas empresariales con enfoque estratégico."
        },

        "9681601025": {
          id: "9681601025",
          ISBN: "9681601025",
          Title: "Comercio y navegación entre España y las Indias",
          coverImage: comercioIndias,
          author: "Clarence H. Haring",
          authors: ["Clarence H. Haring"],
          publisher: "Fondo de Cultura Económica",
          year: "1979",
          pages: "460",
          binding: "Tapa Dura",
          edition: "1",
          categories: ["Historia económica", "Comercio colonial"],
          format: "Libro Físico",
          synopsis: "Análisis histórico del comercio transatlántico y su impacto en la economía global durante el periodo de los Habsburgo."
        },

        "9687529660": {
          id: "9687529660",
          ISBN: "9687529660",
          Title: "Economía Internacional",
          coverImage: economiaInternacional,
          author: "Robert J. Carbaugh",
          authors: ["Robert J. Carbaugh"],
          publisher: "International Thomson",
          year: "1999",
          pages: "499",
          binding: "Tapa Blanda",
          edition: "6",
          categories: ["Economía", "Comercio internacional"],
          format: "Libro Físico",
          synopsis: "Teorías actualizadas de comercio y finanzas globales con casos prácticos y enfoque en problemas económicos reales."
        },

        "2295992": { // ISBN incompleto en Excel
          id: "2295992",
          ISBN: "22959/92",
          Title: "Introducción a la contaduría",
          coverImage: introduccionContaduria,
          author: "Oscar E. Sánchez L., María Elena Sotelo S., Martha I. Mata Parra",
          authors: ["Oscar E. Sánchez L.", "María Elena Sotelo S.", "Martha I. Mata Parra"],
          publisher: "Cárdenas Editor",
          year: "1996",
          pages: "301",
          binding: "Tapa Blanda",
          edition: "1",
          categories: ["Contabilidad básica", "Finanzas"],
          format: "Libro Físico",
          synopsis: "Fundamentos de contabilidad con ejercicios prácticos para el registro y análisis de operaciones financieras."
        },

        "9682602688": {
          id: "9682602688",
          ISBN: "9682602688",
          Title: "Principios fundamentales de contabilidad",
          coverImage: principiosContabilidad,
          author: "William W. Pyle, John Arch White, Kermit D. Larson",
          authors: ["William W. Pyle", "John Arch White", "Kermit D. Larson"],
          publisher: "CECSA",
          year: "1998",
          pages: "1117",
          binding: "Tapa Dura",
          edition: "16",
          categories: ["Contabilidad", "Estados financieros"],
          format: "Libro Físico",
          synopsis: "Obra de referencia completa sobre principios contables, incluyendo gestión de activos, pasivos y costos."
        },
        // CINCO LIBROS DE AMANTES DE LOS LIBROS CARRUCEL
        "842533411X": {
          id: "842533411X",
          ISBN: "842533411X",
          Title: "Hannibal",
          coverImage: hannibal,
          author: "Thomas Harris",
          authors: ["Thomas Harris"],
          publisher: "Grijalbo",
          year: "1999",
          pages: "558",
          binding: "Tapa Blanda",
          edition: "1",
          categories: ["Thriller", "Suspense"],
          format: "Libro Físico",
          synopsis: "Tercera entrega de la saga del Dr. Hannibal Lecter, explorando su vida en Italia y su relación con Clarice Starling."
        },

        "6073114233": {
          id: "6073114233",
          ISBN: "978-6073114233",
          Title: "Bajo la misma estrella",
          coverImage: bajoMismaEstrella,
          author: "John Green",
          authors: ["John Green"],
          publisher: "Nube de Tinta",
          year: "2013",
          pages: "304",
          binding: "Tapa Blanda",
          edition: "10",
          categories: ["Ficción juvenil", "Drama"],
          format: "Libro Físico",
          synopsis: "Conmovedora historia de amor entre Hazel y Augustus, dos adolescentes que enfrentan el cáncer con humor y valentía."
        },

        // Libro no encontrado en Excel (dato externo):
        "8497645077": {
          id: "8497645077",
          ISBN: "9788497645079",
          Title: "La vuelta al mundo en 80 días",
          coverImage: vueltaMundo80Dias,
          author: "Julio Verne",
          authors: ["Julio Verne"],
          publisher: "Alianza Editorial",
          year: "2010",
          pages: "320",
          binding: "Tapa Blanda",
          edition: "1",
          categories: ["Aventuras", "Clásicos"],
          format: "Libro Físico",
          synopsis: "Aventura épica de Phileas Fogg y su mayordomo Passepartout en su intento por circunnavegar el globo en 80 días."
        },

        "6070712739": {
          id: "6070712739",
          ISBN: "978-6070712739",
          Title: "El señor de los anillos: Las dos torres",
          coverImage: dosTorres,
          author: "J.R.R. Tolkien",
          authors: ["J.R.R. Tolkien"],
          publisher: "Planeta",
          year: "2012",
          pages: "336",
          binding: "Tapa Dura",
          edition: "19",
          categories: ["Fantasía", "Aventura"],
          format: "Libro Físico",
          synopsis: "Segunda parte de la trilogía, donde la Comunidad del Anillo se separa y enfrenta nuevos peligros en la Tierra Media."
        },

        "9707809567": {
          id: "9707809567",
          ISBN: "978-9707809567",
          Title: "La historia de Lisey",
          coverImage: historiaLisey,
          author: "Stephen King",
          authors: ["Stephen King"],
          publisher: "Plaza & Janés",
          year: "2007",
          pages: "599",
          binding: "Tapa Blanda",
          edition: "1",
          categories: ["Terror psicológico", "Drama"],
          format: "Libro Físico",
          synopsis: "Lisey descubre secretos oscuros de su difunto esposo mientras revisa sus pertenencias, enfrentando traumas del pasado."
        },

        //20 LIBROS DEL CATALOGO DE LIBROS
        
          "8490359993": {
            id: "8490359993",
            ISBN: "978-8490359997",
            Title: "Big Data: La revolución de los datos masivos",
            coverImage: libroBigData,
            author: "Viktor Mayer-Schönberger, Kenneth Cukier",
            authors: ["Viktor Mayer-Schönberger", "Kenneth Cukier"],
            publisher: "Ediciones Gestión 2000",
            year: "2013",
            pages: "256",
            binding: "Tapa Blanda",
            edition: "1",
            categories: ["Tecnología", "Ciencia de datos"],
            format: "Libro Físico",
            synopsis: "Análisis del impacto de los macrodatos en la sociedad, economía y toma de decisiones empresariales contemporáneas."
          },
        
          "9789705700296": {
            id: "9789705700296",
            ISBN: "9789705700296",
            Title: "Cálculo Diferencial e Integral",
            coverImage: calculoDiferencial,
            author: "Frank Ayres, Elliot Mendelson",
            authors: ["Frank Ayres", "Elliot Mendelson"],
            publisher: "McGraw-Hill",
            year: "1991",
            pages: "850",
            binding: "Tapa Dura",
            edition: "3",
            categories: ["Matemáticas", "Cálculo"],
            format: "Libro Físico",
            synopsis: "Exposición didáctica de límites, derivadas e integración con ejemplos prácticos para aplicaciones en ciencias e ingeniería."
          },
        
          "9681607988": {
            id: "9681607988",
            ISBN: "9681607988",
            Title: "Ciencias Sociales y Marxismo",
            coverImage: libroMarxismo,
            author: "Pierre Fougeyrollas",
            authors: ["Pierre Fougeyrollas"],
            publisher: "FCE",
            year: "1981",
            pages: "253",
            binding: "Tapa Blanda",
            edition: "1",
            categories: ["Ciencias sociales", "Teoría política"],
            format: "Libro Físico",
            synopsis: "Estudio crítico sobre la influencia del marxismo en las ciencias sociales y su relevancia en el análisis socioeconómico."
          },
        
          "8448100824": {
            id: "8448100824",
            ISBN: "8448100824",
            Title: "Circuitos electrónicos: Discretos e integrados",
            coverImage: circuitosElectronicos,
            author: "Donald L. Schilling, Charles Belove",
            authors: ["Donald L. Schilling", "Charles Belove"],
            publisher: "Marcombo",
            year: "1981",
            pages: "629",
            binding: "Tapa Dura",
            edition: "3",
            categories: ["Electrónica", "Ingeniería"],
            format: "Libro Físico",
            synopsis: "Análisis y diseño de circuitos electrónicos con componentes discretos e integrados, combinando teoría y práctica."
          },
        
        
        
          "9687270578": {
            id: "9687270578",
            ISBN: "9687270578",
            Title: "Cuatro herramientas de software-plus: con MS DOS, WordPerfect 5.0/5.1, Lotus 1-2-3 y dBase III Plus",
            coverImage: cuatroHerramientasSoftware,
            author: "Tim Duffy",
            authors: ["Tim Duffy"],
            publisher: "Grupo Editorial Iberoamérica",
            year: "1993",
            pages: "800",
            binding: "Tapa Blanda",
            edition: "2",
            categories: ["Informática", "Software legacy"],
            format: "Libro Físico",
            synopsis: "Guía práctica para el manejo de herramientas clásicas de software en entornos MS-DOS."
          },
        
          "9688809780": {
            id: "9688809780",
            ISBN: "9688809780",
            Title: "Microsoft Access 97",
            coverImage: microsoftAccess97,
            author: "F. Scott Barker, Diana Barker",
            authors: ["F. Scott Barker", "Diana Barker"],
            publisher: "Prentice-Hall",
            year: "1997",
            pages: "395",
            binding: "Tapa Blanda",
            edition: "1",
            categories: ["Bases de datos", "Microsoft Access"],
            format: "Libro Físico",
            synopsis: "Manual paso a paso para crear y gestionar bases de datos utilizando Microsoft Access 97."
          },
        
          "9681852184": {
            id: "9681852184",
            ISBN: "9681852184",
            Title: "Matemáticas Discretas",
            coverImage: matematicasDiscretas,
            author: "Kenneth P. Bogart",
            authors: ["Kenneth P. Bogart"],
            publisher: "Limusa",
            year: "1996",
            pages: "970",
            binding: "Tapa Dura",
            edition: "1",
            categories: ["Matemáticas discretas", "Lógica"],
            format: "Libro Físico",
            synopsis: "Teoría de conjuntos, combinatoria y grafos aplicados a problemas de informática e ingeniería."
          },
        
          "9682452449": { 
            id: "9682452449",
            ISBN: "968-24-5244-9",
            Title: "La comunicación en las relaciones humanas",
            coverImage: comunicacionRelaciones,
            author: "José Luis Diego Fernández Sotelo",
            authors: ["José Luis Diego Fernández Sotelo"],
            publisher: "Trillas",
            year: "1990",
            pages: "125",
            binding: "Tapa Blanda",
            edition: "2",
            categories: ["Comunicación", "Psicología social"],
            format: "Libro Físico",
            synopsis: "Análisis de la comunicación interpersonal y su impacto en el desarrollo humano individual y colectivo."
          },
          "9681809205": { // ISBN ajustado (original: 968-18-0920-5)
            id: "9681809205",
            ISBN: "968-18-0920-5",
            Title: "Identificación sistemática de compuestos orgánicos",
            coverImage: identificacionCompuestos,
            author: "Ralph L. Shriner, Reynold C. Fuson, David Y. Curtin",
            authors: ["Ralph L. Shriner", "Reynold C. Fuson", "David Y. Curtin"],
            publisher: "Limusa",
            year: "2004",
            pages: "479",
            binding: "Tapa Dura",
            edition: "1",
            categories: ["Química orgánica", "Análisis químico"],
            format: "Libro Físico",
            synopsis: "Metodologías prácticas para análisis y caracterización de sustancias orgánicas, con procedimientos experimentales detallados."
          },
        
          "9701896807": {
            id: "9701896807",
            ISBN: "9701896807",
            Title: "Higiene y seguridad industrial",
            coverImage: higieneSeguridad,
            author: "Josué Salgado Benítez",
            authors: ["Josué Salgado Benítez"],
            publisher: "Instituto Politécnico Nacional",
            year: "2002",
            pages: "94",
            binding: "Tapa Blanda",
            edition: "1",
            categories: ["Seguridad laboral", "Legislación industrial"],
            format: "Libro Físico",
            synopsis: "Fundamentos de higiene industrial, normativas y medidas preventivas para entornos laborales seguros."
          },
        
          "9706135774": {
            id: "9706135774",
            ISBN: "9706135774",
            Title: "Origen y evolución de nuevas empresas",
            coverImage: origenEmpresas,
            author: "Amar V. Bhide",
            authors: ["Amar V. Bhide"],
            publisher: "Oxford University Press",
            year: "2003",
            pages: "432",
            binding: "Tapa Blanda",
            edition: "1",
            categories: ["Emprendimiento", "Gestión empresarial"],
            format: "Libro Físico",
            synopsis: "Estudio de startups exitosas, desmitificando la necesidad de planes rigurosos y destacando la adaptabilidad."
          },
        
          "70909989": { // ISBN corregido (original: 70909989 sin guiones)
            id: "70909989",
            ISBN: "70909989",
            Title: "Psicología Social",
            coverImage: psicologiaSocial,
            author: "Paul F. Secord, Carl W. Backman",
            authors: ["Paul F. Secord", "Carl W. Backman"],
            publisher: "McGraw-Hill",
            year: "1975",
            pages: "619",
            binding: "Tapa Dura",
            edition: "1",
            categories: ["Psicología", "Sociología"],
            format: "Libro Físico",
            synopsis: "Análisis de dinámicas sociales como influencia grupal, roles y comunicación en contextos interpersonales."
          },
        
          "9681814614": {
            id: "9681814614",
            ISBN: "9681814614",
            Title: "Sistemas de administración de bancos de datos",
            coverImage: sistemasBancosDatos,
            author: "Alfonso F. Cárdenas",
            authors: ["Alfonso F. Cárdenas"],
            publisher: "Limusa",
            year: "1983",
            pages: "618",
            binding: "Tapa Dura",
            edition: "1",
            categories: ["Bases de datos", "Sistemas de gestión"],
            format: "Libro Físico",
            synopsis: "Evaluación de tecnologías y prácticas para diseño e implementación de sistemas de bases de datos."
          },
        
          "9701042519": {
            id: "9701042519",
            ISBN: "9701042519",
            Title: "Sun Tzu: Estrategias de marketing",
            coverImage: sunTzuMarketing,
            author: "Gerald A. Michaelson, Carlos Osses Terrón",
            authors: ["Gerald A. Michaelson", "Carlos Osses Terrón"],
            publisher: "McGraw-Hill",
            year: "2003",
            pages: "256",
            binding: "Tapa Blanda",
            edition: "1",
            categories: ["Marketing", "Estrategia empresarial"],
            format: "Libro Físico",
            synopsis: "Aplicación de principios militares de Sun Tzu a estrategias competitivas en marketing y negocios."
          },

        "9684229157": {
          id: "9684229157",
          ISBN: "9684229157",
          Title: "Termodinámica",
          coverImage: termodinamicaAbbott,
          author: "Michael M. Abbott, Hendrick C. Van Ness",
          authors: ["Michael M. Abbott", "Hendrick C. Van Ness"],
          publisher: "McGraw-Hill",
          year: "1991",
          pages: "400",
          binding: "Tapa Dura", // Inferido: común en libros técnicos de McGraw-Hill
          edition: "2",
          categories: ["Termodinámica", "Ingeniería", "Ciencias físicas"],
          format: "Libro Físico",
          synopsis: "Obra clásica que aborda principios fundamentales de la termodinámica con enfoque en aplicaciones prácticas en ingeniería química, mecánica y ciencias. Incluye ejemplos resueltos y problemas propuestos."
        },
        
          "070511403": { // ISBN ajustado (original: 70511403)
            id: "070511403",
            ISBN: "70511403",
            Title: "C++ and the OOP Paradigm",
            coverImage: cppOop,
            author: "Bindu Rama Rao",
            authors: ["Bindu Rama Rao"],
            publisher: "McGraw-Hill",
            year: "1993",
            pages: "188",
            binding: "Tapa Blanda",
            edition: "1",
            categories: ["Programación", "C++", "POO"],
            format: "Libro Físico",
            synopsis: "Explicación de conceptos de programación orientada a objetos aplicados en C++, con ejemplos prácticos."
          },
        
          "8448120159": {
            id: "8448120159",
            ISBN: "8448120159",
            Title: "Programación orientada a objetos: conceptos, modelado, diseño y codificación en C++",
            coverImage: pooCpp,
            author: "Luis Joyanes Aguilar",
            authors: ["Luis Joyanes Aguilar"],
            publisher: "McGraw-Hill",
            year: "1998",
            pages: "895",
            binding: "Tapa Dura",
            edition: "2",
            categories: ["Programación", "C++", "POO"],
            format: "Libro Físico",
            synopsis: "Guía integral para dominar POO en C++, incluyendo diseño de clases, herencia y polimorfismo."
          },
        
          "9586006247": {
            id: "9586006247",
            ISBN: "9586006247",
            Title: "Java Now",
            coverImage: javaNow,
            author: "Kris Jams",
            authors: ["Kris Jams"],
            publisher: "McGraw-Hill",
            year: "1997",
            pages: "224",
            binding: "Tapa Blanda",
            edition: "2",
            categories: ["Programación", "Java"],
            format: "Libro Físico",
            synopsis: "Introducción rápida a Java para principiantes, con ejemplos sencillos y enfoque en POO."
          },
        
          "9682609437": {
            id: "9682609437",
            ISBN: "9682609437",
            Title: "Contabilidad avanzada",
            coverImage: contabilidadAvanzada,
            author: "Joe Ben Hoyle",
            authors: ["Joe Ben Hoyle"],
            publisher: "Compañía Editorial Continental",
            year: "1989",
            pages: "629", 
            binding: "Tapa Dura",
            edition: "11°",
            categories: ["Contabilidad", "Finanzas"],
            format: "Libro Físico",
            synopsis: "Técnicas avanzadas de contabilidad, incluyendo consolidación de estados financieros y combinaciones de negocios."
          }
        
          
      },
      loading: {
        popular: false,
        new: false,
        detail: false
      },
      error: {
        popular: null,
        new: null,
        detail: null
      }
    },
  
    getters: {
      getBookById: (state) => (id) => {
        return state.bookDetails[id] || 
               state.popularBooks.find(book => book.id === id) || 
               state.newBooks.find(book => book.id === id) ||
               state.industrialBooks.find(book => book.id === id) ||
               state.systemsBooks.find(book => book.id === id) ||
               state.administrativeBooks.find(book => book.id === id) ||
               state.bookLovers.find(book => book.id === id) ||
               null;
      }
    },
    
    mutations: {
      SET_BOOK_DETAILS(state, { id, details }) {
        state.bookDetails = {
            ...state.bookDetails,
            [id]: { ...details }
        };
      },
      SET_LOADING(state, { type, value }) {
        state.loading[type] = value;
      },
      SET_ERROR(state, { type, value }) {
        state.error[type] = value;
      }
    },
    
    actions: {
      // Simulate API calls with setTimeout
      fetchPopularBooks({ commit, state }) {
        // We already have static data, so just simulate loading
        commit('SET_LOADING', { type: 'popular', value: true });
        
        return new Promise(resolve => {
          setTimeout(() => {
            commit('SET_LOADING', { type: 'popular', value: false });
            resolve(state.popularBooks);
          }, 500); // Simulate network delay
        });
      },
      
      fetchNewBooks({ commit, state }) {
        // We already have static data, so just simulate loading
        commit('SET_LOADING', { type: 'new', value: true });
        
        return new Promise(resolve => {
          setTimeout(() => {
            commit('SET_LOADING', { type: 'new', value: false });
            resolve(state.newBooks);
          }, 500); // Simulate network delay
        });
      },
      
      fetchBookDetails({ commit, state }, id) {
        // If we already have this book's data, just return it
        if (state.bookDetails[id]) { 
          return Promise.resolve(state.bookDetails[id]);
        }
        
        // If not in our static data, create some mock data for this ID
        commit('SET_LOADING', { type: 'detail', value: true });
        
        return new Promise(resolve => {
          setTimeout(() => {
            // If we don't have detailed data, generate some from basic data
            let bookData = state.popularBooks.find(b => b.id === id) || 
                           state.newBooks.find(b => b.id === id) ||
                           state.industrialBooks.find(b => b.id === id) ||
                           state.systemsBooks.find(b => b.id === id) ||
                           state.administrativeBooks.find(b => b.id === id) ||
                           state.bookLovers.find(b => b.id === id);
            
            if (bookData) {
              const bookDetails = {
                ...bookData,
                authors: [bookData.author],
                publisher: "Editorial Aurora", 
                year: "2023",
                pages: "350",
                binding: "Tapa dura",
                edition: "1", 
                categories: [bookData.category, "General"],
                format: "Libro Físico",
                synopsis: `Una fascinante historia sobre ${bookData.Title.toLowerCase()}, escrita por el reconocido autor ${bookData.author}.`
              };
              
              commit('SET_BOOK_DETAILS', { id, details: bookDetails });
              commit('SET_LOADING', { type: 'detail', value: false });
              resolve(bookDetails);
            } else {
              // If we don't have any data for this ID, create a placeholder
              const placeholderDetails = {
                id: id,
                ISBN: id,
                Title: `Libro ${id}`,
                coverImage: "https://t4.ftcdn.net/jpg/01/15/20/75/360_F_115207580_US2etunH78I7iMYHOoNVvxQTCIdoPdRj.jpg",
                author: "Autor Desconocido",
                authors: ["Autor Desconocido"],
                publisher: "Editorial Aurora",
                year: "2023",
                pages: "N/A",
                binding: "Desconocido",
                edition: "1",
                categories: ["Desconocido"],
                format: "Libro Físico",
                synopsis: "No hay información disponible para este libro."
              };
              
              commit('SET_BOOK_DETAILS', { id, details: placeholderDetails });
              commit('SET_LOADING', { type: 'detail', value: false });
              resolve(placeholderDetails);
            }
          }, 800); // Slightly longer delay for detailed data
        });
      }
    }
  };