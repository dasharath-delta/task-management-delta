"use client";
import { Button, DatePicker, Select, Switch } from "antd";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "./ui/label";
import { useUserStore } from "@/store/useUserStore";
import { statusOptions } from "@/data";
import dayjs from "dayjs";
import { toDate } from "date-fns";
import { Textarea } from "./ui/textarea";
import { toast } from "react-toastify";
import { Asterisk } from "lucide-react";

const EditTaskForm = ({ setIsEdit, editTask }) => {
  const departments = useUserStore((state) => state.departments);
  const projects = useUserStore((state) => state.projects);
  const getProjects = useUserStore((state) => state.getProjects);
  const updateTask = useUserStore((state) => state.updateTask);

  const [formData, setFormData] = useState({
    deptId: editTask?.deptId || null,
    projectId: editTask?.projectId || null,
    statusId: editTask?.statusId || null,
    startDateTime: editTask?.startDateTime || null,
    endDateTime: editTask?.endDateTime || null,
    task: editTask?.task || "",
    remarks: editTask?.remarks || "Not Set",
  });

  const [toggleBtn, setToggleBtn] = useState(false);

  const requiredFields = ["deptId", "projectId", "statusId", "task"];

  const isFormValid = requiredFields.every(
    (field) => formData[field] && formData[field].toString().trim() !== ""
  );

  const handleTime = (minutes) => {
    let now = new Date();
    if (toggleBtn) {
      now.setMinutes(now.getMinutes() + minutes);
      setFormData((prev) => ({
        ...prev,
        startDateTime: new Date(),
        endDateTime: now,
      }));
    } else if (!toggleBtn) {
      now.setMinutes(now.getMinutes() - minutes);
      setFormData((prev) => ({
        ...prev,
        startDateTime: now,
        endDateTime: new Date(),
      }));
    } else {
      toast.error("select valid time");
    }
  };

  const handleUpdateTask = (taskId) => {
    if (!isFormValid) {
      toast.error("Please fill all required fields.");
      return;
    }

    if (
      formData.startDateTime &&
      formData.endDateTime &&
      new Date(formData.endDateTime) < new Date(formData.startDateTime)
    ) {
      toast.error("End time cannot be before start time");
      return;
    }

    try {
      updateTask(taskId, formData);
      setFormData({
        deptId: "",
        projectId: "",
        statusId: "",
        task: "",
        remarks: "",
        startDateTime: null,
        endDateTime: null,
      });

      toast.success("Task Updated Successfully");
      setIsEdit(false);
    } catch (err) {
      console.log("Edit Error :", err);
      toast.error("Task Update Failed");
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 backdrop-blur-sm">
      <div className="w-full max-w-5xl mx-auto">
        <Card>
          <CardHeader className="text-center ">
            <CardTitle className={"capitalize text-xl sm:text-2xl"}>
              Update your task here
            </CardTitle>
            <CardDescription className={"text-sm sm:text-base"}>
              Enter your new task details below.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {/* Department */}
                <div className="flex flex-col gap-2">
                  <Label>
                    Department <Asterisk size={12} color="red" />{" "}
                  </Label>
                  <Select
                    className="text-black"
                    showSearch
                    placeholder="select department"
                    optionFilterProp="label"
                    onChange={(val) => {
                      setFormData((prev) => ({ ...prev, deptId: val }));
                      getProjects(val);
                    }}
                    value={formData.deptId || undefined}
                    options={departments?.map((d) => ({
                      label: d.Text,
                      value: d.TextListId,
                    }))}
                  />
                </div>
                {/* Projects */}
                <div className="flex flex-col gap-2">
                  <Label>
                    Projects <Asterisk size={12} color="red" />
                  </Label>
                  <Select
                    className="text-black"
                    showSearch
                    placeholder="select project"
                    optionFilterProp="label"
                    onChange={(val) => {
                      setFormData((prev) => ({ ...prev, projectId: val }));
                    }}
                    value={formData.projectId || undefined}
                    options={projects[formData.deptId]?.map((d) => ({
                      label: d.Text,
                      value: d.TextListId,
                    }))}
                  />
                </div>

                {/* status */}
                <div className="flex flex-col gap-2">
                  <Label>
                    Status <Asterisk size={12} color="red" />
                  </Label>
                  <Select
                    className="text-black"
                    showSearch
                    placeholder="select status"
                    optionFilterProp="label"
                    onChange={(val) =>
                      setFormData((prev) => ({ ...prev, statusId: val }))
                    }
                    value={formData.statusId || undefined}
                    options={statusOptions?.map((s) => ({
                      label: s.label,
                      value: s.id,
                    }))}
                  />
                </div>

                {/* Start DateTime Picker */}
                <div className="flex flex-col gap-2">
                  <Label>Start Date & Time</Label>
                  <DatePicker
                    showTime
                    className="w-full"
                    format={"YYYY-MM-DD HH:mm"}
                    value={
                      formData.startDateTime
                        ? dayjs(formData.startDateTime)
                        : null
                    }
                    onChange={(val) =>
                      setFormData((prev) => ({
                        ...prev,
                        startDateTime: val ? val.toDate() : null,
                      }))
                    }
                  />
                </div>

                {/* End DateTime Picker */}
                <div className="flex flex-col gap-2">
                  <Label>End Date & Time</Label>
                  <DatePicker
                    showTime
                    className="w-full"
                    format={"YYYY-MM-DD HH:mm"}
                    value={
                      formData.endDateTime ? dayjs(formData.endDateTime) : null
                    }
                    onChange={(val) =>
                      setFormData((prev) => ({
                        ...prev,
                        endDateTime: val ? toDate() : null,
                      }))
                    }
                  />
                </div>

                {/* Toggle Time */}
                <div className="col-span-full ">
                  <div className="flex gap-4 items-center">
                    <span>Start Time</span>
                    <Switch
                      checked={toggleBtn}
                      onChange={() => setToggleBtn((prev) => !prev)}
                    />
                    <span>End Time</span>
                  </div>
                </div>

                {/* Min Button */}
                <div className="col-span-full flex gap-3 flex-wrap">
                  {[10, 20, 30, 40, 50, 60].map((t) => (
                    <Button
                      className="min-w-24"
                      color={toggleBtn ? "primary" : "default"}
                      variant={"solid"}
                      key={t}
                      onClick={() => handleTime(t)}
                    >
                      {toggleBtn ? "+" : "-"}
                      {t}min
                    </Button>
                  ))}
                </div>

                {/* Task */}
                <div className="col-span-full flex flex-col gap-2">
                  <Label>
                    Task <Asterisk size={12} color="red" />
                  </Label>
                  <Textarea
                    value={formData.task}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        task: e.target.value,
                      }))
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
              </div>
            </div>
          </CardContent>
          <CardFooter className={"grid gap-4 grid-cols-1 md:grid-cols-2"}>
            <Button
              color="danger"
              variant="solid"
              onClick={() => setIsEdit(false)}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              variant="solid"
              disabled={!isFormValid}
              onClick={() => handleUpdateTask(editTask.id)}
            >
              Update Task
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default EditTaskForm;
