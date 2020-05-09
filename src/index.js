import React from "react";
import ReactDOM from "react-dom";
import initialData from "./initial-data";
import Column from "./column";
import { DragDropContext } from "react-beautiful-dnd";
import "reset-css";
import styled from "styled-components";
// import App from "./App";

const Container = styled.div`
  display: flex;
`;

class App extends React.Component {
  state = initialData;
  onDragStart = () => {
    document.body.style.color = "orange";
  };
  onDragEnd = result => {
    //TODO: reorder our column
    document.body.style.color = "inherit";
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const start = this.state.columns[source.droppableId];
    const finish = this.state.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds
      };

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn
        }
      };
      this.setState(newState);
      return;
    }

    // moving from one list to another list
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds
    };
    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish
      }
    };
    this.setState(newState);
  };

  render() {
    return (
      <DragDropContext
        onDragEnd={this.onDragEnd}
        // onDragStart={this.onDragStart}
        // onDragUpdate={this.onDragUpdate}
      >
        <Container>
          {this.state.columnOrder.map(columnId => {
            const column = this.state.columns[columnId];
            const sections = column.taskIds.map(
              taskId => this.state.sections[taskId]
            );
            return (
              <Column key={column.id} column={column} sections={sections} />
            );
          })}
        </Container>
      </DragDropContext>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
