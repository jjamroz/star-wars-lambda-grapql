export const CHARACTERS = {
  CREATE_MUTATION: `
    mutation createCharacter($input: CharacterInput!){
      createCharacter(input:$input){
        id
        name
        episodes
        planet
      } 
    }
  `,
  CREATE_MUTATION_NO_ID: `
    mutation createCharacter($input: CharacterInput!){
      createCharacter(input:$input){
        name
        episodes
        planet
      } 
    }
  `,
  DELETE_MUTATION: `
  mutation deleteCharacter($id: String!){ 
    deleteCharacter(id:$id){
      id
      name
      episodes
      planet
    } 
  }
`,
  GET_ALL_QUERY: `
  query getAllCharacters($limit: Int, $lastEvaluatedKey: String){ 
    getAllCharacters(limit: $limit, lastEvaluatedKey: $lastEvaluatedKey){
    items {
      id
      name
    }
    lastEvaluatedKey
  }
}`,
  GET_QUERY: `
  query getCharacter($id: String!){ 
    getCharacter(id:$id){
      id
      name
      episodes
      planet
    } 
  }`,
  UPDATE_MUTATION: `
  mutation updateCharacter($input: UpdateCharacterInput!){
    updateCharacter(input:$input){
        id
        name
        episodes
        planet
    } 
  }
`,
};
