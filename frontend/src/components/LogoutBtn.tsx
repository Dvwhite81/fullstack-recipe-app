interface LogoutBtnProps {
  handleLogout: () => void
}

const LogoutBtn = ({ handleLogout }: LogoutBtnProps) => {
  return (
    <button type='button' id='logout-btn' onClick={handleLogout}>
      Log Out
    </button>
  );
};

export default LogoutBtn;
