import app from "./src/app.js"
import { banner } from './src/utils/utils.js';
import { main } from './src/botMain.js'

const port = process.env.PORT || 8080

app.listen(port, () => {
    console.log(`Server express running on port: ${port}`)
    main()
    banner()
})