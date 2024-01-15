const { readdir, stat, appendFile } = require("fs").promises;
const { join } = require("path");

async function makeFolderStructure(dir, baseDir = dir, tabCount = 0) {
  try {
    const currentDir = await readdir(dir);
    const tabs = "\t".repeat(tabCount);

    for (let filePath of currentDir) {
      const fullPath = await join(dir, filePath);
      const stats = await stat(fullPath);

      if (stats.isFile()) {
        await appendFile(
          join(baseDir, "output.txt"),
          `${tabs}FILE: ${filePath}\n`
        );
      } else if (stats.isDirectory() && filePath != ".git") {
        await appendFile(
          join(baseDir, "output.txt"),
          `${tabs}DIR: ${filePath}\n`
        );
        await makeFolderStructure(fullPath, baseDir, tabCount + 1);
      }
    }
  } catch (err) {
    console.log(err);
  }
}

makeFolderStructure(__dirname);
