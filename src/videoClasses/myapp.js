var apiObj = null;

function StartMeeting() {
    const domain = '192.168.0.144';
    const options = {
        roomName: 'JitsiMeetAPIExample',
        width: '100%',
        height: '100%',
        parentNode: document.querySelector('#jitsi-meet-conf-container'),
        userInfo: {
            displayName: 'Bhumi'
        },
        configOverwrite: {},
        interfaceConfigOverwrite: {
            DISPLAY_WELCOME_PAGE_CONTENT: false,
            TOOLBAR_BUTTONS: ['microphone', 'camera']
        },
        onload: function () {
            alert('loaded');
        }
    };

    apiObj = new JitsiMeetExternalAPI(domain, options);

    apiObj.addEventListeners({
        readyToClose: function () {
            alert('going to close');
            $('#jitsi-meet-conf-container').empty();
        }
    });

    apiObj.executeCommand('subject', '');
}

function HangupCall() {
    apiObj.executeCommand('hangup');
    console.log('here');
}
