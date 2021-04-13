import {Link} from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>The Dojo Blog</h1>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to={`/form/post`}>New Blog</Link>
      </div>
    </nav>
  );
};

export default Navbar;
