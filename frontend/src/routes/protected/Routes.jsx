import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import { ROUTES_CONST } from '../../constant/routeConstant';
import Home from '../../page/Home';
import Protected from './Protected.jsx'
import Cart from '../../page/Carts/Cart.jsx';
function RoutesComp() {
    const routeConfig = [
        { path: ROUTES_CONST.INDEX, component: Home },
        { path: ROUTES_CONST.CARDS, component: Cart },

    
    
      ];
    return (
        <Routes>
            {
                routeConfig.map((item) => {
                    return(
                        <Route
                        path={item.path}
                        element={< item.component/>}
                    />
                    )

                })
            }
           
            
        </Routes>
    )
}

export default RoutesComp