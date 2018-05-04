import { Router } from 'express'
import vocabularies from '../json_data/vocabularies.json'
import fse from 'fs-extra'

const router = Router()
const file = 'server/json_data/vocabularies.json'

/* GET vocabularies */
router.get('/vc/list', function (req, res, next) {
  res.json(vocabularies)
})

/* POST add voca*/
router.post('/vc/add', function (req, res, next) {
  if (!req.body) return res.sendStatus(400)
  let vocabulary = req.body.vocabulary
  let objVocabulary = {}
  objVocabulary.id = 10
  objVocabulary.content = vocabulary
  vocabularies.push(objVocabulary)

  fse.outputJson(file, vocabularies, err=>{
  	console.log(err);
  	fse.readJson(file, (err, data) =>{
  		res.json(data);
  	})
  })
})

/* DELETE remove voca */
router.delete('/vc/remove', (req, res, next) =>{
  if (!req.body) return res.sendStatus(400)
  let id = req.body.id
  var index = vocabularies.findIndex(voca => voca.id === id);
  vocabularies.splice(index,1);
  
  fse.outputJson(file, vocabularies, err=>{
  	console.log(err);
  	fse.readJson(file, (err, data) =>{
  		res.json(data);
  	})
  })

})

export default router
