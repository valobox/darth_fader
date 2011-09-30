class DarthFaderSet
  constructor: () ->
    @set = []
    $('*[class^=darth-fader]').each (idx, faderElem) =>
      if !faderElem.className.match(/^darth-fader-controls/)
        @set.push new DarthFader(faderElem)


class DarthFader

  constructor: (faderGroup) ->
    faderGroup = $(faderGroup)
    @elems = []

    @currentIdx = 0
    isFirst = true

    @slideInterval = faderGroup.data('darthfader-slide-interval') ? 5000
    @pauseInterval = faderGroup.data('darthfader-pause-interval') ? 5000

    # Find the button div if there is one
    buttonControls = null
    for className in faderGroup.attr('class').split(/\s+/)
      if className.match(/^darth-fader/) 
        buttonControls = className.replace(/^darth-fader(.*)$/, "darth-fader-controls$1")
        buttonControls = $(".#{buttonControls}")
        break     

    faderGroup.children().each (idx,elem) =>
      faderElem = $(elem)

      # Hide all but the first one
      faderElem.hide() if !isFirst
      isFirst = false


      if buttonControls
        # Buttons
        name   = $(elem).attr('id')
        title  = $(elem).attr('title')
        button = $("<a/>")
        button.attr('title', title) if title
        button.attr('href', "javascript:void(0);")
        li     = $("<li/>").append(button)
        buttonControls.append(li)


      @elems[idx] =
        'name': name
        'fader': $(elem)
        'button': button

      button.click (e) =>
        @setByIdx(idx)

        clearInterval @hdl
        @hdl = null
        setTimeout () =>
          @startAuto()
        ,@pauseInterval

    @setByIdx 0
    @startAuto()


  setByIdx: (idx) ->   
    prev = @elems[@currentIdx]
    next = @elems[idx]

    # Set the classes on the buttons
    prev.button?.removeClass('selected')
    next.button?.addClass('selected')

    return if @currentIdx == idx

    @currentIdx = idx

    # Due to a chrome set interval issue 
    # LINK: <http://stackoverflow.com/questions/6183463/when-using-setinterval-if-i-switch-tabs-in-chrome-and-go-back-the-slider-goes-c>
    prev.fader.stop(true,true)
    next.fader.stop(true,true)

    prev.fader.fadeOut 700, () ->
      next.fader.fadeIn 700


  setByName: (name) ->
    for fader,idx in @faderChildren
      @setByIdx idx if fader.name == name


  startAuto: () ->
    return if @hdl
    @hdl = setInterval () =>
      if @currentIdx == @elems.length-1
        @setByIdx 0
      else
        @setByIdx @currentIdx+1
    ,@slideInterval

$(document).ready ->
  # Check if a fader exists
  new DarthFaderSet()
