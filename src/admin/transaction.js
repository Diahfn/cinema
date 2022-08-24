import React from 'react'
import { Col, Container, Dropdown, Row } from 'react-bootstrap'
import { useQuery } from 'react-query'
import NavbarAdmin from '../component/navbarAdmin'
import { API } from '../config/api'

export default function Transaction() {

    const api = API()

    let { data: transactions, refetch } = useQuery('transactionsCache', async () => {
        const config = {
            method: 'GET',
            headers: {
                Authorization: 'Basic ' + localStorage.token
            }
        }
        const response = await api.get('/all-transaction', config)
        console.log(response.data)
        return response.data
    })

    return (
        <>
            <NavbarAdmin />
            <Container>
                <Row className='my-4'>
                    <div className='h2 my-4'>Incoming Transaction</div>
                    <Col>
                        {transactions?.length != 0 ? (
                            <table className='table my-3 table-dark table-striped'>
                                <thead>
                                    <tr style={{color: '#E50914'}}>
                                        <th>No</th>
                                        <th>Users</th>
                                        <th>Bukti Transfer</th>
                                        <th>Film</th>
                                        <th>Number Account</th>
                                        <th>Status Payment</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transactions?.map((item, index) => (
                                        <tr key={index} className='fw-light'>
                                            <td>{index + 1}</td>
                                            <td>{item.buyer.fullname}</td>
                                            <td>{item.transferProof}</td>
                                            
                                            <td>{item.film.title}</td>
                                            <td>{item.accountNumber}</td>
                                            <td style={{color: '#0ACF83', fontWeight: '600'}}>Approved</td>
                                            <td>
                                                 <Dropdown>
                                                    <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary" />

                                                    <Dropdown.Menu variant="dark">
                                                        <Dropdown.Item href="#" style={{color: '#0ACF83', fontWeight: '500'}}>Approved</Dropdown.Item>
                                                        <Dropdown.Divider />
                                                        <Dropdown.Item href="#" style={{color: '#FF0000', fontWeight: '500'}}>Cancel</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="text-center pt-5">
                                <div className="mt-3">No data product</div>
                            </div>
                        )}
                    </Col>
                </Row>
            </Container>
        </>
        
    )
}
