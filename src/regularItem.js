import { LightningElement, api, track } from "lwc";

export default class RegularItem extends LightningElement {
  @api text;
  @track selected = false;

  handleClick(event) {
    this.dispatchEvent(
        new CustomEvent('privateitemselect', {
            bubbles: true,
            cancelable: true,
            composed: true,
            detail: {
                text: this.text
            }
        })
    );
  }

  connectedCallback() {
    this.dispatchEvent(
      new CustomEvent('privateitemregister', {
          bubbles: true,
          cancelable: true,
          detail: {
              callbacks: {
                  select: this.select.bind(this),
                  deselect: this.deselect.bind(this)
              },
              text: this.text
          }
      })
    );
  }

  select() {
    this.selected = true;
  }

  deselect() {
    this.selected = false;
  }
}