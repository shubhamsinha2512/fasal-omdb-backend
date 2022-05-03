const mongoose = require('mongoose');
const app = require('./app');

const PORT = process.env.PORT || 3000;
const DB_USER = process.env.DB_USER;
const DB_PWD = process.env.DB_PWD;
const DB_NAME = process.env.DB_NAME;

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PWD}@testcluster.4cqpg.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
    {
        useNewUrlParser : true,
    }
)
.then(conn => {
    // console.log(conn)
    console.log('Connected to MongoDB')
})


app.listen(PORT, ()=> console.log(`Server running @ PORT ${PORT}`))