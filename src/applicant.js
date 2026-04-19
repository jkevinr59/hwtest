const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});


async function list() {
    let data = [];
    let query = "SELECT id,name,email,phone,interviewed_at FROM applicant ORDER BY created_at DESC LIMIT 100";
    try {
        const res = await pool.query(query);
        data = res.rows;
    } catch (error) {
        console.error('Error listing applicants :', error);
        data = null;
    }
    return JSON.stringify(data);
}
async function get(applicantId) {
    let data = [];
    let query = "SELECT id,name,email,phone,interviewed_at FROM applicant WHERE id = $1";
    let parameters = [applicantId];
    try {
        const res = await pool.query(query, parameters);
        data = res.rows[0];
    } catch (error) {
        console.error('Error getting applicant :', error);
        data = null;
    }
    return JSON.stringify(data);
}

async function get_by_email(email) {
    let data = [];
    let query = "SELECT id,name,email,phone,interviewed_at FROM applicant WHERE email = $1 LIMIT 1";
    let parameters = [email];
    try {
        const res = await pool.query(query, parameters);
        data = res.rows[0];
    } catch (error) {
        console.error('Error getting applicant :', error);
        data = null;
    }
    return data;
}

async function store(applicantData){
    let status = 0;
    let message = "";
    let query = "INSERT INTO applicant (name, email, phone, interviewed_at) VALUES ($1, $2, $3, $4) RETURNING id";
    let applicantId = null;
    let parameters = [applicantData.name, applicantData.email, applicantData.phone, applicantData.interviewed_at];
    try {
        const res = await pool.query(query, parameters);
        applicantId = res.rows[0].id;
        status = 1;
        message = "Applicant Stored Successfully";
    } catch (error) {
        console.error('Error storing applicant :', error);
        message = "Error storing applicant";
    }
    let response = {
        status: status,
        message: message,
        data: {
            id: applicantId
        }
    }
    return JSON.stringify(response);
}

async function update(applicantId, applicantData){
    let status = 0;
    let message = "";
    let query = "UPDATE applicant SET name = $1, phone = $2, interviewed_at = $3 WHERE id = $4 RETURNING id";
    let parameters = [applicantData.name, applicantData.phone, applicantData.interviewed_at, applicantId];
    let applicantIdUpdated = null;
    try {
        const res = await pool.query(query, parameters);
        applicantIdUpdated = res.rows[0].id;
        if (res.rowCount > 0) {
            status = 1;
            message = "Applicant Updated Successfully";
        }
        else {
            message = "Applicant not found to update";
        }
    } catch (error) {
        console.error('Error updating applicant :', error);
        message = "Error updating applicant";
    }
    let response = {
        status: status,
        message: message,
        data: {
            id: applicantIdUpdated
        }
    }
    return JSON.stringify(response);
}

module.exports={
    list,
    get,
    get_by_email,
    store,
    update
}