// const House = require("../../module/home");
const Home = require("../../module/home");
const Favourite = require("../../module/favourite");
exports.HostHomeList = (req, res) => {
  Home.find().then((HousesList) => {
    res.render("host_house_list.ejs", {
      pageTitle: "Home List",
      currentPage: "Host-Home",
      isLoggedIn: req.session.isLoggedIn,
      HousesList,
    });
  })
};
exports.handleDeleteHome = (req, res) => {
  const DeleteId = req.params.DeleteId;
  Home.findByIdAndDelete(DeleteId).then((obj) => {
    return Favourite.deleteMany({HomeId:DeleteId}).then(() => {
      res.redirect("/host/host-home-list");
    });
  }).catch(err =>{
    console.log("Error Occured While Deleteing the House "  , err);
  });
};
