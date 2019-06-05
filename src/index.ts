import { calc, test } from '../addons/addon';
//= import { calc, test } from '../addons';
import * as demo from '../addons/demo';

console.log('demo', demo);
console.log('demo.hello', demo.hello()); // world

// console.log('addon', addon);
console.log('test.hello', test.hello()); // world
console.log('test.foo', test.foo()); // bar

// tslint:disable-next-line: no-floating-promises
(async (): Promise<void> => {
try {
  // https://nodejs.org/api/process.html#process_process_hrtime_time
  const NS_PER_SEC: number = 1e9;
  const MS_PER_NS: number = 1e6;
  const size: number = 1000000000;
  let start: [number, number];
  let now: number;
  let count!: number;
  let result: number;

  console.log(`${size.toLocaleString()} loop: cppCase vs. nodeCase`);
  for (let i: number = 1; i <= 10; i += 1) {
    // #region case1
    start = process.hrtime();
    result = await calc.loop(size);
    const cpp1: [number, number] = process.hrtime(start);
    if (result !== size) {
      throw new Error(`InvalidCalc: ${result}`);
    }

    count = 0;
    start = process.hrtime();
    for (let j: number = 0; j < size; j += 1) {
      count += 1;
    }
    const node1: [number, number] = process.hrtime(start);

    console.log(`case${i}-1: ${(cpp1[0] * NS_PER_SEC + cpp1[1]) / MS_PER_NS}ms vs. ${(node1[0] * NS_PER_SEC + node1[1]) / MS_PER_NS}ms`);
    // #endregion case1

    // #region case2
    now = Date.now();
    result = await calc.loop(size);
    const cpp2: number = Date.now() - now;
    if (result !== size) {
      throw new Error(`InvalidCalc: ${result}`);
    }

    count = 0;
    now = Date.now();
    for (let k: number = 0; k < size; k += 1) {
      count += 1;
    }
    const node2: number = Date.now() - now;

    console.log(`case${i}-2: ${cpp2}ms vs. ${node2}ms`);
    // #endregion case2
  }

  console.log(`${count.toLocaleString()} loop: End.`);
} catch (err) {
  console.error(err);
}
})();
