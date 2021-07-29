
This is the portfolio website I'm working on for my CS350 Web Development class!


Here is a brief explanation of my project files.

Things start off in the  bin/www file that creates the server and broadcasts it on local port 3000.
The bin/www file requires the app.js file which directs the server towards routes, views, and files that it should have access to.
The node_modules folder holds all of the information for each of the node modules that are used throughout this project, as specified in the package-lock.json and package.json files.

The routes/index.js file is in charge of loading the correct webpage based on the provided url. It also does server-side validation, email responses, and mongodb database storage for the feedback form. The routes/users.js file is currently unused, but saves space for user specific content later down the road.

The different web page views are located in the views folder. The layout.pug file fills in the standard head, body header, and body footer and is extended by three of the four possible web pages(index.pug, games.pug, and feedbackresponse.pug). At the moment, the feedback.pug file doesn't properly load the feedback form, so the feedback.html file is being used in its place.
The responses from the feedback form are currently stored in the myapp/feedback.json file.

All of the image and audio files are stored in the public/images folder to be called by thier respective webpages. The scripts that run the game on the Games page and the form of the Feedback page are located in the public/javascripts folder.  The public/stylesheets folder holds the single style.css file that formats the entire site.
