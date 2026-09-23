const fs = require('fs');
const file = 'src/JeevaRaksha.jsx';
const content = fs.readFileSync(file, 'utf8');
const lines = content.split('\n');

const queries = ['/api/', '3001', '8000', 'fetch', 'axios', 'localhost'];
queries.forEach(query => {
  console.log(`\n=== Matches for "${query}": ===`);
  lines.forEach((line, idx) => {
    if (line.includes(query)) {
      console.log(`${idx + 1}: ${line.trim()}`);
    }
  });
});
