import { GoTrash } from 'react-icons/go';
import Button from './Button';
import { deleteUser } from '../store';
import { useThunk } from '../hooks/use-thunk';
import ExpandablePanel from './ExpandablePanel';
import AlbumsList from './AlbumsList';

const UserListItem = ({ user }) => {
  const [doRemoveUser, isLoading, error] = useThunk(deleteUser);

  const handleClick = () => {
    doRemoveUser(user);
  };

  const header = (
    <>
      <Button
        className='mr-3 rounded'
        loading={isLoading}
        onClick={handleClick}
        danger
      >
        <GoTrash />
      </Button>
      {error && <div>Error deleting user...</div>}
      <span className='text-lg font-bold'>{user.name}</span>
    </>
  );

  return (
    <ExpandablePanel header={header}>
      <AlbumsList user={user} />
    </ExpandablePanel>
  );
};

export default UserListItem;
