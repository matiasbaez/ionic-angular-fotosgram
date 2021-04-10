import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { AvatarSelectorComponent } from './avatar-selector/avatar-selector.component';
import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './post/post.component';
import { MapComponent } from './map/map.component';

import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  declarations: [
    PostComponent,
    PostsComponent,
    AvatarSelectorComponent,
    MapComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule
  ],
  exports: [ PostsComponent, AvatarSelectorComponent ]
})
export class ComponentsModule { }
