import './styles/Abilities.scss'
import { useState } from 'react';

const Abilities = ({ability, ability2, ability3, description, description2, description3}) => {

    const ab1 = ability ? (ability.charAt(0).toUpperCase() + ability.slice(1)).replace("-", ' ') : null;
    const ab2 = ability2 ? (ability2.charAt(0).toUpperCase() + ability2.slice(1)).replace("-", ' ') : null;
    const ab3 = ability3 ? (ability3.charAt(0).toUpperCase() + ability3.slice(1)).replace("-", ' ') : null;
   
    return (
        <div>
         <div className="ability">
                <h4>{ab1}</h4>
                <p>{description}</p>
            </div>
            {ability2 ? 
             <div className="ability">
                <h4>{ab2}</h4>
                <p>{description2}</p>
            </div>
            : null}
             {ability3 ? 
             <div className="ability">
                <h4>{ab3}</h4>
                <p>{description3}</p>
            </div>
            : null}
        </div>
    )
}

export default Abilities;