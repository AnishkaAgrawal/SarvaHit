const House = require("../../module/home");
const Home = require("../../module/home");
const Editing = false;
exports.handlegetRequest = (req, res, next) => {
  res.render("BookHouseHost", {
    pageTitle: "House Rent Details",
    currentPage: "addHome",
    isLoggedIn: req.session.isLoggedIn,
    editing: false,
    house: undefined,
  });
};

exports.handlePostRequest = (req, res, next) => {
  const { housename, price, location, rating, houseImg, description,_id } =
    req.body;
    Home.findById(_id).then((house)=>{
    if(!house){
      Home.create({
        houseName : housename,
        price,
        location,
        rating,
        houseImg,
        description
      }).then(() => {
          res.render("SubmitFormDetails", {
            pageTitle: "Submission Page",
            currentPage: "addHome",
            isLoggedIn: req.session.isLoggedIn,
          });
        });
   
    }else{
      house.housename=housename;
      house.price=price;
      house.location=location;
      house.rating=rating;
      house.houseImg=houseImg;
      house.description=description;
    }
    }).then(()=>{
      res.render("SubmitFormDetails", {
        pageTitle: "Submission Page",
        currentPage: "addHome",
        isLoggedIn: req.session.isLoggedIn,
      });
    })
  };

exports.handleEditHome = (req, res) => {
  const EditId = req.params.EditId;
  const edit = req.query.editing;
  Home.findById(EditId).then((house) => {
    if (!house) {
      res.redirect("/host/host-home-list");
    } else {
      res.render("BookHouseHost", {
        pageTitle: "Edit Home",
        isLoggedIn: req.session.isLoggedIn,
        currentPage: "addHome",
        // isLoggedIn: req.isLoggedIn,
        editing: true,
        house: house,
      });
    }
  });
};
