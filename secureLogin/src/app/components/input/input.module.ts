import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { InputComponent } from './input.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [InputComponent],
    imports: [CommonModule, IonicModule, FormsModule],
    exports: [InputComponent],
})
export class InputModule {}