import Raven from 'raven-js';
import { ApplicationRef, ErrorHandler, NgModule } from '@angular/core';
import { createInputTransfer, createNewHosts, removeNgStyles } from '@angularclass/hmr';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeModule } from './home/home.module';
import { SharedModule } from './shared/shared.module';
import { SheltersModule } from './shelters/shelters.module';
import { MetaModule } from '@ngx-meta/core';
import { NotFoundModule } from './not-found/not-found.module';
import { ENV_PROVIDERS } from './environment';
import { AppState, InternalStateType } from './app.service';
import { AboutComponent } from './about/about.component';
import { AboutSheltersComponent } from './about-shelters/about-shelters.component';
import {
  MdButtonModule, MdDialogContent, MdDialogModule, MdDialogTitle, MdIconModule, MdListModule, MdSidenavModule,
  MdToolbarModule
} from '@angular/material';
import '../styles/base.scss';
import { DialogComponent } from './dialog/dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Application wide providers
const APP_PROVIDERS = [
  AppState
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

Raven
  .config(`https://${SENTRY_KEY}@sentry.io/${SENTRY_PROJECT}`)
  .install();

export class RavenErrorHandler implements ErrorHandler {
  handleError(err:any) : void {
    Raven.captureException(err.originalError || err);
  }
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
      let restoreInputValues = store.restoreInputValues;
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
