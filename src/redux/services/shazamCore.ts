import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootObject } from "../interfaces";

export const shazamCoreApi = createApi({
    reducerPath: "shazamCoreApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://shazam-core.p.rapidapi.com/v1",
        prepareHeaders: (headers) => {
            headers.set("X-RapidAPI-Key", "e3ece52a6emsh3e97c631e5f1731p134ed8jsnf25a25682869");
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getTopCharts: builder.query<RootObject[], void>({ query: () => "/charts/world" })
    })
});

export const { useGetTopChartsQuery } = shazamCoreApi;
