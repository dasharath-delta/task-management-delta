import { useUserStore } from '@/store/useUserStore';
import React, { useMemo, useState } from 'react';
import SingleCard from './SingleCard';
import { statusOptions } from '@/data';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
} from '@/components/ui/pagination';

const CardList = ({ setIsEdit, setEditTask }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState('all');
  const tasksPerPage = 6;

  const tasks = useUserStore(state => state.tasks);

  const getStatusColor = statusId =>
    statusOptions.find(s => s.id === statusId) || {
      label: 'Unknown',
      color: 'bg-gray-300',
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
    if (activeTab === 'all') return tasks;
    return groupedTasks[activeTab] || [];
  }, [activeTab, groupedTasks, tasks]);

  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

  const paginatedTasks = useMemo(() => {
    const startIndex = (currentPage - 1) * tasksPerPage;
    return filteredTasks.slice(startIndex, startIndex + tasksPerPage);
  }, [filteredTasks, currentPage]);

  const handleTabChange = value => {
    setActiveTab(value);
    setCurrentPage(1);
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
          {Object.keys(groupedTasks).map(statusId => (
            <TabsTrigger key={statusId} value={statusId} className="capitalize">
              {getStatusColor(statusId)?.label} {statusCounts[statusId]}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Tab Content: All & Status Based */}
        {['all', ...Object.keys(groupedTasks)].map(tabKey => (
          <TabsContent key={tabKey} value={tabKey}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {(activeTab === tabKey ? paginatedTasks : []).map((task, i) => {
                // Single  Card Component
                return (
                  <SingleCard
                    key={i}
                    task={task}
                    setIsEdit={setIsEdit}
                    setEditTask={setEditTask}
                  />
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
                  onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                  aria-disabled={currentPage === 1}
                  className={
                    currentPage === 1 ? 'opacity-50 pointer-events-none' : ''
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
                    setCurrentPage(p => Math.min(p + 1, totalPages))
                  }
                  aria-disabled={currentPage === totalPages}
                  className={
                    currentPage === totalPages
                      ? 'opacity-50 pointer-events-none'
                      : ''
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </>
  ) : (
    <h1 className="col-span-3 text-center text-base font-semibold text-gray-600 p-16">
      Add New Tasks To Display. No Task Found
    </h1>
  );
};

export default CardList;
