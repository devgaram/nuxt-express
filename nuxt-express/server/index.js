// express = require('express')
import express from 'express'
import { Nuxt, Builder } from 'nuxt'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'

import api from './api'

const app = express()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

app.set('port', port)

//body-parser 
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


// Import API Routes
app.use('/api', api)

// CONNECT TO MONGODB SERVER
let db = mongoose.connection;
db.on('error', console.error);
db.once('open', ()=>{
	//CONNECTED TO MONGODB SERVER
	console.log("connected to mongod server");
})
mongoose.connect('mongodb://localhost/db_voca');

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')

// 기본값은 개발모드, 배포모드 시 개발모드 off
config.dev = !(process.env.NODE_ENV === 'production')

/**
* nuxt.js를 미들웨어로 사용(애플리케이션 레벨 유형?)
* 애플리케이션 전체 영역에서 처리가능
* 앱에 대한 request. 발생 때마다 실행
* 미들웨어
* - 구조 내에서 중간 처리를 위한 함수
* - 최종 요청 핸들러 이전의 express 라우팅 계층에 의해 호출되는 함수
* - request-response 응답을 주기로 종료
* - 우선순위) 먼저 로드되는 미들웨어 함수가 먼저 실행
*/

// Init Nuxt.js
const nuxt = new Nuxt(config)

// Build only in dev mode
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}

/**
* nuxt 미들웨어 함수를 로드하는 부분
* request 발생시& 모든 라우팅, nuxt로 렌더링
* nuxt.render(req,res)
*/

// Give nuxt middleware to express
app.use(nuxt.render)

// Listen the server
app.listen(port, host)
console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console
