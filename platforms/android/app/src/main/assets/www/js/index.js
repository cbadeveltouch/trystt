/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');

        /* const artyom = new Artyom()

        artyom.addCommands([
            {
                indexes: ["Ottobre"],
                action: () => {
                    alert("Hello, how are you?");
                }
            }
        ])

        startContinuousArtyom = () => {
            artyom.fatality()   // use this to stop any of

            setTimeout( () => {// if you use artyom.fatality , wait 250 ms to initialize again.                
                artyom.initialize({
                    lang:"it-IT",// A lot of languages are supported. Read the docs !
                    continuous:false,// Artyom will listen forever
                    listen:true, // Start recognizing
                    debug:true, // Show everything in the console
                    speed:1 // talk normally
                })
                .then(() => {
                    alert("Artyom pronto in modalità continua!")
                })
                .catch( err => alert(err))
            }, 250)
        }

        startContinuousArtyom() */



        let startBtn = document.getElementById('start-speech'),
            stopBtn = document.getElementById('stop-speech'),
            bodyMessageText = document.getElementById('result-text')

        /**
         * Implemento metodi per speech recognition
         */
        // Handle results
        startRecognition = () => {
            window.plugins.speechRecognition.startListening( result => {
                // Show results
                stopBtn.style.display = 'none'
                startBtn.style.display = 'block'
                bodyMessageText.innerText = result.length > 0 ? result[0] : ''
            }, err => {
                console.error(err)
            }, {
                language: "it-IT",
                matches: 1,
                showPopup: false
            })
        }

        // Verify if recognition is available
        verifyAndSpeech = () => window.plugins.speechRecognition.isRecognitionAvailable( available => {
            if (!available) {
                console.log("Sorry, not available")
            }

            // Check if has permission to use the microphone
            window.plugins.speechRecognition.hasPermission( isGranted => {
                if (isGranted) {
                    navigator.notification.beep(1)
                    startRecognition()
                } else {
                    // Request the permission
                    window.plugins.speechRecognition.requestPermission( () => {
                        navigator.notification.beep(1)
                        // Request accepted, start recognition
                        startRecognition()
                    }, err => {
                        console.log(err)
                    })
                }
            }, err => {
                console.log(err)
            })
        }, err => {
            console.log(err)
        })


        
        
        startBtn.onclick = () => {
            startBtn.style.display = 'none'
            stopBtn.style.display = 'block'
            verifyAndSpeech()
        }

        stopBtn.onclick = () => {
            window.plugins.speechRecognition.stopListening( () => {
                // No more recognition
            }, err => {
                console.log(err)
            })
            stopBtn.style.display = 'none'
            startBtn.style.display = 'block'
        }

        /**
         * TERMINE SPEECH RECOGNITION
         */


        /* setTimeout( () => {
            artyom.say("Buongiorno, bentornato in casa di riposo. Cosa vuoi fare?",{
                onStart:function(){
                    alert("The text is being readed");
                },
                onEnd:function(){
                    alert("Well, that was all. Try with a longer text !");
                }
            })
        }, 2000) */
               

        let speechPage = document.getElementById('speech-page'),
            speechPageBtn = document.getElementById('speech-page-btn'),
            keypadPage = document.getElementById('keypad-page'),
            keypadPageBtn = document.getElementById('keypad-page-btn')

        speechPageBtn.onclick = () => {
            keypadPage.style.display = 'none'
            speechPage.style.display = 'block'
        }

        keypadPageBtn.onclick = () => {
            speechPage.style.display = 'none'
            keypadPage.style.display = 'block'
            resize()
        }

        initKeypadNumerals()

    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        //var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        //receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();