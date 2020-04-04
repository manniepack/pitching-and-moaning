const fs = require('fs');
const Path = require('path');
const spritesheet = require('spritesheet-js');

const PATHS = {
  ASSETS: Path.join(process.env.PWD, './design/poster-graphic_v1-assets'),
  EXPORT: Path.join(process.env.PWD, './public/assets'),
};

const ASSETS = {
  spritesheets: [
    { waves: 'wave*.png' },
    { char: '{char,eye}*.png' },
    { lightning: 'lightning*.png' },
  ],
  loose: [
    'frame.png',
    'sky.png',
  ],
};

async function clearExports() {

  return new Promise((res, rej) => {
    fs.rmdir(PATHS.EXPORT, { recursive: true }, (err) => {
      if (err) rej(err);

      console.log('Deleted previous export location (if any)');

      fs.mkdir(PATHS.EXPORT, { recursive: true }, (err) => {
        if (err) rej(err);

        console.log('Recreated empty, assets export location');
        res(PATHS.EXPORT);
      });
    });
  });
}

async function generateSpritesheet(name, glob) {

  const source = Path.join(PATHS.ASSETS, glob);

  name = `spritesheet_${name}`;
  const sjsOptions = {
    name,
    path: PATHS.EXPORT,
    powerOfTwo: true,
  };

  return new Promise((res, rej) => {
    spritesheet(source, sjsOptions, (err) => {
      if (err) rej(err);

      console.log(`Generated: '${name}' from ${source}\n     -> ${sjsOptions.path}/${sjsOptions.name}.json`);
      res({ source, ...sjsOptions });
    });
  });
}

async function copyAsset(asset) {

  const source = Path.join(PATHS.ASSETS, asset);
  const dest = Path.join(PATHS.EXPORT, asset);

  return new Promise((res, rej) => {
    fs.copyFile(source, dest, (err) => {
      if (err) rej(err);

      console.log(`Copied: ${source}\n     -> ${dest}`);
      res(dest);
    });
  });
}

async function run() {

  await clearExports();

  for (let spritesheet of ASSETS.spritesheets) {
    const name = Object.keys(spritesheet)[0];
    const glob = spritesheet[name];
    generateSpritesheet(name, glob);
  }

  for (let asset of ASSETS.loose) {
    try {
      copyAsset(asset);
    } catch (e) {
      throw e;
    }
  }
}

run();
