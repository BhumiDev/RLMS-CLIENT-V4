import { JitsiMeeting } from '@jitsi/react-sdk';

const JistComponent=()=>(

<JitsiMeeting
    roomName =  'YOUR_CUSTOM_ROOM_NAME' 
    getIFrameRef = { (iframeRef) => (iframeRef.style.height = '700px')}
    
/>

)

export default JistComponent;