import React, { useContext, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import NavBar from '../component/navBar'
import dateFormat from 'dateformat'
import convertRupiah from 'rupiah-format'

import blankImg from '../assets/blank-profile.png'
import { API } from '../config/api'
import { useQuery } from 'react-query'
import { UserContext } from '../context/userContext'
import ModalProfile from '../component/modal/modalProfile'

export default function Profile() {

    const title = 'Profile'
    document.title = 'Cinema | ' + title

    const api = API()
    const [state] = useContext(UserContext)
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)

    let { data: profile, refetch: profileRefetch } = useQuery('profileCache', async () => {
        const config = {
            method: 'GET',
            headers: {
              Authorization: 'Basic ' + localStorage.token
            }
        }
        const response = await api.get('/profile', config)
        // console.log(response.data)
        return response.data
    })

    let { data: transactions, refetch: transactionsRefetch } = useQuery('transactionsCache', async () => {
        const config = {
            method: 'GET',
            headers: {
              Authorization: 'Basic ' + localStorage.token
            }
        }
        
        const response = await api.get('/transactions', config)
        // console.log(response.data)
        return response.data
    })
    

    return (
        <>
            <NavBar />
            <Container>
                <Row className='my-5 '>
                    <Col>
                        <div className='h2 mb-4'>My Profile</div>
                        <Row>
                            <Col>
                                <img
                                    alt='profile'
                                    src={profile?.image ? profile.image : blankImg} className='rounded'
                                    style={{imageRendering: 'pixelated', borderRadius: '5px'}}
                                    width='280px'
                                    height='340px'
                                />
                            </Col>
                            <Col>
                                <div className='h5 mb-0' style={{color: '#CD2E71'}}>Full Name</div>
                                <div style={{color: '#616161'}}>{state.user.name}</div>

                                <div className='h5 mb-0 mt-4' style={{color: '#CD2E71'}}>Email</div>
                                <div style={{color: '#616161'}}>{state.user.email}</div>

                                <div className='h5 mb-0 mt-4' style={{color: '#CD2E71'}}>Phone</div>
                                <div style={{color: '#616161'}}>{profile?.phone ? profile?.phone : '-'}</div>
                                <div className='mt-3'>
                                    <button className='profile' onClick={() => setShow(true)}>Edit Profile</button>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col style={{maxWidth: '500px'}}> 
                        <div className='h2 mb-5 '>History Transaction</div>
                        <>
                            {transactions?.length != 0 ? (
                                <div>
                                    {transactions?.map((item, index) => (
                                        <div key={index} style={{background: 'rgba(205, 46, 113, 0.44)', maxWidth: '500px'}} >
                                            <Container fluid className='px-1 my-2 '>
                                                <Row className=' px-4 py-3'>
                                                    <Col>
                                                        <div
                                                            className='fw-bold h6'
                                                        >{item.film.title}</div>
                                                        <div
                                                            style={{fontSize: '12px', marginBottom: '10px'}}
                                                        >{dateFormat(item.createdAt)}</div>
                                                        <div className='total'>Total : {convertRupiah.convert(item.film.price)}</div>
                                                    </Col>
                                                    <Col className='d-flex align-items-end justify-content-end '>
                                                        <div className='rounded  px-5 ' style={{background: 'rgba(0, 255, 71, 0.1)', color: '#00FF47'}}>{item.status}</div>
                                                    </Col>
                                                </Row>
                                            </Container>
                                            </div> 
                                    ))}
                                </div>
                            ) : (
                                <div className=''>No Transaction</div>
                            )}
                            
                        </>
                    </Col>
                </Row>
            </Container>
            <ModalProfile
                show={show}
                handleClose={handleClose}
            />
        </>
    )
}
