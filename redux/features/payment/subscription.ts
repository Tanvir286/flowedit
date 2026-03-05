  import { baseApi } from "@/redux/api/baseApi";

  export const subscriptionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
      getMySubscription: builder.query({
        query: () => ({
          url: "/auth/me",
          method: "GET",
        }),
         
      }),

          getSubcription: builder.query({
      query: () => ({
        url: "/subscriptions",
        method: "GET",
      }),
      providesTags: ["Plans"],
    }),

    updateSubPlan: builder.mutation({
      query: ({ id, data }) => ({
        url: `/subscriptions/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Plans"],
    }),
     
    }),
  });

  export const { useGetMySubscriptionQuery,
      useGetSubcriptionQuery,
  useUpdateSubPlanMutation,
  } = subscriptionApi;
