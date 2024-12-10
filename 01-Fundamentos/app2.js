const fs = require('fs');

console.log('Inicio del programa');

const data = fs.readFileSync('Readme.md', 'utf8');
console.log(data);

const newData = data.replace('## NodeJS', '## New File');

console.log(newData);

fs.writeFileSync('ReadmeNew.md', newData);

console.log('Fin del programa');