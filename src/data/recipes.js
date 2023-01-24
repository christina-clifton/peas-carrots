import {getDatabase, ref, get, child} from 'firebase/database';


const getRecipes = async () => {
    let recipesList = [];
   
    try {
        const databaseRef = ref(getDatabase());
        get(child(databaseRef, 'recipes')).then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val());
                const data = snapshot.val();
                if (data != null) {
                    for (const key of Object.keys(data)) {
                        const it = data[key];
                        let item = {
                            id: it.id,
                            name: it.name,
                            image: it.image,
                            description: it.description,
                            time: it.time,
                            ingredients: it.ingredients,
                            instructions: it.instructions
                        }
                        recipesList.push(item);
                    }
                }
                console.log(recipesList);
                return recipesList;
            }
        })
        .catch((error) => {
            console.error(error);
        });
    } catch (e) {
        console.log(e);
    }

    return recipesList;
}   

export default getRecipes;