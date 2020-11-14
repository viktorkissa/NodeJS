const fs = require('fs') // File System
const path = require('path')

// Create Folder
// fs.mkdir(path.join(__dirname, 'notes'), err => {
//     if (err) throw new Error(err)

//     console.log('Folder was created!')
// })

// Creates file and writes in it
// fs.writeFile(
//     path.join(__dirname, 'notes', 'mynotes.txt'), 
//     'Hello World!!!',
//     err => {
//         if (err) throw err 
//         console.log('File was created!!!')

//         // Add aditional content
//         fs.appendFile(
//             path.join(__dirname, 'notes', 'mynotes.txt'),
//             'From append file',
//             err => {
//                 console.log('File was changed!!!')

//                 // Read from File
//                 fs.readFile(
//                     path.join(__dirname, 'notes', 'mynotes.txt'),
//                     'utf-8', // without it u should read from buffer
//                     (err, data) => {
//                         if (err) throw err 
//                         // console.log(Buffer.from(data).toString()) // Read from buffer
//                         console.log(data)
//                     }
//                 )
//             }
//         )
//     }
// )

// Rename File
fs.rename(
    path.join(__dirname, 'notes', 'mynotes.txt'),
    path.join(__dirname, 'notes', 'notes.txt'),
    err => {
        if (err) throw err 

        console.log('File was renamed!')
    }
)