import React, { useContext } from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'

import log from '../assets/logout.png'
import add from '../assets/add.png'
import user from '../assets/user-nav.png'
import complain from '../assets/complain.svg'

import brand from '../assets/brand.png'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/userContext'

export default function NavbarAdmin() {

    const navigate = useNavigate()

    const [state, dispatch] = useContext(UserContext)

    // Function if user logout
    const logout = () => {
        dispatch({
        type: 'LOGOUT'
        })
        navigate('/auth')
        console.log(state)
    }
  return (
    <>
        <Navbar expand='lg' className='sticky- mx-0' style={{background: '#0D0D0D'}}>
            <Container>
                <Navbar.Brand href='/transaction'>
                    <img
                        alt='brand'
                        src={brand}
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='responsive-navbar-nav'>
                    <Nav className='ms-auto py-0'>

                        <NavDropdown 
                            title={
                                <div>
                                    <img style={{width: '50px'}}
                                        alt='user'
                                        src={user} className='user dropdown-toggle'
                                    />
                                </div>
                            }
                            id='collasible-nav-dropdown' className='my-0 py-0 ' menuVariant='dark'
                        >
                            <NavDropdown.Item as={Link} to='/add-film' style={{fontWeight: '600'}}>
                                <img
                                    alt='add film' src={add} className='nav-icon my-1'
                                />
                                Add Film
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to='/adminComplain' style={{fontWeight: '600'}}>
                                <img
                                    alt='list' src={complain} className='nav-icon my-1'
                                />
                                Complain
                            </NavDropdown.Item>
                            <NavDropdown.Divider style={{borderColor: '#fff'}} />
                            <NavDropdown.Item onClick={logout} style={{fontWeight: '600'}}>
                                <img
                                    alt='list' src={log} className='nav-icon my-1'
                                />
                                Logout
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </>
  )
}
