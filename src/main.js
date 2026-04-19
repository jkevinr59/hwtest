const fs = require('fs');
const path = require('path');

function indexMain() {
    let todayFileName = new Date().toISOString().split('T')[0] + '.json';
    let dataPath = path.join('/app/data', todayFileName);
    if (fs.existsSync(dataPath)) {
        let fileData = fs.readFileSync(dataPath, 'utf8');
        return fileData;
    } else {
        let data = {
            message: "No Data"
        };
        return JSON.stringify(data);
    }
}

function storeMain(data){
    let todayFileName = new Date().toISOString().split('T')[0] + '.json';
    let dataPath = path.join('/app/data', todayFileName);
    let status = 0;
    let message = "";
    //check if file with same name exists, if not create it
    if (!fs.existsSync(dataPath)) {
        fs.writeFile(dataPath, JSON.stringify(data, null, 2), (err) => {
            if (err) {
                console.error('Error creating data :', err);
            }
        });
        status = 1;
        message = "Data Stored Successfully";
    }
    else {
        status = 0;
        message = "File already exists";
    }
    let response = {
        status: status,
        message: message
    }
    return JSON.stringify(response);

}

function updateMain(data){
    let todayFileName = new Date().toISOString().split('T')[0] + '.json';
    let dataPath = path.join('/app/data', todayFileName);
    let status = 0;
    let message = "";
    if (fs.existsSync(dataPath)) {
        fs.writeFile(dataPath, JSON.stringify(data, null, 2), (err) => {
            if (err) {
                console.error('Error updating data :', err);
            }
        });
        status = 1;
        message = "Data Updated Successfully";
    } else {
        message = "File does not exist to update";
    }
    let response = {
        status: status,
        message: message
    }
    return JSON.stringify(response);
}

function deleteMain(){
    let todayFileName = new Date().toISOString().split('T')[0] + '.json';
    let dataPath = path.join('/app/data', todayFileName);
    if (fs.existsSync(dataPath)) {
        fs.unlink(dataPath, (err) => {
            if (err) {
                console.error('Error deleting data :', err);
            }        });
        console.log("File deleted successfully");
    } else {
        console.log("File does not exist to delete");
    }
}

module.exports = {
    indexMain,
    storeMain,
    updateMain,
    deleteMain
}