import { useMutation } from '@apollo/client';

function Mutator(props) {
    const [handleMutate, { data }] = useMutation(props.query);

  return (
    <div>
    {props.children(handleMutate,data)}
    </div>
  );
}

export default Mutator;
