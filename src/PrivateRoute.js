import {Route, Redirect} from "react-router-dom";

const PrivateRoute = ({children, isAuthenticated, ...rest}) => {
    return (
        <Route
            {...rest}
            render = {() => {
                if(isAuthenticated)
                {
                    return (children);
                } else {
                    return <Redirect to="/login"/>
                }
            }}
        />
    )
}

export default PrivateRoute;