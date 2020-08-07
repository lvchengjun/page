import React, { Component, Fragment } from 'react';
import {
  Player,
  ControlBar,
  PlayToggle, // PlayToggle 播放/暂停按钮 若需禁止加 disabled
//   ReplayControl, // 后退按钮
//   ForwardControl,  // 前进按钮
  CurrentTimeDisplay,
  TimeDivider,
//   PlaybackRateMenuButton,  // 倍速播放选项
  VolumeMenuButton
} from 'video-react';
import './index.css';


class VideoPlayer extends Component {
  componentDidMount() {
    console.log(this.player)
    this.player.subscribeToStateChange(this.handleStateChange.bind(this));
  }

  handleStateChange(state, prevState) {
    if (state.ended) {
        console.log(9999)
        this.props.hiddenVideo(true)
    }
  }

//   ControlBar,   控制器父级组件

// ReplayControl,  回放组件,参数为回放的时间

// ForwardControl, 快进组件,参数为快进的时间

// CurrentTimeDisplay, 当前播放时间

// TimeDivider, 时间分隔线,可以直接拉到需要播放的视频点

// PlaybackRateMenuButton, 控制播放速率

// VolumeMenuButton 声音组件

  render() {
    return (
      <Fragment>
        <div style={{ width: '100%', height: '100%' }}>
          <Player
            ref={c => {
              this.player = c;
            }}
            autoPlay
            playsInline
            // poster="https://video-react.js.org/assets/poster.png"
          >
            <source
              src='https://media.w3.org/2010/05/sintel/trailer_hd.mp4'
              type="video/mp4"
            />
            <ControlBar autoHide={false} disableDefaultControls={false}>
              {/* <ReplayControl seconds={10} order={1.1} />
              <ForwardControl seconds={30} order={1.2} /> */}
              <PlayToggle />
              <CurrentTimeDisplay order={4.1} />
              <TimeDivider order={4.2} />
              {/* <PlaybackRateMenuButton rates={[5, 2, 1.5, 1, 0.5]} order={7.1} /> */}
              <VolumeMenuButton />
            </ControlBar>
          </Player>
        </div>
      </Fragment>
    )
  }
}


export default VideoPlayer;