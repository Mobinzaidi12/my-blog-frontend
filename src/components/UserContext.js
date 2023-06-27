import { createContext } from "react";


export const UserContext = createContext({});


export function UserContextProvider({ Children }) {

    return (<>
        <UserContext.Provider value={{}}>
            {Children}
        </UserContext.Provider>


    </>)
}