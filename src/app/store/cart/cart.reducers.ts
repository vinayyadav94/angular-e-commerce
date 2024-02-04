import { createReducer, on } from '@ngrx/store';
import { Cart } from '../../models/cart.model';
import { removeCart, updateCart } from './cart.actions';
import { User } from 'src/app/models/user.model';

const initialCart: Cart = getEmptyCart();

export const cartReducer = createReducer(
    initialCart,
    on(updateCart, ( state, { cart }) => {
        console.log('updating cart in store');
        return { ...cart };
    }),
    on(removeCart, ( state ) => {
        return getEmptyCart();
    }) 
    );

    function getEmptyCart(){
        return {
            cartId: '',
            createdAt: new Date(),
            items: [],
            user: new User('','','','','')
        };
    }