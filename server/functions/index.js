const functions = require('firebase-functions');
const express = require('express');
const app = express();
const https = require('https');
const cors = require('cors')({origin: true});

app.use(cors);

app.get('/', (req, res) => {
    https.get('https://dog.ceo/api/breeds/list/all', dogs => {
        dogs.on('data', d => {
            let x = JSON.parse(d);
            let ret = [];

            for (var prop in x.message) {
                ret.push(prop);
                x.message[prop].forEach(sub => {
                    ret.push(sub + " " + prop);
                });
            }
            ret.sort((a, b) => {
                const lowa = a.toLowerCase();
                const lowb = b.toLowerCase();
                if (lowa < lowb) return -1;
                else if (lowb < lowa) return 1;
                else return 0;
            });
            res.json(ret);
        });
    });
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.app = functions.https.onRequest(app);
