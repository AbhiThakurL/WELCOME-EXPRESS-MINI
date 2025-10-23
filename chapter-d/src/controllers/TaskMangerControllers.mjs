import { v4 as uuidv4 } from "uuid";
import tasks from "../models/taskData.mjs";
import TaskMangerZodvaildationTask from "../middleware/validationTask.mjs";
import { number } from "zod";
import { id } from "zod/v4/locales";

const TaskMangerGetControllers = (request, response) => {
  const tasking = tasks;

  if (!tasking || tasking.length === 0)
    return response.status(404).json({ error: "Not found task data" });

  response.status(200).json({
    success: true,
    message: "Task data fetched successfully",
    data: tasking,
  });
};

const TaskMangerGetSingleControllers = (request, response) => {
  try {
    const { taskId } = request.params;
    const taskSingleItem = tasks.find((idx) => idx.id === taskId);
    return response.status(200).json({
      task: taskSingleItem,
    });
  } catch (error) {
    if (error.name === "ZodError") {
      response.status(400).json({
        success: false,
        message: error.errors,
      });
    }
  }

  return response.status(500).json({
    success: false,
    message: "Server error",
  });
};

const TaskMangerPostControllers = (request, response) => {
  try {
    const data = TaskMangerZodvaildationTask.parse(request.body);

    const NewTaskData = {
      id: tasks.length + 1,
      title: data.title,
      completed: data.completed || false,
    };

    tasks.push(NewTaskData);
    return response.status(201).json({
      message: "Success Create Task ",
    });
  } catch (error) {
    if (error.name === "ZodError") {
      response.status(400).json({
        success: false,
        message: error.errors,
      });
    }
  }

  response.status(500).json({
    success: false,
    message: "Server error",
  });
};

const TaskMangerPutControllers = (request, response) => {
  try {
    const { taskId } = request.params;
    const data = TaskMangerZodvaildationTask.parse(request.body);

    const taskPut = tasks.findIndex((idx) => idx.id === Number(taskId));

    if (taskPut === -1)
      return response.status(404).json({
        message: "not Found Page ..",
      });

    tasks[taskPut] = {
      id: taskId,
      ...data,
    };

    return response.status(201).json({
      success: true,
      message: "Task updated successfully (PUT)!",
      task: tasks[taskId],
    });
  } catch (error) {
    if (error.name === "ZodError") {
      response.status(400).json({
        success: false,
        message: error.errors,
      });
    }
  }

  response.status(500).json({
    success: false,
    message: "Server error",
  });
};

const TaskMangerPatchControllers = (request,response)=>{

  try{

      const {taskId} =  request.params;
      const data = request.body;

      const taskPatch = tasks.findIndex((idx)=>idx.id===Number(taskId))

      if(taskPatch === -1) return response.status(404).json({message:"Not Found page"})

      tasks[taskPatch] = {...tasks[taskPatch],...data}



      return response.status(200).json({
      success: true,
      message: "Task updated successfully (PATCH)!",
    });

  }catch(error){

     if (error.name === "ZodError") {
      response.status(400).json({
        success: false,
        message: error.errors,
      });
    }

  }

    response.status(500).json({
    success: false,
    message: "Server error",
  });




}


const TaskMangerDeleteControllers = (request,response)=>{

  try{

      const {taskId} =  request.params;

      const taskDelete = tasks.findIndex((idx)=>idx.id===Number(taskId))

      if(taskDelete === -1) return response.status(404).json({message:"Not Found page"})

     const deletedTask = tasks.splice(taskDelete, 1)[0];



      return response.status(200).json({
      success: true,
      message: "Task updated successfully (PATCH)!",
      deletedTask,
    });

  }catch(error){

     if (error.name === "ZodError") {
      response.status(400).json({
        success: false,
        message: error.errors,
      });
    }

  }

    response.status(500).json({
    success: false,
    message: "Server error",
  });




}


export {
  TaskMangerGetControllers,
  TaskMangerPostControllers,
  TaskMangerGetSingleControllers,
  TaskMangerPutControllers,
  TaskMangerPatchControllers,
  TaskMangerDeleteControllers,
};
