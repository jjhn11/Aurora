const filter = require('leo-profanity');

// Configurar filtro
filter.clearList();

const customBadWords = [
    'menso',
    'tonto',
    'idiota',
    'imbecil',
    'estupido',
];

filter.add(customBadWords);


module.exports = filter;
