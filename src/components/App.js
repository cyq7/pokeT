import React, {useState} from 'react';
import SearchBar from './SearchBar'
import pokemons from '../apis/pokemons'
import PokeCard from './PokeCard'
import pokeball from '../img/pokeball.png'
import './styles/App.scss'


const App = () => {

    const [activePokemon, setActivePokemon] = useState('');
    const [loading, setLoading] = useState(null);

    const onTermSubmit = async (term) => {
        try {
            setLoading(true);
            const response = await pokemons.get(`/pokemon/${term}`)

            const desRes = await pokemons.get(`/pokemon-species/${term}`)

            const pokeId = response.data.id
            let imageURL = `https://pokeres.bastionbot.org/images/pokemon/${pokeId}.png`

            let secondType;

            if (response.data.types.length == 2) {
                secondType = response.data.types.[1].type.name
            }

            const englishFlavor = desRes.data.flavor_text_entries.find((text) => {
                return text.language.name === "en"
            });

            const description = englishFlavor.flavor_text.replace(//g, " ");

            const catchRate = Math.floor(desRes.data.capture_rate/255*100);


            setActivePokemon({
                name: response.data.name,
                image: imageURL,
                description: description,
                type: response.data.types.[0].type.name,
                type2: secondType,
                experience: response.data.base_experience,
                height: response.data.height,
                weight: response.data.weight,
                color: desRes.data.color.name,
                captureRate: catchRate,
                ability: response.data.abilities.[0].ability.name
            })
            } catch (err) {
            console.log(err);
            } finally {
                setLoading(false);
            }
    }

    const randomPokemon = async (randomNumber) => {
        const response = await pokemons.get(`/pokemon/${randomNumber}`)
        onTermSubmit(response.data.name)
    }

    return (
        <div className="container">
            <SearchBar 
            onFormSubmit={onTermSubmit}
            randomPokemon={randomPokemon}
            />
            {loading ? (
                <div className='loading'>
                    <img className="pokeball"src={pokeball}></img>
                    <h2>Loading...</h2>
                </div>
            ) : loading === null ?  (
                <h2 className='loading'>Search for pokemons!</h2>
            ) : 
            <PokeCard
                name={activePokemon.name}
                image={activePokemon.image}
                description={activePokemon.description}
                type={activePokemon.type}
                type2={activePokemon.type2}
                experience={activePokemon.experience}
                height={activePokemon.height}
                weight={activePokemon.weight}
                color={activePokemon.color}
                captureRate={activePokemon.captureRate}
                ability={activePokemon.ability}
            />}
        </div>
    );
}


export default App;