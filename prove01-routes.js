// Array to store a list of users
const userList = ['Peter', 'James', 'John'];

const requestHandller = (req, res) => {
    const url = req.url;

    if (url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<!DOCTYPE html><html lang="en"><head><title>Prove01</title></head>');
        res.write('<body><h1>Welcome to the Add User App!</h1>');
        res.write('<h2>Please enter a new username and click on Send</h2>');
        res.write('<form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Send</button></form>');
        res.write('<h2>You can see the list of all users <a href="/users">here</a>!</h2></body></html>')
        return res.end();
    }

    if (url === '/users') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<!DOCTYPE html><html lang="en"><head><title>Prove01</title></head><body><h1>All Users</h1><ul>');
        userList.forEach(user => { res.write(`<li>${user}</li>`) }); // creates a <li> for each item in the userList array
        res.write('</ul></body></html>');
        return res.end();
    }

    if (url === '/create-user' && req.method === 'POST') {
        const body = [];

        req.on('data', chunk => {
            body.push(chunk);
        });

        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString().split('=')[1];
            console.log(parsedBody);
            userList.push(parsedBody); // pushes the parsed and splited body to the userList array
        });

        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
    }
}

module.exports = requestHandller;