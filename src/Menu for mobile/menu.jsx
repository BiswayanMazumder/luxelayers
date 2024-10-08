// src/Menu.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"; // Import signOut

const firebaseConfig = {
    apiKey: "AIzaSyAvYR2_B7BVNKufzGZHaaUcxJYWKyQ-_Jk",
    authDomain: "luxelayers.firebaseapp.com",
    projectId: "luxelayers",
    storageBucket: "luxelayers.appspot.com",
    messagingSenderId: "293993080821",
    appId: "1:293993080821:web:713b6779443a50ac0922bc",
    measurementId: "G-PKC7WSY6LG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(); // Initialize auth here

const Menu = () => {
    const [user, setUser] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(true);
            } else {
                setUser(false);
            }
        });

        return () => unsubscribe(); // Clean up the subscription on unmount
    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = async () => {
        try {
            await signOut(auth); // Use signOut function from Firebase Auth
            console.log('User signed out');
            window.location.replace('/');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <div className="menu-container">
            <div className="menu-bar" onClick={toggleMenu}>
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
            </div>
            {isOpen && (
                <div className="menu-options">
                    <ul>
                        <Link to={'/footwear'} style={{ textDecoration: 'none', color: 'black' }}>
                            <li>Footwear</li>
                        </Link>
                        <Link style={{ textDecoration: 'none', color: 'black' }} to={'/ss24'}>
                            <li>SS 24</li>
                        </Link>
                        <Link style={{ textDecoration: 'none', color: 'black' }} to={'/af1'}>
                            <li>Air Force 1</li>
                        </Link>
                        <Link style={{ textDecoration: 'none', color: 'black' }} to={'/jordan'}>
                            <li>Jordan</li>
                        </Link>
                        <Link style={{ textDecoration: 'none', color: 'black' }} to={'/'}>
                            <li>Home</li>
                        </Link>
                        <Link style={{ textDecoration: 'none', color: 'black' }} to={'/dunks'}>
                            <li>Dunks</li>
                        </Link>
                        <Link style={{ textDecoration: 'none', color: 'black' }} to={'/airmax'}>
                            <li>Air Max</li>
                        </Link>
                        <Link style={{ textDecoration: 'none', color: 'black' }} to={'/slides'}>
                            <li>Slides</li>
                        </Link>
                        {user ? (
                            <li onClick={handleLogout} style={{ cursor: 'pointer' }} >Logout</li>
                        ) : (
                            <Link style={{ textDecoration: 'none', color: 'black' }} to={'/account/login'}>
                                <li>Login</li>
                            </Link>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Menu;
