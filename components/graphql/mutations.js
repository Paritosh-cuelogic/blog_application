import { gql } from "@apollo/client";

export const UPDATE_BLOG = gql`
  mutation updateBlog($id: ID!, $title: String!, $body: String!) {
    updateBlog(
      input: { where: { id: $id }, data: { title: $title, body: $body } }
    ) {
      blog {
        id
        title
        body
      }
    }
  }
`;
