import userRouter from "./app/usuario/router.js";
const basePath = "/api/v1";

const setRouter = (app) => {
   app.use(`${basePath}/user`, userRouter);
};

export default setRouter;
