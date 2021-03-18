import './styles/PokeCard.scss'
import { TYPE_COLORS, TYPE_ICONS} from './type_colors.js'

const PokeCard = ({name, image, experience, height, weight, type, type2, description, color, captureRate, ability}) => {

   const pokeName = name ? name.charAt(0).toUpperCase() + name.slice(1) : null;

    return (
         <div className="pokeCard">
            <img 
            alt="pokemon's image" 
            src={ image }
            ></img>
                <div className='details'> 
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
                            <p> capture rate <br></br> <span>{captureRate}%</span></p>
                            <p> ability <br></br> <span>{ability}</span></p>
                    </div>
                </div>
        </div> 
    )
}

export default PokeCard;