const express = require('express');
const app = express();
require('dotenv').config();
require('express-async-errors');
const db = require('./models');
const fileUpload = require('express-fileupload');

const adminRouter = require('./routes/adminRoute');
const userRouter = require('./routes/userRoute');

const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());
console.log(process.env.PASSWORD);

//image upload
app.use(
    fileUpload({
        limits: {
            fileSize: 1024 * 1024, // 1 MB
        },
        abortOnLimit: true,
        createParentPath: true,
    })
);

// routes
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/uploads', express.static('uploads'));

//middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

//database connection
db.sequelize
    .sync()
    .then(() => {
        // eslint-disable-next-line no-console
        console.log('Synced db.');
    })
    .catch((err) => {
        // eslint-disable-next-line no-console
        console.log('Failed to sync db: ' + err.message);
    });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is running on port ${PORT}.`);
});
