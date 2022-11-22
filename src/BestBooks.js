import React from 'react';
import axios from 'axios';
import {Carousel, Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import holder from './holder'

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
    console.log(holder[0]);
    /* TODO: render all the books in a Carousel */
    let carouselBooks = this.state.books.map((book) => (
      <Carousel.Item key={book._id}>
        <img
        className="books"
        src="https://images.unsplash.com/photo-1523593288094-3ccfb6b2c192?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1014&q=80"
        alt={book.title}
        />
        <Carousel.Caption>
          <h3 style={{ backgroundColor: 'teal', borderRadius: '5px', width: 'max-content', margin: 'auto', padding: '5px' }}>Title: {book.title}</h3>
          <p> is about {book.description}</p>
        </Carousel.Caption>
      </Carousel.Item>
    ))

        return (
        <>
          <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

          {this.state.books.length > 0 ? (
            <Container>
            <Carousel>
              {carouselBooks}
            </Carousel>
          </Container>
          ) : (
            <h3>No Books Found :(</h3>
          )}
        </>
        );
  }
}

        export default BestBooks;
