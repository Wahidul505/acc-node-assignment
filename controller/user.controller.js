const fs = require('fs');
const getRandomIndex = require('../utils/getRandomIndex');

module.exports.getAllUsers = (req, res) => {
    fs.readFile('userData.json', (error, data) => {
        error ?
            res.send({ success: false })
            :
            res.send({ success: true, data: JSON.parse(data) })
    })
};

module.exports.getARandomUser = (req, res) => {
    fs.readFile('userData.json', (error, data) => {

        if (error) {
            res.send({ success: false })
        }
        else {
            const getRandomNumber = () => {
                const randomNumber = Math.floor(Math.random() * 100);
                if (randomNumber < JSON.parse(data).length) {
                    return randomNumber;
                } else {
                    return getRandomNumber();
                }
            };

            const randomIndex = getRandomNumber();
            const users = JSON.parse(data);
            res.send({ success: true, data: users[randomIndex] });
        }
    })
}