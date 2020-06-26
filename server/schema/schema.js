const _ = require('lodash');
const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema
} = graphql;

// Dummy data
const arrBooks = [
    {id: '1', name: 'Name Of The Wind', gener: 'Fantacy'},
    {id: '2', name: 'The Final Empire', gener: 'Fantacy'},
    {id: '3', name: 'The Long Earth', gener: 'Sci-Fi'}
];

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        gener: {type: GraphQLString}
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {
                id: {type: GraphQLString}
            },
            resolve(parent, args) {
                return _.find(arrBooks, {id: args.id});
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});