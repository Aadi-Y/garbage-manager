
function isUpperCase(word){
    let firstLetter = word.charAt(0);
    if(firstLetter === firstLetter.toUpperCase()){
       return true 
    }
    return false;
}

function capitalize(word){
    let firstLetter = word.slice(0,1);
    let remainingWord = word.slice(1,);

    return firstLetter.toUpperCase() + remainingWord;

}
