import Combobox from "hw_combobox/models/combobox/base"
import { visible } from "hw_combobox/helpers"

Combobox.Options = Base => class extends Base {
  _resetOptionsSilently() {
    this._resetOptions(this._deselect.bind(this))
  }

  _resetOptionsAndNotify() {
    this._resetOptions(this._deselectAndNotify.bind(this))
  }

  _resetOptions(deselectionStrategy) {
    this._fieldName = this.originalNameValue
    deselectionStrategy()
  }

  _optionElementWithValue(value) {
    return this._actingListbox.querySelector(`[${this.filterableAttributeValue}][data-value='${value}']`)
  }

  _displayForOptionElement(element) {
    return element.getAttribute(this.autocompletableAttributeValue)
  }

  get _allowNew() {
    return !!this.nameWhenNewValue
  }

  get _allOptions() {
    return Array.from(this._allFilterableOptionElements)
  }

  get _allFilterableOptionElements() {
    return this._actingListbox.querySelectorAll(`[${this.filterableAttributeValue}]:not([data-multiselected])`)
  }

  get _visibleOptionElements() {
    return [ ...this._allFilterableOptionElements ].filter(visible)
  }

  get _selectedOptionElement() {
    return this._actingListbox.querySelector("[role=option][aria-selected=true]:not([data-multiselected])")
  }

  get _multiselectedOptionElements() {
    return this._actingListbox.querySelectorAll("[role=option][data-multiselected]")
  }

  get _selectedOptionIndex() {
    return [ ...this._visibleOptionElements ].indexOf(this._selectedOptionElement)
  }

  get _isUnjustifiablyBlank() {
    const valueIsMissing = this._hasEmptyFieldValue
    const noBlankOptionSelected = !this._selectedOptionElement

    return valueIsMissing && noBlankOptionSelected
  }
}
