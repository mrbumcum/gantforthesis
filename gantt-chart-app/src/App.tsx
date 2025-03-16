import { useState, useEffect } from 'react';
import './App.css';

// Task interface
interface Task {
  id: number;
  name: string;
  startDate: Date;
  endDate: Date;
  parentId?: number;
  progress?: number;
  color?: string;
  description?: string;
}

// Project timeline data
const projectData: Task[] = [
  // Project Development Timeline
  { id: 1, name: 'Project Development Timeline', startDate: new Date('2025-04-30'), endDate: new Date('2025-12-30'), color: '#3498db' },
  
  // Design and Prototyping
  { id: 2, name: 'Design and Prototyping', startDate: new Date('2025-04-30'), endDate: new Date('2025-05-14'), color: '#2ecc71',
    description: 'UX Design, Wireframes, and Architecture Mockup' },
  
  // Backend Development
  { id: 6, name: 'Backend Development', startDate: new Date('2025-05-14'), endDate: new Date('2025-07-01'), color: '#e74c3c',
    description: 'Node.js Server, LLM Integration, Database Design, Knowledge Base' },
  
  // Frontend Development
  { id: 11, name: 'Frontend Development', startDate: new Date('2025-07-01'), endDate: new Date('2025-08-15'), color: '#f39c12',
    description: 'React Setup, Component Development, Styling with HTML and Tailwind CSS' },
  
  // Testing and Iteration
  { id: 15, name: 'Testing and Iteration', startDate: new Date('2025-08-15'), endDate: new Date('2025-10-01'), color: '#9b59b6',
    description: 'API Integration, Integration Testing, Unit Testing' },
  
  // Deployment and Maintenance
  { id: 19, name: 'Deployment and Maintenance', startDate: new Date('2025-10-01'), endDate: new Date('2025-12-01'), color: '#1abc9c',
    description: 'Domain and Hosting, Dockerization' },
  
  // Feedback and Improvement
  { id: 22, name: 'Feedback and Improvement', startDate: new Date('2025-12-01'), endDate: new Date('2025-12-31'), color: '#34495e',
    description: 'Implement a system for user feedback and suggestions' },
  
  // Thesis Writing Timeline
  { id: 24, name: 'Thesis Writing Timeline', startDate: new Date('2026-01-01'), endDate: new Date('2026-03-01'), color: '#16a085',
    description: 'Introduction, Methodology, Results, Analysis, Conclusion' },
];

function App() {
  const [tasks, setTasks] = useState<Task[]>(projectData);
  const [timeRange, setTimeRange] = useState({
    start: new Date('2025-04-01'),
    end: new Date('2026-03-31')
  });
  const [monthsToShow, setMonthsToShow] = useState<Date[]>([]);

  // Generate months for the timeline
  useEffect(() => {
    const months: Date[] = [];
    const currentDate = new Date(timeRange.start);
    
    while (currentDate <= timeRange.end) {
      months.push(new Date(currentDate));
      currentDate.setMonth(currentDate.getMonth() + 1);
    }
    
    setMonthsToShow(months);
  }, [timeRange]);

  // Calculate task position and width based on dates
  const calculateTaskPosition = (task: Task) => {
    const totalDays = Math.ceil((timeRange.end.getTime() - timeRange.start.getTime()) / (1000 * 60 * 60 * 24));
    const taskStartDays = Math.ceil((task.startDate.getTime() - timeRange.start.getTime()) / (1000 * 60 * 60 * 24));
    const taskDuration = Math.ceil((task.endDate.getTime() - task.startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    
    const left = (taskStartDays / totalDays) * 100;
    const width = (taskDuration / totalDays) * 100;
    
    return { left: `${left}%`, width: `${width}%` };
  };

  // Get indentation level based on parent-child relationship
  const getIndentLevel = (task: Task) => {
    if (!task.parentId) return 0;
    const parent = tasks.find(t => t.id === task.parentId);
    return parent ? getIndentLevel(parent) + 1 : 1;
  };

  // Format date to display month and day
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // Format month for header
  const formatMonth = (date: Date) => {
    return `${date.toLocaleDateString('en-US', { month: 'short' })} ${date.toLocaleDateString('en-US', { year: 'numeric' })}`;
  };

  return (
    <div className="app-container">
      <h1>Thesis Proposal Timeline</h1>
      
      <div className="gantt-chart expanded-view">
        <div className="gantt-header">
          <div className="gantt-task-info">Task</div>
          <div className="gantt-timeline-header">
            {monthsToShow.map((month, index) => (
              <div key={index} className="gantt-month">
                {formatMonth(month)}
              </div>
            ))}
          </div>
        </div>
        
        <div className="gantt-body">
          {tasks.map(task => (
            <div key={task.id} className="gantt-row">
              <div 
                className="gantt-task-info expanded" 
                style={{ paddingLeft: `${getIndentLevel(task) * 20}px` }}
              >
                <span className="task-name">{task.name}</span>
                <span className="task-dates">
                  {formatDate(task.startDate)} - {formatDate(task.endDate)}
                </span>
                {task.description && (
                  <span className="task-description expanded">{task.description}</span>
                )}
              </div>
              
              <div className="gantt-timeline">
                <div 
                  className="gantt-bar"
                  style={{
                    ...calculateTaskPosition(task),
                    backgroundColor: task.color || '#2c3e50',
                  }}
                >
                  {task.progress !== undefined && (
                    <div 
                      className="gantt-progress" 
                      style={{ width: `${task.progress}%` }}
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;