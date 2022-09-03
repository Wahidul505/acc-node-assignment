const fs = require('fs');

module.exports.getAllUsers = (req, res) => {
    fs.readFile('userData.json', (error, data) => {
        error ?
            res.send({ success: 'false' })
            :
            res.send({ success: true, data: JSON.parse(data) });
    })
}