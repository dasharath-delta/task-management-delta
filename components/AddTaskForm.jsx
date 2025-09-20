"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { Select, DatePicker, Flex, Button, Switch } from "antd";
import dayjs from "dayjs";

import { statusOptions } from "@/data";
import { useUserStore } from "@/store/useUserStore";
import React, { useState } from "react";
import { toast } from "react-toastify";

const AddTaskForm = ({ setOpen }) => {
  const departments = useUserStore((state) => state.departments);
  const projects = useUserStore((state) => state.projects);
  const getProjects = useUserStore((state) => state.getProjects);
  const addTask = useUserStore((state) => state.addTask);
  const user = useUserStore((state) => state.user);
  const errors = useUserStore((state) => state.errors);

  const [toggleBtn, setToggleBtn] = useState(true);

  const [formData, setFormData] = useState({
    deptId: "",
    projectId: "",
    statusId: "",
    task: "",
    remarks: "",
    startDateTime: null,
    endDateTime: null,
    pointGivenUserId: user?.UserId,
    insertedByUserId: user?.UserId,
    targetDate: new Date().toISOString(),
  });

  const requiredFields = ["deptId", "projectId", "statusId", "task"];

  const isFormValid = requiredFields.every(
    (field) => formData[field] && formData[field].toString().trim() !== ""
  );

  const handleSaveTask = async (e) => {
    e.preventDefault();

    if (!isFormValid) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (
      formData.startDateTime &&
      formData.endDateTime &&
      new Date(formData.endDateTime) < new Date(formData.startDateTime)
    ) {
      toast.error("End time cannot be before start time.");
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
        startDateTime: null,
        endDateTime: null,
        pointGivenUserId: user?.UserId,
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
  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto p-4 backdrop-blur-sm"
    >
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
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {/* Department */}
                <div className="flex flex-col gap-2">
                  <Label>Department *</Label>
                  <Select
                    className="text-black"
                    showSearch
                    placeholder="Select department"
                    optionFilterProp="label"
                    onChange={(val) => {
                      setFormData((prev) => ({
                        ...prev,
                        deptId: val,
                        projectId: "",
                      }));
                      getProjects(val);
                    }}
                    value={formData.deptId || undefined}
                    options={departments?.map((d) => ({
                      label: d.Text,
                      value: d.TextListId,
                    }))}
                  />
                </div>

                {/* Project */}
                <div className="flex flex-col gap-2">
                  <Label>Project *</Label>
                  <Select
                    className="text-black"
                    showSearch
                    placeholder="Select project"
                    optionFilterProp="label"
                    onChange={(val) =>
                      setFormData((prev) => ({ ...prev, projectId: val }))
                    }
                    value={formData.projectId || undefined}
                    disabled={!formData.deptId}
                    options={projects?.map((p) => ({
                      label: p.Text,
                      value: p.TextListId,
                    }))}
                  />
                </div>

                {/* Status */}
                <div className="flex flex-col gap-2">
                  <Label>Status *</Label>
                  <Select
                    className="text-black"
                    showSearch
                    placeholder="Select status"
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
                    format="YYYY-MM-DD HH:mm"
                    value={
                      formData.startDateTime
                        ? dayjs(formData.startDateTime)
                        : null
                    }
                    onChange={(value) =>
                      setFormData((prev) => ({
                        ...prev,
                        startDateTime: value ? value.toDate() : null,
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
                    format="YYYY-MM-DD HH:mm"
                    value={
                      formData.endDateTime ? dayjs(formData.endDateTime) : null
                    }
                    onChange={(value) =>
                      setFormData((prev) => ({
                        ...prev,
                        endDateTime: value ? value.toDate() : null,
                      }))
                    }
                  />
                </div>
                <div className="col-span-full">
                  <Switch
                    checked={toggleBtn}
                    onChange={() => setToggleBtn((prev) => !prev)}
                  /> Toggle Time
                </div>
                <div className="col-span-full flex gap-3 flex-wrap">
                  {[10, 20, 30, 40, 50, 60].map((t) => (
                    <Button
                      className="min-w-24"
                      color={toggleBtn ? "primary" : "default"}
                      variant="solid"
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
              </div>

              {/* Action Buttons */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Button
                  className="w-full"
                  color="danger"
                  variant="solid"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="primary"
                  disabled={!isFormValid}
                  onClick={handleSaveTask}
                >
                  Save Task
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddTaskForm;
