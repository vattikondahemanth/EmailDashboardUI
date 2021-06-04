import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SMMdashbordComponent } from './smmdashbord.component'

const routes: Routes = [
    {
      path: '',
      component: SMMdashbordComponent,
      data: {
        title: 'smm_dashboard'
      }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class SMMdashboardRoutingModule {}