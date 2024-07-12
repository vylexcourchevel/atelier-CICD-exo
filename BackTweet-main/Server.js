import {ENV} from './config/env.js'
import {server} from './Services/Socket.js';

//PORT

const PORT = ENV.PORT || 8686;



// LISTEN 
server.listen(PORT, () =>{
    console.log(`Listening at http://localhost:${PORT}`);
})






