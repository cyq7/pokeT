import { useEffect, useState } from 'react';
import pokemons from '../apis/pokemons';
import './styles/Types.scss'

const Types = ({type, type2}) => {

    const [goodAgainst, setGoodAgainst] = useState([]);
    const [goodAgainst2, setGoodAgainst2] = useState([]);
    const [weakAgainst, setWeakAgainst] = useState([]);
    const [weakAgainst2, setWeakAgainst2] = useState([]);

    const firstImage = type ? require(`../img/${type}.png`).default : null;
    const secondImage = type2 ? require(`../img/${type2}.png`).default : null;

    useEffect( async () => {
        const response = await pokemons.get(`/type/${type}`)
        const res = response.data.damage_relations
        const ddt = [];
        const ndf = [];
        const ddf = [];
        const ndt = [];

        const ddtRes = res.double_damage_to
        ddtRes.forEach(type => {return type.name ? ddt.push(type.name) : null})
        const ndfRes =  res.no_damage_from 
        ndfRes.forEach(type => {return type.name ? ndf.push(type.name) : null})
        const ddfRes =  res.double_damage_from
        ddfRes.forEach(type => {return type.name ? ddf.push(type.name) : null})
        const ndtRes =  res.no_damage_to
        ndtRes.forEach(type => {return type.name ? ndt.push(type.name) : null})

        const goodAgainst = ddt.concat(ndf);
        const weakAgainst = ddf.concat(ndt);
        setGoodAgainst(goodAgainst);
        setWeakAgainst(weakAgainst);

        if(type2 !== "") {
            const response2 = await pokemons.get(`/type/${type2}`)
            const res2 = response2.data.damage_relations
            const ddt2 = [];
            const ndf2 = [];
            const ddf2 = [];
            const ndt2 = [];

            const ddtRes2 = res2.double_damage_to
            ddtRes2.forEach(type2 => {return type2.name ? ddt2.push(type2.name) : null})
            const ndfRes2 =  res2.no_damage_from 
            ndfRes2.forEach(type2 => {return type2.name ? ndf2.push(type2.name) : null})
            const ddfRes2 =  res2.double_damage_from
            ddfRes2.forEach(type2 => {return type2.name ? ddf2.push(type2.name) : null})
            const ndtRes2 =  res2.no_damage_to
            ndtRes2.forEach(type2 => {return type2.name ? ndt2.push(type2.name) : null})

            const goodAgainst2 = ddt2.concat(ndf2);
            const weakAgainst2 = ddf2.concat(ndt2);
            setGoodAgainst2(goodAgainst2);
            setWeakAgainst2(weakAgainst2)
        }
    }, [type, type2])


    return (
        <div className="types">
            <div className="type-wrapper">
                <div className="badge">
                    <img className="type-image" src={firstImage}></img>
                    <h3>{type}</h3>
                </div>
                <div className="type-connections">
                    <div className="type-section">
                        <h4>Good against</h4>
                        <ul>
                        {goodAgainst.map((type, index) => {
                            return (
                                <li key={index}>
                                    <img className="mini-img" src={require(`../img/${type}.png`).default}></img>
                                    {type}
                                </li>
                            )
                        })}
                        </ul>
                    </div>
                    <div className="type-section">
                        <h4>Weak against</h4>
                        <ul>
                            {weakAgainst.map((type, index) => {
                            return (
                                <li key={index}>
                                    <img className="mini-img" src={require(`../img/${type}.png`).default}></img>
                                    {type}
                                </li>
                            )
                        })}
                        </ul>
                    </div>
                </div>
            </div>
            {type2 ? 
                <div className="type-wrapper">
                    <div className="badge">
                        <img className="type-image" src={secondImage}></img>
                        <h3>{type2}</h3>
                    </div>
                    <div className="type-connections">
                        <div className="type-section">
                            <h4>Good against</h4>
                            <ul>
                            {goodAgainst2.map((type, index) => {
                                return (
                                    <li key={index}>
                                        <img className="mini-img" src={require(`../img/${type}.png`).default}></img>
                                        {type}
                                    </li>
                                )
                            })}
                            </ul>
                        </div>
                        <div className="type-section">
                            <h4>Weak against</h4>
                            <ul>
                                {weakAgainst2.map((type, index) => {
                                return (
                                    <li key={index}>
                                        <img className="mini-img" src={require(`../img/${type}.png`).default}></img>
                                        {type}
                                    </li>
                                )
                            })}
                            </ul>
                        </div>
                    </div>
                </div>
            : null }
        </div>
    )
}

export default Types;