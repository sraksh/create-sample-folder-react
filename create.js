let fs = require('fs');
let arguments = process.argv.slice(2);

const currentDir = process.env.INIT_CWD;
const getFileDirectoryPath = `${currentDir}/${arguments[0]}`;

const getTestFileName = arguments[0].replace(/([A-Z])/g, ' $1').trim().toLowerCase().split(' ').join('.');

const createDir = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
    createFile(`${getFileDirectoryPath}/index.js`, jsxContent);
    createFile(`${getFileDirectoryPath}/style.local.less`, cssContent);
    createFile(`${getFileDirectoryPath}/${getTestFileName}.spec.js`, testContent, () => console.log("Your files are ready!!!!!!!"));
  }
  else {
    console.log("Directory exists!")
  }
}

const createFile = (filePath, fileContent, readyCallback = () => { }) => {
  fs.writeFile(filePath, fileContent, (error) => {
    if (error) {
      throw 'An error occured: ' + error;
    }
    readyCallback();
  })
}

const jsxContent = `import React from "react";

import style from "./style.local.less";

export const ${arguments[0]} = () => {
  return <div className="">Hello Component!</div>;
};

export default ${arguments[0]};
`;

const cssContent = "";
const testContent = "";

createDir(`${currentDir}/${arguments[0]}`);