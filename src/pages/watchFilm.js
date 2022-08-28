import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import NavBar from '../component/navBar'

import convertRupiah from 'rupiah-format'
import { useParams } from 'react-router-dom'
import { API } from '../config/api'
import { useQuery } from 'react-query'

export default function WatchFilm() {

    const api = API()
    let { id } = useParams()

    const title = 'Films' 
    document.title = 'Cinema | ' + title

    const [transactions, setTransactions] = useState({})

    let { data: transaction, refetch } = useQuery('Cache', async () => {
        const config = {
            method: 'GET',
            headers: {
              Authorization: 'Basic ' + localStorage.token
            }
        }
        
        const response = await api.get('/watchFilm/' + id, config)
        
        return response.data
    })
    console.log(transaction)

    useEffect(() => {
        let data = transaction.find(item => item.id == id)
        setTransactions(data)
    }, [id])
    console.log(transactions)
        
    return (
        <>
            <NavBar />
        <Container>
            <Row className='my-5'>
                
                <Col>
                    <img
                        alt='film'
                        src={transaction?.film.image}
                        width='270px'
                    />
                </Col>
                <Col style={{flex: '2'}}>
                    <Row className='d-flex flex-column'>
                        <Col className='d-flex justify-content-between'>
                            <div className='h2 mb-3'>{transaction?.film.title}</div>
                            
                        </Col>
                        <Col>
                            <div className='ratio ratio-21x9 my-3'>
                                <iframe width='853px' height='200px' src={transaction?.film.filmUrl}
                                frameBorder='0'
                                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' 
                                title="YouTube video" allowFullScreen />
                            </div>
                        </Col>
                        <Col>
                            <div style={{color: '#CD2E71', fontWeight: 'bold', fontSize: '18px'}}>{convertRupiah.convert(transaction?.film.price)}</div>
                            <div className='my-3 '> {transaction?.film.description}
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
        </>
    )
}
