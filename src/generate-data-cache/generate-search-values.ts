import { commonReplacements, sanitiseName } from '../helpers';
import { CharacerReplacement } from '../models';
import { getSearchReplacementPermutations } from './generate-search-replacement-premutations';

const searchReplacements: CharacerReplacement[] = [...commonReplacements, ['-', ' '], [',', ''], ['/', '-'], ['/', ''], ['/', ' ']];

const searchReplacementVariations: CharacerReplacement[][] = getSearchReplacementPermutations(searchReplacements);

export function generateSearchValues(name: string): string[] {
  return [...new Set(searchReplacementVariations.map(replacements => sanitiseName(name, replacements)))];
}
