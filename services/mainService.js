const getMain = (req, res) => {
  res.send({
    apiName: "B2W Star Wars API",
    createIn: new Date("2019-04-25T00:00:000"),
    creator: "Vinícius Menezes"
  });
};

exports.getMain = getMain;
