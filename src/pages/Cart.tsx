import { useEffect, useState } from "react";
import { useCartContext } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../css/Cart.css";

function CartPage() {
    const { cart, removeFromCart, addToCart } = useCartContext();
    const [showModal, setShowModal] = useState(false);
    const [customerName, setCustomerName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [orderNumber, setOrderNumber] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null); // State for user ID
    const [loading, setLoading] = useState(false); // Loading state for the order
    const navigate = useNavigate(); // Initialize useNavigate

    // Clear local storage when the component unmounts
    useEffect(() => {
        return () => {
            localStorage.removeItem("cart"); // Clear the cart from local storage
        };
    }, []);

    // Increment the quantity of an item in the cart
    function incrementQuantity(itemId: number) {
        const item = cart.find((item) => item.id === itemId);
        if (item) {
            addToCart({ ...item, quantity: item.quantity + 1 });
        }
    }
    const clearCart = () => {
        localStorage.removeItem("cart"); // Clear the cart from local storage
        cart.forEach((item) => removeFromCart(item.id)); // Clear all items from the cart state
    };
    // Decrement the quantity of an item in the cart
    function decrementQuantity(itemId: number) {
        const item = cart.find((item) => item.id === itemId);
        if (item && item.quantity > 1) {
            addToCart({ ...item, quantity: item.quantity - 1 });
        } else if (item) {
            removeFromCart(itemId); // Remove item if quantity becomes 0
        }
    }

    // Calculate the total price of items in the cart
    const calculateTotal = () => {
        return cart
            .reduce((total, item) => total + item.price * item.quantity, 0)
            .toFixed(2);
    };

    // Handle placing the order
    const handlePlaceOrder = async () => {
        if (!customerName || !phoneNumber) {
            alert("Please fill in all fields.");
            return;
        }

        setLoading(true); // Set loading state

        // Prepare the order data
        const orderData = {
            user_id: `USER-${Date.now()}-${Math.floor(Math.random() * 1000)}`, // Generate a unique user ID
            phone: phoneNumber,
            paymentMethod: "cash", // Default payment method
            dishes: cart.map((item) => ({
                dish_id: item.id,
                quantity: item.quantity,
            })),
        };

        try {
            // Send the order data to the backend
            const response = await fetch("http://localhost:5000/checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(orderData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                alert(`Error: ${errorData.error}`);
                setLoading(false);
                return;
            }

            const result = await response.json();

            // Update the state with the response data
            setOrderNumber(result.orderId);
            setUserId(result.userId);

            // Clear the cart
            localStorage.removeItem("cart");
        } catch (error) {
            console.error("Error placing order:", error);
            alert("An error occurred while placing the order. Please try again.");
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    // Handle closing the modal and navigating to the home page
    const handleCloseModal = () => {
        setShowModal(false); // Clear the cart from local storage
        navigate("/"); // Navigate to the home page
        clearCart(); // Clear the cart state
    };

    // Render an empty cart message if the cart is empty
    if (cart.length === 0) {
        return (
            <div className="cart-empty" style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '50vh',
                color: 'white',
                textAlign: 'center'}}>
                <h2>Your cart is empty</h2>
                <p>Add some dishes to your cart to see them here!</p>
            </div>
        );
    }

    return (
        <div className="cart">
            <h2>Your Cart</h2>
            <div className="cart-items">
                {cart.map((item) => (
                    <div key={item.id} className="cart-item">
                        {/* Image Section */}
                        <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="cart-item-image"
                        />

                        {/* Details Section */}
                        <div className="cart-item-details">
                            <div className="cart-item-header">
                                <h3 className="cart-item-name">{item.name}</h3>
                                <div className="cart-item-quantity">
                                    <button
                                        onClick={() =>
                                            decrementQuantity(item.id)
                                        }
                                    >
                                        -
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button
                                        onClick={() =>
                                            incrementQuantity(item.id)
                                        }
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <p className="cart-item-description">
                                {item.description}
                            </p>
                            <p className="cart-item-price">
                            ₹{(item.price * item.quantity).toFixed(2)}
                            </p>
                        </div>

                        {/* Remove Button */}
                        <button
                            className="remove-btn"
                            onClick={() => removeFromCart(item.id)}
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>

            {/* Footer Section */}
            <div className="cart-footer">
                <div className="cart-total">
                    <span>Total:</span>
                    <span>
                    ₹{calculateTotal()}</span>
                </div>
                <button
                    className="checkout-btn"
                    onClick={() => setShowModal(true)}
                >
                    Checkout
                </button>
            </div>

            {/* Modal Popup */}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Order Summary</h3>
                        <p>Total: ₹{calculateTotal()}</p>
                        <div className="input-group">
                            <label>Customer Name:</label>
                            <input
                                type="text"
                                value={customerName}
                                onChange={(e) => setCustomerName(e.target.value)}
                            />
                        </div>
                        <div className="input-group">
                            <label>Phone Number:</label>
                            <input
                                type="text"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </div>
                        {orderNumber ? (
                            <div className="order-confirmation">
                                <p>Order placed successfully!</p>
                                <p>Order Number: {orderNumber}</p>
                                <p>User ID: {userId}</p>
                            </div>
                        ) : (
                            <button
                                className="place-order-btn"
                                onClick={handlePlaceOrder}
                                disabled={loading} // Disable button while loading
                            >
                                {loading ? "Placing Order..." : "Place Order"}
                            </button>
                        )}
                        <button
                            className="close-modal-btn"
                            onClick={handleCloseModal}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CartPage;