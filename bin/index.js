import { lstatSync, existsSync, readFileSync } from "fs";
import { argv } from "process";

const buildFilePath = () => {
    const defaultPath = `${process.cwd()}/package.json`;
    let basePath = argv[3] || defaultPath;

    // Check that provided path is dir
    try {
        if (lstatSync(basePath).isDirectory()) {
            if (basePath.endsWith("/")) {
                basePath += "package.json";
            } else {
                basePath += "/package.json";
            }
        } 
    } catch (error) {
        console.log("ERROR")
        console.log(`PATH ${basePath} DONT EXISTS`);
        process.exit(1);
    }

    // Check that provided file exists
    const isExists = existsSync(basePath);

    if (isExists && basePath.endsWith("package.json")) {
        return basePath;
    } else {
        console.log("ERROR");
        console.log(`PROVIDED PATH ${basePath} DONT EXISTS OR ITS NOT A package.json file`);
        process.exit(1);
    }
}

const file = buildFilePath();

const logResult = (filePath) => {
    if (argv[2]) {
        const result = JSON.parse(readFileSync(filePath, "utf-8"));
        console.dir(result[argv[2]]);
    } else {
        console.log("ERROR");
        console.log("FIELD WAS NOT PROVIDED");
        process.exit(1);
    }
}

export default (function () {
    logResult(file)
})();
