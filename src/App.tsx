import {useState} from "react"
import {useQuery} from "react-query"

import {Drawer, LinearProgress, Badge} from "@material-ui/core"
import {AddShoppingCart} from "@material-ui/icons"

import {Wrapper, StyledButton} from "./App.styles"
import Item from "./components/Item"
import CartDrawer from "./components/CartDrawer"

export type CartItemType = {
    id: number;
    category: string;
    description: string;
    image: string;
    price: number;
    title: string;
    amount: number;
}


const getProducts = async (): Promise<CartItemType[]> => {
    return await (await fetch("https://fakestoreapi.com/products")).json()
}


function App() {
    const {data, isLoading, error} = useQuery("products", getProducts)
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [cartItems, setCartItems] = useState<CartItemType[]>([])


    const getTotalItems = (items: CartItemType[]) => {
        return items.reduce((ack: number, item) => ack + item.amount, 0)
    }


    const handleAddToCart = (clickedItem: CartItemType) => {
        setCartItems(prevState => {
            const isItemInCart = prevState.find(item => item.id === clickedItem.id)

            if (isItemInCart) {
                return prevState.map(item => item.id === clickedItem.id ? {...item, amount: item.amount + 1} : item)
            }

            return [...prevState, {...clickedItem, amount: 1}]

        })
    }


    const handleRemoveFromCart = (id: number) => {

        setCartItems(prevState =>
            prevState.reduce((ack, item) => {
                if (item.id === id) {
                    if (item.amount === 1) return ack // ack is []

                    return [...ack, {...item, amount: item.amount - 1}]
                } else {
                    return [...ack, item]
                }
            }, [] as CartItemType[])
        )
    }


    if (isLoading) return <LinearProgress/>
    if (error) return <div>Something went Wrong</div>


    return (
        <>
            <Wrapper>
                <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                    <CartDrawer
                        cartItems={cartItems}
                        addToCart={handleAddToCart}
                        removeFromCart={handleRemoveFromCart}
                    />
                </Drawer>


                {
                    data?.map(item =>
                        <div key={item.id}>
                            <Item item={item} handleAddToCart={handleAddToCart}/>
                        </div>
                    )
                }


            </Wrapper>
            <StyledButton onClick={() => setDrawerOpen(true)}>
                <Badge badgeContent={getTotalItems(cartItems)} color="error">
                    <AddShoppingCart/>
                </Badge>
            </StyledButton>
        </>
    );
}

export default App;
