import React from 'react'
import {MdMenu} from "react-icons/md"
import ResponsiveMenu from './ResponsiveMenu'


const NavbarMenu = [
    {
        id: 1,
        title: "Home"
        //link:"/",
    },
    {
        id: 1,
        title: "About"
        //link:"/",
    },
    {
        id: 1,
        title: "Contact"
        //link:"/",
    },
    {
        id: 1,
        title: "Pricing"
        //link:"/",
    },
    {
        id: 1,
        title: "FAQ"
        //link:"/",
    },
]

const Navbar = () => {
    const [open, setOpen] = React.useState(false);
  return (
    <>
    <nav>
        <div className="container flex justify-between items-center py-4 md:pt-4">
            {/*Logo section*/}
            <div className="flex items-center">
                <p><img src="/images/verification 1.png" alt=""/></p>
                <p><img src="/images/ATTENDANCE TRACKER.png" alt=""/></p>
            </div>
            
            {/*Menu section*/}
            <div className="hidden md:block">
                <ul className="flex items-center gap-6" >
                    {NavbarMenu.map((menu)=>(
                        <li key={menu.id}>
                            <a href={menu.link}
                            className="inline-block py-1 px-16 hover:text-primary hover:shadow-[0_3px_0_-1px_#ef4444] font-roboto">{menu.title}</a>
                        </li>
                    ))}
                    <button>
                        <img src="/images/SignIn_Button.png" alt=""/>
                    </button>
                </ul>
            </div>
            {/*Mobile responsive section*/}
            <div className="md:hidden" 
            onClick={()=> setOpen(!open)}>
                <MdMenu className="text-4xl"/>
            </div>
        </div>
    </nav>
    {/*Mobile Menu section*/}
    <ResponsiveMenu open={open}/>
    </>
  )
}

export default Navbar
