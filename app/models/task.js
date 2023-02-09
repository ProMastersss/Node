import { model, Schema } from 'mongoose';

const task = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
  complexity: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

export default model('tasks', task);
