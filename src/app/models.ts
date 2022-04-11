import { gql } from "apollo-angular";

export const USER_ID = '';
export const USER_TYPE = '';
export const AUTHENTICATED = 'false';
export const GetAdminListing = gql`
  query Query($userId: String!) {
    getListingsByAdmin(userId: $userId) {
      listing_id
      listing_title
      description
      street
      city
      postal_code
      price
      email
      username
    }
  }
`
export const GetBooking = gql`
    query Query($userId: String!) {
      getBookingsByUser(userId: $userId) {
        listing_id
        booking_id
        booking_date
        booking_start
        booking_end
        username
      }
    }
  `
export const GetListing = gql`{
  getListings {
    listing_id
    listing_title
    description
    street
    city
    postal_code
    price
    email
    username
  }
}`