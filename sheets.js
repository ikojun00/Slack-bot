const { google } = require('googleapis');
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: require('./config').CACHE_TTL });
const config = require('./config');

async function getAuthClient() {
  const auth = new google.auth.GoogleAuth({
    keyFile: 'credentials.json',
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });
  return auth.getClient();
}

async function fetchItems() {
  const authClient = await getAuthClient();
  const sheets = google.sheets({ version: 'v4', auth: authClient });
  
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: config.SHEET_ID,
    range: 'A:B',
  });

  return response.data.values.slice(1).map(([name, location]) => ({
    name,
    location
  }));
}

module.exports = {
  getItems: async () => {
    let items = cache.get('items');
    if (!items) {
      items = await fetchItems();
      cache.set('items', items);
    }
    return items;
  },
  refreshCache: () => cache.del('items')
};