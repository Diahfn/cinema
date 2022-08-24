import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import NavBar from '../component/navBar'

import { API } from '../config/api'
import { useParams, Link } from 'react-router-dom'
import { useQuery } from 'react-query'


export default function MyListFilm() {

    const api = API()

    let { data: transactions, refetch: transactionsRefetch } = useQuery('transactionsCache', async () => {
        const config = {
            method: 'GET',
            headers: {
              Authorization: 'Basic ' + localStorage.token
            }
        }
        
        const response = await api.get('/transactions', config)
        
        return response.data
    })
    

  return (
    <>
        <NavBar />
        <Container>
            <Row>
                <Col md='6' className='w-100'>
                    <div className='h2 mx-5 my-3'>My List Film</div>
                                {transactions?.length != 0 ? (
                                    <div className='d-flex'>
                                        {transactions?.map((item, index) => (
                                            <div className='card mx-4 my-4' style={{backgroundColor: '#181818', width: '180px', border: 'none'}} key={index}>
                                                <Link
                                                    to={`/watchFilm/` + item.id}
                                                    style={{ textDecoration: 'none' }}
                                                >
                                                    <div>
                                                        <img src={item.film.image} alt='movie image' width='180px' className='rounded'/>
                                                    </div>
                                                </Link>
                                            </div>
                                        ))} 
                                    </div>
                                ) : (
                                    <div className='h3 d-flex justify-content-center ' >
                                    No movie purchases yet
                                    </div>
                                ) }     
                    </Col>
                </Row>
        </Container>
    </>
  )
}
