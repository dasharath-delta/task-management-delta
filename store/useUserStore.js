import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import Cookies from "js-cookie";

export const useUserStore = create(
  persist(
    (set) => ({
      isLoading: false,
      user: null,
      errors: null,
      departments: null,
      projects: {},
      tasks: [],
      loginUser: async (userData) => {
        set({ isLoading: true, errors: null });
        try {
          const { data } = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/Login`,
            userData
          );

          if (data !== "No record found.") {
            const loggedUser = data[0];
            set({ user: loggedUser, errors: null });

            Cookies.set("userId", loggedUser.UserId, {
              secure: process.env.NODE_ENV === "production",
              expires: 7,
              path: "/",
            });
          } else {
            set({ errors: "No record found." });
          }
          return data;
        } catch (err) {
          set({ errors: "User Not Found." });
          throw err;
        } finally {
          set({ isLoading: false });
        }
      },

      logoutUser: () => {
        Cookies.remove("userId");
        set({ user: null });
      },

      getDepartments: async () => {
        set({ isLoading: true, errors: null });
        try {
          const { data } = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/GetDepartment`,
            "string",
            {
              headers: {
                "Content-Type": "application/json",
                Accept: "*/*",
              },
            }
          );
          if (data !== "No record found.") {
            set({ departments: data, errors: null });
          } else {
            console.log("Error", data);
          }
          return data;
        } catch (err) {
          set({ errors: "Departments Not Found." });
          throw err;
        } finally {
          set({ isLoading: false });
        }
      },

      getProjects: async (dId) => {
        set({ isLoading: true, errors: null });
        try {
          const { data } = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/GetProjects`,
            JSON.stringify(dId),
            {
              headers: {
                "Content-Type": "application/json",
                Accept: "*/*",
              },
            }
          );
          if (data !== "No record found.") {
            set((state) => ({
              projects: {
                ...state.projects,
                [dId]: data,
              },
              errors: null,
            }));
          } else {
            console.log("Error", data);
          }
          return data;
        } catch (err) {
          set({ errors: "Projects Not Found." });
          throw err;
        } finally {
          set({ isLoading: false });
        }
      },

      addTask: async (taskData) => {
        // set({ isLoading: true, errors: null });
        // try {
        //   // const { data } = await axios.post(
        //   //   `${process.env.NEXT_PUBLIC_API_URL}/AddTask`,
        //   //   JSON.stringify(taskData),
        //   //   {
        //   //     headers: {
        //   //       "Content-Type": "application/json",
        //   //       Accept: "*/*",
        //   //     },
        //   //   }
        //   // );
        //   // if (data[0].DDId) {
        //   //   set({ tasks: [...tasks, taskData], errors: null });
        //   // } else {
        //   //   console.log("Error", data);
        //   // }
        //   return taskData;
        // } catch (err) {
        //   set({ errors: "Failed to add task." });
        //   throw err;
        // } finally {
        //   set({ isLoading: false });
        // }
        set((state) => ({
          tasks: [...state.tasks, taskData],
        }));
      },
    }),
    {
      name: "user-storage",
      partialize: (state) => ({
        user: state.user,
        tasks: state.tasks,
        departments: state.departments,
        projects: state.projects,
      }),
    }
  )
);
