// import { IDEAS_URL } from '../constants';
// import { apiSlice } from './apiSlice';

// export const categoriesApiSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     // getAllCategories: builder.query({
//     //   query: () => ({
//     //     url: CATEGORIES_URL,
//     //     method: 'GET',
//     //   }),
//     //   keepUnusedDataFor: 5,
//     //   providesTags: ['Category'],
//     // }),

//     // getCategoryById: builder.query({
//     //   query: (categoryId) => ({
//     //     url: `${CATEGORIES_URL}/${categoryId}`,
//     //     method: 'GET',
//     //   }),
//     //   keepUnusedDataFor: 5,
//     // }),
//     createIdea: builder.mutation({
//       query: (data) => ({
//         url: `${IDEAS_URL}/create`,
//         body: data,
//         method: 'POST',
//       }),
//     }),
//     uploadIdeasImage: builder.mutation({
//       query: (formData) => ({
//         url: `${IDEAS_URL}/uploads`,
//         method: 'POST',
//         body: formData,
//         formData: true, // Ensures correct headers are set automatically
//       }),
//     }),

//     // updateCategory: builder.mutation({
//     //   query: (categoryId) => ({
//     //     url: `${CATEGORIES_URL}/${categoryId}`,
//     //     method: 'PUT',
//     //   }),
//     // }),
//     // deleteCategory: builder.mutation({
//     //   query: (categoryId) => ({
//     //     url: `${CATEGORIES_URL}/${categoryId}`,
//     //     method: 'DELETE',
//     //   }),
//     // }),
//   }),
// });

// export const {
//   //   useGetAllCategoriesQuery,
//   //   useGetCategoryByIdQuery,
//   //   useDeleteCategoryMutation,
//   useCreateIdeaMutation,
//   useUploadIdeasImageMutation,
//   //   useUpdateCategoryMutation,
// } = categoriesApiSlice;
