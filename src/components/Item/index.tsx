import React from "react";
import styled from "styled-components";
import {Button} from "@material-ui/core";

import {CartItemType} from "../../App";


const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  border: 1px solid lightblue;
  border-radius: 20px;

  button {
    border-radius: 0 0 20px 20px;
  }

  img {
    max-height: 250px;
    object-fit: cover;
    border-radius: 20px 20px 0 0;
  }

  div {
    height: 100%;
    font-family: Arial sans-serif;
    padding: 1rem;
  }
`

type Props = {
    item: CartItemType;
    handleAddToCart: (clickedItem: CartItemType) => void
}

const Item: React.FC<Props> = ({item, handleAddToCart}) => {
    return (
        <Wrapper>
               <img src={item.image} alt={item.title}/>
               <div>
                   <h3>{item.title}</h3>
                   <p>{item.description}</p>
                   <h3>${item.price}</h3>
               </div>

               <Button onClick={() => handleAddToCart(item)}>
                   Add to Cart
               </Button>
        </Wrapper>
    );
};

export default Item;
