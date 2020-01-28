import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Container, } from "reactstrap";
import './styles/index.scss';
import MainButton from '../../components/General/MainButton/'
import InputComponent from '../../components/General/InputComponent/'
import Header from '../../components/Header'

const MyHome = () => {

    const styleInput = {
        //  padding: '18px 20px',
    }
    const [value, setValue] = useState("");
    return (
        <div >
            <Container>
                <div>
                    <MainButton //default button
                        title='Отправить мне письмо'
                        disabled={false}
                    />
                    <br /><br />
                    <MainButton //disable button
                        title='Отправить мне письмо'
                        disabled={true}
                    />
                    <br /><br />
                    <InputComponent //complete input
                        onChangeInput={setValue}
                        inputVal={value}
                        placeholder="Рабочая почта"
                        style={styleInput}
                        complete={true}
                    />

                    <br /><br />
                    <InputComponent //default input
                        onChangeInput={setValue}
                        inputVal={value}
                        placeholder="Рабочая почта"
                        style={styleInput}
                    />

                    <br /><br />
                    <InputComponent //disable input
                        onChangeInput={setValue}
                        inputVal={value}
                        placeholder="Рабочая почта"
                        style={styleInput}
                        disabled={true}
                    />
                    <br /><br />
                    <InputComponent //disable input подтвердить
                        onChangeInput={setValue}
                        inputVal={value}
                        placeholder="Рабочая почта"
                        style={styleInput}
                        disabled={true}
                        confirm={true}
                    />
                    <br /><br />
                    <InputComponent //error input
                        onChangeInput={setValue}
                        inputVal={value}
                        placeholder="Рабочая почта"
                        style={styleInput}
                        invalid={true}
                    />

                    <br /><br />
                    <InputComponent //edit input
                        onChangeInput={setValue}
                        inputVal={value}
                        placeholder="Рабочая почта"
                        style={styleInput}
                        edit={true}
                    />
                    <br/><br/>
               
                </div>
            </Container>
        </div>
    )
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = dispatch => bindActionCreators(
    {
    },
    dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(MyHome);