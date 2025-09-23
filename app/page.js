"use client";
import AddTaskForm from "@/components/AddTaskForm";
import Banner from "@/components/Banner";
import Navbar from "@/components/Navbar";
import { useUserStore } from "@/store/useUserStore";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { PlusCircle } from "lucide-react";
import CardList from "@/components/CardList";
import { RightOutlined } from "@ant-design/icons";
import EditTaskForm from "@/components/EditTaskForm";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [isEdit,setIsEdit] = useState(false);
  const [editTask, setEditTask] = useState()
  const [userId, setUserId] = useState("");
  const getDepartments = useUserStore((state) => state.getDepartments);

  useEffect(() => {
    if (!userId) {
      let Id = Cookies.get("userId");
      setUserId(Id);
    }
  }, [userId]);
  return (
    <>
      {userId && userId !== "undefined" && <Navbar />}

      <main className="my-10 px-6 md:px-16 lg:px-24 xl:px-24">
        <Banner />
        <div className="flex justify-end items-center gap-3 p-4">
          <h1 className=" text-gray-600 font-semibold">Add New Task</h1>
          <RightOutlined className="animate-ping " />
          <PlusCircle
            size={44}
            color="white"
            className="bg-blue-500 rounded-full shadow-2xl cursor-pointer hover:bg-blue-600 duration-200"
            onClick={() => {
              setOpen(true);
              getDepartments();
            }}
          />
        </div>
        <CardList setIsEdit={setIsEdit} setEditTask={setEditTask} />
        {open && <AddTaskForm setOpen={setOpen} />}
        {isEdit && <EditTaskForm editTask={editTask} setIsEdit={setIsEdit} />}
      </main>
    </>
  );
}
