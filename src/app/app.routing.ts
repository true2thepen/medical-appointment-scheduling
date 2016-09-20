import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about';
import { NoContent } from './no-content';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: 'about', component: AboutComponent },
  { path: 'detail', loadChildren: () => System.import('./+detail') },
  { path: '**',    component: NoContent }
];

const appRoutes: Routes = [
  ...routes
];

export const appRoutingProviders: any[] = [];

export const routing = RouterModule.forRoot(appRoutes);
