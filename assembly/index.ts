export function loop(size: i32): i32 {
  let count = 0;
  for (let i = 0; i < size; i += 1) {
    count += 1;
  }

  return count;
}
