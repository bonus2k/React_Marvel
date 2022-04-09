import './findChar.scss';
import {useCallback, useState} from "react";
import Error from "../error/Error";
import useMarvelService from "../../services/MarvelService";
import {NavLink} from "react-router-dom";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";


const FindChar = () => {
    const [character, setCharacter] = useState({});
    const {loading, error, getCharacterName, clearError} = useMarvelService();

    const getChar = useCallback((name) => {
        clearError();
        getCharacterName(name)
            .then(setCharacter); // eslint-disable-next-line
    }, [])


    {
        const
            errorMsg = (error && !loading) ? <Error/> : null,
            view = <View getChar={getChar} character={character} loading={loading}/>;

        return (
            <div className="find__main">
                {errorMsg}
                {view}
            </div>
        )
    }
}

function View(props) {
    let {character} = props;

    function validate (){
        character = {};
        return Yup.object({
            char: Yup.string()
                .min(3, "The length name is least 3 characters")
                .required("Required name")
        })
    }

    function ValidateChar(){

        if (character && character.id === 1) {
            return (
                <div className="find__msg find__msg-err">
                    The character was not found. Check the name and try again
                </div>
            )
        }

        if (character && character.id > 1) {

            return (
            <>
                <div className="find__char-info find__info">
                    <div className="find__msg find__msg-ok">
                        There is! Visit {character.name} page
                    </div>
                </div>

                <NavLink className="button button__secondary" to={`/char/${character.id}`}>
                    <div className="inner">TO PAGE</div>
                </NavLink>
            </>
            )
        }

        return null;
    }

    const dataFind = {
        char: ''
    }

    return (
        <Formik
            initialValues={dataFind}
            validationSchema={validate}
            onSubmit={ (values) => {props.getChar(values.char)}}
        >
            {({isValid}) => (<Form>
                <div className="find__char">Or find a character by name:</div>

                <Field className="find__char-input find__info"
                    id="char"
                    name="char"
                    type="text"
                    placeholder="Enter name"
                />

                <button
                    className="button button__main"
                    disabled={props.loading}
                    type="submit">
                    <div className="inner">FIND</div>
                </button>
                    {
                        (isValid) ? <ValidateChar/> :
                            <ErrorMessage className="find__msg find__msg-err" name='char' component='div'/>
                    }
            </Form>
            )}
        </Formik>
    )
}

export default FindChar;