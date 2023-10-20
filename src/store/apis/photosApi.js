import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { faker } from '@faker-js/faker';

const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};
// he
const photosApi = createApi({
  reducerPath: 'photos',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3005',
    fetchFn: async (...args) => {
      await pause(200);
      return fetch(...args);
    },
  }),
  endpoints(builder) {
    return {
      fetchPhotos: builder.query({
        providesTags: (result, error, album) => {
          return [{ type: 'Photo', id: album.id }];
        },
        query: (album) => {
          return {
            url: '/photos',
            params: {
              albumId: album.id,
            },
            method: 'GET',
          };
        },
      }),
      addPhoto: builder.mutation({
        invalidatesTags: (result, error, album) => {
          return [{ type: 'Photo', id: album.id }];
        },
        query: (album) => {
          return {
            url: '/photos',
            method: 'POST',
            body: {
              albumId: album.id,
              url: faker.image.url(),
            },
          };
        },
      }),
      deletePhoto: builder.mutation({
        invalidatesTags: (result, error, album) => {
          return [{ type: 'Photo', id: album.id }];
        },
        query: (id) => {
          return {
            url: `/photos/${id}`,
            method: 'DELETE',
          };
        },
      }),
    };
  },
});

export const {
  useFetchPhotosQuery,
  useAddPhotoMutation,
  useDeletePhotoMutation,
} = photosApi;
export { photosApi };
