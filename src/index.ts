import { performance } from 'perf_hooks';

import { getWasmModule } from './assembly';
import { calc as cpp, test } from '../addons/addon';
//= import { calc, test } from '../addons';
import * as demo from '../addons/demo';

console.log('demo', demo);
console.log('demo.hello', demo.hello()); // world

// console.log('addon', addon);
console.log('test.hello', test.hello()); // world
console.log('test.foo', test.foo()); // bar

(async (): Promise<void> => {
try {
  const assembly = await getWasmModule();

  const size = 1000000000;
  let now: number;
  let count: number = 0;
  let result: number;

  console.log(`> ${size.toLocaleString()} loop: NodeCase(N) vs. CppCase(C) vs. AssemblyCase(A)`);

  // #region case1
  for (let i = 1; i <= 10; i += 1) {
    count = 0;
    now = performance.now();
    for (let j = 0; j < size; j += 1) {
      count += 1;
    }
    const node1 = performance.now() - now;

    now = performance.now();
    result = await cpp.loop(size);
    const cpp1 = performance.now() - now;
    if (result !== size) {
      throw new Error(`InvalidCpp: ${result}`);
    }

    now = performance.now();
    result = assembly.loop(size);
    const as1 = performance.now() - now;
    if (result !== size) {
      throw new Error(`InvalidAssembly: ${result}`);
    }

    console.log(`> case1-${i}: N ${node1}ms / C ${cpp1}ms / A ${as1}ms`);
  }
  // #endregion case1

  // #region case2
  for (let i = 1; i <= 10; i += 1) {
    count = 0;
    now = Date.now();
    for (let k = 0; k < size; k += 1) {
      count += 1;
    }
    const node2 = Date.now() - now;

    now = Date.now();
    result = await cpp.loop(size);
    const cpp2 = Date.now() - now;
    if (result !== size) {
      throw new Error(`InvalidCpp: ${result}`);
    }

    now = Date.now();
    result = assembly.loop(size);
    const as2 = Date.now() - now;
    if (result !== size) {
      throw new Error(`InvalidAssembly: ${result}`);
    }

    console.log(`> case2-${i}: N ${node2}ms / C ${cpp2}ms / A ${as2}ms`);
  }
  // #endregion case2

  console.log(`> ${count.toLocaleString()} loop: End.`);
} catch (err) {
  console.error(err);
}
})();
