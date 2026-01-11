import { api } from '@/api';

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

interface CreateUserRequest {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  isAgent: string;
  agencyName: string;
}

interface CreateUserResponse {
  isSuccess: boolean;
  message: string;
  token: string;
  data: {
    _id: string;
    fullName: string;
    email: string;
    phone: string;
    isAgent: boolean;
    agencyName?: string;
  };
}

interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
}

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/auth-user',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Auth'],
    }),
    register: builder.mutation<AuthResponse, RegisterRequest>({
      query: (userData) => ({
        url: '/auth/register',
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['Auth'],
    }),
    createUser: builder.mutation<CreateUserResponse, CreateUserRequest>({
      query: (userData) => ({
        url: '/users',
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['Auth'],
    }),
    forgotPassword: builder.mutation<{ message: string }, { email: string }>({
      query: (data) => ({
        url: '/auth/forgot-password',
        method: 'POST',
        body: data,
      }),
    }),
    verifyOtp: builder.mutation<AuthResponse, { email: string; otp: string }>({
      query: (data) => ({
        url: '/auth/verify-otp',
        method: 'POST',
        body: data,
      }),
    }),
    resetPassword: builder.mutation<{ message: string }, { token: string; password: string }>({
      query: (data) => ({
        url: '/auth/reset-password',
        method: 'POST',
        body: data,
      }),
    }),
    verifyEmail: builder.mutation<{ message: string; isSuccess: boolean }, { email: string; code: string }>({
      query: (data) => ({
        url: '/verify-email',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useCreateUserMutation,
  useForgotPasswordMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
  useVerifyEmailMutation,
} = authApi;
