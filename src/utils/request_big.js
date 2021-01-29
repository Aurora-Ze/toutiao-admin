import axios from 'axios'
import JSONbig from 'json-bigint'

const bigRequest = axios.create({
	baseURL: 'http://api-toutiao-web.itheima.net',// 请求的基础路径
	transformResponse: [function(data) {
		try{
			console.log(JOSNbig.parse(data))
			return JOSNbig.parse(data)
		}catch(err){
			return data
		}
		
	}]
})

export default bigRequest