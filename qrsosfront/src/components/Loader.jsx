import { useQuery } from '@apollo/client';
import Lottie from 'react-lottie'
import animationData from "./lootieAnimations/6895-loading-icon.json"

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };


function Loader(props) {
  const { loading, error, data } = useQuery(props.query,{variables:props.variables});

  if (loading) return <Lottie 
                      options={defaultOptions}
                      height={400}
                      width={400}/>;

  if (error) return `Error! ${error.message}`;
  return (
    <div>
    {props.children(data)}
    </div>
  );
}

export default Loader;
