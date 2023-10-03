import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Router from './routes';
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

// localStorage.setItem('mode', false);

const App = () => {
    const googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
            {
                pageLanguage: 'en',
                autoDisplay: false
            },
            'google_translate_element'
        );
    };

    // const textToSpeech = async () => {
    //     // console.log('text', document.getElementById('root'));
    //     Axios.post(
    //         'https://api.elevenlabs.io/v1/text-to-speech/VR6AewLTigWG4xSOukaG?optimize_streaming_latency=4',
    //         {
    //             text: document.body.innerText,
    //             model_id: 'eleven_monolingual_v1',
    //             voice_settings: {
    //                 stability: 0,
    //                 similarity_boost: 0
    //             }
    //         },
    //         {
    //             headers: {
    //                 Accept: 'audio/mpeg',
    //                 'xi-api-key': '08ebde8ceb39f977316ff38947bf283d',
    //                 'Content-type': 'application/json'
    //             }
    //         }
    //     )
    //         .then((res) => res.blob())
    //         .then((blob) => {
    //             const url = URL.createObjectURL(blob);
    //             new Audio(url).play();
    //         });
    // };

    // // textToSpeech();

    useEffect(() => {
        var addScript = document.createElement('script');
        addScript.setAttribute(
            'src',
            '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
        );
        document.body.appendChild(addScript);
        window.googleTranslateElementInit = googleTranslateElementInit;
    }, []);

    const themeMode = useSelector((state) => state?.theme?.mode);
    useEffect(() => {}, [themeMode]);

    // window.onbeforeunload = function () {
    //     localStorage.removeItem('token');
    //     return '';
    // };

    const navigate = useNavigate();

    // useEffect(() => {
    //     const inactivityTimer = setTimeout(() => {
    //         localStorage.removeItem('token');
    //         navigate('/');
    //     }, 10000);
    //     return () => {
    //         clearTimeout(inactivityTimer);
    //     };
    // });

    // useEffect(() => {
    //     console.log("text document", document.getElementById("root").innerText);
    //     // setTimeout(responsiveVoice.speak(text), 1500);
    //     responsiveVoice.speak(document.getElementById("root").innerText);
    // }, [document.getElementById("root").innerText])

    return (
        <ThemeConfig>
            <GlobalStyles />
            <Router />
        </ThemeConfig>
    );
};

export default App;
