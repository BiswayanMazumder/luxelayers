import React from 'react'
import { Link } from 'react-router-dom'

export default function Jordan() {
    const imageUrls = [
        "https://images.vegnonveg.com/resized/400X328/11393/air-jordan-1-low-off-noirarchaeo-brown-sail-brown-66b362b30f4dc.jpg",
        "https://images.vegnonveg.com/resized/400X328/11393/air-jordan-1-low-off-noirarchaeo-brown-sail-brown-66b362b35ce83.jpg",
        "https://images.vegnonveg.com/resized/400X328/11422/air-jordan-4-retro-se-smoke-greyiron-grey-cement-grey-grey-66b48d859813d.jpg",
        "https://images.vegnonveg.com/resized/400X328/11422/air-jordan-4-retro-se-smoke-greyiron-grey-cement-grey-grey-66b48d8603d63.jpg",
        "https://images.vegnonveg.com/resized/400X328/11425/air-jordan-1-low-whitemetallic-gold-black-white-66bb4992d8cb4.jpg",
        "https://images.vegnonveg.com/resized/400X328/11425/air-jordan-1-low-whitemetallic-gold-black-white-66bb499322a13.jpg",
        "https://images.vegnonveg.com/resized/400X328/11381/air-jordan-1-mid-se-whiteoxidized-green-sail-neutral-grey-white-66a8c651cc6f3.jpg",
        "https://images.vegnonveg.com/resized/400X328/11247/air-jordan-1-low-se-oxidized-greenwhite-sail-green-66a8c54429f5d.jpg",
        "https://images.vegnonveg.com/resized/400X328/11247/air-jordan-1-low-se-oxidized-greenwhite-sail-green-66a8c544725c4.jpg",
        "https://images.vegnonveg.com/resized/400X328/11241/air-jordan-1-low-se-hemplight-british-tan-sail-oatmeal-brown-667d3e4f7c748.jpg",
        "https://images.vegnonveg.com/resized/400X328/11241/air-jordan-1-low-se-hemplight-british-tan-sail-oatmeal-brown-667d3e4fd25f1.jpg",
        "https://images.vegnonveg.com/resized/400X328/11429/air-jordan-4-retro-blackwhite-black_1-66c71921807e0.jpg",
        "https://images.vegnonveg.com/resized/400X328/11429/air-jordan-4-retro-blackwhite-black_1-66c71921c754a.jpg",
        "https://images.vegnonveg.com/resized/400X328/11428/air-jordan-4-retro-blackwhite-black-66c718d11e771.jpg",
        "https://images.vegnonveg.com/resized/400X328/11426/air-jordan-1-mid-saillight-dew-muslin-white-66bb4a42e2b7a.jpg",
        "https://images.vegnonveg.com/resized/400X328/11426/air-jordan-1-mid-saillight-dew-muslin-white-66bb4a431e495.jpg",
        "https://images.vegnonveg.com/resized/400X328/11216/air-jordan-11-retro-low-whitemidnight-navy-diffused-blue-white-6662eaf4ed74c.jpg",
        "https://images.vegnonveg.com/resized/400X328/11216/air-jordan-11-retro-low-whitemidnight-navy-diffused-blue-white-6662eaf5294de.jpg",
        "https://images.vegnonveg.com/resized/400X328/11395/air-jordan-5-retro-whiteblack-sail-metallic-silver-white-66b365aa44059.jpg",
        "https://images.vegnonveg.com/resized/400X328/11394/air-jordan-1-low-whitebordeaux-sail-purple-66b364fe14e20.jpg",
        "https://images.vegnonveg.com/resized/400X328/9805/air-jordan-1-mid-whiteblack-white-64dcc2a91c4af.jpg",
        "https://images.vegnonveg.com/resized/400X328/9805/air-jordan-1-mid-whiteblack-white-64dcc2a979f95.jpg",
        "https://images.vegnonveg.com/resized/400X328/11375/air-jordan-1-retro-high-og-blackmetallic-gold-sail-black_1-66a8c4bbb4277.jpg",
        "https://images.vegnonveg.com/resized/400X328/11375/air-jordan-1-retro-high-og-blackmetallic-gold-sail-black_1-66a8c4bc2d73f.jpg",
        "https://images.vegnonveg.com/resized/400X328/11374/air-jordan-1-retro-high-og-blackmetallic-gold-sail-black-66a8c41a8efe9.jpg",
        "https://images.vegnonveg.com/resized/400X328/11324/air-jordan-1-retro-high-og-university-blueuniversity-gold-sail-blue-6690d2df36ed7.jpg",
        "https://images.vegnonveg.com/resized/400X328/11309/air-jordan-1-low-sailneutral-grey-coconut-milk-grey-6690bb424cd21.jpg",
        "https://images.vegnonveg.com/resized/400X328/11316/air-jordan-1-mid-blackmetallic-gold-white-black-6690bdacce982.jpg",
        "https://images.vegnonveg.com/resized/400X328/11316/air-jordan-1-mid-blackmetallic-gold-white-black-6690bdad1b6da.jpg",
        "https://images.vegnonveg.com/resized/400X328/11306/air-jordan-1-low-whitesky-grey-football-grey-white-6690ba64af00f.jpg",
        "https://images.vegnonveg.com/resized/400X328/11303/air-jordan-1-mid-legend-light-brownsail-muslin-white-6690b3636add7.jpg",
        "https://images.vegnonveg.com/resized/400X328/11352/air-jordan-3-retro-tex-dark-driftwoodsail-hemp-velvet-brown-brown-6690d2874de39.jpg",
        "https://images.vegnonveg.com/resized/400X328/11352/air-jordan-3-retro-tex-dark-driftwoodsail-hemp-velvet-brown-brown-6690d28783e41.jpg",
        "https://images.vegnonveg.com/resized/400X328/11307/air-jordan-1-retro-low-og-whiteblack-wolf-grey-white-6690d206a3124.jpg",
        "https://images.vegnonveg.com/resized/400X328/11307/air-jordan-1-retro-low-og-whiteblack-wolf-grey-white-6690d206dfa2c.jpg",
        "https://images.vegnonveg.com/resized/400X328/11315/air-jordan-1-mid-blackwhite-gym-red-black_1-669113064f7db.jpg",
        "https://images.vegnonveg.com/resized/400X328/11301/air-jordan-1-low-whitewolf-grey-midnight-navy-grey-6690b22d90729.jpg",
        "https://images.vegnonveg.com/resized/400X328/11344/air-jordan-legacy-312-low-whitelight-dew-sail-white-669113bfa0306.jpg",
        "https://images.vegnonveg.com/resized/400X328/11248/air-jordan-1-mid-se-neutral-greysmoke-grey-sail-grey-66865b3831d31.jpg",
        "https://images.vegnonveg.com/resized/400X328/11248/air-jordan-1-mid-se-neutral-greysmoke-grey-sail-grey-66865b386d852.jpg",
        "https://images.vegnonveg.com/resized/400X328/11233/air-jordan-13-retro-dune-redterra-blush-white-red-667549df633ec.jpg",
        "https://images.vegnonveg.com/resized/400X328/10654/air-jordan-1-low-85-whitenavy-blue-65ba3f129749e.jpg",
    ];

    return (
        <>
            <div className="webbody">
                <div className="headersection">
                    <div className="logo">
                        <div className="searchform">
                            {/* <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" class="icon icon-hamburger" fill="none" viewBox="0 0 18 16">
                                <path d="M1 .5a.5.5 0 100 1h15.71a.5.5 0 000-1H1zM.5 8a.5.5 0 01.5-.5h15.71a.5.5 0 010 1H1A.5.5 0 01.5 8zm0 7a.5.5 0 01.5-.5h15.71a.5.5 0 010 1H1a.5.5 0 01-.5-.5z" fill="currentColor">
                                </path></svg> */}
                            <svg focusable="false" width="18" height="18" className="icon icon--header-search" viewBox="0 0 18 18">
                                <path d="M12.336 12.336c2.634-2.635 2.682-6.859.106-9.435-2.576-2.576-6.8-2.528-9.435.106C.373 5.642.325 9.866 2.901 12.442c2.576 2.576 6.8 2.528 9.435-.106zm0 0L17 17" fill="none" stroke="currentColor" strokeWidth="2"></path>
                            </svg>
                        </div>
                        <div className="logoimage">
                            <img src="https://g1uudlawy6t63z36.public.blob.vercel-storage.com/_fa24086d-6873-4c24-9ff6-0aceb7380333-QyUF9bBdbH9jERIGwpyEPhaZ2HcKZL.jpg" alt="" className='logoimg' onClick={() => window.location.href = "/"} />
                        </div>
                    </div>
                    <div className="headeroptions">
                        <div className="options">
                            <Link style={{ textDecoration: "none", color: "black" }} className='headerlink'>New Arrivals</Link>
                            <Link style={{ textDecoration: "none", color: "black" }}>Latest Drop</Link>
                            <Link style={{ textDecoration: "none", color: "black" }}>Shop Men</Link>
                            <Link style={{ textDecoration: "none", color: "black" }}>Heavy Weight</Link>
                            <Link to="/" style={{ textDecoration: "none", color: "black" }}>Home</Link>
                            <Link style={{ textDecoration: "none", color: "black" }}>Shop Women</Link>
                            <Link style={{ textDecoration: "none", color: "black" }}>About Us</Link>
                            <Link style={{ textDecoration: "none", color: "black" }}>Sale</Link>
                            <Link style={{ textDecoration: "none", color: "black" }}>Contact Us</Link>
                        </div>
                    </div>
                </div>
                <img src="https://images.vegnonveg.com/media/collections/102/172007371710266863df57389e.png" alt="" width={"100%"}  />
                <div className="fgfhhgjjh">
                    {
                        imageUrls.map((url, index) => (
                            <div className="jenfkjfrf">
                            <img src={imageUrls[index]} alt="" />
                            </div>
                        ))
                    }
                </div>
                <br /><br />
            </div>
        </>
    )
}
