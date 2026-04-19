
console.log("Collecting Data...");

const fs = require('fs');
const path = require('path');
const moment = require('moment');
const applicant = require('../src/applicant');

console.log(process.env.DATABASE_URL);
let timestamp = moment().format('MMDDYYYY_HH.mm')
let filename = `cron_${timestamp}.csv`;
let applicantsData = applicant.list().then(data => {
    let applicants = JSON.parse(data);
    let csv = "id,name,email,phone,interviewed_at,description\n" + applicants.map(a => `${a.id},${a.name},${a.email},${a.phone},${a.interviewed_at},${a.description}`).join('\n');
    fs.writeFile(path.join('/home/cron', filename), csv, (err) => {
        if (err) {
            console.error('Error creating data :', err);
        }
    });
});


