import ConnectingBgEng from '../../images/connecting.png';
import ConnectingBgZhCn from '../../images/connecting_cn.png'; //BJ
import ConnectingBgZhCnShanHai from '../../images/connecting_cn.png'; //SH
import ConnectingBgZhCnHongKong from '../../images/connecting_hk.png'; //HK
import ConnectingBgZhTw from '../../images/connecting.png';

import ResultBgEng from '../../images/result.png';
import ResultBgZhCn from '../../images/result_bj.png';
import ResultBgZhCnShanHai from '../../images/result_sh.png';
import ResultBgZhCnHongKong from '../../images/result_hk.png';
import ResultBgZhTw from '../../images/result.png';
import ResultAudioZhCn from '../../res/taxi_ch.mp3';
import ResultAudioZhCnShanHai from '../../res/taxi_ch.mp3';
import ResultAudioZhCnHongKong from '../../res/taxi_ch.mp3';
import ResultAudioZhTw from '../../res/taxi_ch.mp3';

let dicts = {
	'zh-tw': {
		resultBackgroundImg: `url(${ResultBgZhTw})`,
		connectingBackgroundImg: `url(${ConnectingBgZhTw})`,
		resultAudio: `url(${ResultAudioZhTw})`,
	},

	'en-us': {
		resultBackgroundImg: `url(${ResultBgEng})`,
		connectingBackgroundImg: `url(${ConnectingBgEng})`,
		resultAudio: `url(${ResultAudioZhTw})`,
	},

	'zh-CN_BJ': {
		resultBackgroundImg: `url(${ResultBgZhCn})`,
		connectingBackgroundImg: `url(${ConnectingBgZhCn})`,
		resultAudio: `url(${ResultAudioZhCn})`,
	},

	'zh-CN_SH': {
		resultBackgroundImg: `url(${ResultBgZhCnShanHai})`,
		connectingBackgroundImg: `url(${ConnectingBgZhCnShanHai})`,
		resultAudio: `url(${ResultAudioZhCnShanHai})`,
	},

	'zh-CN_HK': {
		resultBackgroundImg: `url(${ResultBgZhCnHongKong})`,
		connectingBackgroundImg: `url(${ConnectingBgZhCnHongKong})`,
		resultAudio: `url(${ResultAudioZhCnHongKong})`,
	}
}

let language = null

function setLanguage(_language) {
	language= _language;
	console.log('-->setLanguage: '+language);
}

function t(key) {
	if(!language) {
		switch(language) {
			case 'zh':
			case 'zh-tw':
			case 'zh-TW':
				language = 'zh-tw';
			break;

			case 'zh-CN':
			case 'zh-cn':
				language = 'zh-CN';
				break;
			
			case 'zh-CN_BJ':
				language = 'zh-CN_BJ';
				break;
			case 'zh-CN_SH':
				language = 'zh-CN_SH';
				break;
			case 'zh-CN_HK':
				language = 'zh-CN_HK';
				break;

			default:
				language = 'en-us';
		}
	}

	return dicts[language][key];
}

function initResource() {
  let _language;
  let _getSetting = localStorage.lang;
  if(!localStorage.lang) {
    _getSetting = prompt('Please Input 1 for BJ, 2 for SH, 3 for HK:');
    localStorage.setItem('lang', _getSetting);
  }

  console.log('did localStorage: '+_getSetting);
  switch(_getSetting) {
    case '1': //BJ
      _language = 'zh-CN_BJ';
      break;
    case '2': //SH
      _language = 'zh-CN_SH';
      break;
    case '3': //HK
      _language = 'zh-CN_HK';
      break;

    default:
      break;
  }
  setLanguage(_language);
}

export default {
	t,
	setLanguage,
	initResource,
};
