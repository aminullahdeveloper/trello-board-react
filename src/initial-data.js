const initialData = {
  sections: {
    "task-1": {
      id: "task-1",
      content: "Aminullah Jalal piano fix"
    },
    "task-2": {
      id: "task-2",
      content: "Watch My favorite show"
    },
    "task-3": {
      id: "task-3",
      content: "Charge my phone"
    },
    "task-4": {
      id: "task-4",
      content: "Cook Dinner"
    }
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "To do",
      taskIds: ["task-1", "task-2", "task-3", "task-4"]
    },
    "column-2": {
      id: "column-2",
      title: "In Progress",
      taskIds: []
    },
    "column-3": {
      id: "column-3",
      title: "Done",
      taskIds: []
    }
  },
  // facilitate the reorgading of the columns
  columnOrder: ["column-1", "column-2", "column-3"]
};

export default initialData;
