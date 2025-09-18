import React from "react";
import { taskList } from "@/data";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Button } from "./ui/button";
import { useUserStore } from "@/store/useUserStore";

const TasksList = () => {
  const tasks = useUserStore((state) => state.tasks);

  return (
    <Table className={"mt-10"}>
      <TableCaption>A list of your recent tasks.</TableCaption>
      <TableHeader className={"capitalize"}>
        <TableRow>
          <TableHead>No.</TableHead>
          <TableHead>department Id</TableHead>
          <TableHead>project Id</TableHead>
          <TableHead>status Id</TableHead>
          <TableHead>task</TableHead>
          <TableHead>remarks</TableHead>
          <TableHead>startDateTime</TableHead>
          <TableHead>endDateTime</TableHead>
          <TableHead>pointGivenUser Id</TableHead>
          {/* <TableHead>Edit-Task</TableHead> */}
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks &&
          tasks.map((task, i) => (
            <TableRow key={i}>
              <TableCell>{i + 1}</TableCell>
              <TableCell className="max-w-[200px] truncate">{task.deptId}</TableCell>
              <TableCell className="max-w-[200px] truncate">{task.projectId}</TableCell>
              <TableCell className="max-w-[200px] truncate">{task.statusId}</TableCell>
              <TableCell className="max-w-[200px] truncate capitalize">{task.task}</TableCell>
              <TableCell className="max-w-[200px] truncate capitalize">{task.remarks}</TableCell>
              <TableCell className="max-w-[200px] truncate">{task.startDateTime}</TableCell>
              <TableCell className="max-w-[200px] truncate">{task.endDateTime}</TableCell>
              <TableCell >
                {task.pointGivenUserId}
              </TableCell>
              {/* <TableCell>
                <Button>Edit</Button>
              </TableCell> */}
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default TasksList;
