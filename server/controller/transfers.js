import express from "express";
import db from '../database/connect.js'


const Router = express.Router()



Router.post('/', async (req, res) => {
   try {
      await db.Transfers.create(req.body)
      res.send('Lesos isssaugotos')
   } catch (error) {
      console.log(error)
      res.status(500).send('ivyko serverio klaida')
   }
})


export default Router