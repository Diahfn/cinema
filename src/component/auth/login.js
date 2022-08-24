import React, { useContext, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { API } from '../../config/api'
import { UserContext } from '../../context/userContext'

import { useMutation } from 'react-query'

export default function Login({ login, closeLogin, handleRegister }) {

    const [state, dispatch] = useContext(UserContext)
    const [message, setMessage] = useState(null)
    const [form, setForm] = useState({
        email: '',
        password: '',
    })

    const navigate = useNavigate()
    const api = API()

    const { email, password } = form

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
                    'Content-Type' : 'application/json'
                },
                body: body
            }

            const response = await api.post('/login', config)
            // console.log(response)

            if (response.status === 'Success') {
                dispatch({
                    type: 'LOGIN_SUCCESS',
                    payload: response.data
                })

                if (state.user.status === 'admin') {
                    navigate('/transaction')
                } else {
                    navigate('/homepage')
                }
               
            } else {
                const alert = (
                    <div className='alert alert-danger py-2 fw-bold' role='alert'>
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
        show={login}
        onHide={closeLogin}
        aria-labelledby='contained-modal-title-vcenter'
        centered
    >
        <Modal.Body
            className='body-modal px-4 '
        >
            <h3 className='mt-4 mb-4 fw-bold' style={{color: '#CD2E71'}}>Login</h3>
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
                        autoComplete='off' 
                        style={{backgroundColor: '#333333', border: '2px solid #613D2B', color: '#fff'}}
                    />
                </div>
                <div className='form-group mb-4'>
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
                <div className='d-grid'>
                    <button
                        className='btn mt-3 py-2 fw-bold'>
                            Login 
                    </button>
                </div>
                <div className='text-center mt-3 mb-3'>
                    <p>Don't have an account ? Klik 
                        <b className='here' onClick={handleRegister}> Here</b>
                    </p>
                </div>
            </form>
        </Modal.Body>
    </Modal>
  )
}
