import { gql } from 'apollo-boost';

const getBooksQuery = gql`
    {
        books {
            id
            name
            genre
        }
    }
`

const getAuthorsQuery = gql`
    {
        authors {
            id
            name
            age
        }
    }
`

const addBookMutation = gql`
    mutation($name: String!, $genre: String!, $authorId: String!) {
        addBook(name: $name, genre: $genre, authorId: $authorId) {
            id
            name
        }
    }
`

const getBookQuery = gql`
    query($id: ID!) {
        book(id: $id) {
            id
            name
            genre
            author {
                id
                name
                age
                books {
                    id
                    name 
                }
            }
        }
    }
`

export {
    getBooksQuery,
    getAuthorsQuery,
    addBookMutation,
    getBookQuery
};