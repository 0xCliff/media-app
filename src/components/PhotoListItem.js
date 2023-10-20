import { GoTrash } from 'react-icons/go';
import { useDeletePhotoMutation } from '../store';

const PhotoListItem = ({ photo }) => {
  const [deletePhoto, results] = useDeletePhotoMutation();

  const handlePhotoDelete = () => {
    deletePhoto(photo.id);
  };

  return (
    <div className='m-2 relative'>
      <div className='absolute inset-0 flex items-center justify-center opacity-0 hover:bg-neutral-300 hover:opacity-80 '>
        <GoTrash
          onClick={handlePhotoDelete}
          size='3rem'
          className='text-red-500'
        />
      </div>
      <img
        src={photo.url}
        height={240}
        width={240}
        className='rounded-md shadow shadow-black'
      />
    </div>
  );
};

export default PhotoListItem;
