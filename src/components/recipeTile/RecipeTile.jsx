import './RecipeTile.css';
import {Link} from 'react-router-dom';

const RecipeTile = ({ img, name, description, id, time, ingredients, instructions }) => {

    return (
        <div className='recipe-tile'>
            <Link
                key={id}
                to={`/recipe/${id}`}
                className='link'
                state={{
                    img,
                    name,
                    description,
                    id,
                    time,
                    ingredients,
                    instructions
                }}
            >   <div className='img-container'>
                    <img className="recipe-img" src={img} alt={name}/>
                </div>
                <h3>{name}</h3>
            </Link>
        </div>
    )
}

export default RecipeTile;