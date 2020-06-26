const _ = require('lodash');
const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLSchema
} = graphql;

// Dummy data
const arrBooks = [
    {id: '1', name: 'Name Of The Wind', gener: 'Fantacy', authorId: '1'},
    {id: '2', name: 'The Final Empire', gener: 'Fantacy', authorId: '2'},
    {id: '3', name: 'The Long Earth', gener: 'Sci-Fi', authorId: '3'},
    {id: '4', name: 'The Hero Of Ages', gener: 'Fantacy', authorId: '2'},
    {id: '5', name: 'The Color Of Magic', gener: 'Fantacy', authorId: '3'},
    {id: '6', name: 'The Light Fantastic', gener: 'Fantacy', authorId: '3'},
];

const arrAuthors = [
    {id: '1', name: 'Mirza Trejo', age: 32},
    {id: '2', name: 'Rey Esquivel', age: 44},
    {id: '3', name: 'Jagoda Lara', age: 53},
];

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        gener: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent, args) { 
                return _.find(arrAuthors, {id: parent.authorId});
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        books: {
            type: GraphQLList(BookType),
            resolve(parent, args) {
                return _.filter(arrBooks, {authorId: parent.id});
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {
                id: {type: GraphQLID}
            },
            resolve(parent, args) {
                return _.find(arrBooks, {id: args.id});
            }
        },
        author: {
            type: AuthorType,
            args: {
                id: {type: GraphQLID}
            },
            resolve(parent, args) {
                return _.find(arrAuthors, {id: args.id});
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});