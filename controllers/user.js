const Home = require("../module/home");
const Favourite = require("../module/favourite");
// exports.userInterface = async (req, res, next) => {
//   // const houses = Home.find();
//   const favHouses = Favourite.find().then(favhouses=>{
   
//     const FavoriteHome = Home.find().then(arr=>{
//       return arr.map(houses=>{
//         return houses._id.toString() == favhouses.HomeId.toString();
//       }).filter(id=>id);
//     })

//     return Promise.all([
      
//       Home.find({ _id: { $in: FavoriteHome } }),
//       Home.find() 
//     ])

//   }).then(([favHouses,houses])=>{
//     console.log(favHouses);
//     console.log(houses);
//     res.render("UserUI", {
//       HousesList: houses,
//       pageTitle: "Welcome To Airbnb",
//       currentPage: "home",
//       house: favHouses,})
//   }).catch(err =>{
//     console.log("An Error occured in showing AddToFavourite and RemoveButton in UserInterface ",err);

//   })
  

   
// };

exports.userInterface = (req,res,next)=>{
  Favourite.find().populate("HomeId").then(favHouses=>{
    const houses = Home.find().then((houses)=>{
       res.render("UserUI", {
            HousesList: houses,
            pageTitle: "Welcome To Airbnb",
            currentPage: "home",
            isLoggedIn: req.session.isLoggedIn,
            house: favHouses,})
        })
      
    })
    
}
exports.FavoriteHome = (req, res, next) => {
  Favourite.find().populate("HomeId").then((favids) => {

      res.render("FavouriteHome", {
        favHouses: favids,
        isLoggedIn: req.session.isLoggedIn,
        pageTitle: "Your Favourite Homes",
        currentPage: "favouritePage",
      });
  });
  
};
exports.handlePostRequest = (req, res, next) => {
  const id = req.body._id;
  const idToBeRemoved = req.body.RemoveHouseIdFromFav;
  if (id) {
    Favourite.create({ HomeId: id }).then(() => {
      res.redirect("/user/favourite");
    }).catch(err =>{
      res.redirect("/user/favourite");
    });
  } else if (idToBeRemoved) {
    Favourite.deleteOne({ HomeId: idToBeRemoved }).then(() => {
      res.redirect("/user");
    });
  }
};
exports.HomeBooking = (req, res, next) => {
  Home.find().then((houses) => {
    res.render("booking", {
      HousesList: houses,
      isLoggedIn: req.session.isLoggedIn,
      pageTitle: "Your Bookings",
      currentPage: "Bookings",
    });
  });
};
exports.HouseDetails = (req, res) => {
  const homeId = req.params.homeId;
  Favourite.find().then((ids) => {
    Home.findById(homeId).then((houseDetails) => {
      const fav = ids.includes(houseDetails);
      res.render("home-detail", {
        pageTitle: "House Details",
        houseDetails: houseDetails,
        currentPage: "None",
        fav: fav,
        isLoggedIn: req.session.isLoggedIn,
      });
    });
  });

};
