import React from 'react';
import axios from 'axios';
import {Carousel, Container} from 'react-boostrap';

let SERVER = process.env.REACT_APP_SERVER;

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    };
  }

  /* TODO: Make a GET request to your API to fetch all the books from the database  */

  getBooks = async () => {
    try {
      let results = await axios.get(`${SERVER}/books`);
      this.setState({
        books: results.data
      })
    } catch (error) {
      console.log('we have an error: ', error.response.data)
    }
  }

  componentDidMount() {
    this.getBooks();
  }

  render() {

    /* TODO: render all the books in a Carousel */
    let carouselItems = this.state.books.map(book => (
      <Carousel.Item key={book._id}>
        <Carousel.Caption>
          <h3 style={{ backgroundColor: 'teal', borderRadius: '5px', width: 'max-content', margin: 'auto', padding: '5px' }}>Title: {book.title}</h3>
        </Carousel.Caption>
      </Carousel.Item>
    ))

    let books = this.state.books.map((book) => (
      <p key={book._id}>{book.title} is about {book.description}</p>
    ))

        return (
        <>
          <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

          {this.state.books.length > 0 ? (
            { books }
          ) : (
            <h3>No Books Found :(</h3>
          )}

          {
            <Container>
              <Carousel>
                {carouselItems}
              </Carousel>
            </Container>
          }
        </>
        );
  }
}

        export default BestBooks;
