"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RPCObserver = exports.PublishMessage = exports.CreateChannel = exports.GenerateSignature = exports.GenerateSalt = exports.ValidatePassword = exports.GeneratePassword = exports.ValidateSignature = exports.FormateData = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const amqplib_1 = __importDefault(require("amqplib"));
const config_1 = __importDefault(require("../config"));
const { APP_SECRET, MSG_QUEUE_URL, EXCHANGE_NAME } = config_1.default;
// let amqplibConnection = null;
//Utility functions
const GenerateSalt = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcryptjs_1.default.genSalt();
});
exports.GenerateSalt = GenerateSalt;
const GeneratePassword = (inputPasswd, salt) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcryptjs_1.default.hash(inputPasswd, salt);
});
exports.GeneratePassword = GeneratePassword;
const ValidatePassword = ({ inputPasswd, password, salt, }) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield GeneratePassword(inputPasswd, salt)) === password;
});
exports.ValidatePassword = ValidatePassword;
const GenerateSignature = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    return jsonwebtoken_1.default.sign(payload, APP_SECRET, { expiresIn: '1d' });
});
exports.GenerateSignature = GenerateSignature;
const ValidateSignature = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const signature = req.get('Authorization');
    if (!signature)
        return false;
    try {
        const payload = jsonwebtoken_1.default.verify(signature.split(' ')[1], APP_SECRET);
        req.user = payload;
        return true;
    }
    catch (err) {
        console.log(err);
        return false;
    }
});
exports.ValidateSignature = ValidateSignature;
const FormateData = (data) => {
    if (data) {
        return { data };
    }
    else {
        throw new Error('Data Not found!');
    }
};
exports.FormateData = FormateData;
// try {
//   const channel = await amqplib.connect(MSG_QUEUE_URL);
//   await channel.assertQueue(EXCHANGE_NAME, { durable: true });
//   return channel;
// } catch (err) {
//   throw err;
// }
//Message Broker
const CreateChannel = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield amqplib_1.default.connect(MSG_QUEUE_URL);
        const channel = yield connection.createChannel();
        yield channel.assertQueue(EXCHANGE_NAME, { durable: true });
        return channel;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
});
exports.CreateChannel = CreateChannel;
const PublishMessage = (channel, service, msg) => {
    channel.publish(EXCHANGE_NAME, service, Buffer.from(msg));
    console.log("Sent: ", msg);
};
exports.PublishMessage = PublishMessage;
const RPCObserver = (RPC_QUEUE_NAME, service, channel) => __awaiter(void 0, void 0, void 0, function* () {
    yield channel.assertQueue(RPC_QUEUE_NAME, {
        durable: false,
    });
    channel.prefetch(1);
    channel.consume(RPC_QUEUE_NAME, (msg) => __awaiter(void 0, void 0, void 0, function* () {
        if (msg === null || msg === void 0 ? void 0 : msg.content) {
            // DB Operation
            const payload = JSON.parse(msg.content.toString());
            const response = yield service.serveRPCRequest(payload);
            channel.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify(response)), {
                correlationId: msg.properties.correlationId,
            });
            channel.ack(msg);
        }
    }), {
        noAck: false,
    });
});
exports.RPCObserver = RPCObserver;
