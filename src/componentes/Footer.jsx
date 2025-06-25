import GitHub from "../assets/github.png";
import Instagram from "../assets/instagram.png";

const Footer = () =>{
    return(
        <div className="Footer">
            <p>Ecomerce © 2025 by Danos is licensed under CC BY-NC 4.0</p>
            <div className="social-media">
                <a href="https://github.com/DaSanLi">
                <img src={GitHub} title="GitHub"/></a>
                <a href="https://www.instagram.com/">
                <img src={Instagram} title="Instagram"/></a>
            </div>
        </div>
    )
}

export default Footer