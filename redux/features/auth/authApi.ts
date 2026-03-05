import { baseApi } from "@/redux/api/baseApi";
import { setCredentials } from "./authSlice";

interface LoginResponse {
  success: boolean;
  message: string;
  type: string;
  authorization: {
    type: string;
    access_token: string;
    refresh_token: string;
  };
}
interface GetMeResponse {
  success: boolean;
  data: {
    id: string;
    name: string;
    email: string;
    type: "USER" | "ADMIN";
    isTrial?: boolean;
    isSubscribed?: boolean;
  };
}


export const authApi = baseApi.injectEndpoints({
  
  endpoints: (builder) => ({
    
    //  LOGIN
    login: builder.mutation<LoginResponse, { email: string; password: string }>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
       invalidatesTags: ["Auth"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;

        dispatch(
          setCredentials({
            token: data.authorization.access_token,
            role: data.type === "ADMIN" ? "ADMIN" : "USER",
            // user: null,
          })
        );
      },
    }),
    getMe: builder.query<GetMeResponse, void>({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
    }),
    //  SIGNUP
    signup: builder.mutation({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
    }),

    //  LOGOUT
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
        
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useLogoutMutation,
   useGetMeQuery,
} = authApi;


// import { baseApi } from "@/redux/api/baseApi";
// import { setCredentials } from "./authSlice";

// interface LoginResponse {
//   success: boolean;
//   message: string;
//   type: string;
//   authorization: {
//     type: string;
//     access_token: string;
//     refresh_token: string;
//   };
// }

// export const authApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     // 🔐 LOGIN
//   login: builder.mutation({
//   query: (body) => ({
//     url: "/auth/login",
//     method: "POST",
//     body,
//   }),
//   onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
//     const { data } = await queryFulfilled;

//     dispatch(
//       setCredentials({
//         token: data.authorization.access_token,
//         role: data.type,
//         user: null,
//       })
//     );
//   },
// }),


//     // 📝 SIGNUP
//     signup: builder.mutation({
//       query: (body) => ({
//         url: "/auth/register",
//         method: "POST",
//         body,
//       }),
//     }),

//     // 🔓 LOGOUT
//     logout: builder.mutation({
//       query: () => ({
//         url: "/auth/logout",
//         method: "POST",
//       }),
//     }),
//   }),
// });

// export const {
//   useLoginMutation,
//   useSignupMutation,
//   useLogoutMutation,
// } = authApi;
