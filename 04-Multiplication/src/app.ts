import { myArgs } from "./config/plugins/args.plugin";
import { ServerApp } from "./presentation/server-app";



(async () => {
    await main();
})()

async function main() {
    const { b: base, l: limit, s: showTable, d: destination, n: name } = myArgs;
    ServerApp.run({ base, limit, showTable, destination, name });
}