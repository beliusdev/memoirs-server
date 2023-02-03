import mongoose from 'mongoose';

const MemorySchema = new mongoose.Schema({
  userId: String,

  title: {
    type: String,
    required: true,
  },

  body: {
    type: String,
    required: true,
  },

  tags: [{ type: String }],

  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Memory = mongoose.model('Memory', MemorySchema);
export default Memory;
