const getMany = (model) => async (req, res) => {
  try {
    const orders = await model
      .find({ createdBy: req.user._id })
      .lean()
      .exec();

    if (!orders) {
      res.status(400).end();
    } else {
      res.status(200).send({ data: orders });
    }
  } catch (error) {
    res.status(400).end();
  }
};

const getOne = (model) => async (req, res) => {
  try {
    const order = await model
      .findOne({
        _id: req.params.id,
        createdBy: req.user._id
      })
      .lean()
      .exec();

    if (!order) {
      res.status(400).end();
    } else {
      res.status(200).send({ data: order });
    }
  } catch (error) {
    res.status(400).end();
  }
};

const createOne = (model) => async (req, res) => {
  try {
    const order = await model.create({
      item: req.body.item,
      itemQuantity: req.body.itemQuantity,
      price: req.body.price,
      createdBy: req.user._id
    });
    res.status(201).send({ data: order });
  } catch (error) {
    res.status(400).end();
  }
};

const updateOne = (model) => async (req, res) => {
  try {
    const order = await model.findOneAndUpdate(
      {
        _id: req.params.id,
        createdBy: req.user._id
      },
      {
        item: req.body.item,
        itemQuantity: req.body.itemQuantity
      },
      { new: true }
    );

    if (!order) {
      res.status(400).end();
    } else {
      res.status(200).send({ data: order });
    }
  } catch (error) {
    res.status(400).end();
  }
};

const deleteOne = (model) => async (req, res) => {
  try {
    const order = await model.findOneAndRemove({
      _id: req.params.id,
      createdBy: req.user._id
    });

    if (!order) {
      res.status(400).end();
    } else {
      res.status(200).send({ data: order });
    }
  } catch (error) {
    res.status(400).end();
  }
};

export const crudControllers = (model) => ({
  getMany: getMany(model),
  getOne: getOne(model),
  createOne: createOne(model),
  updateOne: updateOne(model),
  deleteOne: deleteOne(model)
});
