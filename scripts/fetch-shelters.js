const request = require('request-promise');

module.exports = fetchShelters = async () => {
  const shelters = [];
  let finished = false;
  let per_page = 4000;
  let page = 1;

  while (!finished) {
    console.log(`Fetching page ${page}`);
    
    const uri = `https:\/\/stageapi.hittaskyddsrum.se/api/v1/shelters/all-shelters?page=${page}&per_page=${per_page}`
      console.log(`Loading ${uri}`);
    const result = await request({
      uri,
      json: true,
    });

    if (result.message) {
      console.log('Finishing fetching', result);

      finished = true;
      continue;
    }

    console.log(`Found ${result.length} results`);

    shelters.push(...result);
    page += 1;
  }

  return shelters;
};
