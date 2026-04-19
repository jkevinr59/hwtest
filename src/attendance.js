const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

function list(startDate, endDate) {
    let data = [];
    let query = "";
    let parameters = [];
    try {
        if (!startDate) {
            throw new Error('Start date is required');
        }
        if (!endDate) {
            query = "SELECT sa.id, s.name, sa.is_check_in, sa.attend_at FROM staff_attendance sa JOIN staff s ON sa.staff_id = s.id WHERE date(sa.attend_at) = $1 ORDER BY sa.attend_at DESC";
            parameters = [startDate];
        }
        else {
            query = "SELECT sa.id, s.name, sa.is_check_in, sa.attend_at FROM staff_attendance sa JOIN staff s ON sa.staff_id = s.id WHERE date(sa.attend_at) >= $1 AND date(sa.attend_at) <= $2 ORDER BY sa.attend_at DESC";
            parameters = [startDate, endDate];
        }
        const res = await pool.query(query, parameters);
        data = res.rows;
    } catch (error) {
        console.error('Error listing attendance :', error);
        data = null;
    }
    return data;
}

async function checkIn(staffId) {
    const today = new Date().toISOString().split('T')[0];
    let query = "INSERT INTO staff_attendance (staff_id, is_check_in, attend_at) VALUES ($1, true, $2) RETURNING id";
    let parameters = [staffId, today];
    try {
        const res = await pool.query(query, parameters);
        return res.rows[0].id;
    } catch (error) {
        console.error('Error checking in :', error);
        return null;
    }
}

async function checkOut(staffId) {
    const today = new Date().toISOString().split('T')[0];
    let query = "INSERT INTO staff_attendance (staff_id, is_check_in, date) VALUES ($1, false, $2) RETURNING id";
    let parameters = [staffId, today];
    try {
        const res = await pool.query(query, parameters);
        return res.rows[0].id;
    } catch (error) {
        console.error('Error checking out :', error);
        return null;
    }
}

module.exports = {
    list,
    checkIn,
    checkOut
}