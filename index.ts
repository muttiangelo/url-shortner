import express  from 'express'
import cors from 'cors'
import router from "./routes/url.routes.ts";

const PORT = process.env.port || 3000
const app = express()
app.use(express.json())
app.use(router)

app.use(cors({
    origin: process.env.FRONTEND_URL
}));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})