// (function(require, module, exports, __filename, __dirname) {
const obj = require('./user') // import user.js
// console.log('Hello Dir Name', __dirname) // path to directory
// console.log('Hello File Name', __filename) // path with name 
// console.log(obj.user)
// obj.sayHello()
// })()

const http = require('http')
const fs = require('fs')
const path = require('path')

// const server = http.createServer((req, res) => {
//     console.log(req.url)

//     res.write('<h1>Hello from NodeJS</h1>')
//     res.write('<h2>Hello from NodeJS</h2>')
//     res.end(`
//         <div style="background: red; width: 200px; height: 200px;">
//             <h1>Test 35635</h1>
//         </div>
//     `)
// })

const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        res.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8'
        })

        if (req.url === '/') {
            fs.readFile(
                path.join(__dirname, 'views', 'index.html'),
                'utf-8',
                (err, content) => {
                    if (err) throw err 

                    res.end(content)
                }
            )
        } else if (req.url === '/about') {
            fs.readFile(
                path.join(__dirname, 'views', 'about.html'),
                'utf-8',
                (err, content) => {
                    if (err) throw err 

                    res.end(content)
                }
            )
        } else if (req.url === '/api/users') {
            res.writeHead(200, {
                'Content-Type': 'text/json'
            })

            const users = [
                {name: 'Viktor', age: 26},
                {name: 'Alina', age: 24}
            ]

            res.end(JSON.stringify(users))
        }
    } else if (req.method === 'POST') {
        const body = []

        res.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8'
        })

        req.on('data', data => {
            body.push(Buffer.from(data))
        })

        req.on('end', () => {
            const message = body.toString().split('=')[1]

            res.end(`
                 <h1>Your message: ${message}</h1>
            `)
        })
    
    }
})

server.listen(3000, () => {
    console.log('Server is running...')
})

