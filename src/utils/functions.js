export const upperFirstLetters = (str) => {
    const words = str.split(" ")
    let tempArr = []
    for (let i = 0; i < words.length; i++) {
        let tempWord = ""
        for (let j = 0; j < words[i].length; j++) {
            if (j === 0) {
                tempWord += words[i][j].toUpperCase()
            } else {
                tempWord += words[i][j].toLowerCase()
            }
        }
        tempArr.push(tempWord)
    }

    const newStr = tempArr.join(" ")
    return newStr;
} 