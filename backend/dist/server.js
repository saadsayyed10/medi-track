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
const express_1 = __importDefault(require("express"));
const prisma_db_1 = require("./lib/prisma.db");
const cors_1 = __importDefault(require("cors"));
const index_route_1 = __importDefault(require("./api/routes/index.route"));
const env_config_1 = require("./config/env.config");
const app = (0, express_1.default)();
const PORT = env_config_1.ENV.PORT;
app.set("trust proxy", 1);
app.use(express_1.default.json({ limit: "10mb" }));
app.use(express_1.default.urlencoded({ limit: "10mb", extended: true }));
app.use((0, cors_1.default)());
app.get("/", (_req, res) => {
    res.json({ status: 200 });
});
app.use("/api", index_route_1.default);
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, prisma_db_1.connectDB)();
    app.listen(PORT, () => {
        console.log(`Server up and running on PORT: ${PORT}`);
    });
});
startServer();
