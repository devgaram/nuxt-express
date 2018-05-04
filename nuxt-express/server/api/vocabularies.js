import { Router } from 'express'
import VocaModel from '../models/vocabularies'

const router = Router()

/* GET vocabularies */
router.get('/list', function (req, res, next) {

  VocaModel.find(function(err, vocabularies){
    if (err) return res.status(500).send({error:'database failure'});
    res.json(vocabularies)
  }) 
})

/* POST vocabularies */
router.post('/insert', function (req, res, next) {
  if (!req.body) return res.sendStatus(400)
  let vocabulary = req.body.vocabulary
  
  let Voca = new VocaModel();
  Voca.content = vocabulary;


  Voca.save(function(err){
    if (err) return res.status(500).send({error:'database failure'});
    VocaModel.find(function(err, vocabularies){
      if (err) return res.status(500).send({error:'database failure'});
      res.json(vocabularies)
    }) 
  }) 
})

/* DELETE vocabularies */
router.delete('/delete', function (req, res, next) {
  if (!req.body) return res.sendStatus(400)
  let id = req.body.id
  
  VocaModel.remove({_id: id}, function(err, output){
    if (err) return res.status(500).send({error:'database failure'});
    VocaModel.find(function(err, vocabularies){
      if (err) return res.status(500).send({error:'database failure'});
      res.json(vocabularies)
    }) 
  })

})



export default router
