const copydir = require('copy-dir');

const origin = ['./src/app/enum', './src/app/upload'];
const dest = ['./libs/enum', './libs/upload'];

for (let index = 0; index < 2; index++) {

  copydir(origin[index], dest[index], (err) => {

    if(err){
      console.log(`Error: ${err}`);
    }
    console.log('Copy Success');

  });
}

