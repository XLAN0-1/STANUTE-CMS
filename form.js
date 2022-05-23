const {google} = require('googleapis');


//Authenticate with google


const auth = new google.auth.GoogleAuth({
  keyFile: 'credentials.json',
  scopes: "https://www.googleapis.com/auth/spreadsheets"
})

fetchForm = async ()=>{
 
 // Create client instance for auth
  const client = await auth.getClient();

  // Instance of Google Sheets API
  const googleSheets = google.sheets({ version: "v4", auth: client });

  const spreadsheetId = "1CsmGjFJAkHqTmG9O54LOmJYNykFcoITAj7Sv9xQGak4";

  // Get metadata about spreadsheet
  const metaData = await googleSheets.spreadsheets.get({
    auth,
    spreadsheetId,
  });

  // Read rows from spreadsheet
  const getRows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "Form Responses 3",
  });

  console.log(getRows.data);
}

fetchForm();