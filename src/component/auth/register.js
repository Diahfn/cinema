import React, { useContext, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { API } from '../../config/api'
import { UserContext } from '../../context/userContext'
import { useMutation } from 'react-query'

export default function Register({ register, handleLogin,closeRegister }) {

    const [message, setMessage] = useState(null)
    const [state, dispatch] = useContext(UserContext)
    const [form, setForm] = useState({
        email: '',
        password: '',
        fullname: ''
    })

    const { email, password, fullname } = form
    const api = API() 

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = useMutation(async (e) => {
        try {

            e.preventDefault()

            const body = JSON.stringify(form)

            const config = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: body
            }

            const response = await api.post('/register', config)

            if (response.status === 'Success') {
                const alert = (
                    <div className='alert alert-dark py-2 fw-bold' role='alert'>
                        Register Success
                    </div>
                )
                setMessage(alert)
                setForm({
                    fullname: '',
                    email: '',
                    password: ''
                })
            } else {
                const alert = (
                    <div className='alert alert-dark py-2 fw-bold' role='alert'>
                        {response.message} 
                    </div>
                )
            setMessage(alert)
            }
            
        } catch (error) {
            console.log(error)
            const alert = (
                <div className='alert alert-danger py-2 fw-bold' role='alert'>
                    Server Error
                </div>
            )
            setMessage(alert)
        }
    })

  return (
    <Modal
        size='sm'
        show={register}
        onHide={closeRegister}
        aria-labelledby='contained-modal-title-vcenter'
        centered
    >
        <Modal.Body
            className='body-modal px-4 py-4'
        >
            <h3 className='mt-2 mb-4 fw-bold' style={{color: '#CD2E71'}}>Register</h3>
            <form onSubmit={(e) => handleSubmit.mutate(e)}>
                {message && message}
                <div className='form-group mb-3'>
                    <input
                        className='form-control' 
                        type='email' 
                        name='email' 
                        placeholder='Email'
                        onChange={handleChange}
                        value={email}
                        autoComplete='off'                           style={{backgroundColor: '#333333', border: '2px solid #613D2B', color: '#fff'}}
                    />
                </div>
                <div className='form-group mb-3'>
                    <input
                        className='form-control' 
                        type='password' 
                        name='password' 
                        placeholder='Password'
                        style={{backgroundColor: '#333333', border: '2px solid #613D2B', color: '#fff'}}
                        onChange={handleChange}
                        value={password}
                        autoComplete='off'                             
                    />
                </div>
                <div className='form-group mb-4'>
                    <input
                        className='form-control' 
                        type='text' 
                        name='fullname' 
                        placeholder='Full Name'
                        onChange={handleChange}
                        value={fullname}
                        autoComplete='off'                              
                        style={{backgroundColor: '#333333', border: '2px solid #613D2B', color: '#fff'}}
                    />
                </div>
                <div className='d-grid'>
                    <button
                        style={{backgroundColor: '#613D2B', color: 'white', fontSize: '15px'}} 
                        className='btn mt-2 fw-bold'>
                            Register 
                    </button>
                </div>
                <div className='text-center mt-3'>
                    <p>Already have an account ? Klik 
                        <b className='here fw-bold' onClick={handleLogin} > Here</b>
                    </p>
                </div>
            </form>
        </Modal.Body>
    </Modal>
  )
}
