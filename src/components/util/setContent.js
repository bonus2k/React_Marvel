import Skeleton from "../skeleton/Skeleton";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";


const setContent = (process, Container, data) => {
    switch (process) {
        case 'wait':
            return <Skeleton/>
        case 'loading':
            return <Spinner/>
        case 'done':
            return  <Container data={data}/>
        case 'error':
            return <Error/>
        default:
            new Error('SyntaxError: Unexpected process')
    }
}

export default setContent;