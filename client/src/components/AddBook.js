import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import { getBooksQuery, getAuthorsQuery, addBookMutation } from '../queries/queries';

class AddBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            genre: '',
            authorId: ''
        };
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.addBookMutation({
            variables: {
                name: this.state.name,
                genre: this.state.genre,
                authorId: this.state.authorId
            },
            refetchQueries: [
                {query: getBooksQuery}
            ]
        });
    }

    displayAuthors() {
        const data = this.props.getAuthorsQuery;
        if (data.loading) {
            return <option disabled>Loading authors...</option>;
        } else {
            return data.authors.map(author => <option key={author.id} value={author.id}>{ author.name }</option>)
        }
    }

    render() {
        return (
            <form id="add-book" onSubmit={this.handleSubmit}>
                <div className="field">
                    <label>Book Name:</label>
                    <input name="name" type="text" onChange={this.handleChange} />
                </div>
                <div className="field">
                    <label>Genre:</label>
                    <input name="genre" type="text" onChange={this.handleChange} />
                </div>
                <div className="field">
                    <label>Author:</label>
                    <select name="authorId" onChange={this.handleChange}>
                        <option>Select author</option>
                        { this.displayAuthors() }
                    </select>
                </div>
                <button>+</button>
            </form>
        )
    }
}

export default compose(
    graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
    graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);