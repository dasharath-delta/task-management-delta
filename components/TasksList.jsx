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

const TasksList = () => {
  return (
    <Table className={"mt-10"}>
      <TableCaption>A List of your recent Tasks.</TableCaption>
      <TableHeader className={"capitalize"}>
        <TableRow>
          <TableHead>No.</TableHead>
          <TableHead>department</TableHead>
          <TableHead>project</TableHead>
          <TableHead>status</TableHead>
          <TableHead>task</TableHead>
          <TableHead>remarks</TableHead>
          <TableHead>startDateTime</TableHead>
          <TableHead>endDateTime</TableHead>
          <TableHead>pointGivenUserId</TableHead>
          <TableHead>Edit-Task</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {taskList &&
          taskList.map((task, i) => (
            <TableRow key={i}>
              <TableCell>{i + 1}</TableCell>
              <TableCell>{task.department}</TableCell>
              <TableCell>{task.project}</TableCell>
              <TableCell>{task.task}</TableCell>
              <TableCell>{task.remarks}</TableCell>
              <TableCell>{task.status}</TableCell>
              <TableCell>{task.startDateTime}</TableCell>
              <TableCell>{task.endDateTime}</TableCell>
              <TableCell className={"text-right"}>{task.pointGivenUserId}</TableCell>
              <TableCell >
                <Button>Edit</Button>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default TasksList;
