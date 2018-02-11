const fs = require('fs');
const fetchShelters = require('./fetch-shelters');

const createRedirects = async () => {
  const shelters = await fetchShelters();

  console.log(`Retrieved ${shelters.length} shelters`);

  const fileContent = shelters
    .map(shelter => `\/skyddsrum\/${shelter.id} \/skyddsrum\/${shelter.shelterId} 301`)
    .concat('/*    /index.html   200')
    .join('\n');

  fs.writeFile('_redirects', fileContent, error => {
    if (error) return console.error(error);

    console.log('File created');
  });

  console.log('Done');
};

createRedirects();
