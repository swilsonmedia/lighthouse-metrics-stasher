const {google} = require('googleapis');

/**
 * Prints the names and majors of students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
function appendToSpreadSheets(config, row) {
  const sheets = google.sheets({version: 'v4', auth: config.auth});
  sheets.spreadsheets.values.append({
    spreadsheetId: config.spreadsheetId,
    range: config.range,
    includeValuesInResponse: true,
    insertDataOption: 'INSERT_ROWS',
    valueInputOption: 'USER_ENTERED',
    resource: {
      values: [
        row
      ]
    }
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    console.log('Added row: ' + row.join(','));
  });
}

module.exports = appendToSpreadSheets;
