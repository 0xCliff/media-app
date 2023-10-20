import { useAddPhotoMutation, useFetchPhotosQuery } from '../store';
import Button from './Button';
import PhotoListItem from './PhotoListItem';
import Skeleton from './Skeleton';

const PhotoList = ({ album }) => {
  const { data, error, isLoading } = useFetchPhotosQuery(album);
  const [addPhoto, results] = useAddPhotoMutation();

  const handlePhotoAdd = () => {
    addPhoto(album);
  };

  let content;
  if (isLoading) {
    content = (
      <Skeleton
        times={2}
        className='h-10 w-full'
      />
    );
  } else if (error) {
    content = <div>Error loading photos</div>;
  } else {
    content = data.map((photo) => {
      return (
        <PhotoListItem
          key={photo.id}
          photo={photo}
        />
      );
    });
  }

  return (
    <div>
      <div className='flex justify-between items-center m-2'>
        <h4>Photos</h4>
        <Button
          loading={results.isLoading}
          primary
          className='rounded'
          onClick={handlePhotoAdd}
        >
          +
        </Button>
      </div>
      <div className='flex items-center'>{content}</div>
    </div>
  );
};

export default PhotoList;
