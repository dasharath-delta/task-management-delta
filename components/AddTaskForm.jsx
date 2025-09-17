"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { list } from "@/data";
import React, { useState } from "react";
import { toast } from "react-toastify";

const AddTaskForm = () => {
  const [formData, setFormData] = useState({
    department: "",
    project: "",
    status: "",
    task: "",
    remarks: "",
    startDateTime: "",
    endDateTime: "",
    pointGivenUserId: "USR208",
  });

  const department = list.departments.find(
    (d) => d.name === formData.department
  );

  // helper: format to local datetime-local string
  const formatDateTimeLocal = (dateObj) => {
    const pad = (n) => (n < 10 ? "0" + n : n);
    const year = dateObj.getFullYear();
    const month = pad(dateObj.getMonth() + 1);
    const day = pad(dateObj.getDate());
    const hours = pad(dateObj.getHours());
    const minutes = pad(dateObj.getMinutes());
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  // today's local datetime for max attribute
  const formattedDateTime = formatDateTimeLocal(new Date());

  // add minutes to current time
  const minusMinutes = (minutes) => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - minutes);
    return formatDateTimeLocal(now);
  };

  // handleSaveTask
  const handleSaveTask = (e) => {
    e.preventDefault();
    if (Object.values(formData).some((val) => !val.trim())) {
      toast.error("All fields are required.");
      return;
    }
    toast.success("Task Saved.");
    console.log(formData);
    setFormData({
      department: "",
      project: "",
      status: "",
      task: "",
      remarks: "",
      startDateTime: "",
      endDateTime: "",
      pointGivenUserId: "USR208",
    });
  };
  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle className="capitalize">Add your task here</CardTitle>
        <CardDescription>Enter your task details below.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSaveTask}>
          <div className="flex flex-col gap-6">
            {/* Department */}
            <div className="grid gap-2 ">
              <Label>Department</Label>
              <Select
                value={formData.department}
                onValueChange={(val) =>
                  setFormData({ ...formData, department: val })
                }
              >
                <SelectTrigger className={"w-full"}>
                  <SelectValue placeholder="Select Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Departments</SelectLabel>
                    {list &&
                      list.departments.map((department) => (
                        <SelectItem
                          value={department.name}
                          key={department.name}
                        >
                          {department.name}
                        </SelectItem>
                      ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Projects */}
            <div className="grid gap-2 ">
              <Label>Projects</Label>
              <Select
                value={formData.project}
                onValueChange={(val) =>
                  setFormData({ ...formData, project: val })
                }
              >
                <SelectTrigger className={"w-full"}>
                  <SelectValue placeholder="Select Project" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Projects</SelectLabel>
                    {department &&
                      department.projects.map((project) => (
                        <SelectItem value={project} key={project}>
                          {project}
                        </SelectItem>
                      ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Status */}
            <div className="grid gap-2 ">
              <Label>Status</Label>
              <Select
                value={formData.status}
                onValueChange={(val) =>
                  setFormData({ ...formData, status: val })
                }
              >
                <SelectTrigger className={"w-full"}>
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Not Started">Not Started</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Task */}
            <div className="grid gap-2">
              <Label>Task</Label>
              <Textarea
                value={formData.task}
                onChange={(e) =>
                  setFormData({ ...formData, task: e.target.value })
                }
                placeholder="Enter Your Task here."
              />
            </div>

            {/* Remarks */}
            <div className="grid gap-2">
              <Label>Remarks</Label>
              <Textarea
                value={formData.remarks}
                onChange={(e) =>
                  setFormData({ ...formData, remarks: e.target.value })
                }
                placeholder="Enter Your Remarks here."
              />
            </div>

            {/* Start DateTime */}
            <div className="grid gap-2">
              <Label>StartDateTime</Label>
              <Input
                type="datetime-local"
                value={formData.startDateTime}
                max={formattedDateTime}
                onChange={(e) =>
                  setFormData({ ...formData, startDateTime: e.target.value })
                }
              />
              <div className="flex justify-between mt-2">
                {[20, 30, 40, 50, 60].map((min) => (
                  <Button
                    variant="secondary"
                    key={min}
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        startDateTime: minusMinutes(min),
                      })
                    }
                  >
                    -{min}min
                  </Button>
                ))}
              </div>
            </div>

            {/* End DateTime */}
            <div className="grid gap-2">
              <Label>EndDateTime</Label>
              <Input
                type="datetime-local"
                value={formData.endDateTime}
                max={formattedDateTime}
                onChange={(e) =>
                  setFormData({ ...formData, endDateTime: e.target.value })
                }
              />

              <div className="flex justify-between mt-2">
                {[20, 30, 40, 50, 60].map((min) => (
                  <Button
                    variant="secondary"
                    key={min}
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        endDateTime: minusMinutes(min),
                      })
                    }
                  >
                    -{min}min
                  </Button>
                ))}
              </div>
            </div>

            {/* User ID */}
            <div className="grid gap-2">
              <Label>PointGivenUserId</Label>
              <Input
                type="text"
                value={formData.pointGivenUserId}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    pointGivenUserId: e.target.value,
                  })
                }
                readOnly
              />
            </div>

            {/* Save Button */}
            <Button className={"bg-green-700 hover:bg-green-800"} type="submit">
              Save
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddTaskForm;
