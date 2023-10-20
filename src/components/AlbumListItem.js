import Button from './Button';
import { GoTrash } from 'react-icons/go';
import ExpandablePanel from './ExpandablePanel';
import { useDeleteAlbumMutation } from '../store';
import PhotoList from './PhotoList';

const AlbumListItem = ({ album }) => {
  const [deleteAlbum, results] = useDeleteAlbumMutation();

  const handleAlbumDelete = () => {
    deleteAlbum(album.id);
  };

  const header = (
    <div className='flex items-center'>
      <Button
        className='mr-2 rounded'
        danger
        onClick={handleAlbumDelete}
        loading={results.isLoading}
      >
        <GoTrash />
      </Button>
      {album.title}
    </div>
  );
  return (
    <ExpandablePanel
      header={header}
      key={album.id}
    >
      <PhotoList album={album} />
    </ExpandablePanel>
  );
};

export default AlbumListItem;
