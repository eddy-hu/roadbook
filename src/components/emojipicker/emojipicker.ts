import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { EmojiProvider } from "../../providers/emoji/emoji";

export const EMOJI_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => EmojipickerComponent),
  multi: true
}

@Component({
  selector: 'emojipicker',
  templateUrl: 'emojipicker.html',
  providers: [EMOJI_ACCESSOR]
})

export class EmojipickerComponent implements ControlValueAccessor {

  emojiArray = [];
  content: string;
  onChanged: Function;
  onTouched: Function;

  constructor(emojiProvider: EmojiProvider) {
    this.emojiArray = emojiProvider.getEmojis();
  }

  writeValue(obj: any): void {
    this.content = obj;
  }
  registerOnChange(fn: any): void {
    this.onChanged = fn;
    this.setValue(this.content);
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setValue(val: any): any {
    this.content += val;
    if (this.content) {
      this.onChanged(this.content);
    }
  }
}