import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CanvasRoutingModule } from './canvas-routing.module';
import { CanvasComponent } from './canvas/canvas.component';
import { MainComponentComponent } from './main-component/main-component.component';
import { PropsComponent } from './props/props.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
  declarations: [
    CanvasComponent,
    ToolbarComponent,
    PropsComponent,
    MainComponentComponent,
  ],
  imports: [CommonModule, CanvasRoutingModule],
})
export class CanvasModule {}
