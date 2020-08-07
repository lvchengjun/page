import React, { useEffect, useState, Fragment } from 'react';
import { callMethod, domain } from '../../util/api';
import md5 from 'js-md5';
// import { ShareWraper } from './Emotion'
import './index.less';
import { message, Radio } from 'antd';
import VidoePlayer from '../posterVideo';


/**
 * article type
 * 1.news 文章 (目前article)
 * 2.video 短视频
 * 3.cover 大图
 * 4.tiny-video 小视频
 * 5.vote 投票
 */

const SharePage = () => {
  const [article, setArticle] = useState({});
  const [type, setType] = useState();
  const [visible,setVisible] = useState(false); // 小视频是否显示播放页
  const [videoStatue,setStatus] = useState(false); // 视频是否显示播放页
  const [choiceNum, setChoiceNum] = useState()
  const [choice, setChoice] = useState([])
  const [voteNum] = useState(true); // 投票次数是否显示 两条选项
  const [agreeChecked, setCheck] = useState(true) // 正方是否已经投票 两条选项
  const [fanChecked, setChecked] = useState(true) // 反方是否已经投票 两条选项
  const [voteStatus, setVoteStatus] = useState(false) // 四条选项投票状态
  const [isOverdue, setOverdue] = useState(false)  // 投票是否过期
  const [choiceCheck, setChoiceChecked] = useState() // 选中哪条(四项)

  let handleInit;
  let getPhoneType;
  const userId = '72e85b29c638ed33';  // 用户id
  let voteId = "1596768605963";  // 投票id
  let posterId = "1596768605963"; // 当前用户进入的文章id

  useEffect(() => {
    handleInit()
  }, [handleInit])

  useEffect(() => {
    getPhoneType()
  }, [getPhoneType, isOverdue])

  getPhoneType = () => {
    let ua = navigator.userAgent.toLowerCase()
    console.log(ua,'当前机型')
    return ua.includes('iphone') ? 'ios' : 'android'
  }

  handleInit = async () => {
    // let userId = "72e85b29c638ed33";
    let voteList;
    let timestamp = Date.now().toString().substr(0, 10);
    let sign = md5(`fanya_${userId}_${timestamp}`);

    // 分享页所传参数 articleId:1596613962397 1596614932558 1596607964007
    let data = {
      posterId: posterId,
      base: {
          IsLogin: true,
          LoginType: "wechat",
          LoginTime: "2020-07-15 16: 33: 09",
          userId: userId,
          appVersion: "1.0.0.0",
          devicePlatform: "android_8.0.0",
          DeviceModel: "MI 6",
          ts: Number(timestamp),
          signature: sign
      }
    }
    const d = await callMethod('post', domain, `/api/v1/content/detailPage`, data).then(res => {
      if (res.status.code === 0 && res.data) {
        let data, allCount;
        if (res.data.type === "video") {
          data = res.data;
          data.type = "video";
          setType('video')
          setArticle(data)
        } else if (res.data.type === "news") {
          data = res.data;
          data["type"] = "news";
          setType('news')
          setArticle(data)
        } else if (res.data.type === "tiny-video") {
          data = res.data;
          data["type"] = "tiny-video";
          setType('tiny-video')
          setArticle(data)
        } else if (res.data.type === "cover") {
          data = res.data;
          data["type"] = "cover";
          setType('cover')
          setArticle(data)
        } else if (res.data.type === "vote") {
          data = res.data;
          let list = data.vote.voteChoice;
          setChoice(list)
          // 判断投票是否过期
          if (data.vote.overdue === "") {
            setOverdue(false)
          } else {
            const min = new Date(data.vote.overdue).getTime() - new Date().getTime()
            if (min > 0) {
              setOverdue(false)
            } else {
              setOverdue(true)
            }
          }
          data['type'] = 'vote';
          setType('vote')
          setArticle(data);
          setChoiceNum(data.vote.choiceCount)
          voteList = data.vote.voteChoice;
          allCount = data.vote.voteResultCount;
          return [voteList, allCount];
        }
      } else {
        message.error('网络存在问题，请重新进入')
      }
    })
    return d;
  }

  const handleClick = () => {
    console.log(8888)
    setVisible(true)
  }

  const handleOpenVideo = () => {
    setStatus(true)
  }

  const handleOpen = () => {
    console.log(99999)
  }

  // 四项投票
  const handleChange = e => {
    console.log(e.target.value)
    const choice = e.target.value;
    console.log(choice, typeof(choice))
    const timestamp = Date.now().toString().substr(0, 10);
    const sign = md5(`fanya_${userId}_${timestamp}`);

    const param = {
      voteId: voteId,
      choiceId: choice,
      base: {
          IsLogin: true,
          LoginType: "wechat",
          LoginTime: "2020-07-15 16: 33: 09",
          userId: userId,
          appVersion: "1.0.0.0",
          devicePlatform: "android_8.0.0",
          DeviceModel: "MI 6",
          ts: Number(timestamp),
          signature: sign
      }
    }
    callMethod('post', domain, `/api/v1/vote`, param).then(async res => {
      if (res.data.code === 0) {
        const data = await handleInit()
        console.log(data)
        const list = data[0];
        const count = data[1];
        setVoteStatus(true)
        setChoiceChecked(choice)
        console.log(choice, 'first')
        animation(list[1].count, count)
        secAnimation(list[3].count, count)
        thirdAnimation(list[0].count, count)
        foreAnimation(list[2].count, count)
      }
    })
  }

  // 投票(double) type: 无文章摘要  abstractType
  const handleVote = (type, abstractType) =>{
    console.log(type, 11, abstractType)
    const timestamp = Date.now().toString().substr(0, 10);
    const sign = md5(`fanya_${userId}_${timestamp}`);
    const param = {
      voteId: voteId,
      base: {
          IsLogin: true,
          LoginType: "wechat",
          LoginTime: "2020-07-15 16: 33: 09",
          userId: userId,
          appVersion: "1.0.0.0",
          devicePlatform: "android_8.0.0",
          DeviceModel: "MI 6",
          ts: Number(timestamp),
          signature: sign
      }
    }
    if (type !== '') {
      console.log(9999)
      if (type === '0') {
        param.choiceId = type
        callMethod('post', domain, `/api/v1/vote`, param).then(res => {
          if (res.data && res.data.code === 0) {
            setChecked(false)
            setCheck(false)
            handleInit()
          }
        })
      } else {
        param.choiceId = type
        callMethod('post', domain, `/api/v1/vote`, param).then(res => {
          if (res.data && res.data.code === 0) {
            setChecked(false)
            setCheck(false)
            handleInit()
          }
        })
      }
    } else {
      console.log(9999888888)
      if (abstractType === '1') {
        param.choiceId = abstractType
        callMethod('post', domain, `/api/v1/vote`, param).then(res => {
          if (res.data && res.data.code === 0) {
            setChecked(false)
            setCheck(false)
            handleInit()
          }
        })
      } else {
        param.choiceId = abstractType
        callMethod('post', domain, `/api/v1/vote`, param).then(res => {
          if (res.data && res.data.code === 0) {
            setChecked(false)
            setCheck(false)
            handleInit()
          }
        })
      }
    }
  }
  const animation = (count, result) => {
    const dom = document.querySelector('.first');
    // 投票比例
    const pre = count/result*100 + '%'
    const style = document.styleSheets[5];
    dom.style.animation = 'demo 5s';
    dom.style.animationFillMode = 'forwards';
    style.insertRule(`@keyframes demo {from{width: 0}to{width: ${pre}}}`, 117)
  }

  const secAnimation = (count, result) => {
    const pre = count/result*100 + '%'
    const dom = document.querySelector('.second');
    const style = document.styleSheets[5];
    dom.style.animation = 'second 5s';
    dom.style.animationFillMode = 'forwards';
    style.insertRule(`@keyframes second {from{width: 0px}to{width: ${pre}}}`, 118)
  }
  const thirdAnimation = (count, result) => {
    console.log(count, 'third', result)
    const pre = count/result*100 + '%'
    const dom = document.querySelector('.third');
    const style = document.styleSheets[5];
    dom.style.animation = 'third 5s';
    dom.style.animationFillMode = 'forwards';
    style.insertRule(`@keyframes third {from{width: 0px}to{width: ${pre}}}`, 119)
  }
  const foreAnimation = (count, result) => {
    console.log(count, 'fore')
    const pre = count/result*100 + '%'
    console.log(pre)
    const dom = document.querySelector('.fore');
    const style = document.styleSheets[5];
    dom.style.animation = 'fore 5s';
    dom.style.animationFillMode = 'forwards';
    style.insertRule(`@keyframes fore {from{width: 0px}to{width: ${pre}}}`, 120)
  }

  const closeVideo = (status) => {
    console.log(status)
    if (status) {
      setVisible(false)
    }
  }

  const closeArticleVideo = (status) => {
    console.log(status)
    if (status) {
      setStatus(false)
    }
  }



  return (
    <div className="shareWraper">
      <div className="share">
        <div className="shareHead">
          <div className="headLeft">
            <img src="https://mat1.gtimg.com/bbs/crystal/images/fan.png" alt="fan" className="fan" />
            <ul>
              <li><img src="https://mat1.gtimg.com/bbs/crystal/images/fanya.png" alt="fanya" /></li>
              <li>极简资讯    轻快阅读</li>
            </ul>
          </div>
          <div className="openBtn" onClick={handleOpen}>打开</div>
        </div>
        <div className="shareContent">
          {
            type === "video" || type === "news" ? (
              <Fragment>
                <div className="view">
                  {
                    type === "video" ? (
                      <div className="articlePlay" onClick={handleOpenVideo}>
                        {
                          !videoStatue? (
                            <>
                              <img className="videoCover" src={article.poster && article.poster.cover} alt="cover" />
                              <img src="https://mat1.gtimg.com/bbs/crystal/images/play.png" alt="video" />
                            </>
                          ) : (
                            <VidoePlayer hiddenVideo={closeArticleVideo} />
                          )
                        }
                      </div>
                    ) : (
                      <p className="viewCover">
                        <img src={article.poster && article.poster.cover} alt="cover" />
                      </p>
                    )
                  }
                </div>
                <p className="remind">
                  <img src="https://mat1.gtimg.com/bbs/crystal/images/jing.png" alt="logo" />
                  <span>{article.poster && article.poster.tags}</span>
                </p>
                <p className="articleTitle">{article.poster && article.poster.title}</p>
                <div className="articleSource">
                  <ul>
                    <li>{article.poster && article.poster.creator}</li>
                    <li>|</li>
                    <li>{article.poster && article.poster.pubtime}</li>
                  </ul>
                </div>
                <div className="contents">{article.poster && article.poster.abstract}</div>
              </Fragment>
            ) : null
          }
          {
            type === "tiny-video" || type === "cover" ? (
              <Fragment>
                <div className="viewVideo">
                  {
                    visible ? (
                      <VidoePlayer hiddenVideo={closeVideo} />
                    ) : (
                      <>
                        <div className="mark"></div>
                        <p className="coverImage">
                          <img src={article.poster && article.poster.cover} alt="cover" />
                        </p>
                        {
                          type === "tiny-video"? (
                            <p className="viewPlay" onClick={handleClick}>
                              <img src="https://mat1.gtimg.com/bbs/crystal/images/play.png" alt="video" />
                            </p>
                          ) : <div className="viewPlay"></div>
                        }
                        <p className="remindVideo">
                          <img src="https://mat1.gtimg.com/bbs/crystal/images/jing.png" alt="logo" />
                          <span>{article.poster && article.poster.tags}</span>
                        </p>
                        <p className="title">{article.poster && article.poster.title}</p>
                        <div className="source">
                          <ul>
                            <li>{article.poster && article.poster.source}</li>
                            <li>|</li>
                            <li>{article.poster && article.poster.pubtime}</li>
                          </ul>
                        </div>
                      </>
                    )
                  }
                </div>
              </Fragment>
            ) : null
          }
          {
            type === "vote" && choiceNum === 2 && article.poster && article.poster.abstract === "" ? (
              <Fragment>
                <div className="voteView">
                  <p className="remindVote">
                    <img src="https://mat1.gtimg.com/bbs/crystal/images/jing.png" alt="logo" />
                    <span>{article.poster && article.poster.tags}</span>
                  </p>
                  <p className="voteTitle">{article.vote && article.vote.title}</p>
                  <div className="voteSource">
                    <ul>
                      <li>{article.vote && article.vote.voteResultCount}人参与</li>
                      {
                        isOverdue ? <li className="overdue">已结束</li> : <li className="ongoing">进行中</li>
                      }
                    </ul>
                  </div>
                  <div className="dabuleChoice">
                    <div className="vote">
                      {
                        agreeChecked? (
                          <p onClick={() => handleVote(choice[0].choiceId)}>
                            <img src="https://mat1.gtimg.com/bbs/crystal/images/voteres.png" alt="zheng" />
                          </p>
                        ) : (
                          <p style={{background: 'rgba(255, 84, 120, 0.4)'}}>
                            <img src="https://mat1.gtimg.com/bbs/crystal/images/zheng.png" alt="zheng" />
                          </p>
                        )
                      }
                      <p>
                        <img src="https://mat1.gtimg.com/bbs/crystal/vs.png" alt="vs" />
                      </p>
                      {
                        fanChecked? (
                          <p onClick={() => handleVote(choice[1].choiceId)}>
                            <img src="https://mat1.gtimg.com/bbs/crystal/images/voteno.png" alt="fan" />
                          </p>
                        ) : (
                          <p style={{background: 'rgba(98,132,255,0.4)'}}>
                            <img src="https://mat1.gtimg.com/bbs/crystal/images/fanmian.png" alt="fan" />
                          </p>
                        )
                      }
                    </div>
                    <div className="checked">
                      {
                        choice && choice[0].count === 0 && choice[1].count === 0?(
                          <div className="voteLeft">
                            <p className="checkedLeft" style={{width: 50 + '%'}}></p>
                            <p className="checkedRight" style={{width: 50 + '%'}}></p>
                          </div>
                        ) : (
                          <div className="voteLeft">
                            <p className="checkedLeft" style={{width: (choice[0].count/ article.vote.voteResultCount) * 100 + '%'}}></p>
                            <p className="checkedRight" style={{width: (choice[1].count)/article.vote.voteResultCount * 100 + '%'}}></p>
                          </div>
                        )
                      }
                      {
                        voteNum ? (
                          <div className="votePeople">
                            <span className="voteNumz">{choice && choice[0].count}</span>
                            <span className="voteNumf">{choice && choice[1].count}</span>
                          </div>
                        ) : null
                      }
                      <div className="voteRight" style={voteNum? {marginTop: -12} : {marginTop: 6}}>
                        <span>{choice[0].choiceOption}</span>
                        <span>{choice[1].choiceOption}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Fragment>
            ) : null
          }
          {
            type === "vote" && choiceNum === 2 && article.poster && article.poster.abstract !== ""? (
                <Fragment>
                <div className="voteView">
                  <p className="remindVote">
                    <img src="https://mat1.gtimg.com/bbs/crystal/images/jing.png" alt="logo" />
                    <span>{article.poster && article.poster.tags}</span>
                  </p>
                  <p className="voteTitle">{article.poster.title}</p>
                  <p className="voteAbstract">{article.poster.abstract}</p>
                  <p className="voteAbstractTitle">{article.vote && article.vote.title}</p>
                  <div className="abstractChoice">
                    <div className="abstractVote">
                      {
                        agreeChecked? (
                          <p onClick={() => handleVote('',choice[0].choiceId)}>
                            <img src="https://mat1.gtimg.com/bbs/crystal/images/voteres.png" alt="agree" />
                          </p>
                        ) : (
                          <p style={{background: 'rgba(255, 84, 120, 0.4)'}}>
                            <img src="https://mat1.gtimg.com/bbs/crystal/images/zheng.png" alt="agree" />
                          </p>
                        )
                      }
                      {
                        fanChecked? (
                          <p onClick={() => handleVote('',choice[1].choiceId)}>
                            <img src="https://mat1.gtimg.com/bbs/crystal/images/voteno.png" alt="fan" />
                          </p>
                        ) : (
                          <p style={{background: 'rgba(98,132,255,0.4)'}}>
                            <img src="https://mat1.gtimg.com/bbs/crystal/images/fanmian.png" alt="fan" />
                          </p>
                        )
                      }
                    </div>
                    <div className="checked">
                      {
                        choice && choice[0].count === 0 && choice[1].count === 0?(
                          <div className="voteAbstractLeft">
                            <p className="checkedLeft" style={{width: 50 + '%'}}></p>
                            <p className="checkedRight" style={{width: 50 + '%'}}></p>
                          </div>
                        ) : (
                          <div className="voteAbstractLeft">
                            <p className="checkedLeft" style={{width: (choice[0].count/ article.vote.voteResultCount) * 100 + '%'}}></p>
                            <p className="checkedRight" style={{width: (choice[1].count/ article.vote.voteResultCount) * 100 + '%'}}></p>
                          </div>
                        )
                      }
                      {
                        voteNum ? (
                          <div className="voteAbstractPeople">
                            <span className="voteNumz">{choice && choice[0].count}</span>
                            <span className="voteNumf">{choice && choice[1].count}</span>
                          </div>
                        ) : null
                      }
                      <div className="voteRight" style={voteNum? {marginTop: -12} : {marginTop: 6}}>
                        <span>{choice[0].choiceOption}</span>
                        <span>{choice[1].choiceOption}</span>
                      </div>
                    </div>
                  </div>
                  <div className="voteAbstractSource">
                    <ul>
                      <li>{article.vote && article.vote.voteResultCount}人参与</li>
                      {
                        isOverdue ? <li className="overdue">已结束</li> : <li className="ongoing">进行中</li>
                      }
                    </ul>
                  </div>
                </div>
              </Fragment>
            ) : null
          }
          {
            type === 'vote' && choiceNum === 4 ? (
              <Fragment>
                <div className="voteChoiceView">
                  <p className="remindVote">
                    <img src="https://mat1.gtimg.com/bbs/crystal/images/jing.png" alt="logo" />
                    <span>{article.vote && article.vote.tags}</span>
                  </p>
                  <p className="voteTitle">{article.title}</p>
                  <p className="abstract">{article.abstract}</p>
                  {
                    !isOverdue? (
                      <>
                        {
                          !voteStatus ? (
                            <div className="selectChoice">
                              <p>{article.vote && article.vote.title}</p>
                              <Radio.Group buttonStyle="solid" onChange={handleChange}>
                                <Radio.Button value={choice && choice[1].choiceId}>{choice && choice[1].choiceOption}</Radio.Button>
                                <Radio.Button value={choice && choice[3].choiceId}>{choice && choice[3].choiceOption}</Radio.Button>
                                <Radio.Button value={choice && choice[0].choiceId}>{choice && choice[0].choiceOption}</Radio.Button>
                                <Radio.Button value={choice && choice[2].choiceId}>{choice && choice[2].choiceOption}</Radio.Button>
                              </Radio.Group>
                            </div>
                          ) : (
                            <div className="selectChoiceSuccess">
                              <p>{article.vote && article.vote.title}</p>
                              <ul>
                                <div><li className="first" style={choiceCheck === '0'? { background: 'rgb(84,85,255)', color: '#cebfbf'}: {background: 'rgb(231,231,255)'}}><span className="first">{choice && choice[1].choiceOption}</span><span className="voteResult">{choice && choice[1].count}</span></li></div>
                                <div><li className="second" style={choiceCheck === '1'? { background: 'rgb(84,85,255)', color: '#cebfbf'}: {background: 'rgb(231,231,255)'}}><span className="first">{choice && choice[3].choiceOption}</span><span className="voteResult">{choice && choice[3].count}</span></li></div>
                                <div><li className="third" style={choiceCheck === '2'? { background: 'rgb(84,85,255)', color: '#cebfbf'}: {background: 'rgb(231,231,255)'}}><span className="first">{choice && choice[0].choiceOption}</span><span className="voteResult">{choice && choice[0].count}</span></li></div>
                                <div><li className="fore" style={choiceCheck === '3'? { background: 'rgb(84,85,255)', color: '#cebfbf'}: {background: 'rgb(231,231,255)'}}><span className="first">{choice && choice[2].choiceOption}</span><span className="voteResult">{choice && choice[2].count}</span></li></div>
                              </ul>
                            </div>
                          )
                        }
                      </>
                    ) : (
                      <div className="selectOverdue">
                        <p>{article.vote && article.vote.title}</p>
                        <ul>
                          <div><li  style={choice[1].count > 0 && article.vote? {width: choice[1].count/article.vote.voteResultCount*100+'%', background: 'rgb(238,238,238)'}: {}}>{choice && choice[1].choiceOption}<span>{choice && choice[1].count}</span></li></div>
                          <div><li style={choice[3].count > 0 && article.vote ? {width: choice[3].count/article.vote.voteResultCount*100+'%', background: 'rgb(238,238,238)'}: {}}>{choice && choice[3].choiceOption}<span>{choice && choice[3].count}</span></li></div>
                          <div><li style={choice[0].count > 0 && article.vote ? {width: choice[0].count/article.vote.voteResultCount*100+'%', background: 'rgb(238,238,238)'}: {}}>{choice && choice[0].choiceOption}<span>{choice && choice[0].count}</span></li></div>
                          <div><li style={choice[2].count > 0 && article.vote ? {width: choice[2].count/article.vote.voteResultCount*100+'%', background: 'rgb(238,238,238)'}: {}}>{choice && choice[2].choiceOption}<span>{choice && choice[2].count}</span></li></div>
                        </ul>
                      </div>
                    )
                  }
                  <div className="voteSource">
                    <ul>
                      <li>{article.vote && article.vote.voteResultCount}人参与</li>
                      {
                        isOverdue ? <li className="overdue">已结束</li> : <li className="ongoing">进行中</li>
                      }
                    </ul>
                  </div>
                </div>
              </Fragment>
            ) : null
          }
        </div>
      </div>
    </div>
  )
}

export default SharePage;
