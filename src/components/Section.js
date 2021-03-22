import { useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css'
import './styles/Section.scss'


const Section = ({title, animation, content}) => {

    useEffect(() => {
        Aos.init({duration: 2000});
    }, []);

    return (
        <div  data-aos={animation} className='section'>
            <h2>{title}</h2>
            {content}
        </div>
    )
}

export default Section;