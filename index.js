const CleanCSS = require('clean-css');
const { readFileSync, writeFileSync, readdirSync, copyFileSync } = require('fs');

const stylesheets = readdirSync("./stylesheets");
const images = readdirSync("./images");

const cleanCss = new CleanCSS({
    level: {
      1: {
        all: true,
        normalizeUrls: false
      },
      2: {
        restructureRules: true
      }
    }
  });

for (let file of stylesheets) {
    console.log(`Cleaning file "${file}"`);
    let newContent = cleanCss.minify(readFileSync(`./stylesheets/${file}`));

    console.log(`Efficiency: ${newContent.stats.efficiency}`);
    console.log(`Original Size: ${newContent.stats.originalSize}`);
    console.log(`Minified Size: ${newContent.stats.minifiedSize}`);
    console.log(`Errors:`);
    console.dir(newContent.errors);

    console.log(`Saving to ./build/${file}`);
    writeFileSync(`./build/${file}`, newContent.styles);

    console.log("");
}

for (let file of images) {
    console.log(`Copying ${file}`);
    copyFileSync(`./images/${file}`, `./build/${file}`);
}

console.log("");
console.log("Complete!");