import React, { useState } from 'react'
import { Col, Container, Row, Modal } from 'react-bootstrap'
import NavBar from '../component/navBar'

import convertRupiah from 'rupiah-format'
import { useNavigate, useParams } from 'react-router-dom'
import { API } from '../config/api'
import { useMutation, useQuery } from 'react-query'
import payment from '../assets/payment.png'
import ModalAuth from '../component/modal/auth'

export default function DetailFilm() {

    let { id } = useParams()
    const api = API()
    const navigate = useNavigate()
    const [modal, setModal] = useState(false)
    const handleClose = () => setModal(false)

    const title = 'Films'
    document.title = 'Cinema | ' + title

    const [show, setShow] = useState(false)
    const [form, setForm] = useState({
        accountNumber: '',
        transferProof: ''
    })
 
    let { data: film, refetch } = useQuery('Cache', async () => {
        const config = {
            method: 'GET',
            headers: {
                Authorization: 'Basic ' + localStorage.token
            }
        }
        const response = await api.get('/film/' + id, config)
        console.log(response.data)
        return response.data
    })
    
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]:
                e.target.type === 'file' ? e.target.files : e.target.value
        })
    }
    
    const buyFilm = useMutation(async (e) => {
        try {

            e.preventDefault()

            const formData = new FormData()
            formData.set('transferProof', form?.transferProof[0], form?.transferProof[0]?.name)
            formData.set('accountNumber', form.accountNumber)
            formData.set('idFilm', film.id)
            formData.set('idSeller' , film.user.id)

            const config = {
                method: 'POST',
                headers: {
                    Authorization: 'Basic ' + localStorage.token
                },
                body: formData
            }

            await api.post('/transaction', config)

            navigate('/profile')
            
        } catch (error) {
            console.log(error)
        }
    })
    
  return (
    <>
        <NavBar />
        <Container>
            <Row className='my-5'>
                <Col>
                    <img
                        alt='film'
                        src={film?.image}
                        width='270px'
                    />
                </Col>
                <Col style={{flex: '2'}}>
                    <Row className='d-flex mx-0 px-0 flex-column'>
                        <Col className='d-flex mx-0 px-0 justify-content-between'>
                            <div className='h2 mb-3'>{film?.title}</div>
                            <div>
                                <button className='buy' onClick={() => setShow(true)}>Buy Now</button>
                            </div>
                        </Col>
                        <Col>
                            <div className='ratio ratio-21x9 my-3' onClick={() => setModal(true)}>
                                <iframe width='853px' height='200px' src={film?.filmUrl} className='frame'
                                frameBorder='0'
                                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' 
                                title="YouTube video" allowFullScreen />
                            </div>
                        </Col>
                        <Col>
                            <div style={{color: '#CD2E71', fontWeight: 'bold', fontSize: '18px'}}>{convertRupiah.convert(film?.price)}</div>
                            <div className='my-3 '> {film?.description}
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>

        <Modal
            size='sm'
            show={show}
            onHide={() => setShow(false)}
            aria-labelledby='contained-modal-title-vcenter'
            centered
        >
            <Modal.Body className='body-modal' style={{width: '400px'}}>
                <div className='d-flex justify-content-center fw-bold h5 my-3'>
                    Cinema <div style={{color: '#CD2E71'}} className='mx-1'>Online</div> : 0981312323
                </div>
                <div className='my-4'>
                    <div className='fw-bold h6'>{film?.title}</div>
                    <div className='d-flex' style={{fontSize: '14px', fontWeight: '500'}}>Total : <div style={{color: '#CD2E71'}} className='mx-1'>{convertRupiah.convert(film?.price)}</div></div>
                    <div>
                        <input
                            className='form-control my-1 mt-3' 
                            name='accountNumber' 
                            placeholder='Input Your Account Number'
                            autoComplete='off' 
                            onChange={handleChange}
                            style={{backgroundColor: '#333333', border: '2px solid #BCBCBC', color: '#fff'}}
                        />
                    </div>
                    <div className='d-flex align-items-center'>
                        <label className='d-flex payment my-1 px-2 py-2' >
                            Attach Payment
                            <img
                                alt=''
                                src={payment}
                                className='mx-1'
                                width='23px'
                            />
                            <input
                                type='file'
                                id='upload'
                                name='transferProof'
                                onChange={handleChange}
                               hidden
                            />
                        </label>
                        <small className='smll mx-1'>*tranfers can be made to holyways accounts</small>
                    </div>
                    <div className='d-grid'>
                        <button className='btn mt-4 py-2 fw-bold' onClick={(e) => buyFilm.mutate(e)}>
                            Pay
                        </button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>

        <ModalAuth
            show={modal}
            handleClose={handleClose}
        />

    </>
  )
}
