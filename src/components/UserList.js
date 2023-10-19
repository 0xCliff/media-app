import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { fetchUsers, addUser } from '../store';
import Skeleton from './Skeleton';
import Button from '../components/Button';
import { useThunk } from '../hooks/use-thunk';
import UserListItem from './UserListItem';

const UserList = () => {
  const [doFetchUsers, isLoadingUsers, loadingUserError] = useThunk(fetchUsers);
  const [doCreateUser, isCreatingUser, creatingUserError] = useThunk(addUser);

  const { data } = useSelector((state) => {
    return state.users;
  });

  useEffect(() => {
    doFetchUsers();
  }, [doFetchUsers]);

  const handleUserAdd = () => {
    doCreateUser();
  };

  let content;
  if (isLoadingUsers) {
    content = (
      <Skeleton
        times={10}
        className='h-10 w-5/6 mx-auto mt-4'
      />
    );
  } else if (loadingUserError) {
    content = <div>Error...</div>;
  } else {
    content = data.map((user) => {
      return (
        <UserListItem
          user={user}
          key={user.id}
        />
      );
    });
  }

  return (
    <div>
      <div className='flex flex-row justify-between items-center m-3'>
        <h1 className='m-2 text-2xl'>Users</h1>
        <Button
          loading={isCreatingUser}
          onClick={handleUserAdd}
        >
          + Add User
        </Button>
        {creatingUserError && 'Error Creating User...'}
      </div>
      {content}
    </div>
  );
};

export default UserList;
