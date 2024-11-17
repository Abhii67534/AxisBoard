import { RouterModule, Routes } from '@angular/router';
import { MainviewComponent } from './components/mainview/mainview.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: MainviewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Corrected this line
  exports: [RouterModule]
})
export class AppRoutingModule { }
