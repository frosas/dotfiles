{Range, Point} = require 'atom'
Violation = require '../lib/violation'

describe 'Violation', ->
  bufferRange = null

  beforeEach ->
    bufferPoint = new Point(1, 2)
    bufferRange = new Range(bufferPoint, bufferPoint)

  describe 'constructor', ->
    it 'sets properties', ->
      violation = new Violation('warning', bufferRange, 'This is a message')
      expect(violation.severity).toBe('warning')
      expect(violation.bufferRange).toBe(bufferRange)
      expect(violation.message).toBe('This is a message')

    describe 'when unknown severity is passed', ->
      it 'throws exception', ->
        expect ->
          new Violation('foo', bufferRange, 'This is a message')
        .toThrow()

  describe '::getHTML', ->
    it 'escapes HTML entities in the message', ->
      violation = new Violation('warning', bufferRange, 'Do not use <font> tag.')
      expect(violation.getHTML()).toBe('Do not use &lt;font&gt; tag.')

    it 'marks up backquotes with <code> tag', ->
      message = 'Favor `unless` over `if` for negative conditions.'
      violation = new Violation('warning', bufferRange, message)
      expect(violation.getHTML())
        .toBe('Favor <code>unless</code> over <code>if</code> for negative conditions.')

    it 'marks up singlequotes with <code> tag', ->
      message = "Background image 'bg_fallback.png' was used multiple times, " +
                'first declared at line 42, col 2.'
      violation = new Violation('warning', bufferRange, message)
      expect(violation.getHTML())
        .toBe("Background image <code>bg_fallback.png</code> was used multiple times, " +
              'first declared at line 42, col 2.')
