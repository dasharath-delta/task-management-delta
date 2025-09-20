import { useUserStore } from "@/store/useUserStore";
import React, { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Clock, List, User } from "lucide-react";
import { Badge } from "./ui/badge";
import { statusOptions } from "@/data";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
} from "@/components/ui/pagination";

const CardList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("all");
  const tasksPerPage = 6;

  const tasks = useUserStore((state) => state.tasks);
  const user = useUserStore((state) => state.user);
  const departments = useUserStore((state) => state.departments);
  const projects = useUserStore((state) => state.projects);

  const department = (dId) =>
    departments?.find((d) => d?.TextListId === dId)?.Text || "N/A";

  const project = (pId) =>
    projects?.find((p) => p?.TextListId === pId)?.Text || "No Project Found";

  const calculateDuration = (start, end) => {
    const startTime = start ? new Date(start) : null;
    const endTime = end ? new Date(end) : null;

    if (
      !startTime ||
      isNaN(startTime.getTime()) ||
      !endTime ||
      isNaN(endTime.getTime())
    ) {
      return "Not Set";
    }
    const diffMs = endTime - startTime;
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  const getStatusColor = (statusId) =>
    statusOptions.find((s) => s.id === statusId) || {
      label: "Unknown",
      color: "bg-gray-300",
    };

  const groupedTasks = useMemo(() => {
    return tasks.reduce((acc, task) => {
      const sid = task.statusId;
      if (!acc[sid]) acc[sid] = [];
      acc[sid].push(task);
      return acc;
    }, {});
  }, [tasks]);

  // Filtered tasks for current tab
  const filteredTasks = useMemo(() => {
    if (activeTab === "all") return tasks;
    return groupedTasks[activeTab] || [];
  }, [activeTab, groupedTasks, tasks]);

  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

  const paginatedTasks = useMemo(() => {
    const startIndex = (currentPage - 1) * tasksPerPage;
    return filteredTasks.slice(startIndex, startIndex + tasksPerPage);
  }, [filteredTasks, currentPage]);

  const handleTabChange = (value) => {
    setActiveTab(value);
    setCurrentPage(1);
  };

  const formattedDateTime = (dateTime) => {
    if (!dateTime) return "Not Set";
    const date = new Date(dateTime);
    if (isNaN(date.getTime())) return "Not Set";
    return date.toLocaleString();
  };

  const statusCounts = useMemo(() => {
    return Object.entries(groupedTasks).reduce((acc, [statusId, tasks]) => {
      acc[statusId] = tasks.length;
      return acc;
    }, {});
  }, [groupedTasks]);

  return tasks.length > 0 ? (
    <>
      <Tabs
        defaultValue="all"
        value={activeTab}
        onValueChange={handleTabChange}
        className="w-full"
      >
        <TabsList className="flex justify-center mb-6 flex-wrap gap-2">
          <TabsTrigger value="all" className="capitalize">
            All {tasks.length}
          </TabsTrigger>
          {Object.keys(groupedTasks).map((statusId) => (
            <TabsTrigger key={statusId} value={statusId} className="capitalize">
              {getStatusColor(statusId)?.label} {" "} {statusCounts[statusId]}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Tab Content: All & Status Based */}
        {["all", ...Object.keys(groupedTasks)].map((tabKey) => (
          <TabsContent key={tabKey} value={tabKey}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {(activeTab === tabKey ? paginatedTasks : []).map((task, i) => {
                const duration = calculateDuration(
                  task?.startDateTime,
                  task?.endDateTime
                );
                return (
                  <Card
                    key={i}
                    className={`${getStatusColor(task.statusId).color} `}
                  >
                    <CardHeader>
                      <div className="flex justify-between items-center gap-2">
                        <CardTitle className="text-xs capitalize font-bold text-black leading-tight line-clamp-2 flex-1">
                          Task :<span className="pl-1 text-black/80">{task.task}</span>
                        </CardTitle>
                        <Badge
                          className={`${
                            getStatusColor(task.statusId).color
                          } text-xs p-1 shrink-0`}
                        >
                          {getStatusColor(task.statusId).label}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2 pt-0 px-3 pb-3 text-black">
                      <div className="bg-gray-50 rounded p-2">
                        <div className="flex items-center gap-1 mb-1">
                          <User className="h-3 w-3 text-gray-500" />
                          <span className="text-xs font-medium text-gray-700">
                            Contact
                          </span>
                        </div>
                        <p className="text-xs font-medium truncate">
                          User: {user?.UserName}
                        </p>
                        <p className="text-xs text-gray-600 font-mono truncate">
                          Department: {department(task?.deptId)}
                        </p>
                        <p className="text-xs text-gray-500 font-mono truncate">
                          Project: {project(task?.projectId)}
                        </p>
                      </div>

                      {/* Time Info */}
                      <div className="bg-blue-50 rounded p-2">
                        <div className="flex items-center gap-1 mb-1">
                          <Clock className="h-3 w-3 text-blue-600" />
                          <span className="text-xs font-medium text-gray-700">
                            Time
                          </span>
                        </div>
                        <div className="grid grid-cols-3 gap-1 text-xs">
                          <div>
                            <p className="text-gray-500">Start</p>
                            <p className="font-medium text-xs">
                              {formattedDateTime(task?.startDateTime)}
                            </p>
                          </div>

                          <div>
                            <p className="text-gray-500">End</p>
                            <p className="font-medium text-xs">
                              {formattedDateTime(task?.endDateTime)}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500">Duration</p>
                            <p className="font-medium text-blue-600 text-xs">
                              {duration.includes("NaN") ? "Not Set" : duration}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-cyan-50 rounded p-2">
                        <div className="flex items-center gap-1 mb-1">
                          <List className="h-3 w-3 text-cyan-600" />
                          <span className="text-xs font-medium text-gray-700">
                            Remarks
                          </span>
                        </div>
                        <p className="text-xs text-gray-800 font-semibold">
                          {task?.remarks}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Pagination Footer */}
      {totalPages > 1 && (
        <div className="mt-4 flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  aria-disabled={currentPage === 1}
                  className={
                    currentPage === 1 ? "opacity-50 pointer-events-none" : ""
                  }
                />
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    isActive={currentPage === i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    setCurrentPage((p) => Math.min(p + 1, totalPages))
                  }
                  aria-disabled={currentPage === totalPages}
                  className={
                    currentPage === totalPages
                      ? "opacity-50 pointer-events-none"
                      : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </>
  ) : (
    <h1 className="col-span-3 text-center text-xl font-semibold text-gray-700 p-16">
      Add New Tasks To Display. No Task Found
    </h1>
  );
};

export default CardList;
