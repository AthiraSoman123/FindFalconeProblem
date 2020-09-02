import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FindingFalconeComponent } from './finding-falcone/finding-falcone.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicSelectTravelComponent } from './dynamic-select-travel/dynamic-select-travel.component';
import { HeaderComponent } from './layout/header/header.component';
import { RouterModule } from "@angular/router";
import { FalconeService } from "./falcone-service/falcone.service";
import { DynamicTableComponent } from './layout/dynamic-table/dynamic-table.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ResultComponent } from './result/result.component';
@NgModule({
  declarations: [
    AppComponent,
    FindingFalconeComponent,
    DynamicSelectTravelComponent,
    HeaderComponent,
    DynamicTableComponent,
    FooterComponent,
    ResultComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: "finding-falcone", component: FindingFalconeComponent },
      { path: "result", component: ResultComponent },
      { path: "", redirectTo: "finding-falcone", pathMatch: "full" },
      { path: "**", redirectTo: "finding-falcone", pathMatch: "full" }
    ])
  ],
  providers: [FalconeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
