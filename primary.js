import cluster from 'cluster';
import os from 'os';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const cupCount = os.cpus().length;

console.log('The total number of CPUs is ' + cupCount);
console.log(`Primary pid = ${process.id}}`)
cluster.setupPrimary({
    exec: __dirname + '/index.js'
})

for (let i = 0; i < cupCount; i++) {
    cluster.fork();
}

cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.id} died with code ${code} and signal ${signal}`);
    console.log('Starting a new worker');
    cluster.fork();
})