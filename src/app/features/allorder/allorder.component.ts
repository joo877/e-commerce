import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { UserorderService } from './services/userorder.service';
import { AuthService } from '../../core/auth/services/auth.service';
import { Useritem } from './interface/useritem.interface';

@Component({
  selector: 'app-allorder',
  imports: [],
  templateUrl: './allorder.component.html',
  styleUrl: './allorder.component.css',
})
export class AllorderComponent implements OnInit {
  private readonly userorderService = inject(UserorderService);
  private readonly authService = inject(AuthService);

  userItem: Useritem[] = [];
  id: string | null = null;

  ngOnInit(): void {
    this.getId();
    this.getUserOrder();
  }

  getId(): void {
    this.id = this.authService.dedcodeToken().id;
  }

  getUserOrder(): void {
    this.userorderService.getUserOrder(this.id).subscribe({
      next: (res) => {
        console.log(res);
        this.userItem = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
