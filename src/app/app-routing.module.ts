import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleComponent } from './articles/article/article.component';
import { ArticlesComponent } from './articles/articles.component';
import { MainComponent } from './main/main.component';
import { MaketComponent } from './makets/maket/maket.component';
import { MaketsComponent } from './makets/makets.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
  },
  {
    path: 'articles',
    component: ArticlesComponent,
    
  },
  {
    path: 'articles/:id',
    component: ArticleComponent,
  },
  {
    path: 'makets',
    component: MaketsComponent,
    
  },
  {
    path: 'makets/:id',
    component: MaketComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
