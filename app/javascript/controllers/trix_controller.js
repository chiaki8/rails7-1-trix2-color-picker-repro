import { Controller } from '@hotwired/stimulus'
import Trix from 'trix'
const { lang } = Trix.config

// Connects to data-controller="trix"
export default class extends Controller {
  static targets = ['editor', 'foregroundColorPicker', 'backgroundColorPicker']

  connect () {
    document.addEventListener('trix-before-initialize', () => {
      this.initTrix()
    })
  }

  initTrix () {
    Trix.config.blockAttributes.heading1.tagName = 'h3'
    Trix.config.toolbar.getDefaultHTML = this.getDefaultHTML.bind(this)
    this.addForegroundButtonConfig()
    this.addBackgroundButtonConfig()
    this.addTextAlignCenterButtonConfig()
  }

  openForegroundColorPicker () {
    this.foregroundColorPickerTarget.click()
  }

  openBackgroundColorPicker () {
    this.backgroundColorPickerTarget.click()
  }

  foregroundColorChanged () {
    this.editorTarget.editor.activateAttribute('foregroundColor', this.foregroundColorPickerTarget.value)
  }

  backgroundColorChanged () {
    this.editorTarget.editor.activateAttribute('backgroundColor', this.backgroundColorPickerTarget.value)
  }

  addForegroundButtonConfig () {
    Trix.config.textAttributes.foregroundColor = {
      styleProperty: 'color',
      inheritable: true
    }
  }

  addBackgroundButtonConfig () {
    Trix.config.textAttributes.backgroundColor = {
      styleProperty: 'backgroundColor',
      inheritable: true
    }
  }

  addTextAlignCenterButtonConfig () {
    Trix.config.blockAttributes.textAlignCenter = {
      tagName: 'centered-div'
    }
  }

  getDefaultHTML () {
    return `<div class="trix-button-row">
      <span class="trix-button-group trix-button-group--text-tools" data-trix-button-group="text-tools">
        <button type="button" class="trix-button trix-button--icon trix-button--icon-bold" data-trix-attribute="bold" data-trix-key="b" title="${lang.bold}" tabindex="-1">${lang.bold}</button>
        <button type="button" class="trix-button trix-button--icon trix-button--icon-italic" data-trix-attribute="italic" data-trix-key="i" title="${lang.italic}" tabindex="-1">${lang.italic}</button>
        <button type="button" class="trix-button trix-button--icon trix-button--icon-strike" data-trix-attribute="strike" title="${lang.strike}" tabindex="-1">${lang.strike}</button>
        <button type="button" class="trix-button trix-button--icon trix-button--icon-link" data-trix-attribute="href" data-trix-action="link" data-trix-key="k" title="${lang.link}" tabindex="-1">${lang.link}</button>
        ${this.foregroundColorButtons}
        ${this.backgroundColorButtons}
      </span>
      <span class="trix-button-group trix-button-group--block-tools" data-trix-button-group="block-tools">
        <button type="button" class="trix-button trix-button--icon trix-button--icon-heading-1" data-trix-attribute="heading1" title="${lang.heading1}" tabindex="-1">${lang.heading1}</button>
        <button type="button" class="trix-button trix-button--icon trix-button--icon-quote" data-trix-attribute="quote" title="${lang.quote}" tabindex="-1">${lang.quote}</button>
        <button type="button" class="trix-button trix-button--icon trix-button--icon-code" data-trix-attribute="code" title="${lang.code}" tabindex="-1">${lang.code}</button>
        <button type="button" class="trix-button trix-button--icon trix-button--icon-bullet-list" data-trix-attribute="bullet" title="${lang.bullets}" tabindex="-1">${lang.bullets}</button>
        <button type="button" class="trix-button trix-button--icon trix-button--icon-number-list" data-trix-attribute="number" title="${lang.numbers}" tabindex="-1">${lang.numbers}</button>
        <button type="button" class="trix-button trix-button--icon trix-button--icon-decrease-nesting-level" data-trix-action="decreaseNestingLevel" title="${lang.outdent}" tabindex="-1">${lang.outdent}</button>
        <button type="button" class="trix-button trix-button--icon trix-button--icon-increase-nesting-level" data-trix-action="increaseNestingLevel" title="${lang.indent}" tabindex="-1">${lang.indent}</button>
        ${this.textAlignButtons}
      </span>
      <span class="trix-button-group trix-button-group--file-tools" data-trix-button-group="file-tools">
        <button type="button" class="trix-button trix-button--icon trix-button--icon-attach" data-trix-action="attachFiles" title="${lang.attachFiles}" tabindex="-1">${lang.attachFiles}</button>
      </span>
      <span class="trix-button-group-spacer"></span>
      <span class="trix-button-group trix-button-group--history-tools" data-trix-button-group="history-tools">
        <button type="button" class="trix-button trix-button--icon trix-button--icon-undo" data-trix-action="undo" data-trix-key="z" title="${lang.undo}" tabindex="-1">${lang.undo}</button>
        <button type="button" class="trix-button trix-button--icon trix-button--icon-redo" data-trix-action="redo" data-trix-key="shift+z" title="${lang.redo}" tabindex="-1">${lang.redo}</button>
      </span>
    </div>
    <div class="trix-dialogs" data-trix-dialogs>
      <div class="trix-dialog trix-dialog--link" data-trix-dialog="href" data-trix-dialog-attribute="href">
        <div class="trix-dialog__link-fields">
          <input type="url" name="href" class="trix-input trix-input--dialog" placeholder="${lang.urlPlaceholder}" aria-label="${lang.url}" required data-trix-input>
          <div class="trix-button-group">
            <input type="button" class="trix-button trix-button--dialog" value="${lang.link}" data-trix-method="setAttribute">
            <input type="button" class="trix-button trix-button--dialog" value="${lang.unlink}" data-trix-method="removeAttribute">
          </div>
        </div>
      </div>
    </div>`
  }

  get foregroundColorButtons () {
    return `<input type="color" style="width:0;height:0;padding:0;margin-top:20px;visibility:hidden"
                   data-trix-target="foregroundColorPicker" data-action="trix#foregroundColorChanged">
            <button type="button" class="trix-button" data-action="click->trix#openForegroundColorPicker" title="Text color">
              <span class="icon">
                <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path d="M204.3 5C104.9 24.4 24.8 104.3 5.2 203.4c-37 187 131.7 326.4 258.8 306.7 41.2-6.4 61.4-54.6 42.5-91.7-23.1-45.4 9.9-98.4 60.9-98.4h79.7c35.8 0 64.8-29.6 64.9-65.3C511.5 97.1 368.1-26.9 204.3 5zM96 320c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm32-128c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm128-64c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm128 64c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z"/></svg>
              </span>
            </button>`
  }

  get backgroundColorButtons () {
    return `<input type="color" style="width:0;height:0;padding:0;margin-top:20px;visibility:hidden"
                   data-trix-target="backgroundColorPicker" data-action="trix#backgroundColorChanged">
            <button type="button" class="trix-button" data-action="click->trix#openBackgroundColorPicker" title="Text background color">
              <span class="icon">
                <svg xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path d="M512 320s-64 92.7-64 128c0 35.4 28.7 64 64 64s64-28.7 64-64-64-128-64-128zm-9.4-102.9L294.9 9.4C288.7 3.1 280.5 0 272.3 0s-16.4 3.1-22.6 9.4l-81.6 81.6L81.9 4.8c-6.3-6.3-16.4-6.3-22.6 0L36.7 27.4c-6.2 6.3-6.2 16.4 0 22.6l86.2 86.2-94.8 94.8c-37.5 37.5-37.5 98.3 0 135.8l117.2 117.2c18.7 18.7 43.3 28.1 67.9 28.1 24.6 0 49.1-9.4 67.9-28.1l221.6-221.6c12.5-12.5 12.5-32.8 0-45.3zm-116.2 71H65.9c1.4-3.8 3.6-8 7.4-11.8l13.2-13.2 81.6-81.6 58.6 58.6c12.5 12.5 32.8 12.5 45.2 0s12.5-32.8 0-45.2l-58.6-58.6 59-59 162.4 162.4-48.3 48.3z"/></svg>
              </span>
            </button>`
  }

  get textAlignButtons () {
    return `<button type="button" class="trix-button" data-trix-attribute="textAlignCenter">
              <span class="icon">
                <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path d="M432 160H16a16 16 0 0 0 -16 16v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16v-32a16 16 0 0 0 -16-16zm0 256H16a16 16 0 0 0 -16 16v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16v-32a16 16 0 0 0 -16-16zM108.1 96h231.8A12.1 12.1 0 0 0 352 83.9V44.1A12.1 12.1 0 0 0 339.9 32H108.1A12.1 12.1 0 0 0 96 44.1V83.9A12.1 12.1 0 0 0 108.1 96zm231.8 256A12.1 12.1 0 0 0 352 339.9v-39.8A12.1 12.1 0 0 0 339.9 288H108.1A12.1 12.1 0 0 0 96 300.1v39.8a12.1 12.1 0 0 0 12.1 12.1z"/></svg>
              </span>
            </button>`
  }
}