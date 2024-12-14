const express = require('express'),
    app = express(),
    dotenv = require('dotenv'),
    obj = require('./models/index'),
    notesRoutes = require('./routes/noteRoutes'),
    cors = require('cors');
dotenv.config();

app.use(cors());
app.use(express.json());

app.use('/api/notes', notesRoutes);

app.use((req, res, next) => {
    res.status(404).json({
        error: 'Bad Request',
    });
});

obj.sequelize
    .sync()
    .then(() => {
        console.log('Synced db.');
    })
    .catch((err) => {
        console.log('Failed to sync db: ' + err.message);
    });

app.listen(process.env.PORT || 4040, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT} || 4040`);
});