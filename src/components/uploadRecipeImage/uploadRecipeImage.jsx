//stylesheet
import './uploadRecipeImage.css';

//dependencies
import React, {useState} from 'react';

const UploadRecipeImage = (props) => {
    const {title} = props;
    const [img, setImg] = useState(props.img);

    const handleImageUpload = async (e) => {
        const imgFile = e.target.files[0];
        setImg(URL.createObjectURL(imgFile));
        props.setImg(imgFile);
    }

    return (
        <div className='img-upload'>
            <img src={img} alt={title} />
            <label htmlFor='img-upload'>Upload image</label>
            <input
                id='img-upload' 
                type="file"
                onChange={handleImageUpload}
            />
        </div>
    )
} 

export default UploadRecipeImage;