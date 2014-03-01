(function() {
  window.CountDownTimer = (function() {
    CountDownTimer.prototype.imagePathPrefix = "images";

    CountDownTimer.prototype.oneSecond = 1000;

    CountDownTimer.prototype.oneMinute = 1000 * 60;

    CountDownTimer.prototype.oneHour = 1000 * 60 * 60;

    CountDownTimer.prototype.oneDay = 1000 * 60 * 60 * 24;

    CountDownTimer.prototype.days = 0;

    CountDownTimer.prototype.hour = 0;

    CountDownTimer.prototype.minutes = 0;

    CountDownTimer.prototype.seconds = 0;

    function CountDownTimer(selector) {
      this.el = $(selector);
      this.countUntil = Date.parse(this.el.data('until'));
      this.createElements();
      this.startCounting();
    }

    CountDownTimer.prototype.startCounting = function() {
      this.interval = setInterval(((function(_this) {
        return function() {
          return _this.updateCountDown();
        };
      })(this)), this.oneSecond);
      return this.updateCountDown();
    };

    CountDownTimer.prototype.stopCounting = function() {
      return clearInterval(this.interval);
    };

    CountDownTimer.prototype.createElements = function() {
      var section, _i, _len, _ref;
      _ref = ['days', 'hours', 'minutes', 'seconds'];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        section = _ref[_i];
        this.el.append($("<span>", {
          "class": section
        }));
        this.el.append($("<span> " + section + " </span>"));
        if (section === 'days') {
          this.el.append($("<br>"));
        }
      }
      return this.updateCountDown();
    };

    CountDownTimer.prototype.timeLeft = function() {
      var days, hours, milliSecsLeft, minutes, now, seconds;
      now = new Date().getTime() - (new Date()).getTimezoneOffset() * this.oneMinute;
      milliSecsLeft = this.countUntil - now;
      if (milliSecsLeft < 0) {
        milliSecsLeft = 0;
        this.stopCounting();
      }
      days = parseInt(milliSecsLeft / this.oneDay);
      hours = parseInt((milliSecsLeft % this.oneDay) / this.oneHour);
      minutes = parseInt(((milliSecsLeft % this.oneDay) % this.oneHour) / this.oneMinute);
      seconds = parseInt((((milliSecsLeft % this.oneDay) % this.oneHour) % this.oneMinute) / this.oneSecond);
      return {
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds
      };
    };

    CountDownTimer.prototype.updateCountDown = function() {
      var section, time, _ref, _results;
      _ref = this.timeLeft();
      _results = [];
      for (section in _ref) {
        time = _ref[section];
        _results.push(this.write(section, time));
      }
      return _results;
    };

    CountDownTimer.prototype.write = function(section, number) {
      var hundreds, ones, sectionElement, tens;
      sectionElement = this.el.find("." + section);
      if (parseInt(sectionElement.data('num')) === number) {
        return;
      }
      sectionElement.data('num', number);
      hundreds = parseInt(number / 100);
      tens = parseInt((number % 100) / 10);
      ones = parseInt(number % 10);
      sectionElement.html('');
      if (hundreds !== 0) {
        sectionElement.append($("<span>" + hundreds + "</span>"));
      }
      if (tens !== 0) {
        sectionElement.append($("<span>" + tens + "</span>"));
      }
      return sectionElement.append($("<span>" + ones + "</span>"));
    };

    return CountDownTimer;

  })();

}).call(this);
