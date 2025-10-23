import * as z from "zod";

const TaskManagerZodValidationTask = z.object({
  id: z.number(), // changed from string() to number()
  title: z.string().min(1, "Title is required"),
  completed: z.boolean().optional(),
});

export default TaskManagerZodValidationTask;
