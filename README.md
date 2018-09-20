# snap-and-clarifai-master

1. When watching video or youtube, tab the app and it will take video snapshot from the video frame .
2. hit "Predict" and the image will parse to the Claifai API. And retutn celebrity names.
3. Backend javascript do the part of snapshot, where popup.js do the parsing,analysis and feedback result.
4. I am still work on the 'onclick' event in popup.js 100:103, the links wont render accordingly. For now the remedy is catDiv.innerHTML from popup.js 86 where I insert a tag 'target =  blank' to the src. 
