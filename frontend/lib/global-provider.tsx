// import { createContext } from "react";

// interface User {
//     $id: string;
//     name: string;
//     email: string;
//     avatar: string;
// }
// interface GlobalContextType {
//     isLogged: boolean;
//     user: User | null;
//     loading: boolean;
//     refetch: (newParams?: Record<string,string | number>) => Promise<void>;

// }
// const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

// export const GlobalProvider = ({children}: {children: React.ReactNode}) => {

//     return (
//         <GlobalContext.Provider value={{}}>
//             {children}
//         </GlobalContext.Provider>
//     )
// }
