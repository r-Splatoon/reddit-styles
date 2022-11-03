const CleanCSS = require('clean-css');
const { readFileSync, writeFileSync, readdirSync } = require('fs');

const files = readdirSync("./stylesheets");

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

for (let file of files) {
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