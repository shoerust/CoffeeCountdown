# l = console.log

class window.CountDownTimer
  imagePathPrefix: "images"
  oneSecond: 1000
  oneMinute: 1000 * 60
  oneHour: 1000 * 60 * 60
  oneDay: 1000 * 60 * 60 * 24
  days: 0
  hour: 0
  minutes: 0
  seconds: 0

  constructor: (selector)->
    @el = $(selector)
    @countUntil = Date.parse(@el.data('until'))
    @createElements()
    @startCounting()

  startCounting: ->
    @interval = setInterval (=> @updateCountDown()), @oneSecond
    @updateCountDown()

  stopCounting: ->
    clearInterval(@interval)

  createElements: ->
    for section in ['days', 'hours', 'minutes', 'seconds']
      @el.append( $("<span>", {class: section}) )
      @el.append( $("<span> " + section + " </span>"))
      if (section == 'days')
        @el.append( $("<br>"))
    @updateCountDown()

  timeLeft: ->
    now = new Date().getTime() - (new Date()).getTimezoneOffset() * @oneMinute
    milliSecsLeft = @countUntil - now
    if milliSecsLeft < 0
      milliSecsLeft = 0
      @stopCounting()

    days = parseInt(milliSecsLeft / @oneDay)
    hours = parseInt((milliSecsLeft % @oneDay) / @oneHour)
    minutes = parseInt(((milliSecsLeft % @oneDay) % @oneHour) / @oneMinute)
    seconds = parseInt((((milliSecsLeft % @oneDay) % @oneHour) % @oneMinute) / @oneSecond)

    {
      days: days
      hours: hours
      minutes: minutes
      seconds: seconds
    }

  updateCountDown: ->
    for section, time of @timeLeft()
      @write(section, time)

  write: (section, number)->
    sectionElement = @el.find(".#{section}")
    return if parseInt(sectionElement.data('num')) == number
    sectionElement.data('num', number)

    hundreds = parseInt( number / 100 ) # in case it's over 100 days
    tens = parseInt( (number % 100) / 10 )
    ones = parseInt( number % 10 )

    sectionElement.html('')
    sectionElement.append $("<span>" + hundreds + "</span>") if (hundreds != 0)
    sectionElement.append $("<span>" + tens + "</span>") if (tens != 0)
    sectionElement.append $("<span>" + ones + "</span>")
