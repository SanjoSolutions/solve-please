export function extractWords(text) {
  return text.split(' ')
    .map(
      text => text.split('')
        .filter(character => isLetter(character))
        .join(''),
    )
}

function getCharacterCode(character) {
  return character.charCodeAt(0)
}

// Source: https://en.wikipedia.org/w/index.php?title=UTF-8&oldid=1043114937#Codepage_layout
const hyphenMinusCode = getCharacterCode('-')
const latinCapitalLetterA = getCharacterCode('A')
const latinCapitalLetterZ = getCharacterCode('Z')
const latinSmallLetterA = getCharacterCode('a')
const latinSmallLetterZ = getCharacterCode('z')
// Latin-1 Supplement
// Source: https://en.wikipedia.org/w/index.php?title=Latin-1_Supplement_(Unicode_block)&oldid=1029434082#Character_table
const latinCapitalLetterAWithGrave = getCharacterCode('À')
const latinCapitalLetterOWithDiaeresis = getCharacterCode('Ö')
const latinCapitalLetterOWithStroke = getCharacterCode('Ø')
const latinSmallLetterOWithDiaeresis = getCharacterCode('ö')
const latinSmallLetterOWithStroke = getCharacterCode('ø')
const latinSmallLetterYWithDiaeresis = getCharacterCode('ÿ')
// Latin Extended-A
// Source: https://en.wikipedia.org/w/index.php?title=Latin_Extended-A&oldid=1007812759#Character_table
const latinCapitalLetterAWithMacron = getCharacterCode('Ā')
const latinSmallLetterLongS = getCharacterCode('ſ')

function isLetter(character) {
  const charCode = character.charCodeAt(0)
  return (
    charCode === hyphenMinusCode ||
    (charCode >= latinCapitalLetterA && charCode <= latinCapitalLetterZ) ||
    (charCode >= latinSmallLetterA && charCode <= latinSmallLetterZ) ||
    // Latin-1 Supplement
    (charCode >=
      latinCapitalLetterAWithGrave &&
      charCode <=
      latinCapitalLetterOWithDiaeresis) ||
    (charCode >=
      latinCapitalLetterOWithStroke &&
      charCode <=
      latinSmallLetterOWithDiaeresis) ||
    (charCode >=
      latinSmallLetterOWithStroke &&
      charCode <=
      latinSmallLetterYWithDiaeresis) ||
    // Latin Extended-A
    (charCode >= latinCapitalLetterAWithMacron && charCode <= latinSmallLetterLongS) ||
    // Other
    (charCode > 0x017f && charCode < 0x1000) ||
    charCode >= 0x3000
  )
}
