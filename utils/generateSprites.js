const fs = require('fs');
const Path = require('path');
const spritesheet = require('spritesheet-js');

const ASSETS = Path.join(process.env.PWD, './design/poster-graphic_v1-assets');
const EXPORT = Path.join(process.env.PWD, './assets');

const clearExportLocation = async () => {
  return new Promise((resolve, reject) => {
    fs.rmdir(EXPORT, { recursive: true }, err => {
        if (err) reject(err);
        resolve();
      });
  });
};

const genSpritesheet = async (name, files, hq=false) => {
  const options = {
    name,
    path: Path.join(EXPORT, hq ? '/hq' : ''),
    format: 'json',
    powerOfTwo: true,
  };
  const path = Path.join(ASSETS, hq ? '/hq' : '', files);
  const details = {
    input: path,
    ...options,
  };

  return new Promise((resolve, reject) => {
    spritesheet(path, options, err => {
      if (err) reject({ err, details });
      resolve(details);
    })
  });
};

const copyAsset = async (file, hq=false) => {
  return new Promise((resolve, reject) => {
    const source = Path.join(ASSETS, hq ? '/hq' : '', file);
    const target = Path.join(EXPORT, hq ? '/hq' : '', file);
    const details = { source, target };

    fs.copyFile(source, target, err => {
      if (err) reject({ err, details });
      resolve(details);
    })
  });
};

async function run() {
  try {
    const start = Date.now();

    //
    // Delete export directory
    //
    await clearExportLocation();
    console.log(`Deleted ${EXPORT}\n`);

    //
    // Generate spritesheets
    //
    const ss_waves = await genSpritesheet('spritesheet_waves', 'wave*.png');
    console.log(`Generated spritesheet '${ss_waves.name}.json' at:\n    -> ${ss_waves.path}`);
    const ss_waves_hq = await genSpritesheet('spritesheet_waves', 'wave*.png', true);
    console.log(`Generated HQ spritesheet '${ss_waves_hq.name}.json' at:\n    -> ${ss_waves_hq.path}`);

    console.log();

    const ss_char = await genSpritesheet('spritesheet_char', '{char,eye}*.png');
    console.log(`Generated spritesheet '${ss_char.name}.json' at:\n    -> ${ss_char.path}`);
    const ss_char_hq = await genSpritesheet('spritesheet_char', '{char,eye}*.png', true);
    console.log(`Generated HQ spritesheet '${ss_char_hq.name}.json' at:\n    -> ${ss_char_hq.path}`);

    console.log();

    const ss_lightning = await genSpritesheet('spritesheet_lightning', 'lightning*.png');
    console.log(`Generated spritesheet '${ss_lightning.name}.json' at:\n    -> ${ss_lightning.path}`);
    const ss_lightning_hq = await genSpritesheet('spritesheet_lightning', 'lightning*.png', true);
    console.log(`Generated HQ spritesheet '${ss_lightning_hq.name}.json' at:\n    -> ${ss_lightning_hq.path}`);

    console.log();

    //
    // Copy loose assets
    //
    const frame = await copyAsset('frame.png');
    console.log(`Copied: ${frame.source}\n    -> ${frame.target}`);
    const frame_hq = await copyAsset('frame.png', true);
    console.log(`Copied HQ: ${frame_hq.source}\n    -> ${frame_hq.target}`);

    const sky = await copyAsset('sky.png');
    console.log(`Copied: ${sky.source}\n    -> ${sky.target}`);
    const sky_hq = await copyAsset('sky.png', true);
    console.log(`Copied HQ: ${sky_hq.source}\n    -> ${sky_hq.target}`);

    console.log();

    const elapsed = Date.now() - start;
    console.log(`Packed and shipped assets in ${elapsed}ms`);
  } catch (err) {
    throw err;
  }
}

run();
