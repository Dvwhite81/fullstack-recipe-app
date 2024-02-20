import { useState } from 'react';
import { Navbar, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { UserType } from '../utils/types';
import LogoutBtn from './LogoutBtn';
import DropdownMenu from './DropdownMenu';

interface NavBarProps {
  loggedInUser: UserType | null
  handleLogout: () => void
}

const NavBar = ({ loggedInUser, handleLogout }: NavBarProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  const handleVisibleClick = () => setIsVisible((prev) => !prev);

  const handleLogoutClick = () => {
    handleLogout();
    navigate('/');
  };

  return (
    <Navbar
      bg='dark'
      data-bs-theme='dark'
      className='h-100 mx-0 d-flex p-2 rounded'
    >
      {loggedInUser ? (
        <Link to='/profile'>Profile</Link>
      ) : (
        <Link to='/register'>Sign Up</Link>
      )}
      <NavDropdown
        style={{
          color: 'whitesmoke',
          margin: 'auto',
          width: 'fit-content',
        }}
        title='Categories'
        onClick={handleVisibleClick}
      >
        {isVisible && <DropdownMenu handleClick={handleVisibleClick} />}
      </NavDropdown>
      {loggedInUser ? (
        <Link to='/saved'>Saved</Link>
      ) : (
        <Link to='/login'>Log In</Link>
      )}
      {loggedInUser && <LogoutBtn handleLogout={handleLogoutClick} />}
    </Navbar>
  );
};

export default NavBar;
