import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { arrayUnion, doc, getDoc, getFirestore, serverTimestamp, setDoc } from 'firebase/firestore';
import Menu from '../Menu for mobile/menu';
import axios from 'axios';
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
export default function Cart() {
    useEffect(() => {
        document.title = activeZone === 'sneakerzone' ? 'Shopping Cart for Sneakers | luxelayers.com' : activeZone === 'tshirtzone' ? 'Shopping Cart for TShirts | luxelayers.com' : 'Prebooked Sneakers | luxelayers.com'
    })
    const [user, setUser] = useState(false);
    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/auth.user
                const uid = user.uid;
                // console.log('User is signed in');
                setUser(true);
                // ...
            } else {
                // User is signed out
                // ...
                // console.log('User is not signed')
                // setUser(false);
                window.location.replace('/')
            }
        });
        // console.log(user);
    });
    const sneakerzone = true;
    const [activeZone, setActiveZone] = useState('sneakerzone');
    const tshirtzone = false;
    const [documentNames, setDocumentNames] = useState([]);
    const [fetchedAjName, setFetchedAjName] = useState([]);
    const [fetchedAjPic, setFetchedAjPic] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state
    const [fetchedAjPrices, setFetchedAjprices] = useState([]);
    const [documentNamess, setDocumentNamess] = useState([]);
    const [fetchedAjNames, setFetchedAjNames] = useState([]);
    const [fetchedAjPics, setFetchedAjPics] = useState([]);
    const [loadings, setLoadings] = useState(true); // Loading state
    const [fetchedAjPrice, setFetchedAjprice] = useState([]);
    const [total, setTotal] = useState(0);
    const [totaltshirt, setTotaltshirt] = useState(0);
    useEffect(() => {
        const fetchDocumentNames = async () => {
            console.log('Fetching document names...');
            try {
                const auth = getAuth();
                const db = getFirestore(app);
                const currentUser = auth.currentUser;
                if (currentUser) {
                    const UID = currentUser.uid;
                    const cartDocRef = doc(db, 'Cart Items', UID);
                    const cartDocSnap = await getDoc(cartDocRef);
                    if (cartDocSnap.exists()) {
                        const cartData = cartDocSnap.data();
                        const pid = cartData?.['Product ID'] || [];
                        setDocumentNames(pid);
                        const ajName = [];
                        const ajPic = [];
                        const ajprice = [];

                        for (let i = 0; i < pid.length; i++) {
                            const productDocRef = doc(db, 'sneakers', pid[i]);
                            const productDocSnap = await getDoc(productDocRef);
                            if (productDocSnap.exists()) {
                                const productData = productDocSnap.data();
                                ajName.push(productData?.name || 'No Name');
                                ajPic.push(productData?.['Product Image'] || 'No Image');
                                ajprice.push(productData?.Price || 0);
                            }
                        }
                        setFetchedAjName(ajName);
                        setFetchedAjPic(ajPic);
                        setFetchedAjprice(ajprice);

                        // Calculate total price after fetching product prices
                        const totalPrice = ajprice
                            .map(Number)
                            .filter(price => !isNaN(price))
                            .reduce((acc, price) => acc + price, 0);
                        const totalprice = (totalPrice + (totalPrice * 0.18)).toFixed(2);
                        setTotal(totalprice); // Update the total state
                    } else {
                        console.log('No cart items document found');
                    }
                } else {
                    console.log('No current user');
                }
            } catch (error) {
                console.error('Error fetching document names:', error);
            }
        };

        fetchDocumentNames();
    }, []);
    useEffect(() => {
        const fetchDocumentNames = async () => {
            console.log('Fetching document names...');
            try {
                const auth = getAuth();
                const db = getFirestore(app);
                const currentUser = auth.currentUser;
                if (currentUser) {
                    const UID = currentUser.uid;
                    // console.log('Current UID:', UID);
                    const cartDocRef = doc(db, 'Cart Items TShirt', UID);
                    const cartDocSnap = await getDoc(cartDocRef);
                    if (cartDocSnap.exists()) {
                        const cartData = cartDocSnap.data();
                        // console.log('Cart Items data:', cartData);
                        const pid = cartData?.['Product ID'] || [];
                        // console.log('Product IDs:', pid);
                        setDocumentNamess(pid);
                        const ajName = [];
                        const ajPic = [];
                        const ajprice = [];

                        for (let i = 0; i < pid.length; i++) {
                            const productDocRef = doc(db, 'Sleeveless', pid[i]);
                            const productDocSnap = await getDoc(productDocRef);
                            if (productDocSnap.exists()) {
                                const productData = productDocSnap.data();
                                // console.log('Product data:', productData);
                                ajName.push(productData?.name || 'No Name');
                                ajPic.push(productData?.['Product Image'] || 'No Image');
                                ajprice.push(productData?.Price || 0);
                            } else {
                                console.log(`No product data found for ID: ${pid[i]}`);
                            }
                        }
                        setFetchedAjNames(ajName);
                        setFetchedAjPics(ajPic);
                        setFetchedAjprices(ajprice);
                        const totalPrice = ajprice
                            .map(Number)
                            .filter(price => !isNaN(price))
                            .reduce((acc, price) => acc + price, 0);
                        const totalprice = (totalPrice + (totalPrice * 0.18)).toFixed(2);
                        setTotaltshirt(totalprice); // Update the total state
                    } else {
                        console.log('No cart items document found');
                    }
                } else {
                    console.log('No current user');
                }
            } catch (error) {
                console.error('Error fetching document names:', error);
            }
        };

        fetchDocumentNames();
    }, []);
    const [fetchedAjPricess, setFetchedAjpricess] = useState([]);
    const [documentNamesss, setDocumentNamesss] = useState([]);
    const [fetchedAjNamess, setFetchedAjNamess] = useState([]);
    const [fetchedAjPicss, setFetchedAjPicss] = useState([]);
    const [loadingss, setLoadingss] = useState(true); // Loading state
    useEffect(() => {
        const fetchDocumentNames = async () => {
            console.log('Fetching document names...');
            try {
                const auth = getAuth();
                const db = getFirestore(app);
                const currentUser = auth.currentUser;
                if (currentUser) {
                    const UID = currentUser.uid;
                    // console.log('Current UID:', UID);
                    const cartDocRef = doc(db, 'Prebook Items', UID);
                    const cartDocSnap = await getDoc(cartDocRef);
                    if (cartDocSnap.exists()) {
                        const cartData = cartDocSnap.data();
                        // console.log('Cart Items data:', cartData);
                        const pid = cartData?.['Product ID'] || [];
                        // console.log('Product IDs:', pid);
                        setDocumentNamesss(pid);
                        const ajName = [];
                        const ajPic = [];
                        const ajprice = [];

                        for (let i = 0; i < pid.length; i++) {
                            const productDocRef = doc(db, 'Coming Soon', pid[i]);
                            const productDocSnap = await getDoc(productDocRef);
                            if (productDocSnap.exists()) {
                                const productData = productDocSnap.data();
                                // console.log('Product data:', productData);
                                ajName.push(productData?.name || 'No Name');
                                ajPic.push(productData?.['Product Image'] || 'No Image');
                                ajprice.push(productData?.Price || 0);
                            } else {
                                console.log(`No product data found for ID: ${pid[i]}`);
                            }
                        }
                        setFetchedAjNamess(ajName);
                        setFetchedAjPicss(ajPic);
                        setFetchedAjpricess(ajprice);
                    } else {
                        console.log('No cart items document found');
                    }
                } else {
                    console.log('No current user');
                }
            } catch (error) {
                console.error('Error fetching document names:', error);
            }
        };

        fetchDocumentNames();
    }, []);
    const generateorder = async (paymentid) => {
        const name = document.querySelector('#nameInput').value;
        const mobile = document.querySelector('#mobileInput').value;
        const pincode = document.querySelector('#pincodeInput').value;
        const city = document.querySelector('#cityInput').value;
        const address = document.querySelector('#addressInput').value;
        const locality = document.querySelector('#localityInput').value;
        const state = document.querySelector('#stateInput').value;
        const landmark = document.querySelector('#landmarkInput').value;
        const optionalPhone = document.querySelector('#optionalPhoneInput').value;

        // console.log({
        //     'Details':name,
        //     mobile,
        //     pincode,
        //     city,
        //     address,
        //     locality,
        //     state,
        //     landmark,
        //     optionalPhone,
        // });
        const auth = getAuth();
        const db = getFirestore(app); // Initialize Firestore with the Firestore instance
        const currentUser = auth.currentUser;
        const characters = '0123456789';
        let result = 'CT';
        for (let i = 0; i < 6; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        console.log(result);
        const UID = currentUser.uid;
        const userEmail = currentUser.email;
        const cartDocRef = doc(db, 'Order IDs', UID);
        await setDoc(cartDocRef, {
            'IDs': arrayUnion(result)
        }, { merge: true });
        const orderDetailsRef = doc(db, 'Order Details', result);
        await setDoc(orderDetailsRef, {
            'Delivered': false,
            'Name': fetchedAjName,
            'Order Date': serverTimestamp(),
            'Order ID': result,
            'Out_Delivery': false,
            'Price': fetchedAjPrice,
            'Product ID': documentNames,
            'Product Image': fetchedAjPic,
            'Shipped': false,
            'Total': total,
            'Payment ID': paymentid,
            'email': userEmail,
            'Receipent name': name,
            'mobile': mobile,
            'pincode': pincode,
            'city': city,
            'address': address,
            'locality': locality,
            'state': state,
            'landmark': landmark,
            'optionalPhone': optionalPhone
        })
    }
    const generateordertshirt = async (paymentid) => {
        const name = document.querySelector('#nameInput').value;
        const mobile = document.querySelector('#mobileInput').value;
        const pincode = document.querySelector('#pincodeInput').value;
        const city = document.querySelector('#cityInput').value;
        const address = document.querySelector('#addressInput').value;
        const locality = document.querySelector('#localityInput').value;
        const state = document.querySelector('#stateInput').value;
        const landmark = document.querySelector('#landmarkInput').value;
        const optionalPhone = document.querySelector('#optionalPhoneInput').value;

        // console.log({
        //     'Details':name,
        //     mobile,
        //     pincode,
        //     city,
        //     address,
        //     locality,
        //     state,
        //     landmark,
        //     optionalPhone,
        // });
        const auth = getAuth();
        const db = getFirestore(app); // Initialize Firestore with the Firestore instance
        const currentUser = auth.currentUser;
        const characters = '0123456789';
        let result = 'CT';
        for (let i = 0; i < 6; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        console.log(result);
        const UID = currentUser.uid;
        const userEmail = currentUser.email;
        const cartDocRef = doc(db, 'Order IDs', UID);
        await setDoc(cartDocRef, {
            'IDs': arrayUnion(result)
        }, { merge: true });
        const orderDetailsRef = doc(db, 'Order Details', result);
        await setDoc(orderDetailsRef, {
            'Delivered': false,
            'Name': fetchedAjNames,
            'Order Date': serverTimestamp(),
            'Order ID': result,
            'Out_Delivery': false,
            'Price': fetchedAjPrices,
            'Product ID': documentNamess,
            'Product Image': fetchedAjPics,
            'Shipped': false,
            'Total': totaltshirt,
            'Payment ID': paymentid,
            'email': userEmail,
            'Receipent name': name,
            'mobile': mobile,
            'pincode': pincode,
            'city': city,
            'address': address,
            'locality': locality,
            'state': state,
            'landmark': landmark,
            'optionalPhone': optionalPhone
        })
    }
    const handlePayment = async () => {
        const name = document.querySelector('#nameInput').value;
        const mobile = document.querySelector('#mobileInput').value;
        const pincode = document.querySelector('#pincodeInput').value;
        const city = document.querySelector('#cityInput').value;
        const address = document.querySelector('#addressInput').value;
        const locality = document.querySelector('#localityInput').value;
        const state = document.querySelector('#stateInput').value;
        const landmark = document.querySelector('#landmarkInput').value;
        const optionalPhone = document.querySelector('#optionalPhoneInput').value;
        // console.log({
        //     'Details':name,
        //     mobile,
        //     pincode,
        //     city,
        //     address,
        //     locality,
        //     state,
        //     landmark,
        //     optionalPhone,
        // });
        if (name === '' || mobile === '' || pincode === '' || city === '' || address === '' || locality === '' || state === '' || landmark === '' || optionalPhone === '') {
            alert('Please fill all the details');
            return;
        }
        const options = {
            key: 'rzp_test_5ujtbmUNWVYysI', // Your Razorpay Key ID
            amount: (total * 100), // Amount in paise
            currency: 'INR',
            name: 'LuxeLayers',
            description: `Product Order`,
            image: 'https://luxelayers.vercel.app/favicon.ico', // Your logo URL
            handler: async (response) => {
                // Handle payment success
                // console.log(response.razorpay_payment_id);

                try {
                    // Call the AddToCart function
                    await generateorder(response.razorpay_payment_id);
                    // alert('Payment Successful and added to cart!');
                } catch (error) {
                    // console.error('Error adding to cart:', error);
                    // alert('Payment Successful, but failed to add to cart.');
                }
            },
            theme: {
                color: '#F37254'
            }
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
    };
    const [email, setEmail] = useState('');
    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                setEmail(user.email); // Set the email when the user is authenticated
            }
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);
    const handlePaymenttshirt = async () => {
        const name = document.querySelector('#nameInput').value;
        const mobile = document.querySelector('#mobileInput').value;
        const pincode = document.querySelector('#pincodeInput').value;
        const city = document.querySelector('#cityInput').value;
        const address = document.querySelector('#addressInput').value;
        const locality = document.querySelector('#localityInput').value;
        const state = document.querySelector('#stateInput').value;
        const landmark = document.querySelector('#landmarkInput').value;
        const optionalPhone = document.querySelector('#optionalPhoneInput').value;
        // console.log({
        //     'Details':name,
        //     mobile,
        //     pincode,
        //     city,
        //     address,
        //     locality,
        //     state,
        //     landmark,
        //     optionalPhone,
        // });
        if (name === '' || mobile === '' || pincode === '' || city === '' || address === '' || locality === '' || state === '' || landmark === '' || optionalPhone === '') {
            alert('Please fill all the details');
            return;
        }
        const options = {
            key: 'rzp_test_5ujtbmUNWVYysI', // Your Razorpay Key ID
            amount: (totaltshirt * 100), // Amount in paise
            currency: 'INR',
            name: 'LuxeLayers',
            description: `Product Order`,
            image: 'https://luxelayers.vercel.app/favicon.ico', // Your logo URL
            handler: async (response) => {
                // Handle payment success
                // console.log(response);
                try {
                    // Call the AddToCart function
                    await generateordertshirt(response.razorpay_payment_id);
                    // alert('Payment Successful and added to cart!');
                } catch (error) {
                    // console.error('Error adding to cart:', error);
                    // alert('Payment Successful, but failed to add to cart.');
                }
            },
            theme: {
                color: '#F37254'
            }
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
    };
    const [pincode, setPincode] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [locality, setLocality] = useState('');
    const fetchCity = async (pin) => {
        try {
            const response = await axios.get(`https://api.postalpincode.in/pincode/${pin}`);
            if (response.data[0].Status === 'Success' && response.data[0].PostOffice.length > 0) {
                setCity(response.data[0].PostOffice[0].Division); // Get the district name
                setState(response.data[0].PostOffice[0].Circle);
                setLocality(response.data[0].PostOffice[0].Name);
            } else {
                setCity('City not found');
            }
        } catch (error) {
            console.error('Error fetching city:', error);
            setCity('Error fetching city');
        }
    };

    const handlePincodeChange = (e) => {
        const value = e.target.value;
        setPincode(value);
        if (value.length === 6 && /^[0-9]{6}$/.test(value)) { // Check for valid 6-digit pincode
            fetchCity(value);
        } else {
            setCity(''); // Clear city if pincode is invalid
        }
    };
    return (
        <>
            <div className="webbody">
                <div className="headersection">
                    <div className="jdjvkklv">

                        <div className="logo">
                            <div className="searchform">
                                <Menu />
                            </div>
                            {
                                user ? <div className="searchform">
                                    <Link style={{ textDecoration: "none", color: "black" }} to={user ? "/account/order" : '/account/login'}>
                                        <img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/orders-bfe8c4.svg" alt="" />
                                    </Link>
                                </div> : <></>
                            }
                            {
                                user ? <div className="searchform">
                                    <Link style={{ textDecoration: "none", color: "black" }} to={user ? "/account/profile" : '/account/login'}>
                                        <img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/profile-52e0dc.svg" alt="" />
                                    </Link>
                                </div> : <></>
                            }

                        </div>
                    </div>
                    <div className="headeroptions">
                        <div className="options">
                            {/* <Link to="/" style={{ textDecoration: "none", color: "black" }}>SS24</Link> */}
                            <Link to="/footwear" style={{ textDecoration: "none", color: "black" }} className='headerlink'>Footwear</Link>
                            <Link to="/ss24" style={{ textDecoration: "none", color: "black" }}>SS24</Link>
                            <Link to="/AF1" style={{ textDecoration: "none", color: "black" }}>Air Force 1</Link>
                            <Link to="/jordan" style={{ textDecoration: "none", color: "black" }}>Jordan</Link>
                            <Link to="/" style={{ textDecoration: "none", color: "black" }}>Home</Link>
                            <Link to="/dunks" style={{ textDecoration: "none", color: "black" }}>Dunks</Link>
                            <Link to="/airmax" style={{ textDecoration: "none", color: "black" }}>Air Max</Link>
                            <Link to="/slides" style={{ textDecoration: "none", color: "black" }}>Slides</Link>
                            {
                                user ? <Link style={{ textDecoration: "none", color: "red" }}>Logout</Link> :
                                    <Link to={'/account/login'} style={{ textDecoration: "none", color: "black" }}>Login</Link>
                            }
                        </div>
                    </div>
                </div>
                <div className="cart-items" style={{ display: "flex", flexDirection: "row", gap: "0px", }}>
                    <div className="enfemdv" style={{ borderBottom: activeZone === 'sneakerzone' ? '2px solid blue' : '2px solid transparent' }}>
                        <Link
                            style={{ textDecoration: "none", color: activeZone === 'sneakerzone' ? "orangered" : "black" }}
                            onClick={() => setActiveZone('sneakerzone')}
                        >
                            Sneakers Zone ({fetchedAjName.length})
                        </Link>
                    </div>
                    <div className="enfemdv" style={{ borderBottom: activeZone === 'tshirtzone' ? '2px solid blue' : '2px solid transparent' }}>
                        <Link
                            style={{ textDecoration: "none", color: activeZone === 'tshirtzone' ? "orangered" : "black" }}
                            onClick={() => setActiveZone('tshirtzone')}
                        >
                            TShirts Zone ({fetchedAjNames.length})
                        </Link>
                    </div>
                    <div className="enfemdv" style={{ borderBottom: activeZone === 'preebokzone' ? '2px solid blue' : '2px solid transparent' }}>
                        <Link
                            style={{ textDecoration: "none", color: activeZone === 'preebokzone' ? "orangered" : "black" }}
                            onClick={() => setActiveZone('preebokzone')}
                        >
                            Prebooked Sneakers ({fetchedAjNamess.length})
                        </Link>
                    </div>
                </div>
                <div className="udjhcnd">
                    {activeZone === 'sneakerzone' ? <Link className="cart-items" style={{ textDecoration: "none", color: "black" }}>
                        {fetchedAjName.length > 0 ? (
                            fetchedAjName.map((name, index) => (
                                <Link key={index} className="cart-item" to={"/product"} onClick={() => {
                                    localStorage.setItem('producttype', 'sneakers');
                                    localStorage.setItem('iscart', true);
                                    localStorage.setItem('productname', fetchedAjName[index]);
                                    localStorage.setItem('productprice', fetchedAjPrice[index]);
                                    localStorage.setItem('productimage', fetchedAjPic[index]);
                                    localStorage.setItem('PID', documentNames[index]);
                                    console.log(documentNames[index]);
                                }} style={{ textDecoration: "none", color: "black" }}>
                                    <img src={fetchedAjPic[index]} alt={name} className="cart-item-image" />
                                    <div className="cart-item-details">
                                        <h3 className="cart-item-name">{name}</h3>
                                        <br /><br />
                                        <p className="cart-item-price" style={{ fontWeight: "500" }}>₹{fetchedAjPrice[index]}</p>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <p>No sneakers in cart</p>
                        )}
                    </Link> : <></>}


                </div>
                <div className="udjhcnd">
                    {activeZone === 'tshirtzone' ? <Link className="cart-items" style={{ textDecoration: "none", color: "black" }}>
                        {fetchedAjNames.length > 0 ? (
                            fetchedAjNames.map((name, index) => (
                                <Link key={index} className="cart-item" to={"/products/tshirts"} onClick={() => {
                                    localStorage.setItem('producttype', 'Sleeveless');
                                    localStorage.setItem('iscart', true);
                                    localStorage.setItem('productname', fetchedAjNames[index]);
                                    localStorage.setItem('productprice', fetchedAjPrices[index]);
                                    localStorage.setItem('productimage', fetchedAjPics[index]);
                                    localStorage.setItem('PID', documentNamess[index]);
                                    console.log('DOc name', documentNamess[index]);
                                }} style={{ textDecoration: "none", color: "black" }}>
                                    <img src={fetchedAjPics[index]} alt={name} className="cart-item-image" />
                                    <div className="cart-item-details">
                                        <h3 className="cart-item-name">{fetchedAjNames[index]}</h3>
                                        <br /><br />
                                        <p className="cart-item-price" style={{ fontWeight: "500" }}>₹{fetchedAjPrices[index]}</p>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <p>No tshirts in cart</p>
                        )}
                    </Link> : <></>}

                </div>
                {activeZone === 'preebokzone' ? <Link className="cart-items" style={{ textDecoration: "none", color: "black" }}>
                    {fetchedAjNamess.length > 0 ? (
                        fetchedAjNamess.map((name, index) => (
                            <Link key={index} className="cart-item" to={"/products/comingsoon"} onClick={() => {
                                localStorage.setItem('producttypeupcoming', 'Coming Soon');
                                localStorage.setItem('productnameupcoming', fetchedAjNamess[index]);
                                localStorage.setItem('productpriceupcoming', fetchedAjPricess[index]);
                                localStorage.setItem('productimageupcoming', fetchedAjPicss[index]);
                                localStorage.setItem('PIDupcoming', documentNamesss[index]);
                                console.log(documentNamess[index]);
                            }} style={{ textDecoration: "none", color: "black" }}>
                                <img src={fetchedAjPicss[index]} alt={name} className="cart-item-image" />
                                <div className="cart-item-details">
                                    <h3 className="cart-item-name">{fetchedAjNamess[index]}</h3>
                                    <br /><br />
                                    <p className="cart-item-price" style={{ fontWeight: "500" }}>₹{fetchedAjPricess[index]}</p>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p>No items prebooked</p>
                    )}
                </Link> : <></>}
                {fetchedAjName.length > 0 && activeZone === 'sneakerzone' && (
                    <div className="jenfke">
                        <div className="kekkfmdva">Delivery Address
                        </div>
                        <div className="jnlfmlkfmewlk">
                            <div className="detailsentryfirstrow">
                                <div className="khjkf" style={{ marginLeft: '10px' }}>
                                    <input type="text" className="name" placeholder="Name" id='nameInput' />
                                </div>
                                <div className="khjkf">
                                    <input type="tel" className="name" placeholder="10-digit mobile number" id='mobileInput' pattern="[0-9]{10}" />
                                </div>
                            </div>
                            <div className="detailsentryfirstrow">
                                <div className="khjkf" style={{ marginLeft: '10px' }}>
                                    <input
                                        type="text"
                                        className="name"
                                        placeholder="Pincode"
                                        id='pincodeInput'  // Added unique ID
                                        value={pincode}
                                        onChange={handlePincodeChange}
                                    />
                                </div>
                                <div className="khjkf">
                                    <input
                                        type="text"
                                        className="name"
                                        placeholder="City/District/Town"
                                        id='cityInput'  // Added unique ID
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="detailsentryfirstrow">
                                <div className="khjkf" style={{ marginLeft: '10px' }}>
                                    <input
                                        type="text"
                                        className="name"
                                        placeholder="Address (Area and Street)"
                                        id='addressInput'
                                        style={{
                                            height: '200px',
                                            width: "50vw",
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="detailsentryfirstrow">
                                <div className="khjkf" style={{ marginLeft: '10px' }}>
                                    <input type="text" className="name" placeholder="Locality" id='localityInput' value={locality} onChange={(e) => setLocality(e.target.value)} />
                                </div>
                                <div className="khjkf">
                                    <input type="text" className="name" placeholder="State" id='stateInput' value={state} onChange={(e) => setState(e.target.value)} />
                                </div>
                            </div>
                            <div className="detailsentryfirstrow">
                                <div className="khjkf" style={{ marginLeft: '10px' }}>
                                    <input type="text" className="name" placeholder="Landmark (Optional)" id='landmarkInput' />
                                </div>
                                <div className="khjkf">
                                    <input type="tel" className="name" placeholder="Optional phone number" id='optionalPhoneInput' />
                                </div>
                            </div>
                        </div>
                    </div>

                )}
                {
                    fetchedAjName.length > 0 && activeZone === 'sneakerzone' && (
                        <div className="jenfke">
                            <div className="kekkfmdva">Order Summary
                            </div>
                            <div className="jnlfmlkfmewlk" style={{height:"fit-content"}}>
                                {fetchedAjName.length > 0 ? (
                                    fetchedAjName.map((name, index) => (
                                        <Link key={index} className="cart-item"  style={{ textDecoration: "none", color: "black",backgroundColor:"#e0e0e0" }}>
                                            <img src={fetchedAjPic[index]} alt={name} className="cart-item-image" />
                                            <div className="cart-item-details">
                                                <h3 className="cart-item-name">{name}</h3>
                                                <br /><br />
                                                <p className="cart-item-price" style={{ fontWeight: "500",display:"flex",justifyContent:"start" }}>₹{fetchedAjPrice[index]}</p>
                                            </div>
                                        </Link>
                                    ))
                                ) : (
                                    <p>No sneakers in cart</p>
                                )}
                            </div>
                        </div>
                    )
                }
                {
                    fetchedAjName.length > 0 && activeZone === 'sneakerzone' && (
                        <div className="jenfke">
                            <div className="kekkfmdva" style={{fontWeight:"300",fontSize:"15px",justifyContent:"start",textAlign:"start"}}>Order confirmation email will be sent to {email}
                            </div>
                            <div className="jnlfmlkfmewlk" style={{height:"fit-content",backgroundColor:"white"}}>
                            </div>
                        </div>
                    )
                }
                {fetchedAjNames.length > 0 && activeZone === 'tshirtzone' && (
                    <div className="jenfke">
                        <div className="kekkfmdva">Delivery Address</div>
                        <div className="jnlfmlkfmewlk">
                            <div className="detailsentryfirstrow">
                                <div className="khjkf" style={{ marginLeft: '10px' }}>
                                    <input type="text" className="name" placeholder="Name" id='nameInput' />
                                </div>
                                <div className="khjkf">
                                    <input type="tel" className="name" placeholder="10-digit mobile number" id='mobileInput' pattern="[0-9]{10}" />
                                </div>
                            </div>
                            <div className="detailsentryfirstrow">
                                <div className="khjkf" style={{ marginLeft: '10px' }}>
                                    <input
                                        type="text"
                                        className="name"
                                        placeholder="Pincode"
                                        id='pincodeInput'  // Added unique ID
                                        value={pincode}
                                        onChange={handlePincodeChange}
                                    />
                                </div>
                                <div className="khjkf">
                                    <input
                                        type="text"
                                        className="name"
                                        placeholder="City/District/Town"
                                        id='cityInput'  // Added unique ID
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="detailsentryfirstrow">
                                <div className="khjkf" style={{ marginLeft: '10px' }}>
                                    <input
                                        type="text"
                                        className="name"
                                        placeholder="Address (Area and Street)"
                                        id='addressInput'
                                        style={{
                                            height: '200px',
                                            width: "50vw",
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="detailsentryfirstrow">
                                <div className="khjkf" style={{ marginLeft: '10px' }}>
                                    <input type="text" className="name" placeholder="Locality" id='localityInput' value={locality} onChange={(e) => setLocality(e.target.value)} />
                                </div>
                                <div className="khjkf">
                                    <input type="text" className="name" placeholder="State" id='stateInput' value={state} onChange={(e) => setState(e.target.value)} />
                                </div>
                            </div>
                            <div className="detailsentryfirstrow">
                                <div className="khjkf" style={{ marginLeft: '10px' }}>
                                    <input type="text" className="name" placeholder="Landmark (Optional)" id='landmarkInput' />
                                </div>
                                <div className="khjkf">
                                    <input type="tel" className="name" placeholder="Optional phone number" id='optionalPhoneInput' />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                
                {
                    fetchedAjNames.length > 0 && activeZone === 'tshirtzone' && (
                        <div className="jenfke">
                            <div className="kekkfmdva">Order Summary
                            </div>
                            <div className="jnlfmlkfmewlk" style={{height:"fit-content"}}>
                                {fetchedAjNames.length > 0 ? (
                                    fetchedAjNames.map((name, index) => (
                                        <Link key={index} className="cart-item" style={{ textDecoration: "none", color: "black",backgroundColor:"#e0e0e0" }}>
                                            <img src={fetchedAjPics[index]} alt={name} className="cart-item-image" />
                                            <div className="cart-item-details">
                                                <h3 className="cart-item-name">{fetchedAjNames[index]}</h3>
                                                <br /><br />
                                                <p className="cart-item-price" style={{ fontWeight: "500",display:"flex",justifyContent:"start" }}>₹{fetchedAjPrices[index]}</p>
                                            </div>
                                        </Link>
                                    ))
                                ) : (
                                    <p>No sneakers in cart</p>
                                )}
                            </div>
                        </div>
                    )
                }
                {
                    fetchedAjName.length > 0 && activeZone === 'tshirtzone' && (
                        <div className="jenfke">
                            <div className="kekkfmdva" style={{fontWeight:"300",fontSize:"15px",justifyContent:"start",textAlign:"start"}}>Order confirmation email will be sent to {email}
                            </div>
                            <div className="jnlfmlkfmewlk" style={{height:"fit-content",backgroundColor:"white"}}>
                            </div>
                        </div>
                    )
                }
                <br /><br /> 
                {fetchedAjNames.length > 0 ? activeZone === 'tshirtzone' ? (
                    <Link style={{ textDecoration: "none", color: "black" }}>
                        <div className="kekkfmdv" >
                            Total: ₹{totaltshirt}
                            <div className="checkoutbutton" onClick={() => handlePaymenttshirt()}>
                                Checkout
                            </div>
                        </div>
                    </Link>
                ) : null : <></>}
                {fetchedAjName.length > 0 ? activeZone === 'sneakerzone' ? (
                    <Link style={{ textDecoration: "none", color: "black" }}>
                        <div className="kekkfmdv" >
                            Total: ₹{total}
                            <div className="checkoutbutton" onClick={() => handlePayment()}>
                                Checkout
                            </div>
                        </div>
                    </Link>
                ) : null : <></>}
                <br /><br />
            </div>
        </>
    )
}