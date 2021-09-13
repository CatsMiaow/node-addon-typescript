/**
 * https://www.assemblyscript.org/quick-start.html
 * https://docs.wasmer.io/integrations/js/wasi/server/examples/hello-world
 */
import * as fs from 'fs';
import { WASI } from '@wasmer/wasi';
import nodeBindings from '@wasmer/wasi/lib/bindings/node';

import type * as WasmModule from '../addons/optimized.wasm';

type WasmModule = typeof WasmModule & WebAssembly.Exports;

const wasmFilePath = './addons/optimized.wasm';
const wasi = new WASI({
  args: [wasmFilePath],
  env: {},
  bindings: { ...nodeBindings, fs },
});

export async function startWasiTask(): Promise<WasmModule> {
  const wasmBytes = new Uint8Array(fs.readFileSync(wasmFilePath)).buffer;
  const wasmModule = await WebAssembly.compile(wasmBytes);
  const instance = await WebAssembly.instantiate(wasmModule, {
    // Error: Can't detect a WASI namespace for the WebAssembly Module
    // ...wasi.getImports(wasmModule),
  });

  wasi.start(instance);

  return <WasmModule>instance.exports;
}
