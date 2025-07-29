const {customAlphabet} = require("nanoid");

const options = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const generateId = customAlphabet(options,6);
module.exports = generateId;
