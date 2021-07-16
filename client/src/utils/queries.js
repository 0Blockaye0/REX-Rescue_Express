import gql from 'graphql-tag';

export const QUERY_DOGS = gql`
  query getDogs($category: ID) {
    dogs(category: $category) {
      _id
      name
      description
      breed
      age
      price
      image
      category {
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
      breed
      age
      price
      category {
        name
      }
    }
  }
`;

export const QUERY_CATEGORIES = gql`
{
  categories {
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
        breed
        age
        price
        image
      }
    }
  }
}
`;