const fs = require('fs');
function findEmailsWithPrefix(filePath, prefix) {
  const matchingEmails = [];
  const fileStream = fs.createReadStream(filePath, { encoding: 'utf8' });
  let remainingData = '';
  fileStream.on('data', (data) => {
    const lines = (remainingData + data).split(/\r?\n/);
    for (const line of lines) {
      const email = line.trim();
      if (email.startsWith(prefix)) {
        matchingEmails.push(email);
      }
    }
  });
  fileStream.on('end', () => {
    if (remainingData.trim().startsWith(prefix)) {
      matchingEmails.push(remainingData.trim());
    }
    console.log('emails starting with "sam":');
    console.log(matchingEmails);
  });
  fileStream.on('error', (err) => {
    console.error('error:', err);
  });
}
const filePath = 'emails.txt';
const prefixToFind = 'sam';
findEmailsWithPrefix(filePath, prefixToFind);
