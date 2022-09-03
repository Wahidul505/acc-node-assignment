const fs = require('fs');
const getRandomIndex = require('../utils/getRandomIndex');


// to get all the users from userData.json 
module.exports.getAllUsers = (req, res) => {
    fs.readFile('userData.json', (error, data) => {
        error ?
            res.send({ success: false })
            :
            res.send({ success: true, data: JSON.parse(data) })
    })
};

// to get a random user from userData.json 
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
};

// to save a new user in userData.json 
module.exports.saveAUser = (req, res) => {
    const newUser = req.body;
    if ((newUser.id && newUser.gender && newUser.name && newUser.contact && newUser.address && newUser.photoUrl)) {
        fs.readFile('userData.json', (error, data) => {
            if (error) {
                res.send({ success: false })
            }
            else {
                const users = JSON.parse(data);
                users.push(newUser);
                fs.writeFile('userData.json', JSON.stringify(users), (error) => {
                    error ?
                        res.send({ success: false })
                        :
                        res.send({ success: true, message: "User Successfully created!" })
                })
            }
        })
    }
    else {
        res.send({ success: false, message: "Please provide all required properties to create a user" });
    }
};

// to update a particular user based on id
module.exports.updateAUser = (req, res) => {
    const { id, ...rest } = req.body;
    fs.readFile("userData.json", (error, data) => {
        if (error) {
            res.send({ success: false })
        }
        else {
            const users = JSON.parse(data);
            const existUser = users.find(user => user.id === Number(id));
            if (existUser) {
                const restUsers = users.filter(user => user.id !== Number(id));
                const updateEntries = Object.entries(rest);
                for (const key in existUser) {
                    updateEntries.forEach(entries => {
                        if (key === entries[0]) {
                            existUser[key] = entries[1];
                        } else {
                            return;
                        }
                    })
                }
                restUsers.push(existUser);
                fs.writeFile('userData.json', JSON.stringify(restUsers), (error) => {
                    error ?
                        res.send({ success: false, message: "Fail to Update..." })
                        :
                        res.send({ success: true, message: "User Updated Successfully!" });
                })
            }
            else {
                res.send({ success: false, message: "User Not Found!" })
            }
        }
    })


}