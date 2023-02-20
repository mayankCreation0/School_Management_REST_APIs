const express = require('express')
const connect = require('./db/db')
const adminRouter = require('./routes/adminRoutes');
const teacherRouter = require('./routes/teacherRoutes')
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());
app.use('/', routers),
    app.get('/', (req, res) => {
        res.send("Server is Live")
    })
app.use("/", adminRouter);
app.use("/", teacherRouter);

const PORT = 5000 || process.env.PORT;
connect()
    .then(() => (
        console.log("listening")
    ))
    .catch((error) => (
        console.log(error)
    ))
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})