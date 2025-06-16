import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialogActions, MatDialogContent, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { SnackbarService } from '../../../../shared/snackbar/services/snackbar.service';

@Component({
  selector: 'app-dialog-logout',
  imports: [ MatDialogModule, MatDialogContent, MatDialogActions, MatButton ],
  templateUrl: './dialog-logout.component.html',
  styleUrl: './dialog-logout.component.css'
})
export class DialogLogoutComponent {

  constructor(
    private readonly dialogRef: MatDialogRef<DialogLogoutComponent>,
    private router: Router,
    private loginService: LoginService,
    private snackbarService: SnackbarService
  ) {}
  
  closeDialog(): void {
    this.dialogRef.close();
  }

  logout(): void {
    this.router.navigate(['/login']);
    this.loginService.logout().subscribe({
      next: (response) => {
        this.snackbarService.displaySuccess(response.message)
      }
    })
    this.closeDialog()
  }

}
