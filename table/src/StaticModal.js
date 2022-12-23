import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function StaticModal() {
  return (
    <div
        className="modal show"
        style={{ display: 'block'}}
      >
        <Modal.Dialog>
          <Modal.Header closeButton>
            <Modal.Title>Modal title</Modal.Title>
          </Modal.Header>
  
          <Modal.Body>
            <p>Modal body text goes here.</p>
          </Modal.Body>
  
          <Modal.Footer>
            <Button variant="secondary">Close</Button>
            <Button variant="primary" >Save changes</Button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
  )
}

export default StaticModal
