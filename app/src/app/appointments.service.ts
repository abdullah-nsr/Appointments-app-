import { Injectable } from '@angular/core';
import { environment } from './../environments/environment';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Appointment } from './Appointment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  private BASE_URL = environment.API_URL;

  constructor(private http: HttpClient) { }

  getAppointments(): Observable<Appointment[]> {
    return  this.http.get<Appointment[]>(`${this.BASE_URL}/appointments`)
  }

  createAppointment(appointmentDate: string, name: string, email: string) : Observable<Appointment> {
    return this.http.post<Appointment>(`${this.BASE_URL}/appointments`, 
    {appointmentDate, name, email})
  }
  cancelAppointment(id: string): Observable<any> {
    return this.http.delete<any>(`${this.BASE_URL}/appointments/${id}`);
  }
}
