import { useState, useEffect } from 'react';
import axios from 'axios';
import pokemons from '../apis/pokemons';
import './styles/Evolution.scss';

const Evolution = ({evolutionUrl, pokemonName}) => {

    const[evoChain, setEvoChain] = useState([]);
    const[pokeId, setPokeId] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setEvoChain([]);
            const response = await axios.get(evolutionUrl)

            let evoChain = [];
            let evoData = response.data.chain;
            let pokeIdArr = [];

            do {
                let numberOfEvolutions = evoData['evolves_to'].length;

                evoChain.push(evoData.species.name)
                const response2 = await pokemons.get(`/pokemon/${evoData.species.name}`)
                const pokeId = response2.data.id;
                pokeIdArr.push(pokeId);

                if(numberOfEvolutions > 1) {
                    for(let i = 1; i < numberOfEvolutions; i++) {
                        evoChain.push(evoData.evolves_to[i].species.name)
                        const response3 = await pokemons.get(`/pokemon/${evoData.evolves_to[i].species.name}`)
                        const pokeId = response3.data.id;
                        pokeIdArr.push(pokeId);
                    }
                }
                evoData = evoData['evolves_to'][0];
            } while (!!evoData && evoData.hasOwnProperty('evolves_to'));
            
            setPokeId(pokeIdArr);
            return setEvoChain(evoChain)
        }
        fetchData()
    }, [evolutionUrl]);


    return (
        <div className="evo-container" style={evoChain.length !== 1 ? {display: "grid"} : {display: "flex"}}>
            {evoChain.map((pokemon, index) => {
                const name = pokemon.charAt(0).toUpperCase() + pokemon.slice(1);
                let imageURL = `https://pokeres.bastionbot.org/images/pokemon/${pokeId[index]}.png`
                return evoChain.length !== 1 ? (
                        <div key={name} className="evo-item">
                            <img key={imageURL} alt="evolution stage" src={imageURL}></img>
                            <h4>{name}</h4>
                        </div>
                ) : <h4 className="evo-message" key={name}> This Pokémon does not have evolutionary line! </h4>
            })}
        </div>
    )
}

export default Evolution;