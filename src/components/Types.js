import { TYPE_ICONS } from './type_colors.js'

const Types = ({type, type2}) => {
    return {
        <div>
            <div className="type-wrapper">
                <img
                    className="type-image"
                    url={${TYPE_ICONS[type]}}>
                    {type}</img>
                </div>
                <p>{type2}</p>
            <div className="type-wrapper">
                <img
                    className="type-image"
                    url={${TYPE_ICONS[type2]}}>
                </img>
                <p>{type2}</p>
            </div>
            
        </div>
    }
}