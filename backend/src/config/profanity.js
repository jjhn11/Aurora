import filter from 'leo-profanity';

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


export default filter;
