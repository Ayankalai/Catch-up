import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()


app.use(cors({
    origin: [process.env.CORS_ORIGIN, 'http://localhost:3001'],  
    credentials: true
}));

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended: true, limit:"16kb"}))
app.use(express.static("public"))

app.use(cookieParser())



import usesRouter from './routes/user.routes.js'
import videoRouter from './routes/video.routes.js'
import imageRouter from './routes/image.routes.js'
import searchRouter from './routes/search.routes.js'

app.use("/api/v1/", usesRouter)
app.use("/api/v1/video", videoRouter)
app.use("/api/v1/image", imageRouter)
app.use("/api/v1/search", searchRouter)

export default app

