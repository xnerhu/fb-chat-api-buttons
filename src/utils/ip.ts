import { networkInterfaces } from 'os';

export const getPublicIp = () => {
  const interfaces = networkInterfaces();

  for (const netInterfaces in interfaces) {
    const devices = interfaces[netInterfaces];

    for (const device of devices) {
      if (device.family === 'IPv4' && !device.internal) {
        return device.address;
      }
    }
  }
  return null;
};
