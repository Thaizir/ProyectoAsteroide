const express = require('express')
const routes = require('./router/routes')
const cors = require('cors');

const PORT = 3000;
const app = express();
app.use(cors());
app.use(routes);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})

