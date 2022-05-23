const fs = require('fs/promises');

const help = {};

help.createDirectory = async (dirPath, recursive) => {
  await fs.mkdir(dirPath, { recursive });
};

help.writeFile = async (filePath, file) => {
  await fs.writeFile(filePath, file);
};

help.deleteFileOrDirectory = async (path, rf) => {
  await fs.rm(path, { recursive: rf, force: rf });
};

module.exports = help;
