# darth_fader (WORK IN PROGRESS)

It's a little jQuery plugin that simply fades between images, you can see an exmaple above. The aim of this plugin is for it to be super simple and fallback gracefully when the javascript isn't present.

![Darth Fader](https://github.com/completelynovel/darth_fader/raw/master/assets/logo.png)

## Install

Add the `darth_fader.js` script to your page and 


## Requirements

The plugin requires [jQuery](http://jquery.com) and has been tested with *v1.6.2*.


## Usage

Create a DOM element with the class `darth-fader` somwhere in your page the child elements should be each slide to be displayed, this element must have its overflow hidden and be a fixed size. This will allow the first slide to display properly before the javascript loads, and degrade gracefully if javascript is turned off (although people who have javascript turned off shouldn't be allowed to use the internet). For example

    <div class="darth-fader">
      <img title="image-1" class="slide-1"></img>
      <img title="image-2" class="slide-2"></img>
      <img class="slide-3"></img>
    </div>
        
If you want to add some controls also add the following div somewhere in the page.

    <div class="darth-fader-controls"></div>
        
This will automatically get the links added to it for each slide, any titles on the slides will also exist on the links. The following will be rendered to the page and you can style them however you like.

    <ul class="darth-fader-controls">
      <li><a title="image-1"></a></li>
      <li><a title="image-2"></a></li>
      <li><a></a></li>
    </ul>
        
### But I want more?

Well if you want more than one in a page, just configure each slide set and buttons with a different suffix. For example:

  darth-fader-a / darth-fader-controls-a
  darth-fader-b / darth-fader-controls-b
        
If you need to change the interval time simply add data-darthfader-slide-interval to your div with the value specified as the time in milliseconds. Also if you the user clicks a button it will pause the autochange of slides, data-darthfader-pause-interval will alter this pause time. Both default to 5 seconds, here's an example:

      <div class="darth-fader-controls" data-darthfader-pause-interval="3000" data-darthfader-slide-interval="4000">
        <!-- Slides ommited -->
     </div>


## Build

Simply run the following from the root directory

    coffee -c *.coffee


