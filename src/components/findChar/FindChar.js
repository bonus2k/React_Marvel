import './findChar.scss';
import {useCallback, useEffect, useState} from "react";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";
import useMarvelService from "../../services/MarvelService";
import {Link} from "react-router-dom";
import {Formik, Form, Field, ErrorMessage} from "formik";


const FindChar = () => {
    const [character, setCharacter] = useState({});
    const {loading, error, getCharacterName, clearError} = useMarvelService();

    const getChar = useCallback((name) => {
        clearError();
        getCharacterName(name)
            .then(setCharacter);
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

    console.log(props.character);


    function validate (values){
        const errors = {};
        if (values.char.length !==0 && values.char.length < 3){
            errors.char = "The length name is least 3 characters"
        }
        else if (!values.char){
            errors.char = "Required name"
        }
        return errors;
    };

    function ValidateChar(){

        if (props.character.id && props.character.id == 1) {
            return (
                <div className="find__msg find__msg-err">
                    The character was not found. Check the name and try again
                </div>
            )
        }

        if (props.character.id && props.character.id != 1) {

            return (
            <>
                <div className="find__char-info find__info">
                    <div className="find__msg find__msg-ok">
                        There is! Visit {props.character.name} page
                    </div>
                </div>
                <a href="localhost" className="button button__secondary">
                    <div className="inner">TO PAGE</div>
                </a>
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
            validate={validate}
            onSubmit={ (values) => {props.getChar(values.char)}}
        >
            {({isValidating }) => (<Form>
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

                    <ErrorMessage className="find__msg find__msg-err" name='char' component='div'/>
                    <ValidateChar/>

            </Form>
            )}
        </Formik>
    )
}

export default FindChar;