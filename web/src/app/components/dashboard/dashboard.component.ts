import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddressTableComponent } from '../address-table/address-table.component';
import { environment } from '../../environment';
import { Person } from '../../Person';
import { TableComponent } from '../table/table.component';
import { Address } from '../../Address';
import { PeopleTableComponent } from '../people-table/people-table.component';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css',
    imports: [CommonModule, FormsModule, HttpClientModule, AddressTableComponent, PeopleTableComponent, TableComponent]
})

export class DashboardComponent {
  person: Person = {
    name: '',
    email: '',
    id: 0,
    gender: '',
    birthday: '',
    maritalstatus: '',
    is_admin: false,
  };
  addresses: Address[] = [];
  isBirthDay: boolean = false;
  people: Person[] = [];
  
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadUserData();
    this.loadPeople();
    this.loadUserAddresses();
  }
  
  loadUserData(): void {
    const id = localStorage.getItem("id")

    if (!id) {
      console.error('No user ID found in local storage');
      window.location.href = '/';
      return;
    }

    this.http.get<any>(environment.apiUrl + '/person/' + id)
      .subscribe(
        data => {
          this.person = data.person;

          if (this.person.birthday) {
            const today = new Date();
            const birthday = new Date(this.person.birthday);
            this.isBirthDay = today.getDate() === birthday.getDate() && today.getMonth() === birthday.getMonth();
          }
        },
        error => {
          console.error('Error loading addresses:', error);
        }
      );
  }

  loadPeople(): void {
    this.http.get<any>(environment.apiUrl + '/person')
      .subscribe(
        data => {
          this.people = data.people;
        },
        error => {
          console.error('Error loading addresses:', error);
        }
      );
  }

  loadUserAddresses(): void {
    const id = localStorage.getItem("id")

    this.http.get<any>(environment.apiUrl + '/address/' + id + '/person')
      .subscribe(
        data => {
          this.addresses = data.addresses;
        },
        error => {
          console.error('Error loading addresses:', error);
        }
      );
  }

  handleLogout(){
    localStorage.clear();
    window.location.href = '/';
  }
}
