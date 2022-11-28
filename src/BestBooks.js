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
      isModalShown: false,
      mode: 'add',
      bookToChange: {}
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

  updateBooks = async (bookToUpdate) => {
    try {
      let url = `${process.env.REACT_APP_SERVER}/books/${bookToUpdate._id}`;
      let updateBookObj = await axios.put(url, bookToUpdate);
      // find the book we updated in state and replace it with the data we got back from the DB
      let updatedBooksArray  = this.state.books.map(book => {
        return book._id === bookToUpdate._id ? updateBookObj.data : book;
      });
      this.setState({
        books: updatedBooksArray,
      });
    } catch (err) {
      console.log('We have an error: ', err.response.data);
    }
  }

  handleBookUpdate = (event) => {
    event.preventDefault();
    let Book = {
      title: event.target.title.value || this.state.bookToChange.title,
      description: event.target.description.value || this.state.bookToChange.description,
      status: event.target.status.checked || this.state.bookToChange.status,
      __v: 0,
      _id: this.state.bookToChange._id,
    }
    this.setState({
      isModalShown: false,
    })
    this.updateBooks(Book);
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
          src="https://assets.brightspot.abebooks.a2z.com/dims4/default/de7428b/2147483647/strip/true/crop/400x300+0+0/resize/620x465!/quality/90/?url=http%3A%2F%2Fabebooks-brightspot.s3.amazonaws.com%2F3d%2Fd0%2F377fac1c424a824dede413c301f1%2Frare-books.png"
          alt={book.title}
        />
        <Carousel.Caption>
          <h3 style={{ backgroundColor: 'teal', borderRadius: '5px', width: 'max-content', margin: 'auto', padding: '5px' }}>BestBook: {book.title}</h3>
          <p> is about {book.description}</p>
          <Button onClick={() => this.deleteBooks(book._id)}>Delete Book</Button>
          <Button onClick={() => this.setState({isModalShown: true, mode: 'update', bookToChange: book})}>Update Book</Button>
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
          mode={this.state.mode}
          handleAddBook={this.handleBookSubmit}
          handleUpdateBook={this.handleBookUpdate}
          updateBooks={this.updateBooks}
          bookToChange={this.state.bookToChange}
        />
      </>
    );
  }
}

export default BestBooks;
