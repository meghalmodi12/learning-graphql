const app = require('express')();
const graphqlHTTP = require('express-graphql');

const schema = require('./schema/schema');

app.use('/graphql', graphqlHTTP({ 
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('Running express app on port 4000');
});