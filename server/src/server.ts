import { app } from "./app";
import { AppDataSource } from "./data-source";

AppDataSource.initialize().then(() => {
  const port = process.env.PORT

  return app.listen(port, () => console.log(`server online - running on port ${port}`))
})
