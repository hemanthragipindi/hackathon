const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = dir + '/' + file;
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      if (!file.includes('node_modules')) {
        results = results.concat(walk(file));
      }
    } else { 
      if (file.endsWith('.jsx') || file.endsWith('.js')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk('./src');
let changed = 0;
files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  if (content.includes('â€¢')) {
    const newContent = content.replace(/â€¢/g, '•');
    fs.writeFileSync(file, newContent, 'utf8');
    console.log('Fixed', file);
    changed++;
  }
});
console.log('Total fixed:', changed);
