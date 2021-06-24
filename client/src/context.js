import React, {useState, useContext, useEffect} from 'react'
//
const Context = React.createContext();

const ContextProvider = ({children}) => {
//     const [curTheme, setTheme] = useState('def');
    const [isMobile, setIsMobile] = useState(false);
//     const [sideBarIsOpen,setsideBarIsOpen] = useState(false);
//     const toggle = () => {
//         setIsOpen(!isOpen)
//     }
//     const switchTheme = (newTheme) => {
//         setTheme(newTheme)
//         localStorage.setItem("curTheme",curTheme)
//         console.log("design")
//     }
    const handleWindowChange = (windoWidth) => {
        if(windoWidth <= 500) {
            setIsMobile(true)
        }
        setIsMobile(false);
    }
    useEffect(() => {
        window.addEventListener('resize', handleWindowChange);
        return () => {
            window.removeEventListener('resize', handleWindowChange);
        }

    },[]);


    //     return (
//         <Context.Provider value={{curTheme, switchTheme,toggle,isOpen,sideBarIsOpen,setsideBarIsOpen}}>
//             {children}
//         </Context.Provider>
//     );
// export const useGlobalContext = () => {
//     return useContext(Context)
// }
//
// export {Context,ContextProvider};
}
