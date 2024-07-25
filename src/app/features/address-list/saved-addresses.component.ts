import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoModule } from '@ngneat/transloco';
import { AngularMaterialImportsModule } from 'src/app/shared/angular-material-imports/angular-material-imports.module';
import { SnackBarComponent } from 'src/app/shared/snack-bar-custom/snack-bar.component';

@Component({
  selector: 'app-saved-addresses',
  templateUrl: './saved-addresses.component.html',
  styleUrls: ['./saved-addresses.component.scss'],
  imports: [AngularMaterialImportsModule, NgFor, NgIf, TranslocoModule],
  standalone: true,
})
export class SavedAddressesComponent implements OnInit {
  public savedAddress: any;

  public constructor(private _snackBar: MatSnackBar) {}

  public ngOnInit(): void {
    this.loadSavedAddress();
  }

  public loadSavedAddress(): void {
    const savedAddressJson = localStorage.getItem('saved_address');
    if (savedAddressJson) {
      this.savedAddress = JSON.parse(savedAddressJson);
    }
  }

  public clearSavedAddresses(): void {
    localStorage.removeItem('saved_address');
    this.savedAddress = null;
    this.openSnackBar('Endereço salvo removido', 2000);
  }

  public openSnackBar(data: string, duration: number) {
    this._snackBar.openFromComponent(SnackBarComponent, {
      data: data,
      duration: duration,
    });
  }
}
