"use client";
import AddTaskForm from "@/components/AddTaskForm";
import Banner from "@/components/Banner";
import Navbar from "@/components/Navbar";
import TasksList from "@/components/TasksList";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/useUserStore";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { PlusCircle } from "lucide-react";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const { getDepartments } = useUserStore();

  useEffect(() => {
    if (!userId) {
      let Id = Cookies.get("userId");
      setUserId(Id);
    }
  }, [userId]);
  return (
    <>
      {userId && userId !== "undefined" && <Navbar />}

      <main className="mt-10 px-6 md:px-16 lg:px-24 xl:px-24">
        <Banner />
        <div className="flex justify-end">
          <PlusCircle
          size={44}
          color="white"
          className="bg-blue-500 rounded-full cursor-pointer hover:bg-blue-600 duration-200"
            onClick={() => {
              setOpen(true);
              getDepartments();
            }}
          />
        </div>
        <TasksList />
        {open && <AddTaskForm setOpen={setOpen} />}
      </main>
    </>
  );
}
