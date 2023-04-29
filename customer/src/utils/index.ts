import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import CONFIG from '../config';
import { Request } from 'express';
import { CustomRequest } from '../types/api/customRequest.types';

const { APP_SECRET } = CONFIG;

//Utility functions
const GenerateSalt = async () => {
  return await bcrypt.genSalt();
};
const GeneratePassword = async (inputPasswd: string, salt: string) => {
  return await bcrypt.hash(inputPasswd, salt);
};

const ValidatePassword = async ({
  inputPasswd,
  password,
  salt,
}: {
  [key: string]: string;
}) => {
  return (await GeneratePassword(inputPasswd, salt)) === password;
};

const GenerateSignature = async (payload: string | jwt.JwtPayload) => {
  return jwt.sign(payload, APP_SECRET as string, { expiresIn: '1d' });
};

const ValidateSignature = async (req: Request) => {
  const signature = req.get('Authorization');

  if (!signature) return false;
  try {
    const payload = jwt.verify(
      signature.split(' ')[1],
      APP_SECRET,
    ) as jwt.JwtPayload;
    console.log(payload);
    
    (req as CustomRequest).user = payload;
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const FormateData = (data: any) => {
  if (data) {
    return { data };
  } else {
    throw new Error('Data Not found!');
  }
};

export {
  FormateData,
  ValidateSignature,
  GeneratePassword,
  ValidatePassword,
  GenerateSalt,
  GenerateSignature,
};

//Message Broker
// module.exports.CreateChannel = async () => {
//   try {
//     const connection = await amqplib.connect(MSG_QUEUE_URL);
//     const channel = await connection.createChannel();
//     await channel.assertQueue(EXCHANGE_NAME, 'direct', { durable: true });
//     return channel;
//   } catch (err) {
//     throw err;
//   }
// };

// module.exports.PublishMessage = (channel, service, msg) => {
//   channel.publish(EXCHANGE_NAME, service, Buffer.from(msg));
//   console.log('Sent: ', msg);
// };

// module.exports.SubscribeMessage = async (channel, service) => {
//   await channel.assertExchange(EXCHANGE_NAME, 'direct', { durable: true });
//   const q = await channel.assertQueue('', { exclusive: true });
//   console.log(` Waiting for messages in queue: ${q.queue}`);

//   channel.bindQueue(q.queue, EXCHANGE_NAME, CUSTOMER_SERVICE);

//   channel.consume(
//     q.queue,
//     (msg) => {
//       if (msg.content) {
//         console.log('the message is:', msg.content.toString());
//         service.SubscribeEvents(msg.content.toString());
//       }
//       console.log('[X] received');
//     },
//     {
//       noAck: true,
//     },
//   );
// };
