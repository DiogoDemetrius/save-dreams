import mongoose from 'mongoose';

const virtualMachineSchema = new mongoose.Schema({
  vmId: {
    type: String,
    required: true,
    unique: true
  },
  proxmoxId: {
    type: String,
    required: true
  },
  node: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['stopped', 'running', 'starting', 'error'],
    default: 'stopped'
  },
  plan: {
    type: String,
    enum: ['standard', 'premium'],
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model('VirtualMachine', virtualMachineSchema); 