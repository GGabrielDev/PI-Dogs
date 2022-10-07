//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<!-- <|> -->_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require("./src/app.js");
const {
  conn,
  checkConnection,
  temperamentsInitializer,
} = require("./src/db.js");

const { DB_PORT } = process.env || 3001;

// Syncing all the models at once.
checkConnection().then(
  conn.sync({ force: true }).then(async () => {
    await temperamentsInitializer();
    server.listen(DB_PORT, async () => {
      console.log(`🚀🎉 Listening at port ${DB_PORT}`); // eslint-disable-line no-console
    });
  })
);
