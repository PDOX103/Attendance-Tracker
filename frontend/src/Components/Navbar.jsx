import React, { useEffect } from "react";
import { MdMenu } from "react-icons/md";
import ResponsiveMenu from "./ResponsiveMenu";
import { motion } from "framer-motion";
import { Link, NavLink, useNavigate } from "react-router-dom";

const NavbarMenu = [
  { id: 1, title: "Home", link: "/" },
  { id: 2, title: "About", link: "/about" },
  { id: 3, title: "Contact", link: "/contact" },
  { id: 4, title: "Pricing", link: "/pricing" },
  { id: 5, title: "FAQ", link: "/faq" },
];

const Navbar = ({ isSignedIn, setIsSignedIn }) => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const signedInStatus = localStorage.getItem("isSignedIn");
    if (signedInStatus === "true") {
      setIsSignedIn(true);
    }
  }, [setIsSignedIn]);

  const handleSignOut = () => {
    setIsSignedIn(false);
    localStorage.setItem("isSignedIn", "false"); 
    navigate("/");
  };

  const handleSignIn = () => {
    setIsSignedIn(true);
    localStorage.setItem("isSignedIn", "true"); 
  };

  return (
    <>
      <nav>
        <motion.div
          className="container flex justify-between items-center py-4 md:pt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {/*Logo section*/}
          <div className="flex items-center">
            <p>
              <img src="/images/verification 1.png" alt="" />
            </p>
            <p>
              <img src="/images/ATTENDANCE TRACKER.png" alt="" />
            </p>
          </div>

          {/*Menu section*/}
          <div className="hidden md:block">
            <ul className="flex items-center gap-6">
              {NavbarMenu.map((menu) => (
                <li key={menu.id}>
                  <NavLink to={menu.link} className="inline-block py-1 px-16 hover:text-primary hover:shadow-[0_3px_0_-1px_#ef4444] font-roboto">
                    {menu.title}
                  </NavLink>
                </li>
              ))}
              {isSignedIn ? (
                <button onClick={handleSignOut} className="hover:!scale-110 duration-300">
                  <img src="/images/Log_out.png" alt="Log Out" />
                </button>
              ) : (
                <Link to="/signin" className="hover:!scale-110 duration-300">
                  <img src="/images/SignIn_Button.png" alt="Sign In" />
                </Link>
              )}
            </ul>
          </div>
          {/*Mobile responsive section*/}
          <div className="md:hidden" onClick={() => setOpen(!open)}>
            <MdMenu className="text-4xl" />
          </div>
        </motion.div>
      </nav>
      {/*Mobile Menu section*/}
      <ResponsiveMenu open={open} />
    </>
  );
};

export default Navbar;