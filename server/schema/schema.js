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
const Book = require('../models/book');
const Author = require('../models/author');

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        gener: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent, args) { 
                // Get author from the database using parent
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
                // Get books from the database using parent
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
                // Get book from the database
            }
        },
        books: {
            type: GraphQLList(BookType),
            resolve(parent, args) {
                // Get books from the database
            }
        },
        author: {
            type: AuthorType,
            args: {
                id: {type: GraphQLID}
            },
            resolve(parent, args) {
                // Get author from the database
            }
        },
        authors: {
            type: GraphQLList(AuthorType),
            resolve(parent, args) {
                // Get authors from the database
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: GraphQLString},
                age: { type: GraphQLInt }
            },
            resolve(parent, args) {
                let { name, age } = args;
                let author = new Author({ name, age });
                return author.save();
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: GraphQLString },
                gener: { type: GraphQLString },
                authorId: { type: GraphQLString }
            },
            resolve(parent, args) {
                let { name, gener, authorId } = args;
                let book = new Book({ name, gener, authorId });
                return book.save();
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});