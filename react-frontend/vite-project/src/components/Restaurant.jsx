import axios from "axios";
import {Link} from "react-router-dom";
import { toast } from "react-toastify";

const Restaurant = ({restaurant, getRestaurants}) => {

    const deleteRestaurant = async(id) => {
        try{
            await axios.delete(`https://restaurant-crud-mern.onrender.com/api/restaurants/${id}`);
            toast.success("Deleted restaurant successfully");
            getRestaurants();
        } catch(error){
            toast.error(error.message);
        }


    }

    return (
        <div className="bg-white rounded shadow-lg overflow-hidden">
            <div className="px-4 pt-2 pb-4">
                <h2 className="text font-semibold">{restaurant.name}</h2>
                <div className="text-sm">My Rating: {restaurant.rating}</div>
                <div className="text-sm">Cuisine: {restaurant.cuisine}</div>

                <div className="mt-2 flex gap-4">
                <Link to={`/edit/${restaurant._id}`} className="inline-block w-full text-center shadow-md bg-gray-700 text-white rounded-sm px-4 py-1 fond-bold hover:bg-gray-600 hover:cursor-pointer">Edit</Link>
                </div>
                <div className="mt-2 flex gap-4">
                <button onClick={() => deleteRestaurant(restaurant._id)} className="inline-block w-full text-center shadow-md bg-red-700 text-white rounded-sm px-4 py-1 fond-bold hover:bg-red-600 hover:cursor-pointer">Delete</button>
                </div>

            </div>
            
        </div>
    )
}

export default Restaurant;

