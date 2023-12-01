const sharp = require("sharp");
const path = require("path");

function generateFavicon(inputPath) {
  const outputFolder = "public/image"; // Set output folder

  // Ensure output folder exists
  const fs = require("fs");
  if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder, { recursive: true });
  }

  // Define sizes and output filenames
  const sizes = [
    { size: 180, name: "apple-touch-icon.png" },
    { size: 16, name: "favicon-16x16.png" },
    { size: 32, name: "favicon-32x32.png" },
  ];

  sizes.forEach(({ size, name }) => {
    sharp(inputPath)
      .resize(size, size)
      .toFile(path.join(outputFolder, name))
      .then(() =>
        console.log(`${name} generated successfully in ${outputFolder}.`)
      )
      .catch((err) => console.error("Error generating favicon:", err));
  });
}

// Taking the input image path from the command line
const inputImagePath = process.argv[2];
if (!inputImagePath) {
  console.error("Please provide an image path.");
  process.exit(1);
}

generateFavicon(inputImagePath);
