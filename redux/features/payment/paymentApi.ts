import { baseApi } from "@/redux/api/baseApi";

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPayment: builder.mutation({
      query: (body) => ({
        url: "payment/stripe/subscription",
        method: "POST",
        body,
      }),
       invalidatesTags: ["Auth"],
    }),

    createTrile: (builder.mutation({
      query: (body) => ({
        url: "/trail/create",
        method: "POST",
        body,
      }),
       invalidatesTags: ["Auth"],
    })),
  }),
});

export const { useCreatePaymentMutation, useCreateTrileMutation } = paymentApi;