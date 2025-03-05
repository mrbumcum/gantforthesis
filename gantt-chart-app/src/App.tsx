import { GanttComponent, Inject, Edit, Filter, Sort, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-gantt';
import './App.css';

// Sample data for the Gantt chart
const projectData = [
  {
    TaskID: 1,
    TaskName: 'Project Initiation',
    StartDate: new Date('04/02/2023'),
    EndDate: new Date('04/21/2023'),
  },
  {
    TaskID: 2,
    TaskName: 'Identify Site location',
    StartDate: new Date('04/02/2023'),
    Duration: 4,
    Progress: 50,
    ParentId: 1,
  },
  {
    TaskID: 3,
    TaskName: 'Perform Soil test',
    StartDate: new Date('04/02/2023'),
    Duration: 4,
    Progress: 50,
    ParentId: 1,
    Predecessor: '2FS'
  },
  {
    TaskID: 4,
    TaskName: 'Soil test approval',
    StartDate: new Date('04/02/2023'),
    Duration: 4,
    Progress: 50,
    ParentId: 1,
  },
  {
    TaskID: 5,
    TaskName: 'Project Estimation',
    StartDate: new Date('04/02/2023'),
    EndDate: new Date('04/21/2023'),
  },
  {
    TaskID: 6,
    TaskName: 'Develop floor plan for estimation',
    StartDate: new Date('04/04/2023'),
    Duration: 3,
    Progress: 50,
    ParentId: 5,
  },
  {
    TaskID: 7,
    TaskName: 'List materials',
    StartDate: new Date('04/04/2023'),
    Duration: 3,
    Progress: 50,
    ParentId: 5,
  },
  {
    TaskID: 8,
    TaskName: 'Estimation approval',
    StartDate: new Date('04/04/2023'),
    Duration: 3,
    Progress: 50,
    ParentId: 5,
    Predecessor: '7SS'
  },
];

// Sample resources data
const projectResources = [
  { ResourceId: 1, ResourceName: 'Project Manager' },
  { ResourceId: 2, ResourceName: 'Software Analyst' },
  { ResourceId: 3, ResourceName: 'Developer' },
  { ResourceId: 4, ResourceName: 'Testing Engineer' }
];

function App() {
  // Configure task fields mapping
  const taskFields = {
    id: 'TaskID',
    name: 'TaskName',
    startDate: 'StartDate',
    duration: 'Duration',
    progress: 'Progress',
    parentID: 'ParentId',
    dependency: 'Predecessor',
    resourceInfo: 'Resources'
  };

  // Configure label settings
  const labelSettings = {
    rightLabel: 'Resources'
  };

  // Configure edit settings
  const editSettings = {
    allowEditing: true,
    mode: 'Auto',
    allowTaskbarEditing: true
  };

  // Configure resource fields mapping
  const resourceFields = {
    id: 'ResourceId',
    name: 'ResourceName',
  };

  return (
    <div className="app-container">
      <h1>Thesis Proposal Timeline</h1>
      <GanttComponent 
        dataSource={projectData} 
        taskFields={taskFields}
        resourceFields={resourceFields}
        resources={projectResources}
        height="450px"
        allowFiltering={true}
        allowSorting={true}
        editSettings={editSettings}
        labelSettings={labelSettings}
      >
        <ColumnsDirective>
          <ColumnDirective field='TaskID' width='80' />
          <ColumnDirective field='TaskName' headerText='Task Name' width='250' />
          <ColumnDirective field='StartDate' />
          <ColumnDirective field='Duration' />
          <ColumnDirective field='Progress' />
        </ColumnsDirective>
        <Inject services={[Edit, Filter, Sort]} />
      </GanttComponent>
    </div>
  );
}

export default App;