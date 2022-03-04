import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AUTH_TOKEN } from '../constants';



const Header = () => {
  const navigate = useNavigate();
  const authToken = localStorage.getItem(AUTH_TOKEN);
  return (
    <div>
      <div>
        <Link to="/" >
          <div>Hacker News</div>
        </Link>           
        <Link to="/">
          new
        </Link>
        {authToken && (
          <div>
            <div>|</div>
            <Link
              to="/create"
            >
              submit
            </Link>
          </div>
          //we can make sure only authenticated users can create new links.
        )}
      </div>
      <div>
        {authToken ? (
          <div
            onClick={() => {
              localStorage.removeItem(AUTH_TOKEN);
              navigate(`/`);
            }}
          >
            logout
          </div>
        ) : (
          <Link
            to="/login"
            className="ml1 no-underline black"
          >
            login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;