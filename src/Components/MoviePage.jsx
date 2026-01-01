import React from 'react'

const MoviePage = ({movie, onClose}) => {

    if(!movie) return null;

    return (
        <div className='movie-page' onClick={onClose}>
            <div className='modal-content' onClick={(e) => e.stopPropagation()}>
                <button className='close-btn' onClick={onClose}>x</button>

                <div className='modal-body'>
                    <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : `./No-Poster.png`}
                         alt={movie.title}/>
                </div>

                <div className='info'>
                    <h2>{movie.title}</h2>

                    <p className='tagline'>{movie.tagline}</p>
                    <p className='overview'>{movie.overview}</p>
                </div>

                <div className="details">
                    <div className="detail-item">
                        <span>Release Date</span>
                        <span>{movie.release_date}</span>
                    </div>
                    <div className="detail-item">
                        <span>Rating</span>
                        <span className="text-yellow-400">★ {movie.vote_average.toFixed(1)}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default MoviePage
