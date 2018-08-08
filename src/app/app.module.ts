import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';


import {AppComponent} from './app.component';
import {LoginFormComponent} from './login-form/login-form.component';
import {FooterComponent} from './footer/footer.component';
import {HeaderComponent} from './header/header.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './auth.guard';
import {UserService} from './user.service';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { AppRoutingModule } from './app-routing.module';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeService } from './recipes/recipe.service';
import { DataStorageService } from './shared/data-storage.service';
import { RecipeSearchComponent } from './recipes/recipe-search/recipe-search.component';
import { SearchListComponent } from './recipes/recipe-search/search-list/search-list.component';
import { SearchKeywordComponent } from './recipes/recipe-search/search-keyword/search-keyword.component';

// const appRoutes: Routes = [{
//   path: '',
//   component: LoginFormComponent

// },
//   {
//     path: 'dashboard',
//     canActivate: [AuthGuard],
//     component: DashboardComponent
//   }
// ];

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    FooterComponent,
    HeaderComponent,
    DashboardComponent,
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    DropdownDirective,
    RecipeStartComponent,
    RecipeEditComponent,
    RecipeSearchComponent,
    SearchListComponent,
    SearchKeywordComponent
  ],
  imports: [
    // RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [UserService, AuthGuard, RecipeService, ShoppingListService, DataStorageService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
