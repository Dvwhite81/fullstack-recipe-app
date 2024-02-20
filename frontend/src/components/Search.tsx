import { SyntheticEvent } from 'react';
import { Button, Container, Form } from 'react-bootstrap';

interface SearchProps {
  query: string
  setQuery: (value: string) => void
  handleSubmit: (e: SyntheticEvent) => void
}

const Search = ({ query, setQuery, handleSubmit }: SearchProps) => {
  return (
    <Container fluid>
      <h2 className='pad-left'>Search</h2>
      <Form
        onSubmit={handleSubmit}
        className='d-flex flex-column w-50 mx-auto gap-2 mb-2'
      >
        <Form.Control
          type='text'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='Enter a dish or ingredient...'
        />
        <Button variant='primary' type='submit'>
          Search
        </Button>
      </Form>
    </Container>
  );
};

export default Search;
