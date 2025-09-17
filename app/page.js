import MainBanner from "@/components/MainBanner";
import NavLink from "@/components/NavLink";
import TasksList from "@/components/TasksList";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="mt-10">
      <MainBanner />
      <TasksList/>
      <NavLink href={"/add-task"}>
        <Button className={"bg-blue-500 hover:bg-blue-600 mt-5"}>Add-Task</Button>
      </NavLink>
    </main>
  );
}
