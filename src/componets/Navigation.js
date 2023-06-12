import { Link } from 'react-router-dom';

const Navigation = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/home">HOME</Link>
                </li>
                <li>
                    <Link to="/profile">my Profile</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;
