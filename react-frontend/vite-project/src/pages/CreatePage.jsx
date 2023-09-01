import {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreatePage = () => {

    // must declare state for each text box:
    const [name, setName] = useState("");
    const [rating, setRating] = useState("");
    const [cuisine, setCuisine] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const saveRestaurant = async(e) => {
        e.preventDefault();
        alert('hello');
        if(name === "" || rating === "" || cuisine === ""){
            alert('Please fill out all input completely');
        }
        try{
            setIsLoading(true);
            const response = await axios.post("https://restaurant-crud-mern.onrender.com/api/restaurants",{name: name, rating: rating, cuisine: cuisine});
            toast.success(`Saved ${response.data.name} successfully`);
            setIsLoading(false);
            navigate("/");
        }catch(error){
            toast.error(error.message);
            
            setIsLoading(false);
        }
    }

    return (
        <div className="max-w-lg bg-white shadow-lg mx-auto p-7 rounded mt-6">
            <h2 className="font-semibold text-2xl mb-4 block text-center">
                Create a restaurant entry
            </h2>
            <form onSubmit={saveRestaurant}>
                <div className="space-y-2">
                    <label>Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter restaurant name"></input>
                </div>
                <div>
                    <label>Rating</label>
                    <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter your rating out of 10"></input>
                </div>
                <div className="space-y-2">
                    <label>Cuisine</label>
                    <input type="text" value={cuisine} onChange={(e) => setCuisine(e.target.value)} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter type of cuisine/category"></input>
                </div>
                <div>
                    { !isLoading &&  (<button className="block w-full mt-6 bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-600 hover:cursor-pointer">Save</button>)}
                </div>
            </form>
        </div>
    )
}

export default CreatePage;