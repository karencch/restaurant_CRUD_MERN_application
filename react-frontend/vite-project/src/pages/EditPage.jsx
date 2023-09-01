import axios from "axios"
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditPage = () => {
    let {id} = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [restaurant, setRestaurant] = useState({
        name: "",
        rating: "",
        cuisine: ""
    })

    const getRestaurant = async () => {
        setIsLoading(true);
        try{
            const response = await axios.get(`http://localhost:3000/api/restaurants/${id}`);
            setRestaurant({
                name: response.data.name,
                rating: response.data.rating,
                cuisine: response.data.cuisine
             })
        setIsLoading(false);

        }catch(error){
            setIsLoading(false);
            toast.error(error.message);
        }
        
    }

    const updateRestaurant = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try{
            await axios.put(`http://localhost:3000/api/restaurants/${id}`, restaurant);
            toast.success("Updated restaurant successfully");
            navigate(`/`);
        } catch(error){
            setIsLoading(false);
            toast.error(error.message);
        }
    }


    useEffect(() => {
        getRestaurant();
    }, []);

    return (  //this was copied from my CreatePage.jsx and modified
        <div>
                    <div className="max-w-lg bg-white shadow-lg mx-auto p-7 rounded mt-6">
            <h2 className="font-semibold text-2xl mb-4 block text-center">
                Update restaurant entry
            </h2>
            { isLoading ? ("Loading") : (
                <>
                <form onSubmit={updateRestaurant}>
                    <div className="space-y-2">
                        <label>Name</label>
                        <input type="text" value={restaurant.name} onChange={(e) => {setRestaurant({...restaurant, name: e.target.value})}} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter restaurant name"></input>
                    </div>
                    <div>
                        <label>My Rating</label>
                        <input type="number" value={restaurant.rating} onChange={(e) => {setRestaurant({...restaurant, rating: e.target.value})}} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter your rating out of 10"></input>
                    </div>
                    <div className="space-y-2">
                        <label>Cuisine</label>
                        <input type="text" value={restaurant.cuisine} onChange={(e) => {setRestaurant({...restaurant, cuisine: e.target.value})}} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter type of cuisine/category"></input>
                    </div>
                    <div>
                        { !isLoading &&  (<button className="block w-full mt-6 bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-600 hover:cursor-pointer">Update</button>)}
                    </div>
                </form>
                </>
            ) }

        </div>    
        </div>
    )
}

export default EditPage;