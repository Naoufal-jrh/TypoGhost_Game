import { Alphabets, WordsLake2 } from "./GameData";
import { randomIntFromInterval } from "./mathUtils";

export function generateWord(forbiden) {
  let letter = Alphabets[randomIntFromInterval(0, 25)];
  if (!forbiden.includes(letter)) {
    // Check if letter is not forbidden
    // Get the array of words of the letter
    let targetArray = getWordArray(letter);
    // Add a random word to the array
    return targetArray[randomIntFromInterval(0, targetArray.length - 1)];
  } else {
    return generateWord(forbiden);
  }
}

export function getWordArray(letter) {
  let asciiCode = letter.charCodeAt(0);
  return WordsLake2[asciiCode - 97];
}
