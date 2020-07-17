import React, { useEffect, useState, Fragment } from 'react';
import { callApi, callMethod, domain } from '../../util/api';
import md5 from 'js-md5';
// import { ShareWraper } from './Emotion'
import './index.less';
import { message, Radio } from 'antd';
import { Player } from 'video-react';


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
  const [type, setType] = useState("vote");
  const [visible,setVisible] = useState(false);
  const [plays, setPlays] = useState({});
  const [player,setPlayer] = useState({});
  const [choiceNum, setChoice] = useState(2)
  const [voteNum, setShow] = useState(true); // 投票次数是否显示 两条选项
  const [zhengChecked, setCheck] = useState(true) // 正方是否已经投票 两条选项
  const [fanChecked, setChecked] = useState(true) // 反方是否已经投票 两条选项
  const [voteStatus, setVoteStatus] = useState(false) // 四条选项投票状态
  const [isChecked, setIsChecked] = useState(false)  // 是否被选中
  const [isOverdue, setOverdue] = useState(true)  // 投票是否过期
  const [choicePeople, setChoicePeople] = useState([100, 200, 500, 50]) // 选项条目

  let handleInit;
  let handlePlayer;
  let getPhoneType;

  useEffect(() => {
    handleInit()
  }, [handleInit])

  useEffect(() => {
    if (Object.keys(player).length !== 0) {
      player.subscribeToStateChange(handlePlayer)
      setTimeout(() => {
        if (plays && plays.ended) {
          setVisible(false)
        }
      }, 5000)
    }
  }, [plays, player, handlePlayer])

  useEffect(() => {
    getPhoneType()
  }, [getPhoneType])

  getPhoneType = () => {
    let ua = navigator.userAgent.toLowerCase()
    console.log(ua,'当前机型')
    return ua.includes('iphone') ? 'ios' : 'android'
  }

  handlePlayer = (state) => {
    if (state && state.subscribeToStateChange) {
      setPlayer(state)
    }
    setPlays(state)
  }

  handleInit = () => {
    let userId = "";
    let timestamp = Date.now().toString().substr(0, 10);
    let sign = md5(`fanya_${userId}_${timestamp}`);
    let param = {contentId: 'c9d1db409dca443f', articleId : 'c9d1db409dca443f'};
    param.base = {
      DeviceModel: "",
      IsLogin: false,
      LoginTime: "",
      LoginType: "",
      appVersion: "",
      devicePlatform: "web_share",
      signature: sign,
      ts: timestamp,
      userId: userId
    }
    let data = {
      voteId: 12,
      subVoteId: 22,
      userId: "u0001",
      articleId: "20200701A0EXCM00",
      base: {
        userId: "u0001"
      },
      shareText: "this is a shareText"
    }
    callMethod('post', domain, `/api/v1/content/detailPageNew`, data).then()
    callApi('post', domain, `/v1/content/detailPage`, param).then(res => {
      if (res.status.code === 0 && res.data) {
        if (res.data.type === "video") {
          let data = res.data.video;
          data.type = "video";
          setType('video')
          setArticle(data)
        } else if (res.data.type === "article") {
          let data = res.data.article;
          data["type"] = "article";
          // setType('article')
          setArticle(data)
        } else if (res.data.type === "tiny-video") {
          let data = res.data.cover;
          data["type"] = "tiny-video";
          setType('tiny-video')
          setArticle(data)
        } else if (res.data.type === "cover") {
          let data = res.data.cover;
          data["type"] = "cover";
          setType('cover')
          setArticle(data)
        } else if (res.data.type === "vote") {
          let data = res.data.vote;
          data['type'] = 'vote';
          setType('vote')
          setArticle(data);
        }
      } else {
        message.error('网络存在问题，请重新进入')
      }
    })
  }

  const handleClick = () => {
    console.log(8888)
    setVisible(true)
  }

  const handleOpen = () => {
    console.log(99999)
  }

  const handleChange = e => {
    console.log(e.target.value)
    setVoteStatus(true)
    setIsChecked(true)
  }

  const handleChoice = type => {
    console.log(888)
    let data = {
      voteId: 12,
      subVoteId: 22,
      userId: "u0001",
      articleId: "20200701A0EXCM00",
      base: {
        userId: "u0001"
      },
      shareText: "this is a shareText"
    }
    callMethod('post', domain, `/api/v1/content/vote`, data).then()
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
            type === "video" || type === "article" ? (
              <Fragment>
                <div className="view">
                  {
                    type === "video" ? (
                      <p className="articlePlay" onClick={handleClick}>
                        <img src="https://mat1.gtimg.com/bbs/crystal/images/play.png" alt="video" />
                      </p>
                    ) : (
                      <p className="viewCover">
                        <img src={article.coverImage} alt="cover" />
                      </p>
                    )
                  }
                </div>
                <p className="remind">
                  <img src="https://mat1.gtimg.com/bbs/crystal/images/jing.png" alt="logo" />
                  <span>{article.topic && article.topic.name}</span>
                </p>
                <p className="articleTitle">{article.title}</p>
                <div className="articleSource">
                  <ul>
                    <li>{article.source && article.source.name}</li>
                    <li>|</li>
                    <li>{article.updated_at}</li>
                  </ul>
                </div>
                <div className="contents">{article.abstract}</div>
              </Fragment>
            ) : null
          }
          {
            type === "tiny-video" || type === "cover" ? (
              <Fragment>
                <div className="viewVideo">
                  {
                    visible ? (
                      <Player
                        ref={player => handlePlayer(player)}
                        playsInline
                        autoPlay
                        poster="/assets/poster.png"
                        src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                      />
                    ) : (
                      <>
                        <div className="mark"></div>
                        <p className="coverImage">
                          <img src={article.coverImage} alt="cover" />
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
                          <span>{article.topic && article.topic.name}</span>
                        </p>
                        <p className="title">{article.title}</p>
                        <div className="source">
                          <ul>
                            <li>{article.source && article.source.name}</li>
                            <li>|</li>
                            <li>{article.updated_at}</li>
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
            type === "vote" && choiceNum === 2 && article.abstract === "" ? (
              <Fragment>
                <div className="voteView">
                  <p className="remindVote">
                    <img src="https://mat1.gtimg.com/bbs/crystal/images/jing.png" alt="logo" />
                    <span>{article.topic && article.topic.name}</span>
                  </p>
                  <p className="voteTitle">{article.title}</p>
                  <div className="voteSource">
                    <ul>
                      <li>{article.source && article.source.name}人参与</li>
                      <li>进行中</li>
                    </ul>
                  </div>
                  <div className="dabuleChoice">
                    <div className="vote">
                      {
                        zhengChecked? (
                          <p>
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
                          <p>
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
                      <div className="voteLeft">
                        <p className="checkedLeft" style={{width: 180}}></p>
                        <p className="checkedRight"></p>
                      </div>
                      {
                        voteNum ? (
                          <div className="votePeople">
                            <span className="voteNumz">1000</span>
                            <span className="voteNumf">2000</span>
                          </div>
                        ) : null
                      }
                      <div className="voteRight" style={voteNum? {marginTop: -12} : {marginTop: 6}}>
                        <span>静观其变</span>
                        <span>必须买它</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Fragment>
            ) : null
          }
          {
            type === "vote" && choiceNum === 2 && article.abstract !== ""? (
                <Fragment>
                <div className="voteView">
                  <p className="remindVote">
                    <img src="https://mat1.gtimg.com/bbs/crystal/images/jing.png" alt="logo" />
                    <span>{article.topic && article.topic.name}</span>
                  </p>
                  <p className="voteTitle">{article.title}</p>
                  <p className="voteAbstract">{article.abstract}</p>
                  <p className="voteAbstractTitle">你的第一步触屏手机是华为吗？</p>
                  <div className="abstractChoice">
                    <div className="abstractVote">
                      {
                        zhengChecked? (
                          <p onClick={() => handleChoice('正')}>
                            <img src="https://mat1.gtimg.com/bbs/crystal/images/voteres.png" alt="zheng" />
                          </p>
                        ) : (
                          <p style={{background: 'rgba(255, 84, 120, 0.4)'}}>
                            <img src="https://mat1.gtimg.com/bbs/crystal/images/zheng.png" alt="zheng" />
                          </p>
                        )
                      }
                      {
                        fanChecked? (
                          <p onClick={() => handleChoice('反')}>
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
                      <div className="voteAbstractLeft">
                        <p className="checkedLeft" style={{width: 180}}></p>
                        <p className="checkedRight"></p>
                      </div>
                      {
                        voteNum ? (
                          <div className="voteAbstractPeople">
                            <span className="voteNumz">1000</span>
                            <span className="voteNumf">2000</span>
                          </div>
                        ) : null
                      }
                      <div className="voteRight" style={voteNum? {marginTop: -12} : {marginTop: 6}}>
                        <span>静观其变</span>
                        <span>必须买它</span>
                      </div>
                    </div>
                  </div>
                  <div className="voteAbstractSource">
                    <ul>
                      <li>{article.source && article.source.name}人参与</li>
                      <li>进行中</li>
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
                    <span>{article.topic && article.topic.name}</span>
                  </p>
                  <p className="voteTitle">{article.title}</p>
                  <p className="abstract">{article.abstract}</p>
                  {
                    !isOverdue? (
                      <>
                        {
                          !voteStatus ? (
                            <div className="selectChoice">
                              <p>你喜欢曲面屏手机的原因是？</p>
                              <Radio.Group buttonStyle="solid" onChange={handleChange}>
                                <Radio.Button value="a">Hangzhou</Radio.Button>
                                <Radio.Button value="b">Shanghai</Radio.Button>
                                <Radio.Button value="c">Beijing</Radio.Button>
                                <Radio.Button value="d">Chengdu</Radio.Button>
                              </Radio.Group>
                            </div>
                          ) : (
                            <div className="selectChoiceSuccess">
                              <p>你喜欢曲面屏手机的原因是？</p>
                              <ul>
                                <div><li style={isChecked? {width: 180, background: 'rgb(84,85,255)', color: '#fff'}: {}}>Hangzhou<span>11</span></li></div>
                                <div><li style={isChecked? { background: 'rgb(231,231,255)'}: {}}>Shanghai<span>88</span></li></div>
                                <div><li style={isChecked? {width: 180, background: 'rgb(231,231,255)'}: {}}>Beijing<span>44</span></li></div>
                                <div><li style={isChecked? {width: 180, background: 'rgb(231,231,255)'}: {}}>Chengdu<span>55</span></li></div>
                              </ul>
                            </div>
                          )
                        }
                      </>
                    ) : (
                      <div className="selectOverdue">
                        <p>你喜欢曲面屏手机的原因是？</p>
                        <ul>
                          <div><li style={choicePeople[0] > 0? {width: choicePeople[0], background: 'rgb(238,238,238)'}: {}}>Hangzhou<span>99</span></li></div>
                          <div><li style={choicePeople[1] > 0? {width: choicePeople[1], background: 'rgb(238,238,238)'}: {}}>Shanghai<span>88</span></li></div>
                          <div><li style={choicePeople[2] > 0? {width: choicePeople[2], background: 'rgb(238,238,238)'}: {}}>Beijing<span>44</span></li></div>
                          <div><li style={choicePeople[3] > 0? {width: choicePeople[3], background: 'rgb(238,238,238)'}: {}}>Chengdu<span>55</span></li></div>
                        </ul>
                      </div>
                    )
                  }
                  <div className="voteSource">
                    <ul>
                      <li>{article.source && article.source.name}人参与</li>
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
