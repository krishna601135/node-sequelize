const express = require('express');
const db = require('./models');
const userRouter = require('./routes/userRoutes');

const app = express();
const PORT = 4000;

//middlewares
app.use(express.json())



db.sequelize.sync({alter: true})
.then(() => {
   console.log('Tables Have Been Synced With Alter..');

})


//user routes
app.use('/api', userRouter);

app.listen(PORT, () => {
 console.log(`server is running at http://localhost:${PORT}`);
});
