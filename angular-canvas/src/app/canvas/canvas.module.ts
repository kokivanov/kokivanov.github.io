import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CanvasRoutingModule } from './canvas-routing.module';
import { CanvasComponent } from './canvas/canvas.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { PropsComponent } from './props/props.component';


@NgModule({
  declarations: [
    CanvasComponent,
    ToolbarComponent,
    PropsComponent
  ],
  imports: [
    CommonModule,
    CanvasRoutingModule
  ]
})
export class CanvasModule { }
