import { NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../utils/helpers';

interface DropdownMenuProps {
  handleClick: () => void
}

const DropdownMenu = ({ handleClick }: DropdownMenuProps) => {
  const navigate = useNavigate();

  const handleLinkClick = (category: string) => {
    navigate(`/categories/${category}`);
    handleClick();
  };

  return (
    <>
      {CATEGORIES.map((category) => (
        <NavDropdown.Item
          key={category}
          style={{ marginTop: '1rem', textAlign: 'center',  }}
          onClick={handleClick}
        >
          <p
            key={category}
            style={{ color: 'whitesmoke' }}
            onClick={() => handleLinkClick(category)}
          >
            {category}
          </p>
        </NavDropdown.Item>
      ))}
    </>
  );
};

export default DropdownMenu;
