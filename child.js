console.log('CHILD PROCESS CREATE', process.pid);
process.on('message', (message) => {
    // throw new Error('CHILD Error');
    const rs = is_prime(message);
    process.send(rs);
    setTimeout(process.exit, 2000);
});

function is_prime(number) {
    const factors = [];
    if (number < 1) return false;
    if (number == 1) return true;
    for (let i = 2; i < number; i++) {
        if (number % i == 0) {
            factors.push(i);
        }
    }
    return { number: number, factors, isPrime: factors.length > 0 ? false : true };
}
