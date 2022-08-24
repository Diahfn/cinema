import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import NavbarAdmin from '../component/navbarAdmin'

import thumbnail from '../assets/thumb.png'
import { useNavigate } from 'react-router-dom'
import {useMutation, useQuery} from 'react-query'
import { API } from '../config/api'
import FilmModal from '../component/modal/film'

export default function AddFilm() {

    const title = 'Films'
    document.title = 'Cinema | ' + title

    const api = API()

    const [show, setShow] = useState(false)
    const [categoryId, setCategoryId] = useState([])
    const [form, setForm] = useState({
        title: '',
        price: '',
        filmUrl: '',
        description: '',
        image: ''
    })

    const handleClose = () => setShow(false)
    const showModal = () => setShow(true)

    let { data: categories, refetch } = useQuery('categoriesCache', async () => {
        const response = await api.get('/categories')
        // console.log(response.data.data)
        return response.data.data
    })

    
    const handleChangeCategoryId = (e) => {
        const id = e.target.value
        const checked = e.target.checked

        if (checked == true) {
            setCategoryId([...categoryId, parseInt(id)])
            console.log(categoryId, parseInt(id))
        } else {
            let newCategory = categoryId.filter((categoryItem) => {
                return categoryItem != id
            })
            setCategoryId(newCategory)
        }
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.type === 'file' ? e.target.files : e.target.value
        })
    }

    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault()

            const formData = new FormData()
            formData.set('image', form?.image[0], form?.image[0]?.name)
            formData.set('title', form.title)
            formData.set('price', form.price)
            formData.set('filmUrl', form.filmUrl)
            formData.set('description', form.description)
            formData.set('categoryId', categoryId)

            const config = {
                method: 'POST',
                headers: {
                    Authorization: 'Basic ' + localStorage.token
                },
                body: formData
            }

            const response = await api.post('/film', config)
            // console.log(response)

            showModal()
            setForm({
                title: '',
                price: '',
                filmUrl: '',
                description: '',
                image: ''
            })

        } catch (error) {
            console.log(error)
        }
    })

  return (
    <>
        <NavbarAdmin />
        <Container>
            <Row className='my-4'>
                <div className='h2 mb-4'>Add Film</div>
                <Col>
                    <form onSubmit={(e) => handleSubmit.mutate(e)}>
                        <div className='d-flex my-3'>
                            <input
                                type='text'
                                placeholder='Title'
                                name='title'
                                className='form-control'
                                onChange={handleChange}
                                autoComplete='off'  
                                style={{
                                    backgroundColor: 'rgba(210, 210, 210, 0.25)',
                                    border: '2px solid #D2D2D2',
                                    color: '#D2D2D2'
                                }}
                            />
                                <label className='d-flex label-from' >
                                    Attach Thumbnail
                                    <img
                                        alt=''
                                        src={thumbnail}
                                        className='thumbnail mx-3'
                                    />
                                    <input
                                        type='file'
                                        id='upload'
                                        name='image'
                                        onChange={handleChange}
                                        hidden
                                    />
                            </label>
                        </div>
                        <div className='my-3'>
                            <div className='mb-1' style={{fontSize: '15px'}}>
                                Category
                            </div>
                            {categories?.map((item, index) => (
                                <div key={index} className='form-check form-check-inline'>
                                    <label className='me-4 form-check-label text-white'>
                                    <input
                                        type='checkbox'
                                        value={item.id}
                                        className='form-check-input'
                                        onClick={handleChangeCategoryId}
                                    />{' '}
                                    {item.name}
                                    </label>
                                </div>
                            ))}
                        </div>
                        <div className='my-3'>
                            <input
                                type='number'
                                placeholder='Price'
                                name='price'
                                className='form-control'
                                onChange={handleChange}
                                autoComplete='off'  
                                style={{
                                    backgroundColor: 'rgba(210, 210, 210, 0.25)',
                                    border: '2px solid #D2D2D2',
                                    color: '#D2D2D2'
                                }}
                            />
                        </div>
                        <div className='my-3'>
                            <input
                                type='text'
                                placeholder='Link Film'
                                name='filmUrl'
                                className='form-control'
                                onChange={handleChange}
                                autoComplete='off'  
                                style={{
                                    backgroundColor: 'rgba(210, 210, 210, 0.25)',
                                    border: '2px solid #D2D2D2',
                                    color: '#D2D2D2'
                                }}
                            />
                        </div>
                        <div className='my-3'>
                            <textarea
                                name='description'
                                placeholder='Description'
                                className='form-control '
                                onChange={handleChange}
                                autoComplete='off'  
                                style={{
                                    backgroundColor: 'rgba(210, 210, 210, 0.25)',
                                    border: '2px solid #D2D2D2',
                                    color: '#D2D2D2'
                                }}
                           />
                        </div>
                        <div className='my-1 float-end'>
                            <button className='buy my-3 px-5'>
                                Add Film
                            </button>
                        </div>
                    </form>
                </Col>
            </Row>
        </Container>

        <FilmModal
            show={show}
            handleClose={handleClose}
        />
    </>
  )
}
