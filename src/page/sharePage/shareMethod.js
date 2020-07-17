import React, { useState } from 'react';
import CanvasPoster from 'react-canvas-poster';

/**
 * article || video_article  横板视频/图文
 * picture 图集
 * competition  pk
 * choice  选项
 * video  视频
 */

const ShareMethod = ({watchShow}) => {
    const [imageUrl, setImageUrl] = useState("");
    const [type, setType] = useState('article')

    let data = {}
    if (type === "article" || type === "video_article") {
        data = {
            width: 335,
            height: 576,
            backgroundColor: 'rgb(242,242,255)',
            views: [
                {
                    type: 'rect',
                    width: 303,
                    height: 471,
                    x: 16,
                    y: 16,
                    paddingLeft: 10,
                    paddingRight: 10,
                    backgroundColor: '#fff'
                },
                {
                    type: 'image',
                    url: require('../../assets/huoying.jpg'), // 远程图片可以使用同域名或直接改为图片地址
                    top: 16,
                    left: 16,
                    width: 303,
                    height: 170,
                },
                {
                    type: 'image',
                    url: require('../../assets/jing.png'),
                    top: 201,
                    left: 32,
                    width: 18,
                    height: 18
                },
                {
                    type: 'text',
                    content: '新冠病毒预防小知识',
                    fontSize: 13.6,
                    color: 'rgb(84,85,255)',
                    textAlign: 'left',
                    top: 205,
                    left: 58,
                    width: 123,
                    lineNum: 1,
                    fontWeight: 600,
                    lineHeight: 20,
                    baseLine: 'top',
                },
                {
                    type: 'text',
                    content: '水利部全国110项在建水利工程已有93项复工',
                    fontSize: 19.9,
                    color: 'rgb(51,51,51)',
                    textAlign: 'left',
                    top: 232,
                    left: 31,
                    width: 273,
                    lineNum: 3,
                    lineHeight: 20,
                    fontWeight: 600,
                    baseLine: 'top',
                },
                {
                    type: 'text',
                    content: '澎湃新闻',
                    fontSize: 14,
                    color: 'rgba(51,51,51,0.7)',
                    textAlign: 'left',
                    top: 300,
                    left: 31,
                    baseLine: 'top'
                },
                {
                    type: 'text',
                    content: '|',
                    fontSize: 12,
                    color: 'rgba(51,51,51,0.7)',
                    textAlign: 'left',
                    top: 300,
                    left: 90,
                    baseLine: 'top'
                },
                {
                    type: 'text',
                    content: '2020-03-15',
                    fontSize: 10.9,
                    color: 'rgba(51,51,51,0.7)',
                    textAlign: 'left',
                    top: 301,
                    left: 97,
                    baseLine: 'top'
                },
                {
                    type: 'text',
                    content: '15日，默写而接受外媒采访时表示，欧洲必须重新定位，以应对中国/美国和俄罗斯这三大全球竞争对手带来的挑战，他还说，尽管我们有其他分歧，但我们与俄罗斯和中国还有这共对手带来的挑战，他还同的利益。',
                    fontSize: 14.5,
                    width: 272,
                    lineHeight: 21.7,
                    textAlign: 'Justify',
                    top: 331,
                    left: 31,
                    lineNum: 10,
                    baseLine: 'top'
                },
                {
                    type: 'image',
                    width: 42,
                    height: 42,
                    url: require('../../assets/fan.png'),
                    top: 508,
                    left: 16
                },
                {
                    type: 'image',
                    width: 47.5,
                    height: 22,
                    url: require('../../assets/fanya.png'),
                    top: 511,
                    left: 70
                },
                {
                    type: 'text',
                    content: '极简咨询 轻松阅读',
                    fontSize: 11,
                    textAlign: 'Justify',
                    color: 'rgba(51,51,51,0.5)',
                    top: 536,
                    left: 70,
                    baseLine: 'top'
                },
                // 二维码
                {
                    type: 'qcode',
                    text: 'https://github.com/whorcare/vue-canvas-poster-yufan',
                    top: 507,
                    left: 272,
                    width: 42,
                    height: 42,
                }
            ]
          };
    } else if (type === "competition") {
        data = {
            width: 335,
            height: 576,
            backgroundColor: 'rgb(242,242,255)',
            views: [
                {
                    type: 'rect',
                    width: 303,
                    height: 471,
                    x: 16,
                    y: 16,
                    paddingLeft: 10,
                    paddingRight: 10,
                    backgroundColor: '#fff'
                },
                {
                    type: 'image',
                    url: require('../../assets/huoying.jpg'), // 远程图片可以使用同域名或直接改为图片地址
                    top: 16,
                    left: 16,
                    width: 303,
                    height: 170,
                },
                {
                    type: 'image',
                    url: require('../../assets/jing.png'),
                    top: 201,
                    left: 32,
                    width: 18,
                    height: 18
                },
                {
                    type: 'text',
                    content: '卫生棉条和卫生巾',
                    fontSize: 13.6,
                    color: 'rgb(84,85,255)',
                    textAlign: 'left',
                    top: 205,
                    left: 58,
                    width: 123,
                    fontWeight: 600,
                    lineNum: 1,
                    lineHeight: 20,
                    baseLine: 'top',
                },
                {
                    type: 'text',
                    content: '2020年很多MM已经用了卫生棉条，你能接受嘛？',
                    fontSize: 19.9,
                    color: 'rgb(51,51,51)',
                    textAlign: 'left',
                    top: 232,
                    left: 31,
                    width: 263,
                    lineNum: 3,
                    lineHeight: 20,
                    fontWeight: 550,
                    baseLine: 'top'
                },
                {
                    type: 'text',
                    content: '247 人已参与',
                    fontSize: 14,
                    color: 'rgba(51,51,51,0.7)',
                    textAlign: 'left',
                    top: 300,
                    left: 31,
                    baseLine: 'top'
                },
                {
                    type: 'image',
                    url: require('../../assets/corrent.png'),
                    top: 335.3,
                    left: 31,
                    width: 138.4,
                    height: 39
                },
                {
                    type: 'text',
                    content: '静观其变',
                    fontSize: 12.6,
                    color: 'rgb(0，0，0)',
                    textAlign: 'left',
                    top: 385,
                    left: 31,
                    baseLine: 'top'
                },
                {
                    type: 'image',
                    url: require('../../assets/uncorrent.png'),
                    top: 335.3,
                    left: 162.3,
                    width: 138.4,
                    height: 39
                },
                {
                    type: 'text',
                    content: '必须买它',
                    fontSize: 12.6,
                    color: 'rgb(0，0，0)',
                    textAlign: 'left',
                    top: 385,
                    left: 248.8,
                    baseLine: 'top'
                },
                {
                    type: 'image',
                    width: 42,
                    height: 42,
                    url: require('../../assets/fan.png'),
                    top: 508,
                    left: 16
                },
                {
                    type: 'image',
                    width: 47.5,
                    height: 22,
                    url: require('../../assets/fanya.png'),
                    top: 511,
                    left: 70
                },
                {
                    type: 'text',
                    content: '极简咨询 轻松阅读',
                    fontSize: 11,
                    textAlign: 'Justify',
                    color: 'rgba(51,51,51,0.5)',
                    top: 536,
                    left: 70,
                    baseLine: 'top'
                },
                // 二维码
                {
                    type: 'qcode',
                    text: 'https://github.com/whorcare/vue-canvas-poster-yufan',
                    top: 507,
                    left: 272,
                    width: 42,
                    height: 42,
                }
            ]
          };
    } else if (type === "video") {
        data = {
            width: 335,
            height: 650,
            backgroundColor: 'rgb(242,242,255)',
            views: [
                {
                    type: 'image',
                    url: require('../../assets/hope.jpg'), // 远程图片可以使用同域名或直接改为图片地址
                    top: 16,
                    left: 16,
                    width: 304,
                    height: 539,
                },
                {
                    type: 'image',
                    url: require('../../assets/jing.png'),
                    top: 416,
                    left: 32,
                    width: 18,
                    height: 18
                },
                {
                    type: 'rect',
                    width: 161,
                    height: 20,
                    x: 31,
                    y: 416,
                    paddingLeft: 10,
                    paddingRight: 10,
                    borderRadius: 18,
                    borderColor: 'red',
                    backgroundColor: 'rgba(84,85,255,0.5)'
                },
                {
                    type: 'text',
                    content: '新冠病毒预防小知识',
                    fontSize: 13.6,
                    color: '#fff',
                    textAlign: 'left',
                    top: 419,
                    left: 58,
                    width: 123,
                    lineNum: 1,
                    fontWeight: 400,
                    lineHeight: 20,
                    baseLine: 'top',
                    fontFamily: '黑体'
                },
                {
                    type: 'text',
                    content: '默克尔：欧洲必须应对三大的对手，但中俄与美国不一样',
                    fontSize: 19.9,
                    color: '#fff',
                    textAlign: 'left',
                    top: 453,
                    left: 31,
                    width: 273,
                    lineNum: 3,
                    lineHeight: 30,
                    fontWeight: 500,
                    baseLine: 'top',
                    fontFamily: '黑体'
                },
                {
                    type: 'text',
                    content: '澎湃新闻',
                    fontSize: 14,
                    color: '#fff',
                    textAlign: 'left',
                    top: 521,
                    left: 31,
                    baseLine: 'top',
                    fontFamily: '黑体'
                },
                {
                    type: 'text',
                    content: '|',
                    fontSize: 12,
                    color: '#fff',
                    textAlign: 'left',
                    top: 521,
                    left: 90,
                    baseLine: 'top'
                },
                {
                    type: 'text',
                    content: '2020-03-15',
                    fontSize: 10.9,
                    color: '#fff',
                    textAlign: 'left',
                    top: 522,
                    left: 97,
                    baseLine: 'top',
                    fontFamily: '黑体'
                },
                {
                    type: 'image',
                    width: 42,
                    height: 46,
                    url: require('../../assets/fan.png'),
                    top: 582,
                    left: 16
                },
                {
                    type: 'image',
                    width: 47,
                    height: 20,
                    url: require('../../assets/fanya.png'),
                    top: 585,
                    left: 70
                },
                {
                    type: 'text',
                    content: '极简咨询 轻松阅读',
                    fontSize: 11,
                    textAlign: 'Justify',
                    color: 'rgba(51,51,51,0.5)',
                    top: 610,
                    left: 70,
                    baseLine: 'top'
                },
                // 二维码
                {
                    type: 'qcode',
                    text: 'https://github.com/whorcare/vue-canvas-poster-yufan',
                    top: 582,
                    left: 272,
                    width: 42,
                    height: 42,
                }
            ]
          };
    }

    const handleCancel = () => {
        watchShow('cancel')
    }

    const handleSuccess = (res) => {
        console.log(res)
        setImageUrl(res)
    }

    return (
        <div className="sharePage">
            <div>
                <CanvasPoster drawData={data} success={handleSuccess} />
                {
                    imageUrl !== '' ? <img className="poster" src={imageUrl} alt="cover" /> : null 
                }
            </div>
            <div className="shareBottom">
                <ul className="shareBtn">
                    <li>
                        <img className="cover" src="https://mat1.gtimg.com/bbs/crystal/images/haibao.png" alt="cover" />
                        <span>生成海报</span>
                    </li>
                    <li>
                        <img className="cover" src="https://mat1.gtimg.com/bbs/crystal/images/weixin.png" alt="cover" />
                        <span>微信</span>
                    </li>
                    <li>
                        <img className="cover" src="https://mat1.gtimg.com/bbs/crystal/images/qq.png" alt="cover" />
                        <span>QQ</span>
                    </li>
                    <li>
                        <img className="cover" src="https://mat1.gtimg.com/bbs/crystal/images/friend.png" alt="cover" />
                        <span>朋友圈</span>
                    </li>
                </ul>
                <div onClick={handleCancel} className="cancel">取消</div>
            </div>
        </div>
    )
}

export default ShareMethod;