// src/api.ts

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {CreateUserDto} from "../../interfaces/auth/dtos/create-user.dto";
import {LoginDto} from "../../interfaces/auth/dtos/login.dto";
import {UpdateTaskDto} from "../../interfaces/task/dtos/update-task.dto";
import {CreateTaskDto} from "../../interfaces/task/dtos/create-task.dto";
import {ITask} from "../../interfaces/task/ITask";

// Define your base query
const baseQuery = fetchBaseQuery({ baseUrl: 'http://localhost:3000' }); // Adjust the base URL as needed

// Define your endpoints
export const api = createApi({
    baseQuery,
    endpoints: (builder) => ({
        // Task API
        getTasks: builder.query<ITask[], void>({
            query: () => '/tasks',
        }),
        getTask: builder.query<ITask, number>({
            query: (id) => `/tasks/${id}`,
        }),
        createTask: builder.mutation<ITask, CreateTaskDto>({
            query: (newTask) => ({
                url: '/tasks',
                method: 'POST',
                body: newTask,
            }),
        }),
        updateTask: builder.mutation<ITask, UpdateTaskDto>({
            query: (task) => ({
                url: `/tasks/${task.id}`,
                method: 'PATCH',
                body: { task},
            }),
        }),
        deleteTask: builder.mutation<null, number>({
            query: (id) => ({
                url: `/tasks/${id}`,
                method: 'DELETE',
            }),
        }),
        // Auth API
        login: builder.mutation<null,LoginDto>({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
                keepUnusedDataFor: 20,
            }),
        }),
        register: builder.mutation<null, CreateUserDto>({
            query: (userData) => ({
                url: '/auth/register',
                method: 'POST',
                body: userData,
            }),
        }),
    }),
});

export const {
    useGetTasksQuery,
    useGetTaskQuery,
    useCreateTaskMutation,
    useUpdateTaskMutation,
    useDeleteTaskMutation,
    useLoginMutation,
    useRegisterMutation,
} = api;
