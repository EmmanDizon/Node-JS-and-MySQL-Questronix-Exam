const dbService = require("../schema/person");
const Joi = require("joi");

const validatePerson = (person) => {
  let schema = Joi.object({
    FirstName: Joi.string().required(),
    LastName: Joi.string().required(),
    Address: Joi.string().required(),
    ContactNo: Joi.string().required(),
    Email: Joi.string().required().email(),
  });

  return schema.validate(person);
};

exports.newPerson = async (req, res, next) => {
  const { error } = validatePerson(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const execSQL = dbService.getDBServiceInstance();

  const result = await execSQL.createPerson(req.body);

  res.status(201).json({
    success: true,
    message: result,
  });
};

exports.getAllPersons = async (req, res, next) => {
  const execSQL = dbService.getDBServiceInstance();
  const result = await execSQL.getAllData();
  res.status(201).json({
    success: true,
    message: result,
  });
};

exports.deletePersonById = async (req, res, next) => {
  const { id } = req.params;

  const execSQL = dbService.getDBServiceInstance();
  const result = await execSQL.deletePersonById(id);

  if (!result) return res.status(404).send("No record found with the given Id");

  res.status(201).json({
    success: true,
    message: "Deleted Successfully !",
  });
};

exports.updatePersonById = async (req, res, next) => {
  const { id } = req.params;

  const execSQL = dbService.getDBServiceInstance();
  const { result, data } = await execSQL.updateRecordById(req.body, id);

  if (!result) return res.status(404).send("No record found with the given Id");

  res.status(201).json({
    success: result,
    data: data,
  });
};

exports.getPersonById = async (req, res, next) => {
  const { id } = req.params;

  const execSQL = dbService.getDBServiceInstance();
  const result = await execSQL.getPersonById(id);

  const { length } = result;

  if (length === 0)
    return res.status(404).send("No record found with the given Id");

  res.status(201).json({
    success: true,
    data: result,
  });
};
