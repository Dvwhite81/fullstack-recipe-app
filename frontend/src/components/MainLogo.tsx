import { Link } from 'react-router-dom';

const MainLogo = () => {
  return (
    <div style={{ height: 'var(--navbar-height)', margin: '0 auto', width: 'fit-content' }}>
      <Link to='/' style={{ height: '100%', width: '100%' }}>
        <img id='main-logo' src='/recipes-logo.png' alt='main recipes logo' />
      </Link>
    </div>
  );
};

export default MainLogo;
