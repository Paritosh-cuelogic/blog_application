import { gql } from "@apollo/client";

export const LOAD_BLOGS = gql`
  query {
    blogs {
      id
      title
      body
      banner {
        url
      }
    }
  }
`;

export const LOAD_BLOG = gql`
  query blog($id: ID!) {
    blog(id: $id) {
      id
      title
      body
      banner {
        url
      }
    }
  }
`;

export const LOAD_BLOGS_WITH_LIMIT = gql`
  query {
    blogs(limit: 3) {
      id
      title
      body
      banner {
        url
      }
    }
  }
`;

export const LOAD_BLOG_BY_ID = gql`
  query getblogbyid($id: ID!) {
    blog(id: $id) {
      id
      title
      body
      banner {
        url
      }
      categories {
        name
      }
    }
  }
`;
