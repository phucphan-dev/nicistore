const fs = require('fs');

const newName = process.argv.slice(2).toString().replace(',', ' ');

const indexHTML = fs.readFileSync('public/index.html', { encoding: 'utf-8' })
  .replace(/Nova EForce/g, newName);

const manifest = fs.readFileSync('public/manifest.json', { encoding: 'utf-8' })
  .replace('Nova EForce', newName)
  .replace('NovaEForce', newName.replace(/\s/g, ''));

const packageName = fs.readFileSync('package.json', { encoding: 'utf-8' })
  .replace('nova-eforce', newName.replace(/\s/g, '-').toLowerCase());

fs.writeFileSync('public/index.html', indexHTML, { encoding: 'utf-8' });
fs.writeFileSync('public/manifest.json', manifest, { encoding: 'utf-8' });
fs.writeFileSync('package.json', packageName, { encoding: 'utf-8' });
