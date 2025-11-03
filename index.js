const express = require("express");
const path = require("path");
const crops = require("./data/crops");

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("search",{crops} );
});
app.get("/about", (req, res) => {
  res.render("about" , {pageTitle:"About Section"})} );
// });
app.use(express.urlencoded({ extended: true }));
app.get("/crop" ,(req,res)=>{
  res.render('cropDetails',{crops,pageTitle : "All Crops"});
})

app.post("/crop", (req, res) => {
  console.log(req.body);
  let filteredCrops = crops.filter(crop => {
    return (
      ( crop.state === req.body.state) &&
      ( crop.demandTrend === req.body.trend) &&
      (crop.season === req.body.season) &&
      (crop.grade === req.body.grade)
    );
  });
  console.log(filteredCrops);
  res.render("cropDetails", { crops:filteredCrops , pageTitle:"Applied Filter",filter : req.body });
});

app.use("/" , (req,res)=>{
  res.render("404.ejs");
})


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
