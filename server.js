const express = require("express");

const invoiceScheduler = require("./jobs");

const app = express();
app.use(express.json())

app.post("/job", async(req, res) => {
    const { jobId, cron, ...body } = req.body;
    try {
        const job = await invoiceScheduler.add(body, { jobId, repeat: { cron: cron } })
        return res.send(job)
    } catch (err) {
        return res.status(400).send(err)
    }
})

app.get("/jobs", async(req, res) => {
    const data = await invoiceScheduler.getRepeatableJobs();
    return res.send(data)
})

app.delete("/job", async(req, res) => {
    const key = req.query.id
    const data = await invoiceScheduler.removeRepeatableByKey(key);
    return res.send(data)
})

app.delete("/obliterate", async(req, res) => {
    const data = await invoiceScheduler.obliterate({ force: true })
    return res.send(data)
})
app.listen(5050, () => {
    console.log("listening to port 5050")
})