export const seedData = {
  users: {
    _model: "User",
    homer: {
      firstName: "Homer",
      lastName: "Simpson",
      email: "homer@simpson.com",
      //password: "secret"
      password: "$2a$10$h0xPPPoPcJ9zlKRZW28n4.h/31HutKbOLXId3cXVJ9X0dJf2EGJga"
    },
    marge: {
      firstName: "Marge",
      lastName: "Simpson",
      email: "marge@simpson.com",
      //password: "secret"
      password: "$2a$10$jmnbmMwXMT0X/wxII9TsoeKSRYu4ec.ZIN/1byuBNXr2ErqyTpjdW"
    },
    aby: {
      firstName: "Aby",
      lastName: "Aby",
      email: "aby@aby.com",
      //password: "secret"
      password: "$2a$10$14iRRu/dszBIqf5NFW1ErufJ5G4rKG37tmgfXPk4SWriU3x.D.3lS"
    }
  },
  categories: {
    _model: "Category",
    rivers: {
      title: "Rivers",
      userid: "->users.aby"
    }
  },
  placemarks: {
    _model : "Placemark",
    placemark_1 : {
      name: "Lee",
      location: "Dublin",
      analytics: 115,
      description: nice place,
      categoryid: "->categories.rivers"
    },
    placemark_2 : {
      name: "Suir",
      location: "Waterford",
      analytics: 234,
      description: nice place1,
      categoryid: "->categories.rivers"
    },
    placemark_3 : {
      name: "Duro",
      location: "Cork",
      analytics: 135,
      description: nice place,
      categoryid: "->categories.rivers"
    }
  }
};
