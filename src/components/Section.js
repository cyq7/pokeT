import { useEffect } from 'react';
import Aos from 'aos';
import Abilities from './Abilities'
import 'aos/dist/aos.css'
import './styles/Section.scss'


const Section = ({title, animation, ability, description, ability2, description2, ability3, description3}) => {

    useEffect(() => {
        Aos.init({duration: 2000});
    }, []);

    return (
        <div  data-aos={animation} className='section'>
            <h2>{title}</h2>
           <Abilities 
                ability={ability}
                ability2={ability2}
                ability3={ability3}
                description={description}
                description2={description2}
                description3={description3}
           />
        </div>
    )
}

export default Section;