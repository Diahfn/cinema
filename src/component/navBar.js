import React, { useContext } from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'

import user from '../assets/user-nav.png'
import profile from '../assets/user.png'
import clip from '../assets/clapperboard.png'
import log from '../assets/logout.png'
import complain from '../assets/complain.svg'

import { Link, useNavigate } from 'react-router-dom'
import brand from '../assets/brand.png'
import { UserContext } from '../context/userContext'

 
export default function NavBar() {

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
        <Navbar expand='lg' className='sticky-top mx-0' style={{background: '#0D0D0D'}}>
            <Container>
                <Navbar.Brand href='/homepage'>
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
                                <NavDropdown.Item as={Link} to='/profile' style={{fontWeight: '600'}}>
                                    <img
                                        alt='profile' src={profile} className='nav-icon my-1'
                                    />
                                    Profile
                                </NavDropdown.Item>
                                <NavDropdown.Item as={Link} to='/my-film' style={{fontWeight: '600'}}>
                                    <img
                                        alt='list' src={clip} className='nav-icon my-1'
                                    />
                                    My List Film
                                </NavDropdown.Item>
                                <NavDropdown.Item as={Link} to='/complain' style={{fontWeight: '600'}}>
                                    <img
                                        alt='' src={complain} className='nav-icon my-1 logo' 
                                    />
                                    Complain
                                </NavDropdown.Item>
                                <NavDropdown.Divider style={{borderColor: '#fff'}} />
                                <NavDropdown.Item onClick={logout} style={{fontWeight: '600'}}>
                                    <img
                                        alt='logout' src={log} className='nav-icon my-1 '
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
