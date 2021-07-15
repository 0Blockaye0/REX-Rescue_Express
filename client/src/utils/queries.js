import gql from 'graphql-tag';

export const QUERY_DOGS = gql`
  query getDogs($size: ID) {
    dogs(size: $size) {
      _id
      name
      description
      price
      quantity
      image
      size {
        _id
      }
    }
  }
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($dogs: [ID]!) {
    checkout(dogs: $dogs) {
      session
    }
  }
`;

export const QUERY_ALL_DOGS = gql`
  {
    dogs {
      _id
      name
      description
      price
      quantity
      size {
        name
      }
    }
  }
`;

export const QUERY_SIZE = gql`
{
  size {
    _id
    name
  }
}
`;

export const QUERY_USER = gql`
{
  user {
    firstName
    lastName
    orders {
      _id
      purchaseDate
      dogs {
        _id
        name
        description
        price
        quantity
        image
      }
    }
  }
}
`;