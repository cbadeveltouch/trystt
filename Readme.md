####### TRYSTT project #####################

############################################

GOALS:

Progetto creato per sperimentare la funzionalità di speech recognition, utili
alla creazione semplificata di un diario in cartella socio sanitaria mobile.
Inoltre il prototipo sarà utile anche alla sperimentazione sull'utilizzo dei
comandi vocali, mirata al miglioramento dell'esperienza utente.

############################################

Speech Recognition Requirements
--------------------------------------------
    To use the Voice Recognition API you will need a Cordova Plugin that handles the native code of the Speech Recognizer. In this case, we are going to use the cordova-plugin-speechrecognition plugin. This plugin allows you to use the native Speech Recognition from your device easily.

    This plugin supports the Android and iOS platforms. To install the plugin in your project, execute the following command in the terminal:

    cordova plugin add cordova-plugin-speechrecognition
    Once the plugin is installed in your project, the window.plugins.speechRecognition variable will be available in your project. Read more about the plugin in its official Github repository here. The plugin itself has the following requirements:

    cordova-android v5.0.0
    Android API level 14
    <android:launchMode> must not be singleInstance. It can be singleTask, standard, singleTop.
    RECORD_AUDIO permission
    Internet Connection (obviously)

###############################################

