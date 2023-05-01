import apiSlice from "../api/apiSlice";

export const taskApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTasks: builder.query({
            query: () => `/tasks`,
            providesTags: ['Tasks']
        }),
        addTask: builder.mutation({
            query: (data) => ({
                url: '/tasks',
                method: 'POST',
                body: data
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    //pessimistic cache update
                    const { data: newTask } = await queryFulfilled;
                    dispatch(apiSlice.util.updateQueryData('getTasks', undefined, (draft) => {
                        draft.push(newTask);
                    }));
                } catch { }
            }

        }),
        editTask: builder.mutation({
            query: ({ id, data }) => ({
                url: `/tasks/${id}`,
                method: 'PATCH',
                body: data
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                //pessimistic cache update
                try {
                    const { data: updatedTask } = await queryFulfilled;
                    dispatch(apiSlice.util.updateQueryData("getTasks", undefined, (draft) => {
                        const draftToEdit = draft.find((a) => a.id === arg.id);
                        Object.assign(draftToEdit, updatedTask)
                    }))
                } catch { }
            }
        }),
        deleteTask: builder.mutation({
            query: (id) => ({
                url: `/tasks/${id}`,
                method: 'DELETE'
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                //optimistic cache update
                const deletedResult = dispatch(
                    apiSlice.util.updateQueryData(
                        "getTasks",
                        undefined,
                        (draft) => {
                            //  JSON.parse(JSON.stringify(draft));
                            draft.splice(draft.findIndex(a => a.id === arg), 1)
                        })
                )
                try {
                    await queryFulfilled
                } catch {
                    deletedResult.undo()
                    // dispatch(apiSlice.util.invalidateTags(['Tasks']))
                }
            }
        })
    })
})
export const { useGetTasksQuery, useGetTaskQuery, useAddTaskMutation, useEditTaskMutation, useDeleteTaskMutation } = taskApi;

