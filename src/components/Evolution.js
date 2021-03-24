import { useState, useEffect } from 'react';
import axios from 'axios';
import pokemons from '../apis/pokemons';
import './styles/Evolution.scss';

const Evolution = ({evolutionUrl}) => {

    const[evoChain, setEvoChain] = useState([]);
    const[imgUrl, setImgUrl] = useState([]);
    const[error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(evolutionUrl)

            let evoChain = [];
            let evoData = response.data.chain;

            do {
                let numberOfEvolutions = evoData['evolves_to'].length;

                evoChain.push(evoData.species.name)

                if(numberOfEvolutions > 1) {
                    for(let i = 1; i < numberOfEvolutions; i++) {
                        evoChain.push(evoData.evolves_to[i].species.name)
                    }
                }
                evoData = evoData['evolves_to'][0];
            } while (!!evoData && evoData.hasOwnProperty('evolves_to'));

            evoChain.map(pokemon => {
            const fetchImg = async() => {
                try {
                    const response = await pokemons.get(`/pokemon/${pokemon}`)
                    const pokeId = response.data.id
                    const newUrl = `https://pokeres.bastionbot.org/images/pokemon/${pokeId}.png`
                    setImgUrl(currentArray =>[...currentArray, newUrl])
                } catch (err) {
                    setError(err)
                    console.log(err)
                } 
            }
            return fetchImg();
        })
            return setEvoChain(evoChain)
        }
    fetchData()
    }, [evolutionUrl]);

    return (
        <div className="evo-container">
            {evoChain.map((pokemon, index) => {
                const name = pokemon.charAt(0).toUpperCase() + pokemon.slice(1);
                return evoChain.length !== 1 ? (
                    <div key={name} className="evo-item">
                         <img className="evo-img" alt="evolution stage" src={imgUrl[index]}></img>
                        <h4>{name}</h4>
                    </div>
                ) : <h4 key={name}> This Pokémon does not have evolutionary line! </h4>
            })}
        </div>
    )
}

export default Evolution;