import * as fs from 'fs';
import * as path from 'path';

['release'].forEach((name: string) => {
  const src = path.join(__dirname, `../build/${name}.wasm`);
  const dest = path.join(__dirname, `../addons/${name}.wasm`);

  fs.copyFileSync(src, dest);
});
