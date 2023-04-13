import { CharacerReplacement } from '../models';

export function getSearchReplacementPermutations(replacements: CharacerReplacement[]): CharacerReplacement[][] {
  const result: CharacerReplacement[][] = [];

  // Helper function to recursively generate permutations
  function generatePermutations(startIndex: number, currentSet: CharacerReplacement[]): void {
    result.push(currentSet.slice());

    // Generate permutations by including each element from the remaining array
    for (let i = startIndex, l = replacements.length; i < l; i++) {
      currentSet.push(replacements[i]); // Include replacements[i] in the current set
      generatePermutations(i + 1, currentSet); // Recursively generate permutations from the remaining array
      currentSet.pop(); // Backtrack by removing replacements[i] from the current set
    }
  }

  generatePermutations(0, []); // Start with an empty set and index 0

  return result;
}
