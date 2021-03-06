import * as React from 'react'
import { DraggedAssignment, AssignmentDropResult } from './AssignmentDragSource'
import { CSSProperties } from 'react';
import dropTargetFactory from '../infrastructure/DragDrop/dropTargetFactory';
import ItemTypes from '../infrastructure/DragDrop/ItemTypes';


const GenericAssignmentDropTarget = dropTargetFactory<DraggedAssignment, AssignmentDropResult>(ItemTypes.ASSIGNMENT);

interface AssignmentDropTargetProps {
    targetId: number;
    style?:CSSProperties;
    computeStyle?:(status:{isActive:boolean,isOver:boolean,canDrop:boolean})=>CSSProperties;
}

export default class AssignmentDropTarget extends React.PureComponent<AssignmentDropTargetProps> {

    canDropItem(assignment: DraggedAssignment) {
        return assignment.sourceId !== this.props.targetId;
    }

    onDropItem(dragged: DraggedAssignment): AssignmentDropResult {
        const {targetId} = this.props;
        
        return {
            assignmentId: dragged.id,
            sourceId: dragged.sourceId,
            targetId: targetId
        }
    }
    render() {
        return (
            <GenericAssignmentDropTarget                 
                canDropItem={(a) => this.canDropItem(a)} 
                onDropItem={(a)=> this.onDropItem(a)}
                style={this.props.style}
                computeStyle={this.props.computeStyle}>
                {this.props.children}
            </GenericAssignmentDropTarget>
        );
    }
}

