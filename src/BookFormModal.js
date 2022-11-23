import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

class BookFormModal extends React.Component {

  render() {
    return (
      <>
        <Modal
          show={this.props.show}
          onHide={this.props.onHide}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>{this.props.mode === 'switch' ? 'Add Books' : 'Update Books'} </Modal.Title>
          </Modal.Header>

          <Modal.Body>

            <Form onSubmit={this.props.mode === 'switch' ? this.props.handleSubmit : this.props.handleBookUpdate}>

              <Form.Group className="mb-3" controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder={this.props.mode === 'switch' ? "Title" : this.props.bookToChange.title}/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" placeholder={this.props.mode === 'switch' ? "Add description" : this.props.bookToChange.description}/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="status">
                <Form.Check type="checkbox" label="status" />
              </Form.Group>
              <Button variant="primary" type="submit" onClick={this.props.onHide}>
                Enter
              </Button>
            </Form>

          </Modal.Body>

          <Modal.Footer>
            {/* <Button variant="secondary" onClick={this.props.onHide}>Close</Button> */}
          </Modal.Footer>
        </Modal>
      </>
    )
  }
}
export default BookFormModal;
