import { Router } from "express";
import { TaskMangerGetControllers,TaskMangerPostControllers,TaskMangerGetSingleControllers,TaskMangerPutControllers,TaskMangerPatchControllers,TaskMangerDeleteControllers } from "../../controllers/TaskMangerControllers.mjs";



const taskRoute = Router()

taskRoute.get("/task",TaskMangerGetControllers);
taskRoute.get("/task/:taskId",TaskMangerGetSingleControllers);

taskRoute.post("/task",TaskMangerPostControllers);
taskRoute.put("/task/:taskId",TaskMangerPutControllers);
taskRoute.patch("/task/:taskId",TaskMangerPatchControllers);
taskRoute.delete("/task/:taskId",TaskMangerDeleteControllers);






export default taskRoute;