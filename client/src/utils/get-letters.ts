function getLetters(val: string) {
  if (!val) {
    throw new Error("You forgot to pass a value");
  }

  const splitWords = val.split(" ");

  if (splitWords.length === 1) {
    const firstLetter = splitWords[0].charAt(0);
    return `${firstLetter.toUpperCase()}`;
  } else {
    const firstLetter = splitWords[0].charAt(0);
    const secondLetter = splitWords[1].charAt(0);
    return `${firstLetter.toUpperCase()}${secondLetter.toUpperCase()}`;
  }
}

export default getLetters;
