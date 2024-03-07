import * as fs from 'fs';
import * as path from 'path';

['demo', 'addon'].forEach((name: string) => {
  const src = path.join(__dirname, `../build/Release/${name}.node`);
  const dest = path.join(__dirname, `../addons/${name}.node`);

  fs.copyFileSync(src, dest);
});
