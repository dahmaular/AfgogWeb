import { api } from '@/api';

export interface PropertyData {
  _id: string;
  title: string;
  address: string;
  mainImage: string;
  images: string[];
  description: string;
  agentId: string;
  categoryId: string;
  bedroom: string;
  bathroom: string;
  price: string;
  dateCreated: string;
  dateModified: string;
  __v: number;
  approved: boolean;
  type: string;
  carModel?: string;
  carYear?: string;
}

export interface PropertyResponse {
  data: PropertyData[];
  message: string;
  isSuccess: boolean;
}

export interface SinglePropertyResponse {
  data: PropertyData;
  message: string;
  isSuccess: boolean;
}

export interface CreatePropertyRequest {
  title: string;
  categoryId: string;
  address: string;
  type: string;
  description: string;
  condition: string;
  images: string;
  mainImage: string;
  agentId: string;
  price: string;
  bedroom: string;
  bathroom: string;
  size: string;
  facilities: string;
  carModel?: string;
  carYear?: string;
}

export interface CreatePropertyResponse {
  data: PropertyData;
  message: string;
  isSuccess: boolean;
}

export const propertyApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProperties: builder.query<PropertyResponse, void>({
      query: () => '/property',
      providesTags: ['Property'],
    }),
    getSingleProperty: builder.query<SinglePropertyResponse, string>({
      query: (id) => `/property/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Property', id }],
    }),
    createProperty: builder.mutation<CreatePropertyResponse, CreatePropertyRequest>({
      query: (propertyData) => ({
        url: '/property',
        method: 'POST',
        body: propertyData,
      }),
      invalidatesTags: ['Property'],
    }),
  }),
});

export const { useGetPropertiesQuery, useGetSinglePropertyQuery, useCreatePropertyMutation } = propertyApi;
