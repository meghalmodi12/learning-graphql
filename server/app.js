require('dotenv').config({ path: `${__dirname}/.env` });

const app = require('express')();
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const cors = require('cors');
const schema = require('./schema/schema');

// Allow cross-origin requests
app.use(cors());

// Connect to mLab database
mongoose.connect(`mongodb://${process.env.DBUsername}:${process.env.DBPassword}@${process.env.DBURL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.once('open', () => {
    console.log('Connected to the database.');
})

app.use('/graphql', graphqlHTTP({ 
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('Running express app on port 4000');
});