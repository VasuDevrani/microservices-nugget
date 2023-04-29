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
// const getChannel = async () => {
//   if (amqplibConnection === null) {
//     amqplibConnection = await amqplib.connect(MSG_QUEUE_URL);
//   }
//   return await amqplibConnection.createChannel();
// };

// module.exports.CreateChannel = async () => {
//   try {
//     const channel = await getChannel();
//     await channel.assertQueue(EXCHANGE_NAME, "direct", { durable: true });
//     return channel;
//   } catch (err) {
//     throw err;
//   }
// };

// module.exports.PublishMessage = (channel, service, msg) => {
//   channel.publish(EXCHANGE_NAME, service, Buffer.from(msg));
//   console.log("Sent: ", msg);
// };

// module.exports.RPCObserver = async (RPC_QUEUE_NAME, service) => {
//   const channel = await getChannel();
//   await channel.assertQueue(RPC_QUEUE_NAME, {
//     durable: false,
//   });
//   channel.prefetch(1);
//   channel.consume(
//     RPC_QUEUE_NAME,
//     async (msg) => {
//       if (msg.content) {
//         // DB Operation
//         const payload = JSON.parse(msg.content.toString());
//         const response = await service.serveRPCRequest(payload);
//         channel.sendToQueue(
//           msg.properties.replyTo,
//           Buffer.from(JSON.stringify(response)),
//           {
//             correlationId: msg.properties.correlationId,
//           }
//         );
//         channel.ack(msg);
//       }
//     },
//     {
//       noAck: false,
//     }
//   );
// };
