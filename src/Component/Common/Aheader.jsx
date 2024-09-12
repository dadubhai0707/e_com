import { MdAccountCircle } from "react-icons/md";
import Profile from "../Admin/Profile";
import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Logout } from '../../Redux-Toolkit/Admin_User/authSlice';

function Aheader({ name }) {
    // _____________________________________________________________
    // All Variable-redux
    // _____________________________________________________________
    const [togale, settogale] = useState(false);
    const dispatch = useDispatch();
    const profileRef = useRef(null);  
    const handleClickOutside = (event) => {
        if (profileRef.current && !profileRef.current.contains(event.target)) {
            settogale(false);
        }
    };
    // _____________________________________________________________
    //Any Where Click Then Togel Profile 
    // _____________________________________________________________

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <>
            <h1>{name}</h1>
            <div className="name-profile" ref={profileRef}>
                <h3>Sanjay Suthar</h3>
                <button className="btn deshbord-header-btn" onClick={() => dispatch(Logout())}>Logout</button>
                <button onClick={() => settogale(!togale)} className="btn profile-icon">
                    <MdAccountCircle />
                </button>
                {togale ? <Profile /> : ''}
            </div>
        </>
    );
}

export default Aheader;
