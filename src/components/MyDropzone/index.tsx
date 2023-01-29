import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import { Droppable, Draggable, DragDropContext } from 'react-beautiful-dnd';

import { IFile } from './types';
import Thumb from './Thumb';

const MyDropzone = () => {
  const [files, setFiles] = useState<IFile[]>([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/png': ['.png'],
      'image/jpg': ['.jpg'],
      'image/jpeg': ['.jpeg'],
    },
    onDrop: (acceptedFiles) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        setFiles(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        );
      }
    },
  });

  const removeFile = (file: IFile) => {
    setFiles(files.filter((f) => f !== file));
    toast.success(`Removed ${file.name}`);
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }
    const newFiles = Array.from(files);
    const [removed] = newFiles.splice(result.source.index, 1);
    newFiles.splice(result.destination.index, 0, removed);
    setFiles(newFiles);
  };

  const thumbs = files.map((file, index) => (
    <Draggable key={file.name} draggableId={file.name} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Thumb file={file} removeFile={removeFile} />
        </div>
      )}
    </Draggable>
  ));

  return (
    <section className="container">
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} multiple />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
        <Droppable
          droppableId={files && files.length > 0 ? files[0].name : 'test'}
          direction="horizontal"
        >
          {(provided) => (
            <aside
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="thumbs-container"
            >
              {thumbs}
              {provided.placeholder}
            </aside>
          )}
        </Droppable>
      </DragDropContext>
    </section>
  );
};

export default MyDropzone;
