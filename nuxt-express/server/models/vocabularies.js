/*
	model은 데이터베이스에서 데이터를 읽고, 생성, 수정하는 프로그래밍 인터페이스를 정의한다.
*/
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let vocaSchema = new Schema({
	content: String
});

module.exports = mongoose.model('Vocabulary', vocaSchema);

/*
 첫번째 인자 : 'voca'는 document가 사용할 collection의 단수적 표현.
 즉, 'Vocabularies' 컬렉션을 사용
*/