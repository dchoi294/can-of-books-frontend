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
            <Modal.Title>Modal HEADER</Modal.Title>
          </Modal.Header>

          <Modal.Body>

            <Form onSubmit={this.props.handleBookSubmit}>

              <Form.Group className="mb-3" controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="status">
                <Form.Check type="checkbox" label="status" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Enter
              </Button>
            </Form>

          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.closeModal}>Close</Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }
}
export default BookFormModal;
