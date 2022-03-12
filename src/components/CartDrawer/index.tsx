import React from 'react';
import styled from "styled-components";

import CartItem from "./CartItem";
import {CartItemType} from "../../App";

const Wrapper = styled.aside`
  width: 500px;
  padding: 20px;
  font-family: Arial sans-serif;
`

type Props = {
    cartItems: CartItemType[]
    addToCart: (clickedItem: CartItemType) => void
    removeFromCart: (id: number) => void
}

const CartDrawer: React.FC<Props> = ({cartItems, addToCart, removeFromCart}) => {

    const calculateTotal = (items: CartItemType[]) => items.reduce((ack: number, item) => ack + item.amount * item.price, 0)

    return (
        <Wrapper>
            <h2>Your Shopping Cart</h2>
            {cartItems.length === 0 ? <p>No items in cart.</p> : null}

            {cartItems.map(item =>
                <CartItem key={item.id} item={item} addToCart={addToCart} removeFromCart={removeFromCart}/>
            )}

            <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
        </Wrapper>
    );
};

export default CartDrawer;
