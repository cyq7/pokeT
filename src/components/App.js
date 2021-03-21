import React, {useState, useEffect} from 'react';
import useDidMountEffect from './customHooks'
import SearchBar from './SearchBar';
import pokemons from '../apis/pokemons';
import PokeCard from './PokeCard';
import Section from './Section';
import { TYPE_COLORS} from './type_colors.js';
import './styles/App.scss';
import pokeball from '../img/pokeball.png';
import emptyPokeball from '../img/empty_pokeball.png'


const App = () => {

    const [activePokemon, setActivePokemon] = useState('');
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState('');
    const [ability, setAbility] = useState('');
    const [ability2, setAbility2] = useState('');
    const [ability3, setAbility3] = useState('');

    const onTermSubmit = async (term) => {
        try {
            setLoading(true);
            setError("");

            //pokemon's name endpoint
            const response = await pokemons.get(`/pokemon/${term}`)

             let secondType = '';
             let secondAbility = '';
             let thirdAbility = '';

            if (response.data.types.length === 2) {
                secondType = response.data.types[1].type.name
            }

            if (response.data.abilities.length > 1) {
                secondAbility = response.data.abilities[1].ability.name
            }

            if(response.data.abilities.length > 2) {
                thirdAbility = response.data.abilities[2].ability.name
            }
            
            //pokemon's splashart description
            const pokeId = response.data.id
            let imageURL = `https://pokeres.bastionbot.org/images/pokemon/${pokeId}.png`

            //pokemon's description endpoint
            const desRes = await pokemons.get(`/pokemon-species/${term}`)
            
            let description = "";
            if(desRes) {
                description = desRes.data.flavor_text_entries.find((text) => {
                return text.language.name === "en"
                }).flavor_text.replace(//g, " ");
            } 
           
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
                ability: response.data.abilities.[0].ability.name,
                ability2: secondAbility,
                ability3: thirdAbility
            })
            } catch (err) {
                setError(err)
                console.log(err)
            } finally {
                setLoading(false);
            }
    }

    const randomPokemon = async (randomNumber) => {
        const response = await pokemons.get(`/pokemon/${randomNumber}`)
        onTermSubmit(response.data.name)
    }

    const getAbilityResponse = async ()=> {
        const response = await pokemons.get(`/ability/${activePokemon.ability}`)
        const englishEntry = response.data.effect_entries.find(entry => {
           return entry.language.name === 'en'
        }).effect;
        setAbility(englishEntry);

        if (activePokemon.ability2 !== '') {
            const response2 = await pokemons.get(`/ability/${activePokemon.ability2}`)
            const englishEntry2 = response2.data.effect_entries.find(entry => {
            return entry.language.name === 'en'
        }).effect;
        setAbility2(englishEntry2);
        }
        if (activePokemon.ability3 !== '') {
            const response3 = await pokemons.get(`/ability/${activePokemon.ability3}`)
            const englishEntry3 = response3.data.effect_entries.find(entry => {
            return entry.language.name === 'en'
        }).effect;
        setAbility3(englishEntry3);
        }
    }
//is not invoked on init   
useDidMountEffect(getAbilityResponse, [activePokemon]);


    return (
        <div className="wrapper"
            style={ activePokemon.type2 === '' ?
                {backgroundColor: `#${TYPE_COLORS[activePokemon.type]}33`} : 
                {backgroundImage: `linear-gradient(to right, #${TYPE_COLORS[activePokemon.type]}33, #${TYPE_COLORS[activePokemon.type2]}33)`}
            }>
            <div 
                className="decoration"
                style={{backgroundColor: `#${TYPE_COLORS[activePokemon.type]}`}}>
            </div>
            <div className="container">
                <SearchBar 
                onFormSubmit={onTermSubmit}
                randomPokemon={randomPokemon}
                />
            
                {loading ? (
                    <div className='loading'>
                        <img className="pokeball" src={pokeball} alt="loading pokeball"></img>
                        <h2>Loading...</h2>
                    </div>
                ) : loading === null ?  (
                    <h2 className='loading'>Search for pokemons!</h2>
                ) : error ? (
                     <div className='loading'>
                        <img className="empty-pokeball" src={emptyPokeball} alt="empty pokeball"></img>
                        <h3>This Pokemon does not exist</h3>
                    </div>
                )
                : <div>
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
                    />
                    <Section 
                        title="Types"
                        animation="fade-up-left"
                        imgUr
                    />
                    <Section
                        title="Abilities"
                        animation="fade-up-right"
                        ability={activePokemon.ability}
                        ability2={activePokemon.ability2}
                        ability3={activePokemon.ability3}
                        description={ability}
                        description2={ability2}
                        description3={ability3}
                    />
                     <Section
                        title="Movies"
                        animation="fade-up-left"
                    />
                </div>
                }

            </div>
        </div>
    );
}


export default App;