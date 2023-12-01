const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const iconSource = "./resources/icon.png"; // Path to your source icon
const androidResDir = "./android/app/src/main/res"; // Path to your Android resources directory

const sizes = {
  mdpi: 48,
  hdpi: 72,
  xhdpi: 96,
  xxhdpi: 144,
  xxxhdpi: 192,
};

async function resizeIcon(size, density) {
  const outputPath = path.join(
    androidResDir,
    `mipmap-${density}/ic_launcher.png`
  );

  try {
    await sharp(iconSource).resize(size, size).toFile(outputPath);

    console.log(`Generated ${outputPath}`);
  } catch (error) {
    console.error(`Error generating ${outputPath}: `, error);
  }
}

async function main() {
  for (const [density, size] of Object.entries(sizes)) {
    await resizeIcon(size, density);
  }
}

function deleteFilesWithForeground(dir) {
  fs.readdir(dir, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.error(err);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(dir, file.name);

      if (file.isDirectory()) {
        // If it's a directory, recurse into it
        deleteFilesWithForeground(filePath);
      } else if (file.name.includes("foreground")) {
        // If the file name contains 'foreground', delete it
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error(err);
          } else {
            console.log(`Deleted file: ${filePath}`);
          }
        });
      }
    });
  });
}

deleteFilesWithForeground(androidResDir);

main();
