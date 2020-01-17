console.log("Starting E-Shop server");

// import cartCore from "./cartCore";
const cartCore = require("./cartCore");

// const path = require("path");
const fs = require("fs");
const express = require("express");
const app = express();

app.use(express.json());
app.use("/", express.static("public"));

app.get("/catalogData.json", (req, res) => {
  fs.readFile("server/responses/catalogData.json", "utf-8", (err, data) => {
    if (err) {
      res.sendStatus(404, JSON.stringify({ result: 0 }));
    } else {
      res.send(data);
    }
  });
});

// app.post("/getCatalogItemByID.json", (req, res) => {
//   fs.readFile("server/responses/catalogData.json", "utf-8", (err, data) => {
//     if (err) {
//       res.sendStatus(err, JSON.stringify({ result: 0 }));
//     } else {
//       const id = req.body;
//       let find = data.find(item => item.id===id);
//       res.send(JSON.stringify(find));
//     }
//   });
// });

app.get("/getBasket.json", (req, res) => {
  fs.readFile("server/responses/getBasket.json", "utf-8", (err, data) => {
    if (err) {
      res.sendStatus(404, JSON.stringify({ result: 0 }));
    } else {
      res.send(data);
    }
  });
});

app.post("/addToBasket.json", (req, res) => {
  fs.readFile("server/responses/getBasket.json", "utf-8", (err, data) => {
    if (err) {
      res.send('{"result": 0}');
    } else {
      
      console.log("Launch cartCore.add");
      
      data = cartCore.add(data, req.body.id);

      console.log("data in server:");
      console.log(data);
      
      // fs.writeFile("server/responses/getBasket.json", JSON.stringify(cart, null,2), (errW, resW) => {
        fs.writeFile("server/responses/getBasket.json", data, (errW, resW) => {
        if (errW) {
          res.send(`{"result": 0, "error": ${errW}}`);
        } else {
          // logUserCartActivity("add", newItemId);
          let obj = `{"result": 1, "cart": ${data}}`;
          res.send(obj);
        }
      });
    }
  });
});

app.post("/delFromBasket.json", (req, res) => {
  fs.readFile("server/responses/getBasket.json", "utf-8", (err, data) => {
    if (err) {
      res.send('{"result": 0}');
    } else {
      data = cartCore.del(data, req.body.id);
      
      // const cart = JSON.parse(data);
      // const delItemId = req.body.id;
      // let find = cart.contents.find(item => item.id === delItemId);
      // if (--find.quantity < 1) {
      //   cart.contents.splice(cart.contents.indexOf(find) ,1);
      // }
      // recountCart(cart);

      fs.writeFile("server/responses/getBasket.json", data, (errW, resW) => {
        if (errW) {
          res.send(`{"result": 0, "error": ${errW}}`);
        } else {
          // logUserCartActivity("del", delItemId);
          res.send(`{"result": 1, "cart": ${data}}`);
        }
      });
    }
  });
});

// moved to catalogCore.js
// function getItemInCatalogById(id) {
//   const data = JSON.parse(fs.readFileSync("server/responses/catalogData.json"));
//   return data.find(item => item.id === id);
// }

//moved to logger.js
// function logUserCartActivity(action, id) {
//   const date = new Date(Date.now());
//   const dateStr = `${date.getFullYear()}.${('0'+(date.getMonth() + 1)).slice(-2)}.${('0'+date.getDate()).slice(-2)}`;
//   const timeStr = `${('0'+date.getHours()).slice(-2)}:${('0'+date.getMinutes()).slice(-2)}:${('0'+date.getSeconds()).slice(-2)}`;
//   let act;
//   switch (action) {
//     case "del":
//       act = "User deleted"
//       break;
//     case "add":
//       act = "User added"
//       break;
//     default:
//       act = "User do something unexpected with item"
//       break;
//   }
//   const title = getItemInCatalogById(id).title;
//   fs.appendFile(logFile, `${dateStr} ${timeStr} ${act} ${title}\n`, () => { });
// }

// moved to cartCore.js
// function recountCart(cart) {
//   cart.amount = 0
//   cart.countGoods = 0;
//   cart.contents.forEach(item => {
//     cart.countGoods += item.quantity;
//     cart.amount += item.quantity * item.price;
//   });
// }

app.listen(3000, () => {
  console.log("Server listening at port 3000...");
});
