import { HashLink} from "react-router-hash-link"

function Footer() {

    return(
        <footer className="footer">
            <HashLink smooth to='/#contacts' >Contacts</HashLink>
        </footer>
    )
}
export default Footer;