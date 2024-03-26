import { compileFromFile } from "json-schema-to-typescript";
import fs from "fs";

const FILETYPE = "json";
var JsonFilePath = "../src/app/models/json";
var ModelSchemaFilePath = "../src/app/models";

// CheckIfFoldersExist
!fs.existsSync(JsonFilePath) && fs.mkdirSync(JsonFilePath);
!fs.existsSync(ModelSchemaFilePath) && fs.mkdirSync(ModelSchemaFilePath);

// directory file checker
fs.readdir(JsonFilePath, function (err, files) {
  if (err) {
    console.log(err);
  } else {
    if (!files.length) {
      console.log("Json Directory Is Empty");
      return;
    }
    // Check if all files are json
    let isAllJson = files.filter(
      (file) => file.split(".").pop().toLowerCase() !== FILETYPE
    ).length
      ? false
      : true;
    //   ifAllAreJson
    if (isAllJson) {
      files.forEach((file) => {
        let fileNameTs = `${file.split(".").shift()}.ts`;
        compileFromFile(`${JsonFilePath}\\${file}`, {
          unknownAny: "false",
          strictIndexSignatures: "true",
          additionalProperties: false,
        }).then((ts) =>
          fs.writeFileSync(`${ModelSchemaFilePath}\\${fileNameTs}`, ts)
        );
      });
      console.log("Models Have Been Generated");
    } else {
      console.log("Abort files are not all in JSON");
    }
  }
});
