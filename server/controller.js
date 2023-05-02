let houses = require("./db.json")

houseID = 4

const getHouses = (req, res) => {
    res.status(200).send(houses)
}

const createHouse = (req, res) => {
  const {address, price, imageURL} = req.body
  if (!address || !price || !imageURL) {
    res.status(400).send("Houses need an address, price and image URL")
  } else {
  let newHouse = {
    address,
    price,
    imageURL,
    id: houseID
  }

  houses.push(newHouse)
  res.status(200).send(houses)
  houseID++
}
}
const updateHouse = (req, res) => {
   const {id} = req.params
   const {type} = req.body 
   let index = houses.findIndex(house => house.id === +id)
   if (type === "plus") {
    houses[index].price += 10000
    res.status(200).send(houses)
   } else if(type === "minus") {
    houses[index].price -= 10000
    res.status(200).send(houses)
   } else {
    res.status(400).send("No price changed")
   }

}

const deleteHouse = (req, res) => {
   const {id} = req.params
   let index = houses.findIndex(house => 
    house.id === id)
    houses.splice(index, 1)
    res.status(200).send(houses) 
}
module.exports = {getHouses, createHouse, updateHouse, deleteHouse}