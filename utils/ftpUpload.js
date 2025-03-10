const ftp = require('basic-ftp');
require('dotenv').config();

async function uploadFileToFTP(filePath, fileName) {
    const client = new ftp.Client();
    client.ftp.verbose = true;
    try {
        await client.access({
            host: process.env.FTP_HOST,
            user: process.env.FTP_USER,
            password: process.env.FTP_PASSWORD,
            secure: false
        });
        await client.uploadFrom(filePath, fileName);
    } catch (err) {
        console.error(err);
    }
    client.close();
}

module.exports = uploadFileToFTP;
