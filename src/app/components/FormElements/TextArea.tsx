import * as React from 'react';
import { default as FormFieldWrapper, FormFieldWrapperProps } from './FormFieldWrapper';
import { FormControl } from 'react-bootstrap';



export default class TextArea extends React.PureComponent<FormFieldWrapperProps>{
    render(){
        const {input:{value, onChange}, label} = this.props;
        return (
            <FormFieldWrapper {...this.props}>
                <FormControl  componentClass="textarea" placeholder={`Enter ${label}`} value={value} onChange={onChange} />
            </FormFieldWrapper>
        );
    }
}