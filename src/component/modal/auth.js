import React from 'react'
import { Modal } from 'react-bootstrap'

export default function ModalAuth({show, handleClose}) {
  return (
    <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby='contained-modal-title-vcenter'
        centered
    >
        <Modal.Body>
            <div className='d-flex justify-content-center' style={{color: '#0ACF83'}}>Please buy this film if you want to watch</div>
        </Modal.Body>
    </Modal>
  )
}
