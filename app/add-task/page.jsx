import AddTaskForm from "@/components/AddTaskForm";
import Banner from "@/components/Banner";

const AddTask = () => {
  return (
    <>
      <Banner title="📋 Add your new task here"/>
      <div className="flex justify-center items-center min-h-screen my-5">
        <AddTaskForm />
      </div>
    </>
  );
};

export default AddTask;
