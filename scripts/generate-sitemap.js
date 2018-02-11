const fs = require('fs');
const fetchShelters = require('./fetch-shelters');

const createSitemaps = async () => {
  const shelters = await fetchShelters();

  console.log(`Retrieved ${shelters.length} shelters`);

  const chunks = [];
  const chunkSize = 50000;

  for (let i = 0; i < shelters.length; i += chunkSize) {
    chunks.push(shelters.slice(i, chunkSize));
  }

  console.log(`Created ${chunks.length} chunks.`);

  chunks.forEach((chunk, index) => {
    let fileContent = '<?xml version="1.0" encoding="UTF-8"?>';
    fileContent += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n\r';

    fileContent += chunk
      .map(shelter => `<url><loc>https:\/\/hittaskyddsrum.se/skyddsrum/${shelter.shelterId}</loc></url>`)
      .join('\n\r');

    fileContent += '</urlset>';

    const filename = `sitemap${!!index ? `-${index}` : ''}.xml`;
    fs.writeFile(filename, fileContent, error => {
      if (error) return console.error(error);

      console.log(`Created file ${filename}`);
    });
  });

  console.log('Done');
};

createSitemaps();
