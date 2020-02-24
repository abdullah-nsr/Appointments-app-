import { Component, OnInit } from '@angular/core';
import { AppointmentsService } from './../appointments.service'
import { Appointment } from '../Appointment';
@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {

  public successMsg: string;
  public errorMsg: string;
  public appointmentDate: string;
  public name: string;
  public email: string;
  constructor(private appointmentService: AppointmentsService) { }

  // we don't need to do any thing in the inseliyztion of this component
  ngOnInit(): void {
  }
  // we need to create a function
  creatAppointment() {
    this.errorMsg = '';
    this.successMsg = '';
    console.log("appointmentDate: " + this.appointmentDate);
    console.log("name: " + this.name);
    console.log("email: " + this.email);
    this.appointmentService.createAppointment(this.appointmentDate, this.name, this.email)
      .subscribe((creatAppointment: Appointment) => {
        this.appointmentDate = '';
        this.name = '';
        this.email = '';
        const appointmentDate = new Date(creatAppointment.appointmentDate).toDateString();
        this.successMsg = `Appointment Booked successfully for ${appointmentDate}`;
      }, 
      (error: ErrorEvent) => {
        this.errorMsg = error.error.message;
      })
  }

}
