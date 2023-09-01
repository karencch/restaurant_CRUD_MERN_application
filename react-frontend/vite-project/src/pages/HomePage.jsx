import axios from "axios";
import {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import Restaurant from "../components/Restaurant";


const HomePage = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getRestaurants = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`http://localhost:3000/api/restaurants`);
            console.log(response.data);
            setRestaurants(response.data);
            setIsLoading(false);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getRestaurants();
    }, [])

    return (
        <div>
          <div>
            <Link
              to="/create"
              className="inline-block mt-4 shadow-md bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-600 hover:cursor-pointer"
            >
              Create/Add a Restaurant
            </Link>
          </div>
          <div className="grid grid-cols-3 lg:grid-cols-4 gap-4 mt-5">
            {isLoading ? (
              "Loading"
            ) : (
              <>
                {restaurants.length > 0 ? (
                  <>
                    {restaurants.map((restaurant, index) => {
                      return (
                        <Restaurant
                          key={index}
                          restaurant={restaurant}
                          getRestaurants={getRestaurants}
                          
                        />
                      );
                    })}
                  </>
                ) : (
                  <div className="mt-4 bg-gray-800 text-white font-serif p-4">
                    There is no restaurant
                  </div>
                )}
              </>
            )}
          </div>

          <div>
 

          </div>
    
 
        </div>
      );
};

export default HomePage;