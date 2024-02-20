import { UserType } from '../utils/types';

interface ProfileProps {
  loggedInUser: UserType
}

const Profile = ({ loggedInUser }: ProfileProps) => {
  const { username, recipes } = loggedInUser;

  return (
    <div>
      <h1>Profile</h1>
      <p>Username: {username}</p>
      <p>Recipes:</p>
      <ul>
        {recipes.map((r) => (
          <li key={r.label}>{r.label}</li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
