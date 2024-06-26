import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import * as bodyParser from "body-parser";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { planet_router } from "./controller/planet.routes";
import { satellite_router } from "./controller/satellite.routes";
import { resource_router } from "./controller/resource.routes";
import { account_router } from "./controller/account.routes";
import {expressjwt} from "express-jwt";

const app = express();
dotenv.config();
const port = process.env.APP_PORT || 3000;
const jwtSecret=process.env.JWT_SECRET;
app.use(cors());
app.use(
  expressjwt({secret: jwtSecret, algorithms: ['HS256']}).unless({path: [/^\/api-docs\/.*/, /^\/swagger-.*/, '/account/login', '/status', '/account/addaccount', "/"]
      }
  )
);
const swaggerOpts = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Back-end",
      version: "1.0.0",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  
  },
  apis: ["./controller/*.routes.ts"],
};
const swaggerSpec = swaggerJSDoc(swaggerOpts);





app.use(bodyParser.json());

app.use("/planet",planet_router);

app.use("/satellite",satellite_router);

app.use("/resource",resource_router);

app.use("/account",account_router);

app.get("/status", (req, res) => {
  res.json({ message: "Back-end is running..." });
});

app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port || 3000, () => {
  console.log(`Back-end is running on port ${port}.`);
});

app.get("/planet", (req, res) => {
  res.json({ message: "Back-end is running..." });
});
