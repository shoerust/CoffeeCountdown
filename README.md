CoffeeCountdown
===============
### (adapted from [Countdown Timer](https://github.com/dukejones/countdown-timer))
This is a simple Coffeescript object which creates a countdown timer on your page.  
Just include it on your page and create an element with a "data-until" attribute equal to the date you'll be counting to,
in the format YYYY-MM-DD.


```html
<div id="countdown" data-until="2012-12-21" />
```

When you instantiate the countdown timer, pass the selector of the countdown element.

```javascript
$(function() {
  window.timer = new CountDownTimer("#countdown")
})
```

How do I work with this Coffeescript stuff?
-------------------------------------------

### Easiest
Go to http://coffeescript.org , click on "Try Coffeescript", and paste the
contents of countdown.js.coffee onto the left side.  The right side will be the equivalent javascript version; just paste that into a .js file in your project.

### Best
Use Middleman. http://middlemanapp.com/
If you're doing contract work and not a full-blown app, you can still benefit from Coffeescript, Haml, and Sass.  If you've used them, you know what a blessing they are for HTML development.  If you haven't, well, I don't really know how I'd explain it.  Just give it a shot.  
```bash
$ gem install middleman
$ middleman
```
Run it in the project directory and it will serve the files.  For larger projects you'll want to ```middleman init``` and create a middleman project.

### Also Awesome
Use Stasis. http://stasis.me/
```bash
$ gem install stasis
$ stasis
```
Stasis generates servable HTML/JS files. NB you may also need to install dependent gems.

Enjoy!


Released under the MIT License.
Please see LICENSE.md for the license text.
