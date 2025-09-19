"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { statusOptions } from "@/data";
import { useUserStore } from "@/store/useUserStore";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import React, { useState } from "react";
import { toast } from "react-toastify";
import { cn } from "@/lib/utils";

const AddTaskForm = ({ setOpen }) => {
  const departments = useUserStore((state) => state.departments);
  const projects = useUserStore((state) => state.projects);
  const getProjects = useUserStore((state) => state.getProjects);
  const addTask = useUserStore((state) => state.addTask);
  const user = useUserStore((state) => state.user);
  const errors = useUserStore((state) => state.errors);

  const [formData, setFormData] = useState({
    deptId: "",
    projectId: "",
    statusId: "",
    task: "",
    remarks: "" || "Not Set",
    contactName: user?.FirstName,
    contactNo: "1234567890",
    callDateTime: "" || "Not Set",
    startDateTime: null,
    endDateTime: null,
    pointGivenUserId: user?.UserId,
    pointsGivenTo1: user?.UserId,
    pointsGivenTo2: user?.UserId,
    insertedByUserId: user?.UserId,
    targetDate: new Date().toISOString(),
  });

  const requiredFields = ["deptId", "projectId", "statusId", "task"];

  const isFormValid = requiredFields.every(
    (field) => formData[field] && formData[field].toString().trim() !== ""
  );
  const minusMinutes = (minutes) => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - minutes);
    return new Date(now);
  };

  const handleSaveTask = async (e) => {
    e.preventDefault();

    if (!isFormValid) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      const payload = {
        ...formData,
        startDateTime: formData.startDateTime?.toISOString() || null,
        endDateTime: formData.endDateTime?.toISOString() || null,
        callDateTime: formData.startDateTime?.toISOString() || null,
      };

      await addTask(payload);

      setFormData({
        deptId: "",
        projectId: "",
        statusId: "",
        task: "",
        remarks: "",
        contactNo: "1234567890",
        callDateTime: "",
        startDateTime: null,
        endDateTime: null,
        pointGivenUserId: user?.UserId,
        pointsGivenTo1: user?.UserId,
        pointsGivenTo2: user?.UserId,
        insertedByUserId: user?.UserId,
        targetDate: new Date().toISOString(),
      });

      toast.success("Task Added Successfully!");
      setOpen(false);
    } catch (err) {
      console.log(err);
      toast.error(errors || "Something went wrong.");
    }
  };

  //  const handleSaveTask = async (e) => {
  //   e.preventDefault();
  //   if (!isFormValid) {
  //     toast.error("Please fill in all required fields.");
  //     return;
  //   }
  //   try {
  //     const response = await addTask(formData);

  //     // if (response[0].DDId) {
  //     //   toast.success("Task Added");
  //     //   setFormData({
  //     //     deptId: "",
  //     //     projectId: "",
  //     //     statusId: "",
  //     //     task: "",
  //     //     remarks: "",
  //     //     callDateTime: "",
  //     //     startDateTime: "",
  //     //     endDateTime: "",
  //     //   });
  //     // }

  //     setFormData({
  //       deptId: "",
  //       projectId: "",
  //       statusId: "",
  //       task: "",
  //       remarks: "",
  //       contactNo: "1234567890",
  //       callDateTime: "",
  //       startDateTime: "",
  //       endDateTime: "",
  //     });
  //     setOpen(false);
  //     toast.success("Task Added Successfully!");
  //   } catch (err) {
  //     console.log(err);
  //     toast.error(errors || "Something went wrong.");
  //   }
  // };
  const DatePicker = ({ label, date, setDate, quickSetButtons = false }) => (
    <div className="flex flex-col gap-2">
      <Label>{label}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "yyyy-MM-dd HH:mm") : "Pick date & time"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-2">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
          <Input
            type="time"
            className="mt-2"
            onChange={(e) => {
              const [hours, minutes] = e.target.value.split(":");
              if (date) {
                const newDate = new Date(date);
                newDate.setHours(+hours);
                newDate.setMinutes(+minutes);
                setDate(newDate);
              }
            }}
            value={
              date
                ? `${String(date.getHours()).padStart(2, "0")}:${String(
                    date.getMinutes()
                  ).padStart(2, "0")}`
                : ""
            }
          />
        </PopoverContent>
      </Popover>

      {quickSetButtons && (
        <div className="flex flex-wrap gap-2 mt-2">
          {[20, 30, 40, 50, 60].map((min) => (
            <Button
              key={min}
              size="sm"
              variant="secondary"
              type="button"
              onClick={() => setDate(minusMinutes(min))}
            >
              -{min}m
            </Button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 backdrop-blur-sm">
      <div className="w-full max-w-5xl mx-auto">
        <Card>
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {/* Department */}
                <div className="flex flex-col gap-2">
                  <Label>Department *</Label>
                  <Select
                    value={formData.deptId}
                    onValueChange={(val) => {
                      setFormData((prev) => ({
                        ...prev,
                        deptId: val,
                        projectId: "",
                      }));
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
                          <SelectItem key={d.TextListId} value={d.TextListId}>
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
                      setFormData((prev) => ({ ...prev, projectId: val }))
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
                          <SelectItem key={p.TextListId} value={p.TextListId}>
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
                      setFormData((prev) => ({ ...prev, statusId: val }))
                    }
                  >
                    <SelectTrigger className={"w-full"}>
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Status</SelectLabel>
                        {statusOptions.map((s) => (
                          <SelectItem key={s.id} value={s.id}>
                            {s.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                {/* Start DateTime Picker */}
                <DatePicker
                  label="Start Date & Time"
                  date={formData.startDateTime}
                  setDate={(date) =>
                    setFormData((prev) => ({
                      ...prev,
                      startDateTime: date,
                      callDateTime: date?.toISOString() || "",
                    }))
                  }
                  quickSetButtons
                />

                <DatePicker
                  label="End Date & Time"
                  date={formData.endDateTime}
                  setDate={(date) =>
                    setFormData((prev) => ({
                      ...prev,
                      endDateTime: date,
                    }))
                  }
                  quickSetButtons
                />

                {/* Task */}
                <div className="col-span-full flex flex-col gap-2">
                  <Label>Task *</Label>
                  <Textarea
                    value={formData.task}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, task: e.target.value }))
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
                      setFormData((prev) => ({
                        ...prev,
                        remarks: e.target.value,
                      }))
                    }
                    placeholder="Enter your remarks here"
                  />
                </div>

                {/* Read-only User ID */}
                <div className="col-span-full flex flex-col gap-2">
                  <Label>Point Given User ID</Label>
                  <Input value={formData?.pointGivenUserId} readOnly />
                </div>
              </div>

              {/* Action Buttons */}
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
