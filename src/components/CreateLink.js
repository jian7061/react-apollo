import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const CREATE_LINK_MUTATION = gql`
  mutation PostMutation(
    $description: String!
    $url: String!
  ) {
    post(description: $description, url: $url) {
      id
      createdAt
      url
      description
    }
  }
`;
const CreateLink = () => {
const navigate = useNavigate();
  const [formState, setFormState] = useState({
    description: '',
    url: ''
  });
  const [createLink] = useMutation(CREATE_LINK_MUTATION, {//useMutation hook, we need to destructure out a function that can be used to call the mutaton.
    variables: {
      description: formState.description,
      url: formState.url
    },
    onCompleted: () => navigate('/') //automatic redirect from the CreateLink component to the LinkList component after a mutation is performed.
    //onCompleted function that is provided by Apollo when mutations are performed.
  });

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createLink();
        }}
      >
        <div>
          <input
            value={formState.description}
            onChange={(e) =>
              setFormState({
                ...formState,
                description: e.target.value
              })
            }
            type="text"
            placeholder="A description for the link"
          />
          <input
            value={formState.url}
            onChange={(e) =>
              setFormState({
                ...formState,
                url: e.target.value
              })
            }
            type="text"
            placeholder="The URL for the link"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateLink;