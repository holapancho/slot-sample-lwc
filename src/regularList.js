import { LightningElement, track } from "lwc";
const ALLOWED_CHILDREN = 'REGULAR-ITEM';
export default class RegularList extends LightningElement {
  @track selectedItem;
  items = [];

  handleItemRegister(event) {
    event.stopPropagation();

    const target = event.target,
        callbacks = event.detail.callbacks,
        itemText = event.detail.text,
        isItemSelected = this.selectedItem === itemText;

    if (target.nodeName.includes(ALLOWED_CHILDREN)) {
        const item = {
            name: itemText,
            callbacks
        };
        this.items.push(item);
    }
  }

  handleItemSelect(event) {
    event.stopPropagation();
    this.selectNavigationItem(event.detail.text);
  }

  selectNavigationItem(itemText) {
    this.selectedItem = itemText;
    this.items.forEach((item) => {
        if (item.name === itemText) {
            item.callbacks.select();
        } else {
            item.callbacks.deselect();
        }
    });
  }
}