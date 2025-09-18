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
import { useUserStore } from "@/store/useUserStore";
import React, { useState } from "react";
import { toast } from "react-toastify";

const AddTaskForm = ({ setOpen }) => {
  const { departments, projects, getProjects, addTask, user, errors } =
    useUserStore();

  const statusOptions = [
    { id: "3c6f039a-c2d6-4cbb-9d3d-56a5fbe77e42", label: "Completed" },
    { id: "d4b02b8b-cf7d-4d33-b87d-532b9b4d1fa9", label: "In Progress" },
    { id: "88bb4602-ea65-4061-b126-d680ed79e4d6", label: "Pending" },
    { id: "b08d9a22-bf3f-4a8e-9982-47d544a56f88", label: "Not Started" },
  ];

  const [formData, setFormData] = useState({
    deptId: "",
    projectId: "",
    statusId: "",
    task: "",
    remarks: "",
    contactName: user.FirstName,
    contactNo: "1234567890",
    callDateTime: "",
    startDateTime: "",
    endDateTime: "",
    pointGivenUserId: user.UserId,
    pointsGivenTo1: user.UserId,
    pointsGivenTo2: user.UserId,
    insertedByUserId: user.UserId,
    targetDate: new Date().toISOString(),
  });

  const formatDateTimeLocal = (dateObj) => {
    const pad = (n) => (n < 10 ? "0" + n : n);
    return `${dateObj.getFullYear()}-${pad(dateObj.getMonth() + 1)}-${pad(
      dateObj.getDate()
    )}T${pad(dateObj.getHours())}:${pad(dateObj.getMinutes())}`;
  };
  const formattedDateTime = formatDateTimeLocal(new Date());

  const minusMinutes = (minutes) => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - minutes);
    return formatDateTimeLocal(now);
  };

  const requiredFields = [
    "deptId",
    "projectId",
    "statusId",
    "task",
    "startDateTime",
    "endDateTime",
  ];
  const isFormValid = requiredFields.every((field) => formData[field]);
  const handleSaveTask = async (e) => {
    e.preventDefault();
    if (!isFormValid) {
      toast.error("Please fill in all required fields.");
      return;
    }
    try {
      const response = await addTask(formData);

      // if (response[0].DDId) {
      //   toast.success("Task Added");
      //   setFormData({
      //     deptId: "",
      //     projectId: "",
      //     statusId: "",
      //     task: "",
      //     remarks: "",
      //     callDateTime: "",
      //     startDateTime: "",
      //     endDateTime: "",
      //   });
      // }

      setFormData({
        deptId: "",
        projectId: "",
        statusId: "",
        task: "",
        remarks: "",
        contactName: user.FirstName,
        contactNo: "1234567890",
        callDateTime: "",
        startDateTime: "",
        endDateTime: "",
        pointGivenUserId: user.UserId,
        pointsGivenTo1: user.UserId,
        pointsGivenTo2: user.UserId,
        insertedByUserId: user.UserId,
        targetDate: new Date().toISOString(),
      });
      setOpen(false);
      toast.success("Task Added Successfully!");
    } catch (err) {
      console.log(err);
      toast.error(errors || "Something went wrong.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 backdrop-blur-sm">
      <div className="w-full max-w-5xl mx-auto">
        <Card className="w-full">
          <CardHeader className="text-center">
            <CardTitle className="capitalize text-xl sm:text-2xl">
              Add your task here
            </CardTitle>
            <CardDescription className="text-sm sm:text-base">
              Enter your task details below.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSaveTask}>
              {/* Grid responsive layout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {/* Department */}
                <div className="flex flex-col gap-2">
                  <Label>Department *</Label>
                  <Select
                    value={formData.deptId}
                    onValueChange={(val) => {
                      setFormData({ ...formData, deptId: val, projectId: "" });
                      getProjects(val);
                    }}
                  >
                    <SelectTrigger className={"w-full"}>
                      <SelectValue placeholder="Select Department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Departments</SelectLabel>
                        {departments?.map((d) => (
                          <SelectItem value={d.TextListId} key={d.TextListId}>
                            {d.Text}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                {/* Project */}
                <div className="flex flex-col gap-2">
                  <Label>Project *</Label>
                  <Select
                    value={formData.projectId}
                    onValueChange={(val) =>
                      setFormData({ ...formData, projectId: val })
                    }
                    disabled={!formData.deptId}
                  >
                    <SelectTrigger className={"w-full"}>
                      <SelectValue placeholder="Select Project" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Projects</SelectLabel>
                        {projects?.map((p) => (
                          <SelectItem value={p.TextListId} key={p.TextListId}>
                            {p.Text}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                {/* Status */}
                <div className="flex flex-col gap-2">
                  <Label>Status *</Label>
                  <Select
                    value={formData.statusId}
                    onValueChange={(val) =>
                      setFormData({ ...formData, statusId: val })
                    }
                  >
                    <SelectTrigger className={"w-full"}>
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Status</SelectLabel>
                        {statusOptions.map((s) => (
                          <SelectItem value={s.id} key={s.id}>
                            {s.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                {/* Start DateTime */}
                <div className="flex flex-col gap-2">
                  <Label>Start DateTime *</Label>
                  <Input
                    type="datetime-local"
                    value={formData.startDateTime}
                    max={formattedDateTime}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        startDateTime: e.target.value,
                        callDateTime: e.target.value,
                      })
                    }
                  />
                  <div className="flex flex-wrap gap-2 mt-1">
                    {[20, 30, 40, 50, 60].map((min) => (
                      <Button
                        key={min}
                        size="sm"
                        variant="secondary"
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            startDateTime: minusMinutes(min),
                            callDateTime: minusMinutes(min),
                          })
                        }
                      >
                        -{min}m
                      </Button>
                    ))}
                  </div>
                </div>

                {/* End DateTime */}
                <div className="flex flex-col gap-2">
                  <Label>End DateTime *</Label>
                  <Input
                    type="datetime-local"
                    value={formData.endDateTime}
                    max={formattedDateTime}
                    onChange={(e) =>
                      setFormData({ ...formData, endDateTime: e.target.value })
                    }
                  />
                  <div className="flex flex-wrap gap-2 mt-1">
                    {[20, 30, 40, 50, 60].map((min) => (
                      <Button
                        key={min}
                        size="sm"
                        variant="secondary"
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            endDateTime: minusMinutes(min),
                          })
                        }
                      >
                        -{min}m
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Task */}
                <div className="col-span-full flex flex-col gap-2">
                  <Label>Task *</Label>
                  <Textarea
                    value={formData.task}
                    onChange={(e) =>
                      setFormData({ ...formData, task: e.target.value })
                    }
                    placeholder="Enter your task here"
                  />
                </div>

                {/* Remarks */}
                <div className="col-span-full flex flex-col gap-2">
                  <Label>Remarks</Label>
                  <Textarea
                    value={formData.remarks}
                    onChange={(e) =>
                      setFormData({ ...formData, remarks: e.target.value })
                    }
                    placeholder="Enter your remarks here"
                  />
                </div>

                {/* Read-only User ID */}
                <div className="col-span-full flex flex-col gap-2">
                  <Label>Point Given User ID</Label>
                  <Input value={formData.pointGivenUserId} readOnly />
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Button
                  className="w-full bg-green-700 hover:bg-green-800"
                  type="submit"
                  disabled={!isFormValid}
                >
                  Save Task
                </Button>
                <Button
                  className="w-full"
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddTaskForm;
