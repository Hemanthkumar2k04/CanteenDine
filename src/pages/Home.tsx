import DishCard from "../components/DishCard";
import { useEffect, useState } from "react";
import "../css/Home.css";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<{ id: number; name: string; description: string; imageUrl: string; orders: number; }[]>([]);

  const dishes = [
    { id: 1, name: "Pizza", description: "Delicious cheese pizza", imageUrl: "/images/pizza.jpg", orders: 120 },
    { id: 2, name: "Burger", description: "Juicy beef burger with lettuce", imageUrl: "/images/burger.jpg", orders: 95 },
    { id: 3, name: "Pasta", description: "Creamy Alfredo pasta", imageUrl: "/images/pasta.jpg", orders: 80 },
    { id: 4, name: "Salad", description: "Fresh garden salad with vinaigrette", imageUrl: "/images/salad.jpg", orders: 60 },
    { id: 5, name: "Sushi", description: "Assorted sushi rolls", imageUrl: "/images/sushi.jpg", orders: 150 },
    { id: 6, name: "Tacos", description: "Spicy chicken tacos with salsa", imageUrl: "/images/tacos.jpg", orders: 70 },
    { id: 7, name: "Steak", description: "Grilled steak with garlic butter", imageUrl: "/images/steak.jpg", orders: 110 },
    { id: 8, name: "Ice Cream", description: "Creamy vanilla ice cream", imageUrl: "/images/icecream.jpg", orders: 50 },
    { id: 9, name: "Cupcake", description: "Chocolate cupcake with sprinkles", imageUrl: "/images/cupcake.jpg", orders: 40 },
    { id: 10, name: "Donut", description: "Glazed donut with sprinkles", imageUrl: "/images/donut.jpg", orders: 30 },
    { id: 11, name: "Fries", description: "Crispy golden fries", imageUrl: "/images/fries.jpg", orders: 90 },
    { id: 12, name: "Hot Dog", description: "Classic hot dog with mustard", imageUrl: "/images/hotdog.jpg", orders: 85 },
    { id: 13, name: "Nachos", description: "Cheesy nachos with jalapenos", imageUrl: "/images/nachos.jpg", orders: 75 },
    { id: 14, name: "Pancakes", description: "Fluffy pancakes with syrup", imageUrl: "pancake.jpg", orders: 165 },
    { id: 15, name: "Brownie", description: "Chocolate brownie with nuts", imageUrl: "/images/brownie.jpg", orders: 155 },
  ];

  // Function to get top 10 dishes sorted by orders
  const getTopDishes = () => {
    return [...dishes].sort((a, b) => b.orders - a.orders).slice(0, 10);
  };

  useEffect(() => {
    // Set initial top 10 dishes on page load
    setSearchResults(getTopDishes());
  }, []);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!searchQuery.trim()) {
      // Reset to top 10 dishes if search query is empty
      setSearchResults(getTopDishes());
      return;
    }

    // Filter and sort dishes based on the search query
    const filteredResults = dishes
      .filter((dish) => dish.name.toLowerCase().includes(searchQuery.toLowerCase()))
      .sort((a, b) => b.orders - a.orders)
      .slice(0, 10);

    setSearchResults(filteredResults);
  };

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for your favorite food!!!"
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      <div className="dishes-grid">
        {searchResults.map((dish) => (
          <DishCard Dish={dish} key={dish.id} />
        ))}
      </div>
    </div>
  );
}

export default Home;