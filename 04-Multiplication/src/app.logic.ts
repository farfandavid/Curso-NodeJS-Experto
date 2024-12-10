import fs from 'node:fs';
import { myArgs } from './config/plugins/args.plugin';

const header = (base: number) => `
    ========================
         Tabla del: ${base}
    ========================
    `
const bodyMessage = (base: number, limit: number = 10): string => {
    let message = ''
    for (let i = 1; i <= limit; i++) {
        message += `${base} x ${i} = ${base * i}\n`;
    }
    return message;
}

(async () => {
    await main();
})()

async function main() {
    const outputPath = './output';
    const { b: base, l: limit, show } = myArgs;


    const message = header(base) + '\n' + bodyMessage(base, limit);
    if (show) {
        console.log(message);

    }
    fs.mkdirSync(outputPath, { recursive: true });
    fs.writeFileSync(`${outputPath}/tabla-${base}.txt`, message);
    console.log(`tabla-${base}.txt created!`);
}

