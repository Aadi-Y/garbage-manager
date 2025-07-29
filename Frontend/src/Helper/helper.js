const countWords = (sentence) => {
    if (sentence) {
        const words = sentence.split(" ");
        return words.length;
    }
}

export const trimDescription = (sentence) => {
    let count = countWords(sentence);
    if(count > 5){
        return sentence.slice(0,30)
    }
    return sentence;
}

const sentence = "It is an mixed waste with many types of garbages mixed together"
let result = trimDescription(sentence);
console.log(result);