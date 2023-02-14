import './RecipeTile.css';
import {Link} from 'react-router-dom';

const RecipeTile = ({ img, title, description, id, time, ingredients, instructions }) => {
    return (
        <div className='recipe-tile'>
            <Link
                to={`/recipe/${id}`}
                className='link'
                id='recipe-tile-content'
                state={{
                    img,
                    title,
                    description,
                    id,
                    time,
                    ingredients,
                    instructions
                }}
            >   
                <div className='img-container'>
                    <img className="recipe-img" src={img} alt={title}/>
                </div>
                <h3>{title}</h3>
            </Link>
        </div>
    )
}

export default RecipeTile;