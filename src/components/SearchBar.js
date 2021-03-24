import {useState} from 'react';
import './styles/SearchBar.scss'
import { BsSearch  } from 'react-icons/bs'
import pokeball from '../img/pokeball.png'

const SearchBar = (props) => {
    const [term, setTerm] = useState('');
    const [disabledButton, setDisabledButton] = useState(false)

    const handleChange = (event) => {
        setTerm(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        props.onFormSubmit(term.toLowerCase())
    }

    const handleClick = () => {
        setDisabledButton(true);
        const randomNumber = Math.floor(Math.random()*890);
        props.randomPokemon(randomNumber);
        setTimeout(() => setDisabledButton(false), 3000);
    }

    return (
        <div className='search-bar'>
            <form onSubmit={handleSubmit}>
                <input 
                type="text" 
                onChange={handleChange} 
                value={term}
                required
                />
                <button className="search-button" type="submit"><BsSearch className="search-icon"/></button>
            </form>
            <button onClick={handleClick} className="random"  disabled={disabledButton}> 
                <img src={pokeball} alt="pokeball-icon" /> <span>Random</span> 
            </button>
            
        </div>
    )
}

export default SearchBar;