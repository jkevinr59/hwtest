console.log('dataclean.js is running...');

const fs = require('fs');
const path = require('path');
const moment = require('moment');

let folderPath = '/home/cron';

// iterate through files in folder and delete files older than 1 month
fs.readdir(folderPath, (err, files) => {
    if (err) {
        console.error('Error reading folder :', err);
        return;
    }
    files.forEach(file => {
        let filePath = path.join(folderPath, file
        );
        fs.stat(filePath, (err, stats) => {
            if (err) {
                console.error('Error getting file stats :', err);
                return;
            }
            let now = moment();
            let fileTime = moment(stats.mtime);
            let deleteCondition = now.diff(fileTime, 'months') > 1;
            // let deleteCondition = now.diff(fileTime, 'minutes') > 10; // for testing purpose, delete files older than 10 minutes
            if (deleteCondition) {
                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.error('Error deleting file :', err);
                    } else {
                        console.log(`Deleted file: ${filePath}`);
                    }
                });
            }
        });
    });
});