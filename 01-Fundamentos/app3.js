const fs = require('node:fs');

console.log('Inicio del programa');

const content = fs.readFileSync('Readme.md', 'utf8');
const wordCount = content.split(' ');
console.log('Palabras:', wordCount);
//const nodeWordCount = wordCount.filter(word => word.toLowerCase().includes('node')).length;
const nodeWordCount = content.match(/node/gi ?? []).length;
console.log('Node:', nodeWordCount);

const newData = content.replace('## NodeJS', '## New File');

console.log(newData);

fs.writeFileSync('ReadmeNew.md', newData);

console.log('Fin del programa');