import { WebpackAsyncRoute } from '@angularclass/webpack-toolkit';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home';
import { About } from './about';
import { Detail } from './+detail';
import { NoContent } from './no-content';

import { DataResolver } from './app.resolver';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: 'about', component: About,
    resolve: {
      'yourData': DataResolver
    }
  },
  // async components with children routes must use WebpackAsyncRoute
  { path: 'detail', component: Detail,
    canActivate: [ WebpackAsyncRoute ],
    children: [
      { path: '', component: 'Index' }  // must be included
    ]},
  { path: '**',    component: NoContent }
];

const appRoutes: Routes = [
  ...routes
];

export const appRoutingProviders: any[] = [];

export const routing = RouterModule.forRoot(appRoutes);
