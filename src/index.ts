import fs, { ReadStream } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';
import { Readable } from 'stream';
import readline from 'node:readline';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const sayHello = (args: {
  params: { name: string };
  stream?: boolean;
}): Record<string, any> | ReadStream => {
  if (args.stream) {
    const fileStream = fs.createReadStream(path.join(__dirname, '../README.md'));
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });
    let id = 0;

    const stream = new Readable({
      read() {},
    });

    rl.on('line', (line) => {
      id++;
      stream.push(`event: message\n`);
      stream.push(`id: ${id}\n`);
      stream.push(`data: ${line}\n\n`);
    });

    rl.on('close', () => {
      stream.push(null);
    });

    fileStream.on('error', (err) => {
      stream.emit('error', err);
    });

    return stream;
  } else {
    return { result: `hello world, ${args.params.name}!` };
  }
};
