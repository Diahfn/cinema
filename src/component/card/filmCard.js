import React from 'react';
import { Link } from 'react-router-dom';

export default function FilmCard ({ item, index }) {
    
    return (
       <div className='card mx-3 my-4' style={{backgroundColor: '#181818', width: '180px', border: 'none'}}>
            <Link
                to={`/film/` + item.id}
                style={{ textDecoration: 'none' }}
                key={index}
            >
                <div>
                    <img src={item.image} alt='movie image' className='rounded' width='180px' height='250px' />
                    
                </div>
            </Link>
       </div>
    )
}