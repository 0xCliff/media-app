import { useFetchAlbumsQuery } from '../store';

import Skeleton from './Skeleton';
import Button from './Button';
import { useAddAlbumMutation } from '../store/apis/albumsApi';
import AlbumListItem from './AlbumListItem';

const AlbumsList = ({ user }) => {
  const { data, error, isFetching } = useFetchAlbumsQuery(user);
  const [addAlbum, results] = useAddAlbumMutation();

  const handleAddAlbum = () => {
    addAlbum(user);
  };

  let content;
  if (isFetching) {
    content = (
      <Skeleton
        times={3}
        className='h-10 w-full'
      />
    );
  } else if (error) {
    content = <div>Error loading albums.</div>;
  } else {
    content = data.map((album) => {
      return (
        <AlbumListItem
          key={album.id}
          album={album}
        />
      );
    });
  }

  return (
    <div>
      <div className='flex flex-row justify-between items-center m-2'>
        <h3>
          Albums for <span className='text-lg font-bold'>{user.name}</span>
        </h3>
        <Button
          loading={results.isLoading}
          onClick={handleAddAlbum}
          primary
          className='rounded'
        >
          + Add Album
        </Button>
      </div>
      <div className='w-[90%] mx-auto'>{content}</div>
    </div>
  );
};

export default AlbumsList;
