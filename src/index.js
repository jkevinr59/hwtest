const { createServer } = require('node:http');
const formidable = require('formidable');
const hostname = '0.0.0.0';
const port = 3000;
const url = require('url');
const { debug } = require('node:console');


const server = createServer(async(req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  let url = req.url;
  let method = req.method.toUpperCase();
  if (url === '/' && method === 'GET') {
        res.end('{"message": "Welcome to the Applicant API"}');
    }
    if(req.url.startsWith('/applicants')) {
        const applicant = require('./applicant');
        let applicantId = null;
        switch (method) {
            case 'GET':
                let applicantId = url.split('/')[2];
                if (applicantId) {
                    try {
                        const response = await applicant.get(applicantId);
                        res.end(response);
                    } catch (error) {
                        console.error('Error getting applicant :', error);
                        res.statusCode = 500;
                        res.end('Internal Server Error');
                    }
                }
                else {
                    try {
                        const response = await applicant.list();
                        res.end(response);
                    } catch (error) {
                        console.error('Error getting applicant :', error);
                        res.statusCode = 500;
                        res.end('Internal Server Error');
                    }
                }
                break;
            case 'POST':
                let body = '';
                req.on('data', chunk => {
                    body += chunk.toString();
                });
                req.on('end', async () => {
                    let data = JSON.parse(body);
                    res.end(await applicant.store(data));
                });
                break;
            case 'PUT':
                let updateId = url.split('/')[2];
                if (updateId) {
                    try {
                        let bodyPut = '';
                        req.on('data', chunk => {
                            bodyPut += chunk.toString();
                        });
                        req.on('end', async () => {
                            let data = JSON.parse(bodyPut);
                            res.end(await applicant.update(updateId, data));
                        });
                    } catch (error) {
                        console.error('Error getting applicant :', error);
                        res.statusCode = 500;
                        res.end('Internal Server Error');
                    }
                }
                else {
                    res.statusCode = 400;
                    res.end('Bad Request: Applicant ID is required for update');
                }
                break;
            case 'DELETE':
                res.statusCode = 204;
                res.end();
                break;
            default:
                res.statusCode = 405;
                res.end('Method Not Allowed');
        }
                
    }
});
server.listen(port, hostname, () => {
  console.log(`Server running at http://localhost:${port}/`);
});