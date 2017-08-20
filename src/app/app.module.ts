import Raven from 'raven-js';
import { ApplicationRef, ErrorHandler, NgModule } from '@angular/core';
import { createInputTransfer, createNewHosts, removeNgStyles } from '@angularclass/hmr';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeModule } from './pages/home/home.module';
import { SharedModule } from './shared/shared.module';
import { SheltersModule } from './shelters/shelters.module';
import { MetaModule } from '@ngx-meta/core';
import { NotFoundModule } from './pages/not-found/not-found.module';
import { ENV_PROVIDERS } from './environment';
import { AppState, InternalStateType } from './app.service';
import { AboutComponent } from './pages/about/about.component';
import { AboutSheltersComponent } from './pages/about-shelters/about-shelters.component';
import {
  MdButtonModule,
  MdDialogModule,
  MdIconModule,
  MdListModule,
  MdSidenavModule,
  MdToolbarModule
} from '@angular/material';
import '../styles/base.scss';
import { DialogComponent } from './shared/dialog/dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RavenErrorHandler } from './raven-error-handler';
import { SheltersDetailComponent } from 'app/pages/shelters-detail/shelters.detail.component';
import { SheltersListComponent } from 'app/pages/shelters-list/shelters.list.component';
import { SheltersSearchComponent } from 'app/pages/shelters-search/shelters-search.component';

// Application wide providers
const APP_PROVIDERS = [
  AppState
];

interface StoreType {
  state: InternalStateType;
  restoreInputValues: () => void;
  disposeOldHosts: () => void;
}

if (ENV !== 'development') {
  Raven
    .config(`https://${SENTRY_KEY}@sentry.io/${SENTRY_PROJECT}`, {
      environment: ENV
    })
    .install();
}

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    HomeModule,
    SharedModule.forRoot(),
    SheltersModule,
    MetaModule.forRoot(),
    NotFoundModule,
    MdSidenavModule,
    MdToolbarModule,
    MdListModule,
    MdButtonModule,
    MdIconModule,
    MdDialogModule,
    BrowserAnimationsModule,
  ],
  declarations: [
    AppComponent,
    AboutComponent,
    AboutSheltersComponent,
    DialogComponent,
    SheltersDetailComponent,
    SheltersListComponent,
    SheltersSearchComponent,
  ],
  providers: [
    ENV_PROVIDERS,
    APP_PROVIDERS,
    { provide: ErrorHandler, useClass: RavenErrorHandler }
  ],
  entryComponents: [
    DialogComponent,
  ],
  bootstrap: [AppComponent]

})
export class AppModule {

  constructor(
    public appRef: ApplicationRef,
    public appState: AppState
  ) {}

  public hmrOnInit(store: StoreType) {
    if (!store || !store.state) {
      return;
    }
    console.log('HMR store', JSON.stringify(store, null, 2));
    // set state
    this.appState._state = store.state;
    // set input values
    if ('restoreInputValues' in store) {
      const restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  public hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map((cmp) => cmp.location.nativeElement);
    // save state
    const state = this.appState._state;
    store.state = state;
    // recreate root elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // save input values
    store.restoreInputValues  = createInputTransfer();
    // remove styles
    removeNgStyles();
  }

  public hmrAfterDestroy(store: StoreType) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
