import React from 'react'
import { Modal } from 'react-bootstrap'

export default function FilmModal({show, handleClose}) {
  return (
    <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby='contained-modal-title-vcenter'
        centered
    >
        <Modal.Body>
            <div className='d-flex justify-content-center' style={{color: '#0ACF83'}}>Add film Success</div>
        </Modal.Body>
    </Modal>
  )
}
