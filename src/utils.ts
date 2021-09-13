export function pre(strings: TemplateStringsArray, ...param: any[]): string {
  let output = '';
  for (const [i, element] of param.entries()) {
    output += `${strings[i]}${element}`;
  }

  return (output + strings[param.length])
    .split(/\r\n|\n|\r/)
    .map((text: string) => text.replace(/^\s+/gm, ''))
    .join('\n')
    .trim();
}
