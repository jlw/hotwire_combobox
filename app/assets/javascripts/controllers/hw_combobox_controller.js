import Combobox from "models/combobox"
import { Concerns } from "helpers"
import { Controller } from "@hotwired/stimulus"

const concerns = [
  Controller,
  Combobox.Actors,
  Combobox.AsyncLoading,
  Combobox.Autocomplete,
  Combobox.Dialog,
  Combobox.Filtering,
  Combobox.MultipleSelection,
  Combobox.Navigation,
  Combobox.Options,
  Combobox.Selection,
  Combobox.Toggle,
  Combobox.Validity
]

export default class HwComboboxController extends Concerns(...concerns) {
  static classes = [
    "invalid",
    "selected"
  ]

  static targets = [
    "combobox",
    "dialog",
    "dialogCombobox",
    "dialogFocusTrap",
    "dialogListbox",
    "handle",
    "hiddenField",
    "listbox",
    "multipleSelections",
    "paginationFrame"
  ]

  static values = {
    asyncSrc: String,
    autocompletableAttribute: String,
    autocomplete: String,
    expanded: Boolean,
    filterableAttribute: String,
    isMultiple: Boolean,
    multipleSelections: Object,
    nameWhenNew: String,
    originalName: String,
    prefilledDisplay: String,
    smallViewportMaxWidth: String
  }

  initialize() {
    this._initializeActors()
    this._initializeFiltering()
  }

  connect() {
    this._connectSelection()
    this._connectListAutocomplete()
    this._connectDialog()
  }

  disconnect() {
    this._disconnectDialog()
  }

  expandedValueChanged() {
    if (this.expandedValue) {
      this._expand()
    } else {
      this._collapse()
    }
  }

  isMultiple() {
    return this.hasIsMultipleValue && this.isMultipleValue
  }

  paginationFrameTargetConnected() {
    this._preselectOption()
  }
}
