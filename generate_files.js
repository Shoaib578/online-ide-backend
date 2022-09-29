const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");

const dirCodes = 'public/code_files/'

if (!fs.existsSync(dirCodes)) {
  fs.mkdirSync(dirCodes, { recursive: true });
}

const generateFile = async (format, content,code_filename) => {
 
  const filename = code_filename
  const filepath = path.join(dirCodes, filename);
  await fs.writeFileSync(filepath, content);
  return filepath;
};

module.exports = {
  generateFile,
};