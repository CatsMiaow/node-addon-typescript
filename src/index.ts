import { pre } from './utils';
import { startWasiTask } from './assembly';
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
  const assembly = await startWasiTask();

  // https://nodejs.org/api/process.html#process_process_hrtime_time
  const NS_PER_SEC = 1e9;
  const MS_PER_NS = 1e6;
  const size = 1000000000;
  let start: [number, number];
  let now: number;
  let count: number = 0;
  let result: number;

  console.log(`> ${size.toLocaleString()} loop: nodeCase(N) vs. cppCase(C) vs. assemblyCase(A)`);
  for (let i = 1; i <= 10; i += 1) {
    // #region case1
    count = 0;
    start = process.hrtime();
    for (let j = 0; j < size; j += 1) {
      count += 1;
    }
    const node1 = process.hrtime(start);

    start = process.hrtime();
    result = await cpp.loop(size);
    const cpp1 = process.hrtime(start);
    if (result !== size) {
      throw new Error(`InvalidCpp: ${result}`);
    }

    start = process.hrtime();
    result = assembly.loop(size);
    const as1 = process.hrtime(start);
    if (result !== size) {
      throw new Error(`InvalidAssembly: ${result}`);
    }

    console.log(pre`> case${i}-1:
      N ${(node1[0] * NS_PER_SEC + node1[1]) / MS_PER_NS}ms
      C ${(cpp1[0] * NS_PER_SEC + cpp1[1]) / MS_PER_NS}ms
      A ${(as1[0] * NS_PER_SEC + as1[1]) / MS_PER_NS}ms`);
    // #endregion case1

    // #region case2
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

    console.log(pre`> case${i}-2:
      N ${node2}ms
      C ${cpp2}ms
      A ${as2}ms`);
    // #endregion case2
  }

  console.log(`> ${count.toLocaleString()} loop: End.`);
} catch (err) {
  console.error(err);
}
})();
