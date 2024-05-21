const express = require('express');
const { fork } = require('child_process');
const port = 4000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/:number', (req, res) => {
    const num = req.params.number;
    // const rs = is_prime(num);
    const child = fork('child.js');
    child.send(num);
    child.on('exit', (code) => {
        console.log('Child process exited with a code of ' + code);
    });
    child.on('message', (message) => {
        return res.json(message);
    });
    child.on('error', (error) => {
        console.log(error);
    });
});
app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});

// function is_prime(number) {
//     const factors = [];
//     if (number < 1) return false;
//     if (number == 1) return true;
//     for (let i = 2; i < number; i++) {
//         if (number % i == 0) {
//             factors.push(i);
//         }
//     }
//     return { number: number, factors, isPrime: factors.length > 0 ? false : true };
// }
