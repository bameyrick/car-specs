import { CharacerReplacement } from '../models';

export const commonReplacements: CharacerReplacement[] = [
  ['ë', 'e'],
  ['&', 'and'],
  ['\\.', ''],
  ['\\+', ''],
  ['#', ''],
];

export function sanitiseName(
  name: string,
  replacements: CharacerReplacement[] = [...commonReplacements, [', ', '-'], [' ', '-'], ['/', '-']]
): string {
  let url = name.toLowerCase();

  replacements.forEach(([original, replacement]) => {
    url = url.replace(new RegExp(original, 'g'), replacement);
  });

  return url;
}
