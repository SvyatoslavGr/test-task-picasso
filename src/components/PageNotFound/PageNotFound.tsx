import { NavLink } from 'react-router-dom';
// import './PageNotFound.css';

function PageNotFound() {
  return (
    <div className="container">
      <h1>Page Not Found</h1>
      <NavLink to="/">Main</NavLink>
    </div>
  );
}

export default PageNotFound;