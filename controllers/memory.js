import Memory from '../models/Memory.js';

// Create
export const createMemory = async (req, res, next) => {
  try {
    const user = req.user;
    const { title, body, tags } = req.body;

    const memory = await Memory.create({
      userId: user._id.toString(),
      title,
      body,
      tags,
    });

    res.status(201).json({
      memory,
    });
  } catch (error) {
    next(error);
  }
};

// Read
export const getUserMemories = async (req, res, next) => {
  try {
    const user = req.user;
    const memories = await Memory.find({ userId: user._id.toString() });

    res.status(200).json({
      memories,
    });
  } catch (error) {
    next(error);
  }
};

export const searchMemories = async (req, res, next) => {
  try {
    const user = req.user;
    const { searchTerm } = req.query;
    console.log(searchTerm);
    let memories = searchTerm
      ? await Memory.find({
          $and: [
            {
              $or: [
                { title: { $regex: searchTerm, $options: 'i' } },
                { body: { $regex: searchTerm, $options: 'i' } },
                { tags: { $in: [searchTerm] } },
              ],
            },
            { userId: user._id.toString() },
          ],
        })
      : await Memory.find({
          userId: user._id.toString(),
        });

    res.status(200).json({
      memories,
    });
  } catch (error) {
    next(error);
  }
};

// Update
export const editMemory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, body, tags } = req.body;
    const memory = await Memory.findById(id);

    memory.title = title;
    memory.body = body;
    memory.tags = tags;
    await memory.save();

    res.status(200).json({
      memory,
    });
  } catch (error) {
    next(error);
  }
};

// Delete
export const deleteMemory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const memory = await Memory.findById(id);

    await memory.delete();
    res.status(200).json({});
  } catch (error) {
    next(error);
  }
};
