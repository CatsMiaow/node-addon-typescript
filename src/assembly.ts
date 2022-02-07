/**
 * https://nodejs.dev/learn/nodejs-with-webassembly
 * https://www.assemblyscript.org/quick-start.html
 */
import * as fs from 'fs';

import type * as WasmModule from '../addons/optimized.wasm';
type WasmModule = typeof WasmModule & WebAssembly.Exports;

const wasmFilePath = './addons/optimized.wasm';

export async function getWasmModule(): Promise<WasmModule> {
  const wasmBuffer = fs.readFileSync(wasmFilePath);
  const { instance } = await WebAssembly.instantiate(wasmBuffer);

  return <WasmModule>instance.exports;
}
