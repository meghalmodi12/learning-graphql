require('dotenv').config();

const app = require('express')();
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./schema/schema');

mongoose.connect(`mongodb://${process.env.DBUsername}:${process.env.DBPassword}@${process.env.DBURL}`);
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