module.exports = {
  webpack: (config, options, webpack) => {
  	// 엔트리의 시작점, 반드시 config 리턴
    config.entry.main = './server/index.js'
        return config
    }
}

/**
* backpack
* node.js를 위한 최소한의 빌드 시스템
* 모든 파일 감시, 실시간 리로딩, 이동, 번들링(파일을 모아서 하나로 만드는 것) 역할 담당
*
* npm i backpack-core --save
* defaults : src/index.js : 엔트리
* 사용자 정의 설정- 프로젝트의 루트에 backpack.config.js 파일 생성
*/