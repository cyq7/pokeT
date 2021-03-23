import axios from 'axios';
import { useState, useEffect } from 'react';

const Evolution = ({evolutionUrl}) => {

    const[evoChain, setEvoChain] = useState([]);

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

            return setEvoChain(evoChain);
        }
    fetchData()
    }, []);

    console.log(evoChain)

   //chain.species.url - pokemon species id in the url is the same as the pokemon id in the separate pokemon images API.

    return (
        <div>
            {evoChain.map((pokemon, index) => {
                return (
                    <div className="evolution" key={index}>
                        <h4>{pokemon}</h4>
                    </div>
                )
            })}
        </div>
    )
}

export default Evolution;