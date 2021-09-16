const Queue = require("bull");

const invoiceScheduler = new Queue('invoice scheduler ', { redis: { port: 6379, host: '127.0.0.1', password: 'test_pass' } });


invoiceScheduler.process(function(job) {
    console.log("Printing jobs", job.data)
    return new Promise(resolve => {
        resolve({...job, result: "success" })
    })
});

module.exports = invoiceScheduler