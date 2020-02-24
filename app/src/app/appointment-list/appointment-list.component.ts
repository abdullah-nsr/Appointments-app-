import { Component, OnInit } from '@angular/core';
import { Appointment } from './../Appointment';
import { AppointmentsService } from './../appointments.service'
import { pipe } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.scss']
})
export class AppointmentListComponent implements OnInit {

  public loading = true;
  public errorMsg:string;
  public successMsg: string; // 
  public appointments: Appointment[]; // var when they come back from api
  public columns = ['appointmentDate', 'name', 'email', 'cancel']; 
  constructor(private appointmentService: AppointmentsService) { }

  ngOnInit(): void {
    this.appointmentService.getAppointments().subscribe(
      (appointments: Appointment[])=> {
        this.appointments = appointments;
        this.loading = false;

      },
      (error: ErrorEvent) => {
        this.errorMsg = error.error.message;
        this.loading = false;
      }); 
  }

  cancelAppointment(id: string) {
    this.appointmentService.cancelAppointment(id) // althought we don't want to do any thing with the data that come from the request we want to relloade tha table we are going to use 
    .pipe(
      mergeMap(() => this.appointmentService.getAppointments())
    ) // rxjs operate 
    .subscribe((appointments: Appointment[]) => {
      this.appointments = appointments;
      this.successMsg = 'Successfully cancelled the appointment';
    },
    (error: ErrorEvent) => {
      this.errorMsg = error.error.message;
    });
  }
}
