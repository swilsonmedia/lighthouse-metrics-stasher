const psi = require('psi');
const lighthouseParser = require('./lighthouseparser');
const authorizeGoogleAPIScopes = require('./authorizeGoogleAPIScopes');
const appendToSpreadSheets = require('./appendtospreadsheets');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

const URLS = [
  'https://www.smartpakequine.com',
  'https://www.smartpakequine.com/ps/smartcombo-ultra-pellets-9474',
  'https://www.smartpakequine.com/pt/piper-original-lowrise-breeches-by-smartpak--knee-patch-10947',
  'https://www.smartpakequine.com/search/search?searchTerm=breeches',
  'https://www.smartpakequine.com/full-seat-breeches-748pc',
  'https://www.smartpakequine.com/equine-multipurpose-supplements-788pc',
  'https://www.smartpakequine.com/rider-apparel-and-gear-365c'
];

authorizeGoogleAPIScopes(SCOPES, function(auth){
  URLS.forEach(url => {
    runPageSpeedInsights(auth, 'desktop', url);
    runPageSpeedInsights(auth, 'mobile', url);
  });
});

async function runPageSpeedInsights(auth, strategy, url){
  const { data } = await psi(url, {
    strategy: strategy
  });

  appendToSpreadSheets({
    auth: auth,
    spreadsheetId: '1X-FfTQH-qyr87QmN8dbQ2__LaxlZHhbx0sd0qhz9gNw',
    range: 'Lighthouse Data!A1:J'
  }, lighthouseParser(data));
}


