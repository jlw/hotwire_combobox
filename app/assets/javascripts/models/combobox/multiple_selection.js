import Combobox from "models/combobox/base"
import { wrapAroundAccess } from "helpers"

Combobox.MultipleSelection = Base => class extends Base {
  deSelectOption(event) {
    const element = event.target
    const value = element.getAttribute("data-value")
    this._commitMultipleSelection({ value }, { selected: false })
    element.parentElement.remove()
    this._markInvalid()
  }

  _connectMultipleSelection() {
    if (this.hasMultipleSelectionsValue) {
      this.multipleSelectionsTarget.innerHTML = ""
      const selectedValues = Object.keys(this.multipleSelectionsValue)
      selectedValues.forEach((selectedValue) => {
        this._renderSelection(selectedValue, this.multipleSelectionsValue[selectedValue])
      })
      this.hiddenFieldTarget.value = JSON.stringify(selectedValues)
    }
  }

  _renderSelection(value, display) {
    const wrapper = document.createElement("div")
    wrapper.id = value
    wrapper.classList.add("hw-combobox__multiple_selection")
    const text = document.createElement("span")
    text.textContent = display
    const closer = document.createElement("span")
    closer.classList.add("hw-combobox__multiple_selection__remove")
    closer.textContent = "✖️"
    closer.setAttribute("data-action", "click->hw-combobox#deSelectOption")
    closer.setAttribute("data-value", value)
    wrapper.appendChild(text)
    wrapper.appendChild(closer)
    this.multipleSelectionsTarget.appendChild(wrapper)
  }

  _commitMultipleSelection(option, { selected }) {
    const newSelections = { ...this.multipleSelectionsValue }
    if (selected) {
      const value = option.getAttribute("id")
      if (value) {
        if (!Object.keys(newSelections).includes(value)) {
          const display = option.textContent
          newSelections[value] = display
          this._renderSelection(value, display)
          this._markSelected(option, { selected: true })
        }
        this._actingCombobox.value = ""
        this.filter({})
      }
    } else {
      const value = option.value
      delete newSelections[value]
      const realOption = this._allOptions.find(realOption => realOption.dataset.value === value)
      if (realOption) this._markSelected(realOption, { selected: false })
    }
    this.multipleSelectionsValue = newSelections
    this.hiddenFieldTarget.value = JSON.stringify(Object.keys(this.multipleSelectionsValue))
  }

  _selectNewForMultiple(query) {
    console.log('_selectNewForMultiple', { query })
  }

  _preselectMultipleOption() {
    if (this._allOptions.length < 1000) {
      const selectedValues = Object.keys(this.multipleSelectionsValue)

      if (selectedValues.length > 0) {
        const options = this._allOptions.filter(option => selectedValues.includes(option.dataset.value))
        options.forEach(option => this._markSelected(option, { selected: true }))
      }
    }
  }
}
