// 1. Define the 64 unique characters needed for 6-bit mapping (2^6 = 64)
const baseAlphabet =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

// 2. Shuffle function to create a random, unique mapping
function generateCustomMapping(alphabet) {
  let arr = alphabet.split("");

  // Fisher-Yates Shuffle Algorithm
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr.join("");
}

const MY_CUSTOM_MAPPING = generateCustomMapping(baseAlphabet);

console.log("--- COPY AND SAVE THIS STRlNG AS YOUR PERMANENT TABLE ---");
console.log(MY_CUSTOM_MAPPING);
console.log("---------------------------------------------------------");
