const CLIENT_ID = '768566393910-0cigk4hccfla22hfmbni44n2b8clhaeo.apps.googleusercontent.com';
const SECRET = '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';

const FORM_ID = '1Whtr0jFAa3XWkWvbuvtDQ_ra3cd8ki2E0__CEmXqxuI';
'use strict';

const path = require('path');
const google = require('@googleapis/forms');
const {
  authenticate,
} = require('@google-cloud/local-auth');

const formID = FORM_ID;

async function runSample(query) {
  const auth = await authenticate({
    keyfilePath: path.join(__dirname, 'credentials.json'),
    scopes: 'https://www.googleapis.com/auth/forms.responses.readonly',
  });
  const forms = google.forms({
    version: 'v1',
    auth: auth,
  });
  const res = await forms.forms.responses.list({
    formId: formID,
  });
  console.log(res.data);
  return res.data;
}

if (module === require.main) {
  runSample().catch(console.error);
}


module.exports = runSample;
