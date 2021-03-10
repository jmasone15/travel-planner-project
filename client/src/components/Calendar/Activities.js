import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
// import './App.css';


function Activities(props) {
  // const [characters, updateCharacters] = useState(finalSpaceCharacters);

  async function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(props.activitiesArray);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    await props.setActivitesArray(items);
  }

  useEffect(() => {
        
  }, [props.activitiesArray, props.setActivitesArray])

  return (
    <div className="App">
      <header className="App-header">
        <h1>My activities for this day</h1>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="characters">
            {(provided) => (
              <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                {props.activitiesArray.map(({id, name, location, address, photo_reference}, index) => {
                  return (
                    <Draggable key={id} draggableId={id} index={index}>
                      {(provided) => (
                        <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <div className="characters-thumb">
                            <img src={`https://maps.googleapis.com/maps/api/place/photo?photoreference=${photo_reference}&sensor=false&maxheight=150&maxwidth=150&key=AIzaSyCoiYtN7Xjb7P4JIpWRtlMiL9uQirs_icI`} alt={`${name}`} />
                            <p>{address}</p>
                            <p>{id}</p>
                          </div>
                          <p>
                            { name }
                          </p>
                        </li>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </header>
      <p>
        Images from <a href="https://final-space.fandom.com/wiki/Final_Space_Wiki">Final Space Wiki</a>
      </p>
    </div>
  );
}

export default Activities;