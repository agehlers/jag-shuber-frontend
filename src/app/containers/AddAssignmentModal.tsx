import * as React from 'react';
import {default as CreateAssignmentForm} from '../containers/CreateAssignmentForm';
import { 
    Button, 
    Modal, 
    DropdownButton,
    MenuItem
} from 'react-bootstrap';
import { ASSIGNMENT_TYPES } from '../api'


export interface AddAssignmentModalProps{
    isOpen?: boolean;
}

export interface AddAssignmentModalState{
    showModal?: boolean;
    showCourtSecurityFields?: boolean;
    showDocumentSericesFields?: boolean;
    showEscortServicesFields?: boolean;
    showGateSecurityFields?: boolean;
    showOtherAssignmentFields?: boolean;
}

export default class AddAssignmentModal extends React.Component<AddAssignmentModalProps, AddAssignmentModalState>{
    static defaultProps:AddAssignmentModalProps = {
        isOpen: false
    }

    constructor(props: AddAssignmentModalProps){
        super(props);
        this.state = { showModal: props.isOpen };
    }

    handleShow(assignmentTypeKey:string){
        this.setState({ 
            showModal: true, 
            showCourtSecurityFields: assignmentTypeKey === "courtSecurity",
            showDocumentSericesFields: assignmentTypeKey === "documentServices",
            showEscortServicesFields: assignmentTypeKey === "escortServices",
            showGateSecurityFields: assignmentTypeKey === "gateSecurity",
            showOtherAssignmentFields: assignmentTypeKey === "other"
        })
    }

    handleClose(){
        this.setState({ showModal: false })
    }

    render(){
        const { showModal, showCourtSecurityFields, showDocumentSericesFields, showEscortServicesFields, showGateSecurityFields, showOtherAssignmentFields } = this.state;
        return (
			<div>	
                <DropdownButton bsStyle="success" id="task-type-dropdown" title="Add Assignment" >
                    {
                        Object.keys(ASSIGNMENT_TYPES).map((k, i)=>{
                            return(
                                <MenuItem onSelect={() => this.handleShow(k)}>{ASSIGNMENT_TYPES[k]}</MenuItem>
                            );
                        })
                    }
                </DropdownButton>		

				<Modal show={showModal} onHide={() => this.handleClose()}>
					<Modal.Header closeButton>
						<Modal.Title>Add Assignment</Modal.Title>
					</Modal.Header>
					<Modal.Body>
                        <CreateAssignmentForm 
                            showCourtSecurityFields={showCourtSecurityFields} 
                            showDocumentSericesFields={showDocumentSericesFields}
                            showEscortServicesFields={showEscortServicesFields}
                            showGateSecurityFields={showGateSecurityFields}
                            showOtherAssignmentFields={showOtherAssignmentFields}
                            onSubmitSuccess={()=>this.handleClose()}
                        />
					</Modal.Body>
					<Modal.Footer>
                        <CreateAssignmentForm.SubmitButton bsStyle="primary">Save</CreateAssignmentForm.SubmitButton>
						<Button onClick={() => this.handleClose()}>Close</Button>
					</Modal.Footer>
				</Modal>
			</div>
        );
    }
}