const path = require('path');
const { send } = require('process');
const fs = require('fs');

fileServerController = {
    sendFile(filename) {
        const filePath = path.join(__dirname, filename);
        return (req, res) => {
            fs.access(filePath, fs.constants.F_OK, (err) => {
                if (err) {
                    res.status(404).send('File not found');
                    return;
                }
                res.sendFile(filePath);
            });
        };
    }