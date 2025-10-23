import { body } from "express-validator";

export const userValidationRules = [

    body("name")
    .isString()
    .withMessage("Name is a must string .")
    .notEmpty()
   .withMessage("Name is required"),

   body("addresses.work.country")
   .isString()
   .withMessage("name is a must String")
   .notEmpty()
   .withMessage("Name is require "),

   body("siblings")
   .isArray({min:1})
   .withMessage("Siblings must be a non-empty array"),

   body("siblings.*.name").isLength({
    max:10
   }).withMessage("Max Length Over Ho Gyi Hai ")





]