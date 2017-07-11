import { ApplicationRef, NgModule } from '@angular/core';
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
import { MdButtonModule, MdIconModule, MdListModule, MdSidenavModule, MdToolbarModule } from '@angular/material';
import '../styles/base.scss';

// Application wide providers
const APP_PROVIDERS = [
  AppState
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

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
  ],
  declarations: [
    AppComponent,
    AboutComponent,
    AboutSheltersComponent,
  ],
  providers: [
    ENV_PROVIDERS,
    APP_PROVIDERS,
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
