import logoSvg from "../../assets/logo.svg"
import s from "./Header.module.css"

const Header = () => {
    return <header className={s.header}>
        <img src={logoSvg} alt="logo"></img>
        <nav className={s.navigate}> 
            <a href="#" className={s.navLink}>Users</a>
            <a href="#" className={s.navLink}>Sign up</a>
        </nav>
    </header>
}
export default Header