import React from 'react'
import { Modal } from 'react-bootstrap'

export default function Transfer() {
  return (
    <Modal>
        <Modal.Body>
            <div>Transfer Saldo</div>
            <div>
                <form>
                    <div className='form-group mb-3'>
                        <input/>
                    </div>
                </form>
            </div>
        </Modal.Body>
    </Modal>
  )
}
