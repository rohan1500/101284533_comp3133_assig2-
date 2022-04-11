import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from "@angular/router";
import { Apollo, gql } from "apollo-angular";

const ADD_BOOKING = gql`
mutation addBooking($hotel_id: Float!, $booking_date: String!, $booking_start: String!, $booking_end: String!,$user_id: Float!) {
  addBooking(hotel_id: $hotel_id, booking_date: $booking_date, booking_start: $booking_start, booking_end: $booking_end, user_id: $user_id) {
user_id
hotel_id
}
}
`;
@Component({
  selector: 'create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.css']
})
export class ReserveComponent implements OnInit {

  hotel_id = 0;
  booking_date = "";
  booking_start = "";
  booking_end = "";
  user_id = 0;

  query: any;

  constructor(private router: Router, private apollo: Apollo) { }

  ngOnInit(): void {
  }

  onSubmit(loginForm: NgForm): void {
    this.hotel_id = loginForm.value.id;
    this.booking_date = loginForm.value.booking_date;
    this.booking_start = loginForm.value.booking_start;
    this.booking_end = loginForm.value.booking_end;
    this.user_id = loginForm.value.user_id

    this.query = this.apollo
    .mutate({
    mutation: ADD_BOOKING,
    variables: {
    hotel_id: this.hotel_id,
    booking_date: this.booking_date,
    booking_start: this.booking_start,
    booking_end: this.booking_end,
    user_id: this.user_id
}
})
.subscribe( (data) => {
console.log(data);
alert("Succes")
})
  }
}