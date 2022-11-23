import React from 'react';
import axios from 'axios';
import BookFormModal from './BookFormModal';
import {Button, Carousel, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


let SERVER = process.env.REACT_APP_SERVER;

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      isModalShown: false
    };
  }

  /* TODO: Make a GET request to your API to fetch all the books from the database  */

  closeModal = () => {
    this.setState({
      isModalShown: false
    })
  }

  showModal = (event) => {
    this.setState({
      isModalShown: true,
    })
  }

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

  postBooks = async (aBook) => {
    try {
      let bookAdded = await axios.post(`${SERVER}/books`, aBook);
      console.log(bookAdded);
      this.setState({
        books: [...this.state.books, bookAdded.data]
      })
    } catch (error) {
      console.log('We have an error: ', error.response.data);
    }
  }

  deleteBooks = async (id) => {
    try {
      let url = `${SERVER}/books/${id}`;
      await axios.delete(url);
      let updatedBooks = this.state.books.filter(book => book._id !== id);
      this.setState({
        books: updatedBooks
      })
    } catch (error) {
      console.log('We have an error: ', error.response.data);
    }
  }

  handleBookSubmit = (event) => {
    event.preventDefault();
    let newBook = {
      title: event.target.title.value,
      description: event.target.description.value,
      status: event.target.status.checked
    }
    this.postBooks(newBook);
  }

  componentDidMount() {
    this.getBooks();
  }

  render() {
    /* TODO: render all the books in a Carousel */

    let carouselBooks = this.state.books.map((book) => (
      <Carousel.Item key={book._id}>
        <img
          className="books"
          src="https://images.unsplash.com/photo-1523593288094-3ccfb6b2c192?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1014&q=80"
          alt={book.title}
        />
        <Carousel.Caption>
          <h3 style={{ backgroundColor: 'teal', borderRadius: '5px', width: 'max-content', margin: 'auto', padding: '5px' }}>BestBook: {book.title}</h3>
          <p> is about {book.description}</p>
          <Button onClick={() => this.deleteBooks(book._id)}>Delete Book</Button>
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

        <Button onClick={this.showModal}>Add Book</Button>
        <BookFormModal
          show={this.state.isModalShown}
          onHide={this.closeModal}
          handleSubmit={this.handleBookSubmit}
        />
      </>
    );
  }
}

export default BestBooks;
