import React, {useEffect} from 'react'
import { Container, Row } from 'react-bootstrap'
import NavBar from '../component/navBar'

import deadpool from '../assets/deadpool.png'
import FilmCard from '../component/card/filmCard'
import { API } from '../config/api'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'

export default function LandingPage() {

    const title = 'Homepage'
    document.title = 'Cinema | ' + title

    const api = API()
    const navigate = useNavigate()

    let { data: film, refetch } = useQuery('filmCache', async () => {
        const config = {
            method: 'GET',
            headers: {
                Authorization: 'Basic ' + localStorage.token
            }
        }

        let response = await api.get('/my-film', config)
        
        return response.data
    })

    const buy = () => {
        navigate('/film/2')
    }
    
  return (
    <>
        <NavBar />
        <Container>
            
            <Row className='d-flex align-items-center mt-4'>
                <div className='bg d-flex justify-content-center'>
                    <img
                        alt='film'
                        src={deadpool}
                        style={{maxWidth: '1000px'}}
                    />
                    <div className='mx-0 px-0 desc '>
                        <div style={{color: '#A52620'}} className='h1 mb-0 fw-bold'>DEAD</div>
                        <div className='h1 mb-3 fw-bold'>POOL</div>
                        <h5 className='fw-bold'>Action</h5>
                        <h5 style={{color: '#CD2E71', fontWeight: 'bold', marginBottom:'20px'}}>RP. 99,000</h5>
                        <div style={{fontSize: '13px', lineHeight: '24px', width: '730px'}}>
                            Hold onto your chimichangas, folks. From the studio that brought you all 3 Taken films comes the block-busting, fourth-wall-breaking masterpiece about Marvel Comics’ sexiest anti-hero! Starring God’s perfect idiot Ryan Reynolds and a bunch of other "actors," DEADPOOL is a giddy slice of awesomeness packed with more twists than Deadpool’s enemies’ intestines and more action than prom night. Amazeballs!
                        </div>
                        <button className='buy my-3' onClick={buy}>Buy Now</button>
                    </div>
                    
                </div>
            </Row>
            <Row className='my-5'>
                <h4>List Film</h4>
                <div className='d-flex flex-wrap justify-content-center mt-2 mx-0' >
                    {film?.map((item, index) => (
                        <div key={index}>
                            <FilmCard item={item}  />
                        </div>
                    ))}
                    
                    
                </div>
            </Row>
        </Container>
    </>
  )
}
