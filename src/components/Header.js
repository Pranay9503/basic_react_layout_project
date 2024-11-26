import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import '../App.css'

function Header() {
    const navigate = useNavigate();
    const userId = JSON.parse(localStorage.getItem('user-info'));
    function logout() {
        localStorage.clear();
        navigate('/signin');
    }
    return (
        <header style={{backgroundColor: '#fff'}}>
            <div className="container">
                <nav>
                {localStorage.getItem('user-token') ?  
                    <>
                    <div className="logo">
                        <img src="https://earbor.com/assets/images/logos/logo-1.png" alt=""/>
                    </div>
                        <ul>
                            <li>
                                <Link style={{textDecoration:'none',color:'black',fontWeight:'bold'}} to="/">Home</Link>
                            </li>
                            <li>
                                <Link style={{textDecoration: 'none',color:'black',fontWeight:'bold'}} to="/products">Users</Link>    
                            </li>    
                            <li>
                                <Link style={{textDecoration: 'none',textTransform:'uppercase',color:'black',fontWeight:'bold'}}>{JSON.parse(localStorage.getItem('username'))}</Link>
                            </li>
                            <li>
                                <button onClick={logout} style={{color:'black',backgroundColor: '#fff', border: 'none',fontSize: '16px',cursor: 'pointer'}}>Logout</button>
                            </li>
                        </ul>
                    </>
                    : <Link className="signin" to="/signin">Signin</Link>}
                </nav>
                {/* <nav>
                    <Link>Logout</Link>
                    <Link>User-{}</Link>
                </nav> */}
            </div>
        </header>
    );
}

export default Header;