import axios from 'axios';
import {useState, useEffect} from 'react';
import './styles/SearchBar.scss'
import { BsSearch  } from 'react-icons/bs'
import pokeball from '../img/pokeball.png'

const SearchBar = (props) => {

    const [term, setTerm] = useState('');

    const handleChange = (event) => {
        setTerm(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        props.onFormSubmit(term.toLowerCase())
    }

    const handleClick = () => {
        const randomNumber = Math.floor(Math.random()*898)
        props.randomPokemon(randomNumber);
    }


    return (
        <div className='search-bar'>
            <form onSubmit={handleSubmit} className=''>
                <input 
                type="text" 
                onChange={handleChange} 
                value={term}
                />
                <BsSearch className="search-icon"/>
            </form>
            <button onClick={handleClick} className="random"> 
                <img src={pokeball} alt="pokeball-icon" /> <span>Random</span> 
            </button>
            
        </div>
    )
}

export default SearchBar;