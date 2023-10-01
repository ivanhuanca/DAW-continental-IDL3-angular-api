import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-autoselect',
  templateUrl: './autoselect.component.html',
  styleUrls: ['./autoselect.component.css']
})
export class AutoselectComponent {
  @Input() selection: any;
  @Input() data: any;
}
