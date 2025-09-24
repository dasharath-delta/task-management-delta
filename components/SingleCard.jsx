import React from 'react';
import { Clock, List, User } from 'lucide-react';
import { Badge } from './ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from 'antd';
import { toast } from 'react-toastify';
import { useUserStore } from '@/store/useUserStore';
import { statusOptions } from '@/data';

const SingleCard = ({ setIsEdit, setEditTask, task }) => {
  const user = useUserStore(state => state.user);
  const departments = useUserStore(state => state.departments);
  const projects = useUserStore(state => state.projects);
  const getTaskById = useUserStore(state => state.getTaskById);

  const department = dId =>
    departments?.find(d => d?.TextListId === dId)?.Text || 'N/A';

  const project = pId => {
    for (const deptProjects of Object.values(projects || {})) {
      const found = deptProjects.find(p => p?.TextListId === pId);
      if (found) return found.Text;
    }
    return 'No Porject Found';
  };

  const calculateDuration = (start, end) => {
    const startTime = start ? new Date(start) : null;
    const endTime = end ? new Date(end) : null;

    if (
      !startTime ||
      isNaN(startTime.getTime()) ||
      !endTime ||
      isNaN(endTime.getTime())
    ) {
      return 'Not Set';
    }
    const diffMs = endTime - startTime;
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };
  const duration = calculateDuration(task?.startDateTime, task?.endDateTime);

  const getStatusColor = statusId =>
    statusOptions.find(s => s.id === statusId) || {
      label: 'Unknown',
      color: 'bg-gray-300',
    };
  const formattedDateTime = dateTime => {
    if (!dateTime) return 'Not Set';
    const date = new Date(dateTime);
    if (isNaN(date.getTime())) return 'Not Set';
    return date.toLocaleString();
  };
  const handleEdit = tId => {
    if (!tId) {
      toast.error('Task Id required');
      return;
    }
    const task = getTaskById(tId);

    if (!task) {
      toast.error('Task not found');
      return;
    }
    toast.success('Edit Mode');
    setEditTask(task);
    setIsEdit(true);
  };
  return (
    <Card className={`${getStatusColor(task.statusId).color} `}>
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
            <span className="text-xs font-medium text-gray-700">Contact</span>
          </div>
          <p className="text-xs font-medium truncate">User: {user?.UserName}</p>
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
            <span className="text-xs font-medium text-gray-700">Time</span>
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
                {duration.includes('NaN') ? 'Not Set' : duration}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-cyan-50 rounded p-2">
          <div className="flex items-center gap-1 mb-1">
            <List className="h-3 w-3 text-cyan-600" />
            <span className="text-xs font-medium text-gray-700">Remarks</span>
          </div>
          <p className="text-xs text-gray-800 font-semibold">{task?.remarks}</p>
        </div>
        <div className="mt-2">
          <Button
            color="geekblue"
            onClick={() => handleEdit(task?.id)}
            variant="solid"
          >
            Edit Task
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SingleCard;
