import { io } from "socket.io-client";
import ENV from "../../config.js";

export const socket = io(ENV.api_host);