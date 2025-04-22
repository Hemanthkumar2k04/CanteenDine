import "../css/DishCard.css";
import { useState, useEffect } from "react";
import { useCartContext } from "../contexts/CartContext";
import { toast } from 'react-toastify';
type Dish = {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    price: number;
};

function DishCard({ Dish }: { Dish: Dish }) {
    const [quantity, setQuantity] = useState<number>(1);
    const [inCart, setInCart] = useState<boolean>(false);
    const { addToCart } = useCartContext();

    // Check if the dish is already in the cart or localStorage and set the initial quantity
    useEffect(() => {
        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
            const parsedCart = JSON.parse(storedCart);
            const existingDish = parsedCart.find((item: any) => item.id === Dish.id);
            if (existingDish) {
                setQuantity(existingDish.quantity);
            }
        }
    }, [Dish.id]);

    function onAddToCart() {
        setInCart(true);
        setQuantity(quantity); // Start with a quantity of 1
    }

    function confirmAddToCart() {
        addToCart({ ...Dish, quantity }); // Reflect changes in the cart and localStorage
        setInCart(false);
        toast.success(`${Dish.name} added to cart!`);
    }

    function incrementQuantity() {
        setQuantity((prevQuantity) => prevQuantity + 1); // Update quantity locally
    }

    function decrementQuantity() {
        if (quantity > 1) {
            setQuantity((prevQuantity) => prevQuantity - 1); // Update quantity locally
        } else {
            setInCart(false);
            setQuantity(0);
        }
    }

    function clearItem() {
        setInCart(false);
        setQuantity(1);
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
                <div className="dish-header">
                    <h3 className="dish-name">{Dish.name}</h3>
                    <p className="dish-price">₹ {Dish.price.toFixed(2)}</p>
                </div>
                <p>{Dish.description}</p>
            </div>
        </div>
    );
}

export default DishCard;