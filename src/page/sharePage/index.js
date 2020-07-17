import React from  'react';
// import ShareMethod from './shareMethod';
import SharePage from './/sharePage';
import './index.css';
// import md5 from 'js-md5';
// import { callApi, domain } from '../../util/api';

const Share = () => {
    // const [visible, setVisible] = useState(false);

    // const handleShow = () => {
    //     // setVisible(true)
    //     let userId = "";
    //     let timestamp = Date.now().toString().substr(0, 10);
    //     let sign = md5(`fanya_${userId}_${timestamp}`);
    //     let param = {contentId: '44aa2523564c429f'};
    //     param.base = {
    //         DeviceModel: "",
    //         IsLogin: false,
    //         LoginTime: "",
    //         LoginType: "",
    //         appVersion: "",
    //         devicePlatform: "web_share",
    //         signature: sign,
    //         ts: timestamp,
    //         userId: userId
    //     }
    //     callApi('post', domain, `/v1/content/detailPage`, param).then()
    // }

    // const watchVisible = () => {
    //     setVisible(false)
    // }

    return (
        <div>
            {/* <Button type="primary" onClick={handleShow}>分享</Button> */}
            {/* {
                visible? <ShareMethod show={visible} watchShow={watchVisible} /> : null
            } */}
            <SharePage />
        </div>
    )
}
export default Share;