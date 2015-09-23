# Smart Websocket Client
Smart Websocket Client is a chrome extension to help developers develop and test websocket.

# Why another websocket client
I checked websocket clients in chrome web store and I am using Simple Websocket Client. It is a great tool for testing. But it still lack some features. I hope that Smart Websocket Client will fill the gap.

# ScreenShot
![Imgur](http://i.imgur.com/VUcGU7e.jpg)

# Features
* Rich text editor integration
* Remember history input like some web api testing tools(postman) does.

# Future Features
* Create fake messages for testing. This is useful if the backend is not ready yet but you want to develop your frontend code now(going to be implemented).
* Account system, you can share the messages to your team. 

# Install && Build

> npm install // install dependencies

> npm run watch // you can open localhost:8080 to try it

> npm run build // generate build files in dist folder

> PRODUCTION=1 npm run build // build minified version of build files

# Notice

This tool has not been pushed into Chrome App Store. I am trying to get the developer fee paid first. Not about money, but I cannot pay it easily in China.

You can load it to Chrome directly after building(a new folder called dist is generated).
 
![Imgur](http://i.imgur.com/AJ98GJj.jpg)

Turn on Developer mode && Load unpacked extension. Click the new icon appeared on the right of address bar. You got it :)
