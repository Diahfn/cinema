import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { useMutation } from 'react-query'
import { API } from '../../config/api'

import thumb from '../../assets/thumb.png'

export default function ModalProfile({ show, handleClose }) {

    const [message, setMessage] = useState(null)
    const [form, setForm] = useState({
        phone: '',
        image: ''
    })

    const api = API() 

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]:
                e.target.type === 'file' ? e.target.files : e.target.value
        })
    }

    const handleSubmit = useMutation(async (e) => {
        try {

            e.preventDefault()

            const formData = new FormData()
            formData.set('image', form?.image[0], form?.image[0]?.name)
            formData.set('phone', form.phone)

            const config = {
                method: 'POST',
                headers: {
                    Authorization: 'Basic ' + localStorage.token
                },
                body: formData
            }

            const response = await api.post('/profile', config)
            console.log(response)

            const alert = (
                <div className='alert alert-dark py-2 fw-bold' role='alert'>
                    Add Profile Success
                </div>
            )

            setMessage(alert)
            setForm({
                phone: '',
                image: ''
            })
            
        } catch (error) {
            console.log(error)
        }
    })

    return (
        <Modal 
            size='sm'
            show={show}
            onHide={handleClose}
            aria-labelledby='contained-modal-title-vcenter'
            centered
        >
            <Modal.Body className='body-modal px-4'>
                <h3 className='mt-4 mb-4 fw-bold' style={{color: '#CD2E71'}}>Add Profile</h3>
                <form onSubmit={(e) => handleSubmit.mutate(e)}>
                    {message && message}
                    <div>
                        <input
                            className='form-control my-1 mt-3' 
                            name='phone' 
                            placeholder='Input Your Phone Number'
                            autoComplete='off' 
                            onChange={handleChange}
                            style={{backgroundColor: '#333333', border: '2px solid #BCBCBC', color: '#fff'}}
                        />
                    </div>
                    <div className='d-flex align-items-center'>
                        <label className='d-flex imagePro my-1 px-2 py-2' >
                            Attach Image
                            <img
                                alt=''
                                src={thumb}
                                className='mx-2'
                                width='15px'
                            />
                            <input
                                type='file'
                                id='upload'
                                name='image'
                                onChange={handleChange}
                               hidden
                            />
                        </label>
                    </div>
                    <div className='d-grid'>
                        <button className='btn mt-4 py-2 fw-bold'>
                            Edit Profile
                        </button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    )
}
