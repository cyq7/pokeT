import { useState, useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css'
import './styles/PokeCard.scss'
import { TYPE_COLORS } from './type_colors.js'

const PokeCard = ({name, image, experience, height, weight, type, type2, description, color, captureRate, ability}) => {
    const[loaded, setLoaded] = useState(false);

   const pokeName = name ? name.charAt(0).toUpperCase() + name.slice(1).replace("-", ' ') : null;

      useEffect(() => {
        Aos.init({duration: 2500});
    }, []);

    return (
         <div 
            data-aos="fade-up" 
            className="pokeCard">
            <img 
                style={loaded ? {} : {display:"none"}}
                data-aos="zoom-in" 
                alt="pokemon" 
                src={ image }
                onLoad={() => setLoaded(true)}>
            </img>
                <div style={loaded ? {} : {visibility:"hidden"}} className='details'> 
                    <h1>{pokeName}</h1>
                    <p className="description">{description}</p>
                    <div> 
                        <span 
                            className="tag"
                            style={{backgroundColor: `#${TYPE_COLORS[type]}`}}>
                        {type}</span>
                    {type2 ? 
                        <span 
                            className="tag" 
                            style={{backgroundColor: `#${TYPE_COLORS[type2]}`}}
                        >{type2}</span> 
                    : null}
                    </div>
                    <div className="stats">
                            <p> experience <br></br> <span>{experience}</span> </p>
                            <p> height <br></br> <span>{height}</span></p>
                            <p> weight <br></br> <span>{weight}</span></p>
                            <p> color <br></br> <span>{color}</span> </p>
                            <p> capture rate <br></br> <span>{captureRate}</span></p>
                            <p> ability <br></br> <span>{ability}</span></p>
                    </div>
                </div>
        </div> 
    )
}

export default PokeCard;