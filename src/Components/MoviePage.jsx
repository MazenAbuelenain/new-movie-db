import React, {useEffect, useState} from 'react'

const API_BASE_URL = 'https://api.themoviedb.org/3';

/** @type {ImportMeta} */
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
    }
};


const MoviePage = ({movie, onClose}) => {

    const [movieData, setMovieData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    console.log('Movie Id: ' + movie.id);

    useEffect(() => {
        if(!movie) return null;

        const getMovieDetails = async () => {
            try{
                const endpoint = `${API_BASE_URL}/movie/${movie.id}`;
                const response = await fetch(endpoint, API_OPTIONS);
                const data = await response.json();

                setMovieData(data);
                console.log(data);
            }catch(error){
                console.log(error);
            } finally{
                setIsLoading(false);
            }
        };

        getMovieDetails();
    }, [movie.id])

    if(!movie) return null;

    if (isLoading) {
        return (
            <div className='movie-page'>
                <div className='modal-container flex items-center justify-center'>
                    <p className='text-white text-xl'>Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className='movie-page' onClick={onClose}>
            <div className='modal-container' onClick={(e) => e.stopPropagation()}>
                <button className='close-modal' onClick={onClose}>x</button>

                <div className='header-row'>
                    <div>
                        <h2>{movieData.title}</h2>
                        <div className='meta-top'>
                            <span>{movieData.release_date?.split('-')[0]}</span>
                            <span>•</span>
                            <span>{movieData.certification || 'PG-13'}</span>
                            <span>•</span>
                            <span>{movieData.runtime} mins</span>
                        </div>
                    </div>
                    <div className='badges'>
                        <div className='badge-rating'>
                            <span className='text-yellow-400'>
                                <img src="./star.svg" alt="Rating" />
                            </span>
                            {movieData.vote_average?.toFixed(1)} ({movieData.vote_count})
                        </div>
                        <div className='badge-rating'>
                            {movieData.popularity?.toFixed(0)}
                        </div>
                    </div>
                </div>
                
                <div className='visuals'>
                    <img
                        src={movieData.poster_path ? `https://image.tmdb.org/t/p/w500/${movieData.poster_path}` : './No-Poster.png'}
                        className='poster-small' alt='Poster'
                    />
                    <div className='relative flex-1'>
                        <button className='trailer-btn'>
                            <span>▶</span> Trailer
                        </button>
                    </div>
                </div>
                
                <div className='info-table'>
                    <div className='info-row'>
                        <span className='label'>Genres</span>
                        <div className='value'>
                            {movieData.genres?.map(g => (
                                <span key={g.id} className='genre-chip'>{g.name}</span>
                            )) || 'Loading...'}
                        </div>
                        <a className='visit-btn ml-auto'
                           href={movieData.homepage}
                           target='_blank'
                           rel='noreferrer'
                        >
                            Visit Homepage →
                        </a>
                    </div>

                    <div className='info-row'>
                        <span className='label'>Overview</span>
                        <p className='value text-gray-300 leading-relaxed'>{movieData.overview}</p>
                    </div>

                    <div className='info-row'>
                        <span className='label'>Release Date</span>
                        <span className='value'>{movieData.release_date} (Worldwide)</span>
                    </div>

                    <div className='info-row'>
                        <span className='label'>Status</span>
                        <span className='value'>{movieData.status}</span>
                    </div>

                    <div className='info-row'>
                        <span className='label'>Budget</span>
                        <span className='value'>{movieData.budget ? `$${(movieData.budget / 1000000).toFixed(1)}` : 'N/A'} million</span>
                    </div>

                    <div className='info-row'>
                        <span className='label'>Box Office</span>
                        <span className='value'>${(movieData.revenue / 1000000).toFixed(1)} million</span>
                    </div>

                    <div className="info-row">
                        <span className="label">Tagline</span>
                        <span className="value text-gray-400 italic">{movieData.tagline}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default MoviePage
