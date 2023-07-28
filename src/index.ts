import express , { Application, NextFunction, Request, Response} from "express";
import helmet from "helmet";
import rateLimit from 'express-rate-limit';
import config from "./utils/env.config";
import routes from "./routes";
// -----------------------------------------------------

// create my app
const app: Application = express();
/*
  Add Middlewares
*/

// json middleware
app.use(express.json());
// security middleware
app.use(helmet());
// rate-limit middleware
app.use(rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 1000, // Limit each IP to 1000 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: "Too many requests , please try again later"
})); // Apply the rate limiting middleware to all requests

// -------------------------------------------------------------------------------------

app.use('/api', routes);

app.use((_req: Request,  res:Response) => {
  res.status(404).json({message: "Sorry this api not found 😂"});
});

app.use((error: Error, _req: Request,  res:Response, _next: NextFunction) => {
    res.status(500).json({messgae: "Error in server" + error.message});
});

app.listen(config.PORT);

export default app;


