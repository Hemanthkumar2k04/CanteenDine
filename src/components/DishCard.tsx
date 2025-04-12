import "../css/DishCard.css";
import { useState } from "react";

type Dish = {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
};

function DishCard({ Dish }: { Dish: Dish }) {
    const [quantity, setQuantity] = useState<number>(0);
    const [inCart, setInCart] = useState<boolean>(false);
    
    function onAddToCart() {
        setInCart(true);
        setQuantity(quantity + 1);
    }
    
    function confirmAddToCart() {
        alert(`Added ${Dish.name} to cart!`);
        setInCart(false);
    }
    
    function incrementQuantity() {
        setQuantity(quantity + 1);
    }
    
    function decrementQuantity() {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        } else {
            alert("Item removed from cart");
            setInCart(false);
        }
    }
    
    function clearItem() {
        alert("Item removed from cart");
        setInCart(false);
        setQuantity(0);
    }

    return (
        <div className="dish-card">
            <div className="dish-frame">
                <div className="dish-poster">
                    <img src={Dish.imageUrl} alt={Dish.name} />
                    <div className="dish-overlay">
                        {!inCart ? (
                            <button className="cart-btn" onClick={onAddToCart}>
                                +
                            </button>
                        ) : (
                            <div className="quantity-container">
                                <button className="decrement-btn" onClick={decrementQuantity}> - </button>
                                <span className="quantity">{quantity}</span>
                                <button className="increment-btn" onClick={incrementQuantity}> + </button>
                                <button className="clear-btn" onClick={clearItem}>×</button>
                                <button className="confirm-btn" onClick={confirmAddToCart}>
                                    ✓
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="dish-info">
                <h3>{Dish.name}</h3>
                <p>{Dish.description}</p>
            </div>
        </div>
    );
}

export default DishCard;