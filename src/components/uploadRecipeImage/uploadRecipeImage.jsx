import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import React, {useState} from 'react';
import './uploadRecipeImage.css';

const UploadRecipeImage = (props) => {
    const {title} = props;
    const [img, setImg] = useState(props.img);

    const handleImageUpload = async (e) => {
        const imgFile = e.target.files[0];
        setImg(URL.createObjectURL(imgFile));

        const storage = getStorage();
        const storageRef = ref(storage, 'images/' + title);
        uploadBytes(storageRef, imgFile).then((snapshot) => {
            getDownloadURL(ref(storage, snapshot.ref.fullPath)).then((url) => {
                props.setImg(url);
            })
        })
    }

    return (
        <>
            <img src={img} alt={title} />
            <div id='img-upload-container'>
                <label htmlFor='img-upload' id='img-upload-label'>Upload image</label>
                <input
                    id='img-upload' 
                    type="file"
                    onChange={handleImageUpload}
                />
            </div>
        </>
    )
} 

export default UploadRecipeImage;