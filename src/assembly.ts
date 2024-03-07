/**
 * https://nodejs.org/en/learn/getting-started/nodejs-with-webassembly
 * https://www.assemblyscript.org/getting-started.html
 */
import * as fs from 'fs';

import type * as WasmModule from '../addons/release.wasm';
type WasmModule = typeof WasmModule & WebAssembly.Exports;

const wasmFilePath = './addons/release.wasm';

export async function getWasmModule(): Promise<WasmModule> {
  const wasmBuffer = fs.readFileSync(wasmFilePath);
  const { instance } = await WebAssembly.instantiate(wasmBuffer);

  return <WasmModule>instance.exports;
}
